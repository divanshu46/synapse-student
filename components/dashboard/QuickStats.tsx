'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, FileText, ClipboardCheck, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Active Courses', value: '5', icon: BookOpen, color: 'text-blue-500' },
  { label: 'Pending Assignments', value: '3', icon: FileText, color: 'text-orange-500' },
  { label: 'Upcoming Quizzes', value: '2', icon: ClipboardCheck, color: 'text-purple-500' },
  { label: 'Average Grade', value: '87%', icon: TrendingUp, color: 'text-green-500' },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
