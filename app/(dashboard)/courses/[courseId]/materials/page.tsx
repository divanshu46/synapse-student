'use client';

import { use } from 'react';
import { CourseOutlineCard } from '@/components/courses/CourseOutlineCard';
import { CourseOutline } from '@/types/course-outline';

const mockCourseOutlines: CourseOutline[] = [
  {
    id: '1',
    courseName: 'Data Structures & Algorithms',
    tenure: 'Fall 2025 (Aug - Dec)',
    credits: 4,
    description: 'Comprehensive study of fundamental data structures and algorithms including arrays, linked lists, trees, graphs, sorting, and searching with complexity analysis.',
    professor: {
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@university.edu'
    },
    overallResources: [
      { id: 'o1', name: 'Course Syllabus.pdf', type: 'pdf', size: '245 KB', uploadedAt: new Date(2025, 7, 1), url: '#' },
      { id: 'o2', name: 'Textbook - Introduction to Algorithms.pdf', type: 'pdf', size: '12.4 MB', uploadedAt: new Date(2025, 7, 1), url: '#' },
      { id: 'o3', name: 'Course Introduction.mp4', type: 'video', size: '156 MB', uploadedAt: new Date(2025, 7, 5), url: '#' },
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Chapter 1: Introduction to Data Structures',
        weightage: 10,
        description: 'Overview of data structures, complexity analysis, and Big O notation',
        resources: [
          { id: 'r1', name: 'Lecture 1 - Introduction.pdf', type: 'pdf', size: '2.4 MB', uploadedAt: new Date(2025, 7, 10), url: '#' },
          { id: 'r2', name: 'Lecture Recording.mp4', type: 'video', size: '145 MB', uploadedAt: new Date(2025, 7, 10), url: '#' },
          { id: 'r3', name: 'Big O Notation Guide.pdf', type: 'pdf', size: '1.8 MB', uploadedAt: new Date(2025, 7, 12), url: '#' },
        ]
      },
      {
        id: 'c2',
        title: 'Chapter 2: Arrays and Linked Lists',
        weightage: 15,
        description: 'Linear data structures, array operations, singly and doubly linked lists',
        resources: [
          { id: 'r4', name: 'Arrays Deep Dive.pdf', type: 'pdf', size: '3.1 MB', uploadedAt: new Date(2025, 7, 17), url: '#' },
          { id: 'r5', name: 'Linked Lists Tutorial.pptx', type: 'pptx', size: '4.2 MB', uploadedAt: new Date(2025, 7, 19), url: '#' },
          { id: 'r6', name: 'Practice Problems.pdf', type: 'pdf', size: '1.5 MB', uploadedAt: new Date(2025, 7, 20), url: '#' },
          { id: 'r7', name: 'Lab Session Recording.mp4', type: 'video', size: '98 MB', uploadedAt: new Date(2025, 7, 21), url: '#' },
        ]
      },
      {
        id: 'c3',
        title: 'Chapter 3: Stacks and Queues',
        weightage: 12,
        description: 'LIFO and FIFO structures, implementation and applications',
        resources: [
          { id: 'r8', name: 'Stacks Lecture.pdf', type: 'pdf', size: '2.2 MB', uploadedAt: new Date(2025, 7, 24), url: '#' },
          { id: 'r9', name: 'Queues Implementation.docx', type: 'docx', size: '856 KB', uploadedAt: new Date(2025, 7, 26), url: '#' },
        ]
      },
      {
        id: 'c4',
        title: 'Chapter 4: Trees and Binary Search Trees',
        weightage: 18,
        description: 'Tree terminology, binary trees, BST operations, tree traversals',
        resources: [
          { id: 'r10', name: 'Trees Introduction.pdf', type: 'pdf', size: '3.8 MB', uploadedAt: new Date(2025, 8, 1), url: '#' },
          { id: 'r11', name: 'BST Operations.pptx', type: 'pptx', size: '5.1 MB', uploadedAt: new Date(2025, 8, 3), url: '#' },
          { id: 'r12', name: 'Tree Traversals Demo.mp4', type: 'video', size: '112 MB', uploadedAt: new Date(2025, 8, 5), url: '#' },
        ]
      },
      {
        id: 'c5',
        title: 'Chapter 5: Graphs',
        weightage: 20,
        description: 'Graph representations, BFS, DFS, shortest path algorithms',
        resources: [
          { id: 'r13', name: 'Graph Theory Basics.pdf', type: 'pdf', size: '4.2 MB', uploadedAt: new Date(2025, 8, 10), url: '#' },
          { id: 'r14', name: 'BFS and DFS.pdf', type: 'pdf', size: '2.9 MB', uploadedAt: new Date(2025, 8, 12), url: '#' },
          { id: 'r15', name: 'Dijkstra Algorithm.pptx', type: 'pptx', size: '3.6 MB', uploadedAt: new Date(2025, 8, 15), url: '#' },
        ]
      },
      {
        id: 'c6',
        title: 'Chapter 6: Sorting Algorithms',
        weightage: 15,
        description: 'Comparison-based and non-comparison sorting algorithms',
        resources: [
          { id: 'r16', name: 'Sorting Algorithms Overview.pdf', type: 'pdf', size: '3.4 MB', uploadedAt: new Date(2025, 8, 20), url: '#' },
          { id: 'r17', name: 'Quick Sort Analysis.pdf', type: 'pdf', size: '2.1 MB', uploadedAt: new Date(2025, 8, 22), url: '#' },
        ]
      },
      {
        id: 'c7',
        title: 'Chapter 7: Dynamic Programming',
        weightage: 10,
        description: 'Memoization, tabulation, and classic DP problems',
        resources: [
          { id: 'r18', name: 'DP Introduction.pdf', type: 'pdf', size: '2.8 MB', uploadedAt: new Date(2025, 9, 1), url: '#' },
          { id: 'r19', name: 'DP Problems Workshop.mp4', type: 'video', size: '178 MB', uploadedAt: new Date(2025, 9, 3), url: '#' },
        ]
      },
    ]
  }
];

export default function CourseMaterialsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading">Course Materials</h1>
      </div>

      <div className="space-y-6">
        {mockCourseOutlines.map(outline => (
          <CourseOutlineCard key={outline.id} outline={outline} />
        ))}
      </div>
    </div>
  );
}
