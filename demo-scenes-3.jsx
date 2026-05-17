// Tasks board + Code + Drift scenes (v2 — matches new Symphony UI)

// ── TASKS BOARD ─────────────────────────────────────────────────────────────
function SceneTasks() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  // 22s scene. Cards animate across columns over the first 15s.
  function statusFor(t) {
    if (t.id === 'FMP-001') {
      if (localTime > 16) return 'done';
      if (localTime > 11) return 'review';
      return 'in_progress';
    }
    if (t.id === 'FMP-002') {
      if (localTime > 13) return 'done';
      if (localTime > 7)  return 'in_progress';
      return 'review';
    }
    if (t.id === 'FMP-003') {
      if (localTime > 4) return 'in_progress';
      return 'todo';
    }
    return t.status;
  }

  const columns = [
    { id: 'todo',        title: 'TO DO',        glyph: '≡', color: COLOR.inkMute },
    { id: 'in_progress', title: 'IN PROGRESS',  glyph: '▷', color: COLOR.coral },
    { id: 'review',      title: 'REVIEW',       glyph: '◐', color: COLOR.blue },
    { id: 'done',        title: 'DONE',         glyph: '✓', color: COLOR.green },
  ];

  return (
    <AppFrame
      active="tasks" projectName="family-meal-planner"
      runtimes="4/4" driftPct="0%" agentsRunning={4} taskBadge={5}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: FONT.serif, fontSize: 38, color: COLOR.ink, letterSpacing: '-0.01em', display: 'flex', alignItems: 'baseline', gap: 12 }}>
              Tasks
              <span style={{ fontSize: 16, color: COLOR.inkMute, fontFamily: FONT.mono }}>· family-meal-planner</span>
            </div>
            <div style={{ marginTop: 4, fontSize: 13, color: COLOR.inkMute, fontFamily: FONT.mono }}>
              <TaskHeaderCounts localTime={localTime} statusFor={statusFor}/>
            </div>
          </div>
          <div style={{ flex: 1 }}/>

          <div style={{ width: 240, height: 38, padding: '0 12px',
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 9,
            display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: COLOR.inkMute,
          }}>
            <SearchGlyph/> Search tasks…
          </div>
          {/* Group-by tabs */}
          <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <span style={{ color: COLOR.ink, fontWeight: 500, borderBottom: `2px solid ${COLOR.coral}`, paddingBottom: 4 }}>Status</span>
            <span style={{ color: COLOR.inkMute, paddingBottom: 4 }}>Assignee</span>
            <span style={{ color: COLOR.inkMute, paddingBottom: 4 }}>Type</span>
            <span style={{ color: COLOR.inkMute, paddingBottom: 4 }}>Risk</span>
          </div>
          <div style={{ display: 'flex', height: 38, padding: 2, gap: 2, background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 9 }}>
            <span style={{ padding: '6px 12px', borderRadius: 7, background: COLOR.bg3, color: COLOR.ink, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: FONT.mono }}>▤</span> Kanban
            </span>
            <span style={{ padding: '6px 12px', borderRadius: 7, color: COLOR.inkMute, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: FONT.mono }}>≡</span> List
            </span>
          </div>
          <button style={{ ...primaryBtn() }}>+ New task</button>
        </div>

        {/* All / Active / Review tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
          <span style={{
            padding: '7px 14px', borderRadius: 999,
            background: COLOR.coralSoft, color: COLOR.coral, fontSize: 13, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>All <span style={{ padding: '0 7px', background: COLOR.coralSoft, borderRadius: 999, fontFamily: FONT.mono, fontSize: 11 }}>5</span></span>
          <span style={{ padding: '7px 14px', color: COLOR.inkMute, fontSize: 13, display: 'inline-flex', gap: 8 }}>
            Active <span style={{ padding: '0 7px', background: COLOR.bg3, borderRadius: 999, fontFamily: FONT.mono, fontSize: 11 }}>5</span>
          </span>
          <span style={{ padding: '7px 14px', color: COLOR.inkMute, fontSize: 13, display: 'inline-flex', gap: 8 }}>
            In review <span style={{ padding: '0 7px', background: COLOR.bg3, borderRadius: 999, fontFamily: FONT.mono, fontSize: 11 }}>1</span>
          </span>
        </div>

        {/* Quick add */}
        <div style={{
          marginTop: 6, marginBottom: 18,
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14,
          background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 10,
        }}>
          <span style={{ color: COLOR.inkFaint, fontSize: 18 }}>+</span>
          <span style={{ flex: 1, color: COLOR.inkMute, fontSize: 14 }}>Add task — title and press Enter</span>
          <button style={{
            padding: '6px 14px', borderRadius: 7, background: COLOR.bg3, color: COLOR.inkMute,
            border: 'none', fontSize: 13, fontFamily: FONT.sans,
          }}>Add</button>
          <span style={{ fontSize: 12, color: COLOR.inkFaint, fontFamily: FONT.mono, maxWidth: 260, textAlign: 'right' }}>
            feature · developer · medium priority. Use + New<br/>task for full options.
          </span>
        </div>

        {/* Columns */}
        <div style={{
          flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18,
          minHeight: 0, overflow: 'hidden',
        }}>
          {columns.map(col => {
            const inCol = D.tasks.filter(t => statusFor(t) === col.id);
            return (
              <div key={col.id} style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 12px',
                }}>
                  <span style={{
                    fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.14em',
                    color: col.color, fontWeight: 700,
                  }}>{col.glyph} {col.title}</span>
                  <div style={{ flex: 1 }}/>
                  <span style={{ fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkMute }}>{inCol.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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

function TaskHeaderCounts({ localTime, statusFor }) {
  const D = window.DEMO;
  const total = D.tasks.length;
  const inFlight = D.tasks.filter(t => statusFor(t) === 'in_progress').length;
  const inReview = D.tasks.filter(t => statusFor(t) === 'review').length;
  return <span>{total} total · {inFlight} in flight · {inReview} in review</span>;
}

function KanbanCard({ task, status }) {
  const D = window.DEMO;
  const member = D.team.find(m => m.id === task.owner);
  const tone = member?.tone || 'coral';
  const fg = ({ coral: COLOR.coral, coralDeep: COLOR.coralDeep, blue: COLOR.blue, plum: COLOR.plum })[tone];
  return (
    <div style={{
      padding: '14px 14px',
      background: status === 'done' ? COLOR.greenSoft : COLOR.panel,
      border: `1px solid ${status === 'done' ? COLOR.greenSoft : COLOR.hair2}`,
      borderRadius: 10,
      transition: 'background 300ms, border-color 300ms, transform 300ms',
    }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 11, color: COLOR.inkFaint, letterSpacing: '0.06em' }}>
        {task.id}
      </div>
      <div style={{
        marginTop: 6, fontSize: 14.5, lineHeight: 1.4,
        color: status === 'done' ? COLOR.inkSoft : COLOR.ink,
        textDecoration: status === 'done' ? 'line-through' : 'none',
        textDecorationColor: COLOR.inkMute,
      }}>{task.title}</div>
    </div>
  );
}

// ── CODE SCENE ──────────────────────────────────────────────────────────────
function SceneCode() {
  const { localTime } = useSprite();
  const D = window.DEMO;

  return (
    <AppFrame
      active="code" projectName="family-meal-planner"
      runtimes="4/4" driftPct="0%" agentsRunning={4} taskBadge={5}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '20px 28px', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 18 }}>
          <div>
            <div style={labelStyle()}>ORCHESTRATOR IDE</div>
            <div style={{ marginTop: 4, fontFamily: FONT.serif, fontSize: 34, color: COLOR.ink, letterSpacing: '-0.01em' }}>Code</div>
            <div style={{ marginTop: 4, fontFamily: FONT.mono, fontSize: 12, color: COLOR.inkMute }}>
              C:\SymphonyDemo\family-meal-planner
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{
            width: 220, height: 36, padding: '0 12px',
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 12, fontFamily: FONT.mono, color: COLOR.ink,
          }}>
            <span>family-meal-planner</span>
            <span style={{ color: COLOR.inkMute }}>▾</span>
          </div>
          <button style={ghostBtn()}><FolderGlyph/> Open folder</button>
          <div style={{
            width: 220, height: 36, padding: '0 12px',
            background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 12, fontFamily: FONT.mono, color: COLOR.ink,
          }}>
            <span>Project root</span>
            <span style={{ color: COLOR.inkMute }}>▾</span>
          </div>
          <button style={ghostBtn()}>⟳ Refresh</button>
        </div>

        <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
          {/* Explorer */}
          <div style={{ width: 360, flexShrink: 0, paddingRight: 18, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{
                padding: '8px 18px', borderRadius: 9,
                background: COLOR.coral, color: '#1c1109',
                fontSize: 13, fontWeight: 600,
              }}>Explorer</span>
              <span style={{
                padding: '8px 18px', borderRadius: 9,
                color: COLOR.inkMute, fontSize: 13, fontWeight: 500,
              }}>Search</span>
            </div>

            <div style={{
              marginTop: 12, height: 36, padding: '0 12px',
              background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, borderRadius: 8,
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: COLOR.inkMute,
            }}>
              <SearchGlyph/> Filter files…
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button style={{ flex: 1, padding: '7px 0', borderRadius: 8, background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, color: COLOR.ink, fontSize: 12, fontFamily: FONT.sans }}>Expand all</button>
              <button style={{ flex: 1, padding: '7px 0', borderRadius: 8, background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`, color: COLOR.ink, fontSize: 12, fontFamily: FONT.sans }}>Collapse all</button>
            </div>

            <div style={{ marginTop: 12, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <FileTree localTime={localTime}/>
            </div>
          </div>

          {/* Open file area */}
          <div style={{
            flex: 1, minHeight: 0,
            border: `1px dashed ${COLOR.hair2}`, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{ textAlign: 'center', color: COLOR.inkMute, fontSize: 16, fontFamily: FONT.sans }}>
              Select a file to open a tab.
            </div>
            {localTime > 7 && <CodePreviewCard localTime={localTime - 7}/>}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function FileTree({ localTime }) {
  const D = window.DEMO;
  // Reveal nodes one-by-one for a soft growing tree feel.
  const visibleCount = Math.min(D.fileTree.length, Math.floor(localTime * 6));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {D.fileTree.slice(0, visibleCount).map((node, i) => {
        const indent = node.depth * 18;
        const isDir = node.kind === 'dir';
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: `4px 8px 4px ${8 + indent}px`,
            borderRadius: 6,
            fontFamily: FONT.mono, fontSize: 13,
            color: COLOR.inkSoft,
          }}>
            {isDir ? (
              <span style={{ color: COLOR.coral, width: 14, display: 'inline-block', textAlign: 'center' }}>
                {node.open ? 'v' : '>'}
              </span>
            ) : (
              <span style={{ width: 14 }}/>
            )}
            <span style={{ color: COLOR.inkMute }}>{isDir ? '🗀' : '📄'}</span>
            <span style={{ color: isDir ? COLOR.ink : COLOR.inkSoft }}>{node.name}</span>
            {node.size && <span style={{ marginLeft: 'auto', color: COLOR.inkFaint, fontSize: 11 }}>{node.size}</span>}
          </div>
        );
      })}
    </div>
  );
}

function CodePreviewCard({ localTime }) {
  // Floating preview that appears after some time, hinting at what an agent
  // would open. Adds visual interest beyond the empty editor pane.
  const op = clamp(localTime / 0.5, 0, 1);
  return (
    <div style={{
      position: 'absolute', right: 40, bottom: 40,
      width: 420, padding: '16px 18px',
      background: COLOR.panel, border: `1px solid ${COLOR.hair3}`, borderRadius: 12,
      boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
      opacity: op, transform: `translateY(${(1 - op) * 12}px)`,
      fontFamily: FONT.mono, fontSize: 12.5, color: COLOR.inkSoft,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={pillStyle(COLOR.coralSoft, COLOR.coral)}>● developer just touched</span>
        <span style={{ flex: 1 }}/>
        <span style={{ color: COLOR.inkMute, fontSize: 11 }}>just now</span>
      </div>
      <div style={{ color: COLOR.ink, marginBottom: 8, fontWeight: 600 }}>
        src/domain/preferences.ts
      </div>
      <div style={{ color: COLOR.inkMute, lineHeight: 1.7 }}>
        <span style={{ color: COLOR.coral }}>export const</span> preferenceRules <span style={{ color: COLOR.coral }}>=</span> {'{'}<br/>
        &nbsp;&nbsp;allergiesAreHardBlocks: <span style={{ color: COLOR.green }}>true</span>,<br/>
        &nbsp;&nbsp;dislikesAreWarnings: <span style={{ color: COLOR.green }}>true</span>,<br/>
        {'};'}
      </div>
    </div>
  );
}

// ── DRIFT MONITOR ───────────────────────────────────────────────────────────
function SceneDrift() {
  const { localTime } = useSprite();

  // Beats (16s scene):
  //  0   enter
  //  0.5 Run check pulses
  //  1.0 score animates 0→0 (it's already 0), sparkline draws
  //  2.0 category bars sweep
  //  9   findings section
  // 12+  emphasize "healthy" feel

  const headlineOp = clamp((localTime - 0.6) / 0.5, 0, 1);
  const sweep = clamp((localTime - 1.5) / 2.2, 0, 1);

  return (
    <AppFrame
      active="drift" projectName="family-meal-planner"
      runtimes="4/4" driftPct="0%" agentsRunning={4} taskBadge={5}
    >
      <div style={{ position: 'absolute', inset: 0, padding: '24px 32px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT.serif, fontSize: 40, color: COLOR.ink, letterSpacing: '-0.01em' }}>
              Drift Monitor
            </div>
            <div style={{ marginTop: 6, fontSize: 14, color: COLOR.inkMute, maxWidth: 700 }}>
              Compares the team's work against the founding docs every minute and on every task event.
            </div>
          </div>
          <button style={{
            ...ghostBtn(),
            boxShadow: localTime < 1.5 ? `0 0 0 4px ${COLOR.coralSoft}` : 'none',
            transition: 'box-shadow 300ms',
          }}>⟳ Run check</button>
        </div>

        {/* Score + sparkline */}
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '320px 1fr', gap: 36, alignItems: 'center' }}>
          <div>
            <div style={labelStyle()}>TEAM DRIFT</div>
            <div style={{
              fontFamily: FONT.serif, fontSize: 168, color: COLOR.green,
              lineHeight: 1, marginTop: 6, letterSpacing: '-0.04em',
              opacity: headlineOp, transform: `translateY(${(1 - headlineOp) * 12}px)`,
            }}>0%</div>
            <div style={{
              marginTop: 10, display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 15, color: COLOR.green,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: COLOR.green }}/>
              Healthy
            </div>
          </div>
          <div style={{ paddingRight: 20 }}>
            <div style={{
              fontFamily: FONT.mono, fontSize: 11, letterSpacing: '0.1em',
              color: COLOR.inkMute, marginBottom: 14, textAlign: 'right',
            }}>
              Last 2 runs · peak 0% · current 0%
            </div>
            <DriftSpark localTime={localTime}/>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginTop: 48 }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 24, color: COLOR.ink }}>Category breakdown</div>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Architecture','Checklist','Slice Scope','Test Truth','Risk'].map((name, i) => (
              <DriftBar key={i} name={name} reveal={clamp(sweep * 5 - i, 0, 1)}/>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div style={{ marginTop: 36 }}>
          <div style={{ fontFamily: FONT.serif, fontSize: 22, color: COLOR.ink, display: 'flex', alignItems: 'center', gap: 12 }}>
            All findings <span style={{ fontSize: 17, color: COLOR.inkMute, fontFamily: FONT.mono }}>(0)</span>
          </div>
          {localTime > 9 && (
            <div style={{
              marginTop: 14, padding: '16px 20px',
              background: COLOR.bg2, border: `1px solid ${COLOR.hair2}`,
              borderRadius: 10, fontSize: 14, color: COLOR.inkMute,
              display: 'flex', alignItems: 'center', gap: 10,
              animation: 'demoFadeUp 360ms ease-out',
            }}>
              <span style={{ color: COLOR.green }}>✓</span>
              No findings match this filter — the team is aligned with the spec.
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}

function DriftBar({ name, reveal }) {
  const fg = COLOR.green;
  const width = 100 * Easing.easeOutCubic(reveal);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 180, fontSize: 14, color: COLOR.ink }}>{name}</div>
      <div style={{
        flex: 1, height: 14, background: COLOR.bg3, borderRadius: 7,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${width}%`, background: fg, borderRadius: 7,
          boxShadow: `0 0 14px ${fg}`,
        }}/>
      </div>
      <div style={{ width: 56, fontFamily: FONT.mono, fontSize: 13, color: fg, textAlign: 'right' }}>
        {Math.floor(width)}%
      </div>
    </div>
  );
}

function DriftSpark({ localTime }) {
  // Two-run sparkline showing 0% twice (flat line at the bottom)
  const w = 800, h = 80;
  const pts = [3, 2];
  const stepX = w / (pts.length - 1);
  const maxY = 10;
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${h - (p / maxY) * h}`).join(' ');
  const draw = clamp((localTime - 0.5) / 2.5, 0, 1);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <path d={path} fill="none" stroke={COLOR.coral} strokeWidth="2.2"
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
