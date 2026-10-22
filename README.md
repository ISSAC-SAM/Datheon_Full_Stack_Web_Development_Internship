# Issac Sam Prakash — Personal Developer Portfolio

A responsive, accessible personal developer portfolio website built for the **Datheon Full Stack Web Development Internship (Task 1)**.

## Developer Profile

- **Name:** Issac Sam Prakash
- **Education:** MCA Student (Master of Computer Applications) — Thanthai Hans Roever College (2026 – Present)
- **Undergraduate:** BCA — Loyola College of Arts and Science / Periyar University (2023 – 2026)
- **Email:** issacsamprakash@gmail.com
- **Phone:** +91 76038 97800
- **LinkedIn:** [www.linkedin.com/in/issac-samprakash-s-59ba57272](https://www.linkedin.com/in/issac-samprakash-s-59ba57272)
- **Technical Level:** Beginner Full Stack Developer
- **Core Technologies:** HTML5, CSS3, JavaScript (ES6+), React, Node.js, and Bootstrap

---

## Featured Project Showcased

1. **CSI Zion Church Website** — *Church Website with Content Management Features*
   - Community portal featuring worship schedules, parish announcements, and content management capabilities for updating bulletins. Built with HTML5, CSS3, Bootstrap, JavaScript, and Node.js.

---

## Key Features

- **Editorial Split-Screen Hero & Responsive Layout:** Designed for mobile (`390px`), tablet (`768px`), and desktop (`1440px`) viewports.
- **Working Dark / Light Theme Toggle:** Persists user preference in `localStorage` and updates document theme attributes immediately.
- **Accessible Mobile Navigation Menu:** Keyboard-friendly (`Escape` to close) and touch-friendly drawer navigation.
- **Interactive Skill Implementation Inspector:** Filter skills by category (`Frontend` vs. `Backend`) and inspect code snippets and project usage for HTML5, CSS3, JavaScript, React, Bootstrap, and Node.js.
- **Interactive Project Case Studies & Link Placeholder Customizer:** Filter projects by category or search keyword, view architectural breakdowns, and inspect or customize placeholder GitHub/Live URLs without fabricating unverified links.
- **Validated Contact Form & Placeholder Customizer:** Includes client-side error handling, accessible `aria-invalid` and `role="alert"` feedback, session submission log, and one-click copy buttons for contact placeholders.

---

## Project Structure

```text
├── index.html                        # HTML5 entry point with SEO & OpenGraph metadata
├── metadata.json                     # Application metadata
├── package.json                      # Dependencies and build/test scripts
├── README.md                         # Project documentation and setup instructions
└── src/
    ├── main.tsx                      # React DOM root mount
    ├── App.tsx                       # Main portfolio layout & theme state management
    ├── index.css                     # Tailwind CSS imports & custom typography rules
    ├── data/
    │   └── portfolioData.ts          # Personal info, projects, skills, education & placeholders
    ├── utils/
    │   ├── portfolioLogic.ts         # Pure functions for filtering, validation & theme toggle
    │   └── portfolioLogic.test.ts    # Unit tests using Node's built-in test runner
    └── components/
        ├── Navbar.tsx                # 3-zone navigation header, theme toggle & mobile menu
        ├── HeroSection.tsx           # Split-screen hero, interactive profile tabs & metrics row
        ├── AboutSkillsSection.tsx    # About narrative & interactive skill code inspector
        ├── ProjectsSection.tsx       # Filterable project cards & case study / link modal
        └── EducationContactSection.tsx # Education timeline, placeholders & validated contact form
```

---

## Updating Placeholders Before Final Submission

To ensure strict honesty and accuracy, missing details (email, phone number, GitHub/Live URLs, and university name/years) are clearly marked with `[PLACEHOLDER: ...]`.

To insert your permanent personal details:
1. Open `src/data/portfolioData.ts`.
2. Update `PERSONAL_INFO.placeholders` with your real email address, phone number, GitHub profile URL, and LinkedIn URL.
3. Update `githubUrlPlaceholder` and `liveUrlPlaceholder` inside `PROJECTS_DATA` with your actual repository and deployment URLs.
4. Update `institutionPlaceholder` and `periodPlaceholder` inside `EDUCATION_DATA`.

---

## Local Setup & Running Instructions

### Prerequisites
- **Node.js** (v18+ or v22+ recommended)
- **npm** (included with Node.js)

### Installation & Development Server
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server on port 3000:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

### Running Unit Tests & Production Build
- Run unit tests:
  ```bash
  node --test src/utils/portfolioLogic.test.ts
  ```
- Create a production build:
  ```bash
  npm run build
  ```
- Preview the production build locally:
  ```bash
  npm run preview
  ```

---

## Deployment Instructions (GitHub Pages / Vercel / Netlify)

Once you have exported/downloaded the source code and pushed it to your GitHub repository:

- **Vercel / Netlify:** Import your GitHub repository, set the **Build Command** to `npm run build`, and set the **Output Directory** to `dist`.
- **GitHub Pages:** Build the static bundle via `npm run build` and deploy the generated `dist/` folder using GitHub Actions (`actions/deploy-pages`) or `gh-pages`.
