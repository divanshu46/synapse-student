export interface GradeBook {
  courseId: string;
  courseName: string;
  currentGrade: number;
  letterGrade: string;
  percentile: number;
  
  categories: GradeCategory[];
  items: GradeItem[];
  
  classStats: {
    average: number;
    median: number;
    highest: number;
    lowest: number;
  };
}

export interface GradeCategory {
  id: string;
  name: string;
  weight: number;
  earnedPoints: number;
  totalPoints: number;
  percentage: number;
}

export interface GradeItem {
  id: string;
  type: 'assignment' | 'quiz' | 'exam' | 'participation';
  name: string;
  category: string;
  earnedPoints: number;
  totalPoints: number;
  percentage: number;
  weight: number;
  submittedAt?: Date;
  gradedAt?: Date;
  feedback?: string;
}
