export type ProjectCategory = 'all' | 'cms';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  summary: string;
  problemStatement: string;
  solutionOverview: string;
  keyFeatures: string[];
  technologies: string[];
  githubUrlPlaceholder: string;
  liveUrlPlaceholder: string;
  featured: boolean;
  architectureHighlights: {
    frontend: string;
    logicAndState: string;
    dataFlow: string;
  };
}

export type SkillCategory = 'all' | 'frontend' | 'backend-tools' | 'fundamentals';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  level: string;
  description: string;
  practicalApplication: string;
  codeSnippet: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  status: string;
  institution: string;
  period: string;
  description: string;
  courseworkFocus: string[];
}

export const PERSONAL_INFO = {
  name: 'Issac Sam Prakash',
  education: 'MCA Student',
  technicalLevel: 'Beginner Full Stack Developer',
  internshipTask: 'Datheon Full Stack Web Development Internship · Task 1',
  tagline: 'Building clean, accessible, and practical web applications from semantic HTML to React & Node.js.',
  bioParagraphs: [
    'I am Issac Sam Prakash, a Master of Computer Applications (MCA) student with a strong focus on Full Stack Web Development. As a dedicated beginner developer, I prioritize writing clean, well-structured, and maintainable code while learning how modern web interfaces and backend services work together.',
    'Through practical web projects—notably the CSI Zion Church Website featuring content management workflows and dynamic community bulletins—I apply HTML5, CSS3, JavaScript (ES6+), React, Node.js, and Bootstrap to solve real-world user needs.'
  ],
  contact: {
    email: 'issacsamprakash@gmail.com',
    phone: '+91 76038 97800',
    linkedin: 'https://www.linkedin.com/in/issac-samprakash-s-59ba57272',
    linkedinDisplay: 'www.linkedin.com/in/issac-samprakash-s-59ba57272'
  }
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'csi-zion-church',
    index: '01',
    title: 'CSI Zion Church Website',
    subtitle: 'Church Website with Content Management Features',
    category: 'cms',
    categoryLabel: 'Content Management',
    summary:
      'A community-centered church web portal featuring service schedules, parish announcements, event calendars, and administrative content management capabilities for updating bulletins.',
    problemStatement:
      'Community members needed a single reliable digital platform to check weekly worship timings, read announcements, and stay informed on parish events without manual paper notices.',
    solutionOverview:
      'Developed an accessible, welcoming website paired with structured content management modules so administrators can publish announcements, update event schedules, and organize ministry details.',
    keyFeatures: [
      'Dynamic announcement board and weekly worship service schedule display',
      'Content management interface for adding, editing, and archiving church notices',
      'Responsive layout built with Bootstrap and custom CSS for cross-device clarity',
      'Dedicated sections for parish history, ministries, event gallery, and visitor contact'
    ],
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Node.js'],
    githubUrlPlaceholder: '[PLACEHOLDER: https://github.com/your-username/csi-zion-church-website]',
    liveUrlPlaceholder: '[PLACEHOLDER: https://your-csi-zion-church.example.com]',
    featured: true,
    architectureHighlights: {
      frontend: 'Semantic HTML5 landmarks and Bootstrap grid layouts tailored for multi-generational readability.',
      logicAndState: 'Client-side validation for announcement forms and schedule filtering by event category.',
      dataFlow: 'REST-style content endpoints supporting structured updates to notices and parish schedules.'
    }
  }
];

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Frontend Core',
    level: 'Foundational · Semantic Markup',
    description: 'Structuring web documents using semantic landmarks (<header>, <main>, <section>, <article>, <nav>), accessible forms, and SEO-friendly metadata.',
    practicalApplication: 'Used across all three projects to ensure screen-reader compatibility and clean document outlines.',
    codeSnippet: `<section aria-labelledby="projects-heading">\n  <h2 id="projects-heading">Selected Projects</h2>\n  <article class="project-card">...</article>\n</section>`
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'frontend',
    categoryLabel: 'Frontend Core',
    level: 'Foundational · Responsive Styling',
    description: 'Crafting responsive layouts with Flexbox, CSS Grid, custom properties (variables), media queries, and smooth compositor transitions.',
    practicalApplication: 'Applied in custom theme styling, responsive typography scales, and card hover states.',
    codeSnippet: `.portfolio-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: 1.5rem;\n}`
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Frontend Logic',
    level: 'Foundational · Interactive DOM & Logic',
    description: 'Writing modular ES6+ code using arrow functions, array methods (map, filter, reduce), async/await, event listeners, and client-side form validation.',
    practicalApplication: 'Powers dynamic content updates, parish bulletin filtering, and client-side form validation in web applications.',
    codeSnippet: `const filterProjects = (items, category) =>\n  category === 'all'\n    ? items\n    : items.filter((item) => item.category === category);`
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    categoryLabel: 'Component UI',
    level: 'Beginner · Hooks & State',
    description: 'Building reusable functional components, managing interactive state with useState and useEffect, props drilling prevention, and conditional rendering.',
    practicalApplication: 'Used to build this interactive portfolio, dynamic project filtering, theme persistence, and modal views.',
    codeSnippet: `const [activeCategory, setActiveCategory] = useState('all');\nconst visibleProjects = useMemo(() =>\n  filterProjects(projects, activeCategory), [activeCategory]);`
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'frontend',
    categoryLabel: 'UI Framework',
    level: 'Foundational · Responsive Grid & Utilities',
    description: 'Rapidly prototyping mobile-first responsive grids, navigation bars, modals, and consistent form controls using Bootstrap utility classes.',
    practicalApplication: 'Utilized in the CSI Zion Church Website for clean multi-generational and cross-device layouts.',
    codeSnippet: `<div class="container py-5">\n  <div class="row g-4 align-items-stretch">\n    <div class="col-12 col-md-6 col-lg-4">...</div>\n  </div>\n</div>`
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend-tools',
    categoryLabel: 'Backend Runtime',
    level: 'Beginner · Server & API Basics',
    description: 'Understanding server-side JavaScript execution, npm package management, basic Express routing, and handling JSON request/response payloads.',
    practicalApplication: 'Supports backend logic for content management updates and structured API responses.',
    codeSnippet: `app.get('/api/projects', (req, res) => {\n  res.status(200).json({ status: 'ok', count: projects.length });\n});`
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    status: 'Currently Pursuing',
    institution: 'Thanthai Hans Roever College',
    period: '2026 – Present',
    description:
      'Focusing on software engineering fundamentals, full-stack web application development, database management systems, and object-oriented programming.',
    courseworkFocus: [
      'Web Technologies (HTML, CSS, JavaScript, React)',
      'Server-Side Development with Node.js',
      'Database Management & Application Architecture',
      'Software Engineering & Academic Project Development'
    ]
  },
  {
    id: 'bca',
    degree: 'BCA',
    status: 'Completed · Academic Foundation',
    institution: 'Loyola College of Arts and Science / Periyar University',
    period: '2023 – 2026',
    description:
      'Built core foundations in computer applications, programming logic, database fundamentals, and responsive web design.',
    courseworkFocus: [
      'Programming Fundamentals & Data Structures',
      'Relational Databases & SQL Basics',
      'Frontend Web Design & Bootstrap Layouts',
      'Web Applications & Content Management'
    ]
  }
];
