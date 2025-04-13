
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  PlayIcon, 
  FileCogIcon, 
  BellRingIcon,
  CheckCircleIcon, 
  XCircleIcon
} from 'lucide-react';
import { generateTimetable } from '@/utils/timetableGenerator';
import { Teacher, Class, Student, ScheduledClass } from '@/lib/supabase';
import LoadingSpinner from '../student/LoadingSpinner';

const TimetableGeneratorPanel = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generationResult, setGenerationResult] = useState<{
    scheduledClasses: ScheduledClass[];
    unscheduledClasses: {class_id: string; reason: string}[];
  } | null>(null);
  const { toast } = useToast();

  // Mock data for demonstration purposes
  const mockTeachers: Teacher[] = [
    {
      id: 't1',
      user_id: 'u1',
      subjects_taught: ['Mathematics'],
      availability: [
        { day: 'Monday', start_time: '2023-05-01T09:00:00', end_time: '2023-05-01T17:00:00' },
        { day: 'Tuesday', start_time: '2023-05-02T09:00:00', end_time: '2023-05-02T17:00:00' },
      ]
    },
    {
      id: 't2',
      user_id: 'u2',
      subjects_taught: ['Physics'],
      availability: [
        { day: 'Monday', start_time: '2023-05-01T09:00:00', end_time: '2023-05-01T17:00:00' },
        { day: 'Wednesday', start_time: '2023-05-03T09:00:00', end_time: '2023-05-03T17:00:00' },
      ]
    },
    {
      id: 't3',
      user_id: 'u3',
      subjects_taught: ['Chemistry'],
      availability: [
        { day: 'Tuesday', start_time: '2023-05-02T09:00:00', end_time: '2023-05-02T17:00:00' },
        { day: 'Thursday', start_time: '2023-05-04T09:00:00', end_time: '2023-05-04T17:00:00' },
      ]
    }
  ];

  const mockClasses: Class[] = [
    { id: '1', subject: 'Mathematics', duration: 90, room: 'A101', course_code: 'MATH101' },
    { id: '2', subject: 'Physics', duration: 90, room: 'B202', course_code: 'PHYS101' },
    { id: '3', subject: 'Chemistry', duration: 90, room: 'C303', course_code: 'CHEM101' }
  ];

  const mockStudents: Student[] = [
    { id: 's1', user_id: 'u4', courses: ['MATH101', 'PHYS101'] },
    { id: 's2', user_id: 'u5', courses: ['MATH101', 'CHEM101'] },
    { id: 's3', user_id: 'u6', courses: ['PHYS101', 'CHEM101'] }
  ];

  const handleGenerateTimetable = async () => {
    setIsGenerating(true);
    setProgress(0);
    setGenerationComplete(false);
    setGenerationResult(null);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        
        const result = generateTimetable(mockTeachers, mockClasses, mockStudents);
        setGenerationResult(result);
        setGenerationComplete(true);
        setIsGenerating(false);
        
        toast({
          title: "Timetable Generated",
          description: `Successfully scheduled ${result.scheduledClasses.length} classes. ${result.unscheduledClasses.length} classes could not be scheduled.`,
          variant: "default",
        });
      }, 3000);
    } catch (error) {
      clearInterval(interval);
      setIsGenerating(false);
      
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the timetable.",
      });
    }
  };

  const handlePublishTimetable = () => {
    toast({
      title: "Timetable Published",
      description: "The timetable has been published and is now visible to all users.",
      variant: "default",
    });
  };

  const handleNotifyUsers = () => {
    toast({
      title: "Notifications Sent",
      description: "All users have been notified of the new timetable.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Timetable Generator</CardTitle>
          <CardDescription>
            Generate a new timetable based on teacher availability, class requirements, and student enrollments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="term">Academic Term</Label>
              <Input id="term" value="Fall 2023" disabled={isGenerating} />
            </div>
            
            <div className="flex justify-between gap-4">
              <Button 
                className="w-full flex items-center justify-center" 
                onClick={handleGenerateTimetable}
                disabled={isGenerating}
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Generate Timetable
              </Button>
              
              <Button 
                className="w-full flex items-center justify-center" 
                variant="outline"
                onClick={handlePublishTimetable}
                disabled={!generationComplete}
              >
                <FileCogIcon className="h-4 w-4 mr-2" />
                Publish Timetable
              </Button>
              
              <Button 
                className="w-full flex items-center justify-center" 
                variant="outline"
                onClick={handleNotifyUsers}
                disabled={!generationComplete}
              >
                <BellRingIcon className="h-4 w-4 mr-2" />
                Notify Users
              </Button>
            </div>
            
            {isGenerating && (
              <div className="space-y-2">
                <Label>Generation Progress</Label>
                <Progress value={progress} />
                <p className="text-sm text-gray-500 text-center">{progress}% complete</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {isGenerating && (
        <Card>
          <CardContent className="pt-6">
            <LoadingSpinner />
            <p className="text-center mt-4">Generating timetable, please wait...</p>
          </CardContent>
        </Card>
      )}
      
      {generationComplete && generationResult && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                Scheduled Classes ({generationResult.scheduledClasses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generationResult.scheduledClasses.length > 0 ? (
                <div className="space-y-2">
                  {generationResult.scheduledClasses.map(classItem => (
                    <div key={classItem.class_id} className="p-3 border rounded flex justify-between">
                      <div>
                        <p className="font-medium">{classItem.subject}</p>
                        <p className="text-sm text-gray-500">Room {classItem.room}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Teacher: {classItem.teacherName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(classItem.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                          {new Date(classItem.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">No classes were scheduled</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircleIcon className="h-5 w-5 mr-2 text-red-500" />
                Unscheduled Classes ({generationResult.unscheduledClasses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generationResult.unscheduledClasses.length > 0 ? (
                <div className="space-y-2">
                  {generationResult.unscheduledClasses.map(classItem => (
                    <div key={classItem.class_id} className="p-3 border border-red-200 bg-red-50 rounded">
                      <p className="font-medium">Class ID: {classItem.class_id}</p>
                      <p className="text-sm text-red-600">Reason: {classItem.reason}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">All classes were successfully scheduled</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TimetableGeneratorPanel;
