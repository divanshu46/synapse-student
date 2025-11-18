'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function CourseAssignmentsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/assignments?courseId=${courseId}`);
  }, [courseId, router]);

  return null;
}
