'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';

import mockData from '@/master-student.json';

const mockGrades = Object.entries(mockData.grades).map(([courseId, grade]) => {
  const course = mockData.courses.find(c => c.id === courseId);
  return {
    courseId,
    courseName: course?.name || '',
    courseCode: course?.code || '',
    currentGrade: grade.currentGrade,
    letterGrade: grade.letterGrade,
    assignments: grade.categories.find(c => c.name === 'Assignments')?.percentage || 0,
    quizzes: grade.categories.find(c => c.name === 'Quizzes')?.percentage || 0,
    exams: grade.categories.find(c => c.name === 'Exams')?.percentage || 0,
    participation: 95
  };
});

const courses = mockData.courses;

function GradesContent() {
  const searchParams = useSearchParams();
  const urlCourseId = searchParams.get('courseId');
  const [courseFilter, setCourseFilter] = useState<string>(urlCourseId || 'all');

  const filteredGrades = mockGrades.filter(g => courseFilter === 'all' || g.courseId === courseFilter);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'default';
    if (grade.startsWith('B')) return 'secondary';
    return 'outline';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading">All Grades</h1>
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

      <Card>
        <CardHeader>
          <CardTitle>My Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-heading">Course</th>
                  <th className="text-center p-3 font-heading">Assignments</th>
                  <th className="text-center p-3 font-heading">Quizzes</th>
                  <th className="text-center p-3 font-heading">Exams</th>
                  <th className="text-center p-3 font-heading">Participation</th>
                  <th className="text-center p-3 font-heading">Overall</th>
                  <th className="text-center p-3 font-heading">Grade</th>
                  <th className="text-center p-3 font-heading">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map(grade => (
                  <tr key={grade.courseId} className="border-b border-border hover:bg-secondary/20">
                    <td className="p-3">
                      <div>
                        <p className="font-base text-sm">{grade.courseName}</p>
                        <p className="text-xs text-muted-foreground">{grade.courseCode}</p>
                      </div>
                    </td>
                    <td className="text-center p-3">{grade.assignments}%</td>
                    <td className="text-center p-3">{grade.quizzes}%</td>
                    <td className="text-center p-3">{grade.exams}%</td>
                    <td className="text-center p-3">{grade.participation}%</td>
                    <td className="text-center p-3 font-heading">{grade.currentGrade}%</td>
                    <td className="text-center p-3">
                      <Badge variant={getGradeColor(grade.letterGrade)}>{grade.letterGrade}</Badge>
                    </td>
                    <td className="text-center p-3">
                      <Link href={`/grades/${grade.courseId}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Eye className="h-3 w-3" />
                          View Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GradesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <GradesContent />
    </Suspense>
  );
}
