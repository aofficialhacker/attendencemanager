
import { useState, useEffect } from 'react';
import { ScheduledClass } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

export const useTeacherTimetable = (teacherId: string) => {
  const [timetable, setTimetable] = useState<ScheduledClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTimetable = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call your API
      // const response = await axios.get(`/api/timetables/teacher/${teacherId}`);
      
      // For now, we'll use mock data
      const mockData: ScheduledClass[] = [
        {
          class_id: '1',
          teacher_id: teacherId,
          room: 'A101',
          start_time: '2023-05-01T09:00:00',
          end_time: '2023-05-01T10:30:00',
          subject: 'Mathematics',
          teacherName: 'Professor Smith'
        },
        {
          class_id: '2',
          teacher_id: teacherId,
          room: 'B202',
          start_time: '2023-05-02T11:00:00',
          end_time: '2023-05-02T12:30:00',
          subject: 'Advanced Mathematics',
          teacherName: 'Professor Smith'
        },
        {
          class_id: '3',
          teacher_id: teacherId,
          room: 'C303',
          start_time: '2023-05-03T09:00:00',
          end_time: '2023-05-03T10:30:00',
          subject: 'Linear Algebra',
          teacherName: 'Professor Smith'
        },
        {
          class_id: '4',
          teacher_id: teacherId,
          room: 'D404',
          start_time: '2023-05-04T11:00:00',
          end_time: '2023-05-04T12:30:00',
          subject: 'Calculus',
          teacherName: 'Professor Smith'
        },
        {
          class_id: '5',
          teacher_id: teacherId,
          room: 'E505',
          start_time: '2023-05-05T14:00:00',
          end_time: '2023-05-05T15:30:00',
          subject: 'Statistics',
          teacherName: 'Professor Smith'
        }
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setTimetable(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching teacher timetable:', err);
      setError('Failed to load your timetable. Please try again later.');
      setLoading(false);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem loading your timetable.",
      });
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [teacherId]);

  return { timetable, loading, error, fetchTimetable };
};
