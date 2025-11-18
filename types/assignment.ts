export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  status: 'upcoming' | 'active' | 'overdue' | 'submitted' | 'graded';
  attachments?: string[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  files: SubmittedFile[];
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
}

export interface SubmittedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}
