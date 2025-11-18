'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock, Award } from 'lucide-react';

const mockResults = {
  quizTitle: 'Sorting Algorithms Quiz',
  score: 42,
  totalPoints: 50,
  percentage: 84,
  timeSpent: 25,
  attemptNumber: 1,
  questions: [
    { id: '1', question: 'Which sorting algorithm has O(n log n) average time complexity?', yourAnswer: 'Merge Sort', correctAnswer: 'Merge Sort', isCorrect: true, points: 5, earnedPoints: 5 },
    { id: '2', question: 'Quick Sort is always faster than Merge Sort', yourAnswer: 'false', correctAnswer: 'false', isCorrect: true, points: 3, earnedPoints: 3 },
    { id: '3', question: 'What is the worst-case time complexity of Quick Sort?', yourAnswer: 'O(n^2)', correctAnswer: 'O(n^2)', isCorrect: true, points: 4, earnedPoints: 4 },
    { id: '4', question: 'Explain the difference between stable and unstable sorting algorithms', yourAnswer: 'Stable algorithms maintain relative order...', correctAnswer: 'Essay graded manually', isCorrect: true, points: 10, earnedPoints: 8 },
  ],
};

export default function QuizResultsPage({ params }: { params: { courseId: string; quizId: string } }) {
  const passed = mockResults.percentage >= 60;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <Card className={passed ? 'bg-[#B4F481]' : 'bg-[#FFA6F6]'}>
        <CardHeader>
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
          <p className="text-lg font-heading">{mockResults.quizTitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="text-3xl font-heading">{mockResults.percentage}%</p>
              <p className="text-sm">Score</p>
            </div>
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <p className="text-3xl font-heading">{mockResults.score}/{mockResults.totalPoints}</p>
              <p className="text-sm">Points</p>
            </div>
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-3xl font-heading">{mockResults.timeSpent}</p>
              <p className="text-sm">Minutes</p>
            </div>
            <div className="text-center p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow">
              <p className="text-3xl font-heading">{mockResults.attemptNumber}</p>
              <p className="text-sm">Attempt</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 rounded-base border-2 border-border bg-secondary-background">
            {passed ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-green-600" />
                <p className="text-lg font-heading">Passed!</p>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600" />
                <p className="text-lg font-heading">Not Passed</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockResults.questions.map((q, index) => (
            <div key={q.id} className="p-4 rounded-base border-2 border-border bg-secondary-background">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Q{index + 1}</Badge>
                    {q.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <p className="font-base mb-2">{q.question}</p>
                </div>
                <Badge variant="neutral">{q.earnedPoints}/{q.points} pts</Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-base">Your Answer:</span>
                  <span>{q.yourAnswer}</span>
                </div>
                {!q.isCorrect && (
                  <div className="flex gap-2">
                    <span className="font-base">Correct Answer:</span>
                    <span>{q.correctAnswer}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Link href={`/courses/${params.courseId}/quizzes`}>
          <Button variant="neutral">Back to Quizzes</Button>
        </Link>
        <Link href={`/courses/${params.courseId}`}>
          <Button variant="default">Back to Course</Button>
        </Link>
      </div>
    </div>
  );
}
