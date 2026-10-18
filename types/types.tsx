export type ProjectTypeCode = "personal" | "professional";

export type SkillGroup = "frontend" | "backend" | "tools" | "soft";

/** Every skill label reads the same in every language, so it lives in data. */
export type Skill = {
  name: string;
  icon: string;
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
