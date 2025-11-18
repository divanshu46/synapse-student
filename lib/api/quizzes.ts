import { apiClient } from './client';
import { Quiz } from '@/types';
import mockData from '../../../master-student.json';

export const quizzesApi = {
  getAll: () => apiClient.get<Quiz[]>('/quizzes'),
  getByCourse: (courseId: string) => {
    return Promise.resolve(mockData.quizzes.filter(q => q.courseId === courseId) as Quiz[]);
  },
  getById: (id: string) => {
    return Promise.resolve(mockData.quizzes.find(q => q.id === id) as Quiz);
  },
};
