'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, ChevronRight, PlusCircle } from 'lucide-react';

const mockCourses = [
  { id: '1', name: 'Data Structures & Algorithms', code: 'CS201', students: 45, semester: 'Fall 2025', status: 'active' },
  { id: '2', name: 'Web Development', code: 'CS301', students: 38, semester: 'Fall 2025', status: 'active' },
  { id: '3', name: 'Database Systems', code: 'CS401', students: 42, semester: 'Fall 2025', status: 'active' },
];

export default function TeacherCoursesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading">My Courses</h1>
        <Link href="/teacher/create-course">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {mockCourses.map(course => (
          <Link key={course.id} href={`/teacher/courses/${course.id}`}>
            <Card className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{course.code}</Badge>
                      <Badge variant="secondary">{course.semester}</Badge>
                      <Badge variant="default">{course.status}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{course.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students} Students
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
