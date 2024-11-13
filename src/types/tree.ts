export enum NodeType {
  COLLEGE = 'college',
  DEPARTMENT = 'department',
  PROGRAM = 'program',
  COURSE = 'course',
  FACULTY = 'faculty'
}

export interface CourseMetadata {
  faculty?: string[];
  teachingAssistants?: string[];
  prerequisites?: string[];
  relatedCourses?: string[];
  lab?: string;
  creditHours?: number;
  termsOffered?: string[];
  typicalClassSize?: number;
  format?: 'In-Person' | 'Hybrid' | 'Online';
  avgGPA?: number;
  successRate?: string;
  topics?: string[];
}

export interface ProgramMetadata {
  creditHours?: number;
  duration?: string;
  tuition?: number;
  careerOutcomes?: {
    roles: string[];
    companies: string[];
    averageSalary: number;
    employmentRate: string;
  };
  admissionInfo?: {
    gpaRequirement: number;
    prerequisites: string[];
    deadlines: { [term: string]: string };
  };
}

export interface FacultyMetadata {
  researchAreas: string[];
  courseIds: string[];
  programIds: string[];
}

export type NodeMetadata = CourseMetadata | ProgramMetadata | FacultyMetadata;

export interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  description?: string;
  code?: string;
  children?: TreeNode[];
  metadata?: NodeMetadata;
}

export interface ExpandedState {
  [key: string]: boolean;
}

export interface SelectedNodes {
  [key: string]: TreeNode;
}

export type SelectionMode = 'source' | 'target'; 