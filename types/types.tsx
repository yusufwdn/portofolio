export type ProjectTypeCode = "personal" | "professional";

export type SkillGroup = "frontend" | "backend" | "tools" | "soft";

/** Every skill label reads the same in both locales, so it lives in data. */
export type Skill = {
  name: string;
  icon: string;
};

export type Project = {
  id: string;
  type: ProjectTypeCode;
  /** Internal work often has nothing public to show, so this is optional. */
  image?: string;
  technologies: string[];
  /** Absent when the project has no public URL. */
  link?: string;
};

export type Role = {
  id: string;
  technologies: string[];
};

/**
 * Grouped by employer, not by role. Two titles at the same company is a
 * promotion, and flattening them would read as job hopping.
 */
export type WorkExperience = {
  id: string;
  company: string;
  roles: Role[];
};

export type Education = {
  id: string;
  institution: string;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
};
