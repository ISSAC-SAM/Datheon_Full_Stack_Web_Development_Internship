import React, { useState } from 'react';
import { EDUCATION_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { validateContactForm, type ContactFormErrors } from '../utils/portfolioLogic';
import {
  Mail,
  Phone,
  Linkedin,
  Copy,
  Check,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface EducationContactSectionProps {
  theme: 'light' | 'dark';
}

interface SubmittedInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export const EducationContactSection: React.FC<EducationContactSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setJustSubmitted(false);
      return;
    }

    setFormErrors({});
    const newEntry: SubmittedInquiry = {
      id: `msg-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedInquiries((prev) => [newEntry, ...prev]);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setJustSubmitted(true);
  };

  const contactChannels = [
    {
      key: 'email',
      label: 'Email Address',
      value: PERSONAL_INFO.contact.email,
      href: `mailto:${PERSONAL_INFO.contact.email}`,
      icon: Mail
    },
    {
      key: 'phone',
      label: 'Phone Number',
      value: PERSONAL_INFO.contact.phone,
      href: `tel:${PERSONAL_INFO.contact.phone.replace(/\s+/g, '')}`,
      icon: Phone
    },
    {
      key: 'linkedin',
      label: 'LinkedIn Profile',
      value: PERSONAL_INFO.contact.linkedinDisplay,
      href: PERSONAL_INFO.contact.linkedin,
      icon: Linkedin,
      isExternal: true
    }
  ];

  return (
    <>
      {/* EDUCATION SECTION */}
      <section
        id="education"
        aria-labelledby="education-heading"
        className={`py-16 sm:py-24 border-b transition-colors duration-150 ${
          isDark ? 'border-zinc-800/80' : 'border-zinc-200'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
              04. Education &amp; Academic Background
            </p>
            <h2
              id="education-heading"
              style={{ textWrap: 'balance' }}
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Academic Qualification &amp; Internship Milestone
            </h2>
            <p className={`text-sm mt-2 max-w-[65ch] ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Academic qualifications in computer applications, software engineering fundamentals,
              and practical full-stack web development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {EDUCATION_DATA.map((edu, idx) => (
              <article
                key={edu.id}
                className={`lg:col-span-6 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between ${
                  isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-zinc-500 dark:text-zinc-400 mb-2">
                    <span>0{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {edu.status}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{edu.period}</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight mb-1">{edu.degree}</h3>
                  <p className="text-xs font-mono-code text-zinc-600 dark:text-zinc-300 mb-4">
                    Institution: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{edu.institution}</span>
                  </p>

                  <p
                    className={`text-sm leading-relaxed mb-5 ${
                      isDark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {edu.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    Key Focus Areas:
                  </p>
                  <p className="text-xs font-mono-code text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {edu.courseworkFocus.join(' · ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-16 sm:py-24 transition-colors duration-150"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">
                  05. Contact &amp; Links
                </p>
                <h2
                  id="contact-heading"
                  style={{ textWrap: 'balance' }}
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
                >
                  Get in Touch with Issac Sam Prakash
                </h2>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Have a question about my Datheon Full Stack Web Development Internship submission
                  or my project? Feel free to reach out via email, phone, or LinkedIn, or send a
                  message using the form.
                </p>
              </div>

              {/* Contact Channels List */}
              <div className="space-y-3">
                {contactChannels.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.key}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}
                    >
                      <a
                        href={item.href}
                        target={item.isExternal ? '_blank' : undefined}
                        rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-3 min-w-0 group hover:opacity-80 transition-opacity"
                      >
                        <IconComponent
                          className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {item.label}
                          </p>
                          <p className="text-xs font-mono-code font-medium truncate mt-0.5 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {item.value}
                          </p>
                        </div>
                      </a>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.isExternal && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${item.label} in new tab`}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isDark
                                ? 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                                : 'bg-zinc-50 border-zinc-300 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleCopy(item.value, item.key)}
                          aria-label={`Copy ${item.label}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors shrink-0 cursor-pointer ${
                            isDark
                              ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                              : 'bg-zinc-50 border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                          }`}
                        >
                          {copiedField === item.key ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive Validated Contact Form */}
            <div className="lg:col-span-7">
              <div
                className={`rounded-2xl border p-6 sm:p-8 ${
                  isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <h3 className="text-lg font-bold mb-1">Send a Direct Message</h3>
                <p className={`text-xs mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  All fields are validated with accessible error handling.
                </p>

                {justSubmitted && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mb-6 p-4 rounded-xl border flex items-start gap-3 text-xs ${
                      isDark
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold">Message validated and recorded!</p>
                      <p className="mt-0.5">
                        Thank you for reaching out. Your inquiry has been added to the session log
                        below.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          if (formErrors.name) {
                            setFormErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                        placeholder="e.g., Rohan Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                          formErrors.name
                            ? 'border-red-500'
                            : isDark
                            ? 'bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-500'
                            : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                        }`}
                      />
                      {formErrors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (formErrors.email) {
                            setFormErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(formErrors.email)}
                        aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                        placeholder="e.g., reviewer@datheon.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                          formErrors.email
                            ? 'border-red-500'
                            : isDark
                            ? 'bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-500'
                            : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                        }`}
                      />
                      {formErrors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, subject: e.target.value }));
                        if (formErrors.subject) {
                          setFormErrors((prev) => ({ ...prev, subject: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(formErrors.subject)}
                      aria-describedby={formErrors.subject ? 'contact-subject-error' : undefined}
                      placeholder="e.g., Datheon Internship Task 1 Feedback"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        formErrors.subject
                          ? 'border-red-500'
                          : isDark
                          ? 'bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-500'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                      }`}
                    />
                    {formErrors.subject && (
                      <p
                        id="contact-subject-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.subject}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, message: e.target.value }));
                        if (formErrors.message) {
                          setFormErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(formErrors.message)}
                      aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                      placeholder="Write your message or feedback here..."
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        formErrors.message
                          ? 'border-red-500'
                          : isDark
                          ? 'bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-500'
                          : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400'
                      }`}
                    />
                    {formErrors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ name: '', email: '', subject: '', message: '' });
                        setFormErrors({});
                        setJustSubmitted(false);
                      }}
                      className={`px-4 py-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        isDark
                          ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                          : 'border-zinc-300 text-zinc-600 hover:bg-zinc-100'
                      }`}
                    >
                      Clear Form
                    </button>
                  </div>
                </form>

                {/* Sent Inquiries Log */}
                {submittedInquiries.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
                      Submitted Messages in This Session ({submittedInquiries.length})
                    </h4>
                    <div className="space-y-3">
                      {submittedInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`p-3.5 rounded-xl border text-xs ${
                            isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 font-mono-code text-zinc-500 mb-1">
                            <span>
                              {inq.name} ({inq.email})
                            </span>
                            <span>{inq.timestamp}</span>
                          </div>
                          <p className="font-semibold mb-1">{inq.subject}</p>
                          <p className={isDark ? 'text-zinc-300' : 'text-zinc-600'}>
                            {inq.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
