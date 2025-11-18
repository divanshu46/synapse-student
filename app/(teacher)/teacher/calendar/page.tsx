'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';

const mockEvents = [
  { id: '1', title: 'CS201 Lecture', date: new Date(2025, 10, 20, 10, 0), type: 'class', course: 'Data Structures' },
  { id: '2', title: 'Assignment Due', date: new Date(2025, 10, 22, 23, 59), type: 'assignment', course: 'Data Structures' },
  { id: '3', title: 'Quiz', date: new Date(2025, 10, 25, 14, 0), type: 'quiz', course: 'Web Development' },
];

export default function TeacherCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsOnSelectedDate = mockEvents.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading">Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-heading p-2">{day}</div>
              ))}
              {daysInMonth.map(day => {
                const hasEvents = mockEvents.some(event => isSameDay(event.date, day));
                return (
                  <button
                    key={day.toString()}
                    onClick={() => setSelectedDate(day)}
                    className={`p-2 text-sm rounded-base border-2 transition-all ${
                      isToday(day) ? 'border-primary bg-primary text-primary-foreground' :
                      isSameDay(day, selectedDate) ? 'border-border bg-secondary' :
                      'border-transparent hover:border-border'
                    }`}
                  >
                    <div>{format(day, 'd')}</div>
                    {hasEvents && <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {eventsOnSelectedDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events scheduled</p>
            ) : (
              eventsOnSelectedDate.map(event => (
                <div key={event.id} className="p-3 border-2 border-border rounded-base">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-heading text-sm">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">{event.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.course}</p>
                  <p className="text-xs text-muted-foreground">{format(event.date, 'h:mm a')}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
