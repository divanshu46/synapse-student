import mockData from '../../../master-student.json';

// Mock API client that returns data from master-student.json
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Route to appropriate mock data
    if (endpoint === '/courses') {
      return mockData.courses as T;
    }
    if (endpoint.startsWith('/courses/') && endpoint.endsWith('/notices')) {
      const courseId = endpoint.split('/')[2];
      return mockData.notices.filter(n => n.courseId === courseId) as T;
    }
    if (endpoint.startsWith('/assignments')) {
      return mockData.assignments as T;
    }
    if (endpoint.startsWith('/quizzes')) {
      return mockData.quizzes as T;
    }
    if (endpoint.startsWith('/grades')) {
      return mockData.grades as T;
    }
    
    throw new Error(`Mock endpoint not implemented: ${endpoint}`);
  },
  
  post: async <T>(endpoint: string, data: unknown): Promise<T> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {} as T;
  },
  
  put: async <T>(endpoint: string, data: unknown): Promise<T> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {} as T;
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {} as T;
  },
};
