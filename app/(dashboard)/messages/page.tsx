'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComposeDialog } from '@/components/messages/ComposeDialog';
import { Mail, Inbox, Star, Archive, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';

import mockData from '@/../master-student.json';

const mockMessages = mockData.messages.map(m => ({
  id: m.id,
  from: m.from,
  subject: m.subject,
  preview: m.body.substring(0, 50) + '...',
  date: new Date(m.date),
  isRead: m.read,
  isStarred: false,
  course: mockData.courses.find(c => c.id === m.courseId)?.name || 'General'
}));

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [tab, setTab] = useState('inbox');

  const filteredMessages = mockMessages.filter(m => {
    if (tab === 'starred') return m.isStarred;
    if (tab === 'unread') return !m.isRead;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading">Messages</h1>
        <Button variant="default" onClick={() => setShowCompose(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6">
        <Card>
          <CardHeader>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full">
                <TabsTrigger value="inbox" className="flex-1">
                  <Inbox className="h-4 w-4 mr-2" />
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex-1">
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Unread
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredMessages.map(message => (
                <div
                  key={message.id}
                  className={`p-4 border-b-2 border-border cursor-pointer hover:bg-secondary-background transition-colors ${!message.isRead ? 'bg-main/10' : ''} ${selectedMessage?.id === message.id ? 'bg-main/20' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border-2 border-border">
                        <AvatarFallback>{message.from[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-base text-sm">{message.from}</p>
                        <p className="text-xs">{format(message.date, 'MMM dd')}</p>
                      </div>
                    </div>
                    {message.isStarred && <Star className="h-4 w-4 fill-amber-500 text-amber-500" />}
                  </div>
                  <p className="font-base text-sm mb-1">{message.subject}</p>
                  <p className="text-xs line-clamp-1">{message.preview}</p>
                  <Badge variant="outline" className="mt-2 text-xs">{message.course}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedMessage ? selectedMessage.subject : 'Select a message'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b-2 border-border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-border">
                      <AvatarFallback>{selectedMessage.from[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-base">{selectedMessage.from}</p>
                      <p className="text-sm">{format(selectedMessage.date, 'PPP p')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p>{selectedMessage.preview}</p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="mt-4">
                    Best regards,<br />
                    {selectedMessage.from}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-border">
                  <Button variant="default" onClick={() => setShowCompose(true)}>
                    <Send className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-center">
                <div>
                  <Mail className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-sm">Select a message to view its contents</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ComposeDialog open={showCompose} onOpenChange={setShowCompose} />
    </div>
  );
}
