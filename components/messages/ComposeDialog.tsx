'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, X, Image, FileText, Smile } from 'lucide-react';

interface ComposeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComposeDialog({ open, onOpenChange }: ComposeDialogProps) {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [priority, setPriority] = useState('normal');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    // Send logic here
    console.log({ to, cc, bcc, subject, message, attachments, priority });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">New Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* To Field */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-base w-16">To</label>
              <Input
                placeholder="Recipient email or name"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                {!showCc && (
                  <Button size="sm" variant="ghost" onClick={() => setShowCc(true)}>
                    Cc
                  </Button>
                )}
                {!showBcc && (
                  <Button size="sm" variant="ghost" onClick={() => setShowBcc(true)}>
                    Bcc
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Cc Field */}
          {showCc && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-base w-16">Cc</label>
              <Input
                placeholder="Carbon copy"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" variant="ghost" onClick={() => setShowCc(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Bcc Field */}
          {showBcc && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-base w-16">Bcc</label>
              <Input
                placeholder="Blind carbon copy"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" variant="ghost" onClick={() => setShowBcc(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Subject Field */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-base w-16">Subject</label>
            <Input
              placeholder="Message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Priority Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-base w-16">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Body */}
          <div>
            <label className="text-sm font-base mb-2 block">Message</label>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={12}
              className="resize-none"
            />
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-base">Attachments ({attachments.length})</label>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-base border-2 border-border bg-secondary-background">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024).toFixed(2)} KB
                      </Badge>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => removeAttachment(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-border">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <label className="cursor-pointer">
                  <Image className="h-4 w-4 mr-2" />
                  Image
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              </Button>
              <Button variant="outline" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="default" onClick={handleSend} disabled={!to || !subject}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
