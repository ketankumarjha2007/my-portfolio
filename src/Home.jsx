import { useEffect, useRef, useState } from "react";
import "./Home.css";
import profile from "./assets/profile.jpg";
import LiveStats from "./LiveStats";
import { PROFILES, profileUrl } from "./profiles";

const LINKS = {
  leetcode: profileUrl.leetcode(PROFILES.leetcode.username),
  github: profileUrl.github(PROFILES.github.username),
  linkedin: PROFILES.linkedin,
};

const NAV = [
  { id: "about", label: "About" },
  { id: "coding", label: "Coding" },
  { id: "skills", label: "Skills" },
  { id: "connect", label: "Contact" },
];

const STRIP = ["PRODUCT-MINDED", "FULL-STACK CURIOUS", "DETAIL-OBSESSED", "IMPACT-DRIVEN", "ALWAYS SHIPPING"];

const SKILLS = [
  {
    title: "Frontend",
    items: ["React", "React Native", "JavaScript", "HTML5", "CSS3", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Authentication"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "SQL", "SQLite", "Firebase"],
  },
  {
    title: "Programming",
    items: ["C", "C++", "Python", "DSA", "OOP"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman", "Vercel", "Render", "Expo"],
  },
];

/* contact rows: only platforms that have a username are listed */
const SOCIALS = [
  { key: "leetcode", symbol: "LC", name: "LeetCode", note: "Problem solving" },
  { key: "github", symbol: "GH", name: "GitHub", note: "Code and projects" },
]
  .filter((s) => PROFILES[s.key]?.username)
  .map((s) => ({ ...s, href: profileUrl[s.key](PROFILES[s.key].username) }))
  .concat([
    {
      key: "linkedin",
      symbol: "in",
      name: "LinkedIn",
      note: "Professional profile",
      href: PROFILES.linkedin,
    },
  ]);

function Arrow({ diagonal = false }) {
  return (
    <span className="arrow" aria-hidden="true">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("");
  const [year] = useState(() => new Date().getFullYear());
  const rootRef = useRef(null);

  /* ----- reveal on scroll ----- */
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ----- scroll progress + sticky header ----- */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      rootRef.current?.style.setProperty("--p", String(Math.min(Math.max(p, 0), 1)));
      setStuck(window.scrollY > 8);
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

  /* ----- scroll-spy for the nav ----- */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ----- mobile menu: Esc closes, body scroll lock ----- */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="portfolio" id="top" ref={rootRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* NAVBAR */}
      <header className={`site-header ${stuck ? "is-stuck" : ""} ${menuOpen ? "menu-on" : ""}`}>
        <div className="header-inner section-shell">
          <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Ketan Jha homepage">
            <span className="wordmark-icon">
              K<span>.</span>
            </span>
            <span className="wordmark-name">
              KETAN JHA
              <small>PORTFOLIO / {year}</small>
            </span>
          </a>

          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>

          <nav
            id="main-nav"
            className={`main-nav ${menuOpen ? "nav-open" : ""}`}
            aria-label="Main navigation"
          >
            {NAV.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                aria-current={active === id ? "true" : undefined}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-cta"
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Let&apos;s connect <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="availability">
            <span className="availability-dot" />
            BUILDING · LEARNING · ITERATING
          </div>

          <p className="hero-kicker">HELLO, WORLD. I&apos;M</p>

          <h1>
            Ketan Kumar
            <br />
            <span>
              Jha<span className="period">.</span>
            </span>
          </h1>

          <div className="hero-role">
            <span className="role-line" />
            CSE UNDERGRADUATE
            <span className="role-divider">/</span>
            FULL-STACK DEVELOPER
          </div>

          <p className="hero-description">
            Second-year B.E. Computer Science student at <strong>BMSIT&amp;M, Bengaluru</strong>,
            building useful digital products at the intersection of full-stack development, problem
            solving, and real-world impact.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#coding">
              See my live stats <Arrow diagonal />
            </a>

            <a className="button button-quiet" href={LINKS.github} target="_blank" rel="noreferrer">
              GitHub profile <Arrow diagonal />
            </a>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">CURRENT FOCUS</span>
              <strong>MERN · DSA · Product building</strong>
            </div>

            <div>
              <span className="meta-label">BASED IN</span>
              <strong>Bengaluru, India</strong>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-a" />
          <div className="visual-orbit orbit-b" />

          <div className="profile-frame">
            <div className="profile-image-wrap">
              <img src={profile} alt="Ketan Kumar Jha" className="profile-image" />
              <div className="image-overlay" />
              <div className="profile-caption">
                <span className="caption-index">01 / THE BUILDER</span>
                <strong>
                  Curiosity into
                  <br />
                  working software.
                </strong>
              </div>
            </div>
          </div>

          <div className="floating-note note-top">
            <span className="note-icon">{"</>"}</span>
            <span>
              <small>BUILD MODE</small>
              <strong>Always building</strong>
            </span>
          </div>

          <div className="floating-note note-bottom">
            <span className="note-spark">✳</span>
            <span>
              <small>MY APPROACH</small>
              <strong>Learn by building</strong>
            </span>
          </div>

          <span className="visual-coordinate">BENGALURU · INDIA</span>
        </div>

        <a className="scroll-cue" href="#about">
          <span className="scroll-line" />
          SCROLL TO EXPLORE <span>↓</span>
        </a>
      </section>

      {/* MARQUEE STRIP */}
      <section className="intro-strip" aria-label="Highlights">
        <div className="strip-track">
          {[0, 1].map((copy) => (
            <div className="strip-group" key={copy} aria-hidden={copy === 1}>
              {STRIP.map((t) => (
                <span className="strip-item" key={t}>
                  {t}
                  <i>✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-shell section-block" id="about">
        <div className="section-label" data-reveal>
          <span>01</span> / A LITTLE ABOUT ME
        </div>

        <div className="about-layout">
          <h2 className="section-title" data-reveal>
            Not just writing code.
            <br />
            <span>Building with purpose.</span>
          </h2>

          <div className="about-copy" data-reveal>
            <p>
              I&apos;m a second-year Computer Science and Engineering student at BMS Institute of
              Technology &amp; Management, Bengaluru. I enjoy taking an idea from a rough sketch to
              a working product—thinking through the interface, backend, and the experience in
              between.
            </p>

            <p>
              My current focus is full-stack development, data structures and algorithms, and
              products that solve practical problems—from campus issue reporting to environmental
              awareness and smarter trip planning.
            </p>

            <a className="text-link" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              More about me on LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>

        <div className="principles-grid">
          <article className="principle-card" data-reveal>
            <span className="principle-number">01</span>
            <span className="principle-symbol">⌘</span>
            <h3>Build end to end</h3>
            <p>From responsive interfaces to APIs, data models, and deployment.</p>
          </article>

          <article className="principle-card" data-reveal>
            <span className="principle-number">02</span>
            <span className="principle-symbol">↗</span>
            <h3>Keep getting better</h3>
            <p>Strengthening fundamentals through consistent problem solving.</p>
          </article>

          <article className="principle-card" data-reveal>
            <span className="principle-number">03</span>
            <span className="principle-symbol">✳</span>
            <h3>Make it meaningful</h3>
            <p>Exploring technology that can make everyday systems work better.</p>
          </article>
        </div>
      </section>

      {/* LIVE CODING STATS (replaces Projects) */}
      <section className="section-shell section-block coding-section" id="coding">
        <div className="section-label" data-reveal>
          <span>02</span> / LIVE CODING STATS
        </div>

        <LiveStats />
      </section>

      {/* SKILLS */}
      <section className="section-shell section-block skills-section" id="skills">
        <div className="section-label" data-reveal>
          <span>03</span> / THE TOOLKIT
        </div>

        <div className="skills-heading" data-reveal>
          <h2 className="section-title">
            Tools I use to
            <br />
            <span>make things happen.</span>
          </h2>

          <p>
            My toolkit keeps evolving. These are the technologies I&apos;ve been learning and using
            across projects.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((group, index) => (
            <article className="skill-group" key={group.title} data-reveal>
              <div className="skill-group-top">
                <span>0{index + 1}</span>
                <span className="skill-arrow">↗</span>
              </div>

              <h3>{group.title}</h3>

              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section-shell section-block connect-section" id="connect">
        <div className="connect-panel" data-reveal>
          <div className="section-label">
            <span>04</span> / FIND ME ONLINE
          </div>

          <div className="connect-layout">
            <div>
              <p className="hero-kicker">HAVE AN IDEA?</p>

              <h2>
                Let&apos;s make
                <br />
                <span>it real.</span>
              </h2>

              <p className="connect-description">
                Open to learning opportunities, internships, collaborations, and conversations with
                people who love building things.
              </p>

              <a className="button button-primary" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn <Arrow diagonal />
              </a>
            </div>

            <div className="social-list">
              {SOCIALS.map((s) => (
                <a key={s.key} className="social-row" href={s.href} target="_blank" rel="noreferrer">
                  <span className="social-symbol">{s.symbol}</span>
                  <span className="social-copy">
                    <strong>{s.name}</strong>
                    <small>{s.note}</small>
                  </span>
                  <Arrow diagonal />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer section-shell">
        <a className="footer-brand" href="#top">
          K<span>.</span>
        </a>

        <p>Designed with intention. Built with curiosity.</p>

        <a href="#top" className="back-top">
          BACK TO TOP ↑
        </a>

        <span className="copyright">© {year} Ketan Kumar Jha</span>
      </footer>
    </main>
  );
}

export default Home;