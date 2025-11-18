import { useQuery, useMutation } from '@tanstack/react-query';
import { quizzesApi } from '@/lib/api/quizzes';

export const useQuizzes = (courseId: string) => {
  return useQuery({
    queryKey: ['quizzes', courseId],
    queryFn: async () => {
      const { data } = await quizzesApi.getByCourse(courseId);
      return data;
    },
    enabled: !!courseId,
  });
};

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const { data } = await quizzesApi.getById(id);
      return data;
    },
    enabled: !!id,
  });
};

export const useSubmitQuiz = () => {
  return useMutation({
    mutationFn: ({ id, answers }: { id: string; answers: Record<string, string | string[]> }) =>
      quizzesApi.submitAttempt(id, answers),
  });
};
