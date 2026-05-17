// Symphony app shell — window chrome + left rail + caption bar.
// Designed at 1920×1080. All scenes mount inside <AppFrame active="...">.

const COLOR = {
  bg:        'oklch(15.5% 0.008 55)',
  bg2:       'oklch(18.5% 0.009 55)',
  bg3:       'oklch(21% 0.010 55)',
  panel:     'oklch(20% 0.010 55)',
  panel2:    'oklch(23% 0.012 55)',
  hair:      'oklch(85% 0.025 75 / 0.10)',
  hair2:     'oklch(85% 0.025 75 / 0.18)',
  ink:       'oklch(92% 0.022 75)',
  inkSoft:   'oklch(78% 0.020 70)',
  inkMute:   'oklch(58% 0.018 60)',
  inkFaint:  'oklch(42% 0.014 55)',
  coral:     'oklch(73% 0.135 38)',
  coralDeep: 'oklch(60% 0.155 35)',
  coralSoft: 'oklch(73% 0.135 38 / 0.16)',
  green:     'oklch(75% 0.135 148)',
  greenSoft: 'oklch(75% 0.135 148 / 0.16)',
  blue:      'oklch(72% 0.085 230)',
  blueSoft:  'oklch(72% 0.085 230 / 0.16)',
  plum:      'oklch(70% 0.110 320)',
  plumSoft:  'oklch(70% 0.110 320 / 0.16)',
  amber:     'oklch(80% 0.130 80)',
};

const FONT = {
  sans:  '"Geist", ui-sans-serif, system-ui, sans-serif',
  serif: '"Instrument Serif", "Times New Roman", serif',
  mono:  '"JetBrains Mono", ui-monospace, Menlo, monospace',
};

// ── Top tab bar ──────────────────────────────────────────────────────────────
function TabBar({ projectName = 'symphony-demo', runtimes = '0 / 5 runtimes' }) {
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center',
      background: COLOR.bg,
      borderBottom: `1px solid ${COLOR.hair}`,
      padding: '0 14px', gap: 14, flexShrink: 0,
      fontFamily: FONT.sans, color: COLOR.ink,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: COLOR.bg3, color: COLOR.coral,
        fontFamily: FONT.serif, fontSize: 18, fontStyle: 'italic',
      }}>T</div>

      {/* tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: COLOR.bg2, padding: '6px 12px', borderRadius: 8,
          border: `1px solid ${COLOR.hair}`, fontSize: 13,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: 999, background: COLOR.coral,
            boxShadow: `0 0 0 3px ${COLOR.coralSoft}`,
          }}/>
          <span>{projectName}</span>
          <span style={{ color: COLOR.inkFaint, marginLeft: 2 }}>×</span>
        </div>
        <button style={iconBtn()}>+</button>
      </div>

      {/* search bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: 360, height: 28,
          background: COLOR.bg2, borderRadius: 8,
          border: `1px solid ${COLOR.hair}`,
          display: 'flex', alignItems: 'center',
          padding: '0 10px', gap: 8,
          fontSize: 12, color: COLOR.inkSoft,
        }}>
          <SearchGlyph/>
          <span>Symphony AI · {projectName}</span>
          <span style={{
            marginLeft: 'auto', color: COLOR.inkMute,
            fontFamily: FONT.mono, fontSize: 11,
            padding: '1px 6px', border: `1px solid ${COLOR.hair}`, borderRadius: 4,
          }}>⌘K</span>
        </div>
      </div>

      {/* runtime pill + actions */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '5px 12px', background: COLOR.bg2,
        border: `1px solid ${COLOR.hair}`, borderRadius: 999, fontSize: 12,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: 999, background: COLOR.green,
          boxShadow: `0 0 8px ${COLOR.green}`,
        }}/>
        <span style={{ fontFamily: FONT.mono, color: COLOR.ink }}>{runtimes}</span>
      </div>

      {/* right-side icons */}
      <div style={{ display: 'flex', gap: 6 }}>
        {['＋','✓','⏻','◐','i','⚙'].map((g,i) =>
          <button key={i} style={iconBtn(false, 28)}>{g}</button>
        )}
      </div>

      {/* window controls */}
      <div style={{ display: 'flex', gap: 4, marginLeft: 4 }}>
        <button style={iconBtn(false, 28)}>—</button>
        <button style={iconBtn(false, 28)}>▢</button>
        <button style={iconBtn(false, 28)}>×</button>
      </div>
    </div>
  );
}

function iconBtn(hover = false, size = 26) {
  return {
    width: size, height: size,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: hover ? COLOR.bg3 : 'transparent',
    border: 'none', borderRadius: 6,
    color: COLOR.inkSoft, fontSize: 13, cursor: 'pointer',
    fontFamily: FONT.sans,
  };
}

function SearchGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3"/>
    </svg>
  );
}

// ── Left rail ────────────────────────────────────────────────────────────────
const RAIL_ITEMS = [
  { id: 'cockpit',  label: 'Cockpit',  icon: 'C' },
  { id: 'foundry',  label: 'Foundry',  icon: 'F' },
  { id: 'code',     label: 'Code',     icon: '<>'},
  { id: 'tasks',    label: 'Tasks',    icon: '▢' },
  { id: 'runtimes', label: 'Runtimes', icon: '▤' },
  { id: 'approvals',label: 'Approvals',icon: '✓' },
  { id: 'drift',    label: 'Drift',    icon: '◉' },
  { id: 'costs',    label: 'Costs',    icon: '$' },
  { id: 'diag',     label: 'Diagnostics',icon: 'i' },
];

function RailIcon({ id }) {
  // Custom inline SVGs for the most-used items.
  const stroke = 'currentColor';
  const map = {
    cockpit: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17l8-12 8 12"/><path d="M4 17h16"/><path d="M9 17l3-4 3 4"/>
      </svg>
    ),
    foundry: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M5 7l2 2M19 7l-2 2M3 13h3M18 13h3M7 19a5 5 0 0 1 10 0"/>
      </svg>
    ),
    code: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>
      </svg>
    ),
    tasks: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="6" height="14" rx="1.5"/><rect x="11" y="5" width="6" height="9" rx="1.5"/><rect x="19" y="5" width="3" height="14" rx="1.5"/>
      </svg>
    ),
    runtimes: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7" cy="7" r="0.8" fill={stroke}/><circle cx="7" cy="17" r="0.8" fill={stroke}/>
      </svg>
    ),
    approvals: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l4 4 10-10"/>
      </svg>
    ),
    drift: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M2 12c4-5 8-5 10 0M22 12c-4 5-8 5-10 0"/>
      </svg>
    ),
    costs: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 20V8M12 20V4M18 20v-8"/>
      </svg>
    ),
    diag: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16v0.5"/>
      </svg>
    ),
  };
  return map[id] || <span style={{ fontSize: 14 }}>{id[0].toUpperCase()}</span>;
}

function SideRail({ active = 'cockpit' }) {
  return (
    <aside style={{
      width: 84, background: COLOR.bg,
      borderRight: `1px solid ${COLOR.hair}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'stretch', padding: '14px 0', gap: 4, flexShrink: 0,
    }}>
      {RAIL_ITEMS.map(it => {
        const on = it.id === active;
        return (
          <div key={it.id} style={{
            padding: '8px 0', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4,
            color: on ? COLOR.ink : COLOR.inkMute,
            position: 'relative',
            background: on ? COLOR.coralSoft : 'transparent',
            transition: 'background 200ms',
          }}>
            {on && <span style={{
              position: 'absolute', left: 0, top: 6, bottom: 6, width: 2,
              background: COLOR.coral, borderRadius: 2,
            }}/>}
            <RailIcon id={it.id}/>
            <span style={{
              fontSize: 10, fontFamily: FONT.sans, letterSpacing: '0.02em',
              fontWeight: on ? 600 : 500,
            }}>{it.label}</span>
          </div>
        );
      })}
      <div style={{ flex: 1 }}/>
      <div style={{
        padding: '10px 0', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 4, color: COLOR.inkMute,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 1-1 3.5l2 2-2 2-2-2A7 7 0 0 1 12 19v3h-2v-3a7 7 0 0 1-3.5-1l-2 2-2-2 2-2A7 7 0 0 1 5 12H2v-2h3A7 7 0 0 1 6 6.5l-2-2 2-2 2 2A7 7 0 0 1 10 4V1h2v3a7 7 0 0 1 3.5 1l2-2 2 2-2 2A7 7 0 0 1 19 10h3v2h-3z"/></svg>
        <span style={{ fontSize: 10 }}>Settings</span>
      </div>
    </aside>
  );
}

// ── App frame: chrome + rail + slot ──────────────────────────────────────────
function AppFrame({ active, projectName, runtimes, children, modal = null }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: COLOR.bg,
      fontFamily: FONT.sans, color: COLOR.ink,
      overflow: 'hidden',
    }}>
      <TabBar projectName={projectName} runtimes={runtimes}/>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <SideRail active={active}/>
        <main style={{ flex: 1, position: 'relative', minWidth: 0, background: COLOR.bg }}>
          {children}
        </main>
      </div>
      {modal}
    </div>
  );
}

// ── Caption bar (voiceover-style text at bottom) ─────────────────────────────
function CaptionBar({ text, sub = null }) {
  // Held by enclosing Sprite; relies on Sprite entry/exit fades via opacity.
  const { localTime, duration } = useSprite();
  const entry = 0.5, exit = 0.5;
  const exitStart = Math.max(0, duration - exit);
  let opacity = 1, ty = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t; ty = (1 - t) * 12;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t; ty = -t * 8;
  }

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 56,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 30,
      opacity, transform: `translateY(${ty}px)`,
    }}>
      <div style={{
        maxWidth: 1100,
        padding: '18px 28px',
        background: 'oklch(8% 0.005 55 / 0.78)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${COLOR.hair2}`,
        borderRadius: 14,
        color: COLOR.ink,
        textAlign: 'center',
        boxShadow: '0 16px 50px rgba(0,0,0,0.45)',
      }}>
        <div style={{
          fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.25,
          letterSpacing: '-0.01em', fontStyle: 'italic',
          color: COLOR.ink, textWrap: 'pretty',
        }}>{text}</div>
        {sub && (
          <div style={{
            marginTop: 8, fontFamily: FONT.mono, fontSize: 13,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: COLOR.inkMute,
          }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

// ── Cursor (a soft dot that travels to clicks) ───────────────────────────────
// Pass keyframes: [{at: seconds-since-stage-start, x, y, click?: bool}]
// Renders absolutely positioned inside main canvas (1920x1080 coords).
function Cursor({ keyframes = [] }) {
  const time = useTime();
  if (keyframes.length === 0) return null;

  // Find current segment
  let cur = keyframes[0];
  let nxt = keyframes[0];
  for (let i = 0; i < keyframes.length; i++) {
    if (time >= keyframes[i].at) {
      cur = keyframes[i];
      nxt = keyframes[i + 1] || keyframes[i];
    }
  }

  let x = cur.x, y = cur.y;
  if (nxt !== cur) {
    const span = nxt.at - cur.at;
    const local = clamp((time - cur.at) / span, 0, 1);
    const eased = Easing.easeInOutCubic(local);
    x = cur.x + (nxt.x - cur.x) * eased;
    y = cur.y + (nxt.y - cur.y) * eased;
  }

  // Click ripple if cur.click and we just arrived
  const sinceArrival = time - cur.at;
  const showRipple = cur.click && sinceArrival >= 0 && sinceArrival < 0.5;
  const ripT = showRipple ? sinceArrival / 0.5 : 0;

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      pointerEvents: 'none', zIndex: 50,
      transform: 'translate(-50%, -50%)',
    }}>
      {showRipple && (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 18 + ripT * 48, height: 18 + ripT * 48,
          borderRadius: '50%',
          border: `2px solid ${COLOR.coral}`,
          opacity: 1 - ripT,
          transform: 'translate(-50%, -50%)',
        }}/>
      )}
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        background: 'white',
        boxShadow: `0 0 0 4px ${COLOR.coralSoft}, 0 4px 14px rgba(0,0,0,0.5)`,
      }}/>
    </div>
  );
}

// ── Typewriter helper: progressively reveals text by char ────────────────────
// Pass total text + charsPerSecond. Returns the substring up to localTime.
function Typewriter({ text, cps = 40, blink = true, style = {} }) {
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
          marginLeft: 2, verticalAlign: '-0.15em',
          background: 'currentColor',
          opacity: done ? (Math.floor(localTime * 2) % 2 ? 0.2 : 1) : 1,
        }}/>
      )}
    </span>
  );
}

// ── Soft fade-in wrapper (for any block of UI) ───────────────────────────────
function FadeIn({ delay = 0, dur = 0.5, ty = 8, children, style = {} }) {
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

Object.assign(window, {
  COLOR, FONT,
  TabBar, SideRail, AppFrame,
  CaptionBar, Cursor, Typewriter, FadeIn,
  RAIL_ITEMS,
});
