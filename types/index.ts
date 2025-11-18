export * from './user';
export * from './course';
export * from './assignment';
export * from './quiz';
export * from './grade';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'assignment' | 'quiz' | 'class' | 'exam';
  courseId: string;
  courseName: string;
}
