'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseQuizzesPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/quizzes?courseId=${courseId}`);
  }, [courseId, router]);

  return null;
}
