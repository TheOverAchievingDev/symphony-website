// Family Meal Planner — distilled scenario data for the demo.

window.DEMO = {
  project: {
    name: 'family-meal-planner',
    workspace: 'C:\\SymphonyDemo\\family-meal-planner',
    idea: 'A practical meal planner for busy families with picky eaters, shared grocery lists, budget-aware recipes, and substitution suggestions.',
  },

  // ── Foundry chat transcript ───────────────────────────────────────────────
  foundryChat: [
    { who: 'user',      text: 'I want a family meal planning app. The big problem is that everyone has different dislikes, allergies, and schedules.' },
    { who: 'assistant', text: 'Let\'s lock the product shape before the team builds. I need to capture users, rules for substitutions, grocery workflows, and what success looks like.' },
    { who: 'user',      text: 'The first version should be a web app. Parents can build a weekly plan, mark dislikes for each person, and get a grocery list.' },
    { who: 'assistant', text: 'Good. I will produce the founding docs the agents need: product brief, technical spec, data model, roadmap, and acceptance criteria.' },
  ],

  // ── Foundry phases / docs ────────────────────────────────────────────────
  phases: [
    { name: 'Brief',             status: 'done' },
    { name: 'Tech spec',         status: 'pending' },
    { name: 'Roadmap',           status: 'done' },
    { name: 'Tasks',             status: 'pending' },
    { name: 'Steering',          status: 'optional' },
    { name: 'Design decisions',  status: 'optional' },
    { name: 'Definition of done',status: 'optional' },
  ],

  foundryDocs: [
    { title: 'Product brief',         file: 'docs/foundry/product-brief.md' },
    { title: 'Technical spec',        file: 'docs/foundry/technical-spec.md' },
    { title: 'Prisma data model',     file: 'docs/foundry/prisma-schema.md' },
    { title: 'Build roadmap',         file: 'docs/foundry/roadmap.md' },
    { title: 'Acceptance criteria',   file: 'docs/foundry/acceptance-criteria.md' },
  ],

  roadmapMarkdown: [
    '# Build Roadmap',
    '',
    '## Slice 1 — Data foundation',
    'Create household, member, recipe, and meal plan models with seed data.',
    '',
    '## Slice 2 — Planning UI',
    'Build a weekly board that shows breakfast, lunch, and dinner slots.',
    '',
    '## Slice 3 — Preference engine',
    'Apply hard allergy rules and soft dislike rules to recipe selection.',
    '',
    '## Slice 4 — Grocery list',
    'Compile ingredients across the week, group by store section.',
    '',
    '## Slice 5 — Drift review',
    'Compare implementation against the founding docs before merge.',
  ],

  // ── Team (5 members per the new modal) ───────────────────────────────────
  team: [
    { id: 'lead',      role: 'Lead',      providerLabel: 'Opus 4.6',    initial: 'L', tone: 'coral' },
    { id: 'architect', role: 'Architect', providerLabel: 'Default',     initial: 'A', tone: 'coralDeep' },
    { id: 'developer', role: 'Developer', providerLabel: 'Default',     initial: 'D', tone: 'blue' },
    { id: 'reviewer',  role: 'Reviewer',  providerLabel: 'Default',     initial: 'R', tone: 'plum' },
    { id: 'tester',    role: 'Tester',    providerLabel: 'Default',     initial: 'T', tone: 'blue' },
  ],

  // Cockpit-only roster (no architect on the live timeline)
  cockpitTeam: ['lead','developer','tester','reviewer'],

  // ── Cockpit event stream — what each agent does, in order (seconds since
  // scene start). Mirrors the "WHAT'S HAPPENING" feed in the new design.
  cockpitTimeline: [
    { at:  0.5,  who: 'lead',      kind: 'tool', name: 'task_create',     target: 'FMP-001', text: 'Create household and recipe data model.' },
    { at:  2.0,  who: 'lead',      kind: 'tool', name: 'task_create',     target: 'FMP-002', text: 'Build preference questionnaire.' },
    { at:  3.5,  who: 'lead',      kind: 'tool', name: 'task_create',     target: 'FMP-003', text: 'Add substitution rules and validation tests.' },
    { at:  5.0,  who: 'lead',      kind: 'tool', name: 'task_create',     target: 'FMP-004', text: 'Compile grocery list from weekly plan.' },
    { at:  6.5,  who: 'lead',      kind: 'tool', name: 'task_create',     target: 'FMP-005', text: 'Review drift against Foundry docs.' },
    { at:  9.5,  who: 'lead',      kind: 'tool', name: 'message_send',    target: 'team',    text: 'Sent message → team' },
    { at: 13.0,  who: 'reviewer',  kind: 'tool', name: 'review_request',  target: 'FMP-002', text: 'Tool: review_request' },
    { at: 17.0,  who: 'tester',    kind: 'tool', name: 'validation_run',  target: 'FMP-003', text: 'Running validation: test' },
    { at: 22.0,  who: 'developer', kind: 'tool', name: 'task_update',     target: 'FMP-001', text: 'in_progress' },
    { at: 28.0,  who: 'reviewer',  kind: 'tool', name: 'task_update',     target: 'FMP-002', text: 'review → done' },
    { at: 35.0,  who: 'tester',    kind: 'tool', name: 'validation_run',  target: 'FMP-003', text: 'tests · 24 passing' },
  ],

  // ── Tasks board state (5 tasks per the new design) ────────────────────────
  tasks: [
    { id: 'FMP-001', title: 'Create household and recipe data model',    owner: 'developer', status: 'in_progress' },
    { id: 'FMP-002', title: 'Build preference questionnaire',            owner: 'developer', status: 'review' },
    { id: 'FMP-003', title: 'Add substitution rules and validation tests',owner: 'tester',   status: 'todo' },
    { id: 'FMP-004', title: 'Compile grocery list from weekly plan',     owner: 'developer', status: 'todo' },
    { id: 'FMP-005', title: 'Review drift against Foundry docs',         owner: 'reviewer',  status: 'todo' },
  ],

  // ── Code workspace ───────────────────────────────────────────────────────
  fileTree: [
    { kind: 'dir',  name: '.demo',                depth: 0, open: true  },
    { kind: 'file', name: 'foundry.db',           depth: 1, size: '284k' },
    { kind: 'dir',  name: '.demo-webview2',       depth: 0, open: true  },
    { kind: 'dir',  name: 'EBWebView',            depth: 1, open: false },
    { kind: 'dir',  name: '.toad',                depth: 0, open: true  },
    { kind: 'file', name: 'toad.db',              depth: 1, size: '324k' },
    { kind: 'dir',  name: 'docs',                 depth: 0, open: true  },
    { kind: 'dir',  name: 'foundry',              depth: 1, open: true, files: ['product-brief.md','technical-spec.md','prisma-schema.md','roadmap.md','acceptance-criteria.md'] },
    { kind: 'dir',  name: 'src',                  depth: 0, open: true  },
    { kind: 'dir',  name: 'domain',               depth: 1, open: false },
    { kind: 'dir',  name: 'ui',                   depth: 1, open: false },
    { kind: 'file', name: 'README.md',            depth: 0, size: '88b' },
  ],
};
