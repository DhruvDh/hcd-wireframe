export interface Relationship {
  source: string;
  target: string;
  type: RelationshipType;
  metadata?: {
    strength?: number;
    description?: string;
    year?: number;
  };
}

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