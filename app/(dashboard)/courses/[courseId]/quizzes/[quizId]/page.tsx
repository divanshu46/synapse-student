'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const mockQuiz = {
  id: '1',
  title: 'Sorting Algorithms Quiz',
  duration: 30,
  totalPoints: 50,
  questions: [
    { id: '1', type: 'multiple-choice' as const, question: 'Which sorting algorithm has O(n log n) average time complexity?', points: 5, options: [
      { id: 'a', text: 'Bubble Sort', isCorrect: false },
      { id: 'b', text: 'Merge Sort', isCorrect: true },
      { id: 'c', text: 'Selection Sort', isCorrect: false },
      { id: 'd', text: 'Insertion Sort', isCorrect: false },
    ]},
    { id: '2', type: 'true-false' as const, question: 'Quick Sort is always faster than Merge Sort', points: 3, correctAnswer: 'false' },
    { id: '3', type: 'short-answer' as const, question: 'What is the worst-case time complexity of Quick Sort?', points: 4, correctAnswer: 'O(n^2)' },
    { id: '4', type: 'essay' as const, question: 'Explain the difference between stable and unstable sorting algorithms with examples.', points: 10 },
  ],
};

export default function QuizTakePage({ params }: { params: { courseId: string; quizId: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(mockQuiz.duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    router.push(`/courses/${params.courseId}/quizzes/${params.quizId}/results`);
  };

  const progress = ((currentQuestion + 1) / mockQuiz.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const question = mockQuiz.questions[currentQuestion];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-heading">{mockQuiz.title}</h2>
              <p className="text-sm">Question {currentQuestion + 1} of {mockQuiz.questions.length}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-lg font-heading">
                <Clock className="h-5 w-5" />
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm">{answeredCount}/{mockQuiz.questions.length} answered</p>
            </div>
          </div>
          <Progress value={progress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{question.question}</CardTitle>
            <Badge variant="default">{question.points} pts</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.type === 'multiple-choice' && (
            <RadioGroup value={answers[question.id]} onValueChange={(v) => setAnswers({...answers, [question.id]: v})}>
              {question.options?.map(option => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-base border-2 border-border hover:bg-secondary-background transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'true-false' && (
            <RadioGroup value={answers[question.id]} onValueChange={(v) => setAnswers({...answers, [question.id]: v})}>
              <div className="flex items-center space-x-2 p-3 rounded-base border-2 border-border hover:bg-secondary-background transition-colors">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-base border-2 border-border hover:bg-secondary-background transition-colors">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
              </div>
            </RadioGroup>
          )}

          {question.type === 'short-answer' && (
            <Input
              value={answers[question.id] || ''}
              onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
              placeholder="Type your answer..."
            />
          )}

          {question.type === 'essay' && (
            <Textarea
              value={answers[question.id] || ''}
              onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
              placeholder="Write your essay here..."
              rows={10}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          variant="neutral"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(prev => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {mockQuiz.questions.map((_, index) => (
            <Button
              key={index}
              size="icon"
              variant={currentQuestion === index ? "default" : answers[mockQuiz.questions[index].id] ? "neutral" : "neutral"}
              onClick={() => setCurrentQuestion(index)}
              className={answers[mockQuiz.questions[index].id] ? 'bg-main' : ''}
            >
              {index + 1}
            </Button>
          ))}
        </div>

        {currentQuestion < mockQuiz.questions.length - 1 ? (
          <Button onClick={() => setCurrentQuestion(prev => prev + 1)}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit Quiz</Button>
        )}
      </div>
    </div>
  );
}
