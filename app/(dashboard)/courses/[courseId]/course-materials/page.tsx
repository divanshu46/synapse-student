'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseCourseMaterialsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/course-materials?courseId=${courseId}`);
  }, [courseId, router]);

  return null;
}
