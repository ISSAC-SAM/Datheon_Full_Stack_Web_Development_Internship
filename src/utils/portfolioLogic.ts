import type { ProjectCategory, ProjectItem, SkillCategory, SkillItem } from '../data/portfolioData.ts';

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: ProjectCategory,
  searchQuery: string = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesCategory = category === 'all' || project.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      project.title,
      project.subtitle,
      project.summary,
      ...project.technologies,
      project.categoryLabel
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function filterSkillsByCategory(
  skills: SkillItem[],
  category: SkillCategory
): SkillItem[] {
  if (category === 'all') {
    return skills;
  }
  return skills.filter((skill) => skill.category === category);
}

export function validateContactForm(input: ContactFormInput): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedSubject = input.subject.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please provide a brief subject for your message.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters long.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please enter a message before submitting.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters so I can understand your inquiry.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function toggleThemeMode(current: 'light' | 'dark'): 'light' | 'dark' {
  return current === 'dark' ? 'light' : 'dark';
}
