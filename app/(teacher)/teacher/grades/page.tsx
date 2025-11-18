'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const mockCourses = [
  { id: '1', name: 'Data Structures & Algorithms', code: 'CS201' },
  { id: '2', name: 'Web Development', code: 'CS301' },
  { id: '3', name: 'Database Systems', code: 'CS401' },
];

const mockGrades = [
  { 
    studentId: '1', 
    studentName: 'Alice Johnson', 
    email: 'alice.j@university.edu',
    assignments: 85,
    quizzes: 90,
    midterm: 88,
    final: 92,
    overall: 89,
    grade: 'A'
  },
  { 
    studentId: '2', 
    studentName: 'Bob Williams', 
    email: 'bob.w@university.edu',
    assignments: 78,
    quizzes: 82,
    midterm: 75,
    final: 80,
    overall: 79,
    grade: 'B+'
  },
  { 
    studentId: '3', 
    studentName: 'Carol Martinez', 
    email: 'carol.m@university.edu',
    assignments: 92,
    quizzes: 95,
    midterm: 94,
    final: 96,
    overall: 94,
    grade: 'A'
  },
  { 
    studentId: '4', 
    studentName: 'David Brown', 
    email: 'david.b@university.edu',
    assignments: 70,
    quizzes: 68,
    midterm: 72,
    final: 75,
    overall: 71,
    grade: 'C+'
  },
];

export default function TeacherGradesPage() {
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrades = mockGrades.filter(g => 
    g.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'default';
    if (grade.startsWith('B')) return 'secondary';
    return 'outline';
  };

  const courseAverage = (filteredGrades.reduce((sum, g) => sum + g.overall, 0) / filteredGrades.length).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-heading">Grades</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {mockCourses.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.code} - {c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course Statistics</CardTitle>
            <Badge variant="secondary" className="text-base">{filteredGrades.length} Students</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Class Average</p>
              <p className="text-2xl font-heading">{courseAverage}%</p>
            </div>
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Highest</p>
              <p className="text-2xl font-heading">{Math.max(...filteredGrades.map(g => g.overall))}%</p>
            </div>
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Lowest</p>
              <p className="text-2xl font-heading">{Math.min(...filteredGrades.map(g => g.overall))}%</p>
            </div>
            <div className="p-3 border-2 border-border rounded-base">
              <p className="text-xs text-muted-foreground">Pass Rate</p>
              <p className="text-2xl font-heading">{((filteredGrades.filter(g => g.overall >= 60).length / filteredGrades.length) * 100).toFixed(0)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-heading">Student</th>
                  <th className="text-center p-3 font-heading">Assignments</th>
                  <th className="text-center p-3 font-heading">Quizzes</th>
                  <th className="text-center p-3 font-heading">Midterm</th>
                  <th className="text-center p-3 font-heading">Final</th>
                  <th className="text-center p-3 font-heading">Overall</th>
                  <th className="text-center p-3 font-heading">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map(student => (
                  <tr key={student.studentId} className="border-b border-border hover:bg-secondary/20">
                    <td className="p-3">
                      <div>
                        <p className="font-base text-sm">{student.studentName}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </td>
                    <td className="text-center p-3">{student.assignments}%</td>
                    <td className="text-center p-3">{student.quizzes}%</td>
                    <td className="text-center p-3">{student.midterm}%</td>
                    <td className="text-center p-3">{student.final}%</td>
                    <td className="text-center p-3 font-heading">{student.overall}%</td>
                    <td className="text-center p-3">
                      <Badge variant={getGradeColor(student.grade)}>{student.grade}</Badge>
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
