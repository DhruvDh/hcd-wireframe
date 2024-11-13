// src/lib/mock-data/index.ts

import { College, Department, Program, Course, Faculty } from "@/types";
import { NodeType, TreeNode } from "@/types/tree";

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
  {
    id: "course-distributed-systems",
    code: "CS-DS501",
    title: "Distributed Systems",
    description: "Advanced concepts in distributed computing and systems.",
    credits: 3,
    prerequisites: ["CS-400"],
    facultyIds: ["fac-martinez"]
  },
  {
    id: "course-iot-fundamentals",
    code: "CS-IOT401",
    title: "IoT Fundamentals",
    description: "Introduction to Internet of Things concepts and applications.",
    credits: 3,
    prerequisites: ["CS-300"],
    facultyIds: ["fac-martinez", "fac-zhang"]
  },
  {
    id: "course-vr-fundamentals",
    code: "CS-VR401",
    title: "Virtual Reality Fundamentals",
    description: "Basics of VR development and applications.",
    credits: 3,
    prerequisites: ["CS-350"],
    facultyIds: ["fac-thompson"]
  },
  {
    id: "course-graphics",
    code: "CS-GR401",
    title: "Computer Graphics",
    description: "Fundamentals of computer graphics and visualization.",
    credits: 3,
    prerequisites: ["CS-300", "MATH-301"],
    facultyIds: ["fac-thompson"]
  },
  {
    id: "course-quantum-computing",
    code: "CS-QC501",
    title: "Quantum Computing",
    description: "Introduction to quantum computing concepts and algorithms.",
    credits: 3,
    prerequisites: ["CS-400", "MATH-401"],
    facultyIds: ["fac-davis"]
  },
  {
    id: "course-nlp",
    code: "CS-NLP501",
    title: "Natural Language Processing",
    description: "Advanced NLP concepts and applications.",
    credits: 3,
    prerequisites: ["CS-ML501"],
    facultyIds: ["fac-wilson"]
  }
];

export const faculty: Faculty[] = [
  {
    id: "fac-smith",
    name: "Dr. Sarah Smith",
    title: "Professor",
    researchAreas: ["Machine Learning", "Artificial Intelligence"],
    courseIds: ["course-cs-ml501", "course-ece-ml510"],
    programIds: ["prog-bs-cs", "prog-ms-cs"],
  },
  {
    id: "fac-doe",
    name: "Dr. John Doe",
    title: "Associate Professor",
    researchAreas: ["Deep Learning", "Computer Vision"],
    courseIds: ["course-cs-ml501"],
    programIds: ["prog-bs-cs"],
  },
  {
    id: "fac-martinez",
    name: "Dr. Elena Martinez",
    title: "Associate Professor",
    researchAreas: ["Edge Computing", "Internet of Things", "Distributed Systems"],
    courseIds: ["course-distributed-systems", "course-iot-fundamentals"],
    programIds: ["prog-bs-cs", "prog-ms-cs"]
  },
  {
    id: "fac-thompson",
    name: "Dr. James Thompson",
    title: "Assistant Professor",
    researchAreas: ["Virtual Reality", "Computer Graphics", "Game Development"],
    courseIds: ["course-vr-fundamentals", "course-graphics"],
    programIds: ["prog-bs-cs", "prog-ms-cs"]
  },
  {
    id: "fac-davis",
    name: "Dr. Robert Davis",
    title: "Professor",
    researchAreas: ["Quantum Computing", "Theoretical Computer Science", "Algorithms"],
    courseIds: ["course-quantum-computing", "course-advanced-algorithms"],
    programIds: ["prog-ms-cs", "prog-phd-cs"]
  },
  {
    id: "fac-wilson",
    name: "Dr. Emily Wilson",
    title: "Associate Professor",
    researchAreas: ["Natural Language Processing", "Machine Learning", "Computational Linguistics"],
    courseIds: ["course-nlp", "course-ml-advanced"],
    programIds: ["prog-ms-cs", "prog-phd-cs"]
  }
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
  {
    id: "lab-robotics",
    name: "Robotics and Autonomous Systems Lab",
    description: "Research in robotics, automation, and intelligent systems",
    facultyIds: ["fac-zhang", "fac-brown"],
    researchAreas: ["Robotics", "Autonomous Systems", "Computer Vision"],
  },
  {
    id: "lab-quantum",
    name: "Quantum Computing and Information Lab",
    description: "Research in quantum algorithms and quantum information processing",
    facultyIds: ["fac-smith", "fac-williams", "fac-davis"],
    researchAreas: ["Quantum Computing", "Quantum Algorithms", "Quantum Machine Learning"]
  },
  {
    id: "lab-edge",
    name: "Edge Computing and IoT Lab",
    description: "Research in edge computing, IoT systems, and distributed intelligence",
    facultyIds: ["fac-zhang", "fac-brown", "fac-martinez"],
    researchAreas: ["Edge Computing", "IoT", "Distributed Systems", "Edge AI"]
  },
  {
    id: "lab-xr",
    name: "Extended Reality Research Lab",
    description: "Research in virtual, augmented, and mixed reality technologies",
    facultyIds: ["fac-chen", "fac-patel", "fac-thompson"],
    researchAreas: ["Virtual Reality", "Augmented Reality", "Mixed Reality", "Human-Computer Interaction"]
  },
  {
    id: "lab-nlp",
    name: "Natural Language Processing Lab",
    description: "Advanced research in NLP and computational linguistics",
    facultyIds: ["fac-jones", "fac-wilson", "fac-garcia"],
    researchAreas: ["Natural Language Processing", "Computational Linguistics", "Text Mining"]
  }
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
  {
    id: "fac-zhang",
    name: "Dr. Wei Zhang",
    title: "Assistant Professor",
    labId: "lab-robotics",
    currentCourses: ["course-robotics", "course-computer-vision"],
    pastCourses: ["course-ai-intro"],
    researchAreas: ["Robotics", "Computer Vision", "Deep Learning"],
    collaborators: ["fac-smith", "fac-jones"],
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
        id: "dept-cs",
        name: "Department of Computer Science",
        type: NodeType.DEPARTMENT,
        description:
          "Focuses on theoretical and applied computer science, from foundations to advanced computing.",
        children: [
          // Add faculty to department - simplified filtering
          ...faculty
            .filter(
              (f) =>
                f.programIds.includes("prog-bs-cs") ||
                f.programIds.includes("prog-ms-cs")
            )
            .map((f) => ({
              id: f.id,
              name: f.name,
              type: NodeType.FACULTY,
              description: `${f.title} - Research areas: ${f.researchAreas.join(
                ", "
              )}`,
              metadata: {
                researchAreas: f.researchAreas,
                courseIds: f.courseIds,
                programIds: f.programIds,
              },
            })),
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
                  {
                    id: "course-computer-vision",
                    name: "Computer Vision",
                    type: NodeType.COURSE,
                    code: "ITCS 4156",
                    description:
                      "Image processing and visual recognition systems.",
                    metadata: {
                      faculty: ["fac-jones"],
                      prerequisites: ["course-ai-intro"],
                      relatedCourses: [
                        "course-robotics",
                        "course-deep-learning",
                      ],
                      lab: "lab-ai",
                    },
                  },
                  {
                    id: "course-deep-learning",
                    name: "Deep Learning",
                    type: NodeType.COURSE,
                    code: "ITCS 4158",
                    description:
                      "Neural networks and deep learning architectures.",
                    metadata: {
                      faculty: ["fac-smith", "fac-jones"],
                      prerequisites: ["course-ai-intro"],
                      relatedCourses: [
                        "course-computer-vision",
                        "course-ml-advanced",
                      ],
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
                  {
                    id: "course-mobile-dev",
                    name: "Mobile Interface Design",
                    type: NodeType.COURSE,
                    code: "ITCS 4185",
                    description: "Design and development of mobile interfaces.",
                    metadata: {
                      faculty: ["fac-patel"],
                      prerequisites: ["course-ui-design"],
                      relatedCourses: ["course-web-dev"],
                      lab: "lab-hci",
                    },
                  },
                  {
                    id: "course-accessibility",
                    name: "Accessible Computing",
                    type: NodeType.COURSE,
                    code: "ITCS 4188",
                    description:
                      "Design for accessibility and inclusive computing.",
                    metadata: {
                      faculty: ["fac-chen"],
                      prerequisites: ["course-hci"],
                      relatedCourses: ["course-ui-design", "course-mobile-dev"],
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
          // Add faculty to department - simplified filtering
          ...faculty
            .filter((f) => f.programIds.includes("prog-bs-se"))
            .map((f) => ({
              id: f.id,
              name: f.name,
              type: NodeType.FACULTY,
              description: `${f.title} - Research areas: ${f.researchAreas.join(
                ", "
              )}`,
              metadata: {
                researchAreas: f.researchAreas,
                courseIds: f.courseIds,
                programIds: f.programIds,
              },
            })),
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
              {
                id: "course-bio-algorithms",
                name: "Algorithms in Bioinformatics",
                type: NodeType.COURSE,
                code: "BINF 6201",
                description:
                  "Advanced algorithms for biological sequence analysis and genomics.",
                metadata: {
                  faculty: ["fac-chen"],
                  prerequisites: ["course-algorithms"],
                  relatedCourses: ["course-bio-stats"],
                  lab: "lab-biocomputing",
                },
              },
              {
                id: "course-bio-stats",
                name: "Statistical Methods in Bioinformatics",
                type: NodeType.COURSE,
                code: "BINF 6211",
                description:
                  "Statistical approaches for analyzing genomic data.",
                metadata: {
                  faculty: ["fac-zhang"],
                  prerequisites: ["course-bio-algorithms"],
                  relatedCourses: ["course-ml-bioinfo"],
                  lab: "lab-biocomputing",
                },
              },
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
              {
                id: "course-ml-bioinfo",
                name: "Machine Learning in Bioinformatics",
                type: NodeType.COURSE,
                code: "BINF 8201",
                description:
                  "Advanced ML techniques for biological data analysis.",
                metadata: {
                  faculty: ["fac-chen", "fac-zhang"],
                  prerequisites: ["course-bio-stats"],
                  relatedCourses: ["course-bio-algorithms"],
                  lab: "lab-biocomputing",
                },
              },
              {
                id: "course-genomics",
                name: "Computational Genomics",
                type: NodeType.COURSE,
                code: "BINF 8210",
                description:
                  "Advanced computational methods for genomic research.",
                metadata: {
                  faculty: ["fac-chen"],
                  prerequisites: ["course-ml-bioinfo"],
                  relatedCourses: ["course-bio-stats"],
                  lab: "lab-biocomputing",
                },
              },
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
              {
                id: "course-adv-analytics",
                name: "Advanced Analytics",
                type: NodeType.COURSE,
                code: "DSBA 6201",
                description:
                  "Advanced statistical and machine learning methods.",
                metadata: {
                  faculty: ["fac-wilson"],
                  prerequisites: ["course-stats-foundations"],
                  relatedCourses: ["course-big-data"],
                  lab: "lab-analytics",
                },
              },
              {
                id: "course-big-data",
                name: "Big Data Analytics",
                type: NodeType.COURSE,
                code: "DSBA 6210",
                description: "Processing and analyzing large-scale datasets.",
                metadata: {
                  faculty: ["fac-wilson", "fac-garcia"],
                  prerequisites: ["course-adv-analytics"],
                  relatedCourses: ["course-data-viz"],
                  lab: "lab-analytics",
                },
              },
            ],
          },
          {
            id: "prog-bs-ds",
            name: "B.S. in Data Science",
            type: NodeType.PROGRAM,
            code: "BSDS",
            description: "Undergraduate program in data science.",
            children: [
              {
                id: "course-stats-foundations",
                name: "Foundations of Statistics",
                type: NodeType.COURSE,
                code: "DSBA 2201",
                description:
                  "Fundamental statistical concepts for data science.",
                metadata: {
                  faculty: ["fac-garcia"],
                  prerequisites: [],
                  relatedCourses: ["course-data-viz"],
                  lab: "lab-analytics",
                },
              },
              {
                id: "course-data-viz",
                name: "Data Visualization",
                type: NodeType.COURSE,
                code: "DSBA 2210",
                description:
                  "Principles and techniques for data visualization.",
                metadata: {
                  faculty: ["fac-garcia"],
                  prerequisites: ["course-stats-foundations"],
                  relatedCourses: ["course-big-data"],
                  lab: "lab-analytics",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

// Export the hierarchical data directly
export const mockHierarchicalData = baseHierarchicalData;

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
  {
    source: "course-ai-intro",
    target: "course-ml-advanced",
    type: RelationshipType.PREREQUISITE,
    metadata: {
      strength: 1,
      description:
        "Introduction to AI is required before taking Advanced Machine Learning",
    },
  },
  {
    source: "course-ai-intro",
    target: "course-deep-learning",
    type: RelationshipType.PREREQUISITE,
    metadata: {
      strength: 1,
      description: "Foundation concepts required for deep learning",
    },
  },
  {
    source: "course-deep-learning",
    target: "course-computer-vision",
    type: RelationshipType.RELATED_CONTENT,
    metadata: {
      strength: 0.8,
      description: "Deep learning concepts applied in computer vision",
    },
  },
  {
    source: "fac-smith",
    target: "fac-jones",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.9,
      description: "Joint research in deep learning applications",
      year: 2024,
    },
  },
  {
    source: "phd-zhang",
    target: "course-computer-vision",
    type: RelationshipType.TEACHES_AS_TA,
    metadata: {
      strength: 0.8,
      description: "Lab instructor for computer vision",
      year: 2024,
    },
  },
  {
    source: "lab-ai",
    target: "lab-hci",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.7,
      description: "AI-powered interface adaptation research",
      year: 2024,
    },
  },
  {
    source: "course-nlp",
    target: "course-ml-advanced",
    type: RelationshipType.PREREQUISITE,
    metadata: {
      strength: 0.8,
      description: "ML concepts required for advanced NLP",
    }
  },
  {
    source: "fac-wilson",
    target: "fac-jones",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.9,
      description: "Joint research in NLP applications",
      year: 2024
    }
  },
  {
    source: "lab-nlp",
    target: "lab-ai",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.8,
      description: "Collaborative AI/NLP research projects",
      year: 2024
    }
  },
  {
    source: "course-quantum-computing",
    target: "course-advanced-algorithms",
    type: RelationshipType.RELATED_CONTENT,
    metadata: {
      strength: 0.7,
      description: "Quantum algorithms complement classical algorithms",
    }
  },
  {
    source: "lab-quantum",
    target: "lab-ai",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.6,
      description: "Quantum machine learning research",
      year: 2024
    }
  },
  {
    source: "fac-thompson",
    target: "fac-chen",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.8,
      description: "VR/AR interface research collaboration",
      year: 2024
    }
  },
  {
    source: "lab-xr",
    target: "lab-hci",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.9,
      description: "XR interface design research",
      year: 2024
    }
  },
  {
    source: "lab-edge",
    target: "lab-systems",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.7,
      description: "Distributed edge computing research",
      year: 2024
    }
  },
  {
    source: "fac-martinez",
    target: "fac-brown",
    type: RelationshipType.COLLABORATES,
    metadata: {
      strength: 0.8,
      description: "Edge systems security research",
      year: 2024
    }
  },
  {
    source: "course-iot-fundamentals",
    target: "course-distributed-systems",
    type: RelationshipType.RELATED_CONTENT,
    metadata: {
      strength: 0.7,
      description: "IoT systems build on distributed systems concepts"
    }
  }
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
  {
    id: "phd-wilson",
    name: "James Wilson",
    year: 2,
    advisor: "fac-zhang",
    labId: "lab-robotics",
    teachingCourses: ["course-robotics"],
    pastTaughtCourses: [],
    researchAreas: ["Robotics", "Autonomous Systems"],
    publications: 2,
    collaborators: ["phd-zhang", "phd-chen"],
  },
  {
    id: "phd-thompson",
    name: "Sarah Thompson",
    year: 3,
    advisor: "fac-davis",
    labId: "lab-quantum",
    teachingCourses: ["course-quantum-computing"],
    pastTaughtCourses: ["course-programming-1"],
    researchAreas: ["Quantum Computing", "Quantum Algorithms"],
    publications: 3,
    collaborators: ["phd-wilson", "phd-zhang"]
  },
  {
    id: "phd-martinez",
    name: "Carlos Martinez",
    year: 4,
    advisor: "fac-martinez",
    labId: "lab-edge",
    teachingCourses: ["course-iot-fundamentals"],
    pastTaughtCourses: ["course-distributed-systems"],
    researchAreas: ["Edge Computing", "IoT Systems"],
    publications: 5,
    collaborators: ["phd-brown", "phd-kumar"]
  },
  {
    id: "phd-anderson",
    name: "Emily Anderson",
    year: 2,
    advisor: "fac-thompson",
    labId: "lab-xr",
    teachingCourses: ["course-vr-fundamentals"],
    pastTaughtCourses: [],
    researchAreas: ["Virtual Reality", "Human-Computer Interaction"],
    publications: 2,
    collaborators: ["phd-garcia", "phd-lee"]
  },
  {
    id: "phd-wilson",
    name: "Michael Wilson",
    year: 5,
    advisor: "fac-wilson",
    labId: "lab-nlp",
    teachingCourses: ["course-nlp"],
    pastTaughtCourses: ["course-ml-intro", "course-programming-2"],
    researchAreas: ["Natural Language Processing", "Machine Learning"],
    publications: 6,
    collaborators: ["phd-zhang", "phd-kumar"]
  }
];
