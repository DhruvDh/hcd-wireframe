// src/types/index.ts

export interface College {
  id: string;
  name: string;
  departments: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  programs: string[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  tracks: string[];
  facultyIds: string[];
  courseIds: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  prerequisites: string[];
  facultyIds: string[];
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  researchAreas: string[];
  courseIds: string[];
  programIds: string[];
}
