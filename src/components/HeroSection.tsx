import React, { useState } from 'react';
import { ArrowDownRight, Code2, Layers, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  theme: 'light' | 'dark';
  onSelectProjectById: (id: string) => void;
}

type PreviewTab = 'overview' | 'stack' | 'featured';

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, onSelectProjectById }) => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('overview');
  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className={`pt-10 pb-16 sm:pt-16 sm:pb-24 border-b transition-colors duration-150 ${
        isDark ? 'border-zinc-800/80' : 'border-zinc-200'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p
                className={`text-xs sm:text-sm font-medium mb-4 ${
                  isDark ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                <span>{PERSONAL_INFO.education}</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{PERSONAL_INFO.internshipTask}</span>
              </p>

              <h1
                id="hero-heading"
                style={{ textWrap: 'balance' }}
                className="text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight leading-[1.12] mb-6"
              >
                Hello, I’m{' '}
                <span className="font-serif-editorial italic font-normal text-blue-600 dark:text-blue-400">
                  {PERSONAL_INFO.name}
                </span>
                . I build thoughtful, structured web applications.
              </h1>

              <p
                className={`text-base sm:text-lg leading-relaxed max-w-[62ch] mb-8 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                An {PERSONAL_INFO.education} and aspiring Full Stack Web Developer crafting
                responsive user interfaces and practical web solutions using{' '}
                <strong className={isDark ? 'text-zinc-100 font-semibold' : 'text-zinc-900 font-semibold'}>
                  HTML5, CSS3, JavaScript, React, Node.js, and Bootstrap
                </strong>
                .
              </p>
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span>View Showcase Projects</span>
                  <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-100 hover:bg-zinc-800'
                      : 'bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Blueprint & Project Quick-Inspector */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className={`h-full rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-colors ${
                isDark
                  ? 'bg-zinc-900/70 border-zinc-800'
                  : 'bg-white border-zinc-200/90'
              }`}
            >
              {/* Interactive Segmented Control Tabs */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0">
                    profile.tsx
                  </span>
                  <div
                    role="tablist"
                    aria-label="Developer Preview Views"
                    className={`flex items-center gap-1 p-1 rounded-lg ${
                      isDark ? 'bg-zinc-950' : 'bg-zinc-100'
                    }`}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'overview'}
                      onClick={() => setActiveTab('overview')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeTab === 'overview'
                          ? isDark
                            ? 'bg-zinc-800 text-white'
                            : 'bg-white text-zinc-900 shadow-xs'
                          : isDark
                          ? 'text-zinc-400 hover:text-zinc-200'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Profile
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'stack'}
                      onClick={() => setActiveTab('stack')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeTab === 'stack'
                          ? isDark
                            ? 'bg-zinc-800 text-white'
                            : 'bg-white text-zinc-900 shadow-xs'
                          : isDark
                          ? 'text-zinc-400 hover:text-zinc-200'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Stack
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'featured'}
                      onClick={() => setActiveTab('featured')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        activeTab === 'featured'
                          ? isDark
                            ? 'bg-zinc-800 text-white'
                            : 'bg-white text-zinc-900 shadow-xs'
                          : isDark
                          ? 'text-zinc-400 hover:text-zinc-200'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Projects
                    </button>
                  </div>
                </div>

                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                        ISP
                      </div>
                      <div>
                        <h2 className="text-base font-semibold">Issac Sam Prakash</h2>
                        <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          MCA Student · Beginner Full Stack Developer
                        </p>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-xl font-mono-code text-xs leading-relaxed overflow-x-auto ${
                        isDark ? 'bg-zinc-950 text-zinc-300' : 'bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                        const developer = &#123;
                      </p>
                      <p className="pl-4">name: &apos;Issac Sam Prakash&apos;,</p>
                      <p className="pl-4">education: &apos;MCA Student&apos;,</p>
                      <p className="pl-4">level: &apos;Beginner&apos;,</p>
                      <p className="pl-4">
                        focus: [&apos;Frontend UI&apos;, &apos;Full Stack Web&apos;],
                      </p>
                      <p className="pl-4">internship: &apos;Datheon Task 1&apos;</p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">&#125;;</p>
                    </div>
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                      <Code2 className="w-4 h-4" aria-hidden="true" />
                      <span>Core Technologies & Tools</span>
                    </div>
                    <dl className="grid grid-cols-2 gap-3 text-xs">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
                        <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Markup & Styling</dt>
                        <dd className="font-semibold mt-1">HTML5 · CSS3 · Bootstrap</dd>
                      </div>
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
                        <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Scripting & UI</dt>
                        <dd className="font-semibold mt-1">JavaScript (ES6+) · React</dd>
                      </div>
                      <div className={`p-3 rounded-xl col-span-2 ${isDark ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
                        <dt className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Server Runtime</dt>
                        <dd className="font-semibold mt-1">Node.js · Modular Web Architecture</dd>
                      </div>
                    </dl>
                  </div>
                )}

                {activeTab === 'featured' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                      <Layers className="w-4 h-4" aria-hidden="true" />
                      <span>Click to inspect project case study:</span>
                    </div>
                    {[
                      { id: 'csi-zion-church', name: '01. CSI Zion Church Website', desc: 'Church website & CMS portal' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelectProjectById(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          isDark
                            ? 'bg-zinc-950 hover:bg-zinc-800 text-zinc-200'
                            : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-800'
                        }`}
                      >
                        <div>
                          <span className="font-semibold block">{item.name}</span>
                          <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>{item.desc}</span>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap ml-2">
                          Inspect →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Semantic HTML5 · Accessible UI</span>
                </span>
                <a
                  href="#skills"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                >
                  Explore Skills →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Portfolio Key Facts Row Below Hero Split */}
        <div
          className={`mt-12 pt-8 border-t grid grid-cols-2 lg:grid-cols-4 gap-6 ${
            isDark ? 'border-zinc-800/80' : 'border-zinc-200'
          }`}
        >
          <div>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Academic Program
            </p>
            <p className="text-lg sm:text-xl font-bold mt-1 font-mono-code">
              MCA Student
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Master of Computer Applications
            </p>
          </div>

          <div>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Core Technologies
            </p>
            <p className="text-lg sm:text-xl font-bold mt-1 font-mono-code">
              6 Technologies
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              HTML · CSS · JS · React · Node.js · Bootstrap
            </p>
          </div>

          <div>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Featured Project
            </p>
            <p className="text-lg sm:text-xl font-bold mt-1 font-mono-code">
              CSI Zion Church
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Church Website &amp; CMS Features
            </p>
          </div>

          <div>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Current Milestone
            </p>
            <p className="text-lg sm:text-xl font-bold mt-1 font-mono-code">
              Datheon Task 1
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Full Stack Web Development Internship
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
