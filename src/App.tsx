/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSkillsSection } from './components/AboutSkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationContactSection } from './components/EducationContactSection';
import { PROJECTS_DATA, PERSONAL_INFO, type ProjectItem } from './data/portfolioData';
import { toggleThemeMode } from './utils/portfolioLogic';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('isp_portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // ignore storage errors in restricted environments
    }
    return 'light';
  });

  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [customLinks, setCustomLinks] = useState<Record<string, { github: string; live: string }>>(
    () => {
      const initial: Record<string, { github: string; live: string }> = {};
      for (const proj of PROJECTS_DATA) {
        initial[proj.id] = {
          github: proj.githubUrlPlaceholder,
          live: proj.liveUrlPlaceholder
        };
      }
      return initial;
    }
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('isp_portfolio_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProject) {
        setActiveModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject]);

  const handleToggleTheme = () => {
    setTheme((prev) => toggleThemeMode(prev));
  };

  const handleSelectProjectById = (id: string) => {
    const found = PROJECTS_DATA.find((p) => p.id === id);
    if (found) {
      setActiveModalProject(found);
    }
  };

  const handleUpdateCustomLink = (
    projectId: string,
    field: 'github' | 'live',
    value: string
  ) => {
    setCustomLinks((prev) => ({
      ...prev,
      [projectId]: {
        ...(prev[projectId] || { github: '', live: '' }),
        [field]: value
      }
    }));
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-150 ${
        isDark ? 'bg-[#090A0F] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'
      }`}
    >
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      <main id="main-content">
        <HeroSection
          theme={theme}
          onSelectProjectById={handleSelectProjectById}
        />

        <AboutSkillsSection theme={theme} />

        <ProjectsSection
          theme={theme}
          activeModalProject={activeModalProject}
          onSelectProject={setActiveModalProject}
          customLinks={customLinks}
          onUpdateCustomLink={handleUpdateCustomLink}
        />

        <EducationContactSection theme={theme} />
      </main>

      <footer
        className={`border-t py-10 transition-colors duration-150 ${
          isDark ? 'border-zinc-800 bg-[#090A0F] text-zinc-400' : 'border-zinc-200 bg-[#FAFAFA] text-zinc-600'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {PERSONAL_INFO.name}
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{PERSONAL_INFO.education}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{PERSONAL_INFO.internshipTask}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:underline">
              Back to Top ↑
            </a>
            <a href="#projects" className="hover:underline">
              Projects
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
