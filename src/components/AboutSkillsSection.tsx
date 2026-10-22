import React, { useState } from 'react';
import { PERSONAL_INFO, SKILLS_DATA, type SkillCategory, type SkillItem } from '../data/portfolioData';
import { filterSkillsByCategory } from '../utils/portfolioLogic';
import { Code, CheckCircle2 } from 'lucide-react';

interface AboutSkillsSectionProps {
  theme: 'light' | 'dark';
}

export const AboutSkillsSection: React.FC<AboutSkillsSectionProps> = ({ theme }) => {
  const [skillCategory, setSkillCategory] = useState<SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const isDark = theme === 'dark';

  const filteredSkills = filterSkillsByCategory(SKILLS_DATA, skillCategory);

  const handleCategoryChange = (category: SkillCategory) => {
    setSkillCategory(category);
    const nextList = filterSkillsByCategory(SKILLS_DATA, category);
    if (nextList.length > 0 && !nextList.some((s) => s.id === selectedSkill.id)) {
      setSelectedSkill(nextList[0]);
    }
  };

  return (
    <>
      {/* ABOUT SECTION */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className={`py-16 sm:py-24 border-b transition-colors duration-150 ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                01. About Me
              </p>
              <h2
                id="about-heading"
                style={{ textWrap: 'balance' }}
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
              >
                An MCA student focused on clean fundamentals and practical web engineering.
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Personal profile prepared for the {PERSONAL_INFO.internshipTask}. All missing
                external links or unverified credentials use transparent placeholders.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {PERSONAL_INFO.bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-base leading-relaxed ${
                    isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <div
                className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t ${
                  isDark ? 'border-zinc-800' : 'border-zinc-200'
                }`}
              >
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Developer Name
                  </p>
                  <p className="text-sm font-semibold mt-1">{PERSONAL_INFO.name}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Current Education
                  </p>
                  <p className="text-sm font-semibold mt-1">{PERSONAL_INFO.education}</p>
                </div>
                <div>
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    Proficiency Level
                  </p>
                  <p className="text-sm font-semibold mt-1">Beginner · Full Stack Focus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className={`py-16 sm:py-24 border-b transition-colors duration-150 ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                02. Technical Skills
              </p>
              <h2
                id="skills-heading"
                style={{ textWrap: 'balance' }}
                className="text-2xl sm:text-3xl font-bold tracking-tight"
              >
                Core Web Development Stack
              </h2>
              <p className={`text-sm mt-2 max-w-[60ch] ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Select any technology below to inspect how I apply it across my academic and web
                management projects.
              </p>
            </div>

            {/* Interactive Filter Controls */}
            <div
              role="group"
              aria-label="Filter skills by category"
              className={`inline-flex items-center gap-1 p-1 rounded-lg self-start ${
                isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100'
              }`}
            >
              {[
                { id: 'all', label: 'All Technologies (6)' },
                { id: 'frontend', label: 'Frontend (5)' },
                { id: 'backend-tools', label: 'Backend (1)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryChange(tab.id as SkillCategory)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    skillCategory === tab.id
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Skill Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill, idx) => {
                const isSelected = selectedSkill.id === skill.id;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    aria-pressed={isSelected}
                    className={`text-left p-5 rounded-2xl border transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isSelected
                        ? isDark
                          ? 'bg-zinc-900 border-blue-500'
                          : 'bg-white border-blue-600 ring-1 ring-blue-600/20'
                        : isDark
                        ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                        : 'bg-white border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                        0{idx + 1} · {skill.categoryLabel}
                      </span>
                      {isSelected && (
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-1">{skill.name}</h3>
                    <p className={`text-xs mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {skill.level}
                    </p>
                    <p
                      className={`text-xs leading-relaxed line-clamp-2 ${
                        isDark ? 'text-zinc-300' : 'text-zinc-600'
                      }`}
                    >
                      {skill.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Interactive Skill Detail & Code Inspector Panel */}
            <div
              className={`lg:col-span-5 rounded-2xl border p-6 ${
                isDark ? 'bg-zinc-900/70 border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Skill Implementation Inspector
                  </p>
                  <h3 className="text-xl font-bold mt-0.5">{selectedSkill.name}</h3>
                </div>
                <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                  {selectedSkill.categoryLabel}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    Core Focus
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {selectedSkill.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <span>Project Application</span>
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    {selectedSkill.practicalApplication}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Code className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Example Pattern</span>
                    </span>
                    <span className="font-mono-code">{selectedSkill.id}</span>
                  </div>
                  <pre
                    className={`p-4 rounded-xl font-mono-code text-xs leading-relaxed overflow-x-auto ${
                      isDark ? 'bg-zinc-950 text-zinc-200' : 'bg-zinc-50 text-zinc-800'
                    }`}
                  >
                    <code>{selectedSkill.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
