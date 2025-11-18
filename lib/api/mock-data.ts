import mockData from '../../../master-student.json';

export const getMockStudent = () => mockData.student;
export const getMockCourses = () => mockData.courses;
export const getMockChapters = (courseId: string) => mockData.chapters[courseId as keyof typeof mockData.chapters] || [];
export const getMockAssignments = (courseId?: string) => 
  courseId ? mockData.assignments.filter(a => a.courseId === courseId) : mockData.assignments;
export const getMockQuizzes = (courseId?: string) => 
  courseId ? mockData.quizzes.filter(q => q.courseId === courseId) : mockData.quizzes;
export const getMockGrades = (courseId?: string) => 
  courseId ? mockData.grades[courseId as keyof typeof mockData.grades] : mockData.grades;
export const getMockNotices = (courseId?: string) => 
  courseId ? mockData.notices.filter(n => n.courseId === courseId) : mockData.notices;

export default mockData;
