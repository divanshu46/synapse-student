'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Plus, Trash2, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateCoursePage() {
  const router = useRouter();
  const [mode, setMode] = useState<'select' | 'manual' | 'ai'>('select');
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    tenure: '',
    credits: '',
    description: '',
    professor: '',
    chapters: [] as Array<{ title: string; weightage: string; description: string }>,
  });

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate AI parsing
      setTimeout(() => {
        setCourseData({
          courseName: 'Introduction to Machine Learning',
          courseCode: 'CS501',
          tenure: 'Spring 2026 (Jan - May)',
          credits: '4',
          description: 'Comprehensive introduction to machine learning algorithms and applications.',
          professor: 'Dr. Sarah Smith',
          chapters: [
            { title: 'Introduction to ML', weightage: '10', description: 'Overview of machine learning concepts' },
            { title: 'Supervised Learning', weightage: '25', description: 'Classification and regression techniques' },
            { title: 'Unsupervised Learning', weightage: '20', description: 'Clustering and dimensionality reduction' },
            { title: 'Neural Networks', weightage: '25', description: 'Deep learning fundamentals' },
            { title: 'Model Evaluation', weightage: '20', description: 'Testing and validation methods' },
          ],
        });
        setMode('ai');
        setStep(2);
      }, 2000);
    }
  };

  const addChapter = () => {
    setCourseData({
      ...courseData,
      chapters: [...courseData.chapters, { title: '', weightage: '', description: '' }],
    });
  };

  const removeChapter = (index: number) => {
    setCourseData({
      ...courseData,
      chapters: courseData.chapters.filter((_, i) => i !== index),
    });
  };

  const updateChapter = (index: number, field: string, value: string) => {
    const updated = [...courseData.chapters];
    updated[index] = { ...updated[index], [field]: value };
    setCourseData({ ...courseData, chapters: updated });
  };

  const handleSave = () => {
    // Save course logic
    router.push('/teacher/courses');
  };

  if (mode === 'select') {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-heading">Create New Course</h1>
        <p className="text-muted-foreground">Choose how you want to create your course</p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Card className="cursor-pointer hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all" onClick={() => { setMode('manual'); setStep(1); }}>
            <CardHeader>
              <FileText className="h-12 w-12 mb-4" />
              <CardTitle>Manual Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Fill in all course details manually step by step</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
            <CardHeader>
              <Wand2 className="h-12 w-12 mb-4" />
              <CardTitle>AI Course Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Upload a PDF syllabus and let AI extract course details</p>
              <label htmlFor="pdf-upload">
                <Button variant="outline" className="w-full gap-2" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    Upload PDF
                  </span>
                </Button>
              </label>
              <input id="pdf-upload" type="file" accept=".pdf" className="hidden" onChange={handlePDFUpload} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading">Create New Course</h1>
          <p className="text-sm text-muted-foreground">{mode === 'ai' ? 'AI Generated - Review & Edit' : 'Manual Entry'}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">Step {step} of 2</Badge>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Course Name</Label>
                <Input value={courseData.courseName} onChange={(e) => setCourseData({ ...courseData, courseName: e.target.value })} placeholder="e.g., Data Structures" />
              </div>
              <div>
                <Label>Course Code</Label>
                <Input value={courseData.courseCode} onChange={(e) => setCourseData({ ...courseData, courseCode: e.target.value })} placeholder="e.g., CS201" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Tenure</Label>
                <Input value={courseData.tenure} onChange={(e) => setCourseData({ ...courseData, tenure: e.target.value })} placeholder="e.g., Fall 2025 (Aug - Dec)" />
              </div>
              <div>
                <Label>Credits</Label>
                <Input type="number" value={courseData.credits} onChange={(e) => setCourseData({ ...courseData, credits: e.target.value })} placeholder="e.g., 4" />
              </div>
            </div>
            <div>
              <Label>Professor</Label>
              <Input value={courseData.professor} onChange={(e) => setCourseData({ ...courseData, professor: e.target.value })} placeholder="e.g., Dr. John Doe" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })} placeholder="Brief course description" rows={3} />
            </div>
            <Button onClick={() => setStep(2)} className="w-full">Next: Add Chapters</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Chapters</CardTitle>
              <Button variant="outline" size="sm" onClick={addChapter} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Chapter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseData.chapters.map((chapter, index) => (
              <div key={index} className="p-4 border-2 border-border rounded-base space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm">Chapter {index + 1}</h4>
                  <Button variant="ghost" size="sm" onClick={() => removeChapter(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input value={chapter.title} onChange={(e) => updateChapter(index, 'title', e.target.value)} placeholder="Chapter title" />
                  </div>
                  <div>
                    <Label className="text-xs">Weightage (%)</Label>
                    <Input type="number" value={chapter.weightage} onChange={(e) => updateChapter(index, 'weightage', e.target.value)} placeholder="10" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea value={chapter.description} onChange={(e) => updateChapter(index, 'description', e.target.value)} placeholder="Chapter description" rows={2} />
                </div>
              </div>
            ))}

            {courseData.chapters.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No chapters added yet. Click "Add Chapter" to get started.</p>
            )}

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button onClick={handleSave} className="flex-1">Save Course</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
