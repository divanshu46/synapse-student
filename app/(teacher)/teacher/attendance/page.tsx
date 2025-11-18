'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const mockCourses = [
  { id: '1', name: 'Data Structures & Algorithms', code: 'CS201' },
  { id: '2', name: 'Web Development', code: 'CS301' },
  { id: '3', name: 'Database Systems', code: 'CS401' },
];

const mockAttendance = [
  { 
    studentId: '1', 
    studentName: 'Alice Johnson',
    email: 'alice.j@university.edu',
    totalClasses: 30,
    attended: 28,
    percentage: 93.3
  },
  { 
    studentId: '2', 
    studentName: 'Bob Williams',
    email: 'bob.w@university.edu',
    totalClasses: 30,
    attended: 25,
    percentage: 83.3
  },
  { 
    studentId: '3', 
    studentName: 'Carol Martinez',
    email: 'carol.m@university.edu',
    totalClasses: 30,
    attended: 30,
    percentage: 100
  },
  { 
    studentId: '4', 
    studentName: 'David Brown',
    email: 'david.b@university.edu',
    totalClasses: 30,
    attended: 22,
    percentage: 73.3
  },
];

export default function TeacherAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [showUpload, setShowUpload] = useState(false);

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) return 'default';
    if (percentage >= 75) return 'secondary';
    return 'destructive';
  };

  const averageAttendance = (mockAttendance.reduce((sum, s) => sum + s.percentage, 0) / mockAttendance.length).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading">Attendance</h1>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {mockCourses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.code} - {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Dialog open={showUpload} onOpenChange={setShowUpload}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Attendance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Attendance</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Date</Label>
                  <Input type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} />
                </div>
                <div>
                  <Label>Upload CSV File</Label>
                  <div className="border-2 border-dashed border-border rounded-base p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">CSV file with student IDs and attendance status</p>
                    <input type="file" accept=".csv" className="hidden" id="csv-upload" />
                    <label htmlFor="csv-upload">
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                </div>
                <Button className="w-full">Upload Attendance</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Total Students</p>
              <p className="text-2xl font-heading">{mockAttendance.length}</p>
            </div>
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Average Attendance</p>
              <p className="text-2xl font-heading">{averageAttendance}%</p>
            </div>
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-heading">{mockAttendance[0]?.totalClasses || 0}</p>
            </div>
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Below 75%</p>
              <p className="text-2xl font-heading">{mockAttendance.filter(s => s.percentage < 75).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-heading">Student</th>
                  <th className="text-center p-3 font-heading">Classes Attended</th>
                  <th className="text-center p-3 font-heading">Total Classes</th>
                  <th className="text-center p-3 font-heading">Percentage</th>
                  <th className="text-center p-3 font-heading">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAttendance.map(student => (
                  <tr key={student.studentId} className="border-b border-border hover:bg-secondary/20">
                    <td className="p-3">
                      <div>
                        <p className="font-base text-sm">{student.studentName}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </td>
                    <td className="text-center p-3">{student.attended}</td>
                    <td className="text-center p-3">{student.totalClasses}</td>
                    <td className="text-center p-3 font-heading">{student.percentage.toFixed(1)}%</td>
                    <td className="text-center p-3">
                      <Badge variant={getAttendanceBadge(student.percentage)}>
                        {student.percentage >= 90 ? 'Excellent' : student.percentage >= 75 ? 'Good' : 'Low'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
