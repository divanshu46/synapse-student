'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Award, Calendar, User, ChevronRight } from 'lucide-react';

import mockData from '@/master-student.json';

const mockOutlines = mockData.courses.map(c => ({
  id: c.id,
  courseId: c.id,
  courseName: c.name,
  courseCode: c.code,
  tenure: c.semester,
  credits: c.credits,
  description: c.description,
  professor: c.instructor,
  chaptersCount: mockData.chapters[c.id as keyof typeof mockData.chapters]?.length || 0
}));


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
      </div>

      <div className="grid gap-4">
        {filteredOutlines.map((outline) => (
          <Link key={outline.id} href={`/course-materials/${outline.id}`}>
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
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
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
