'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, HardDrive, Cloud } from 'lucide-react';

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFilesSelected: (files: File[]) => void;
}

export function FileUploadDialog({ open, onOpenChange, onFilesSelected }: FileUploadDialogProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
    onOpenChange(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
      onOpenChange(false);
    }
  };

  const handleGoogleDrive = () => {
    alert('Google Drive integration coming soon!');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload Files</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-base p-8 text-center transition-all ${
              isDragging ? 'border-main bg-main/10' : 'border-border'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg font-heading mb-2">Drag and drop files here</p>
            <p className="text-sm mb-4">or choose from the options below</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="default"
              className="h-24 flex-col gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <HardDrive className="h-8 w-8" />
              <span>Upload from Device</span>
            </Button>

            <Button
              variant="default"
              className="h-24 flex-col gap-2"
              onClick={handleGoogleDrive}
            >
              <Cloud className="h-8 w-8" />
              <span>Google Drive</span>
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
