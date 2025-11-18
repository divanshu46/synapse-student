import { useQuery } from '@tanstack/react-query';
import { coursesApi } from '@/lib/api/courses';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await coursesApi.getAll();
      return data;
    },
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await coursesApi.getById(id);
      return data;
    },
    enabled: !!id,
  });
};

export const useCourseNotices = (courseId: string) => {
  return useQuery({
    queryKey: ['notices', courseId],
    queryFn: async () => {
      const { data } = await coursesApi.getNotices(courseId);
      return data;
    },
    enabled: !!courseId,
  });
};
