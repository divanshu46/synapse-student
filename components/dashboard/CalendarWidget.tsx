'use client';

import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { isSameDay } from 'date-fns';
import { DayContentProps } from 'react-day-picker';
import { ExternalLink } from 'lucide-react';
import mockData from '@/master-student.json';

const mockEvents = [
  ...mockData.calendar.classes.map(c => ({ id: c.id, type: 'class' as const, startDate: new Date(c.date) })),
  ...mockData.calendar.exams.map(e => ({ id: e.id, type: 'exam' as const, startDate: new Date(e.date) })),
  ...mockData.assignments.filter(a => a.status === 'pending').map(a => ({ id: a.id, type: 'assignment' as const, startDate: new Date(a.dueDate) })),
  ...mockData.quizzes.filter(q => q.status === 'upcoming' || q.status === 'active').map(q => ({ id: q.id, type: 'quiz' as const, startDate: new Date(q.startDate) })),
  ...mockData.calendar.events.map(e => ({ id: e.id, type: 'event' as const, startDate: new Date(e.date) }))
];

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getEventTypesForDate = (date: Date) => {
    const dayEvents = mockEvents.filter(e => isSameDay(e.startDate, date));
    const types = new Set(dayEvents.map(e => e.type));
    return Array.from(types);
  };

  const DayContent = (props: DayContentProps) => {
    const eventTypes = getEventTypesForDate(props.date);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-xs">{props.date.getDate()}</span>
        {eventTypes.length > 0 && (
          <div className="absolute bottom-0.5 flex gap-0.5">
            {eventTypes.includes('class') && <div className="w-1 h-1 rounded-full bg-blue-500" />}
            {eventTypes.includes('assignment') && <div className="w-1 h-1 rounded-full bg-amber-500" />}
            {eventTypes.includes('quiz') && <div className="w-1 h-1 rounded-full bg-purple-500" />}
            {eventTypes.includes('exam') && <div className="w-1 h-1 rounded-full bg-red-500" />}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          <Link href="/calendar">
            <Button size="sm" variant="ghost">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          components={{
            DayContent
          }}
          className="rounded-base mx-auto [&_table]:mx-auto [&_td]:h-10 [&_td]:w-10 [&_th]:h-8 [&_th]:w-10 [&_td_button]:h-9 [&_td_button]:w-9 [&_td_button]:text-xs"
        />
      </CardContent>
    </Card>
  );
}
