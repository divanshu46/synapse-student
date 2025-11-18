'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, FileText, ClipboardCheck, BarChart3, FolderOpen, Calendar, Users } from 'lucide-react';

const tabs = [
  { name: 'Home', href: '', icon: Home },
  { name: 'Assignments', href: '/assignments', icon: FileText },
  { name: 'Quizzes', href: '/quizzes', icon: ClipboardCheck },
  { name: 'Grades', href: '/grades', icon: BarChart3 },
  { name: 'Materials', href: '/materials', icon: FolderOpen },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Attendance', href: '/attendance', icon: Users },
];

export function CourseNavigation({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  const basePath = `/courses/${courseId}`;

  return (
    <div className="border-b bg-card">
      <nav className="flex gap-1 px-6 overflow-x-auto">
        {tabs.map((tab) => {
          const href = `${basePath}${tab.href}`;
          const isActive = pathname === href;
          
          return (
            <Link
              key={tab.name}
              href={href}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
