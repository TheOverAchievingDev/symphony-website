// Tasks kanban + Code + Drift scenes.

// ── TASKS KANBAN ────────────────────────────────────────────────────────────
function SceneTasks() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // Beats:
  // 0-3: enter, all cards visible in their starting columns
  // 3-12: FMP-001 moves todo → in_progress
  // 6-15: FMP-003 todo → in_progress
  // 10-20: FMP-002 todo → review → done (chain)
  // 18-25: FMP-001 in_progress → review → done

  function statusFor(t) {
    if (t.id === 'FMP-001') {
      if (localTime > 20) return 'done';
      if (localTime > 16) return 'review';
      if (localTime > 3)  return 'in_progress';
    }
    if (t.id === 'FMP-002') {
      if (localTime > 16) return 'done';
      if (localTime > 10) return 'review';
      if (localTime > 6)  return 'in_progress';
    }
    if (t.id === 'FMP-003') {
      if (localTime > 8)  return 'in_progress';
    }
    return 'todo';
  }

  const columns = [
    { id: 'todo',        title: 'TO DO',       glyph: '≡', color: COLOR.inkMute },
    { id: 'in_progress', title: 'IN PROGRESS', glyph: '▷', color: COLOR.coral },
    { id: 'review',      title: 'REVIEW',      glyph: '◐', color: COLOR.blue },
    { id: 'done',        title: 'DONE',        glyph: '✓', color: COLOR.green },
  ];

  return (
    <AppFrame active="tasks" projectName="symphony-demo" runtimes="4 / 5 runtimes">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          padding: '20px 28px 14px',
          display: 'flex', alignItems: 'center', gap: 16,
          borderBottom: `1px solid ${COLOR.hair}`,
        }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 32, color: COLOR.ink, letterSpacing: '-0.01em' }}>Tasks</div>
          <div style={{ fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute }}>
            · family-meal-planner ·&nbsp;
            <TasksCounter localTime={localTime} statusFor={statusFor} tasks={D.tasks}/>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={tinyTab(true)}>▤ Kanban</span>
            <span style={tinyTab(false)}>≡ List</span>
          </div>
          <button style={{ ...primaryBtn(), padding: '10px 18px' }}>+ New task</button>
        </div>

        <div style={{
          flex: 1, padding: '20px 28px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
          minHeight: 0,
        }}>
          {columns.map(col => {
            const inCol = D.tasks.filter(t => statusFor(t) === col.id);
            return (
              <div key={col.id} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '4px 4px 12px',
                  borderBottom: `1px solid ${COLOR.hair}`,
                }}>
                  <span style={{
                    fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.08em',
                    color: col.color, fontWeight: 600,
                  }}>{col.glyph} {col.title}</span>
                  <div style={{ flex: 1 }}/>
                  <span style={{ fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute }}>
                    {inCol.length}
                  </span>
                </div>
                <div style={{
                  flex: 1, padding: '12px 4px', display: 'flex', flexDirection: 'column', gap: 10,
                  overflow: 'hidden',
                }}>
                  {inCol.map(t => (
                    <KanbanCard key={t.id} task={t} status={col.id}/>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppFrame>
  );
}

function TasksCounter({ localTime, statusFor, tasks }) {
  const total = tasks.length;
  const inFlight = tasks.filter(t => statusFor(t) === 'in_progress').length;
  const inReview = tasks.filter(t => statusFor(t) === 'review').length;
  const done = tasks.filter(t => statusFor(t) === 'done').length;
  return (
    <span>
      {total} total · {inFlight} in flight · {inReview} in review · {done} done
    </span>
  );
}

function KanbanCard({ task, status }) {
  const D = window.DEMO;
  const member = D.team.find(m => m.id === task.owner);
  const tone = member?.tone || 'coral';
  const fg = ({ coral: COLOR.coral, green: COLOR.green, blue: COLOR.blue, plum: COLOR.plum })[tone];

  return (
    <div style={{
      padding: '14px 14px',
      background: status === 'done' ? COLOR.greenSoft : COLOR.panel,
      border: `1px solid ${status === 'done' ? COLOR.greenSoft : COLOR.hair2}`,
      borderLeft: `3px solid ${fg}`,
      borderRadius: 10,
      transition: 'background 280ms, border-color 280ms, transform 280ms',
    }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute, letterSpacing: '0.04em' }}>
        {task.id}
      </div>
      <div style={{
        marginTop: 6, fontSize: 14, lineHeight: 1.35,
        color: status === 'done' ? COLOR.inkSoft : COLOR.ink,
        textDecoration: status === 'done' ? 'line-through' : 'none',
        textDecorationColor: COLOR.inkMute, textDecorationThickness: '1px',
      }}>{task.title}</div>
      <div style={{
        marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute,
      }}>
        <span style={{
          width: 18, height: 18, borderRadius: 6,
          background: fg, color: '#1c1109', fontWeight: 700,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10,
        }}>{member?.initial}</span>
        <span>{task.owner}</span>
        <div style={{ flex: 1 }}/>
        <span>C:\…\meal-planner</span>
      </div>
    </div>
  );
}

// ── CODE ────────────────────────────────────────────────────────────────────
function SceneCode() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // Beats:
  // 0-2: appear
  // 2-22: code lines stream in via Typewriter (~1 line/sec)
  const linesShown = Math.min(D.codeFile.lines.length, Math.max(0, Math.floor((localTime - 2) * 1.3)));

  return (
    <AppFrame active="code" projectName="symphony-demo" runtimes="4 / 5 runtimes">
      <div style={{ position: 'absolute', inset: 0, display: 'flex', minHeight: 0 }}>

        {/* file tree */}
        <div style={{
          width: 320, flexShrink: 0, borderRight: `1px solid ${COLOR.hair}`,
          padding: '18px 0',
          background: COLOR.bg2,
        }}>
          <div style={{
            padding: '0 18px 14px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.1em', color: COLOR.inkMute, textTransform: 'uppercase' }}>
              EXPLORER · family-meal-planner
            </div>
          </div>
          <div style={{ padding: '0 6px' }}>
            {D.fileTree.map((node, i) => (
              <FileNode key={i} node={node}/>
            ))}
          </div>
        </div>

        {/* editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* breadcrumb */}
          <div style={{
            padding: '12px 22px', borderBottom: `1px solid ${COLOR.hair}`,
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute,
          }}>
            <span style={{
              padding: '5px 10px', background: COLOR.bg3, borderRadius: 6,
              border: `1px solid ${COLOR.hair2}`, color: COLOR.ink,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ color: COLOR.amber }}>{}</span> preferences.ts
              <span style={{ marginLeft: 6, color: COLOR.coral }}>●</span>
            </span>
            <span style={{ color: COLOR.inkFaint }}>›</span>
            <span>{D.codeFile.path}</span>
            <div style={{ flex: 1 }}/>
            <span style={{ color: COLOR.green }}>● tests passing</span>
            <span style={{ color: COLOR.inkMute }}>· just modified by</span>
            <span style={{
              padding: '2px 8px', background: COLOR.greenSoft, color: COLOR.green,
              borderRadius: 999, fontSize: 11,
            }}>D developer (Codex)</span>
          </div>

          {/* code surface */}
          <div style={{
            flex: 1, padding: '20px 0 0',
            background: COLOR.bg, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              flex: 1, padding: '6px 0', overflow: 'hidden',
              fontFamily: FONT.mono, fontSize: 14, lineHeight: 1.7,
            }}>
              {D.codeFile.lines.map((ln, i) => (
                <CodeLine key={i} line={ln} visible={i < linesShown}
                  isLast={i === linesShown - 1}/>
              ))}
            </div>

            {/* bottom panel — terminal */}
            <div style={{
              borderTop: `1px solid ${COLOR.hair}`, background: COLOR.bg2,
              padding: '10px 22px', minHeight: 140,
            }}>
              <div style={{ display: 'flex', gap: 18, fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute }}>
                <span style={{ color: COLOR.ink, borderBottom: `2px solid ${COLOR.coral}`, paddingBottom: 6 }}>TERMINAL</span>
                <span>PROBLEMS</span>
                <span>OUTPUT</span>
                <span>VALIDATIONS</span>
              </div>
              <div style={{ marginTop: 10, fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkSoft, lineHeight: 1.55 }}>
                {[
                  { t: 0,  ln: <><span style={{ color: COLOR.green }}>$</span> npm test --silent</> },
                  { t: 3,  ln: <span style={{ color: COLOR.inkMute }}>› 24 passing  (1.3s)</span> },
                  { t: 5,  ln: <span style={{ color: COLOR.green }}>● preferences › refuses recipe with member allergy ✓</span> },
                  { t: 6,  ln: <span style={{ color: COLOR.green }}>● preferences › warns on dislike, allows recipe   ✓</span> },
                  { t: 8,  ln: <span style={{ color: COLOR.coral }}>$ git status</span> },
                  { t: 10, ln: <span style={{ color: COLOR.inkMute }}>On branch dev/preferences · 3 files staged</span> },
                ].filter(r => localTime > r.t + 3).map((r, i) => (
                  <div key={i} style={{ animation: 'demoFadeUp 200ms ease-out' }}>{r.ln}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function FileNode({ node }) {
  const indent = 8 + node.depth * 14;
  const isDir = node.kind === 'dir';
  return (
    <div style={{
      padding: `4px 10px 4px ${indent}px`,
      display: 'flex', alignItems: 'center', gap: 7,
      fontFamily: FONT.mono, fontSize: 12.5,
      color: node.active ? COLOR.ink : (isDir ? COLOR.ink : COLOR.inkSoft),
      background: node.active ? COLOR.coralSoft : 'transparent',
      borderRadius: 6, marginBottom: 1,
    }}>
      <span style={{ color: isDir ? COLOR.coral : COLOR.inkMute, width: 14, display: 'inline-block', textAlign: 'center' }}>
        {isDir ? (node.open ? '▾' : '▸') : '·'}
      </span>
      <span>{node.name}</span>
      {node.active && <span style={{ marginLeft: 'auto', color: COLOR.coral }}>●</span>}
    </div>
  );
}

function CodeLine({ line, visible, isLast }) {
  const colorMap = {
    kw: COLOR.coral,
    pr: COLOR.ink,
    cm: COLOR.inkFaint,
    fn: COLOR.amber,
    '':  COLOR.inkSoft,
  };
  const styleColor = colorMap[line.c] || COLOR.inkSoft;
  if (!visible) return (
    <div style={{ display: 'flex', height: 24 }}>
      <span style={{
        width: 52, padding: '0 14px 0 22px', color: COLOR.inkFaint, textAlign: 'right',
        fontFamily: FONT.mono, opacity: 0.4,
      }}>{line.n}</span>
      <span/>
    </div>
  );
  return (
    <div style={{ display: 'flex' }}>
      <span style={{
        width: 52, padding: '0 14px 0 22px', color: COLOR.inkFaint, textAlign: 'right',
        userSelect: 'none',
      }}>{line.n}</span>
      <span style={{ color: styleColor, whiteSpace: 'pre' }}>
        {line.t}
        {isLast && <span style={{
          display: 'inline-block', width: 8, height: '1.1em',
          background: COLOR.coral, marginLeft: 1, verticalAlign: '-0.15em',
          animation: 'demoBlink 0.9s steps(2) infinite',
        }}/>}
      </span>
    </div>
  );
}

// ── DRIFT ───────────────────────────────────────────────────────────────────
function SceneDrift() {
  const { localTime } = useSprite();
  const D = window.DEMO.drift;

  // Beats:
  // 0-2: enter, "Run check" pulses
  // 2-4: bars sweep in
  // 4-8: "8% Healthy" sticks
  // 8-14: finding row appears, AI judge note
  // 14+: caption emphasis

  const sweep = clamp((localTime - 0.5) / 2.5, 0, 1); // 0..1 fills bars
  const headlineOp = clamp((localTime - 2.5) / 0.5, 0, 1);

  return (
    <AppFrame active="drift" projectName="symphony-demo" runtimes="4 / 5 runtimes">
      <div style={{ position: 'absolute', inset: 0, padding: '24px 32px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT.serif, fontSize: 36, color: COLOR.ink, letterSpacing: '-0.01em' }}>Drift Monitor</div>
            <div style={{ marginTop: 6, fontSize: 13, color: COLOR.inkMute }}>
              Compares the team's work against the founding docs every minute and on every task event.
            </div>
          </div>
          <button style={{
            ...primaryBtn(),
            background: COLOR.bg2, color: COLOR.ink,
            border: `1px solid ${COLOR.hair2}`,
            boxShadow: localTime < 1.5 ? `0 0 0 4px ${COLOR.coralSoft}` : 'none',
            transition: 'box-shadow 300ms',
          }}>↻ Run check</button>
        </div>

        {/* Score + spark */}
        <div style={{ marginTop: 38, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, alignItems: 'center' }}>
          <div>
            <div style={labelStyle()}>TEAM DRIFT</div>
            <div style={{
              fontFamily: FONT.serif, fontSize: 160, color: COLOR.green,
              lineHeight: 1, marginTop: 6, letterSpacing: '-0.04em',
              opacity: headlineOp, transform: `translateY(${(1 - headlineOp) * 12}px)`,
            }}>
              {Math.floor(D.score * Easing.easeOutCubic(clamp((localTime - 1.5) / 1.5, 0, 1)))}%
            </div>
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 14, color: COLOR.green,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLOR.green }}/>
              {D.label}
            </div>
          </div>

          <div style={{ paddingRight: 20 }}>
            <div style={{
              fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.08em',
              color: COLOR.inkMute, marginBottom: 14, textAlign: 'right',
            }}>
              Last 30 runs · peak 11% · current 8%
            </div>
            <DriftSpark localTime={localTime}/>
          </div>
        </div>

        {/* Category bars */}
        <div style={{ marginTop: 46 }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 22, color: COLOR.ink }}>Category breakdown</div>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {D.categories.map((c, i) => (
              <DriftBar key={i} cat={c} reveal={clamp(sweep * D.categories.length - i, 0, 1)}/>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div style={{ marginTop: 36 }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 22, color: COLOR.ink }}>All findings (1)</div>
          {localTime > 8 && (
            <div style={{
              marginTop: 14, padding: '14px 16px',
              background: COLOR.panel, border: `1px solid ${COLOR.hair2}`,
              borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14,
              animation: 'demoFadeUp 360ms ease-out',
            }}>
              <span style={{
                padding: '4px 10px', borderRadius: 6,
                background: 'oklch(74% 0.150 80 / 0.18)',
                color: COLOR.amber, fontFamily: FONT.mono, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.06em',
              }}>{D.finding.severity}</span>
              <span style={{
                padding: '4px 10px', borderRadius: 6,
                background: COLOR.bg3, color: COLOR.inkSoft, fontFamily: FONT.mono, fontSize: 11,
              }}>{D.finding.source}</span>
              <span style={{ flex: 1, fontSize: 14, color: COLOR.ink }}>{D.finding.title}</span>
              <span style={{
                fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute,
              }}>{D.finding.tag}</span>
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}

function DriftBar({ cat, reveal }) {
  const width = cat.pct * Easing.easeOutCubic(reveal);
  const isHealthy = cat.pct >= 95;
  const fg = isHealthy ? COLOR.green : COLOR.amber;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 160, fontSize: 14, color: COLOR.ink }}>{cat.name}</div>
      <div style={{
        flex: 1, height: 12, background: COLOR.bg3, borderRadius: 6,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${width}%`,
          background: fg, borderRadius: 6,
          boxShadow: `0 0 16px ${fg}`,
        }}/>
      </div>
      <div style={{ width: 56, fontFamily: FONT.mono, fontSize: 13, color: fg, textAlign: 'right' }}>
        {Math.floor(width)}%
      </div>
    </div>
  );
}

function DriftSpark({ localTime }) {
  // Simulated 30-run sparkline. Pre-baked values + animated draw.
  const pts = [9,10,8,11,9,10,8,7,9,10,11,9,8,9,10,11,10,9,8,9,10,11,9,10,11,10,9,10,9,8];
  const w = 600, h = 90;
  const max = 14;
  const stepX = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${h - (p / max) * h}`).join(' ');
  const draw = clamp((localTime - 0.5) / 2, 0, 1);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="driftFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor={COLOR.green} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={COLOR.green} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#driftFill)"
        style={{ opacity: draw, transition: 'opacity 400ms' }}/>
      <path d={path} fill="none" stroke={COLOR.green} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: 2000 * (1 - draw),
          transition: 'stroke-dashoffset 400ms',
        }}/>
    </svg>
  );
}

Object.assign(window, { SceneTasks, SceneCode, SceneDrift });
