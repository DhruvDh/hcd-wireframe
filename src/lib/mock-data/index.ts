// src/lib/mock-data/index.ts

import { College, Department, Program, Course, Faculty } from "@/types";
import {
  NodeType,
  TreeNode,
} from "@/types/tree";

export const colleges: College[] = [
  {
    id: "college-computing",
    name: "College of Computing",
    departments: ["dept-cs"],
  },
  {
    id: "college-engineering",
    name: "College of Engineering",
    departments: ["dept-ece"],
  },
];

export const departments: Department[] = [
  {
    id: "dept-cs",
    name: "CS Department",
    description: "Focus on theoretical and applied computer science.",
    programs: ["prog-ml", "prog-ds"],
  },
  {
    id: "dept-ece",
    name: "ECE Department",
    description: "Electrical and Computer Engineering.",
    programs: ["prog-ai-ml"],
  },
];

export const programs: Program[] = [
  {
    id: "prog-ml",
    name: "ML Program",
    description: "Advanced machine learning and AI.",
    tracks: ["Deep Learning", "NLP", "Computer Vision"],
    facultyIds: ["fac-smith", "fac-doe"],
    courseIds: ["course-cs-ml501"],
  },
  {
    id: "prog-ai-ml",
    name: "AI/ML Track",
    description: "AI and ML for engineering applications.",
    tracks: ["Robotics ML", "Signal Processing", "Computer Vision"],
    facultyIds: ["fac-smith"],
    courseIds: ["course-ece-ml510"],
  },
];

export const courses: Course[] = [
  {
    id: "course-cs-ml501",
    code: "CS-ML501",
    title: "Machine Learning",
    description: "Foundations of machine learning.",
    credits: 3,
    prerequisites: ["CS-400", "MATH-301"],
    facultyIds: ["fac-smith"],
  },
  {
    id: "course-ece-ml510",
    code: "ECE-ML510",
    title: "Advanced Machine Learning",
    description: "Advanced ML concepts and applications.",
    credits: 3,
    prerequisites: ["ECE-400"],
    facultyIds: ["fac-smith"],
  },
];

export const faculty: Faculty[] = [
  {
    id: "fac-smith",
    name: "Dr. Sarah Smith",
    title: "Professor",
    researchAreas: ["Machine Learning", "Artificial Intelligence"],
    courseIds: ["course-cs-ml501", "course-ece-ml510"],
    programIds: ["prog-ml", "prog-ai-ml"],
  },
  {
    id: "fac-doe",
    name: "Dr. John Doe",
    title: "Associate Professor",
    researchAreas: ["Deep Learning", "Computer Vision"],
    courseIds: ["course-cs-ml501"],
    programIds: ["prog-ml"],
  },
];

// Define research labs
interface ResearchLab {
  id: string;
  name: string;
  description: string;
  facultyIds: string[];
  researchAreas: string[];
}

// Define faculty with more relationships
interface FacultyMember {
  id: string;
  name: string;
  title: string;
  labId: string;
  currentCourses: string[];
  pastCourses: string[];
  researchAreas: string[];
  collaborators: string[]; // Other faculty IDs
}

// Research Labs Data
export const researchLabs: ResearchLab[] = [
  {
    id: "lab-ai",
    name: "AI & Machine Learning Lab",
    description:
      "Research in artificial intelligence and machine learning applications",
    facultyIds: ["fac-smith", "fac-jones", "fac-zhang"],
    researchAreas: ["Machine Learning", "Deep Learning", "Computer Vision"],
  },
  {
    id: "lab-cyber",
    name: "Cybersecurity Research Lab",
    description: "Advanced research in cybersecurity and network defense",
    facultyIds: ["fac-williams", "fac-brown"],
    researchAreas: ["Network Security", "Cryptography", "Security Analytics"],
  },
  {
    id: "lab-hci",
    name: "Human-Computer Interaction Lab",
    description: "Research in user experience and interactive systems",
    facultyIds: ["fac-chen", "fac-patel"],
    researchAreas: ["UX Design", "Accessibility", "Interactive Systems"],
  },
  {
    id: "lab-bio",
    name: "Bioinformatics Lab",
    description: "Computational approaches to biological problems",
    facultyIds: ["fac-davis", "fac-wilson"],
    researchAreas: ["Genomics", "Computational Biology", "Biostatistics"],
  },
  {
    id: "lab-systems",
    name: "Distributed Systems Lab",
    description: "Research in distributed computing and cloud systems",
    facultyIds: ["fac-brown", "fac-wilson"],
    researchAreas: ["Cloud Computing", "Distributed Systems", "Edge Computing"],
  },
  {
    id: "lab-viz",
    name: "Data Visualization Lab",
    description: "Research in data visualization and visual analytics",
    facultyIds: ["fac-patel", "fac-chen"],
    researchAreas: [
      "Information Visualization",
      "Visual Analytics",
      "Scientific Visualization",
    ],
  },
];

// Faculty Data with Rich Relationships
export const facultyMembers: FacultyMember[] = [
  {
    id: "fac-smith",
    name: "Dr. Sarah Smith",
    title: "Professor",
    labId: "lab-ai",
    currentCourses: ["course-ai-intro", "course-ml-intro"],
    pastCourses: ["course-data-mining", "course-deep-learning"],
    researchAreas: ["Machine Learning", "Computer Vision"],
    collaborators: ["fac-jones", "fac-zhang"],
  },
  {
    id: "fac-jones",
    name: "Dr. Michael Jones",
    title: "Associate Professor",
    labId: "lab-ai",
    currentCourses: ["course-deep-learning", "course-computer-vision"],
    pastCourses: ["course-ai-intro", "course-ml-intro"],
    researchAreas: ["Deep Learning", "Neural Networks"],
    collaborators: ["fac-smith", "fac-zhang"],
  },
  {
    id: "fac-chen",
    name: "Dr. Lisa Chen",
    title: "Assistant Professor",
    labId: "lab-hci",
    currentCourses: ["course-hci", "course-ui-design"],
    pastCourses: ["course-web-dev"],
    researchAreas: ["HCI", "UX Research"],
    collaborators: ["fac-patel"],
  },
];

// Instead, declare the base data first without exporting
const baseHierarchicalData: TreeNode[] = [
  {
    id: "college-cci",
    name: "College of Computing and Informatics",
    type: NodeType.COLLEGE,
    description:
      "The College of Computing and Informatics (CCI) offers comprehensive academic programs in computing and related fields.",
    children: [
      {
        id: "faculty-section",
        name: "Faculty Members",
        type: NodeType.DEPARTMENT,
        description: "College faculty and researchers",
        children: faculty.map(f => ({
          id: f.id,
          name: f.name,
          type: NodeType.FACULTY,
          description: `${f.title} - Research areas: ${f.researchAreas.join(', ')}`,
          metadata: {
            researchAreas: f.researchAreas,
            courseIds: f.courseIds,
            programIds: f.programIds
          }
        }))
      },
      {
        id: "dept-cs",
        name: "Department of Computer Science",
        type: NodeType.DEPARTMENT,
        description:
          "Focuses on theoretical and applied computer science, from foundations to advanced computing.",
        children: [
          {
            id: "prog-bs-cs",
            name: "B.S. in Computer Science",
            type: NodeType.PROGRAM,
            code: "BSCS",
            description:
              "Bachelor of Science degree with specialized concentrations.",
            children: [
              {
                id: "conc-ai-robotics",
                name: "AI and Robotics",
                type: NodeType.PROGRAM,
                code: "CSAI",
                description:
                  "Concentration in artificial intelligence and robotics.",
                children: [
                  {
                    id: "course-ai-intro",
                    name: "Introduction to AI",
                    type: NodeType.COURSE,
                    code: "ITCS 3152",
                    description:
                      "Fundamental concepts of artificial intelligence and machine learning.",
                    metadata: {
                      faculty: ["fac-smith"],
                      prerequisites: ["course-data-structures"],
                      relatedCourses: ["course-ml-intro", "course-robotics"],
                      lab: "lab-ai",
                    },
                  },
                  {
                    id: "course-robotics",
                    name: "Robotics",
                    type: NodeType.COURSE,
                    code: "ITCS 4152",
                    description:
                      "Fundamentals of robotics and autonomous systems.",
                    metadata: {
                      faculty: ["fac-zhang"],
                      prerequisites: ["course-ai-intro"],
                      relatedCourses: ["course-computer-vision"],
                      lab: "lab-ai",
                    },
                  },
                ],
              },
              {
                id: "conc-hci",
                name: "Human-Computer Interaction",
                type: NodeType.PROGRAM,
                code: "CSHCI",
                description: "Focus on user experience and interface design.",
                children: [
                  {
                    id: "course-hci",
                    name: "Human-Computer Interaction",
                    type: NodeType.COURSE,
                    code: "ITCS 3216",
                    description: "Principles of HCI and user-centered design.",
                    metadata: {
                      faculty: ["fac-chen"],
                      prerequisites: [],
                      relatedCourses: ["course-ui-design"],
                      lab: "lab-hci",
                    },
                  },
                  {
                    id: "course-ui-design",
                    name: "UI Design and Implementation",
                    type: NodeType.COURSE,
                    code: "ITCS 4180",
                    description:
                      "Design and implementation of user interfaces.",
                    metadata: {
                      faculty: ["fac-chen", "fac-patel"],
                      prerequisites: ["course-hci"],
                      relatedCourses: ["course-web-dev"],
                      lab: "lab-hci",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "prog-ms-cs",
            name: "M.S. in Computer Science",
            type: NodeType.PROGRAM,
            code: "MSCS",
            description: "Advanced degree with research opportunities.",
            children: [
              {
                id: "course-ml-advanced",
                name: "Advanced Machine Learning",
                type: NodeType.COURSE,
                code: "ITCS 6156",
                description:
                  "Advanced topics in machine learning and deep learning.",
                metadata: {
                  faculty: ["fac-smith", "fac-jones"],
                  prerequisites: ["course-ml-intro"],
                  relatedCourses: ["course-deep-learning"],
                  lab: "lab-ai",
                },
              },
              {
                id: "course-research-methods",
                name: "Research Methods in CS",
                type: NodeType.COURSE,
                code: "ITCS 8110",
                description: "Research methodologies and academic writing.",
                metadata: {
                  faculty: ["fac-smith"],
                  prerequisites: [],
                  relatedCourses: [],
                  lab: undefined,
                },
              },
            ],
          },
        ],
      },
      {
        id: "dept-sis",
        name: "Software and Information Systems",
        type: NodeType.DEPARTMENT,
        description:
          "Focuses on software engineering and information technology.",
        children: [
          {
            id: "prog-bs-se",
            name: "B.S. in Software Engineering",
            type: NodeType.PROGRAM,
            code: "BSSE",
            description: "Comprehensive software engineering program.",
            children: [
              {
                id: "course-se-principles",
                name: "Software Engineering Principles",
                type: NodeType.COURSE,
                code: "ITIS 3310",
                description: "Core principles of software engineering.",
                metadata: {
                  faculty: ["fac-patel"],
                  prerequisites: ["course-programming-2"],
                  relatedCourses: ["course-se-practice"],
                  lab: undefined,
                },
              },
            ],
          },
        ],
      },
      {
        id: "dept-bioinformatics",
        name: "Department of Bioinformatics and Genomics",
        type: NodeType.DEPARTMENT,
        description: "Combines computing with biological and genomic research.",
        children: [
          {
            id: "prog-ms-bioinfo",
            name: "M.S. in Bioinformatics",
            type: NodeType.PROGRAM,
            code: "MSBI",
            description:
              "Graduate program in bioinformatics and computational biology.",
            children: [
              /* ... courses ... */
            ],
          },
          {
            id: "prog-phd-bioinfo",
            name: "Ph.D. in Bioinformatics",
            type: NodeType.PROGRAM,
            code: "PHBI",
            description:
              "Doctoral program focusing on computational biology research.",
            children: [
              /* ... courses ... */
            ],
          },
        ],
      },
      {
        id: "dept-data",
        name: "Department of Data Science and Business Analytics",
        type: NodeType.DEPARTMENT,
        description: "Focuses on data-driven decision making and analytics.",
        children: [
          {
            id: "prog-ms-ds",
            name: "M.S. in Data Science",
            type: NodeType.PROGRAM,
            code: "MSDS",
            description: "Advanced degree in data science and analytics.",
            children: [
              /* ... courses ... */
            ],
          },
          {
            id: "prog-bs-ds",
            name: "B.S. in Data Science",
            type: NodeType.PROGRAM,
            code: "BSDS",
            description: "Undergraduate program in data science.",
            children: [
              /* ... courses ... */
            ],
          },
        ],
      },
    ],
  },
];

interface MetadataUpdates {
  [key: string]: {
    metadata: Record<string, unknown>;
  };
}

const courseMetadataUpdates: MetadataUpdates = {
  "course-deep-learning": {
    metadata: {
      faculty: ["fac-jones"],
      teachingAssistants: ["phd-chen", "phd-zhang"],
      prerequisites: ["course-ml-intro"],
      relatedCourses: ["course-computer-vision"],
      lab: "lab-ai",
      creditHours: 3,
      termsOffered: ["Fall"],
      typicalClassSize: 35,
      format: "In-Person",
      avgGPA: 3.4,
      successRate: "85%",
      topics: [
        "Deep Neural Networks",
        "Convolutional Networks",
        "Transformers",
        "Deep Learning Frameworks",
      ],
    },
  },
  "course-hci": {
    metadata: {
      faculty: ["fac-chen"],
      teachingAssistants: ["phd-garcia", "phd-lee"],
      prerequisites: [],
      relatedCourses: ["course-ui-design"],
      lab: "lab-hci",
      creditHours: 3,
      termsOffered: ["Fall", "Spring"],
      typicalClassSize: 45,
      format: "Hybrid",
      avgGPA: 3.5,
      successRate: "92%",
      topics: [
        "User-Centered Design",
        "Usability Testing",
        "Interface Design Principles",
        "Accessibility",
      ],
    },
  },
};

const programMetadataUpdates: MetadataUpdates = {
  "prog-bs-cs": {
    metadata: {
      creditHours: 120,
      duration: "4 years",
      tuition: 25000,
      careerOutcomes: {
        roles: [
          "Software Engineer",
          "Machine Learning Engineer",
          "Full Stack Developer",
          "Data Scientist",
        ],
        companies: ["Google", "Microsoft", "Amazon", "Local Tech Startups"],
        averageSalary: 85000,
        employmentRate: "94% within 6 months",
      },
      admissionInfo: {
        gpaRequirement: 3.0,
        prerequisites: ["Advanced Math", "Basic Programming Experience"],
        deadlines: {
          Fall: "May 1",
          Spring: "November 1",
        },
      },
    },
  },
};

// Then keep the applyMetadataUpdates function and the rest of the code
const applyMetadataUpdates = (node: TreeNode): TreeNode => {
  // Create updated node
  let updatedNode = { ...node };

  // Apply course updates
  if (node.type === NodeType.COURSE && courseMetadataUpdates[node.id]) {
    updatedNode = {
      ...updatedNode,
      ...courseMetadataUpdates[node.id],
    };
  }

  // Apply program updates
  if (node.type === NodeType.PROGRAM && programMetadataUpdates[node.id]) {
    updatedNode = {
      ...updatedNode,
      ...programMetadataUpdates[node.id],
    };
  }

  // Recursively update children if they exist
  if (updatedNode.children) {
    updatedNode.children = updatedNode.children.map((child) =>
      applyMetadataUpdates(child)
    );
  }

  return updatedNode;
};

// Apply updates recursively
const updatedMockData = baseHierarchicalData.map((node) =>
  applyMetadataUpdates(node)
);

// Export the final version
export const mockHierarchicalData = updatedMockData;

// Add relationship types for visualization
export enum RelationshipType {
  TEACHES = "teaches",
  TAUGHT_PREVIOUSLY = "taught_previously",
  PREREQUISITE = "prerequisite",
  RELATED_CONTENT = "related_content",
  SAME_LAB = "same_lab",
  COLLABORATES = "collaborates",
  ADVISES = "advises",
  RESEARCHES = "researches",
  ADVISED_BY = "advised_by",
  TEACHES_AS_TA = "teaches_as_ta",
  MENTORS = "mentors",
  RESEARCHES_WITH = "researches_with",
  ALTERNATIVE_PATH = "alternative_path",
}

// Define relationships between entities
export interface Relationship {
  source: string;
  target: string;
  type: RelationshipType;
  metadata?: {
    strength?: number; // 0-1, indicating relationship strength
    description?: string;
    year?: number;
  };
}

// Example relationships
export const relationships: Relationship[] = [
  {
    source: "fac-smith",
    target: "course-ai-intro",
    type: RelationshipType.TEACHES,
    metadata: {
      strength: 1,
      description: "Primary instructor",
      year: 2024,
    },
  },
  {
    source: "course-hci",
    target: "course-ui-design",
    type: RelationshipType.PREREQUISITE,
    metadata: {
      strength: 1,
      description: "Required prerequisite",
    },
  },
  {
    source: "fac-chen",
    target: "fac-patel",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.9,
      description: "HCI Lab collaboration",
    },
  },
  {
    source: "lab-ai",
    target: "course-ml-advanced",
    type: RelationshipType.RESEARCHES,
    metadata: {
      strength: 0.8,
      description: "Research integration in curriculum",
    },
  },
  {
    source: "phd-zhang",
    target: "course-ai-intro",
    type: RelationshipType.TEACHES_AS_TA,
    metadata: {
      strength: 0.7,
      description: "Teaching Assistant",
      year: 2024,
    },
  },
  {
    source: "fac-smith",
    target: "phd-zhang",
    type: RelationshipType.MENTORS,
    metadata: {
      strength: 0.9,
      description: "PhD Advisor",
      year: 2022,
    },
  },
  {
    source: "phd-rodriguez",
    target: "phd-kumar",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.7,
      description: "Cross-lab collaboration on ML for security",
      year: 2024,
    },
  },
  {
    source: "fac-williams",
    target: "phd-rodriguez",
    type: RelationshipType.MENTORS,
    metadata: {
      strength: 0.95,
      description: "Primary PhD advisor",
      year: 2020,
    },
  },
  {
    source: "lab-cyber",
    target: "lab-ai",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.8,
      description: "Joint research on AI-powered security",
      year: 2024,
    },
  },
  {
    source: "phd-chen",
    target: "phd-zhang",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.9,
      description: "Co-authored papers on deep learning",
      year: 2024,
    },
  },
  {
    source: "phd-garcia",
    target: "course-hci",
    type: RelationshipType.TEACHES_AS_TA,
    metadata: {
      strength: 0.8,
      description: "Lead TA and lab instructor",
      year: 2024,
    },
  },
  {
    source: "lab-hci",
    target: "phd-garcia",
    type: RelationshipType.RESEARCHES,
    metadata: {
      strength: 0.9,
      description: "Leading accessibility research project",
      year: 2024,
    },
  },
  {
    source: "phd-zhang",
    target: "phd-brown",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.7,
      description: "AI for Cybersecurity Research",
      year: 2024,
    },
  },
  {
    source: "phd-garcia",
    target: "phd-kumar",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.8,
      description: "Accessible ML Interfaces Project",
      year: 2024,
    },
  },
];

// Add PhD Student interface
interface PhDStudent {
  id: string;
  name: string;
  year: number;
  advisor: string; // faculty ID
  labId: string;
  teachingCourses: string[];
  pastTaughtCourses: string[];
  researchAreas: string[];
  publications: number;
  collaborators: string[]; // New field for PhD student collaborations
}

// Add PhD Students data
export const phdStudents: PhDStudent[] = [
  {
    id: "phd-zhang",
    name: "Alice Zhang",
    year: 3,
    advisor: "fac-smith",
    labId: "lab-ai",
    teachingCourses: ["course-ai-intro"],
    pastTaughtCourses: ["course-programming-1"],
    researchAreas: ["Deep Learning", "Computer Vision"],
    publications: 4,
    collaborators: ["phd-chen"],
  },
  {
    id: "phd-patel",
    name: "Raj Patel",
    year: 4,
    advisor: "fac-chen",
    labId: "lab-hci",
    teachingCourses: ["course-ui-design"],
    pastTaughtCourses: ["course-hci"],
    researchAreas: ["Human-Computer Interaction", "Accessibility"],
    publications: 6,
    collaborators: ["phd-brown"],
  },
  {
    id: "phd-kumar",
    name: "Arun Kumar",
    year: 2,
    advisor: "fac-jones",
    labId: "lab-ai",
    teachingCourses: ["course-ml-intro"],
    pastTaughtCourses: [],
    researchAreas: ["Machine Learning", "NLP"],
    publications: 2,
    collaborators: ["phd-garcia"],
  },
  {
    id: "phd-rodriguez",
    name: "Maria Rodriguez",
    year: 5,
    advisor: "fac-williams",
    labId: "lab-cyber",
    teachingCourses: ["course-security"],
    pastTaughtCourses: ["course-crypto", "course-networks"],
    researchAreas: ["Network Security", "Privacy"],
    publications: 8,
    collaborators: ["phd-brown"],
  },
  {
    id: "phd-lee",
    name: "David Lee",
    year: 1,
    advisor: "fac-chen",
    labId: "lab-hci",
    teachingCourses: ["course-web-dev"],
    pastTaughtCourses: [],
    researchAreas: ["Accessibility", "Mobile HCI"],
    publications: 1,
    collaborators: ["phd-garcia"],
  },
  {
    id: "phd-chen",
    name: "Wei Chen",
    year: 4,
    advisor: "fac-jones",
    labId: "lab-ai",
    teachingCourses: ["course-deep-learning"],
    pastTaughtCourses: ["course-ml-intro", "course-ai-intro"],
    researchAreas: ["Deep Learning", "Reinforcement Learning"],
    publications: 5,
    collaborators: ["phd-zhang", "phd-kumar"],
  },
  {
    id: "phd-brown",
    name: "Emma Brown",
    year: 3,
    advisor: "fac-williams",
    labId: "lab-cyber",
    teachingCourses: ["course-crypto"],
    pastTaughtCourses: ["course-security"],
    researchAreas: ["Applied Cryptography", "Security Analytics"],
    publications: 3,
    collaborators: ["phd-rodriguez"],
  },
  {
    id: "phd-garcia",
    name: "Carlos Garcia",
    year: 5,
    advisor: "fac-chen",
    labId: "lab-hci",
    teachingCourses: ["course-hci"],
    pastTaughtCourses: ["course-ui-design", "course-web-dev"],
    researchAreas: ["Accessible Computing", "Mobile HCI"],
    publications: 7,
    collaborators: ["phd-lee", "phd-patel"],
  },
];
