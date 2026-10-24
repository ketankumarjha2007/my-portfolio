import "./About.css";

import { useEffect, useRef, useState } from "react";

import {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaPython,
    FaNodeJs,
    FaGitAlt,
    FaChrome,
    FaCode,
    FaRocket,
    FaLaptopCode,
    FaDatabase,
    FaGithub,
    FaGraduationCap,
    FaEnvelope,
    FaCloud,
    FaTrain,
} from "react-icons/fa";

import { SiTailwindcss, SiExpo, SiFirebase, SiVercel } from "react-icons/si";

/* ---------------- DATA ---------------- */

const ROLES = [
    "Full Stack Developer",
    "DSA Enthusiast",
    "AI Explorer",
    "Product Builder",
];

const SKILLS = [
    { name: "HTML", Icon: FaHtml5, cat: "Frontend", color: "#f97316" },
    { name: "CSS", Icon: FaCss3Alt, cat: "Frontend", color: "#38bdf8" },
    { name: "JavaScript", Icon: FaJs, cat: "Frontend", color: "#facc15" },
    { name: "React", Icon: FaReact, cat: "Frontend", color: "#22d3ee" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, cat: "Frontend", color: "#38bdf8" },
    { name: "React Native", Icon: FaReact, cat: "Mobile", color: "#61dafb" },
    { name: "Expo", Icon: SiExpo, cat: "Mobile", color: "#e2e8f0" },
    { name: "Node.js", Icon: FaNodeJs, cat: "Backend", color: "#84cc16" },
    { name: "Express.js", Icon: FaCode, cat: "Backend", color: "#e2e8f0" },
    { name: "Firebase", Icon: SiFirebase, cat: "Backend", color: "#fbbf24" },
    { name: "Nodemailer", Icon: FaEnvelope, cat: "Backend", color: "#34d399" },
    { name: "Brevo", Icon: FaEnvelope, cat: "Backend", color: "#2dd4bf" },
    { name: "Python", Icon: FaPython, cat: "Languages", color: "#fbbf24" },
    { name: "C", Icon: FaCode, cat: "Languages", color: "#60a5fa" },
    { name: "C++", Icon: FaCode, cat: "Languages", color: "#818cf8" },
    { name: "MongoDB", Icon: FaDatabase, cat: "Databases", color: "#22c55e" },
    { name: "MySQL", Icon: FaDatabase, cat: "Databases", color: "#38bdf8" },
    { name: "Vercel", Icon: SiVercel, cat: "Deployment", color: "#f8fafc" },
    { name: "Railway", Icon: FaTrain, cat: "Deployment", color: "#a78bfa" },
    { name: "Render", Icon: FaCloud, cat: "Deployment", color: "#4ade80" },
    { name: "Git", Icon: FaGitAlt, cat: "Tools", color: "#fb923c" },
];

const FILTERS = [
    "All",
    "Frontend",
    "Backend",
    "Mobile",
    "Languages",
    "Databases",
    "Deployment",
    "Tools",
];

const TOOLS = ["VS Code", "GitHub", "Chrome DevTools"];

const TIMELINE = [
    {
        when: "2025 · 1st Year",
        text: "Started B.Tech at BMS Institute of Technology and stepped into the world of development, learning the fundamentals of web development and programming.",
    },
    {
        when: "2026 · 2nd Year (Present)",
        text: "Now in my 2nd year, building real-world projects with the MERN stack, mastering DSA and exploring AI.",
    },
    {
        when: "Next Mission",
        text: "Building impactful, scalable products and growing as a full stack engineer.",
        future: true,
    },
];

/* ---------------- COMPONENT ---------------- */

function About() {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const statRef = useRef(null);

    const [role, setRole] = useState(0);
    const [filter, setFilter] = useState("All");
    const [projects, setProjects] = useState(0);

    /* ----- rotating role text ----- */
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;
        const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2600);
        return () => clearInterval(id);
    }, []);

    /* ----- reveal on scroll ----- */
    useEffect(() => {
        const els = sectionRef.current.querySelectorAll("[data-reveal]");
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        en.target.classList.add("is-in");
                        io.unobserve(en.target);
                    }
                }),
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    /* ----- count-up stat ----- */
    useEffect(() => {
        const el = statRef.current;
        if (!el) return;
        let raf;
        const io = new IntersectionObserver(
            ([en]) => {
                if (!en.isIntersecting) return;
                io.disconnect();
                const start = performance.now();
                const dur = 1400;
                const tick = (t) => {
                    const p = Math.min((t - start) / dur, 1);
                    setProjects(Math.round(10 * (1 - Math.pow(1 - p, 3))));
                    if (p < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            },
            { threshold: 0.6 }
        );
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, []);

    /* ----- timeline progress line ----- */
    useEffect(() => {
        const el = timelineRef.current;
        if (!el) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const p = (vh * 0.7 - r.top) / r.height;
            el.style.setProperty("--progress", `${Math.min(Math.max(p, 0), 1) * 100}%`);
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

    /* ----- pointer effects (mouse only): spotlight, card glow, magnetic ----- */
    const fine =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMove = (e) => {
        if (!fine) return;
        const root = sectionRef.current;
        const rr = root.getBoundingClientRect();
        root.style.setProperty("--mx", `${e.clientX - rr.left}px`);
        root.style.setProperty("--my", `${e.clientY - rr.top}px`);

        const card = e.target.closest("[data-glow]");
        if (card) {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--cx", `${e.clientX - r.left}px`);
            card.style.setProperty("--cy", `${e.clientY - r.top}px`);
        }

        const mag = e.target.closest("[data-magnetic]");
        if (mag) {
            const r = mag.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / 7;
            const y = (e.clientY - r.top - r.height / 2) / 7;
            mag.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        }
    };

    const onLeave = (e) => {
        const mag = e.target.closest?.("[data-magnetic]");
        if (mag) mag.style.transform = "";
    };

    const visibleSkills = SKILLS.filter((s) => filter === "All" || s.cat === filter);

    return (
        <section
            className="about"
            ref={sectionRef}
            onMouseMove={onMove}
            onMouseOut={onLeave}
            id="about"
        >
            {/* ===== ATMOSPHERE ===== */}
            <div className="ab-aurora" aria-hidden="true">
                <span className="blob b1" />
                <span className="blob b2" />
                <span className="blob b3" />
            </div>
            <div className="ab-grid" aria-hidden="true" />
            <div className="ab-spotlight" aria-hidden="true" />
            <div className="ab-noise" aria-hidden="true" />

            <div className="about-wrapper">
                {/* ================= LEFT ================= */}
                <aside className="about-left" data-reveal>
                    <div className="about-card" data-glow>
                        <div className="about-badge">
                            <FaRocket />
                            <span key={role} className="role-swap">
                                {ROLES[role]}
                            </span>
                        </div>

                        <h1>
                            About <span className="grad">Me</span>
                        </h1>

                        <p className="tagline">
                            Building systems that scale. Designing experiences that last.
                        </p>

                        <div className="line" />

                        <p className="highlight">
                            I'm <strong>Ketan Kumar Jha</strong> — a passionate developer
                            focused on creating high-performance web applications, impactful
                            products, and futuristic experiences.
                        </p>

                        <p>
                            Currently pursuing B.Tech at{" "}
                            <strong>BMS Institute of Technology</strong> and actively
                            mastering{" "}
                            <strong>
                                DSA, Full Stack Development, AI, and scalable system design.
                            </strong>
                        </p>

                        <p>
                            I enjoy transforming ideas into beautiful, production-ready
                            digital products with modern UI/UX and optimized architecture.
                        </p>

                        <div className="edu">
                            <span className="edu-ic">
                                <FaGraduationCap />
                            </span>
                            <span>
                                <small>Education</small>
                                <b>B.Tech · BMS Institute of Technology</b>
                            </span>
                        </div>

                        {/* STATS */}
                        <div className="about-stats">
                            <div className="stat-box" data-magnetic ref={statRef}>
                                <h2>{projects}+</h2>
                                <span>Projects</span>
                            </div>

                            <div className="stat-box" data-magnetic>
                                <h2>MERN</h2>
                                <span>Stack</span>
                            </div>

                            <div className="stat-box" data-magnetic>
                                <h2>AI</h2>
                                <span>Explorer</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ================= RIGHT ================= */}
                <div className="about-right">
                    {/* SKILLS */}
                    <div className="section-card" data-reveal data-glow>
                        <div className="section-heading">
                            <span className="sh-ic">
                                <FaLaptopCode />
                            </span>
                            <h2>Skills</h2>
                            <em className="sh-count">{visibleSkills.length}</em>
                        </div>

                        <div className="filters" role="tablist" aria-label="Filter skills">
                            {FILTERS.map((f) => (
                                <button
                                    key={f}
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === f}
                                    className={`filter ${filter === f ? "on" : ""}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        <div className="skills">
                            {visibleSkills.map(({ name, Icon, color }, i) => (
                                <span
                                    key={name}
                                    className="skill"
                                    data-magnetic
                                    style={{ "--c": color, "--i": i }}
                                >
                                    <Icon />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* TOOLS */}
                    <div className="section-card" data-reveal data-glow>
                        <div className="section-heading">
                            <span className="sh-ic">
                                <FaChrome />
                            </span>
                            <h2>Tools &amp; Platforms</h2>
                        </div>

                        <div className="skills">
                            {TOOLS.map((t, i) => (
                                <span
                                    key={t}
                                    className="skill tool"
                                    data-magnetic
                                    style={{ "--i": i }}
                                >
                                    {t === "GitHub" ? <FaGithub /> : <i className="dot" />}
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* JOURNEY */}
                    <div className="section-card" data-reveal data-glow>
                        <div className="section-heading">
                            <span className="sh-ic">
                                <FaRocket />
                            </span>
                            <h2>Journey</h2>
                        </div>

                        <div className="timeline" ref={timelineRef}>
                            <div className="tl-rail" aria-hidden="true">
                                <div className="tl-fill" />
                            </div>

                            {TIMELINE.map((t, i) => (
                                <div
                                    key={t.when}
                                    className={`timeline-item ${t.future ? "future" : ""}`}
                                    data-reveal
                                    style={{ "--d": `${i * 120}ms` }}
                                >
                                    <span className="tl-dot" aria-hidden="true" />
                                    <span className="tl-when">{t.when}</span>
                                    <p>{t.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;