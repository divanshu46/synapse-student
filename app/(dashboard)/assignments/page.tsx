'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';

import mockData from '@/master-student.json';

const mockAssignments = mockData.assignments.map(a => ({
  ...a,
  dueDate: new Date(a.dueDate),
  courseName: mockData.courses.find(c => c.id === a.courseId)?.name || ''
}));

const courses = mockData.courses;

function AssignmentsContent() {
  const searchParams = useSearchParams();
  const urlCourseId = searchParams.get('courseId');
  const urlStatus = searchParams.get('status');
  
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'submitted' | 'graded'>(
    (urlStatus as any) || 'all'
  );
  const [courseFilter, setCourseFilter] = useState<string>(urlCourseId || 'all');

  const filteredAssignments = mockAssignments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || a.courseId === courseFilter;
    return matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'upcoming': return 'secondary';
      case 'submitted': return 'outline';
      case 'graded': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6 gap-8">
        <h1 className="text-3xl font-heading">All Assignments</h1>
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
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="graded">Graded</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{assignment.courseName}</Badge>
                    <Badge variant={getStatusColor(assignment.status)} className="uppercase">{assignment.status}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{assignment.title}</CardTitle>
                  <p className="text-sm mb-2">{assignment.description}</p>
                  {assignment.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {assignment.tags.map((tag: string, i: number) => (
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs mb-1">Due Date</p>
                  <p className="font-base flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(assignment.dueDate, 'MMM dd, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1">Time</p>
                  <p className="font-base flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(assignment.dueDate, 'hh:mm a')}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1">Total Points</p>
                  <p className="font-base flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {assignment.totalPoints}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end pt-2 border-t-2 border-border">
                <Link href={`/assignments/${assignment.id}`}>
                  <Button variant="default">
                    {assignment.status === 'graded' ? 'View Grade' : assignment.status === 'submitted' ? 'View Submission' : 'View Assignment'}
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

export default function AssignmentsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AssignmentsContent />
    </Suspense>
  );
}
