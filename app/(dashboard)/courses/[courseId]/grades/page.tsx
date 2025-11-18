'use client';

import { CourseNavigation } from '@/components/courses/CourseNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseGrade } from '@/types';
import { use } from 'react';

const mockCourseGrade: CourseGrade = {
  courseId: '1',
  courseName: 'Data Structures & Algorithms',
  currentGrade: 87,
  letterGrade: 'B+',
  breakdown: [
    { category: 'Assignments', weight: 40, earned: 350, possible: 400, percentage: 87.5 },
    { category: 'Quizzes', weight: 30, earned: 135, possible: 150, percentage: 90 },
    { category: 'Midterm', weight: 15, earned: 70, possible: 100, percentage: 70 },
    { category: 'Final', weight: 15, earned: 0, possible: 100, percentage: 0 },
  ],
};

export default function GradesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);

  return (
    <div>
      <CourseNavigation courseId={courseId} />
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Grades</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{mockCourseGrade.currentGrade}%</div>
                <Badge variant="secondary" className="text-lg">{mockCourseGrade.letterGrade}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Grade Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCourseGrade.breakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.earned}/{item.possible} ({item.weight}% of grade)
                    </span>
                  </div>
                  <Progress value={item.percentage} />
                  <p className="text-sm text-muted-foreground mt-1">{item.percentage.toFixed(1)}%</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
