import { BaseEntity } from './api-contracts';

export interface SkillItem {
  name: string;
  img: string;
}

export interface HomeContent extends BaseEntity {
  logo?: string;
  title: string;
  subTitle?: string;
  description: string;
  roles: string[];
  cv?: string;
  profileImg?: string;
  linkdin?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
}

export interface EducationEntry extends BaseEntity {
  date: string;
  title: string;
  description: string;
  isDeleted: boolean;
}

export interface SkillCategory extends BaseEntity {
  category: string;
  skill: SkillItem[];
  isDeleted: boolean;
}

export interface ServiceEntry extends BaseEntity {
  title: string;
  tagline: string;
  bullets: string[];
  icon: string;
  cta?: string;
  isDeleted: boolean;
  deletedAt?: string | null;
}

export interface ProjectEntry extends BaseEntity {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  projectImg?: string;
  viewProject?: string;
  openProject?: string;
  isDeleted: boolean;
}

export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  msg: string;
  isDeleted: boolean;
}

export interface MenuItem {
  name: string;
  icon: string;
  active: boolean;
  route?: string;
}

export interface DashboardCardInfo {
  name: string;
  icon: string;
  active: boolean;
  addRoute: string;
  updateRoute: string;
}

export interface HomeFormValue {
  title: string;
  description: string;
  linkdin: string;
  github: string;
  instagram: string;
  facebook: string;
  logo: string;
  roles: string[];
}

export interface EducationFormValue {
  date: string;
  title: string;
  description: string;
}

export interface SkillCategoryFormValue {
  category: string;
  skill: SkillItem[];
}

export interface SkillCategoryEditFormValue {
  category: string;
  skill: SkillItem[];
}

export interface ProjectFormValue {
  number: string;
  title: string;
  description: string;
  technologies: Array<{ name: string }>;
  viewProject: string;
  openProject: string;
}

export interface ProjectEditFormValue {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  viewProject: string;
  openProject: string;
}

export interface ProjectRequest {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  viewProject: string;
  openProject: string;
}

export interface ServiceFormValue {
  title: string;
  tagline: string;
  bullets: string;
  icon: string;
  cta: string;
}

export interface ServiceRequest {
  title: string;
  tagline: string;
  bullets: string[];
  icon: string;
  cta: string;
}

export interface ContactFormValue {
  name: string;
  email: string;
  msg: string;
}
