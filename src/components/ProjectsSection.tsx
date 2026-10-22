import React, { useState } from 'react';
import {
  PROJECTS_DATA,
  type ProjectCategory,
  type ProjectItem
} from '../data/portfolioData';
import { filterProjectsByCategory } from '../utils/portfolioLogic';
import {
  ExternalLink,
  Github,
  Search,
  X,
  Copy,
  Check,
  LayoutGrid
} from 'lucide-react';

interface ProjectsSectionProps {
  theme: 'light' | 'dark';
  activeModalProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
  customLinks: Record<string, { github: string; live: string }>;
  onUpdateCustomLink: (projectId: string, field: 'github' | 'live', value: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  theme,
  activeModalProject,
  onSelectProject,
  customLinks,
  onUpdateCustomLink
}) => {
  const [category, setCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'case-study' | 'links'>('case-study');

  const isDark = theme === 'dark';
  const visibleProjects = filterProjectsByCategory(PROJECTS_DATA, category, searchQuery);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const openProjectModal = (project: ProjectItem, initialTab: 'case-study' | 'links') => {
    setModalTab(initialTab);
    onSelectProject(project);
  };

  const renderProjectArtwork = (projectId: string) => {
    return (
      <div
        className={`w-full h-56 sm:h-72 rounded-xl border p-4 flex flex-col justify-between overflow-hidden ${
          isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
        }`}
        role="img"
        aria-label="CSI Zion Church Website content management interface preview"
      >
        <div className="flex items-center justify-between border-b pb-2.5 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-xs font-semibold">CSI Zion Church · Parish &amp; CMS Portal</span>
          </div>
          <span className="text-[11px] font-mono-code text-zinc-500">CMS Admin View</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-auto py-2">
          <div
            className={`p-3 rounded-lg border text-xs ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}
          >
            <p className="text-[11px] text-zinc-400 font-mono-code">SUNDAY SERVICE</p>
            <p className="font-semibold mt-1">8:30 AM · Holy Communion</p>
            <p className="text-[11px] text-zinc-500 mt-1">Published via CMS Schedule</p>
          </div>
          <div
            className={`p-3 rounded-lg border text-xs ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}
          >
            <p className="text-[11px] text-zinc-400 font-mono-code">PARISH BULLETIN</p>
            <p className="font-semibold mt-1">Choir &amp; Youth Fellowship</p>
            <p className="text-[11px] text-zinc-500 mt-1">Content Block: Active</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <span>Bootstrap Grid · Dynamic Notices</span>
          <span>Role: Parish CMS</span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={`py-16 sm:py-24 border-b transition-colors duration-150 ${
        isDark ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
              03. Selected Project
            </p>
            <h2
              id="projects-heading"
              style={{ textWrap: 'balance' }}
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Featured Web Development Build
            </h2>
            <p className={`text-sm mt-2 max-w-[65ch] ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Showcasing the CSI Zion Church Website with content management features and community bulletins.
              Project URLs use transparent placeholders that you can inspect or customize directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search input */}
            <div className="relative">
              <label htmlFor="project-search" className="sr-only">
                Search projects by title or technology
              </label>
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="project-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by tech or title..."
                className={`w-full sm:w-52 pl-9 pr-3 py-1.5 rounded-lg text-xs border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500'
                    : 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>

            {/* Category filter tabs */}
            <div
              role="group"
              aria-label="Filter projects by category"
              className={`inline-flex items-center gap-1 p-1 rounded-lg overflow-x-auto ${
                isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100'
              }`}
            >
              {[
                { id: 'all', label: 'All Projects (1)' },
                { id: 'cms', label: 'Content Management' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id as ProjectCategory)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    category === tab.id
                      ? isDark
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-zinc-900 shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {visibleProjects.length === 0 ? (
          <div
            className={`rounded-2xl border p-10 text-center ${
              isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'
            }`}
          >
            <p className="text-base font-semibold mb-2">No matching projects found</p>
            <p className={`text-xs mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              No project matched &ldquo;{searchQuery}&rdquo; in the selected filter category.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Reset Project Filters
            </button>
          </div>
        ) : (
          /* Bento / Editorial Showcase Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {visibleProjects.map((project) => {
              const isFeaturedWide = true;
              const customProjectLinks = customLinks[project.id] || {
                github: project.githubUrlPlaceholder,
                live: project.liveUrlPlaceholder
              };
              const hasRealGithub = /^https?:\/\//i.test(customProjectLinks.github);
              const hasRealLive = /^https?:\/\//i.test(customProjectLinks.live);

              return (
                <article
                  key={project.id}
                  className={`${
                    isFeaturedWide ? 'lg:col-span-12' : 'lg:col-span-6'
                  } group rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 ease-out hover:scale-[1.012] hover:-translate-y-0.5 hover:shadow-xl ${
                    isDark
                      ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:shadow-black/40'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-zinc-200/60'
                  }`}
                >
                  <div
                    className={
                      isFeaturedWide
                        ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
                        : 'flex flex-col gap-6'
                    }
                  >
                    {/* Visual Preview Slot */}
                    <div className={isFeaturedWide ? 'lg:col-span-6' : 'w-full'}>
                      {renderProjectArtwork(project.id)}
                    </div>

                    {/* Narrative & Details */}
                    <div className={isFeaturedWide ? 'lg:col-span-6 flex flex-col justify-between' : 'flex flex-col justify-between'}>
                      <div>
                        {/* Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono-code mb-2">
                          <span>{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.subtitle}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
                          {project.title}
                        </h3>

                        <p
                          className={`text-sm leading-relaxed mb-4 ${
                            isDark ? 'text-zinc-300' : 'text-zinc-600'
                          }`}
                        >
                          {project.summary}
                        </p>

                        {/* Key Features List */}
                        <ul className="space-y-1.5 mb-5">
                          {project.keyFeatures.slice(0, 3).map((feat, i) => (
                            <li
                              key={i}
                              className={`text-xs flex items-start gap-2 ${
                                isDark ? 'text-zinc-300' : 'text-zinc-600'
                              }`}
                            >
                              <span className="text-blue-600 dark:text-blue-400 font-bold">
                                —
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies as Clean Unboxed Text with Typographic Separators */}
                        <p className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400 mb-6">
                          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                            Stack:{' '}
                          </span>
                          {project.technologies.join(' · ')}
                        </p>
                      </div>

                      {/* Action Buttons for GitHub, Live Project Link, and Case Study */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        {hasRealGithub ? (
                          <a
                            href={customProjectLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                              isDark
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-800'
                                : 'bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200'
                            }`}
                          >
                            <Github className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>GitHub Repo</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'links')}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              isDark
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-800'
                                : 'bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200'
                            }`}
                          >
                            <Github className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>GitHub (Placeholder)</span>
                          </button>
                        )}

                        {hasRealLive ? (
                          <a
                            href={customProjectLinks.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Live Demo</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openProjectModal(project, 'links')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Live Link (Placeholder)</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => openProjectModal(project, 'case-study')}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ml-auto ${
                            isDark
                              ? 'text-blue-400 hover:bg-zinc-800'
                              : 'text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          <span>Case Study &amp; Architecture →</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Project Case Study & Link Placeholder Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) onSelectProject(null);
          }}
        >
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 shadow-2xl ${
              isDark ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="text-xs font-mono-code text-blue-600 dark:text-blue-400">
                  {activeModalProject.index} · {activeModalProject.categoryLabel}
                </p>
                <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold mt-1">
                  {activeModalProject.title}
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {activeModalProject.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectProject(null)}
                aria-label="Close project details modal"
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                    : 'border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 my-5">
              <button
                type="button"
                onClick={() => setModalTab('case-study')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  modalTab === 'case-study'
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                Architecture &amp; Case Study
              </button>
              <button
                type="button"
                onClick={() => setModalTab('links')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  modalTab === 'links'
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                GitHub &amp; Live Link Placeholders
              </button>
            </div>

            {modalTab === 'case-study' ? (
              <div className="space-y-5 text-sm">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Problem Statement
                  </h4>
                  <p className={isDark ? 'text-zinc-300 leading-relaxed' : 'text-zinc-700 leading-relaxed'}>
                    {activeModalProject.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Solution Overview
                  </h4>
                  <p className={isDark ? 'text-zinc-300 leading-relaxed' : 'text-zinc-700 leading-relaxed'}>
                    {activeModalProject.solutionOverview}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                    <p className="text-xs font-semibold mb-1">Frontend Layer</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {activeModalProject.architectureHighlights.frontend}
                    </p>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                    <p className="text-xs font-semibold mb-1">Logic &amp; State</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {activeModalProject.architectureHighlights.logicAndState}
                    </p>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                    <p className="text-xs font-semibold mb-1">Data Flow</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {activeModalProject.architectureHighlights.dataFlow}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    Key Implemented Features
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalProject.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-5 text-sm">
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    isDark
                      ? 'bg-blue-950/30 border-blue-800/60 text-blue-200'
                      : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}
                >
                  <p className="font-semibold mb-1">Why are these URLs marked as placeholders?</p>
                  <p>
                    Per internship submission guidelines, project repository and deployment URLs are
                    never fabricated. Replace the placeholders below with your actual GitHub and
                    live URLs in <code className="font-mono-code">src/data/portfolioData.ts</code>{' '}
                    or test them right here in the live preview.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="modal-github-url"
                      className="block text-xs font-semibold mb-1.5"
                    >
                      GitHub Repository URL Placeholder
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="modal-github-url"
                        type="text"
                        value={
                          customLinks[activeModalProject.id]?.github ??
                          activeModalProject.githubUrlPlaceholder
                        }
                        onChange={(e) =>
                          onUpdateCustomLink(activeModalProject.id, 'github', e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg text-xs font-mono-code border ${
                          isDark
                            ? 'bg-zinc-950 border-zinc-700 text-zinc-100'
                            : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            customLinks[activeModalProject.id]?.github ??
                              activeModalProject.githubUrlPlaceholder,
                            'github'
                          )
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border shrink-0 cursor-pointer ${
                          isDark
                            ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
                            : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {copiedKey === 'github' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-live-url" className="block text-xs font-semibold mb-1.5">
                      Live Deployment URL Placeholder
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="modal-live-url"
                        type="text"
                        value={
                          customLinks[activeModalProject.id]?.live ??
                          activeModalProject.liveUrlPlaceholder
                        }
                        onChange={(e) =>
                          onUpdateCustomLink(activeModalProject.id, 'live', e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-lg text-xs font-mono-code border ${
                          isDark
                            ? 'bg-zinc-950 border-zinc-700 text-zinc-100'
                            : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            customLinks[activeModalProject.id]?.live ??
                              activeModalProject.liveUrlPlaceholder,
                            'live'
                          )
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border shrink-0 cursor-pointer ${
                          isDark
                            ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700'
                            : 'bg-zinc-100 border-zinc-300 hover:bg-zinc-200'
                        }`}
                      >
                        {copiedKey === 'live' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono-code text-zinc-500">
                Stack: {activeModalProject.technologies.join(' · ')}
              </span>
              <button
                type="button"
                onClick={() => onSelectProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
