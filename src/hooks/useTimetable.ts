
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ScheduledClass } from '@/lib/supabase';
import { useToast } from "@/hooks/use-toast";

export const useTimetable = (studentId: string) => {
  const [timetable, setTimetable] = useState<ScheduledClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTimetable = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call your API
      // const response = await axios.get(`/api/timetables/student/${studentId}`);
      
      // For now, we'll use mock data
      const mockData: ScheduledClass[] = [
        {
          class_id: '1',
          teacher_id: 't1',
          room: 'A101',
          start_time: '2023-05-01T09:00:00',
          end_time: '2023-05-01T10:30:00',
          subject: 'Mathematics',
          teacherName: 'Professor Smith'
        },
        {
          class_id: '2',
          teacher_id: 't2',
          room: 'B202',
          start_time: '2023-05-01T11:00:00',
          end_time: '2023-05-01T12:30:00',
          subject: 'Physics',
          teacherName: 'Dr. Johnson'
        },
        {
          class_id: '3',
          teacher_id: 't3',
          room: 'C303',
          start_time: '2023-05-02T09:00:00',
          end_time: '2023-05-02T10:30:00',
          subject: 'Chemistry',
          teacherName: 'Dr. Wilson'
        },
        {
          class_id: '4',
          teacher_id: 't4',
          room: 'D404',
          start_time: '2023-05-03T11:00:00',
          end_time: '2023-05-03T12:30:00',
          subject: 'Biology',
          teacherName: 'Professor Brown'
        },
        {
          class_id: '5',
          teacher_id: 't5',
          room: 'E505',
          start_time: '2023-05-04T14:00:00',
          end_time: '2023-05-04T15:30:00',
          subject: 'Computer Science',
          teacherName: 'Dr. Davis'
        }
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setTimetable(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching timetable:', err);
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
  }, [studentId]);

  return { timetable, loading, error, fetchTimetable };
};
