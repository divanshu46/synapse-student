'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ClipboardCheck, Timer } from 'lucide-react';
import { Quiz } from '@/types';
import { format } from 'date-fns';

export function QuizList({ quizzes }: { quizzes: Quiz[] }) {
  const getStatusColor = (status: Quiz['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {quizzes.map((quiz) => (
        <Card key={quiz.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-lg">{quiz.title}</h3>
                  <Badge className={getStatusColor(quiz.status)}>
                    {quiz.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{quiz.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Due: {format(new Date(quiz.dueDate), 'MMM dd, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    {quiz.duration} min
                  </span>
                  <span>Points: {quiz.totalPoints}</span>
                  <span>Attempts: {quiz.attempts}</span>
                </div>
              </div>
              <Link href={`/courses/${quiz.courseId}/quizzes/${quiz.id}`}>
                <Button>{quiz.status === 'completed' ? 'View Results' : 'Start Quiz'}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
