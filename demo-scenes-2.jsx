// Create-team modal + Cockpit (v2 — matches new Symphony UI)

// ── CREATE-TEAM MODAL ────────────────────────────────────────────────────────
function SceneTeamModal() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // Beats (scene total 28s in demo-video.html):
  //  0.0   modal slides in
  //  1.5   team name typed
  //  4.5   members appear progressively (architect/dev/reviewer/tester)
  //  6.0
  //  7.5
  //  9.0
  // 12.0   project field highlights
  // 14.0   "Run team after create" toggle pulses
  // 17.0   cursor moves to Create & launch
  // 19.0   click; modal fades

  const modalIn = clamp(localTime / 0.55, 0, 1);
  const modalOut = clamp((localTime - 19.5) / 0.6, 0, 1);
  const opacity = Easing.easeOutCubic(modalIn) * (1 - Easing.easeInCubic(modalOut));
  const ty = (1 - Easing.easeOutCubic(modalIn)) * 24 - Easing.easeInCubic(modalOut) * 10;

  const cursorKf = [
    { at:  0.5, x:  960, y: 540 },
    { at: 17.0, x:  960, y: 540 },
    { at: 19.0, x: 1340, y: 970, click: true },
  ];

  return (
    <AppFrame
      active="foundry" projectName="family-meal-planner"
      runtimes="0/4" driftPct="0%" agentsRunning={0} taskBadge={5}
    >
      {/* Faded Foundry behind */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35, filter: 'saturate(0.7) blur(0.5px)',
      }}>
        <FoundryProjectsCol localTime={50}/>
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(8,6,4,0.62)',
        opacity: Easing.easeOutCubic(modalIn) * (1 - Easing.easeInCubic(modalOut)),
      }}/>

      {/* Modal */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, calc(-50% + ${ty}px))`,
        opacity, width: 880,
        background: COLOR.bg2, border: `1px solid ${COLOR.hair3}`,
        borderRadius: 16, boxShadow: '0 40px 100px rgba(0,0,0,0.65)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '26px 32px 6px', display: 'flex', alignItems: 'start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT.serif, fontSize: 34, color: COLOR.ink, letterSpacing: '-0.01em' }}>
              Create team
            </div>
            <div style={{ marginTop: 4, fontSize: 14, color: COLOR.inkMute }}>
              Provision a multi-agent team via your local CLI runtimes.
            </div>
          </div>
          <button style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'transparent', border: 'none', color: COLOR.inkMute, fontSize: 18,
          }}>×</button>
        </div>

        <div style={{ padding: '16px 32px' }}>
          <div style={{
            fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.1em',
            color: COLOR.inkFaint, textTransform: 'uppercase',
          }}>Provider plans</div>
          <div style={{ fontSize: 13, color: COLOR.inkMute, marginTop: 6 }}>
            Loading provider plan info…
          </div>
        </div>

        {/* Team name */}
        <div style={{ padding: '12px 32px' }}>
          <div style={{ fontSize: 14, color: COLOR.ink, fontWeight: 500 }}>Team name</div>
          <div style={{
            marginTop: 8, height: 44, padding: '0 16px',
            background: COLOR.bg, border: `1px solid ${COLOR.hair2}`,
            borderRadius: 10, display: 'flex', alignItems: 'center',
            fontSize: 15, fontFamily: FONT.mono, color: COLOR.ink,
          }}>
            <Sprite start={1.5} end={5} keepMounted>
              <Typewriter text="family-meal-planner" cps={26}
                style={{ color: COLOR.ink, fontFamily: FONT.mono }}/>
            </Sprite>
            {localTime < 1.5 && <span style={{ color: COLOR.inkMute }}>e.g. signal-ops</span>}
          </div>
        </div>

        {/* Members */}
        <div style={{ padding: '14px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 14, color: COLOR.ink, fontWeight: 500 }}>Members</span>
              <span style={{ fontFamily: FONT.mono, fontSize: 13, color: COLOR.inkMute }}>
                <MembersCount localTime={localTime}/>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: COLOR.inkSoft }}>
                <span style={{
                  width: 16, height: 16, border: `1.5px solid ${COLOR.hair3}`, borderRadius: 4,
                }}/>
                Solo team
              </label>
              <button style={{
                height: 30, padding: '0 12px', borderRadius: 8,
                background: COLOR.bg, border: `1px solid ${COLOR.hair2}`,
                color: COLOR.ink, fontSize: 12, fontFamily: FONT.sans, fontWeight: 500,
              }}>+ Add member</button>
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <MemberRow member={D.team[0]} delay={0}    localTime={localTime} lead/>
            <MemberRow member={D.team[1]} delay={4.5}  localTime={localTime}/>
            <MemberRow member={D.team[2]} delay={6.0}  localTime={localTime}/>
            <MemberRow member={D.team[3]} delay={7.5}  localTime={localTime}/>
            <MemberRow member={D.team[4]} delay={9.0}  localTime={localTime}/>
          </div>
        </div>

        {/* Run team toggle */}
        <div style={{ padding: '12px 32px' }}>
          <div style={{
            background: COLOR.bg, border: `1px solid ${COLOR.hair2}`,
            borderRadius: 10, padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: (localTime > 13 && localTime < 16) ? `0 0 0 3px ${COLOR.coralSoft}` : 'none',
            transition: 'box-shadow 250ms',
          }}>
            <span style={{
              width: 38, height: 22, background: COLOR.coral, borderRadius: 999,
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

        {/* Project */}
        <div style={{ padding: '4px 32px 18px' }}>
          <div style={{ fontSize: 14, color: COLOR.ink, fontWeight: 500, marginBottom: 8 }}>Project</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', height: 32, padding: 2, gap: 2, background: COLOR.bg, border: `1px solid ${COLOR.hair2}`, borderRadius: 8 }}>
              <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontFamily: FONT.mono, color: COLOR.inkMute }}>From list</span>
              <span style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, fontFamily: FONT.mono, color: COLOR.ink, background: COLOR.bg3 }}>Custom path</span>
            </div>
            <span style={{ color: COLOR.inkMute }}><FolderGlyph/></span>
            <div style={{
              flex: 1, height: 32, padding: '0 12px',
              background: COLOR.bg, border: `1px solid ${COLOR.hair2}`,
              borderRadius: 8, display: 'flex', alignItems: 'center',
              fontSize: 12, fontFamily: FONT.mono, color: COLOR.ink,
              boxShadow: (localTime > 11.5 && localTime < 13.5) ? `0 0 0 3px ${COLOR.coralSoft}` : 'none',
              transition: 'box-shadow 250ms',
            }}>C:\SymphonyDemo\family-meal-planner</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: COLOR.bg, borderTop: `1px solid ${COLOR.hair}`,
        }}>
          <div style={{ fontSize: 12, color: COLOR.inkMute, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: FONT.mono, fontSize: 11, padding: '2px 6px',
              background: COLOR.bg3, border: `1px solid ${COLOR.hair2}`, borderRadius: 4, color: COLOR.ink,
            }}>Esc</span>
            to cancel
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              height: 38, padding: '0 18px', background: 'transparent',
              color: COLOR.ink, border: 'none', fontSize: 13, fontWeight: 500,
            }}>Cancel</button>
            <button style={{
              ...primaryBtn(),
              boxShadow: localTime > 17 ? `0 0 0 4px ${COLOR.coralSoft}` : 'none',
              transform: localTime > 18.8 && localTime < 19.4 ? 'scale(0.96)' : 'scale(1)',
            }}>▷ Create &amp; launch</button>
          </div>
        </div>
      </div>

      <Cursor keyframes={cursorKf}/>
    </AppFrame>
  );
}

function MembersCount({ localTime }) {
  let n = 1;
  if (localTime >= 4.5) n = 2;
  if (localTime >= 6.0) n = 3;
  if (localTime >= 7.5) n = 4;
  if (localTime >= 9.0) n = 5;
  return <span>{n}</span>;
}

function MemberRow({ member, delay, localTime, lead = false }) {
  if (localTime < delay) return null;
  const since = localTime - delay;
  const op = clamp(since / 0.4, 0, 1);
  const toneColor = ({ coral: COLOR.coral, coralDeep: COLOR.coralDeep, blue: COLOR.blue, plum: COLOR.plum })[member.tone] || COLOR.coral;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 14px',
      background: COLOR.bg, border: `1px solid ${COLOR.hair2}`,
      borderRadius: 10, opacity: op, transform: `translateY(${(1 - op) * 12}px)`,
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute', left: 0, top: 8, bottom: 8, width: 3,
        background: toneColor, borderRadius: 2,
      }}/>
      <span style={{ width: 12, color: COLOR.inkMute, fontSize: 14, marginLeft: 4 }}>⋮⋮</span>
      {lead ? (
        <>
          <div style={{ width: 92, fontSize: 14, color: COLOR.ink, fontWeight: 500 }}>{member.id}</div>
          <div style={{ flex: 1, fontSize: 13, color: COLOR.inkMute }}>
            Team Lead — coordinates and delegates
          </div>
          <span style={{
            padding: '5px 12px', borderRadius: 8,
            background: COLOR.coralSoft, color: COLOR.coral, border: `1px solid ${COLOR.coralSoft}`,
            fontFamily: FONT.mono, fontSize: 12, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 8, height: 8, background: COLOR.coral, borderRadius: 2 }}/>
            Opus 4.6
          </span>
        </>
      ) : (
        <>
          <div style={{
            width: 200, height: 32, padding: '0 12px',
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
            borderRadius: 7, fontSize: 13, fontFamily: FONT.mono, color: COLOR.ink,
            display: 'flex', alignItems: 'center',
          }}>{member.id}</div>
          <div style={{
            flex: 1, height: 32, padding: '0 12px',
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
            borderRadius: 7, fontSize: 13, color: COLOR.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span>{member.role}</span>
            <span style={{ color: COLOR.inkMute, fontSize: 12 }}>▾</span>
          </div>
          <span style={{
            padding: '5px 10px', borderRadius: 7,
            background: COLOR.bg2, color: COLOR.ink, border: `1px solid ${COLOR.hair2}`,
            fontFamily: FONT.mono, fontSize: 12, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 7, height: 7, background: COLOR.coral, borderRadius: 2 }}/>
            Default ▾
          </span>
          <span style={{ color: COLOR.inkFaint, fontSize: 14, padding: '0 4px' }}>🗑</span>
        </>
      )}
    </div>
  );
}

// ── COCKPIT SCENE ────────────────────────────────────────────────────────────
function SceneCockpit() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // Total scene 85s. Event timeline runs 0–35s, settling continues.
  // No warmup — agents start engaging immediately for snappier pacing.

  return (
    <AppFrame
      active="cockpit" projectName="family-meal-planner"
      runtimes="4/4" driftPct="0%" agentsRunning={4} taskBadge={5}
      searchHint={['Search anything', 'run drift', 'open settings', 'switch project']}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', minHeight: 0 }}>
        <CockpitTeamCol localTime={localTime}/>
        <CockpitMainCol localTime={localTime}/>
        <CockpitInspectorCol localTime={localTime}/>
      </div>
    </AppFrame>
  );
}

// ── Cockpit: Team column (left) ─────────────────────────────────────────────
function CockpitTeamCol({ localTime }) {
  const D = window.DEMO;
  const activeIds = D.cockpitTeam;
  const teamMembers = activeIds.map(id => D.team.find(m => m.id === id));

  function activityFor(id) {
    const my = D.cockpitTimeline.filter(e => e.who === id && localTime >= e.at);
    if (my.length === 0) return null;
    return my[my.length - 1];
  }

  const activeCount = teamMembers.filter(m => activityFor(m.id)).length;

  return (
    <div style={{
      width: 280, flexShrink: 0,
      borderRight: `1px solid ${COLOR.hair}`,
      padding: '22px 18px', display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.14em',
          color: COLOR.inkFaint, fontWeight: 600,
        }}>TEAM</span>
        <span style={{
          fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute,
        }}>{activeCount}/4 active</span>
      </div>
      {teamMembers.map(m => (
        <TeamCard key={m.id} member={m} activity={activityFor(m.id)} localTime={localTime}/>
      ))}
    </div>
  );
}

function TeamCard({ member, activity, localTime }) {
  const toneColor = ({ coral: COLOR.coral, coralDeep: COLOR.coralDeep, blue: COLOR.blue, plum: COLOR.plum })[member.tone] || COLOR.coral;
  const active = !!activity && (localTime - activity.at < 1.2);
  return (
    <div style={{
      padding: '14px 14px',
      background: COLOR.panel,
      border: `1px solid ${active ? toneColor : COLOR.hair2}`,
      borderRadius: 10,
      display: 'flex', alignItems: 'center', gap: 12,
      position: 'relative', overflow: 'hidden',
      transition: 'border-color 220ms, box-shadow 220ms',
      boxShadow: active ? `0 0 0 3px ${COLOR.coralSoft}` : 'none',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: COLOR.bg3, color: COLOR.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT.mono, fontWeight: 700, fontSize: 14,
        flexShrink: 0, position: 'relative',
      }}>
        {member.initial}
        <span style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 10, height: 10, borderRadius: '50%',
          background: COLOR.green,
          border: `2px solid ${COLOR.panel}`,
          boxShadow: active ? `0 0 8px ${COLOR.green}` : 'none',
        }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: COLOR.ink }}>{member.id}</div>
        <div style={{ fontSize: 12, color: COLOR.inkMute, marginTop: 2, fontFamily: FONT.mono }}>
          {member.id === 'tester' ? 'qa' : member.id}
        </div>
      </div>
      <div style={{
        display: 'flex', gap: 2, color: COLOR.inkMute, fontSize: 9, letterSpacing: '0.05em',
      }}>
        {'•••••'.split('').map((c, i) => <span key={i}>{c}</span>)}
      </div>
    </div>
  );
}

// ── Cockpit: Main column ────────────────────────────────────────────────────
function CockpitMainCol({ localTime }) {
  const D = window.DEMO;
  const visible = D.cockpitTimeline.filter(e => localTime >= e.at);
  const recent = visible.slice().reverse();

  const lastTask = D.tasks[D.tasks.length - 1];
  const currentTask = D.tasks.find(t => t.status === 'in_progress') || D.tasks[0];

  return (
    <div style={{
      flex: 1, minWidth: 0, padding: '20px 28px',
      display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden',
    }}>
      {/* Welcome banner */}
      <FadeIn delay={0} dur={0.5}>
        <div style={{
          padding: '14px 18px',
          background: COLOR.amberSoft, border: `1px solid oklch(82% 0.135 80 / 0.25)`,
          borderRadius: 11,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ flex: 1, fontSize: 14, color: COLOR.ink, lineHeight: 1.5 }}>
            <b>Welcome back to family-meal-planner.</b> Your team is running now. Last task:&nbsp;
            <span style={{ color: COLOR.coral, fontFamily: FONT.mono }}>{lastTask.id}</span> — {lastTask.title}.
          </div>
          <button style={{
            height: 32, padding: '0 14px', borderRadius: 8,
            background: COLOR.bg2, color: COLOR.ink,
            border: `1px solid ${COLOR.hair2}`, fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ display: 'inline-flex', gap: 2 }}>
              <span style={{ width: 3, height: 11, background: 'currentColor' }}/>
              <span style={{ width: 3, height: 11, background: 'currentColor' }}/>
            </span>
            Pause team
          </button>
          <button style={{
            width: 30, height: 30, borderRadius: 7,
            background: 'transparent', border: 'none', color: COLOR.inkMute, fontSize: 16,
          }}>×</button>
        </div>
      </FadeIn>

      {/* Action row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={pauseBtn()}>
          <span style={{ display: 'inline-flex', gap: 2, marginRight: 2 }}>
            <span style={{ width: 3, height: 11, background: 'currentColor' }}/>
            <span style={{ width: 3, height: 11, background: 'currentColor' }}/>
          </span>
          Pause team
        </button>
        <button style={ghostBtn()}>+ Add task</button>
        <button style={ghostBtn()}>
          <span style={{ color: COLOR.inkMute, fontSize: 13 }}>◉</span> Run drift
        </button>
        <div style={{ flex: 1 }}/>
        <span style={{ color: COLOR.inkMute, fontSize: 14 }}>ⓘ</span>
        <span style={{ color: COLOR.inkMute, fontSize: 14 }}>?</span>
      </div>

      {/* What's happening */}
      <div style={{ marginTop: 4 }}>
        <div style={{
          fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.14em',
          color: COLOR.inkFaint, fontWeight: 600,
        }}>WHAT'S HAPPENING</div>
        <div style={{
          marginTop: 8, fontFamily: FONT.serif, fontSize: 32, lineHeight: 1.25,
          color: COLOR.ink, letterSpacing: '-0.01em', textWrap: 'pretty',
        }}>
          Your team is working on <span style={{ color: COLOR.coral, fontFamily: FONT.mono, fontSize: 26 }}>{currentTask.id}</span>
          {' — '}<span style={{ fontStyle: 'italic' }}>{currentTask.title}</span>.
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: COLOR.inkMute }}>
          <CockpitMeta localTime={localTime}/>
        </div>
      </div>

      {/* Event stream */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 4 }}>
        {recent.slice(0, 8).map((evt, i) => (
          <CockpitEvent key={`${evt.at}-${evt.who}-${i}`} evt={evt} localTime={localTime}/>
        ))}
      </div>
    </div>
  );
}

function CockpitMeta({ localTime }) {
  const D = window.DEMO;
  const activeCount = D.cockpitTeam.filter(id =>
    D.cockpitTimeline.some(e => e.who === id && localTime >= e.at)
  ).length;
  const inReview = D.cockpitTimeline.some(e => e.target === 'FMP-002' && localTime >= e.at && localTime < 28)
    ? 1 : 0;
  return (
    <span>
      {activeCount} of 4 agents active &nbsp;·&nbsp; {inReview} task awaiting review &nbsp;·&nbsp; drift healthy
    </span>
  );
}

function CockpitEvent({ evt, localTime }) {
  const since = localTime - evt.at;
  const op = clamp(since / 0.35, 0, 1);
  const member = window.DEMO.team.find(m => m.id === evt.who);
  const toneColor = ({ coral: COLOR.coral, coralDeep: COLOR.coralDeep, blue: COLOR.blue, plum: COLOR.plum })[member?.tone] || COLOR.coral;

  return (
    <div style={{
      display: 'flex', gap: 14, opacity: op,
      transform: `translateY(${(1 - op) * 6}px)`,
    }}>
      <div style={{
        width: 76, flexShrink: 0, fontSize: 12, color: COLOR.inkMute,
        display: 'flex', alignItems: 'center', gap: 6, paddingTop: 4,
      }}>
        just now <span style={{
          width: 6, height: 6, borderRadius: 999, background: toneColor,
        }}/>
      </div>
      <div style={{
        flex: 1, padding: '8px 14px',
        background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
        borderRadius: 9, fontSize: 14, color: COLOR.inkSoft, lineHeight: 1.55,
      }}>
        <span style={{ color: toneColor, fontWeight: 600 }}>{evt.who}</span>{' '}
        <span style={{ color: COLOR.inkMute }}>
          {evt.name === 'task_create' ? 'created task' :
           evt.name === 'task_update' ? 'updated' :
           'used'}
        </span>{' '}
        <span style={{
          fontFamily: FONT.mono, fontSize: 12.5,
          padding: '1px 7px', background: COLOR.bg3, borderRadius: 5,
          color: COLOR.ink,
        }}>{evt.name === 'task_create' ? evt.target : evt.name === 'task_update' ? evt.target : evt.name}</span>
        {' '}<span style={{ color: COLOR.inkMute }}>—</span>{' '}
        <span style={{ color: COLOR.inkSoft }}>{evt.text}</span>
      </div>
    </div>
  );
}

function pauseBtn() {
  return {
    height: 38, padding: '0 16px', borderRadius: 9,
    background: COLOR.coral, color: '#1c1109',
    border: 'none', fontSize: 13, fontWeight: 600, fontFamily: FONT.sans,
    display: 'inline-flex', alignItems: 'center', gap: 8,
  };
}

// ── Cockpit: Right inspector ────────────────────────────────────────────────
function CockpitInspectorCol({ localTime }) {
  const D = window.DEMO;
  const currentTask = D.tasks.find(t => t.status === 'in_progress') || D.tasks[0];

  return (
    <div style={{
      width: 380, flexShrink: 0,
      borderLeft: `1px solid ${COLOR.hair}`,
      padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
        <InspectorTab active>TASK</InspectorTab>
        <InspectorTab>AGENT</InspectorTab>
        <InspectorTab>DRIFT</InspectorTab>
      </div>

      <FadeIn delay={0.3}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute,
            padding: '3px 8px', background: COLOR.bg3, borderRadius: 5,
          }}>{currentTask.id}</span>
          <span style={pillStyle(COLOR.coralSoft, COLOR.coral)}>● in-progress</span>
        </div>
        <div style={{
          marginTop: 14, fontFamily: FONT.serif, fontSize: 28,
          lineHeight: 1.25, color: COLOR.ink, letterSpacing: '-0.01em',
        }}>{currentTask.title}</div>

        <div style={{ marginTop: 28 }}>
          <div style={labelStyle()}>ASSIGNEE</div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: COLOR.ink }}>Assigned</span>
            <span style={{ fontSize: 18, color: COLOR.inkFaint }}>—</span>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button style={{
            height: 38, padding: '0 18px',
            background: COLOR.bg2, color: COLOR.ink,
            border: `1px solid ${COLOR.hair2}`, borderRadius: 9,
            fontSize: 13, fontFamily: FONT.sans, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Open full task <span style={{ color: COLOR.coral }}>›</span></button>
        </div>
      </FadeIn>
    </div>
  );
}

function InspectorTab({ active, children }) {
  return (
    <span style={{
      fontFamily: FONT.mono, fontSize: 11.5, letterSpacing: '0.14em',
      fontWeight: 600,
      color: active ? COLOR.ink : COLOR.inkMute,
      paddingBottom: 8,
      borderBottom: `2px solid ${active ? COLOR.coral : 'transparent'}`,
    }}>{children}</span>
  );
}

Object.assign(window, { SceneTeamModal, SceneCockpit, FoundryProjectsCol });
