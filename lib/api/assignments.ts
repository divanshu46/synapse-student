import { apiClient } from './client';
import { Assignment } from '@/types';
import mockData from '../../../master-student.json';

export const assignmentsApi = {
  getAll: () => apiClient.get<Assignment[]>('/assignments'),
  getByCourse: (courseId: string) => {
    return Promise.resolve(mockData.assignments.filter(a => a.courseId === courseId) as Assignment[]);
  },
  getById: (id: string) => {
    return Promise.resolve(mockData.assignments.find(a => a.id === id) as Assignment);
  },
};
