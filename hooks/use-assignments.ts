import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsApi } from '@/lib/api/assignments';

export const useAssignments = (courseId: string) => {
  return useQuery({
    queryKey: ['assignments', courseId],
    queryFn: async () => {
      const { data } = await assignmentsApi.getByCourse(courseId);
      return data;
    },
    enabled: !!courseId,
  });
};

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      assignmentsApi.submit(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
};
