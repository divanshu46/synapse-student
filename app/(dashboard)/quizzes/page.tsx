'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, FileQuestion, Calendar } from 'lucide-react';
import { format } from 'date-fns';

import mockData from '@/../master-student.json';

const mockQuizzes = mockData.quizzes.map(q => ({
  ...q,
  startDate: new Date(q.startDate),
  endDate: new Date(q.endDate),
  courseName: mockData.courses.find(c => c.id === q.courseId)?.name || '',
  questionsCount: 10
}));

const courses = mockData.courses;

function QuizzesContent() {
  const searchParams = useSearchParams();
  const urlCourseId = searchParams.get('courseId');
  const urlStatus = searchParams.get('status');
  
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'active' | 'completed'>(
    (urlStatus as any) || 'all'
  );
  const [courseFilter, setCourseFilter] = useState<string>(urlCourseId || 'all');

  const filteredQuizzes = mockQuizzes.filter(q => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || q.courseId === courseFilter;
    return matchesStatus && matchesCourse;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6 gap-8">
        <h1 className="text-3xl font-heading">All Quizzes</h1>
        <div className="flex gap-4">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{quiz.courseName}</Badge>
                    <Badge variant="default" className="uppercase">{quiz.status}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
                  <p className="text-sm mb-2">{quiz.description}</p>
                  {quiz.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {quiz.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag.replace(/-/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs mb-1">Duration</p>
                  <p className="font-base flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {quiz.duration} min
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1">Questions</p>
                  <p className="font-base flex items-center gap-1">
                    <FileQuestion className="h-3 w-3" />
                    {quiz.questionsCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1">Points</p>
                  <p className="font-base">{quiz.totalPoints}</p>
                </div>
                <div>
                  <p className="text-xs mb-1">Attempts</p>
                  <p className="font-base">{quiz.attemptsUsed}/{quiz.maxAttempts}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t-2 border-border">
                <div className="text-sm">
                  <p className="text-xs mb-1">Available</p>
                  <p className="font-base flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(quiz.startDate, 'MMM dd')} - {format(quiz.endDate, 'MMM dd')}
                  </p>
                </div>
                <Link href={`/quizzes/${quiz.id}`}>
                  <Button variant="default" disabled={quiz.status === 'completed' || quiz.attemptsUsed >= quiz.maxAttempts}>
                    {quiz.attemptsUsed > 0 ? 'Retake Quiz' : 'Start Quiz'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <QuizzesContent />
    </Suspense>
  );
}
