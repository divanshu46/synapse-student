'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileUploadDialog } from '@/components/shared/FileUploadDialog';
import { Calendar, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';

const mockAssignment = {
  id: '1',
  courseId: '1',
  courseName: 'Data Structures',
  title: 'Binary Search Tree Implementation',
  description: 'Implement a BST with insert, delete, and search operations. Your implementation should handle edge cases and maintain BST properties.',
  dueDate: new Date(2025, 10, 20, 23, 59),
  totalPoints: 100,
  status: 'active' as const,
  instructions: 'Create a complete BST implementation with the following methods:\n- insert(value)\n- delete(value)\n- search(value)\n- inorder()\n- preorder()\n- postorder()',
};

export default function AssignmentDetailPage({ params }: { params: { assignmentId: string } }) {
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="outline">{mockAssignment.courseName}</Badge>
        <Badge variant="default" className="uppercase">{mockAssignment.status}</Badge>
      </div>

      <h1 className="text-3xl font-heading mb-6">{mockAssignment.title}</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs mb-1">Due Date</p>
                <p className="font-base flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {format(mockAssignment.dueDate, 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-xs mb-1">Time</p>
                <p className="font-base flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {format(mockAssignment.dueDate, 'hh:mm a')}
                </p>
              </div>
              <div>
                <p className="text-xs mb-1">Total Points</p>
                <p className="font-base flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {mockAssignment.totalPoints}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{mockAssignment.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{mockAssignment.instructions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit Assignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Upload your completed assignment files below.</p>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-base">Uploaded Files:</p>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="p-2 rounded-base border-2 border-border bg-secondary-background text-sm">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                ))}
              </div>
            )}

            <Button variant="default" onClick={() => setShowUpload(true)}>
              Upload Files
            </Button>
          </CardContent>
        </Card>
      </div>

      <FileUploadDialog
        open={showUpload}
        onOpenChange={setShowUpload}
        onFilesSelected={handleFilesSelected}
      />
    </div>
  );
}
