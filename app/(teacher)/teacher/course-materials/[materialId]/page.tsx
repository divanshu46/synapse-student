'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Download, Award, Calendar, User, Edit, Plus, Upload, Trash2 } from 'lucide-react';

const mockOutlines = {
  '1': {
    id: '1',
    courseName: 'Data Structures & Algorithms',
    courseCode: 'CS201',
    tenure: 'Fall 2025 (Aug - Dec)',
    credits: 4,
    description: 'Comprehensive study of fundamental data structures and algorithms including arrays, linked lists, trees, graphs, sorting, and searching.',
    professor: 'Dr. Sarah Smith',
    chapters: [
      { id: 'c1', title: 'Introduction to Data Structures', weightage: 10, description: 'Overview of data structures and complexity analysis' },
      { id: 'c2', title: 'Arrays and Linked Lists', weightage: 15, description: 'Linear data structures and operations' },
      { id: 'c3', title: 'Stacks and Queues', weightage: 12, description: 'LIFO and FIFO structures' },
      { id: 'c4', title: 'Trees and BST', weightage: 18, description: 'Tree terminology and binary search trees' },
      { id: 'c5', title: 'Graphs', weightage: 20, description: 'Graph representations and algorithms' },
      { id: 'c6', title: 'Sorting Algorithms', weightage: 15, description: 'Comparison and non-comparison sorting' },
      { id: 'c7', title: 'Dynamic Programming', weightage: 10, description: 'Memoization and tabulation techniques' },
    ],
    resources: [
      { id: 'r1', name: 'Course Syllabus.pdf', type: 'pdf', size: '245 KB' },
      { id: 'r2', name: 'Textbook - Algorithms.pdf', type: 'pdf', size: '12.4 MB' },
      { id: 'r3', name: 'Course Introduction.mp4', type: 'video', size: '156 MB' },
    ]
  },
  '2': {
    id: '2',
    courseName: 'Web Development',
    courseCode: 'CS301',
    tenure: 'Fall 2025 (Aug - Dec)',
    credits: 3,
    description: 'Modern web development with HTML, CSS, JavaScript, React, and Node.js.',
    professor: 'Prof. Michael Chen',
    chapters: [
      { id: 'c1', title: 'HTML & CSS Fundamentals', weightage: 15, description: 'Web page structure and styling' },
      { id: 'c2', title: 'JavaScript Basics', weightage: 20, description: 'Programming for the web' },
      { id: 'c3', title: 'React Framework', weightage: 25, description: 'Component-based UI development' },
      { id: 'c4', title: 'Backend with Node.js', weightage: 20, description: 'Server-side JavaScript' },
      { id: 'c5', title: 'Databases & APIs', weightage: 20, description: 'Data persistence and REST APIs' },
    ],
    resources: [
      { id: 'r1', name: 'Web Dev Syllabus.pdf', type: 'pdf', size: '180 KB' },
      { id: 'r2', name: 'HTML CSS Guide.pdf', type: 'pdf', size: '5.2 MB' },
    ]
  },
};

export default function CourseMaterialDetailPage({ params }: { params: Promise<{ materialId: string }> }) {
  const { materialId } = use(params);
  const [outline, setOutline] = useState(mockOutlines[materialId as keyof typeof mockOutlines]);
  const [editChapterDialog, setEditChapterDialog] = useState<any>(null);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [editInfoDialog, setEditInfoDialog] = useState(false);

  if (!outline) {
    return <div className="p-6">Course material not found</div>;
  }

  const handleEditChapter = (chapter: any) => {
    setEditChapterDialog(chapter);
  };

  const handleSaveChapter = () => {
    setEditChapterDialog(null);
  };

  const handleDeleteChapter = (chapterId: string) => {
    setOutline({
      ...outline,
      chapters: outline.chapters.filter(c => c.id !== chapterId)
    });
  };

  const handleDeleteResource = (resourceId: string) => {
    setOutline({
      ...outline,
      resources: outline.resources.filter(r => r.id !== resourceId)
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Link href="/teacher/course-materials">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Course Materials
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{outline.courseCode}</Badge>
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {outline.tenure}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  {outline.credits} Credits
                </Badge>
              </div>
              <CardTitle className="text-2xl">{outline.courseName}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{outline.description}</p>
              <p className="text-sm mt-2 flex items-center gap-1">
                <User className="h-3 w-3" />
                {outline.professor}
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditInfoDialog(true)}>
              <Edit className="h-3 w-3" />
              Edit Info
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList>
          <TabsTrigger value="resources">Overall Resources</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-3 mt-4">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2" onClick={() => setUploadDialog(true)}>
              <Upload className="h-4 w-4" />
              Upload Resource
            </Button>
          </div>
          {outline.resources.map(resource => (
            <Card key={resource.id} className="hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    <div>
                      <p className="font-base text-sm">{resource.name}</p>
                      <p className="text-xs text-muted-foreground">{resource.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteResource(resource.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="chapters" className="space-y-3 mt-4">
          <div className="flex justify-end mb-3">
            <Button size="sm" className="gap-2" onClick={() => setEditChapterDialog({ id: 'new', title: '', weightage: 0, description: '' })}>
              <Plus className="h-4 w-4" />
              Add Chapter
            </Button>
          </div>
          {outline.chapters.map(chapter => (
            <Card key={chapter.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-heading text-base">{chapter.title}</h4>
                      <Badge variant="outline" className="text-xs">{chapter.weightage}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{chapter.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEditChapter(chapter)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteChapter(chapter.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={!!editChapterDialog} onOpenChange={() => setEditChapterDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editChapterDialog?.id === 'new' ? 'Add Chapter' : 'Edit Chapter'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Chapter Title</Label>
              <Input defaultValue={editChapterDialog?.title} placeholder="Enter chapter title" />
            </div>
            <div>
              <Label>Weightage (%)</Label>
              <Input type="number" defaultValue={editChapterDialog?.weightage} placeholder="0-100" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea defaultValue={editChapterDialog?.description} placeholder="Enter chapter description" rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditChapterDialog(null)}>Cancel</Button>
              <Button onClick={handleSaveChapter}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Resource Name</Label>
              <Input placeholder="Enter resource name" />
            </div>
            <div>
              <Label>File</Label>
              <Input type="file" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadDialog(false)}>Cancel</Button>
              <Button onClick={() => setUploadDialog(false)}>Upload</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editInfoDialog} onOpenChange={setEditInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Course Name</Label>
              <Input defaultValue={outline.courseName} />
            </div>
            <div>
              <Label>Course Code</Label>
              <Input defaultValue={outline.courseCode} />
            </div>
            <div>
              <Label>Credits</Label>
              <Input type="number" defaultValue={outline.credits} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea defaultValue={outline.description} rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditInfoDialog(false)}>Cancel</Button>
              <Button onClick={() => setEditInfoDialog(false)}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
