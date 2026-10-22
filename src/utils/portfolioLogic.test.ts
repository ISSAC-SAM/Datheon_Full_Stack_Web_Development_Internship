import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjectsByCategory,
  filterSkillsByCategory,
  validateContactForm,
  toggleThemeMode
} from './portfolioLogic.ts';
import { PROJECTS_DATA, SKILLS_DATA } from '../data/portfolioData.ts';

test('filterProjectsByCategory returns CSI Zion Church Website when category is all', () => {
  const result = filterProjectsByCategory(PROJECTS_DATA, 'all');
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'CSI Zion Church Website');
});

test('filterProjectsByCategory filters by category and search query accurately', () => {
  const cms = filterProjectsByCategory(PROJECTS_DATA, 'cms');
  assert.equal(cms.length, 1);
  assert.equal(cms[0].id, 'csi-zion-church');

  const bootstrapSearch = filterProjectsByCategory(PROJECTS_DATA, 'all', 'Bootstrap');
  assert.equal(bootstrapSearch.length, 1);
  assert.equal(bootstrapSearch[0].id, 'csi-zion-church');
});

test('filterSkillsByCategory filters frontend vs backend-tools skills', () => {
  const allSkills = filterSkillsByCategory(SKILLS_DATA, 'all');
  assert.equal(allSkills.length, 6);

  const backendSkills = filterSkillsByCategory(SKILLS_DATA, 'backend-tools');
  assert.equal(backendSkills.length, 1);
  assert.equal(backendSkills[0].name, 'Node.js');
});

test('validateContactForm rejects empty or invalid inputs and accepts valid submissions', () => {
  const emptyCheck = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  assert.equal(emptyCheck.isValid, false);
  assert.ok(emptyCheck.errors.name);
  assert.ok(emptyCheck.errors.email);
  assert.ok(emptyCheck.errors.subject);
  assert.ok(emptyCheck.errors.message);

  const invalidEmailCheck = validateContactForm({
    name: 'Reviewer',
    email: 'invalid-email',
    subject: 'Internship Review',
    message: 'Checking portfolio form validation behavior.'
  });
  assert.equal(invalidEmailCheck.isValid, false);
  assert.ok(invalidEmailCheck.errors.email);

  const validCheck = validateContactForm({
    name: 'Datheon Mentor',
    email: 'mentor@datheon.example.com',
    subject: 'Task 1 Portfolio Submission Feedback',
    message: 'Great job on your Task 1 personal developer portfolio submission!'
  });
  assert.equal(validCheck.isValid, true);
  assert.deepEqual(validCheck.errors, {});
});

test('toggleThemeMode switches between light and dark accurately', () => {
  assert.equal(toggleThemeMode('light'), 'dark');
  assert.equal(toggleThemeMode('dark'), 'light');
});
