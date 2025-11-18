import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function TeacherMessagesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading">Messages</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Message functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
