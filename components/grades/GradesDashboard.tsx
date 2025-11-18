'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CourseGrade } from '@/types';

export function GradesDashboard({ courseGrades }: { courseGrades: CourseGrade[] }) {
  const overallGPA = courseGrades.reduce((acc, course) => acc + course.currentGrade, 0) / courseGrades.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{overallGPA.toFixed(1)}%</div>
            <p className="text-muted-foreground">Current GPA</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {courseGrades.map((course) => (
          <Card key={course.courseId}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{course.courseName}</h3>
                  <p className="text-sm text-muted-foreground">Current Grade</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{course.currentGrade}%</div>
                  <Badge variant="secondary">{course.letterGrade}</Badge>
                </div>
              </div>
              <Progress value={course.currentGrade} className="mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {course.breakdown.map((item) => (
                  <div key={item.category}>
                    <p className="text-muted-foreground">{item.category}</p>
                    <p className="font-semibold">{item.percentage.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">
                      {item.earned}/{item.possible} ({item.weight}%)
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
