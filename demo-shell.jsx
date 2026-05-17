// Symphony app shell v2 — macOS menu bar + top action bar + left rail + bottom status bar.
// Designed at 1920×1080. All scenes mount inside <AppFrame active="...">.

const COLOR = {
  bg:        'oklch(13.5% 0.005 55)',
  bg2:       'oklch(16.5% 0.006 55)',
  bg3:       'oklch(20% 0.008 55)',
  bg4:       'oklch(24% 0.010 55)',
  panel:     'oklch(18.5% 0.007 55)',
  panel2:    'oklch(22% 0.009 55)',

  hair:      'oklch(85% 0.025 75 / 0.07)',
  hair2:     'oklch(85% 0.025 75 / 0.14)',
  hair3:     'oklch(85% 0.025 75 / 0.22)',

  ink:       'oklch(94% 0.015 70)',
  inkSoft:   'oklch(80% 0.018 70)',
  inkMute:   'oklch(58% 0.018 60)',
  inkFaint:  'oklch(40% 0.014 55)',

  coral:     'oklch(73% 0.135 38)',
  coralDeep: 'oklch(60% 0.155 35)',
  coralSoft: 'oklch(73% 0.135 38 / 0.16)',
  coralFaint:'oklch(73% 0.135 38 / 0.08)',

  green:     'oklch(76% 0.140 148)',
  greenSoft: 'oklch(76% 0.140 148 / 0.16)',
  blue:      'oklch(72% 0.090 230)',
  blueSoft:  'oklch(72% 0.090 230 / 0.16)',
  plum:      'oklch(70% 0.115 320)',
  plumSoft:  'oklch(70% 0.115 320 / 0.16)',
  amber:     'oklch(82% 0.135 80)',
  amberSoft: 'oklch(82% 0.135 80 / 0.16)',
  red:       'oklch(68% 0.165 25)',
  redSoft:   'oklch(68% 0.165 25 / 0.16)',
};

const FONT = {
  sans:  '"Geist", ui-sans-serif, system-ui, sans-serif',
  serif: '"Instrument Serif", "Times New Roman", serif',
  mono:  '"JetBrains Mono", ui-monospace, Menlo, monospace',
};

// ── macOS-style menu bar ────────────────────────────────────────────────────
function MenuBar() {
  const items = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];
  return (
    <div style={{
      height: 30, flexShrink: 0,
      background: COLOR.bg,
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 18,
      fontSize: 12, fontFamily: FONT.sans, color: COLOR.inkSoft,
      borderBottom: `1px solid ${COLOR.hair}`,
    }}>
      {items.map(label => (
        <span key={label} style={{ color: COLOR.inkSoft }}>{label}</span>
      ))}
      <div style={{ flex: 1 }}/>
      <span style={{ fontFamily: FONT.serif, fontSize: 13, color: COLOR.ink, letterSpacing: '-0.01em', fontStyle: 'italic' }}>
        Symphony
      </span>
    </div>
  );
}

// ── Top action bar (logo, breadcrumb, search, persona, etc) ─────────────────
function TopBar({
  projectName = 'family-meal-planner',
  workspace = 'SymphonyDemo',
  persona = 'FOR me',
  searchHint = ['Search anything', 'run drift', 'open settings', 'switch project'],
  agentsRunning = 4,
}) {
  return (
    <div style={{
      height: 56, flexShrink: 0,
      background: COLOR.bg,
      display: 'flex', alignItems: 'center', padding: '0 18px', gap: 12,
      borderBottom: `1px solid ${COLOR.hair2}`,
      fontFamily: FONT.sans, color: COLOR.ink,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 10, height: 10, borderRadius: 999, background: COLOR.coral,
          boxShadow: `0 0 0 3px ${COLOR.coralSoft}`,
        }}/>
        <span style={{ fontSize: 16, fontWeight: 600, fontFamily: FONT.sans, letterSpacing: '-0.01em' }}>
          Symphony
        </span>
      </div>
      <span style={{ color: COLOR.inkFaint, fontSize: 14 }}>/</span>

      {/* Breadcrumb */}
      <div style={{
        height: 32, display: 'flex', alignItems: 'center', gap: 6,
        padding: '0 12px', background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
        borderRadius: 8, fontSize: 13, fontFamily: FONT.mono,
      }}>
        <span style={{ color: COLOR.inkMute }}>{workspace}/</span>
        <span style={{ color: COLOR.ink, fontWeight: 500 }}>{projectName}</span>
        <span style={{ color: COLOR.inkMute, marginLeft: 6 }}>▾</span>
      </div>
      <button style={iconBtn()} aria-label="new project">＋</button>

      {/* Search */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{
          width: '100%', maxWidth: 620, height: 36,
          background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 10,
          display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
          fontSize: 13, color: COLOR.inkSoft,
        }}>
          <SearchGlyph/>
          <span style={{ fontWeight: 500, color: COLOR.ink }}>{searchHint[0]}</span>
          {searchHint.slice(1).map((h, i) => (
            <React.Fragment key={i}>
              <span style={{ color: COLOR.inkFaint }}>·</span>
              <span style={{ color: COLOR.inkMute }}>{h}</span>
            </React.Fragment>
          ))}
          <span style={{
            marginLeft: 'auto', color: COLOR.inkMute,
            fontFamily: FONT.mono, fontSize: 11.5,
            padding: '2px 7px', background: COLOR.bg3,
            border: `1px solid ${COLOR.hair2}`, borderRadius: 5,
            letterSpacing: '0.04em',
          }}>⌘K</span>
        </div>
      </div>

      {/* Persona toggle */}
      <PersonaPill persona={persona}/>

      {/* Stop all agents */}
      <button style={{
        height: 32, padding: '0 12px',
        background: COLOR.redSoft,
        color: COLOR.red,
        border: `1px solid ${COLOR.redSoft}`,
        borderRadius: 8, fontSize: 13, fontWeight: 500, fontFamily: FONT.sans,
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 6, height: 10, background: 'currentColor',
          marginRight: -3, borderRadius: 1,
        }}/>
        <span style={{
          width: 6, height: 10, background: 'currentColor',
          marginRight: 2, borderRadius: 1,
        }}/>
        Stop all agents
        <span style={{
          padding: '1px 7px', background: COLOR.red, color: '#1c0a08',
          borderRadius: 999, fontFamily: FONT.mono, fontSize: 11, fontWeight: 700,
        }}>{agentsRunning}</span>
      </button>

      {/* Icons */}
      <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
        <button style={iconBtn()} aria-label="theme">☀</button>
        <button style={{ ...iconBtn(), position: 'relative' }} aria-label="notifications">
          <BellGlyph/>
        </button>
        <button style={{ ...iconBtn(), position: 'relative' }} aria-label="users">
          <UsersGlyph/>
          <span style={{
            position: 'absolute', top: 2, right: 2,
            width: 14, height: 14, background: COLOR.coral, color: '#1c1109',
            borderRadius: 999, fontSize: 9, fontWeight: 700, fontFamily: FONT.mono,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>4</span>
        </button>
        <button style={iconBtn()} aria-label="settings">
          <GearGlyph/>
        </button>
      </div>
    </div>
  );
}

function PersonaPill({ persona = 'FOR me' }) {
  const isWith = persona === 'WITH me';
  return (
    <div style={{
      display: 'flex', height: 32, padding: 3, gap: 2,
      background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 8,
      fontSize: 12, fontFamily: FONT.mono, letterSpacing: '0.04em', fontWeight: 600,
    }}>
      <span style={{
        padding: '4px 10px', borderRadius: 6,
        background: !isWith ? COLOR.bg4 : 'transparent',
        color: !isWith ? COLOR.ink : COLOR.inkMute,
      }}>FOR me</span>
      <span style={{
        padding: '4px 10px', borderRadius: 6,
        background: isWith ? COLOR.bg4 : 'transparent',
        color: isWith ? COLOR.ink : COLOR.inkMute,
      }}>WITH me</span>
    </div>
  );
}

function iconBtn() {
  return {
    width: 32, height: 32,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent', border: 'none',
    borderRadius: 7, color: COLOR.inkSoft, fontSize: 14, cursor: 'pointer',
    fontFamily: FONT.sans,
  };
}

function SearchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3"/>
    </svg>
  );
}
function BellGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 8a6 6 0 1 1 12 0v5l1.5 2H4.5L6 13V8z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>;
}
function UsersGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M14.5 14.5c1.7-.4 3.8.2 4.8 1.8"/></svg>;
}
function GearGlyph() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
}

// ── Left rail ────────────────────────────────────────────────────────────────
const RAIL_GROUPS = [
  { label: 'BUILD', items: [
    { id: 'cockpit', label: 'Cockpit', kbd: '⌘1' },
    { id: 'foundry', label: 'Foundry', kbd: '⌘2' },
    { id: 'code',    label: 'Code',    kbd: '⌘3' },
    { id: 'tasks',   label: 'Tasks',   kbd: '⌘4' },
  ]},
  { label: 'WATCH', items: [
    { id: 'drift', label: 'Drift', kbd: '⌘5' },
    { id: 'costs', label: 'Costs', kbd: '⌘6' },
  ]},
  { label: 'INSPECT', items: [
    { id: 'audit', label: 'Audit', kbd: '⌘7' },
  ]},
];

function RailGlyph({ id }) {
  const stroke = 'currentColor';
  const map = {
    cockpit: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round"><path d="M4 17l8-12 8 12z"/><path d="M4 17l8 5 8-5"/></svg>,
    foundry: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M12 4v3M5 7l2 2M19 7l-2 2M3 13h3M18 13h3M7 19a5 5 0 0 1 10 0"/></svg>,
    code:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>,
    tasks:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 5v14"/></svg>,
    drift:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7"><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="10"/></svg>,
    costs:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round"><path d="M6 20V10M12 20V4M18 20v-7"/></svg>,
    audit:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16v.5"/></svg>,
  };
  return map[id] || <span/>;
}

function SideRail({ active = 'cockpit', taskBadge = 5, driftBadge = '0%' }) {
  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: COLOR.bg, borderRight: `1px solid ${COLOR.hair}`,
      display: 'flex', flexDirection: 'column',
      padding: '20px 0 14px',
      fontFamily: FONT.sans,
    }}>
      {RAIL_GROUPS.map(group => (
        <div key={group.label} style={{ padding: '0 14px', marginBottom: 18 }}>
          <div style={{
            fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: '0.14em',
            color: COLOR.inkFaint, padding: '0 8px 8px',
          }}>{group.label}</div>
          {group.items.map(it => {
            const on = it.id === active;
            const badge = it.id === 'tasks' ? taskBadge
                       :  it.id === 'drift' ? driftBadge
                       :  null;
            return (
              <div key={it.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 8, marginBottom: 1,
                background: on ? COLOR.coralSoft : 'transparent',
                color: on ? COLOR.ink : COLOR.inkSoft,
                fontSize: 14, fontWeight: on ? 600 : 500,
                position: 'relative',
              }}>
                {on && <span style={{
                  position: 'absolute', left: -14, top: 8, bottom: 8, width: 2,
                  background: COLOR.coral, borderRadius: 2,
                }}/>}
                <RailGlyph id={it.id}/>
                <span style={{ flex: 1 }}>{it.label}</span>
                {badge != null && (
                  <span style={{
                    fontFamily: FONT.mono, fontSize: 10.5,
                    padding: '1px 7px', borderRadius: 5,
                    background: it.id === 'drift' ? COLOR.greenSoft
                              : on ? COLOR.coral : COLOR.bg3,
                    color: it.id === 'drift' ? COLOR.green
                         : on ? '#1c1109' : COLOR.inkMute,
                    fontWeight: 600,
                  }}>{badge}</span>
                )}
                {badge == null && (
                  <span style={{
                    fontFamily: FONT.mono, fontSize: 10.5,
                    color: COLOR.inkFaint, letterSpacing: '0.04em',
                  }}>{it.kbd}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ flex: 1 }}/>
      <div style={{ padding: '0 22px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 10px', borderRadius: 8,
          color: COLOR.inkSoft, fontSize: 14, fontWeight: 500,
        }}>
          <GearGlyph/>
          <span style={{ flex: 1 }}>Settings</span>
          <span style={{ fontFamily: FONT.mono, fontSize: 10.5, color: COLOR.inkFaint }}>⌘,</span>
        </div>
      </div>
    </aside>
  );
}

// ── Status bar ──────────────────────────────────────────────────────────────
function StatusBar({ driftPct = '0%', runtimes = '4/4', branch = 'main', file = '--' }) {
  return (
    <div style={{
      height: 32, flexShrink: 0,
      background: COLOR.bg,
      borderTop: `1px solid ${COLOR.hair2}`,
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 22,
      fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute,
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: COLOR.green }}/>
        drift <span style={{ color: COLOR.coral, fontWeight: 600 }}>{driftPct}</span>
        <span style={{ color: COLOR.green, marginLeft: 4 }}>healthy</span>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: COLOR.green }}/>
        <span style={{ color: COLOR.inkSoft, fontWeight: 600 }}>{runtimes}</span> runtimes
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <BranchGlyph/> <span>{file}</span>
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <BranchGlyph/> <span style={{ color: COLOR.inkSoft }}>{branch}</span>
        <span style={{ color: COLOR.green }}>✓</span>
      </span>
      <div style={{ flex: 1 }}/>
    </div>
  );
}

function BranchGlyph() {
  return <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="4" cy="3.5" r="1.5"/><circle cx="4" cy="12.5" r="1.5"/><circle cx="12" cy="6" r="1.5"/><path d="M4 5v6M5.5 6h3a3 3 0 0 1 3 3v0"/></svg>;
}

// ── App frame ────────────────────────────────────────────────────────────────
function AppFrame({
  active, projectName, persona = 'FOR me', driftPct = '0%',
  runtimes = '4/4', branch = 'main', file = '--',
  searchHint, agentsRunning = 4, taskBadge = 5,
  children, modal = null,
}) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: COLOR.bg,
      fontFamily: FONT.sans, color: COLOR.ink,
      overflow: 'hidden',
    }}>
      <MenuBar/>
      <TopBar
        projectName={projectName} persona={persona}
        searchHint={searchHint} agentsRunning={agentsRunning}
      />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <SideRail active={active} taskBadge={taskBadge} driftBadge={driftPct}/>
        <main style={{ flex: 1, position: 'relative', minWidth: 0, background: COLOR.bg }}>
          {children}
        </main>
      </div>
      <StatusBar driftPct={driftPct} runtimes={runtimes} branch={branch} file={file}/>
      {modal}
    </div>
  );
}

// ── Caption bar ──────────────────────────────────────────────────────────────
function CaptionBar({ text, sub = null }) {
  const { localTime, duration } = useSprite();
  const entry = 0.35, exit = 0.35;
  const exitStart = Math.max(0, duration - exit);
  let opacity = 1, ty = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t; ty = (1 - t) * 10;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t; ty = -t * 6;
  }

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 76,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 30,
      opacity, transform: `translateY(${ty}px)`,
    }}>
      <div style={{
        maxWidth: 1100,
        padding: '16px 30px',
        background: 'oklch(8% 0.005 55 / 0.82)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${COLOR.hair3}`,
        borderRadius: 14,
        color: COLOR.ink,
        textAlign: 'center',
        boxShadow: '0 16px 50px rgba(0,0,0,0.45)',
      }}>
        <div style={{
          fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.2,
          letterSpacing: '-0.01em', fontStyle: 'italic',
          color: COLOR.ink, textWrap: 'pretty',
        }}>{text}</div>
        {sub && (
          <div style={{
            marginTop: 6, fontFamily: FONT.mono, fontSize: 12,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: COLOR.inkMute, fontWeight: 500,
          }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

// ── Cursor ──────────────────────────────────────────────────────────────────
function Cursor({ keyframes = [] }) {
  const time = useTime();
  if (keyframes.length === 0) return null;
  let cur = keyframes[0]; let nxt = keyframes[0];
  for (let i = 0; i < keyframes.length; i++) {
    if (time >= keyframes[i].at) { cur = keyframes[i]; nxt = keyframes[i + 1] || keyframes[i]; }
  }
  let x = cur.x, y = cur.y;
  if (nxt !== cur) {
    const span = nxt.at - cur.at;
    const local = clamp((time - cur.at) / span, 0, 1);
    const eased = Easing.easeInOutCubic(local);
    x = cur.x + (nxt.x - cur.x) * eased;
    y = cur.y + (nxt.y - cur.y) * eased;
  }
  const sinceArrival = time - cur.at;
  const showRipple = cur.click && sinceArrival >= 0 && sinceArrival < 0.45;
  const ripT = showRipple ? sinceArrival / 0.45 : 0;
  return (
    <div style={{
      position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 50,
      transform: 'translate(-50%, -50%)',
    }}>
      {showRipple && (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 16 + ripT * 44, height: 16 + ripT * 44, borderRadius: '50%',
          border: `2px solid ${COLOR.coral}`, opacity: 1 - ripT,
          transform: 'translate(-50%, -50%)',
        }}/>
      )}
      <div style={{
        width: 14, height: 14, borderRadius: '50%', background: 'white',
        boxShadow: `0 0 0 4px ${COLOR.coralSoft}, 0 4px 12px rgba(0,0,0,0.5)`,
      }}/>
    </div>
  );
}

// ── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter({ text, cps = 50, blink = true, style = {} }) {
  const { localTime } = useSprite();
  const n = Math.min(text.length, Math.floor(localTime * cps));
  const shown = text.slice(0, n);
  const done = n >= text.length;
  return (
    <span style={style}>
      {shown}
      {blink && (
        <span style={{
          display: 'inline-block', width: 2, height: '1em',
          marginLeft: 2, verticalAlign: '-0.15em', background: 'currentColor',
          opacity: done ? (Math.floor(localTime * 2) % 2 ? 0.2 : 1) : 1,
        }}/>
      )}
    </span>
  );
}

// ── Soft fade-in ─────────────────────────────────────────────────────────────
function FadeIn({ delay = 0, dur = 0.4, ty = 6, children, style = {} }) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / dur, 0, 1);
  const eased = Easing.easeOutCubic(t);
  return (
    <div style={{
      opacity: eased,
      transform: `translateY(${(1 - eased) * ty}px)`,
      ...style,
    }}>{children}</div>
  );
}

// ── Common helpers ──────────────────────────────────────────────────────────
function pillStyle(bg, fg) {
  return {
    padding: '4px 11px', borderRadius: 999,
    background: bg, color: fg, fontSize: 12,
    fontFamily: FONT.mono, fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 6,
  };
}

function labelStyle() {
  return {
    fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.12em',
    textTransform: 'uppercase', color: COLOR.inkFaint, fontWeight: 500,
  };
}

function primaryBtn() {
  return {
    height: 38, padding: '0 18px', borderRadius: 9,
    background: COLOR.coral, color: '#1c1109',
    border: 'none', fontWeight: 600, fontSize: 13,
    fontFamily: FONT.sans, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 7,
    transition: 'transform 80ms',
  };
}

function ghostBtn() {
  return {
    height: 38, padding: '0 16px', borderRadius: 9,
    background: COLOR.bg2, color: COLOR.ink,
    border: `1px solid ${COLOR.hair2}`,
    fontSize: 13, fontFamily: FONT.sans, fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 8,
  };
}

Object.assign(window, {
  COLOR, FONT,
  MenuBar, TopBar, SideRail, StatusBar, AppFrame, PersonaPill,
  CaptionBar, Cursor, Typewriter, FadeIn,
  pillStyle, labelStyle, primaryBtn, ghostBtn,
  SearchGlyph, BranchGlyph, RailGlyph,
});
