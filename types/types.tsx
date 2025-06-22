export type ProjectTypeCode = "personal" | "professional";

export type ProjectType = {
  code: ProjectTypeCode;
  label: string;
  icon: string;
};

export type Project = {
  title: string;
  type: ProjectTypeCode;
  description: string;
  image: string;
  technologies: string[];
  link: string;
};

export type WorkExperience = {
  title: string;
  company: string;
  period: string;
  description_list: string[];
  technologies: string[];
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  description: string;
  icon: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  url: string;
  icon: string;
};
