'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp, FileText, Video, Download, User, Calendar, Award } from 'lucide-react';
import { CourseOutline, Chapter, Resource } from '@/types/course-outline';

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return FileText;
    case 'video': case 'mp4': return Video;
    case 'ppt': case 'pptx': return FileText;
    case 'doc': case 'docx': return FileText;
    default: return FileText;
  }
};

interface CourseOutlineCardProps {
  outline: CourseOutline;
}

export function CourseOutlineCard({ outline }: CourseOutlineCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  return (
    <Card className="border-4 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl font-heading mb-2">{outline.courseName}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">{outline.description}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <Badge variant="secondary" className="gap-1.5">
            <Calendar className="h-3 w-3" />
            {outline.tenure}
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <Award className="h-3 w-3" />
            {outline.credits} Credits
          </Badge>
          <Badge variant="secondary" className="gap-1.5">
            <User className="h-3 w-3" />
            {outline.professor.name}
          </Badge>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {outline.overallResources.length > 0 && (
            <div className="p-4 border-2 border-border rounded-base bg-secondary/20">
              <h4 className="font-heading text-sm mb-3">Overall Course Resources</h4>
              <div className="space-y-2">
                {outline.overallResources.map(resource => (
                  <ResourceItem key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-heading text-lg">Chapters ({outline.chapters.length})</h3>
            {outline.chapters.map(chapter => (
              <ChapterCard 
                key={chapter.id} 
                chapter={chapter}
                isExpanded={expandedChapters.has(chapter.id)}
                onToggle={() => toggleChapter(chapter.id)}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function ChapterCard({ chapter, isExpanded, onToggle }: { chapter: Chapter; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="border-2 border-border rounded-base p-4 bg-background">
      <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={onToggle}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-heading text-base">{chapter.title}</h4>
            <Badge variant="outline" className="text-xs">{chapter.weightage}%</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{chapter.description}</p>
        </div>
        <Button variant="ghost" size="sm" className="shrink-0">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && chapter.resources.length > 0 && (
        <Tabs defaultValue="resources" className="mt-4">
          <TabsList>
            <TabsTrigger value="resources">Resources ({chapter.resources.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="resources" className="space-y-2 mt-3">
            {chapter.resources.map(resource => (
              <ResourceItem key={resource.id} resource={resource} />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function ResourceItem({ resource }: { resource: Resource }) {
  const Icon = getFileIcon(resource.type);
  
  return (
    <div className="flex items-center justify-between p-3 rounded-base border-2 border-border hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-background">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-base text-sm">{resource.name}</p>
          <p className="text-xs text-muted-foreground">{resource.size}</p>
        </div>
      </div>
      <Button size="sm" variant="ghost">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
