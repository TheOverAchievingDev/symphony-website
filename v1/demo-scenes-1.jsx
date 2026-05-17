// Intro + Outro + Foundry scenes.

// ── INTRO ────────────────────────────────────────────────────────────────────
function SceneIntro() {
  const { localTime, duration } = useSprite();
  const t1 = clamp(localTime / 1.2, 0, 1);
  const t2 = clamp((localTime - 1.5) / 1.2, 0, 1);
  const t3 = clamp((localTime - 3.5) / 1.0, 0, 1);

  // 5 ascending lines = Symphony logo
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(1200px 700px at 50% 35%, oklch(26% 0.020 38 / 0.35), transparent 70%), ${COLOR.bg}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 28,
    }}>
      {/* Animated logo mark */}
      <div style={{
        display: 'flex', alignItems: 'end', gap: 7, height: 80,
        opacity: Easing.easeOutCubic(t1),
        transform: `translateY(${(1 - t1) * 20}px)`,
      }}>
        {[24, 38, 56, 42, 30].map((h, i) => {
          const local = clamp((localTime - 0.2 - i * 0.08) / 0.8, 0, 1);
          return (
            <span key={i} style={{
              width: 7, height: h * Easing.easeOutBack(local),
              background: i === 2 ? COLOR.coral : COLOR.ink,
              borderRadius: 4,
              transition: 'background 200ms',
            }}/>
          );
        })}
      </div>

      <div style={{
        fontFamily: FONT.serif,
        fontSize: 132, lineHeight: 1, letterSpacing: '-0.03em',
        color: COLOR.ink,
        opacity: Easing.easeOutCubic(t2),
        transform: `translateY(${(1 - t2) * 18}px)`,
      }}>
        Sym<span style={{ fontStyle: 'italic', color: COLOR.coral }}>phony</span>
      </div>

      <div style={{
        fontFamily: FONT.mono, fontSize: 16, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: COLOR.inkMute,
        opacity: Easing.easeOutCubic(t3),
      }}>
        a vibe-coding studio &nbsp;·&nbsp; v0.6.2
      </div>
    </div>
  );
}

// ── OUTRO ───────────────────────────────────────────────────────────────────
function SceneOutro() {
  const { localTime } = useSprite();
  const t1 = clamp(localTime / 1.0, 0, 1);
  const t2 = clamp((localTime - 1.2) / 1.0, 0, 1);
  const t3 = clamp((localTime - 2.8) / 1.0, 0, 1);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(1300px 800px at 50% 45%, oklch(28% 0.035 38 / 0.45), transparent 70%), ${COLOR.bg}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 36,
    }}>
      <div style={{
        fontFamily: FONT.serif, fontSize: 108, lineHeight: 1.04,
        letterSpacing: '-0.02em', textAlign: 'center',
        color: COLOR.ink,
        opacity: Easing.easeOutCubic(t1),
        transform: `translateY(${(1 - t1) * 16}px)`,
      }}>
        <div style={{ whiteSpace: 'nowrap' }}>Your team.</div>
        <div style={{ whiteSpace: 'nowrap', color: COLOR.coral, fontStyle: 'italic' }}>
          Your subscription.
        </div>
        <div style={{ whiteSpace: 'nowrap' }}>Your code.</div>
      </div>

      <div style={{
        opacity: Easing.easeOutCubic(t2),
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          display: 'flex', alignItems: 'end', gap: 6, height: 44,
        }}>
          {[14, 22, 34, 26, 18].map((h, i) => (
            <span key={i} style={{
              width: 5, height: h,
              background: i === 2 ? COLOR.coral : COLOR.ink,
              borderRadius: 3,
            }}/>
          ))}
        </div>
        <div style={{
          fontFamily: FONT.serif, fontSize: 36, color: COLOR.ink,
          letterSpacing: '-0.01em',
        }}>
          Sym<span style={{ fontStyle: 'italic', color: COLOR.coral }}>phony</span>
        </div>
      </div>

      <div style={{
        marginTop: 8,
        fontFamily: FONT.mono, fontSize: 13, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: COLOR.inkMute,
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

  // Beat timings (local to this scene)
  //  0.0  enter — view appears
  //  1.0  user types first message
  //  6.0  foundry responds
  // 12.0  user second message
  // 17.0  foundry responds
  // 22.0  "Generate docs" pressed (cursor + button highlight)
  // 24.5+ docs stream into right panel, one every ~2s
  // 38.0  all docs done, "Create team" button highlights

  // Cursor path inside main canvas (1920 - 84 rail = 1836 wide, full height)
  const cursorKf = [
    { at:  0.5, x: 1100, y: 920 },
    { at: 21.0, x: 1100, y: 920 },
    { at: 22.0, x: 1220, y: 170, click: true }, // Generate docs
    { at: 36.0, x: 1220, y: 170 },
    { at: 38.0, x: 1740, y: 170, click: true }, // Create team
  ];

  return (
    <AppFrame active="foundry" projectName="symphony-demo" runtimes="0 / 5 runtimes">
      {/* 3-column foundry layout: project list / chat / artifacts */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Header strip */}
        <div style={{
          display: 'flex', alignItems: 'center', padding: '20px 28px 12px',
          gap: 36,
        }}>
          <div>
            <div style={labelStyle()}>FOUNDRY</div>
            <div style={{ fontSize: 28, fontWeight: 500, marginTop: 2, fontFamily: FONT.sans }}>Project plans</div>
          </div>
          <div style={{ borderLeft: `1px solid ${COLOR.hair}`, paddingLeft: 28 }}>
            <div style={labelStyle()}>DISCOVERY</div>
            <div style={{ fontSize: 24, fontWeight: 500, marginTop: 2, color: COLOR.ink }}>Family Meal Planner</div>
          </div>
          <div style={{ flex: 1 }}/>
          <FoundryGenerateButton localTime={localTime}/>
          <div style={{ borderLeft: `1px solid ${COLOR.hair}`, paddingLeft: 28, marginLeft: 16 }}>
            <div style={labelStyle()}>ARTIFACTS</div>
            <div style={{ fontSize: 24, fontWeight: 500, marginTop: 2, color: COLOR.ink, fontFamily: FONT.mono }}>
              <FoundryDocsCount localTime={localTime} total={D.foundryDocs.length}/>
            </div>
          </div>
          <CreateTeamButton localTime={localTime}/>
        </div>

        <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
          {/* Left: project list */}
          <div style={{
            width: 320, flexShrink: 0,
            borderRight: `1px solid ${COLOR.hair}`,
            padding: '8px 14px', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 6px 14px' }}>
              <input readOnly placeholder="New project" style={{
                flex: 1, height: 32, background: COLOR.bg2, border: `1px solid ${COLOR.hair}`,
                borderRadius: 8, padding: '0 10px', color: COLOR.inkSoft, fontSize: 12,
                fontFamily: FONT.sans,
              }}/>
              <button style={{
                height: 32, padding: '0 12px',
                background: COLOR.bg2, color: COLOR.ink,
                border: `1px solid ${COLOR.hair}`, borderRadius: 8,
                fontSize: 12, fontFamily: FONT.sans,
              }}>Claude ▾</button>
              <button style={{
                height: 32, padding: '0 14px',
                background: COLOR.coral, color: '#1c1109',
                border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 12,
              }}>+ New</button>
            </div>
            {[
              { title: 'Family Meal Planner', sub: 'Claude · live · 4 notes · 5 files', active: true },
              { title: 'Habit tracker',       sub: 'Claude · 2 notes · 0 files' },
              { title: 'ChorePoints',         sub: 'Codex · 4 notes · 0 files' },
              { title: 'Reading rotation',    sub: 'Claude · 0 notes · 0 files' },
              { title: 'Garden planner',      sub: 'Gemini · 2 notes · 0 files' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '14px 14px', borderRadius: 10, marginBottom: 4,
                background: p.active ? COLOR.coralSoft : 'transparent',
                border: p.active ? `1px solid ${COLOR.coralSoft}` : `1px solid transparent`,
              }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: COLOR.ink }}>{p.title}</div>
                <div style={{ fontSize: 12, color: COLOR.inkMute, marginTop: 2 }}>{p.sub}</div>
              </div>
            ))}
          </div>

          {/* Middle: chat */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, padding: '8px 0' }}>
            <FoundryChat localTime={localTime}/>
            <FoundryComposer localTime={localTime}/>
          </div>

          {/* Right: artifacts */}
          <div style={{ width: 380, flexShrink: 0, borderLeft: `1px solid ${COLOR.hair}`, padding: '14px 18px', overflow: 'hidden' }}>
            <FoundryArtifacts localTime={localTime} docs={D.foundryDocs}/>
          </div>
        </div>
      </div>

      <Cursor keyframes={cursorKf}/>
    </AppFrame>
  );
}

function labelStyle() {
  return {
    fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: COLOR.inkMute, fontWeight: 500,
  };
}

function FoundryGenerateButton({ localTime }) {
  const pressed = localTime > 21.7 && localTime < 22.4;
  const generating = localTime >= 22.4 && localTime < 36;
  return (
    <button style={{
      padding: '10px 18px', borderRadius: 10,
      background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
      color: COLOR.ink, fontSize: 13, fontFamily: FONT.sans,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transform: pressed ? 'scale(0.97)' : 'scale(1)',
      boxShadow: generating ? `0 0 0 2px ${COLOR.coralSoft}` : 'none',
    }}>
      <SpinnerOrCheck loading={generating} done={localTime >= 36}/>
      Generate docs
    </button>
  );
}

function SpinnerOrCheck({ loading, done }) {
  if (done) return <span style={{ color: COLOR.green }}>✓</span>;
  if (loading) return (
    <span style={{
      display: 'inline-block', width: 12, height: 12, border: `2px solid ${COLOR.inkMute}`,
      borderTopColor: COLOR.coral, borderRadius: '50%',
      animation: 'demoSpin 800ms linear infinite',
    }}/>
  );
  return <span style={{ color: COLOR.inkMute }}>◌</span>;
}

function FoundryDocsCount({ localTime, total }) {
  // stream in starting at localTime 24.5, ~2s apart
  let n = 0;
  for (let i = 0; i < total; i++) {
    if (localTime >= 24.5 + i * 2.2) n = i + 1;
  }
  return <span>{n} files</span>;
}

function CreateTeamButton({ localTime }) {
  const enabled = localTime >= 36;
  const pressed = localTime > 37.8 && localTime < 38.4;
  return (
    <button style={{
      padding: '12px 20px', borderRadius: 10,
      background: enabled ? COLOR.coral : COLOR.bg3,
      color: enabled ? '#1c1109' : COLOR.inkMute,
      border: 'none', fontSize: 13, fontWeight: 600,
      fontFamily: FONT.sans,
      transform: pressed ? 'scale(0.96)' : 'scale(1)',
      boxShadow: enabled ? `0 0 0 4px ${COLOR.coralSoft}` : 'none',
      transition: 'background 300ms, box-shadow 300ms, transform 80ms',
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      + Create team
    </button>
  );
}

function FoundryChat({ localTime }) {
  const msgs = window.DEMO.foundryChat;
  // Reveal timings
  const beats = [1.0, 6.0, 12.0, 17.0];

  return (
    <div style={{
      flex: 1, padding: '14px 24px 8px', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      {msgs.map((m, i) => {
        if (localTime < beats[i]) return null;
        const sinceShow = localTime - beats[i];
        const opacity = clamp(sinceShow / 0.5, 0, 1);
        return (
          <Msg key={i} from={m.who} text={m.text} opacity={opacity}/>
        );
      })}
      {/* typing indicator after each user line, before foundry replies */}
      {localTime > 1.3 + msgs[0].text.length / 40 && localTime < beats[1] && <TypingDots/>}
      {localTime > 12.3 + msgs[2].text.length / 40 && localTime < beats[3] && <TypingDots/>}
    </div>
  );
}

function Msg({ from, text, opacity }) {
  const isYou = from === 'you';
  return (
    <div style={{
      display: 'flex', gap: 12, opacity, alignItems: 'flex-start',
      transform: `translateY(${(1 - opacity) * 6}px)`,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: isYou ? COLOR.bg3 : COLOR.coralSoft,
        color: isYou ? COLOR.ink : COLOR.coral,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT.mono, fontSize: 12, fontWeight: 600,
      }}>{isYou ? 'Y' : 'F'}</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: COLOR.inkMute, marginBottom: 4,
        }}>{isYou ? 'You' : 'Foundry · Claude'}</div>
        <div style={{
          fontSize: 15, lineHeight: 1.55, color: COLOR.ink,
          textWrap: 'pretty',
        }}>{text}</div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 40, marginTop: -4 }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: 999, background: COLOR.coral,
          animation: `demoDots 1.4s ${i * 0.18}s infinite ease-in-out`,
        }}/>
      ))}
    </div>
  );
}

function FoundryComposer({ localTime }) {
  return (
    <div style={{ padding: '14px 24px 20px' }}>
      <div style={{
        background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
        borderRadius: 12, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        minHeight: 56,
      }}>
        <div style={{ flex: 1, fontSize: 14, color: COLOR.inkMute }}>
          Describe goals, users, workflows, entities, constraints, integrations…
        </div>
        <button style={{
          padding: '8px 16px', borderRadius: 8,
          background: COLOR.coralSoft, color: COLOR.coral,
          border: `1px solid ${COLOR.coralSoft}`,
          fontWeight: 600, fontSize: 13, fontFamily: FONT.sans,
        }}>↗ Send</button>
      </div>
    </div>
  );
}

function FoundryArtifacts({ localTime, docs }) {
  return (
    <div>
      <div style={labelStyle()}>FOUNDING DOCS</div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {docs.map((d, i) => {
          const showAt = 24.5 + i * 2.2;
          if (localTime < showAt) return (
            <div key={i} style={artifactStyle(false)}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: COLOR.bg3, border: `1px dashed ${COLOR.hair2}`,
                flexShrink: 0,
              }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: COLOR.inkMute }}>{d.title}</div>
                <div style={{ fontSize: 11, color: COLOR.inkFaint, fontFamily: FONT.mono, marginTop: 2 }}>
                  pending…
                </div>
              </div>
            </div>
          );
          const sinceShow = localTime - showAt;
          const op = clamp(sinceShow / 0.4, 0, 1);
          return (
            <div key={i} style={{
              ...artifactStyle(true),
              opacity: op, transform: `translateY(${(1 - op) * 8}px) scale(${0.97 + op * 0.03})`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: COLOR.greenSoft, color: COLOR.green,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontFamily: FONT.mono,
              }}>✓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: COLOR.ink, fontWeight: 500 }}>{d.title}</div>
                <div style={{ fontSize: 11, color: COLOR.inkMute, fontFamily: FONT.mono, marginTop: 2 }}>
                  {d.file}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function artifactStyle(active) {
  return {
    display: 'flex', alignItems: 'flex-start', gap: 12,
    padding: '12px 14px',
    background: active ? COLOR.panel : 'transparent',
    border: `1px solid ${active ? COLOR.hair : 'transparent'}`,
    borderRadius: 10,
    transition: 'background 200ms',
  };
}

Object.assign(window, { SceneIntro, SceneOutro, SceneFoundry });
