'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText } from 'lucide-react';
import { Assignment } from '@/types';
import { format } from 'date-fns';

export function AssignmentList({ assignments }: { assignments: Assignment[] }) {
  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'submitted': return 'bg-purple-100 text-purple-700';
      case 'graded': return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <Card key={assignment.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-lg">{assignment.title}</h3>
                  <Badge className={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Due: {format(new Date(assignment.dueDate), 'MMM dd, yyyy')}
                  </span>
                  <span>Points: {assignment.totalPoints}</span>
                </div>
              </div>
              <Link href={`/courses/${assignment.courseId}/assignments/${assignment.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
