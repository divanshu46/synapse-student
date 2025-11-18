export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  instructor: string;
  semester: string;
  credits: number;
  schedule?: string;
  color?: string;
  thumbnail?: string;
}

export interface Notice {
  id: string;
  courseId: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  isPinned?: boolean;
}

export interface ClassSession {
  id: string;
  courseId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'lecture' | 'lab' | 'tutorial';
}
