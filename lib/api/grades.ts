import { apiClient } from './client';
import { Grade, CourseGrade } from '@/types';

export const gradesApi = {
  getAll: () => apiClient.get<Grade[]>('/grades'),
  getByCourse: (courseId: string) => apiClient.get<CourseGrade>(`/courses/${courseId}/grades`),
};
