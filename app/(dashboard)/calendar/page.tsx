'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { DayContentProps } from 'react-day-picker';

import mockData from '@/../master-student.json';

const mockEvents = [
  ...mockData.calendar.classes.map(c => ({
    id: c.id,
    title: c.title,
    type: 'class' as const,
    courseId: c.courseId,
    courseName: mockData.courses.find(course => course.id === c.courseId)?.name || '',
    startDate: new Date(c.date),
    location: c.location
  })),
  ...mockData.calendar.exams.map(e => ({
    id: e.id,
    title: e.title,
    type: 'exam' as const,
    courseId: e.courseId,
    courseName: mockData.courses.find(course => course.id === e.courseId)?.name || '',
    startDate: new Date(e.date),
    location: e.location
  })),
  ...mockData.quizzes.filter(q => q.status === 'upcoming' || q.status === 'active').map(q => ({
    id: q.id,
    title: q.title,
    type: 'quiz' as const,
    courseId: q.courseId,
    courseName: mockData.courses.find(course => course.id === q.courseId)?.name || '',
    startDate: new Date(q.startDate),
    location: 'Online'
  })),
  ...mockData.calendar.events.map(e => ({
    id: e.id,
    title: e.title,
    type: 'event' as const,
    courseId: '',
    courseName: '',
    startDate: new Date(e.date),
    location: e.location
  }))
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'all' | 'assignments' | 'quizzes' | 'exams' | 'classes'>('all');

  const filteredEvents = mockEvents.filter(e => {
    if (view === 'all') return true;
    if (view === 'classes') return e.type === 'class';
    return e.type === view.slice(0, -1);
  });
  const selectedDateEvents = filteredEvents.filter(e => isSameDay(e.startDate, selectedDate));
  const upcomingEvents = filteredEvents.filter(e => e.startDate > new Date()).slice(0, 8);

  const eventDates = mockEvents.map(e => e.startDate);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'default';
      case 'quiz': return 'secondary';
      case 'exam': return 'destructive';
      case 'class': return 'outline';
      default: return 'default';
    }
  };

  const getEventTypesForDate = (date: Date) => {
    const dayEvents = mockEvents.filter(e => isSameDay(e.startDate, date));
    const types = new Set(dayEvents.map(e => e.type));
    return Array.from(types);
  };

  const DayContent = (props: DayContentProps) => {
    const eventTypes = getEventTypesForDate(props.date);
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span>{props.date.getDate()}</span>
        {eventTypes.length > 0 && (
          <div className="absolute bottom-1 flex gap-0.5">
            {eventTypes.includes('class') && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
            {eventTypes.includes('assignment') && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
            {eventTypes.includes('quiz') && <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
            {eventTypes.includes('exam') && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-8 gap-12">
        <h1 className="text-3xl font-heading">Calendar</h1>
        <Tabs value={view} onValueChange={(v) => setView(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>My Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  components={{
                    DayContent
                  }}
                  className="rounded-base border-2 border-border p-6 min-w-[750px] [&_table]:w-full [&_td]:h-24 [&_td]:w-24 [&_th]:h-12 [&_th]:w-24 [&_th]:text-base [&_td_button]:h-20 [&_td_button]:w-20 [&_td_button]:text-lg [&_.rdp-caption]:text-xl [&_.rdp-caption]:font-heading [&_.rdp-caption]:mb-4 [&_.rdp-nav]:gap-2 [&_.rdp-nav_button]:h-8 [&_.rdp-nav_button]:w-8 [&_.rdp-nav_button]:relative [&_.rdp-nav_button]:static"
                  modifiers={{
                    hasEvent: eventDates
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-main/20 font-base"
                  }}
                />
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="font-heading text-lg">
                  Events on {format(selectedDate, 'PPP')}
                </h3>
                {selectedDateEvents.length === 0 ? (
                  <p className="text-sm">No events scheduled</p>
                ) : (
                  selectedDateEvents.map(event => (
                    <div key={event.id} className="p-4 rounded-base border-2 border-border hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-shadow transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-base">{event.title}</p>
                            <Badge variant={getTypeColor(event.type)} className="uppercase text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{event.courseName}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(event.startDate, 'p')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <CardTitle>Upcoming Events</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 rounded-base border-2 border-border bg-secondary-background hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-shadow transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getTypeColor(event.type)} className="uppercase text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="font-base text-sm mb-1">{event.title}</p>
                  <p className="text-xs mb-2">{event.courseName}</p>
                  <p className="text-xs">{format(event.startDate, 'PPP p')}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
