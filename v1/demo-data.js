// Family Meal Planner — distilled from toad-local/demo/scenarios/family-meal-planner.json
// Keeps narrative beats tight; trims long prose to look real on-screen without
// flooding the frame.

window.DEMO = {
  project: {
    name: 'Family Meal Planner',
    slug: 'family-meal-planner',
    workspace: 'C:\\SymphonyDemo\\family-meal-planner',
    idea: 'A practical meal planner for busy families with picky eaters, shared grocery lists, budget-aware recipes, and substitution suggestions.',
  },

  // ── Foundry chat transcript ───────────────────────────────────────────────
  foundryChat: [
    { who: 'you', text: 'I want a family meal planning app. Everyone has different dislikes, allergies, and schedules.' },
    { who: 'foundry', text: 'Good problem. Before the team builds anything, let\'s lock the shape: who uses it, what\'s a hard rule (allergies) vs a soft preference (dislikes), and what the weekly output looks like.' },
    { who: 'you', text: 'Parents build a weekly plan, mark dislikes per person, and get a grocery list grouped by store section.' },
    { who: 'foundry', text: 'Got it. I\'ll draft five founding docs the agents will work from — brief, spec, schema, roadmap, acceptance criteria.' },
  ],

  foundryDocs: [
    { title: 'Product brief',         file: 'docs/foundry/product-brief.md',   status: 'approved' },
    { title: 'Technical spec',        file: 'docs/foundry/technical-spec.md',  status: 'approved' },
    { title: 'Prisma data model',     file: 'docs/foundry/prisma-schema.md',   status: 'approved' },
    { title: 'Build roadmap',         file: 'docs/foundry/roadmap.md',         status: 'approved' },
    { title: 'Acceptance criteria',   file: 'docs/foundry/acceptance.md',      status: 'approved' },
  ],

  // ── Team ─────────────────────────────────────────────────────────────────
  team: [
    { id: 'lead',      role: 'Lead',      provider: 'anthropic', providerLabel: 'Claude',  model: 'Sonnet 4.6',    initial: 'L', tone: 'coral'   },
    { id: 'developer', role: 'Developer', provider: 'openai',    providerLabel: 'Codex',   model: 'GPT-5 Codex',   initial: 'D', tone: 'green'   },
    { id: 'tester',    role: 'QA',        provider: 'google',    providerLabel: 'Gemini',  model: 'Gemini 2.5 Pro',initial: 'T', tone: 'blue'    },
    { id: 'reviewer',  role: 'Reviewer',  provider: 'anthropic', providerLabel: 'Claude',  model: 'Opus 4.7',      initial: 'R', tone: 'plum'    },
  ],

  // ── Cockpit narrative — what each agent says, in order, with time offsets
  cockpitTimeline: [
    { at:  0.5, who: 'lead',      kind: 'text',    text: 'Foundry docs loaded. Splitting the work into data, questionnaire, testing, and grocery list.' },
    { at:  3.5, who: 'lead',      kind: 'tool',    name: 'message_send',   target: 'developer',  text: 'Start with the household + preference model. Allergies are hard blocks.' },
    { at:  7.0, who: 'developer', kind: 'text',    text: 'On it. Adding Household, Member, Recipe — keeping allergies separate from dislikes.' },
    { at: 11.0, who: 'developer', kind: 'tool',    name: 'task_update',    target: 'FMP-001',    text: 'in_progress' },
    { at: 15.0, who: 'developer', kind: 'text',    text: 'Schema landed. Pushing the first questionnaire surface for review.' },
    { at: 18.5, who: 'developer', kind: 'tool',    name: 'review_request', target: 'FMP-002',    text: 'PreferenceQuestionnaire.tsx + preferences.ts' },
    { at: 22.0, who: 'tester',    kind: 'text',    text: 'Watching the substitution rules. Allergies should refuse — dislikes should warn.' },
    { at: 26.0, who: 'tester',    kind: 'tool',    name: 'validation_run', target: 'FMP-003',    text: 'tests · 24 passing' },
    { at: 30.0, who: 'reviewer',  kind: 'text',    text: 'Reading the questionnaire diff against the product brief.' },
    { at: 34.5, who: 'reviewer',  kind: 'tool',    name: 'task_update',    target: 'FMP-002',    text: 'review → done' },
    { at: 38.0, who: 'lead',      kind: 'text',    text: 'Two slices closed. Moving developer onto the grocery list compiler.' },
  ],

  // ── Tasks board state ─────────────────────────────────────────────────────
  tasks: [
    { id: 'FMP-001', title: 'Household + recipe data model',         owner: 'developer', start: 'todo',     end: 'done'     },
    { id: 'FMP-002', title: 'Preference questionnaire',              owner: 'developer', start: 'todo',     end: 'review'   },
    { id: 'FMP-003', title: 'Substitution rules + validation tests', owner: 'tester',    start: 'todo',     end: 'progress' },
    { id: 'FMP-004', title: 'Grocery list compiler',                 owner: 'developer', start: 'todo',     end: 'todo'     },
    { id: 'FMP-005', title: 'Drift review against Foundry docs',     owner: 'reviewer',  start: 'todo',     end: 'todo'     },
    { id: 'FMP-006', title: 'Weekly plan board UI',                  owner: 'developer', start: 'todo',     end: 'todo'     },
    { id: 'FMP-007', title: 'Member onboarding flow',                owner: 'developer', start: 'todo',     end: 'todo'     },
  ],

  // ── Code workspace ───────────────────────────────────────────────────────
  fileTree: [
    { kind: 'dir',  name: 'docs',                  depth: 0, open: true  },
    { kind: 'dir',  name: 'foundry',               depth: 1, open: true  },
    { kind: 'file', name: 'product-brief.md',      depth: 2 },
    { kind: 'file', name: 'technical-spec.md',     depth: 2 },
    { kind: 'file', name: 'prisma-schema.md',      depth: 2 },
    { kind: 'file', name: 'roadmap.md',            depth: 2 },
    { kind: 'file', name: 'acceptance.md',         depth: 2 },
    { kind: 'dir',  name: 'src',                   depth: 0, open: true  },
    { kind: 'dir',  name: 'domain',                depth: 1, open: true  },
    { kind: 'dir',  name: 'meal-planner',          depth: 2, open: true  },
    { kind: 'file', name: 'preferences.ts',        depth: 3, active: true },
    { kind: 'file', name: 'household.ts',          depth: 3 },
    { kind: 'file', name: 'recipe.ts',             depth: 3 },
    { kind: 'dir',  name: 'ui',                    depth: 1, open: true  },
    { kind: 'file', name: 'PreferenceQuestionnaire.tsx', depth: 2 },
    { kind: 'file', name: 'WeeklyPlanBoard.tsx',   depth: 2 },
    { kind: 'file', name: 'package.json',          depth: 0 },
    { kind: 'file', name: 'README.md',             depth: 0 },
  ],

  codeFile: {
    path: 'src/domain/meal-planner/preferences.ts',
    lines: [
      { n:  1, t: 'import { Member, Recipe } from "./types";',                        c: 'kw' },
      { n:  2, t: '',                                                                 c: '' },
      { n:  3, t: '// Hard rules: allergies refuse. Soft rules: dislikes warn.',      c: 'cm' },
      { n:  4, t: 'export const preferenceRules = {',                                 c: 'kw' },
      { n:  5, t: '  allergiesAreHardBlocks: true,',                                  c: 'pr' },
      { n:  6, t: '  dislikesAreWarnings: true,',                                     c: 'pr' },
      { n:  7, t: '} as const;',                                                      c: 'kw' },
      { n:  8, t: '',                                                                 c: '' },
      { n:  9, t: 'export function violatesAllergy(',                                 c: 'fn' },
      { n: 10, t: '  members: Member[],',                                             c: 'pr' },
      { n: 11, t: '  recipe: Recipe,',                                                c: 'pr' },
      { n: 12, t: '): Member | null {',                                               c: 'kw' },
      { n: 13, t: '  for (const m of members) {',                                     c: 'kw' },
      { n: 14, t: '    for (const ing of recipe.ingredients) {',                      c: 'kw' },
      { n: 15, t: '      if (m.allergies.includes(ing.id)) return m;',                c: 'kw' },
      { n: 16, t: '    }',                                                            c: '' },
      { n: 17, t: '  }',                                                              c: '' },
      { n: 18, t: '  return null;',                                                   c: 'kw' },
      { n: 19, t: '}',                                                                c: '' },
    ],
  },

  // ── Drift state ──────────────────────────────────────────────────────────
  drift: {
    score: 8,
    label: 'Healthy',
    categories: [
      { name: 'Architecture', pct: 100 },
      { name: 'Checklist',    pct: 100 },
      { name: 'Slice Scope',  pct: 100 },
      { name: 'Test Truth',   pct: 100 },
      { name: 'Risk',         pct:  92 },
    ],
    finding: { severity: 'MEDIUM', source: 'AI', title: 'LLM judge flagged (judge_failed)', tag: 'Risk' },
  },
};
