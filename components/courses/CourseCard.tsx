'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock } from 'lucide-react';
import { Course } from '@/types';

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2">{course.code}</Badge>
              <h3 className="font-semibold text-lg">{course.name}</h3>
            </div>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.instructor}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.credits} credits
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
