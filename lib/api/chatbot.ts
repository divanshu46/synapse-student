import { apiClient } from './client';
import mockData from '../../../master-student.json';

export const chatbotApi = {
  sendMessage: async (message: string) => {
    // Include mock data as context for chatbot
    const context = {
      student: mockData.student,
      courses: mockData.courses,
      chapters: mockData.chapters,
      grades: mockData.grades,
      assignments: mockData.assignments,
      quizzes: mockData.quizzes
    };
    
    return apiClient.post('/chatbot/message', { message, context });
  },
  
  getContext: () => {
    return Promise.resolve(mockData);
  }
};
