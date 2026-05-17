// Intro + Outro + Foundry scenes (v2 — matches new Symphony UI)

// ── INTRO (8s) ──────────────────────────────────────────────────────────────
function SceneIntro() {
  const { localTime } = useSprite();
  const t1 = clamp(localTime / 0.9, 0, 1);
  const t2 = clamp((localTime - 1.0) / 0.9, 0, 1);
  const t3 = clamp((localTime - 2.5) / 0.8, 0, 1);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(1200px 700px at 50% 38%, oklch(26% 0.020 38 / 0.35), transparent 70%), ${COLOR.bg}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 28,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: Easing.easeOutCubic(t1),
        transform: `translateY(${(1 - t1) * 18}px)`,
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: 999, background: COLOR.coral,
          boxShadow: `0 0 0 6px ${COLOR.coralSoft}`,
        }}/>
        <span style={{
          fontFamily: FONT.serif, fontSize: 132, lineHeight: 1,
          letterSpacing: '-0.03em', color: COLOR.ink, fontStyle: 'italic',
        }}>Symphony</span>
      </div>

      <div style={{
        fontFamily: FONT.sans, fontSize: 32, color: COLOR.inkSoft,
        letterSpacing: '-0.01em', textAlign: 'center', fontWeight: 400,
        opacity: Easing.easeOutCubic(t2),
        transform: `translateY(${(1 - t2) * 14}px)`,
        maxWidth: 1100,
      }}>
        A vibe-coding studio that brings <em style={{ color: COLOR.coral, fontStyle: 'normal', fontWeight: 500 }}>a real dev team</em>.
      </div>

      <div style={{
        fontFamily: FONT.mono, fontSize: 14, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: COLOR.inkFaint,
        opacity: Easing.easeOutCubic(t3),
      }}>
        a four-minute live tour &nbsp;·&nbsp; v0.6.2
      </div>
    </div>
  );
}

// ── OUTRO (8s) ──────────────────────────────────────────────────────────────
function SceneOutro() {
  const { localTime } = useSprite();
  const t1 = clamp(localTime / 0.8, 0, 1);
  const t2 = clamp((localTime - 1.0) / 0.8, 0, 1);
  const t3 = clamp((localTime - 2.5) / 0.8, 0, 1);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(1300px 800px at 50% 50%, oklch(28% 0.035 38 / 0.45), transparent 70%), ${COLOR.bg}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 40,
    }}>
      <div style={{
        fontFamily: FONT.serif, fontSize: 116, lineHeight: 1.05,
        letterSpacing: '-0.02em', textAlign: 'center',
        opacity: Easing.easeOutCubic(t1),
        transform: `translateY(${(1 - t1) * 18}px)`,
      }}>
        <div style={{ whiteSpace: 'nowrap', color: COLOR.ink }}>Your team.</div>
        <div style={{ whiteSpace: 'nowrap', color: COLOR.coral, fontStyle: 'italic' }}>
          Your subscription.
        </div>
        <div style={{ whiteSpace: 'nowrap', color: COLOR.ink }}>Your code.</div>
      </div>

      <div style={{
        opacity: Easing.easeOutCubic(t2),
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 12, height: 12, borderRadius: 999, background: COLOR.coral,
            boxShadow: `0 0 0 4px ${COLOR.coralSoft}`,
          }}/>
          <span style={{
            fontFamily: FONT.serif, fontSize: 44, fontStyle: 'italic',
            color: COLOR.ink, letterSpacing: '-0.01em',
          }}>Symphony</span>
        </div>
      </div>

      <div style={{
        marginTop: 4,
        fontFamily: FONT.mono, fontSize: 13, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: COLOR.inkFaint,
        opacity: Easing.easeOutCubic(t3),
      }}>
        local-first &nbsp;·&nbsp; bring your own plan &nbsp;·&nbsp; download for windows
      </div>
    </div>
  );
}

// ── FOUNDRY SCENE ────────────────────────────────────────────────────────────
function SceneFoundry() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // Beats (45s scene total — see demo-video.html):
  //   0.0   enter
  //   0.7   user message 1 appears
  //   3.5   user message 2 appears
  //   6.0   assistant message 1 appears
  //  10.0   assistant message 2 (phases marked, docs draft begins)
  //  14.0   Generate docs button pulses then "running"
  //  16.0+  docs stream into right column, one ~1.8s
  //  27.5   roadmap doc opens (right column shows markdown preview)
  //  38.0   Create team highlights
  //  42.5   click happens

  const cursorKf = [
    { at:  0.5, x: 960, y: 940 },
    { at: 13.0, x: 960, y: 940 },
    { at: 14.0, x: 1080, y: 195, click: true },     // generate docs
    { at: 36.0, x: 1080, y: 195 },
    { at: 41.0, x: 1740, y: 195, click: true },     // create team
  ];

  return (
    <AppFrame
      active="foundry" projectName="family-meal-planner"
      runtimes="0/4"
      driftPct="0%"
      searchHint={['Search anything', 'run drift', 'open settings', 'switch project']}
      agentsRunning={0}
      taskBadge={5}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'flex', minHeight: 0 }}>
        <FoundryProjectsCol localTime={localTime}/>
        <FoundryChatCol localTime={localTime}/>
        <FoundryArtifactsCol localTime={localTime}/>
      </div>
      <Cursor keyframes={cursorKf}/>
    </AppFrame>
  );
}

// ── Foundry: project list + phases column ───────────────────────────────────
function FoundryProjectsCol({ localTime }) {
  const D = window.DEMO;
  return (
    <div style={{
      width: 320, flexShrink: 0, padding: '20px 22px',
      borderRight: `1px solid ${COLOR.hair}`, display: 'flex', flexDirection: 'column',
    }}>
      <div style={labelStyle()}>FOUNDRY</div>
      <div style={{
        marginTop: 4, fontFamily: FONT.sans, fontSize: 26, fontWeight: 500,
        letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        Project plans
        <span style={{ color: COLOR.coral, fontSize: 16 }}>▷</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
        <input readOnly placeholder="New proje" style={{
          flex: 1, height: 32, padding: '0 12px',
          background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
          borderRadius: 8, color: COLOR.inkSoft, fontSize: 12, fontFamily: FONT.sans,
        }}/>
        <button style={{
          height: 32, padding: '0 10px',
          background: COLOR.bg2, color: COLOR.ink,
          border: `1px solid ${COLOR.hair2}`, borderRadius: 8,
          fontSize: 12, fontFamily: FONT.sans,
        }}>Claude ▾</button>
        <button style={{
          height: 32, padding: '0 12px',
          background: COLOR.coral, color: '#1c1109',
          border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 12,
        }}>+ New</button>
      </div>

      {/* Active project card */}
      <div style={{
        marginTop: 18, padding: '12px 14px',
        background: COLOR.coralFaint, border: `1px solid ${COLOR.coralSoft}`,
        borderRadius: 10,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLOR.ink }}>Family Meal Planner</div>
        <div style={{ fontSize: 11.5, color: COLOR.inkMute, marginTop: 4, fontFamily: FONT.mono }}>
          Claude &nbsp;·&nbsp; 4 notes &nbsp;·&nbsp; 5 files
        </div>
      </div>

      {/* Phases checklist */}
      <div style={{ marginTop: 26 }}>
        <div style={labelStyle()}>PHASES</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {D.phases.map((p, i) => (
            <PhaseRow key={i} phase={p} localTime={localTime} index={i}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhaseRow({ phase, localTime, index }) {
  // Phases "Brief" and "Roadmap" land green at predefined moments
  let status = phase.status;
  if (phase.name === 'Brief' && localTime > 13) status = 'done';
  if (phase.name === 'Roadmap' && localTime > 21) status = 'done';
  const done = status === 'done';
  const opt = status === 'optional';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{
        width: 16, height: 16, borderRadius: 999,
        background: done ? COLOR.green : 'transparent',
        border: `1.5px solid ${done ? COLOR.green : COLOR.inkFaint}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#0a1a10', fontSize: 10, fontWeight: 800,
        transition: 'background 250ms, border-color 250ms',
      }}>{done ? '✓' : ''}</span>
      <span style={{
        fontSize: 14, color: done ? COLOR.ink : (opt ? COLOR.inkFaint : COLOR.inkSoft),
        fontWeight: done ? 500 : 400, flex: 1,
      }}>{phase.name}</span>
      {opt && (
        <span style={{
          fontFamily: FONT.mono, fontSize: 10, letterSpacing: '0.1em',
          color: COLOR.inkFaint, textTransform: 'uppercase',
        }}>OPTIONAL</span>
      )}
    </div>
  );
}

// ── Foundry: middle chat column ─────────────────────────────────────────────
function FoundryChatCol({ localTime }) {
  const D = window.DEMO;

  // Reveal timings for chat (localTime within scene)
  const beats = [0.7, 3.5, 6.0, 10.0];
  const msgs = D.foundryChat;

  return (
    <div style={{
      flex: 1, minWidth: 0, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div>
          <div style={labelStyle()}>DISCOVERY</div>
          <div style={{
            marginTop: 4, fontFamily: FONT.sans, fontSize: 26, fontWeight: 500,
            letterSpacing: '-0.01em', color: COLOR.ink,
          }}>Family Meal Planner</div>
        </div>
        <div style={{ flex: 1 }}/>
        <FoundryGenerateBtn localTime={localTime}/>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
        {msgs.map((m, i) => {
          if (localTime < beats[i]) return null;
          const sinceShow = localTime - beats[i];
          const op = clamp(sinceShow / 0.4, 0, 1);
          return <FoundryMsg key={i} msg={m} op={op}/>;
        })}
      </div>

      {/* Composer */}
      <div style={{
        marginTop: 'auto', display: 'flex', gap: 10, alignItems: 'flex-end',
        padding: '12px 14px',
        background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 12,
      }}>
        <div style={{ flex: 1, fontSize: 13, color: COLOR.inkMute, padding: '6px 0', lineHeight: 1.4 }}>
          Describe goals, users, workflows, entities,<br/>
          constraints, integrations…
        </div>
        <button style={{
          height: 36, padding: '0 16px',
          background: COLOR.coralFaint, color: COLOR.coral,
          border: `1px solid ${COLOR.coralSoft}`,
          borderRadius: 9, fontSize: 13, fontWeight: 600, fontFamily: FONT.sans,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>↗ Send</button>
      </div>
    </div>
  );
}

function FoundryGenerateBtn({ localTime }) {
  const pressed = localTime > 13.7 && localTime < 14.2;
  const generating = localTime >= 14.2 && localTime < 32;
  const done = localTime >= 32;
  return (
    <button style={{
      height: 38, padding: '0 16px', borderRadius: 9,
      background: COLOR.bg2, color: COLOR.ink,
      border: `1px solid ${COLOR.hair2}`, fontSize: 13, fontFamily: FONT.sans,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      boxShadow: pressed ? `0 0 0 3px ${COLOR.coralSoft}` : 'none',
      transition: 'transform 80ms',
    }}>
      <Spinner loading={generating} done={done}/>
      Generate docs
    </button>
  );
}

function Spinner({ loading, done }) {
  if (done) return <span style={{ color: COLOR.green }}>✓</span>;
  if (loading) return (
    <span style={{
      display: 'inline-block', width: 12, height: 12,
      border: `2px solid ${COLOR.hair3}`, borderTopColor: COLOR.coral,
      borderRadius: '50%', animation: 'demoSpin 800ms linear infinite',
    }}/>
  );
  return <span style={{ color: COLOR.coral }}>※</span>;
}

function FoundryMsg({ msg, op }) {
  const isUser = msg.who === 'user';
  return (
    <div style={{
      padding: '16px 18px',
      background: isUser ? COLOR.coralFaint : COLOR.bg2,
      border: `1px solid ${isUser ? COLOR.coralSoft : COLOR.hair2}`,
      borderRadius: 12,
      opacity: op, transform: `translateY(${(1 - op) * 8}px)`,
    }}>
      <div style={{
        fontFamily: FONT.mono, fontSize: 10.5, letterSpacing: '0.14em',
        color: isUser ? COLOR.coral : COLOR.inkFaint,
        textTransform: 'uppercase', marginBottom: 8, fontWeight: 600,
      }}>
        {isUser ? 'USER' : 'ASSISTANT'}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.5, color: COLOR.ink, textWrap: 'pretty' }}>
        {msg.text}
      </div>
    </div>
  );
}

// ── Foundry: right artifacts column ─────────────────────────────────────────
function FoundryArtifactsCol({ localTime }) {
  const D = window.DEMO;
  // Docs stream in starting at localTime 16, every 1.8s
  const docsRevealAt = (i) => 16 + i * 1.8;
  const docCount = D.foundryDocs.filter((_, i) => localTime >= docsRevealAt(i)).length;

  // Roadmap preview opens at 27.5 (after roadmap doc appears at ~23.2)
  const showRoadmapPreview = localTime >= 27.5;

  // Create team button highlights once all docs are done
  const allDone = localTime >= 32;

  return (
    <div style={{
      width: 540, flexShrink: 0, padding: '20px 22px',
      borderLeft: `1px solid ${COLOR.hair}`, display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={labelStyle()}>ARTIFACTS</div>
          <div style={{
            marginTop: 4, fontFamily: FONT.sans, fontSize: 26, fontWeight: 500,
          }}>{docCount} <span style={{ color: COLOR.inkMute, fontSize: 18, fontWeight: 400 }}>files</span></div>
        </div>
        <button style={ghostBtn()}>
          <FolderGlyph/> Export
        </button>
        <button style={{
          ...primaryBtn(),
          boxShadow: allDone ? `0 0 0 4px ${COLOR.coralSoft}` : 'none',
          transform: localTime > 40.5 && localTime < 41.2 ? 'scale(0.96)' : 'scale(1)',
        }}>+ Create team</button>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
        {D.foundryDocs.map((doc, i) => {
          const revealedAt = docsRevealAt(i);
          if (localTime < revealedAt) return null;
          const op = clamp((localTime - revealedAt) / 0.4, 0, 1);
          const isRoadmap = doc.title === 'Build roadmap';
          const opened = isRoadmap && showRoadmapPreview;
          return (
            <div key={i} style={{
              padding: '14px 16px',
              background: opened ? COLOR.bg2 : COLOR.bg2,
              border: `1px solid ${opened ? COLOR.hair3 : COLOR.hair2}`,
              borderRadius: 10,
              opacity: op, transform: `translateY(${(1 - op) * 6}px)`,
            }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: COLOR.ink }}>{doc.title}</div>
              <div style={{ fontSize: 12, color: COLOR.inkMute, marginTop: 4, fontFamily: FONT.mono }}>
                {doc.file}
              </div>
            </div>
          );
        })}

        {showRoadmapPreview && <RoadmapPreview localTime={localTime}/>}
      </div>
    </div>
  );
}

function FolderGlyph() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/></svg>;
}

function RoadmapPreview({ localTime }) {
  const D = window.DEMO;
  const since = localTime - 27.5;
  const op = clamp(since / 0.5, 0, 1);

  // Reveal markdown lines progressively
  const linesShown = Math.min(D.roadmapMarkdown.length, Math.floor(since * 5));

  return (
    <div style={{
      marginTop: 6,
      padding: '14px 18px',
      background: COLOR.bg, border: `1px solid ${COLOR.hair3}`,
      borderRadius: 10, opacity: op, transform: `translateY(${(1 - op) * 8}px)`,
      maxHeight: 350, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ ...pillStyle(COLOR.greenSoft, COLOR.green), fontSize: 11 }}>● exported</span>
        <span style={{ fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute }}>v1</span>
        <div style={{ flex: 1 }}/>
        <button style={{
          padding: '4px 12px', borderRadius: 6,
          background: COLOR.bg2, color: COLOR.ink,
          border: `1px solid ${COLOR.hair2}`, fontSize: 11, fontFamily: FONT.sans,
        }}>✓ Save</button>
      </div>
      <div style={{
        fontFamily: FONT.mono, fontSize: 12, lineHeight: 1.6, color: COLOR.inkSoft,
        whiteSpace: 'pre-wrap',
      }}>
        {D.roadmapMarkdown.slice(0, linesShown).map((line, i) => {
          const isHeading = line.startsWith('#');
          return (
            <div key={i} style={{
              color: isHeading ? COLOR.ink : COLOR.inkSoft,
              fontWeight: isHeading ? 600 : 400,
              minHeight: '1.6em',
            }}>{line || '\u00A0'}</div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { SceneIntro, SceneOutro, SceneFoundry });
