'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, FileText, ClipboardCheck, BarChart3, Calendar, MessageSquare, Bot, BookMarked, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Assignments', href: '/assignments', icon: FileText },
  { name: 'Quizzes', href: '/quizzes', icon: ClipboardCheck },
  { name: 'Course Materials', href: '/course-materials', icon: BookMarked },
  { name: 'Grades', href: '/grades', icon: BarChart3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Psychometrics', href: '/psychometrics', icon: Brain },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Synapse Agent', href: '/chatbot', icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r-2 border-border bg-secondary-background">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 px-6 border-b-2 border-border">
          <h1 className="text-xl font-heading">Synapse LMS</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-base rounded-base border-2 border-border transition-all',
                  isActive
                    ? 'bg-main text-main-foreground shadow-shadow'
                    : 'bg-secondary-background hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-shadow'
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
