export interface CourseOutline {
  id: string;
  courseName: string;
  tenure: string;
  credits: number;
  description: string;
  professor: {
    name: string;
    email: string;
  };
  chapters: Chapter[];
  overallResources: Resource[];
}

export interface Chapter {
  id: string;
  title: string;
  weightage: number;
  description: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'docx' | 'ppt' | 'pptx' | 'video' | 'other';
  size: string;
  uploadedAt: Date;
  url: string;
}
