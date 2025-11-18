'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Award, Calendar, User, ChevronRight, Edit, Plus } from 'lucide-react';

const mockOutlines = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Data Structures & Algorithms',
    courseCode: 'CS201',
    tenure: 'Fall 2025 (Aug - Dec)',
    credits: 4,
    description: 'Comprehensive study of fundamental data structures and algorithms including arrays, linked lists, trees, graphs, sorting, and searching.',
    professor: 'Dr. Sarah Smith',
    chaptersCount: 7,
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Web Development',
    courseCode: 'CS301',
    tenure: 'Fall 2025 (Aug - Dec)',
    credits: 3,
    description: 'Modern web development with HTML, CSS, JavaScript, React, and Node.js.',
    professor: 'Prof. Michael Chen',
    chaptersCount: 5,
  },
];

const courses = [
  { id: '1', name: 'Data Structures', code: 'CS201' },
  { id: '2', name: 'Web Development', code: 'CS301' },
  { id: '3', name: 'Database Systems', code: 'CS401' },
];

function CourseMaterialsContent() {
  const searchParams = useSearchParams();
  const urlCourseId = searchParams.get('courseId');
  const [courseFilter, setCourseFilter] = useState<string>(urlCourseId || 'all');

  const filteredOutlines = courseFilter === 'all' 
    ? mockOutlines 
    : mockOutlines.filter(o => o.courseId === courseFilter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6 gap-8">
        <h1 className="text-3xl font-heading">Course Materials</h1>
        <div className="flex items-center gap-3">
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
          <Link href="/teacher/create-course">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOutlines.map((outline) => (
          <Link key={outline.id} href={`/teacher/course-materials/${outline.id}`}>
            <Card className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{outline.courseCode}</Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        {outline.tenure}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Award className="h-3 w-3" />
                        {outline.credits} Credits
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{outline.courseName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{outline.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {outline.professor}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {outline.chaptersCount} Chapters
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-1" onClick={(e) => e.preventDefault()}>
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CourseMaterialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseMaterialsContent />
    </Suspense>
  );
}
