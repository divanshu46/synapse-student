'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, ClipboardCheck } from 'lucide-react';
import { format } from 'date-fns';
import mockData from '@/../master-student.json';

const upcomingAssignments = mockData.assignments
  .filter(a => a.status === 'pending')
  .map(a => ({
    id: a.id,
    title: a.title,
    type: 'assignment' as const,
    dueDate: new Date(a.dueDate),
    course: mockData.courses.find(c => c.id === a.courseId)?.code || ''
  }));

const upcomingQuizzes = mockData.quizzes
  .filter(q => q.status === 'upcoming' || q.status === 'active')
  .map(q => ({
    id: q.id,
    title: q.title,
    type: 'quiz' as const,
    dueDate: new Date(q.startDate),
    course: mockData.courses.find(c => c.id === q.courseId)?.code || ''
  }));

const mockTasks = [...upcomingAssignments, ...upcomingQuizzes]
  .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
  .slice(0, 5);

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTasks.map((task) => (
          <div key={task.id} className="p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {task.type === 'assignment' ? (
                  <FileText className="h-5 w-5" />
                ) : (
                  <ClipboardCheck className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-base text-sm">{task.title}</p>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="default" className="text-xs">{task.course}</Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(task.dueDate, 'MMM dd')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
