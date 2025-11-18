'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Download, Award, Calendar, User, BookOpen } from 'lucide-react';

import mockData from '@/../master-student.json';

const mockOutlines: Record<string, any> = {};
mockData.courseOutlines.forEach(outline => {
  mockOutlines[outline.courseId] = {
    id: outline.courseId,
    courseName: outline.courseName,
    courseCode: mockData.courses.find(c => c.id === outline.courseId)?.code || '',
    tenure: mockData.metadata.academicYear,
    credits: mockData.courses.find(c => c.id === outline.courseId)?.credits || 0,
    description: mockData.courses.find(c => c.id === outline.courseId)?.description || '',
    professor: mockData.courses.find(c => c.id === outline.courseId)?.instructor || '',
    chapters: outline.chapters.map((ch: any) => ({
      id: ch.id,
      title: ch.title,
      weightage: 10,
      description: ch.description
    })),
    resources: outline.chapters.flatMap((ch: any) => ch.resources || [])
  };
});

export default function CourseMaterialDetailPage({ params }: { params: Promise<{ materialId: string }> }) {
  const { materialId } = use(params);
  const outline = mockOutlines[materialId as keyof typeof mockOutlines];

  if (!outline) {
    return <div className="p-6">Course material not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <Link href="/course-materials">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Course Materials
        </Button>
      </Link>

      <Card>
        <CardHeader>
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
        </CardHeader>
      </Card>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList>
          <TabsTrigger value="resources">Overall Resources</TabsTrigger>
          <TabsTrigger value="chapters">Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-3 mt-4">
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
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="chapters" className="space-y-3 mt-4">
          {outline.chapters.map(chapter => (
            <Card key={chapter.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-heading text-base">{chapter.title}</h4>
                      <Badge variant="outline" className="text-xs">{chapter.weightage}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{chapter.description}</p>
                    {chapter.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {chapter.tags.map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag.replace(/-/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
