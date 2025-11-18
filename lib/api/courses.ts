import { apiClient } from './client';
import { Course, Notice, ClassSession } from '@/types';

export const coursesApi = {
  getAll: () => apiClient.get<Course[]>('/courses'),
  getById: (id: string) => apiClient.get<Course>(`/courses/${id}`),
  getNotices: (courseId: string) => apiClient.get<Notice[]>(`/courses/${courseId}/notices`),
  getClasses: (courseId: string) => apiClient.get<ClassSession[]>(`/courses/${courseId}/classes`),
};
