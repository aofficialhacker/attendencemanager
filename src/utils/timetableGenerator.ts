
import { Teacher, Class, Student, ScheduledClass } from '@/lib/supabase';

interface TimeSlot {
  day: string;
  start_time: string;
  end_time: string;
}

interface UnscheduledClass {
  class_id: string;
  reason: string;
}

interface TimetableResult {
  scheduledClasses: ScheduledClass[];
  unscheduledClasses: UnscheduledClass[];
}

/**
 * Generates a timetable based on teacher availability, class requirements, and student enrollments
 */
export function generateTimetable(
  teachers: Teacher[],
  classes: Class[],
  students: Student[]
): TimetableResult {
  const scheduledClasses: ScheduledClass[] = [];
  const unscheduledClasses: UnscheduledClass[] = [];
  
  // Track which rooms are booked for each timeslot
  const roomBookings: Record<string, Record<string, boolean>> = {};
  
  // Track which teachers are booked for each timeslot
  const teacherBookings: Record<string, Record<string, boolean>> = {};
  
  // Helper function to check if a timeslot overlaps with another
  const isOverlapping = (slot1: TimeSlot, slot2: TimeSlot): boolean => {
    if (slot1.day !== slot2.day) return false;
    
    const start1 = new Date(slot1.start_time).getTime();
    const end1 = new Date(slot1.end_time).getTime();
    const start2 = new Date(slot2.start_time).getTime();
    const end2 = new Date(slot2.end_time).getTime();
    
    return (start1 < end2 && start2 < end1);
  };
  
  // Helper function to check if a room is available for a timeslot
  const isRoomAvailable = (room: string, slot: TimeSlot): boolean => {
    if (!roomBookings[room]) return true;
    
    for (const bookedSlotKey in roomBookings[room]) {
      const bookedSlot = JSON.parse(bookedSlotKey) as TimeSlot;
      if (isOverlapping(slot, bookedSlot)) {
        return false;
      }
    }
    
    return true;
  };
  
  // Helper function to check if a teacher is available for a timeslot
  const isTeacherAvailable = (teacherId: string, slot: TimeSlot): boolean => {
    if (!teacherBookings[teacherId]) return true;
    
    for (const bookedSlotKey in teacherBookings[teacherId]) {
      const bookedSlot = JSON.parse(bookedSlotKey) as TimeSlot;
      if (isOverlapping(slot, bookedSlot)) {
        return false;
      }
    }
    
    return true;
  };
  
  // Helper function to find enrolled students for a course
  const getEnrolledStudents = (courseCode: string): number => {
    return students.filter(student => student.courses.includes(courseCode)).length;
  };
  
  // Helper function to find a suitable teacher for a class
  const findSuitableTeacher = (classItem: Class): Teacher | null => {
    return teachers.find(teacher => 
      teacher.subjects_taught.includes(classItem.subject)
    ) || null;
  };
  
  // Helper function to book a room and teacher for a timeslot
  const bookRoomAndTeacher = (room: string, teacherId: string, slot: TimeSlot): void => {
    if (!roomBookings[room]) roomBookings[room] = {};
    if (!teacherBookings[teacherId]) teacherBookings[teacherId] = {};
    
    const slotKey = JSON.stringify(slot);
    roomBookings[room][slotKey] = true;
    teacherBookings[teacherId][slotKey] = true;
  };
  
  // Sort classes by student enrollment (prioritize classes with more students)
  const sortedClasses = [...classes].sort((a, b) => {
    const enrollmentA = getEnrolledStudents(a.course_code);
    const enrollmentB = getEnrolledStudents(b.course_code);
    return enrollmentB - enrollmentA;
  });
  
  // Process each class
  for (const classItem of sortedClasses) {
    const enrolledStudents = getEnrolledStudents(classItem.course_code);
    
    // Skip classes with no enrolled students
    if (enrolledStudents === 0) {
      unscheduledClasses.push({
        class_id: classItem.id,
        reason: 'No students enrolled in this course'
      });
      continue;
    }
    
    // Find a suitable teacher
    const teacher = findSuitableTeacher(classItem);
    if (!teacher) {
      unscheduledClasses.push({
        class_id: classItem.id,
        reason: 'No teacher available for this subject'
      });
      continue;
    }
    
    // Check teacher availability
    let isScheduled = false;
    for (const slot of teacher.availability) {
      // Calculate end time based on class duration
      const startTime = new Date(slot.start_time);
      const endTime = new Date(startTime.getTime() + classItem.duration * 60000);
      const classSlot: TimeSlot = {
        day: slot.day,
        start_time: slot.start_time,
        end_time: endTime.toISOString()
      };
      
      // Check if both teacher and room are available for this slot
      if (
        isTeacherAvailable(teacher.id, classSlot) &&
        isRoomAvailable(classItem.room, classSlot)
      ) {
        // Book the room and teacher
        bookRoomAndTeacher(classItem.room, teacher.id, classSlot);
        
        // Add to scheduled classes
        scheduledClasses.push({
          class_id: classItem.id,
          teacher_id: teacher.id,
          room: classItem.room,
          start_time: classSlot.start_time,
          end_time: classSlot.end_time,
          subject: classItem.subject,
          teacherName: `${teacher.id}` // In a real app, this would be the teacher's name
        });
        
        isScheduled = true;
        break;
      }
    }
    
    if (!isScheduled) {
      unscheduledClasses.push({
        class_id: classItem.id,
        reason: 'No available timeslot found for this class'
      });
    }
  }
  
  return { scheduledClasses, unscheduledClasses };
}
