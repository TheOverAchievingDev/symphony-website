// Create-team modal + Cockpit (the long center scene).

// ── CREATE-TEAM MODAL ────────────────────────────────────────────────────────
function SceneTeamModal() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // Beats:
  //  0.0  modal slides in
  //  2.0  team name typed
  //  6.0  add member - developer
  //  9.0  add member - tester
  // 12.0  add member - reviewer
  // 16.0  Run team after create — already on
  // 19.0  scroll/focus shifts to providers list
  // 22.0  cursor moves to Create & launch
  // 24.0  click; modal fades; cockpit appears briefly

  const modalIn = clamp(localTime / 0.7, 0, 1);
  const modalOut = clamp((localTime - 24.5) / 0.6, 0, 1);
  const opacity = Easing.easeOutCubic(modalIn) * (1 - Easing.easeInCubic(modalOut));
  const ty = (1 - Easing.easeOutCubic(modalIn)) * 30 - Easing.easeInCubic(modalOut) * 10;

  const cursorKf = [
    { at:  0.5, x:  960, y: 540 },
    { at: 18.0, x:  960, y: 540 },
    { at: 23.5, x: 1430, y: 1010, click: true },
  ];

  return (
    <AppFrame active="cockpit" projectName="symphony-demo" runtimes="0 / 5 runtimes">
      {/* Background: faint cockpit shapes so it doesn't look empty */}
      <CockpitBackdrop muted={true}/>
      {/* Dim overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(8,6,4,0.62)',
        backdropFilter: 'blur(2px)',
        opacity: Easing.easeOutCubic(modalIn) * (1 - Easing.easeInCubic(modalOut)),
      }}/>

      {/* Modal */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, calc(-50% + ${ty}px))`,
        opacity,
        width: 760,
        background: COLOR.panel,
        border: `1px solid ${COLOR.hair2}`,
        borderRadius: 16,
        boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '24px 28px 8px', display: 'flex', alignItems: 'start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT.serif, fontSize: 32, color: COLOR.ink, letterSpacing: '-0.01em' }}>Create team</div>
            <div style={{ marginTop: 4, fontSize: 14, color: COLOR.inkMute }}>
              Provision a multi-agent team via your local CLI runtimes.
            </div>
          </div>
          <button style={iconBtnFlat()}>×</button>
        </div>

        <div style={{ padding: '14px 28px 8px' }}>
          <div style={fieldLabel()}>Team name</div>
          <div style={{
            marginTop: 8, height: 44, padding: '0 14px',
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
            borderRadius: 10, display: 'flex', alignItems: 'center',
            fontSize: 15, color: COLOR.ink, fontFamily: FONT.sans,
          }}>
            <Sprite start={2.0} end={5.5} keepMounted>
              <Typewriter text="family-meal-planner" cps={26}
                style={{ color: COLOR.ink, fontFamily: FONT.sans }}/>
            </Sprite>
            {localTime < 2.0 && <span style={{ color: COLOR.inkMute }}>e.g. signal-ops</span>}
          </div>
        </div>

        <div style={{ padding: '18px 28px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div style={fieldLabel()}>Members</div>
              <div style={{ fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute }}>
                <MembersCount localTime={localTime}/>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ fontSize: 12, color: COLOR.inkMute, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${COLOR.hair2}`,
                  display: 'inline-block',
                }}/>
                Solo team
              </label>
              <button style={addMemberBtn()}>+ Add member</button>
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <MemberRow member={D.team[0]} delay={0} localTime={localTime}/>
            <MemberRow member={D.team[1]} delay={6.0} localTime={localTime}/>
            <MemberRow member={D.team[2]} delay={9.0} localTime={localTime}/>
            <MemberRow member={D.team[3]} delay={12.0} localTime={localTime}/>
          </div>
        </div>

        <div style={{ padding: '16px 28px' }}>
          <div style={{
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
            borderRadius: 10, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{
              width: 36, height: 22, background: COLOR.coral, borderRadius: 999,
              position: 'relative', flexShrink: 0,
            }}>
              <span style={{
                position: 'absolute', top: 2, right: 2, width: 18, height: 18,
                background: '#fff', borderRadius: '50%',
              }}/>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: COLOR.ink }}>Run team after create</div>
              <div style={{ fontSize: 12, color: COLOR.inkMute, marginTop: 2 }}>
                Boots the team immediately via local CLI runtimes.
              </div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '16px 28px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: `1px solid ${COLOR.hair}`, background: COLOR.bg2,
        }}>
          <div style={{ fontSize: 12, color: COLOR.inkMute, display: 'flex', alignItems: 'center', gap: 8 }}>
            <kbd style={kbdStyle()}>Esc</kbd> to cancel
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={ghostBtn()}>Cancel</button>
            <button style={{
              ...primaryBtn(),
              boxShadow: localTime > 22 ? `0 0 0 4px ${COLOR.coralSoft}` : 'none',
              transform: localTime > 23.5 && localTime < 24.1 ? 'scale(0.96)' : 'scale(1)',
            }}>▶ Create &amp; launch</button>
          </div>
        </div>
      </div>

      <Cursor keyframes={cursorKf}/>
    </AppFrame>
  );
}

function fieldLabel() {
  return { fontFamily: FONT.sans, fontSize: 14, fontWeight: 500, color: COLOR.ink };
}

function iconBtnFlat() {
  return {
    width: 32, height: 32, borderRadius: 8,
    background: 'transparent', border: 'none',
    color: COLOR.inkMute, fontSize: 18, cursor: 'pointer',
  };
}

function addMemberBtn() {
  return {
    padding: '7px 12px', borderRadius: 8,
    background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
    color: COLOR.ink, fontSize: 12, fontFamily: FONT.sans, fontWeight: 500,
  };
}

function ghostBtn() {
  return {
    padding: '10px 20px', borderRadius: 10,
    background: 'transparent', border: 'none',
    color: COLOR.ink, fontSize: 13, fontFamily: FONT.sans, fontWeight: 500, cursor: 'pointer',
  };
}

function primaryBtn() {
  return {
    padding: '12px 22px', borderRadius: 10,
    background: COLOR.coral, color: '#1c1109',
    border: 'none', fontWeight: 600, fontSize: 13,
    fontFamily: FONT.sans, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    transition: 'transform 80ms',
  };
}

function kbdStyle() {
  return {
    fontFamily: FONT.mono, fontSize: 11,
    padding: '2px 6px', background: COLOR.bg3,
    border: `1px solid ${COLOR.hair2}`, borderRadius: 4,
    color: COLOR.ink,
  };
}

function MembersCount({ localTime }) {
  let n = 1;
  if (localTime >= 6.0)  n = 2;
  if (localTime >= 9.0)  n = 3;
  if (localTime >= 12.0) n = 4;
  return <span>{n}</span>;
}

function MemberRow({ member, delay, localTime }) {
  if (localTime < delay) return null;
  const since = localTime - delay;
  const op = clamp(since / 0.45, 0, 1);
  const ty = (1 - op) * 14;

  const toneColor = {
    coral: COLOR.coral, green: COLOR.green,
    blue: COLOR.blue, plum: COLOR.plum,
  }[member.tone];
  const toneSoft = {
    coral: COLOR.coralSoft, green: COLOR.greenSoft,
    blue: COLOR.blueSoft, plum: COLOR.plumSoft,
  }[member.tone];

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
      borderRadius: 10, opacity: op, transform: `translateY(${ty}px)`,
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute', left: 0, top: 8, bottom: 8, width: 3,
        background: toneColor, borderRadius: 2,
      }}/>
      <span style={{
        width: 12, color: COLOR.inkMute, fontSize: 16, marginLeft: 2,
      }}>⋮⋮</span>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ minWidth: 92, fontSize: 14, color: COLOR.ink, fontWeight: 500 }}>{member.id}</div>
        <div style={{ fontSize: 13, color: COLOR.inkMute }}>
          {member.role} — {roleSummary(member.id)}
        </div>
      </div>
      <div style={{
        padding: '5px 12px', borderRadius: 8,
        background: toneSoft, color: toneColor,
        border: `1px solid ${toneSoft}`,
        fontSize: 12, fontFamily: FONT.mono, fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 8, height: 8, background: toneColor, borderRadius: 2 }}/>
        {member.providerLabel} · {member.model}
      </div>
    </div>
  );
}

function roleSummary(id) {
  return {
    lead:      'coordinates and delegates',
    developer: 'writes the implementation',
    tester:    'runs validations',
    reviewer:  'reads diffs against spec',
  }[id] || '';
}

// ── COCKPIT BACKDROP — quick faded version used behind modal ────────────────
function CockpitBackdrop({ muted = false }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: muted ? 0.5 : 1,
      filter: muted ? 'saturate(0.7)' : 'none',
      padding: '20px 28px',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ fontFamily: FONT.serif, fontSize: 32, color: COLOR.ink }}>family-meal-planner</div>
        <span style={pillStyle(COLOR.greenSoft, COLOR.green)}>● running</span>
      </div>
      <div style={{ display: 'flex', gap: 18, marginTop: 4 }}>
        <FlowStep done label="Provisioned"/>
        <FlowStep done label="Members joined"/>
        <FlowStep label="Ready · 7 open tasks"/>
        <FlowStep label="Review"/>
      </div>
    </div>
  );
}

function FlowStep({ done, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 999,
      background: done ? COLOR.greenSoft : COLOR.bg2,
      border: `1px solid ${done ? COLOR.greenSoft : COLOR.hair2}`,
      color: done ? COLOR.green : COLOR.inkSoft, fontSize: 13, fontFamily: FONT.mono,
    }}>
      <span style={{
        width: 14, height: 14, borderRadius: '50%',
        border: `1.5px solid ${done ? COLOR.green : COLOR.inkMute}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: done ? COLOR.green : 'transparent',
        color: done ? '#1c1109' : 'transparent', fontSize: 10,
      }}>{done ? '✓' : ''}</span>
      {label}
    </div>
  );
}

function pillStyle(bg, fg) {
  return {
    padding: '4px 10px', borderRadius: 999,
    background: bg, color: fg, fontSize: 12, fontFamily: FONT.mono, fontWeight: 500,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// COCKPIT (the long center scene, 120 seconds)
// Layout:
//   left  (30%) :  messages stream (timeline of agent messages + tool calls)
//   mid   (44%) :  team org chart (4 cards) + flow strip on top
//   right (26%) :  tasks panel (mirroring tasks.png shape)
//
// Timing:
//   First 6s  — overview, cards appear, "idle" → "thinking"
//   6 – 90s   — the 11-event cockpitTimeline plays, agents go active/idle,
//               tasks update, message stream scrolls.
//   90+       — settling: 2 closed tasks, "team aligned" feel.
// ────────────────────────────────────────────────────────────────────────────
function SceneCockpit() {
  const { localTime } = useSprite();
  const D = window.DEMO;
  // The timeline events use absolute "at" seconds; the first event lands at 0.5
  // but in this scene we want a 6s warm-up before agent traffic starts.
  const COCKPIT_WARMUP = 6;
  const evtTime = Math.max(0, localTime - COCKPIT_WARMUP);

  return (
    <AppFrame active="cockpit" projectName="symphony-demo" runtimes="4 / 5 runtimes">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Header: project + status flow */}
        <div style={{
          padding: '18px 28px 12px',
          borderBottom: `1px solid ${COLOR.hair}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontFamily: FONT.serif, fontSize: 32, color: COLOR.ink, letterSpacing: '-0.01em' }}>
              family-meal-planner
            </div>
            <span style={pillStyle(
              localTime < 4 ? COLOR.bg3 : COLOR.greenSoft,
              localTime < 4 ? COLOR.inkMute : COLOR.green
            )}>
              {localTime < 4 ? '○ booting' : '● running'}
            </span>
            <div style={{ flex: 1 }}/>
            <button style={ghostPillBtn()}>Pause team</button>
            <button style={dangerPillBtn()}>End team</button>
            <button style={{
              padding: '8px 14px', background: COLOR.coralSoft, color: COLOR.coral,
              border: `1px solid ${COLOR.coralSoft}`, borderRadius: 8, fontSize: 13, fontWeight: 600,
            }}>+ New team</button>
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
            <FlowStep done={localTime >= 1} label="Provisioned"/>
            <FlowStep done={localTime >= 3} label="Members joined"/>
            <FlowStep done={localTime >= 95} label="Ready · 7 open tasks"/>
            <FlowStep done={localTime >= 105} label="2 reviewed"/>
          </div>

          <div style={{
            marginTop: 12, fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute,
          }}>
            <CockpitUptime localTime={localTime}/>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

          {/* LEFT — message stream */}
          <CockpitMessages evtTime={evtTime}/>

          {/* MIDDLE — team grid */}
          <CockpitTeam evtTime={evtTime}/>

          {/* RIGHT — tasks panel */}
          <CockpitTasks evtTime={evtTime} localTime={localTime}/>
        </div>
      </div>
    </AppFrame>
  );
}

function ghostPillBtn() {
  return {
    padding: '8px 14px', borderRadius: 8,
    background: 'transparent', border: `1px solid ${COLOR.hair2}`,
    color: COLOR.inkSoft, fontSize: 13, fontFamily: FONT.sans,
  };
}
function dangerPillBtn() {
  return {
    padding: '8px 14px', borderRadius: 8,
    background: 'transparent', border: `1px solid oklch(60% 0.140 25 / 0.4)`,
    color: 'oklch(70% 0.140 25)', fontSize: 13, fontFamily: FONT.sans,
  };
}

function CockpitUptime({ localTime }) {
  const m = Math.floor(localTime / 60);
  const s = Math.floor(localTime % 60);
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  const tokens = Math.floor(localTime * 240);
  return <span>00:{mm}:{ss} uptime &nbsp;/&nbsp; {tokens.toLocaleString()} tokens used</span>;
}

// ── LEFT: messages ──────────────────────────────────────────────────────────
function CockpitMessages({ evtTime }) {
  const D = window.DEMO;
  const visible = D.cockpitTimeline.filter(e => evtTime >= e.at);
  // Keep latest ~7 events on screen
  const recent = visible.slice(-7);

  return (
    <div style={{
      width: 480, flexShrink: 0, borderRight: `1px solid ${COLOR.hair}`,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', borderBottom: `1px solid ${COLOR.hair}` }}>
        <div style={tabStyle(true)}>Messages <span style={{ marginLeft: 6, color: COLOR.inkMute }}>{visible.length}</span></div>
        <div style={tabStyle(false)}>Logs</div>
        <div style={tabStyle(false)}>Graph</div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recent.map((e, i) => (
          <MessageRow key={`${e.at}-${e.who}-${i}`} evt={e} evtTime={evtTime}/>
        ))}
      </div>

      <CockpitComposer/>
    </div>
  );
}

function tabStyle(active) {
  return {
    padding: '4px 0', fontSize: 13, fontFamily: FONT.sans, fontWeight: 500,
    color: active ? COLOR.ink : COLOR.inkMute,
    borderBottom: `2px solid ${active ? COLOR.coral : 'transparent'}`,
    display: 'inline-flex', alignItems: 'center',
  };
}

function MessageRow({ evt, evtTime }) {
  const D = window.DEMO;
  const member = D.team.find(m => m.id === evt.who);
  const tone = member?.tone || 'coral';
  const fg = ({ coral: COLOR.coral, green: COLOR.green, blue: COLOR.blue, plum: COLOR.plum })[tone];
  const bg = ({ coral: COLOR.coralSoft, green: COLOR.greenSoft, blue: COLOR.blueSoft, plum: COLOR.plumSoft })[tone];

  const since = evtTime - evt.at;
  const op = clamp(since / 0.4, 0, 1);

  const ts = formatClock(member?.id === 'lead' ? 17.5 + evt.at : 17.5 + evt.at);
  return (
    <div style={{
      display: 'flex', gap: 10, opacity: op,
      transform: `translateY(${(1 - op) * 8}px)`,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
        background: bg, color: fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT.mono, fontSize: 11, fontWeight: 700,
      }}>{member?.initial}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 12, color: fg, fontWeight: 600, fontFamily: FONT.sans }}>{evt.who}</span>
          <span style={{ fontFamily: FONT.mono, fontSize: 10, color: COLOR.inkFaint }}>{ts}</span>
        </div>
        {evt.kind === 'text' ? (
          <div style={{ fontSize: 13.5, color: COLOR.inkSoft, lineHeight: 1.45, marginTop: 3 }}>
            {evt.text}
          </div>
        ) : (
          <ToolCall name={evt.name} target={evt.target} text={evt.text}/>
        )}
      </div>
    </div>
  );
}

function ToolCall({ name, target, text }) {
  return (
    <div style={{
      marginTop: 4, padding: '6px 8px',
      background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 6,
      fontFamily: FONT.mono, fontSize: 11.5,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      color: COLOR.inkSoft,
    }}>
      <span style={{ color: COLOR.coral }}>⌁</span>
      <span style={{ color: COLOR.ink }}>{name}</span>
      <span style={{ color: COLOR.inkMute }}>→ {target}</span>
      {text && <span style={{ color: COLOR.inkMute, opacity: 0.7 }}>· {text}</span>}
    </div>
  );
}

function formatClock(t) {
  const totalSeconds = Math.floor(t);
  const h = 17;
  const m = (53 + Math.floor(totalSeconds / 6)) % 60;
  const s = totalSeconds % 60;
  return `${h}:${String(m).padStart(2,'0')}`;
}

function CockpitComposer() {
  return (
    <div style={{
      borderTop: `1px solid ${COLOR.hair}`, padding: '14px 16px',
      background: COLOR.bg2,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: COLOR.inkMute, marginBottom: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: COLOR.coral }}/>
        <b style={{ color: COLOR.ink }}>lead</b>
        <span>Lead</span>
        <span style={{ marginLeft: 'auto' }}>change → lead ▾</span>
      </div>
      <div style={{
        background: COLOR.bg, border: `1px solid ${COLOR.hair2}`, borderRadius: 10,
        padding: '12px 14px', fontSize: 13, color: COLOR.inkMute, minHeight: 52,
      }}>
        Message lead… Use @ for files, # for tasks
      </div>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <button style={pillBtn(false)}>Do</button>
        <button style={pillBtn(true)}>Ask</button>
        <button style={pillBtn(false)}>Delegate</button>
        <div style={{ flex: 1 }}/>
        <button style={{ ...primaryBtn(), padding: '8px 16px' }}>↗ Send</button>
      </div>
    </div>
  );
}

function pillBtn(active) {
  return {
    padding: '6px 12px', borderRadius: 8,
    background: active ? COLOR.bg3 : 'transparent',
    border: `1px solid ${active ? COLOR.hair2 : 'transparent'}`,
    color: active ? COLOR.ink : COLOR.inkMute, fontSize: 12, fontFamily: FONT.sans,
  };
}

// ── MIDDLE: team org chart ──────────────────────────────────────────────────
function CockpitTeam({ evtTime }) {
  const D = window.DEMO;

  // Activity state per agent: idle | thinking | tool | done-pulse
  function activityFor(id) {
    const my = D.cockpitTimeline.filter(e => e.who === id && evtTime >= e.at);
    if (my.length === 0) return { status: evtTime > 2 ? 'idle' : 'booting', last: null };
    const last = my[my.length - 1];
    const sinceLast = evtTime - last.at;
    // Each event activates for 1.5s then idles
    const status = sinceLast < 0.6 ? (last.kind === 'tool' ? 'tool' : 'thinking') : 'idle';
    return { status, last };
  }

  // Counts (simulated)
  function statsFor(id) {
    const my = D.cockpitTimeline.filter(e => e.who === id && evtTime >= e.at);
    const tasks = my.filter(e => e.kind === 'tool').length;
    return tasks;
  }

  const lead = D.team[0];
  const lA = activityFor(lead.id);

  return (
    <div style={{
      flex: 1, minWidth: 0, padding: '20px 24px',
      display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={labelStyle()}>TEAM</div>
        <div style={{ fontSize: 13, color: COLOR.inkMute }}>4 members configured</div>
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={tinyTab(true)}>◊ Org</span>
          <span style={tinyTab(false)}>◌ Graph</span>
          <span style={tinyTab(false)}>≡ List</span>
        </div>
      </div>

      {/* Lead at top */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
        <AgentCard member={lead} activity={lA} tasksDone={statsFor(lead.id)} wide/>
      </div>

      {/* Connector lines */}
      <div style={{ position: 'relative', height: 26, margin: '0 60px' }}>
        <svg width="100%" height="26" style={{ position: 'absolute', inset: 0 }}>
          <path d="M50%,0 L50%,12 M20,26 L20,12 L80%,12 L80%,26" stroke={COLOR.hair2} fill="none" strokeWidth="1.2"/>
        </svg>
      </div>

      {/* Three reports */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[D.team[1], D.team[2], D.team[3]].map(m => (
          <AgentCard
            key={m.id}
            member={m}
            activity={activityFor(m.id)}
            tasksDone={statsFor(m.id)}
          />
        ))}
      </div>
    </div>
  );
}

function tinyTab(active) {
  return {
    padding: '5px 10px', borderRadius: 8, fontSize: 12,
    background: active ? COLOR.bg3 : 'transparent',
    border: `1px solid ${active ? COLOR.hair2 : 'transparent'}`,
    color: active ? COLOR.ink : COLOR.inkMute, fontFamily: FONT.mono,
  };
}

function AgentCard({ member, activity, tasksDone, wide = false }) {
  const tone = member.tone;
  const fg = ({ coral: COLOR.coral, green: COLOR.green, blue: COLOR.blue, plum: COLOR.plum })[tone];
  const bg = ({ coral: COLOR.coralSoft, green: COLOR.greenSoft, blue: COLOR.blueSoft, plum: COLOR.plumSoft })[tone];

  const isWorking = activity.status === 'thinking' || activity.status === 'tool';
  const statusText = ({
    booting:  '○ booting…',
    idle:     '● idle',
    thinking: '◐ thinking',
    tool:     '◑ tool call',
  })[activity.status];

  return (
    <div style={{
      width: wide ? 560 : '100%',
      background: COLOR.panel,
      border: `1px solid ${isWorking ? fg : COLOR.hair2}`,
      borderRadius: 14, padding: '14px 16px',
      position: 'relative', overflow: 'hidden',
      transition: 'border-color 200ms, box-shadow 200ms',
      boxShadow: isWorking ? `0 0 0 4px ${bg}` : 'none',
    }}>
      <span style={{
        position: 'absolute', left: 0, top: 14, bottom: 14, width: 3,
        background: fg, borderRadius: 2,
      }}/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: bg, color: fg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT.mono, fontWeight: 700, fontSize: 16,
        }}>{member.initial}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: COLOR.ink }}>{member.id}</div>
            <span style={{
              padding: '2px 8px', borderRadius: 999,
              background: bg, color: fg, fontFamily: FONT.mono, fontSize: 10.5,
            }}>{member.providerLabel}</span>
          </div>
          <div style={{ fontSize: 12, color: COLOR.inkMute, marginTop: 2 }}>
            {member.role} · {member.model}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isWorking && <span style={{
            width: 8, height: 8, borderRadius: 999,
            background: fg, boxShadow: `0 0 8px ${fg}`,
            animation: 'demoPulse 1.2s ease-in-out infinite',
          }}/>}
          <span style={{ fontFamily: FONT.mono, fontSize: 11, color: isWorking ? fg : COLOR.inkMute }}>
            {statusText}
          </span>
        </div>
      </div>

      <div style={{
        marginTop: 12, padding: '8px 10px', borderRadius: 8,
        background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
        fontFamily: FONT.mono, fontSize: 11.5, color: COLOR.inkSoft,
        minHeight: 34, display: 'flex', alignItems: 'center',
      }}>
        {activity.last && (activity.last.kind === 'tool'
          ? <><span style={{ color: fg, marginRight: 6 }}>⌁</span>{activity.last.name} → {activity.last.target}</>
          : <><span style={{ color: COLOR.inkFaint, marginRight: 6 }}>›</span>{truncate(activity.last.text, wide ? 90 : 50)}</>
        )}
        {!activity.last && <span style={{ color: COLOR.inkFaint }}>○ awaiting first task</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
        <span style={{ fontSize: 11, color: COLOR.inkMute, fontFamily: FONT.mono }}>{member.providerLabel.toLowerCase()}</span>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, fontFamily: FONT.mono, color: COLOR.ink }}>
          <b>{tasksDone}</b> <span style={{ color: COLOR.inkMute }}>tool calls · {Math.floor(tasksDone * 1.3)} done</span>
        </span>
      </div>
    </div>
  );
}

function truncate(s, n) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

// ── RIGHT: tasks panel ──────────────────────────────────────────────────────
function CockpitTasks({ evtTime, localTime }) {
  const D = window.DEMO;

  // Task states animate over time
  function statusFor(t) {
    const evts = D.cockpitTimeline.filter(e => evtTime >= e.at);
    if (t.id === 'FMP-001') {
      if (evts.some(e => e.target === 'FMP-001' && e.text === 'in_progress')) {
        return evtTime > 18 ? 'review' : 'in_progress';
      }
    }
    if (t.id === 'FMP-002') {
      const reviewed = evts.some(e => e.target === 'FMP-002' && e.text === 'review → done');
      if (reviewed) return 'done';
      if (evts.some(e => e.target === 'FMP-002')) return 'review';
    }
    if (t.id === 'FMP-003') {
      if (evts.some(e => e.target === 'FMP-003')) return 'in_progress';
    }
    return 'todo';
  }

  return (
    <div style={{
      width: 440, flexShrink: 0, borderLeft: `1px solid ${COLOR.hair}`,
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 18px', borderBottom: `1px solid ${COLOR.hair}` }}>
        <div style={tabStyle(true)}>Tasks</div>
        <div style={tabStyle(false)}>Runtimes <span style={{ marginLeft: 4, color: COLOR.coral }}>4</span></div>
        <div style={tabStyle(false)}>Sessions</div>
        <div style={tabStyle(false)}>Files</div>
      </div>

      <div style={{ padding: '12px 18px 8px' }}>
        <div style={{
          height: 32, background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
          borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 10px',
          gap: 8, fontSize: 12, color: COLOR.inkMute,
        }}>
          <SearchGlyph/> Search tasks…
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 18px 18px' }}>
        <SectionLabel left="IN PROGRESS" right={
          <span style={{ color: COLOR.coral }}>
            {D.tasks.filter(t => statusFor(t) === 'in_progress' || statusFor(t) === 'review').length}
          </span>
        }/>
        {D.tasks.filter(t => ['in_progress','review'].includes(statusFor(t))).map(t => (
          <TaskCard key={t.id} task={t} status={statusFor(t)} highlight evtTime={evtTime}/>
        ))}

        <SectionLabel left="DONE" right={
          <span style={{ color: COLOR.green }}>
            {D.tasks.filter(t => statusFor(t) === 'done').length}
          </span>
        }/>
        {D.tasks.filter(t => statusFor(t) === 'done').map(t => (
          <TaskCard key={t.id} task={t} status="done" evtTime={evtTime}/>
        ))}

        <SectionLabel left="TODO" right={
          D.tasks.filter(t => statusFor(t) === 'todo').length
        }/>
        {D.tasks.filter(t => statusFor(t) === 'todo').slice(0, 4).map(t => (
          <TaskCard key={t.id} task={t} status="todo" evtTime={evtTime}/>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ left, right }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: '0.1em',
      textTransform: 'uppercase', color: COLOR.inkMute,
      padding: '14px 2px 8px',
    }}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function TaskCard({ task, status, highlight = false, evtTime }) {
  const D = window.DEMO;
  const member = D.team.find(m => m.id === task.owner);
  const tone = member?.tone || 'coral';
  const fg = ({ coral: COLOR.coral, green: COLOR.green, blue: COLOR.blue, plum: COLOR.plum })[tone];

  const statusPill = {
    todo:        { bg: COLOR.bg3, fg: COLOR.inkMute, label: 'todo' },
    in_progress: { bg: COLOR.coralSoft, fg: COLOR.coral, label: 'in progress' },
    review:      { bg: COLOR.blueSoft, fg: COLOR.blue,   label: 'review' },
    done:        { bg: COLOR.greenSoft, fg: COLOR.green, label: '✓ done' },
  }[status];

  return (
    <div style={{
      marginBottom: 8, padding: '11px 12px',
      background: highlight ? COLOR.panel : COLOR.bg2,
      border: `1px solid ${highlight ? COLOR.hair2 : COLOR.hair}`,
      borderLeft: `3px solid ${fg}`,
      borderRadius: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: '0.06em',
          color: COLOR.inkMute,
        }}>{task.id}</span>
        <div style={{ flex: 1 }}/>
        <span style={{
          padding: '2px 8px', borderRadius: 999, fontSize: 10.5, fontFamily: FONT.mono,
          background: statusPill.bg, color: statusPill.fg,
        }}>{statusPill.label}</span>
      </div>
      <div style={{ fontSize: 13, color: COLOR.ink, marginTop: 4, lineHeight: 1.35 }}>{task.title}</div>
      <div style={{ fontSize: 11, color: COLOR.inkMute, marginTop: 4, fontFamily: FONT.mono }}>
        owner: {task.owner}
      </div>
    </div>
  );
}

Object.assign(window, { SceneTeamModal, SceneCockpit });
