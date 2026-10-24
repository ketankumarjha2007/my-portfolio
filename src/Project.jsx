import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import "./Project.css";

const GITHUB = "https://github.com/ketankumarjha2007";

/*
  Add a screenshot to any project by setting `image` (e.g. "/projects/vasudha.png").
  When it is empty, a drawn preview of the product is shown instead.
*/
const projects = [
  {
    id: "carbontrack",
    title: "VASUDHA",
    category: "Full Stack",
    type: "Environmental intelligence",
    description:
      "A sustainability platform for tracking carbon emissions, monitoring air quality, exploring environmental analytics, and encouraging greener habits.",
    tech: ["React", "Node.js", "MongoDB", "Firebase", "Charts"],
    repo: `${GITHUB}/Carbon_Footprint`,
    live: "https://carbon-footprint-three-psi.vercel.app/",
    status: "Live demo",
    accent: "green",
    image: "",
  },
  {
    id: "reroute",
    title: "ReRoute 2.0",
    category: "Full Stack",
    type: "Intelligent itinerary optimization",
    description:
      "A route-planning experience that balances travel time, cost, and carbon impact while helping users understand itinerary constraints and alternatives.",
    tech: ["React", "JavaScript", "Node.js", "Optimization", "SQLite"],
    repo: `${GITHUB}/ReRoute-2.0`,
    live: "https://re-route-2-0.vercel.app/",
    status: "Live demo",
    accent: "blue",
    image: "",
  },
  {
    id: "campussetu",
    title: "CampusSetu",
    category: "Mobile",
    type: "Campus complaint management",
    description:
      "A role-based campus platform connecting students, teachers, cluster heads, and administrators for complaint submission, tracking, and resolution workflows.",
    tech: ["React Native", "Expo", "Express", "MongoDB", "Firebase"],
    repo: `${GITHUB}/CampusSetu`,
    live: "",
    status: "Source available",
    accent: "purple",
    preview: "phone",
    image: "",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    category: "Frontend",
    type: "Personal brand and developer showcase",
    description:
      "A responsive developer portfolio designed to present projects, technical skills, and coding profiles through a polished, interactive interface.",
    tech: ["React", "Vite", "JavaScript", "CSS", "React Router"],
    repo: `${GITHUB}/my-portfolio`,
    live: "https://my-portfolio-chi-teal-60.vercel.app/",
    status: "Live demo",
    accent: "pink",
    image: "",
  },
];

const ACCENTS = {
  green: { hex: "#7fd99a", rgb: "127, 217, 154" },
  blue: { hex: "#7ba7ff", rgb: "123, 167, 255" },
  purple: { hex: "#b49bff", rgb: "180, 155, 255" },
  pink: { hex: "#ff9ccf", rgb: "255, 156, 207" },
};

const filters = ["All Projects", "Full Stack", "Mobile", "Frontend"];

const ALL_TECH = [...new Set(projects.flatMap((p) => p.tech))];
const LIVE_COUNT = projects.filter((p) => p.live).length;

const countFor = (filter) =>
  filter === "All Projects"
    ? projects.length
    : projects.filter((project) => project.category === filter).length;

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const accentStyle = (accent) => ({
  "--accent": ACCENTS[accent].hex,
  "--accent-rgb": ACCENTS[accent].rgb,
});

const pad = (n) => String(n).padStart(2, "0");

/* ---------------------------------------------------------
   Small pieces
   --------------------------------------------------------- */

function Count({ to, duration = 1300 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      setV(to);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  useEffect(() => {
    if (!go) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, to, duration]);

  return <span ref={ref}>{v}</span>;
}

/* ---------------------------------------------------------
   Drawn product previews (used until a screenshot is added)
   --------------------------------------------------------- */

function VasudhaMock() {
  return (
    <svg className="mock" viewBox="0 0 640 400" role="img" aria-label="Illustration of the VASUDHA emissions dashboard">
      <rect width="640" height="400" className="m-bg" />
      <rect width="112" height="400" className="m-side" />
      <circle cx="30" cy="34" r="9" className="m-acc" />
      <rect x="14" y="76" width="84" height="28" rx="8" className="m-soft" />
      <rect x="26" y="87" width="46" height="6" rx="3" className="m-acc" />
      {[112, 146, 180, 214].map((y, i) => (
        <rect key={y} x="26" y={y + 11} width={[54, 40, 60, 46][i]} height="6" rx="3" className="m-bar" />
      ))}

      <text x="136" y="46" className="m-text" fontSize="18">Emissions overview</text>
      <text x="136" y="65" className="m-muted" fontSize="11">Track, compare and reduce your footprint</text>
      <rect x="514" y="30" width="102" height="30" rx="8" className="m-card" />
      <text x="565" y="49" className="m-muted" fontSize="11" textAnchor="middle">This month</text>

      {[
        ["Transport", 82],
        ["Energy", 56],
        ["Air quality", 100],
      ].map(([label, fill], i) => {
        const x = 136 + i * 166;
        return (
          <g key={label}>
            <rect x={x} y="86" width="148" height="72" rx="12" className="m-card" />
            <text x={x + 14} y="110" className="m-muted" fontSize="11">{label}</text>
            <rect x={x + 14} y="130" width="120" height="7" rx="3.5" className="m-bar" />
            <rect x={x + 14} y="130" width={(120 * fill) / 100} height="7" rx="3.5" className="m-acc" />
          </g>
        );
      })}

      <rect x="136" y="176" width="300" height="200" rx="12" className="m-card" />
      <text x="152" y="202" className="m-text" fontSize="12">Monthly emissions</text>
      {[232, 268, 304, 340].map((y) => (
        <line key={y} x1="152" x2="420" y1={y} y2={y} className="m-grid" />
      ))}
      <path
        d="M152 328 C182 318 198 294 228 298 S274 276 298 264 S348 268 374 242 S408 220 420 214 L420 356 L152 356 Z"
        className="m-soft"
      />
      <path
        d="M152 328 C182 318 198 294 228 298 S274 276 298 264 S348 268 374 242 S408 220 420 214"
        className="m-line-acc"
      />
      <circle cx="420" cy="214" r="9" className="m-soft" />
      <circle cx="420" cy="214" r="4.5" className="m-acc" />

      <rect x="454" y="176" width="162" height="200" rx="12" className="m-card" />
      <text x="470" y="202" className="m-text" fontSize="12">Air quality</text>
      <circle cx="535" cy="268" r="38" className="m-ring" />
      <circle cx="535" cy="268" r="38" className="m-ring-acc" strokeDasharray="150 240" transform="rotate(-90 535 268)" />
      <text x="535" y="273" className="m-text" fontSize="14" textAnchor="middle">Good</text>
      {[324, 342, 360].map((y, i) => (
        <g key={y}>
          <circle cx="472" cy={y} r="3.5" className="m-acc" />
          <rect x="484" y={y - 3} width={[92, 70, 56][i]} height="6" rx="3" className="m-bar" />
        </g>
      ))}
    </svg>
  );
}

function ReRouteMock() {
  const options = [
    ["Fastest", [96, 70, 40]],
    ["Lowest cost", [58, 100, 52]],
    ["Lowest carbon", [74, 64, 100]],
  ];

  return (
    <svg className="mock" viewBox="0 0 640 400" role="img" aria-label="Illustration of the ReRoute route planner">
      <rect width="640" height="400" className="m-bg" />

      <rect x="24" y="20" width="592" height="42" rx="10" className="m-card" />
      <text x="44" y="46" className="m-muted" fontSize="12">Origin</text>
      <path d="M118 41 H152 M146 36 L152 41 L146 46" className="m-line-dim" />
      <text x="170" y="46" className="m-muted" fontSize="12">Destination</text>
      <rect x="520" y="29" width="86" height="24" rx="7" className="m-acc" />
      <text x="563" y="45" className="m-on-acc" fontSize="11" textAnchor="middle">Optimize</text>

      {options.map(([name, bars], i) => {
        const y = 80 + i * 96;
        const selected = i === 2;
        return (
          <g key={name}>
            <rect x="24" y={y} width="206" height="84" rx="12" className={selected ? "m-card-acc" : "m-card"} />
            <text x="40" y={y + 25} className="m-text" fontSize="13">{name}</text>
            {["Time", "Cost", "CO₂"].map((label, j) => (
              <g key={label}>
                <text x="40" y={y + 46 + j * 13} className="m-muted" fontSize="9">{label}</text>
                <rect x="72" y={y + 40 + j * 13} width="140" height="5" rx="2.5" className="m-bar" />
                <rect x="72" y={y + 40 + j * 13} width={(140 * bars[j]) / 100} height="5" rx="2.5" className={selected ? "m-acc" : "m-bar-strong"} />
              </g>
            ))}
          </g>
        );
      })}

      <rect x="246" y="80" width="370" height="276" rx="12" className="m-card" />
      {[300, 360, 420, 480, 540].map((x) => (
        <line key={x} x1={x} x2={x} y1="80" y2="356" className="m-grid" />
      ))}
      {[130, 180, 230, 280, 330].map((y) => (
        <line key={y} x1="246" x2="616" y1={y} y2={y} className="m-grid" />
      ))}
      <path d="M282 322 C330 290 372 322 424 280 S540 214 586 112" className="m-route-alt" />
      <path d="M282 322 C336 322 330 232 398 224 S484 150 522 142 S566 120 586 112" className="m-line-acc heavy" />
      <circle cx="398" cy="224" r="4.5" className="m-acc" />
      <circle cx="522" cy="142" r="4.5" className="m-acc" />
      <circle cx="282" cy="322" r="11" className="m-pin" />
      <text x="282" y="326" className="m-on-acc" fontSize="11" textAnchor="middle">A</text>
      <circle cx="586" cy="112" r="11" className="m-acc" />
      <text x="586" y="116" className="m-on-acc" fontSize="11" textAnchor="middle">B</text>
      <rect x="404" y="164" width="98" height="26" rx="7" className="m-tag" />
      <text x="453" y="181" className="m-text" fontSize="11" textAnchor="middle">Lower carbon</text>
    </svg>
  );
}

function CampusSetuMock() {
  const roles = ["Student", "Teacher", "Cluster head", "Admin"];
  const steps = [
    ["Submitted", "Student files a complaint"],
    ["In review", "Assigned and reviewed"],
    ["Resolved", "Closed with a response"],
  ];
  const items = [
    ["Resolved", 84, 100],
    ["In review", 70, 88],
    ["Submitted", 92, 60],
  ];

  return (
    <svg className="mock" viewBox="0 0 640 400" role="img" aria-label="Illustration of the CampusSetu mobile app">
      {roles.map((role, i) => {
        const y = 92 + i * 52;
        return (
          <g key={role}>
            <path d={`M178 ${y + 18} C208 ${y + 18} 206 200 236 200`} className="m-link" />
            <rect x="40" y={y} width="138" height="36" rx="10" className="m-card" />
            <circle cx="58" cy={y + 18} r="6" className="m-acc" />
            <text x="74" y={y + 22} className="m-text" fontSize="12">{role}</text>
          </g>
        );
      })}

      <rect x="236" y="22" width="168" height="356" rx="28" className="m-phone" />
      <rect x="300" y="33" width="40" height="7" rx="3.5" className="m-bar" />
      <text x="254" y="74" className="m-text" fontSize="14">Complaints</text>
      <text x="254" y="90" className="m-muted" fontSize="10">Student view</text>
      <circle cx="384" cy="72" r="12" className="m-acc" />
      <text x="384" y="77" className="m-on-acc" fontSize="16" textAnchor="middle">+</text>

      {items.map(([status, w1, w2], i) => {
        const y = 108 + i * 68;
        return (
          <g key={status}>
            <rect x="252" y={y} width="136" height="58" rx="10" className="m-card" />
            <rect x="264" y={y + 12} width={w1} height="7" rx="3.5" className="m-bar-strong" />
            <rect x="264" y={y + 25} width={w2 * 0.9} height="5" rx="2.5" className="m-bar" />
            <rect x="264" y={y + 37} width="50" height="12" rx="6" className={i === 0 ? "m-acc" : "m-soft"} />
            <text x="289" y={y + 46} className={i === 0 ? "m-on-acc" : "m-accent-text"} fontSize="8" textAnchor="middle">{status}</text>
          </g>
        );
      })}
      <line x1="252" x2="388" y1="326" y2="326" className="m-grid" />
      {[284, 320, 356].map((x, i) => (
        <circle key={x} cx={x} cy="351" r="5" className={i === 0 ? "m-acc" : "m-bar"} />
      ))}

      <text x="448" y="98" className="m-muted" fontSize="11">Resolution flow</text>
      <line x1="456" x2="456" y1="146" y2="262" className="m-link" />
      {steps.map(([title, sub], i) => {
        const y = 140 + i * 66;
        return (
          <g key={title}>
            <circle cx="456" cy={y} r="8" className={i < 2 ? "m-acc" : "m-pin-ring"} />
            <text x="476" y={y - 1} className="m-text" fontSize="13">{title}</text>
            <text x="476" y={y + 16} className="m-muted" fontSize="10">{sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

function PortfolioMock() {
  return (
    <svg className="mock" viewBox="0 0 640 400" role="img" aria-label="Illustration of the portfolio website">
      <rect width="640" height="400" className="m-bg" />

      <text x="32" y="36" className="m-text" fontSize="20">K.</text>
      <rect x="392" y="27" width="40" height="6" rx="3" className="m-bar" />
      <rect x="448" y="27" width="52" height="6" rx="3" className="m-bar" />
      <rect x="516" y="27" width="44" height="6" rx="3" className="m-bar" />
      <rect x="574" y="18" width="48" height="24" rx="7" className="m-outline-acc" />

      <rect x="32" y="96" width="330" height="28" rx="6" className="m-ink" />
      <rect x="32" y="134" width="248" height="28" rx="6" className="m-acc" />
      <rect x="32" y="186" width="296" height="6" rx="3" className="m-bar" />
      <rect x="32" y="201" width="244" height="6" rx="3" className="m-bar" />
      <rect x="32" y="232" width="108" height="34" rx="9" className="m-ink" />
      <rect x="152" y="232" width="108" height="34" rx="9" className="m-card" />

      <circle cx="500" cy="178" r="88" className="m-soft" />
      <circle cx="500" cy="178" r="58" className="m-card" />
      <text x="500" y="198" className="m-text" fontSize="56" textAnchor="middle">K.</text>

      {[0, 1, 2].map((i) => {
        const x = 32 + i * 204;
        return (
          <g key={i}>
            <rect x={x} y="300" width="180" height="76" rx="12" className="m-card" />
            <rect x={x + 16} y="316" width="24" height="6" rx="3" className="m-acc" />
            <rect x={x + 16} y="332" width="104" height="8" rx="4" className="m-bar-strong" />
            <rect x={x + 16} y="350" width="140" height="5" rx="2.5" className="m-bar" />
          </g>
        );
      })}
    </svg>
  );
}

const MOCKS = {
  carbontrack: VasudhaMock,
  reroute: ReRouteMock,
  campussetu: CampusSetuMock,
  portfolio: PortfolioMock,
};

function Preview({ project }) {
  const Mock = MOCKS[project.id];
  const body = project.image ? (
    <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
  ) : (
    Mock && <Mock />
  );

  if (project.preview === "phone") {
    return <div className="pj-bare">{body}</div>;
  }

  return (
    <div className="pj-frame">
      <div className="pj-frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="pj-frame-url">
          {project.live ? host(project.live) : "github.com/ketankumarjha2007"}
        </span>
      </div>
      <div className="pj-frame-body">{body}</div>
    </div>
  );
}

/* ---------------------------------------------------------
   Case study card
   --------------------------------------------------------- */

function Case({ project, index, total, flip }) {
  const Media = project.live ? "a" : "div";
  const mediaProps = project.live
    ? {
        href: project.live,
        target: "_blank",
        rel: "noreferrer",
        "aria-label": `Open ${project.title} live demo`,
      }
    : {};

  return (
    <article
      className={`pj-card pj-case ${flip ? "is-flip" : ""}`}
      id={project.id}
      data-pj
      style={accentStyle(project.accent)}
    >
      <div className="pj-case-info">
        <div className="pj-case-top">
          <span className="pj-case-n">
            {pad(index + 1)} <em>/ {pad(total)}</em>
          </span>
          <span className="pj-cat">{project.category}</span>
        </div>

        <p className="pj-case-type">
          <i className="pj-swatch" aria-hidden="true" />
          {project.type}
        </p>

        <h3>{project.title}</h3>
        <p className="pj-case-desc">{project.description}</p>

        <ul className="pj-tech" aria-label="Tech stack">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <p className="pj-status">
          <i className={`pj-dot ${project.live ? "is-live" : ""}`} aria-hidden="true" />
          {project.status}
        </p>

        <div className="pj-case-actions">
          {project.live ? (
            <a className="pj-btn primary" href={project.live} target="_blank" rel="noreferrer">
              Visit live site
              <ExternalLink size={16} />
            </a>
          ) : null}

          <a
            className={`pj-btn ${project.live ? "quiet" : "primary"}`}
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Code2 size={16} />
            View source
            <ArrowUpRight size={15} />
          </a>
        </div>
        {!project.live ? <p className="pj-note">Live demo not listed</p> : null}
      </div>

      <Media className="pj-case-media" {...mediaProps}>
        <Preview project={project} />
        {project.live ? (
          <span className="pj-hint" aria-hidden="true">
            Open live site <ArrowUpRight size={14} />
          </span>
        ) : null}
      </Media>
    </article>
  );
}

/* ---------------------------------------------------------
   Page
   --------------------------------------------------------- */

function Project() {
  const rootRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const visible = useMemo(
    () =>
      projects.filter(
        (project) => activeFilter === "All Projects" || project.category === activeFilter
      ),
    [activeFilter]
  );

  /* ----- reveal on scroll (content stays visible without JS / IO) ----- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const els = root.querySelectorAll("[data-pj]:not(.in)");
    if (!("IntersectionObserver" in window) || reducedMotion()) {
      els.forEach((el) => el.classList.add("in"));
      return undefined;
    }
    root.classList.add("pj-js");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const t = setTimeout(() => els.forEach((el) => el.classList.add("in")), 4500);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [activeFilter]);

  /* ----- scroll progress ----- */
  useEffect(() => {
    const root = rootRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!root) return;
      const r = root.getBoundingClientRect();
      const max = r.height - window.innerHeight;
      root.style.setProperty("--sp", String(max > 0 ? Math.min(Math.max(-r.top / max, 0), 1) : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ----- cursor glow on cards (mouse only) ----- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const card = e.target.closest?.(".pj-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  const scrollTo = (id) => {
    const behavior = reducedMotion() ? "auto" : "smooth";
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ top: 0, behavior });
  };

  const goTo = (id) => (event) => {
    event.preventDefault();
    if (activeFilter !== "All Projects") {
      setActiveFilter("All Projects");
      setTimeout(() => scrollTo(id), 60);
    } else {
      scrollTo(id);
    }
  };

  return (
    <main className="pj" id="top" ref={rootRef}>
      <div className="pj-progress" aria-hidden="true" />
      <div className="pj-amb pj-amb-1" aria-hidden="true" />
      <div className="pj-amb pj-amb-2" aria-hidden="true" />
      <div className="pj-gridbg" aria-hidden="true" />
      <div className="pj-grain" aria-hidden="true" />

      {/* ============================ HERO ============================ */}
      <header className="pj-hero pj-wrap">
        <div className="pj-hero-copy">
          <div className="pj-pill">
            <i />
            SELECTED WORK · {pad(projects.length)} PROJECTS
          </div>

          <p className="pj-kicker">PROJECTS / THINGS I&apos;VE BUILT</p>

          <h1>
            Ideas into
            <br />
            <span>real-world impact.</span>
          </h1>

          <p className="pj-intro">
            I build web and mobile products that solve real problems, from tracking carbon emissions
            to planning smarter trips and resolving campus complaints. Every project below links to
            its source code, and most to a live demo.
          </p>

          <div className="pj-actions">
            <a className="pj-btn primary" href="#work" onClick={goTo("work")}>
              See the work
              <ArrowDown size={16} />
            </a>
            <a className="pj-btn quiet" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub profile
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <nav className="pj-index" aria-label="Project index">
          <p className="pj-index-head">
            <span>INDEX</span>
            <span>{pad(projects.length)} PROJECTS</span>
          </p>
          <ul>
            {projects.map((project, i) => (
              <li key={project.id} style={accentStyle(project.accent)}>
                <a href={`#${project.id}`} onClick={goTo(project.id)}>
                  <span className="pj-ix-n">{pad(i + 1)}</span>
                  <span className="pj-ix-main">
                    <span className="pj-ix-name">{project.title}</span>
                    <span className="pj-ix-meta">{project.type}</span>
                  </span>
                  <span className="pj-ix-status">
                    <i className={`pj-dot ${project.live ? "is-live" : ""}`} aria-hidden="true" />
                    {project.live ? "Live" : "Source"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* ========================== MARQUEE ========================== */}
      <div className="pj-marquee" aria-label="Technologies used">
        <div className="pj-marquee-track">
          {[0, 1].map((copy) => (
            <div className="pj-marquee-group" key={copy} aria-hidden={copy === 1}>
              {ALL_TECH.map((t) => (
                <span key={t}>
                  {t.toUpperCase()}
                  <i>✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ========================== STATS ========================== */}
      <div className="pj-wrap pj-stats-wrap">
        <div className="pj-stats" data-pj>
          <div className="pj-stat">
            <strong>
              <Count to={projects.length} />
            </strong>
            <span>Projects built</span>
          </div>
          <div className="pj-stat">
            <strong>
              <Count to={LIVE_COUNT} />
            </strong>
            <span>Live demos</span>
          </div>
          <div className="pj-stat">
            <strong>
              <Count to={ALL_TECH.length} />
            </strong>
            <span>Technologies</span>
          </div>
          <div className="pj-stat">
            <strong>
              <Count to={projects.length} />
            </strong>
            <span>Open source repos</span>
          </div>
        </div>
      </div>

      {/* ============================ WORK ============================ */}
      <section className="pj-work pj-wrap" id="work">
        <div className="pj-label" data-pj>
          <span>01</span> / SELECTED WORK
          <i />
        </div>

        <div className="pj-work-head" data-pj>
          <h2>
            Built to be used,
            <br />
            <em>not just shown.</em>
          </h2>

          <div className="pj-tabs" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`pj-tab ${activeFilter === filter ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
                <span className="pj-tab-count">{countFor(filter)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pj-cases" key={activeFilter}>
          {visible.map((project, index) => (
            <Case
              key={project.id}
              project={project}
              index={index}
              total={visible.length}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* ============================ MORE ============================ */}
      <section className="pj-wrap pj-more-wrap">
        <div className="pj-more" data-pj>
          <p className="pj-kicker lime">THERE&apos;S MORE</p>
          <h2>
            Want to see
            <br />
            <span>all the code?</span>
          </h2>
          <p className="pj-more-text">
            There is more on GitHub: source code, experiments and smaller repositories.
          </p>
          <div className="pj-actions">
            <a
              className="pj-btn primary"
              href={`${GITHUB}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
            >
              Browse all repositories
              <ArrowUpRight size={16} />
            </a>
            <a className="pj-btn quiet" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub profile
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================== FOOTER =========================== */}
      <footer className="pj-footer">
        <div className="pj-wrap pj-footer-row">
          <a
            className="pj-mono"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(null);
            }}
            aria-label="Back to top"
          >
            K<span>.</span>
          </a>
          <a
            className="pj-top"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(null);
            }}
          >
            BACK TO TOP
            <ArrowUp size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}

export default Project;