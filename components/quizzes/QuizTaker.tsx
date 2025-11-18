'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types';

interface QuizTakerProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string | string[]>) => void;
}

export function QuizTaker({ questions, onSubmit }: QuizTakerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{question.points} points</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === 'multiple-choice' && (
            <RadioGroup
              value={answers[question.id] as string}
              onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'true-false' && (
            <RadioGroup
              value={answers[question.id] as string}
              onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
            >
              {['True', 'False'].map((option) => (
                <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {(question.type === 'short-answer' || question.type === 'essay') && (
            <Textarea
              placeholder="Type your answer here..."
              value={answers[question.id] as string || ''}
              onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              rows={question.type === 'essay' ? 8 : 3}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={handleSubmit}>Submit Quiz</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
}
