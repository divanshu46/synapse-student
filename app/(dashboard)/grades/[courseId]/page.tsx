'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, ArrowLeft } from 'lucide-react';

const mockGrades: any = {
  '1': {
    courseId: '1',
    courseName: 'Data Structures',
    courseCode: 'CS201',
    currentGrade: 87.5,
    letterGrade: 'A-',
    percentile: 78,
    categories: [
      { id: '1', name: 'Assignments', weight: 40, earnedPoints: 360, totalPoints: 400, percentage: 90 },
      { id: '2', name: 'Quizzes', weight: 30, earnedPoints: 240, totalPoints: 300, percentage: 80 },
      { id: '3', name: 'Exams', weight: 25, earnedPoints: 210, totalPoints: 250, percentage: 84 },
      { id: '4', name: 'Participation', weight: 5, earnedPoints: 48, totalPoints: 50, percentage: 96 },
    ],
    items: [
      { id: '1', type: 'assignment', name: 'Binary Search Tree', category: 'Assignments', earnedPoints: 95, totalPoints: 100, percentage: 95, weight: 10 },
      { id: '2', type: 'quiz', name: 'Sorting Algorithms', category: 'Quizzes', earnedPoints: 42, totalPoints: 50, percentage: 84, weight: 10 },
    ],
    classStats: { average: 82.3, median: 84.5, highest: 96.2, lowest: 58.7 },
  },
  '2': {
    courseId: '2',
    courseName: 'Web Development',
    courseCode: 'CS301',
    currentGrade: 92.0,
    letterGrade: 'A',
    percentile: 85,
    categories: [
      { id: '1', name: 'Assignments', weight: 50, earnedPoints: 450, totalPoints: 500, percentage: 90 },
      { id: '2', name: 'Projects', weight: 40, earnedPoints: 380, totalPoints: 400, percentage: 95 },
      { id: '3', name: 'Participation', weight: 10, earnedPoints: 95, totalPoints: 100, percentage: 95 },
    ],
    items: [
      { id: '3', type: 'assignment', name: 'React Components', category: 'Assignments', earnedPoints: 98, totalPoints: 100, percentage: 98, weight: 15 },
    ],
    classStats: { average: 85.5, median: 87.0, highest: 98.5, lowest: 65.2 },
  },
  '3': {
    courseId: '3',
    courseName: 'Database Systems',
    courseCode: 'CS401',
    currentGrade: 85.0,
    letterGrade: 'B+',
    percentile: 72,
    categories: [
      { id: '1', name: 'Assignments', weight: 35, earnedPoints: 300, totalPoints: 350, percentage: 86 },
      { id: '2', name: 'Quizzes', weight: 25, earnedPoints: 200, totalPoints: 250, percentage: 80 },
      { id: '3', name: 'Projects', weight: 40, earnedPoints: 340, totalPoints: 400, percentage: 85 },
    ],
    items: [
      { id: '4', type: 'assignment', name: 'Database Design', category: 'Assignments', earnedPoints: 85, totalPoints: 100, percentage: 85, weight: 10 },
    ],
    classStats: { average: 80.0, median: 82.0, highest: 94.0, lowest: 60.0 },
  },
};

export default function GradeDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const grade = mockGrades[courseId];

  if (!grade) {
    return <div className="p-6">Grade not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/grades">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Grades
        </Button>
      </Link>

      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-heading">{grade.courseName}</h1>
        <Badge variant="outline">{grade.courseCode}</Badge>
      </div>

      <Card className="bg-main border-2 border-border shadow-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm mb-1">Current Grade</p>
              <div className="flex items-baseline gap-3">
                <h2 className="text-5xl font-heading">{grade.currentGrade}%</h2>
                <span className="text-3xl font-heading">{grade.letterGrade}</span>
              </div>
              <p className="text-sm mt-2">{grade.percentile}th percentile</p>
            </div>
            <BarChart3 className="h-16 w-16" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Grade Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grade.categories.map((category: any) => (
              <div key={category.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-base">{category.name}</p>
                    <p className="text-sm">{category.earnedPoints}/{category.totalPoints} points</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-heading">{category.percentage}%</p>
                    <p className="text-sm">Weight: {category.weight}%</p>
                  </div>
                </div>
                <Progress value={category.percentage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {grade.items.map((item: any) => (
              <div key={item.id} className="p-4 rounded-base border-2 border-border hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-shadow transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-base">{item.name}</p>
                      <Badge variant="outline" className="uppercase text-xs">{item.type}</Badge>
                    </div>
                    <p className="text-sm">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-heading">{item.percentage}%</p>
                    <p className="text-sm">{item.earnedPoints}/{item.totalPoints} pts</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Class Statistics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background">
              <p className="text-sm mb-1">Class Average</p>
              <p className="text-2xl font-heading">{grade.classStats.average}%</p>
            </div>
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background">
              <p className="text-sm mb-1">Median</p>
              <p className="text-2xl font-heading">{grade.classStats.median}%</p>
            </div>
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background">
              <p className="text-sm mb-1">Highest</p>
              <p className="text-2xl font-heading">{grade.classStats.highest}%</p>
            </div>
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background">
              <p className="text-sm mb-1">Your Rank</p>
              <p className="text-2xl font-heading">#{grade.percentile}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
