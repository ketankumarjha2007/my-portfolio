import { useEffect, useRef, useState } from "react";
import "./Livestats.css";
import { PROFILES, profileUrl } from "./Profiles";

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */

const TTL = 30 * 60 * 1000; // cache lifetime: 30 minutes

const PLATFORMS = [
  { id: "github", name: "GitHub", mark: "GH", kicker: "OPEN SOURCE", acc: "#c8ff55", cls: "lv-wide" },
  { id: "leetcode", name: "LeetCode", mark: "LC", kicker: "PROBLEM SOLVING", acc: "#ffa116" },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const num = (v) => {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return v !== null && v !== undefined && v !== "" && Number.isFinite(n) ? n : null;
};

const fmt = (n) => (n === null || n === undefined ? "—" : new Intl.NumberFormat("en-IN").format(n));

const readCache = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const writeCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / blocked: ignore */
  }
};

async function getJSON(url, timeout = 9000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

const timeAgo = (ts) => {
  const s = (Date.now() - ts) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function calcStreak(days) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else if (i === days.length - 1) continue; // today may still be empty
    else break;
  }
  return streak;
}

/* ------------------------------------------------------------------ */
/*  LOADERS  (browser → public APIs, no backend)                       */
/* ------------------------------------------------------------------ */

async function loadGithub(u) {
  const [user, repos, cal] = await Promise.all([
    getJSON(`https://api.github.com/users/${u}`),
    getJSON(`https://api.github.com/users/${u}/repos?per_page=100&sort=pushed`).catch(() => []),
    getJSON(`https://github-contributions-api.jogruber.de/v4/${u}?y=last`).catch(() => null),
  ]);

  const list = Array.isArray(repos) ? repos : [];
  const stars = list.reduce((s, r) => s + (r.stargazers_count || 0), 0);

  const langCount = {};
  list.filter((r) => !r.fork && r.language).forEach((r) => {
    langCount[r.language] = (langCount[r.language] || 0) + 1;
  });
  const langs = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const days = Array.isArray(cal?.contributions) ? cal.contributions : [];
  const total =
    cal?.total?.lastYear ??
    (cal?.total ? Object.values(cal.total)[0] : null) ??
    (days.length ? days.reduce((s, d) => s + d.count, 0) : null);

  return {
    repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    langs,
    since: new Date(user.created_at).getFullYear(),
    contributions: total,
    streak: days.length ? calcStreak(days) : null,
    days,
  };
}

const normLeetcode = (d) => {
  if (!d || d.status === "error") throw new Error("bad response");
  const total = num(d.totalSolved ?? d.solvedProblem);
  if (total === null) throw new Error("bad response");
  return {
    total,
    easy: num(d.easySolved) ?? 0,
    medium: num(d.mediumSolved) ?? 0,
    hard: num(d.hardSolved) ?? 0,
    totalQ: num(d.totalQuestions),
    ranking: num(d.ranking),
    acceptance: num(d.acceptanceRate),
  };
};

// race several community mirrors; first valid answer wins
function loadLeetcode(u) {
  const name = encodeURIComponent(u);
  return Promise.any([
    getJSON(`https://leetcode-stats.tashif.codes/${name}`).then(normLeetcode),
    getJSON(`https://leetcode-stats-api.herokuapp.com/${name}`).then(normLeetcode),
    getJSON(`https://alfa-leetcode-api.onrender.com/${name}/solved`, 15000).then(normLeetcode),
  ]);
}

const LOADERS = {
  github: loadGithub,
  leetcode: loadLeetcode,
};

/* ------------------------------------------------------------------ */
/*  HOOK: stale-while-revalidate with localStorage                     */
/* ------------------------------------------------------------------ */

function useLive(id, username, tick) {
  const key = `cp:v1:${id}:${username}`;

  const [state, setState] = useState(() => {
    if (!username) return { status: "off" };
    const c = readCache(key);
    return c ? { status: "cached", data: c.data, ts: c.ts } : { status: "loading" };
  });

  useEffect(() => {
    if (!username) return undefined;
    let dead = false;
    const c = readCache(key);

    if (c && tick === 0 && Date.now() - c.ts < TTL) {
      setState({ status: "live", data: c.data, ts: c.ts });
      return undefined;
    }

    setState((p) => (p.data ? { ...p, status: "refreshing" } : { status: "loading" }));

    LOADERS[id](username)
      .then((data) => {
        if (dead) return;
        const ts = Date.now();
        writeCache(key, { data, ts });
        setState({ status: "live", data, ts });
      })
      .catch(() => {
        if (dead) return;
        setState((p) => (p.data ? { ...p, status: "cached" } : { status: "error" }));
      });

    return () => {
      dead = true;
    };
  }, [id, key, username, tick]);

  return state;
}

/* ------------------------------------------------------------------ */
/*  SMALL UI PIECES                                                    */
/* ------------------------------------------------------------------ */

function CountUp({ value, duration = 1100 }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (value === null || value === undefined) return undefined;
    if (reducedMotion()) {
      setV(value);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setV(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{value === null || value === undefined ? "—" : fmt(v)}</>;
}

function Badge({ status, ts }) {
  const map = {
    loading: ["SYNCING", "sync"],
    refreshing: ["SYNCING", "sync"],
    live: [`LIVE${ts ? ` · ${timeAgo(ts)}` : ""}`, "live"],
    cached: [`CACHED${ts ? ` · ${timeAgo(ts)}` : ""}`, "cached"],
    error: ["OFFLINE", "error"],
    off: ["SOON", "off"],
  };
  const [label, cls] = map[status] || map.off;
  return (
    <span className={`lv-badge ${cls}`}>
      <i />
      {label}
    </span>
  );
}

function Skeleton({ rows = 3 }) {
  return (
    <div className="lv-skel" aria-hidden="true">
      <span className="sk big" />
      {Array.from({ length: rows }).map((_, i) => (
        <span key={i} className="sk" style={{ width: `${88 - i * 14}%` }} />
      ))}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="lv-stat">
      <strong>
        <CountUp value={value} />
      </strong>
      <span>{label}</span>
    </div>
  );
}

function Bar({ label, value, max, color }) {
  const pct = max ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="lv-bar-row">
      <span>{label}</span>
      <div className="lv-bar">
        <i style={{ width: `${Math.max(pct, value ? 3 : 0)}%`, background: color }} />
      </div>
      <b>{fmt(value)}</b>
    </div>
  );
}

function Heatmap({ days }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [days.length]);

  if (!days.length) return null;
  const lead = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(lead).fill(null), ...days];

  return (
    <div className="lv-heat" ref={ref}>
      <div className="lv-heat-grid" role="img" aria-label="GitHub contributions over the last year">
        {cells.map((d, i) =>
          d ? (
            <i
              key={d.date}
              className={`c l${d.level}`}
              title={`${d.count} contribution${d.count === 1 ? "" : "s"} · ${d.date}`}
            />
          ) : (
            <i key={`p${i}`} className="c pad" />
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARD BODIES                                                        */
/* ------------------------------------------------------------------ */

function GithubBody({ d }) {
  const maxLang = d.langs[0]?.count || 1;
  return (
    <>
      <div className="lv-stats4">
        <Stat label="Contributions · 12 mo" value={d.contributions} />
        <Stat label="Public repos" value={d.repos} />
        <Stat label="Stars earned" value={d.stars} />
        <Stat label="Followers" value={d.followers} />
      </div>

      <Heatmap days={d.days} />

      <div className="lv-foot-row">
        <div className="lv-legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <i key={l} className={`c l${l}`} />
          ))}
          More
        </div>
        {d.streak !== null && <span className="lv-pill">🔥 {d.streak}-day streak</span>}
        <span className="lv-pill">On GitHub since {d.since}</span>
      </div>

      {d.langs.length > 0 && (
        <div className="lv-langs">
          {d.langs.map((l) => (
            <span key={l.name} className="lv-lang" style={{ "--w": `${(l.count / maxLang) * 100}%` }}>
              {l.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function LeetcodeBody({ d }) {
  const totalQ = d.totalQ || 3500;
  const ratio = Math.min(d.total / totalQ, 1);
  const C = 2 * Math.PI * 46;
  const maxDiff = Math.max(d.easy, d.medium, d.hard, 1);
  return (
    <>
      <div className="lv-ring-row">
        <div className="lv-ring">
          <svg viewBox="0 0 108 108" aria-hidden="true">
            <circle cx="54" cy="54" r="46" className="track" />
            <circle
              cx="54"
              cy="54"
              r="46"
              className="val"
              strokeDasharray={C}
              style={{ "--off": C * (1 - ratio), "--full": C }}
            />
          </svg>
          <div>
            <strong>
              <CountUp value={d.total} />
            </strong>
            <span>solved</span>
          </div>
        </div>

        <div className="lv-bars">
          <Bar label="Easy" value={d.easy} max={maxDiff} color="#00b8a3" />
          <Bar label="Medium" value={d.medium} max={maxDiff} color="#ffc01e" />
          <Bar label="Hard" value={d.hard} max={maxDiff} color="#ff375f" />
        </div>
      </div>

      <div className="lv-meta">
        {d.ranking !== null && (
          <span>
            <small>GLOBAL RANK</small>
            <b>#{fmt(d.ranking)}</b>
          </span>
        )}
        {d.acceptance !== null && (
          <span>
            <small>ACCEPTANCE</small>
            <b>{d.acceptance.toFixed(1)}%</b>
          </span>
        )}
      </div>
    </>
  );
}

const BODIES = {
  github: GithubBody,
  leetcode: LeetcodeBody,
};

/* ------------------------------------------------------------------ */
/*  CARD SHELL                                                         */
/* ------------------------------------------------------------------ */

function Card({ p, state, href, children }) {
  const status = state.status;

  return (
    <article className={`lv-card lv-${p.id} ${p.cls || ""}`} style={{ "--acc": p.acc }} data-reveal>
      <header className="lv-card-head">
        <span className="lv-logo">{p.mark}</span>
        <div className="lv-title">
          <h3>{p.name}</h3>
          <span>{p.kicker}</span>
        </div>
        <Badge status={status} ts={state.ts} />
      </header>

      <div className="lv-card-body">
        {(status === "loading" || (status === "refreshing" && !state.data)) && <Skeleton />}
        {status === "error" && (
          <p className="lv-note">
            Couldn&apos;t reach {p.name} right now. Open the profile to see the latest numbers.
          </p>
        )}
        {state.data && children}
      </div>

      {href && (
        <a className="lv-link" href={href} target="_blank" rel="noreferrer">
          View profile <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

function LiveStats() {
  const [tick, setTick] = useState(0);

  const states = {
    github: useLive("github", PROFILES.github.username, tick),
    leetcode: useLive("leetcode", PROFILES.leetcode.username, tick),
  };

  const syncing = Object.values(states).some((s) => s.status === "loading" || s.status === "refreshing");
  const lastTs = Math.max(0, ...Object.values(states).map((s) => s.ts || 0));

  return (
    <>
      <div className="lv-head" data-reveal>
        <h2 className="section-title">
          Live from <span>the source.</span>
        </h2>

        <div className="lv-head-side">
          <p>
            Real numbers from the platforms I practise on, pulled straight into your browser. No
            screenshots, no stale badges.
          </p>
          <div className="lv-tools">
            <button
              type="button"
              className={`lv-refresh ${syncing ? "spin" : ""}`}
              onClick={() => setTick((t) => t + 1)}
              disabled={syncing}
            >
              <span aria-hidden="true">↻</span> {syncing ? "Syncing…" : "Refresh"}
            </button>
            <span className="lv-sync">
              {lastTs ? `LAST SYNC · ${timeAgo(lastTs).toUpperCase()}` : "WAITING FOR DATA"}
            </span>
          </div>
        </div>
      </div>

      <div className="lv-summary" data-reveal>
        <div className="lv-sum">
          <small>LEETCODE SOLVED</small>
          <strong>
            <CountUp value={states.leetcode.data?.total ?? null} />
          </strong>
          <span>problems and counting</span>
        </div>
        <div className="lv-sum">
          <small>CONTRIBUTIONS</small>
          <strong>
            <CountUp value={states.github.data?.contributions ?? null} />
          </strong>
          <span>on GitHub, last 12 months</span>
        </div>
        <div className="lv-sum">
          <small>PUBLIC REPOS</small>
          <strong>
            <CountUp value={states.github.data?.repos ?? null} />
          </strong>
          <span>open-source builds</span>
        </div>
        <div className="lv-sum">
          <small>CURRENT STREAK</small>
          <strong>
            <CountUp value={states.github.data?.streak ?? null} />
            <em>d</em>
          </strong>
          <span>days in a row on GitHub</span>
        </div>
      </div>

      <div className="lv-grid">
        {PLATFORMS.map((p) => {
          const Body = BODIES[p.id];
          const st = states[p.id];
          const href = PROFILES[p.id]?.username ? profileUrl[p.id](PROFILES[p.id].username) : null;
          return (
            <Card key={p.id} p={p} state={st} href={href}>
              {st.data && <Body d={st.data} />}
            </Card>
          );
        })}
      </div>

      <p className="lv-footnote" data-reveal>
        Fetched live in your browser from public APIs and cached for 30 minutes. If a source is down,
        the last known numbers are shown.
      </p>
    </>
  );
}

export default LiveStats;