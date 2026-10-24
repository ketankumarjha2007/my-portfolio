import { useEffect, useState } from "react";
import "./Home.css";
import profile from "./assets/profile.jpg";

const LINKS = {
  leetcode: "https://leetcode.com/u/7o6vYciZSq/",
  github: "https://github.com/ketankumarjha2007",
  linkedin:
    "https://www.linkedin.com/in/ketan-kumar-jha-499064305/",
};

const PROJECTS = [
  {
    number: "01",
    name: "CampusSetu",
    category: "CAMPUS MANAGEMENT · MOBILE APP",
    mark: "CS",
    theme: "campus",
    description:
      "A college complaint and campus-management platform that helps students raise complaints, track progress, and connect with the right campus officials. Includes role-based workflows for students, teachers, cluster heads, and principals.",
    impact: "From complaint submission to resolution tracking.",
    tech: [
      "React Native",
      "Expo",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
    ],
    live: "",
    github: "",
  },
  {
    number: "02",
    name: "Vasudha",
    category: "ENVIRONMENT · AI + IoT",
    mark: "V.",
    theme: "vasudha",
    description:
      "An environmental intelligence platform focused on sustainability. It brings together carbon-footprint awareness, air-quality insights, smart energy monitoring, and an environmental assistant, with scope for future AQI prediction.",
    impact: "Understand your footprint. Make greener choices.",
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Firebase",
      "IoT",
      "Data Visualization",
    ],
    live: "",
    github: "",
  },
  {
    number: "03",
    name: "ReRoute",
    category: "HACKATHON · ITINERARY OPTIMIZER",
    mark: "R/",
    theme: "reroute",
    description:
      "An itinerary optimization project developed for a hackathon. The goal is to help organize travel plans using destination data. My contribution focused on the frontend and working with a local SQLite dataset.",
    impact: "Less planning friction. Better journeys.",
    tech: ["React", "JavaScript", "SQLite", "Frontend"],
    live: "",
    github: "",
  },
];

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

function Arrow({ diagonal = false }) {
  return (
    <span className="arrow" aria-hidden="true">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
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
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="portfolio" id="top">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* NAVBAR */}
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          onClick={closeMenu}
          aria-label="Ketan Jha homepage"
        >
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
          aria-label={
            menuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`main-nav ${menuOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#work" onClick={closeMenu}>
            Projects
          </a>
          <a href="#skills" onClick={closeMenu}>
            Skills
          </a>
          <a href="#connect" onClick={closeMenu}>
            Contact
          </a>
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
            Second-year B.E. Computer Science student at{" "}
            <strong>BMSIT&amp;M, Bengaluru</strong>, building
            useful digital products at the intersection of
            full-stack development, problem solving, and
            real-world impact.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore my work <Arrow diagonal />
            </a>

            <a
              className="button button-quiet"
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
            >
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
              <img
                src={profile}
                alt="Ketan Kumar Jha"
                className="profile-image"
              />

              <div className="image-overlay" />

              <div className="profile-caption">
                <span className="caption-index">
                  01 / THE BUILDER
                </span>
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

          <span className="visual-coordinate">
            BENGALURU · INDIA
          </span>
        </div>

        <a className="scroll-cue" href="#about">
          <span className="scroll-line" />
          SCROLL TO EXPLORE <span>↓</span>
        </a>
      </section>

      {/* INTRO STRIP */}
      <section className="intro-strip">
        <div className="strip-inner">
          <span>PRODUCT-MINDED</span>
          <i>✳</i>
          <span>FULL-STACK CURIOUS</span>
          <i>✳</i>
          <span>DETAIL-OBSESSED</span>
          <i>✳</i>
          <span>IMPACT-DRIVEN</span>
        </div>
      </section>

      {/* ABOUT */}
      <section
        className="section-shell section-block"
        id="about"
      >
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
              I&apos;m a second-year Computer Science and
              Engineering student at BMS Institute of Technology
              &amp; Management, Bengaluru. I enjoy taking an idea
              from a rough sketch to a working product—thinking
              through the interface, backend, and the experience
              in between.
            </p>

            <p>
              My current focus is full-stack development, data
              structures and algorithms, and projects that solve
              practical problems—from campus issue reporting to
              environmental awareness and smarter trip planning.
            </p>

            <a
              className="text-link"
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              More about me on LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>

        <div className="principles-grid">
          <article className="principle-card" data-reveal>
            <span className="principle-number">01</span>
            <span className="principle-symbol">⌘</span>
            <h3>Build end to end</h3>
            <p>
              From responsive interfaces to APIs, data models,
              and deployment.
            </p>
          </article>

          <article className="principle-card" data-reveal>
            <span className="principle-number">02</span>
            <span className="principle-symbol">↗</span>
            <h3>Keep getting better</h3>
            <p>
              Strengthening fundamentals through consistent
              problem solving.
            </p>
          </article>

          <article className="principle-card" data-reveal>
            <span className="principle-number">03</span>
            <span className="principle-symbol">✳</span>
            <h3>Make it meaningful</h3>
            <p>
              Exploring technology that can make everyday
              systems work better.
            </p>
          </article>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        className="section-shell section-block work-section"
        id="work"
      >
        <div className="section-label" data-reveal>
          <span>02</span> / SELECTED WORK
        </div>

        <div className="work-heading" data-reveal>
          <h2 className="section-title">
            Ideas, meet <span>execution.</span>
          </h2>
          <p>
            Three projects. Three different problems. One goal:
            make technology useful.
          </p>
        </div>

        <div className="projects-list">
          {PROJECTS.map((project) => (
            <article
              className={`project-card project-${project.theme}`}
              key={project.name}
              data-reveal
            >
              <div className="project-art">
                <div className="art-grid" />
                <span className="project-mark">
                  {project.mark}
                </span>
                <span className="project-art-index">
                  PROJECT / {project.number}
                </span>
                <span className="art-orbit" />
              </div>

              <div className="project-content">
                <div className="project-eyebrow">
                  <span>{project.category}</span>
                  <span>{project.number} — 03</span>
                </div>

                <h3>
                  {project.name}
                  <span className="period">.</span>
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

                <p className="project-impact">
                  <span>↳</span> {project.impact}
                </p>

                <ul className="tech-list">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live preview <Arrow diagonal />
                    </a>
                  ) : (
                    <span className="link-placeholder">
                      Live link to be added
                    </span>
                  )}

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source code <Arrow diagonal />
                    </a>
                  ) : (
                    <span className="link-placeholder">
                      Repository to be added
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="links-note">
          Project demos and repositories will be linked here
          as they are published.
        </p>
      </section>

      {/* SKILLS */}
      <section
        className="section-shell section-block skills-section"
        id="skills"
      >
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
            My toolkit keeps evolving. These are the technologies
            I&apos;ve been learning and using across projects.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((group, index) => (
            <article
              className="skill-group"
              key={group.title}
              data-reveal
            >
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
      <section
        className="section-shell section-block connect-section"
        id="connect"
      >
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
                Open to learning opportunities, internships,
                collaborations, and conversations with people
                who love building things.
              </p>

              <a
                className="button button-primary"
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                Connect on LinkedIn <Arrow diagonal />
              </a>
            </div>

            <div className="social-list">
              <a
                className="social-row"
                href={LINKS.leetcode}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-symbol">LC</span>
                <span className="social-copy">
                  <strong>LeetCode</strong>
                  <small>Problem solving</small>
                </span>
                <Arrow diagonal />
              </a>

              <a
                className="social-row"
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-symbol">GH</span>
                <span className="social-copy">
                  <strong>GitHub</strong>
                  <small>Code and projects</small>
                </span>
                <Arrow diagonal />
              </a>

              <a
                className="social-row"
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-symbol">in</span>
                <span className="social-copy">
                  <strong>LinkedIn</strong>
                  <small>Professional profile</small>
                </span>
                <Arrow diagonal />
              </a>
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

        <span className="copyright">
          © {year} Ketan Kumar Jha
        </span>
      </footer>
    </main>
  );
}

export default Home;