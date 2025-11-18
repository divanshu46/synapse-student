'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, GraduationCap, ClipboardList, Calendar, MessageSquare, PlusCircle, Menu, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/teacher', icon: Home },
  { name: 'My Courses', href: '/teacher/courses', icon: BookOpen },
  { name: 'Course Materials', href: '/teacher/course-materials', icon: FileText },
  { name: 'Create Course', href: '/teacher/create-course', icon: PlusCircle },
  { name: 'Grades', href: '/teacher/grades', icon: GraduationCap },
  { name: 'Attendance', href: '/teacher/attendance', icon: ClipboardList },
  { name: 'Calendar', href: '/teacher/calendar', icon: Calendar },
  { name: 'Messages', href: '/teacher/messages', icon: MessageSquare },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-heading">Teacher Portal</h1>
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen w-64 border-r-2 border-border bg-secondary-background transition-transform lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex items-center h-16 px-6 border-b-2 border-border">
            <h1 className="text-xl font-heading">Teacher Portal</h1>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <div
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-base rounded-base border-2 border-border transition-all',
                      isActive
                        ? 'bg-main text-main-foreground shadow-shadow'
                        : 'bg-secondary-background hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-shadow'
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
