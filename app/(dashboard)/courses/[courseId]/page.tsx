'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Pin, FileText, ClipboardCheck, Calendar, Download, Send, Users, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import mockData from '@/master-student.json';

const mockNotices = mockData.messages
  .filter(m => m.type === 'announcement')
  .map(m => ({
    id: m.id,
    type: 'announcement',
    title: m.subject,
    content: m.body,
    author: m.from,
    postedAt: new Date(m.date),
    isPinned: m.priority === 'high',
    comments: []
  }));

const mockClassMembers = {
  professors: [
    { id: '1', name: 'Mrs. Priya Deshmukh', email: 'priya.deshmukh@school.in', role: 'Mathematics Teacher' },
    { id: '2', name: 'Mr. Arjun Mehta', email: 'arjun.mehta@school.in', role: 'English Teacher' },
  ],
  tas: [],
  students: [
    { id: '4', name: 'Aarav Sharma', email: 'aarav.sharma@student.school.in', role: 'Student' },
    { id: '5', name: 'Diya Patel', email: 'diya.patel@student.school.in', role: 'Student' },
    { id: '6', name: 'Aryan Singh', email: 'aryan.singh@student.school.in', role: 'Student' },
    { id: '7', name: 'Ananya Reddy', email: 'ananya.reddy@student.school.in', role: 'Student' },
    { id: '8', name: 'Rohan Gupta', email: 'rohan.gupta@student.school.in', role: 'Student' },
  ],
};

const getNoticeIcon = (type: string) => {
  switch (type) {
    case 'assignment': return FileText;
    case 'quiz': return ClipboardCheck;
    case 'syllabus': return Download;
    default: return Pin;
  }
};

export default function CourseHomePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [showRoster, setShowRoster] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setNewComment('');
  };

  const totalMembers = mockClassMembers.professors.length + mockClassMembers.tas.length + mockClassMembers.students.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading">Data Structures & Algorithms</h1>
          <p className="text-sm mt-1">CS201 • Dr. Smith • Fall 2025</p>
        </div>
        <Button variant="default" onClick={() => setShowRoster(true)}>
          <Users className="h-4 w-4 mr-2" />
          Class Roster ({totalMembers})
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading">Notice Board</h2>
        <Badge variant="neutral">{mockNotices.length} notices</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {mockNotices.filter(n => n.isPinned).map(notice => {
              const Icon = getNoticeIcon(notice.type);
              return (
                <Card key={notice.id} className="cursor-pointer hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all" onClick={() => setSelectedNotice(notice)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Pin className="h-4 w-4" />
                        <Badge variant="default" className="text-xs uppercase">{notice.type}</Badge>
                      </div>
                      <span className="text-xs">{format(notice.postedAt, 'MMM dd, yyyy')}</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{notice.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{notice.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs">Posted by {notice.author}</p>
                      <p className="text-xs">{notice.comments.length} comments</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {mockNotices.filter(n => !n.isPinned).map(notice => {
              const Icon = getNoticeIcon(notice.type);
              return (
                <Card key={notice.id} className="cursor-pointer hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all" onClick={() => setSelectedNotice(notice)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <Badge variant="default" className="text-xs uppercase">{notice.type}</Badge>
                      </div>
                      <span className="text-xs">{format(notice.postedAt, 'MMM dd, yyyy')}</span>
                    </div>
                    <CardTitle className="text-lg mt-2">{notice.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{notice.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs">Posted by {notice.author}</p>
                      <p className="text-xs">{notice.comments.length} comments</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/assignments?courseId=${courseId}`}>
                <Button variant="default" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Assignments
                </Button>
              </Link>
              <Link href={`/quizzes?courseId=${courseId}`}>
                <Button variant="default" className="w-full justify-start">
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Quizzes
                </Button>
              </Link>
              <Link href={`/grades?courseId=${courseId}`}>
                <Button variant="default" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Grades
                </Button>
              </Link>
              <Link href={`/courses/${courseId}/materials`}>
                <Button variant="default" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Materials
                </Button>
              </Link>
              <Link href={`/course-materials?courseId=${courseId}`}>
                <Button variant="default" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Course Materials
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Course Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs">Assignments Completed</p>
                <p className="text-2xl font-heading">8/12</p>
              </div>
              <div>
                <p className="text-xs">Average Grade</p>
                <p className="text-2xl font-heading">85%</p>
              </div>
              <div>
                <p className="text-xs">Attendance</p>
                <p className="text-2xl font-heading">92%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <DialogContent className="!max-w-6xl max-h-[95vh] overflow-y-auto w-[90vw]">
          {selectedNotice && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className="text-xs uppercase">{selectedNotice.type}</Badge>
                  <span className="text-xs">{format(selectedNotice.postedAt, 'MMM dd, yyyy')}</span>
                </div>
                <DialogTitle className="text-2xl">{selectedNotice.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm">{selectedNotice.content}</p>
                  <p className="text-xs mt-3 text-muted-foreground">Posted by {selectedNotice.author}</p>
                </div>

                <div className="border-t-2 border-border pt-4">
                  <h3 className="font-heading text-lg mb-3">Comments ({selectedNotice.comments.length})</h3>
                  
                  <div className="space-y-3 mb-4">
                    {selectedNotice.comments.map((comment: any) => (
                      <div key={comment.id} className="p-3 rounded-base border-2 border-border bg-secondary-background">
                        <p className="text-sm">{comment.text}</p>
                        <p className="text-xs mt-2">
                          {comment.author} • {format(comment.postedAt, 'MMM dd, yyyy')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 items-center">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <Button size="icon" onClick={handleAddComment} className="self-center">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showRoster} onOpenChange={setShowRoster}>
        <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Class Roster</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg mb-3">Professors</h3>
              <div className="space-y-2">
                {mockClassMembers.professors.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-base border-2 border-border bg-secondary-background">
                    <Avatar>
                      <AvatarFallback className="bg-main text-main-foreground font-base">{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-base">{member.name}</p>
                      <p className="text-sm">{member.email}</p>
                    </div>
                    <Badge variant="default">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg mb-3">Teaching Assistants</h3>
              <div className="space-y-2">
                {mockClassMembers.tas.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-base border-2 border-border bg-secondary-background">
                    <Avatar>
                      <AvatarFallback className="bg-main text-main-foreground font-base">{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-base">{member.name}</p>
                      <p className="text-sm">{member.email}</p>
                    </div>
                    <Badge variant="default">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg mb-3">Students ({mockClassMembers.students.length})</h3>
              <div className="space-y-2">
                {mockClassMembers.students.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 rounded-base border-2 border-border bg-secondary-background">
                    <Avatar>
                      <AvatarFallback className="bg-main text-main-foreground font-base">{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-base">{member.name}</p>
                      <p className="text-sm">{member.email}</p>
                    </div>
                    <Badge variant="default">{member.role}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
