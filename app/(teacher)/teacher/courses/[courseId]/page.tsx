'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Pin, Users, Trash2, Edit, FileText, ClipboardCheck, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';

const mockNotices = [
  { id: '1', type: 'announcement', title: 'Midterm Exam Schedule', content: 'The midterm exam will be held on Nov 25, 2025 at 10:00 AM in Room 301.', postedAt: new Date(), isPinned: true },
  { id: '2', type: 'assignment', title: 'Assignment 3 Posted', content: 'New assignment on Binary Trees is now available. Due date: Nov 22, 2025.', postedAt: new Date(2025, 10, 15), isPinned: false },
];

const mockStudents = [
  { id: '1', name: 'Alice Johnson', email: 'alice.j@university.edu', enrolledAt: '2025-08-15' },
  { id: '2', name: 'Bob Williams', email: 'bob.w@university.edu', enrolledAt: '2025-08-15' },
  { id: '3', name: 'Carol Martinez', email: 'carol.m@university.edu', enrolledAt: '2025-08-16' },
];

export default function TeacherCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <Link href="/teacher/courses">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading">Data Structures & Algorithms</h1>
          <p className="text-sm text-muted-foreground mt-1">CS201 • Fall 2025</p>
        </div>
      </div>

      <Tabs defaultValue="notices" className="w-full">
        <TabsList>
          <TabsTrigger value="notices">Notice Board</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <TabsContent value="notices" className="space-y-4 mt-0">
              <div className="flex justify-end">
                <Dialog open={showAddNotice} onOpenChange={setShowAddNotice}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Notice
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Notice</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="assignment">Assignment</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="syllabus">Syllabus</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input placeholder="Notice title" />
                      </div>
                      <div>
                        <Label>Content</Label>
                        <Textarea placeholder="Notice content" rows={4} />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="pin" />
                        <Label htmlFor="pin">Pin this notice</Label>
                      </div>
                      <Button className="w-full">Post Notice</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {mockNotices.map(notice => (
                  <Card key={notice.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {notice.isPinned && <Pin className="h-4 w-4" />}
                            <Badge variant="default" className="text-xs uppercase">{notice.type}</Badge>
                            <span className="text-xs text-muted-foreground">{format(notice.postedAt, 'MMM dd, yyyy')}</span>
                          </div>
                          <CardTitle className="text-lg">{notice.title}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{notice.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4 mt-0">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{mockStudents.length} students enrolled</p>
                <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Student to Course</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Student Email</Label>
                        <Input placeholder="student@university.edu" type="email" />
                      </div>
                      <Button className="w-full">Add Student</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {mockStudents.map(student => (
                  <Card key={student.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-heading text-sm">{student.name}</h4>
                          <p className="text-xs text-muted-foreground">{student.email}</p>
                          <p className="text-xs text-muted-foreground">Enrolled: {format(new Date(student.enrolledAt), 'MMM dd, yyyy')}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/teacher/assignments?courseId=${courseId}`}>
                  <Button variant="default" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    Assignments
                    <Edit className="h-3 w-3 ml-auto" />
                  </Button>
                </Link>
                <Link href={`/teacher/quizzes?courseId=${courseId}`}>
                  <Button variant="default" className="w-full justify-start gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Quizzes
                    <Edit className="h-3 w-3 ml-auto" />
                  </Button>
                </Link>
                <Link href={`/teacher/grades?courseId=${courseId}`}>
                  <Button variant="default" className="w-full justify-start gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Grades
                    <Edit className="h-3 w-3 ml-auto" />
                  </Button>
                </Link>
                <Link href={`/teacher/courses/${courseId}/course-materials`}>
                  <Button variant="default" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" />
                    Course Materials
                    <Edit className="h-3 w-3 ml-auto" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
