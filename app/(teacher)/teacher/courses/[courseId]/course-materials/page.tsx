'use client';

import { use } from 'react';
import { redirect } from 'next/navigation';

export default function CourseMaterialsRedirect({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  redirect(`/teacher/course-materials/${courseId}`);
}
