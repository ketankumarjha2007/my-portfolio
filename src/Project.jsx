import { useMemo, useState } from "react";
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
    return <div className="bare">{body}</div>;
  }

  return (
    <div className="frame">
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="frame-url">
          {project.live ? host(project.live) : `github.com/ketankumarjha2007`}
        </span>
      </div>
      <div className="frame-body">{body}</div>
    </div>
  );
}

/* ---------------------------------------------------------
   Case study row
   --------------------------------------------------------- */

function Case({ project, flip }) {
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
      className={`case ${flip ? "is-flip" : ""}`}
      id={project.id}
      style={accentStyle(project.accent)}
    >
      <div className="case-info">
        <p className="case-type">
          <i className="swatch" aria-hidden="true" />
          {project.type}
        </p>

        <h3>{project.title}</h3>
        <p className="case-desc">{project.description}</p>

        <dl className="case-specs">
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.tech.join(", ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <i className={`dot ${project.live ? "is-live" : ""}`} aria-hidden="true" />
              {project.status}
            </dd>
          </div>
        </dl>

        <div className="case-actions">
          {project.live ? (
            <a className="btn" href={project.live} target="_blank" rel="noreferrer">
              Visit live site
              <ExternalLink size={16} />
            </a>
          ) : null}

          <a
            className={project.live ? "text-link" : "btn"}
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Code2 size={16} />
            View source
            <ArrowUpRight size={15} />
          </a>

          {!project.live ? <span className="muted-note">Live demo not listed</span> : null}
        </div>
      </div>

      <Media className="case-media" {...mediaProps}>
        <Preview project={project} />
        {project.live ? (
          <span className="media-hint" aria-hidden="true">
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
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const visible = useMemo(
    () =>
      projects.filter(
        (project) => activeFilter === "All Projects" || project.category === activeFilter
      ),
    [activeFilter]
  );

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
      setTimeout(() => scrollTo(id), 40);
    } else {
      scrollTo(id);
    }
  };

  return (
    <main className="pj" id="top">
      <header className="pj-hero">
        <div className="pj-wrap">
          <h1>
            <span className="pj-line">
              <span className="l1">Ideas into</span>
            </span>
            <span className="pj-line">
              <span className="l2">real-world impact.</span>
            </span>
          </h1>

          <div className="pj-hero-lower">
            <div className="pj-hero-copy">
              <p className="pj-intro">
                I build web and mobile products that solve real problems, from
                tracking carbon emissions to planning smarter trips and resolving
                campus complaints. Every project below links to its source code,
                and most to a live demo.
              </p>

              <div className="pj-hero-actions">
                <a className="btn" href="#work" onClick={goTo("work")}>
                  See the work
                  <ArrowDown size={16} />
                </a>
                <a className="text-link" href={GITHUB} target="_blank" rel="noreferrer">
                  GitHub profile
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <nav className="pj-index" aria-label="Project index">
              <p className="pj-index-head">
                <span>Index</span>
                <span>{projects.length} projects</span>
              </p>
              <ul>
                {projects.map((project) => (
                  <li key={project.id} style={accentStyle(project.accent)}>
                    <a href={`#${project.id}`} onClick={goTo(project.id)}>
                      <span className="ix-main">
                        <span className="ix-name">{project.title}</span>
                        <span className="ix-meta">{project.type}</span>
                      </span>
                      <span className="ix-status">
                        <i className={`dot ${project.live ? "is-live" : ""}`} aria-hidden="true" />
                        {project.live ? "Live" : "Source"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="pj-work" id="work">
        <div className="pj-wrap">
          <div className="pj-work-head">
            <h2>Selected work</h2>

            <div className="pj-tabs" role="group" aria-label="Filter projects">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`tab ${activeFilter === filter ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                  <span className="tab-count">{countFor(filter)}</span>
                </button>
              ))}
            </div>
          </div>

          {visible.map((project, index) => (
            <Case key={project.id} project={project} flip={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="pj-more">
        <div className="pj-wrap">
          <p>There is more on GitHub: source code, experiments and smaller repositories.</p>
          <a
            className="pj-more-link"
            href={`${GITHUB}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
          >
            <span>Browse all repositories</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

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
            K.
          </a>
          <a
            className="text-link"
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              scrollTo(null);
            }}
          >
            Back to top
            <ArrowUp size={15} />
          </a>
        </div>
      </footer>
    </main>
  );
}

export default Project;