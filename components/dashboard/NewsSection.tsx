'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pin } from 'lucide-react';
import { format } from 'date-fns';
import mockData from '@/master-student.json';

const mockNews = mockData.messages
  .filter(m => m.type === 'announcement')
  .map(m => ({
    id: m.id,
    title: m.subject,
    course: mockData.courses.find(c => c.id === m.courseId)?.code || '',
    date: new Date(m.date),
    isPinned: m.priority === 'high'
  }))
  .slice(0, 5);

export function NewsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockNews.map((news) => (
          <div key={news.id} className="p-4 rounded-base border-2 border-border bg-secondary-background shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
            <div className="flex items-start gap-2">
              {news.isPinned && <Pin className="h-5 w-5 mt-0.5 flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-base text-sm mb-2">{news.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs">{news.course}</Badge>
                  <span className="text-xs">{format(news.date, 'MMM dd')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
