export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  maxAttempts: number;
  attemptsUsed: number;
  totalPoints: number;
  questions: Question[];
  status: 'upcoming' | 'active' | 'completed' | 'missed';
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  points: number;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  attemptNumber: number;
  startedAt: Date;
  submittedAt?: Date;
  answers: Record<string, string>;
  score?: number;
  percentage?: number;
}
