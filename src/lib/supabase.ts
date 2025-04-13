
import { createClient } from '@supabase/supabase-js';

// Types for our database tables
export type User = {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  first_name: string;
  last_name: string;
  student_id: string | null;
  teacher_id: string | null;
  created_at: string;
};

export type Student = {
  id: string;
  user_id: string;
  courses: string[];
};

export type Teacher = {
  id: string;
  user_id: string;
  subjects_taught: string[];
  availability: TimeSlot[];
};

export type Class = {
  id: string;
  subject: string;
  duration: number;
  room: string;
  course_code: string;
};

export type TimeSlot = {
  day: string;
  start_time: string;
  end_time: string;
};

export type ScheduledClass = {
  class_id: string;
  teacher_id: string;
  room: string;
  start_time: string;
  end_time: string;
  subject: string;
  teacherName: string;
};

// This is a placeholder for the actual Supabase URL and key
// You'll need to replace these with your actual Supabase project values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Check if we're connected to Supabase
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
};

// RLS policy helpers (this will be used on the Supabase dashboard)
export const studentsRLSPolicy = `
-- Allow students to only see their own data
create policy "Students can only view their own data"
on students
for select
to authenticated
using (auth.uid() = user_id);

-- Allow students to update their own data
create policy "Students can only update their own data"
on students
for update
to authenticated
using (auth.uid() = user_id);

-- Allow students to delete their own data
create policy "Students can only delete their own data"
on students
for delete
to authenticated
using (auth.uid() = user_id);

-- Admins bypass all policies
create policy "Admins can do anything"
on students
for all
to authenticated
using (auth.jwt() ->> 'role' = 'admin');
`;
