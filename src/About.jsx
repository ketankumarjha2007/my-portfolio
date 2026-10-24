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
    FaDatabase,
    FaGithub,
    FaEnvelope,
    FaCloud,
    FaTrain,
} from "react-icons/fa";

import { SiTailwindcss, SiExpo, SiFirebase, SiVercel } from "react-icons/si";

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const LINKEDIN = "https://www.linkedin.com/in/ketan-kumar-jha-499064305/";
const GITHUB = "https://github.com/ketankumarjha2007";
const EMAIL = "ketankumarjha70@gmail.com";

const SUMMARY =
    "Skilled in developing scalable and responsive applications, I enjoy working across both frontend and backend, from designing intuitive user interfaces in React to building robust APIs with Node.js and Express.";

const PLATFORMS = [
    { mark: "LC", name: "LeetCode", kicker: "PROBLEM SOLVING", handle: "7o6vYciZSq", href: "https://leetcode.com/u/7o6vYciZSq/", acc: "#ffa116" },
    { mark: "GH", name: "GitHub", kicker: "OPEN SOURCE", handle: "ketankumarjha2007", href: GITHUB, acc: "#c8ff55" },
    { mark: "CF", name: "Codeforces", kicker: "COMPETITIVE", handle: "ketankumarjha70", href: "https://codeforces.com/profile/ketankumarjha70", acc: "#5aa9ff" },
    { mark: "CC", name: "CodeChef", kicker: "CONTESTS", handle: "ketanjha_2007", href: "https://www.codechef.com/users/ketanjha_2007", acc: "#e0a96d" },
    { mark: "GfG", name: "GeeksforGeeks", kicker: "PRACTICE", handle: "ketankum4ft9", href: "https://www.geeksforgeeks.org/profile/ketankum4ft9", acc: "#4ade80" },
    { mark: "TUF", name: "TakeUForward", kicker: "DSA ROADMAP", handle: "1by25cs148", href: "https://takeuforward.org/profile/1by25cs148", acc: "#ff6b6b" },
];

const EDUCATION = [
    {
        tag: "CURRENT · DEGREE",
        title: "B.E. in Computer Science & Engineering",
        school: "BMS Institute of Technology & Management",
        place: "Bengaluru",
        period: "Sep 2025 — Apr 2029",
        value: 8.95,
        decimals: 2,
        unit: "/10",
        label: "CGPA",
        pct: 89.5,
    },
    {
        tag: "CLASS XI & XII · SCIENCE (PCM)",
        title: "Senior Secondary",
        school: "Don Bosco Convent School",
        place: "Jhanjharpur",
        period: "2022 — 2024",
        value: 75,
        decimals: 0,
        unit: "%",
        label: "12TH MARKS",
        pct: 75,
    },
    {
        tag: "CLASS X",
        title: "Secondary",
        school: "DAV Public School",
        place: "Madhepur",
        period: "Apr 2021 — Apr 2022",
        value: 87.4,
        decimals: 1,
        unit: "%",
        label: "10TH MARKS",
        pct: 87.4,
    },
];

const LANGUAGES = [
    { name: "Maithili", level: "Native" },
    { name: "Hindi", level: "Native" },
    { name: "English", level: "Full professional" },
];

const FOCUS = [
    { n: "01", sym: "⌘", title: "Full-stack products", text: "React interfaces, Node and Express APIs, databases and deployment, built end to end." },
    { n: "02", sym: "↗", title: "DSA & problem solving", text: "900+ problems across six platforms, with steady practice and contests." },
    { n: "03", sym: "✳", title: "AI & scalable systems", text: "Exploring AI and system design to build products that hold up at scale." },
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
    { name: "MariaDB", Icon: FaDatabase, cat: "Databases", color: "#fb923c" },
    { name: "Vercel", Icon: SiVercel, cat: "Deployment", color: "#f8fafc" },
    { name: "Railway", Icon: FaTrain, cat: "Deployment", color: "#a78bfa" },
    { name: "Render", Icon: FaCloud, cat: "Deployment", color: "#4ade80" },
    { name: "Git", Icon: FaGitAlt, cat: "Tools", color: "#fb923c" },
    { name: "GitHub", Icon: FaGithub, cat: "Tools", color: "#f8fafc" },
    { name: "VS Code", Icon: FaCode, cat: "Tools", color: "#38bdf8" },
    { name: "Chrome DevTools", Icon: FaChrome, cat: "Tools", color: "#facc15" },
];

const FILTERS = ["All", "Frontend", "Mobile", "Backend", "Languages", "Databases", "Deployment", "Tools"];

const TIMELINE = [
    {
        when: "2025",
        title: "Started B.E. at BMSIT&M",
        text: "Joined BMS Institute of Technology & Management for Computer Science & Engineering and stepped into the world of development.",
    },
    {
        when: "2025",
        title: "Xcelerate · 24-hour hackathon",
        text: "Took part in the Xcelerate hackathon at NIKSHATRA, E-Summit 2025, building under real time pressure.",
    },
    {
        when: "2026 · 2nd year",
        title: "Building and solving, daily",
        text: "Now in my 2nd year: building real-world projects with the MERN stack, mastering DSA and exploring AI.",
    },
    {
        when: "Next mission",
        title: "Impact at scale",
        text: "Building impactful, scalable products and growing as a full stack engineer.",
        future: true,
    },
];

const RECOGNITION = [
    { kind: "CERTIFICATE", title: "Frontend Developer (React)", meta: "Quiz certification" },
    { kind: "CERTIFICATE", title: "MATLAB Onramp", meta: "MathWorks" },
    { kind: "PARTICIPATION", title: "Xcelerate · 24-hour hackathon", meta: "NIKSHATRA, E-Summit 2025" },
    { kind: "HONOR · AWARD", title: "NDA", meta: "Honors & awards" },
];

const MARQUEE = ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "REACT NATIVE", "FIREBASE", "PYTHON", "C++", "DSA", "TAILWIND", "GIT"];

const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================================================================== */
/*  SMALL COMPONENTS                                                   */
/* ================================================================== */

function Count({ to, decimals = 0, prefix = "", suffix = "", duration = 1500 }) {
    const ref = useRef(null);
    const [v, setV] = useState(0);
    const [go, setGo] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (reduced() || !("IntersectionObserver" in window)) {
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
            setV(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [go, to, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {v.toFixed(decimals)}
            {suffix}
        </span>
    );
}

function Arrow() {
    return (
        <span className="ab-arrow" aria-hidden="true">
            ↗
        </span>
    );
}

function Label({ n, children }) {
    return (
        <div className="ab-label" data-ab>
            <span>{n}</span> / {children}
            <i />
        </div>
    );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

function About() {
    const rootRef = useRef(null);
    const timelineRef = useRef(null);
    const [filter, setFilter] = useState("All");

    /* ----- reveal on scroll (content stays visible if JS or IO is unavailable) ----- */
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return undefined;
        const els = root.querySelectorAll("[data-ab]");
        if (!("IntersectionObserver" in window) || reduced()) {
            els.forEach((el) => el.classList.add("in"));
            return undefined;
        }
        root.classList.add("ab-js");
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
        /* safety net: never leave anything hidden */
        const t = setTimeout(() => els.forEach((el) => el.classList.add("in")), 4500);
        return () => {
            clearTimeout(t);
            io.disconnect();
        };
    }, []);

    /* ----- scroll progress + timeline progress ----- */
    useEffect(() => {
        const root = rootRef.current;
        const tl = timelineRef.current;
        let raf = 0;
        const update = () => {
            raf = 0;
            if (root) {
                const r = root.getBoundingClientRect();
                const max = r.height - window.innerHeight;
                const sp = max > 0 ? Math.min(Math.max(-r.top / max, 0), 1) : 0;
                root.style.setProperty("--sp", String(sp));
            }
            if (tl) {
                const r = tl.getBoundingClientRect();
                const p = (window.innerHeight * 0.7 - r.top) / r.height;
                tl.style.setProperty("--p", `${Math.min(Math.max(p, 0), 1) * 100}%`);
            }
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
            const card = e.target.closest?.(".ab-card");
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        root.addEventListener("pointermove", onMove);
        return () => root.removeEventListener("pointermove", onMove);
    }, []);

    const visibleSkills = SKILLS.filter((s) => filter === "All" || s.cat === filter);

    return (
        <section className="about" ref={rootRef} id="about">
            <div className="ab-progress" aria-hidden="true" />
            <div className="ab-amb ab-amb-1" aria-hidden="true" />
            <div className="ab-amb ab-amb-2" aria-hidden="true" />
            <div className="ab-amb ab-amb-3" aria-hidden="true" />
            <div className="ab-gridbg" aria-hidden="true" />
            <div className="ab-grain" aria-hidden="true" />

            {/* ============================ HERO ============================ */}
            <header className="ab-hero ab-shell">
                <div className="ab-hero-copy">
                    <div className="ab-pill">
                        <i />
                        OPEN TO INTERNSHIPS · COLLABORATIONS
                    </div>

                    <p className="ab-kicker">ABOUT ME / THE PERSON BEHIND THE CODE</p>

                    <h1>
                        Ketan Kumar
                        <br />
                        <span>
                            Jha<b>.</b>
                        </span>
                    </h1>

                    <div className="ab-role">
                        <span className="ab-role-line" />
                        MERN STACK DEVELOPER
                        <em>/</em>
                        PROBLEM SOLVER
                        <em>/</em>
                        COMPETITIVE PROGRAMMER
                    </div>

                    <p className="ab-lead">{SUMMARY}</p>

                    <div className="ab-actions">
                        <a className="ab-btn primary" href={LINKEDIN} target="_blank" rel="noreferrer">
                            Connect on LinkedIn <Arrow />
                        </a>
                        <a className="ab-btn quiet" href={GITHUB} target="_blank" rel="noreferrer">
                            GitHub profile <Arrow />
                        </a>
                    </div>

                    <dl className="ab-facts">
                        <div>
                            <dt>BASED IN</dt>
                            <dd>Bengaluru, Karnataka</dd>
                        </div>
                        <div>
                            <dt>STUDYING</dt>
                            <dd>B.E. CSE · BMSIT&amp;M</dd>
                        </div>
                        <div>
                            <dt>LANGUAGES</dt>
                            <dd>Maithili · Hindi · English</dd>
                        </div>
                    </dl>
                </div>

                {/* ---- developer profile card (replaces the photo) ---- */}
                <div className="ab-visual" aria-label="Profile summary">
                    <div className="ab-glow" aria-hidden="true" />
                    <div className="ab-ring r1" aria-hidden="true" />
                    <div className="ab-ring r2" aria-hidden="true" />

                    <div className="ab-term">
                        <div className="ab-term-bar">
                            <span className="dots" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className="file">ketan.profile.js</span>
                            <span className="live">
                                <i /> LIVE
                            </span>
                        </div>

                        <div className="ab-term-id">
                            <div className="ab-mono-badge" aria-hidden="true">
                                <span>
                                    KJ<b>.</b>
                                </span>
                            </div>
                            <div>
                                <strong>Ketan Kumar Jha</strong>
                                <small>2nd-year CSE · Class of 2029</small>
                            </div>
                        </div>

                        <pre className="ab-code" aria-hidden="true">
                            <code>
                                <span className="k">const</span> <span className="v">ketan</span> <span className="p">=</span> {"{"}
                                {"\n"}
                                {"  "}role<span className="p">:</span> <span className="s">"MERN Developer"</span>,{"\n"}
                                {"  "}college<span className="p">:</span> <span className="s">"BMSIT&amp;M"</span>,{"\n"}
                                {"  "}cgpa<span className="p">:</span> <span className="n">8.95</span>,{"\n"}
                                {"  "}solved<span className="p">:</span> <span className="n">900</span>
                                <span className="p">+</span>,{"\n"}
                                {"  "}stack<span className="p">:</span> [<span className="s">"React"</span>, <span className="s">"Node"</span>,{"\n"}
                                {"          "}
                                <span className="s">"MongoDB"</span>],{"\n"}
                                {"  "}openTo<span className="p">:</span> [<span className="s">"internships"</span>,{"\n"}
                                {"          "}
                                <span className="s">"collabs"</span>],{"\n"}
                                {"}"};
                            </code>
                        </pre>

                        <div className="ab-term-foot">
                            <span>
                                <i /> Building · Learning · Shipping
                            </span>
                        </div>
                    </div>

                    <div className="ab-chips">
                    <div className="ab-chip c1">
                        <span className="ab-chip-ic">★</span>
                        <span>
                            <small>CURRENT CGPA</small>
                            <strong>8.95 / 10</strong>
                        </span>
                    </div>

                    <div className="ab-chip c2">
                        <span className="ab-chip-ic">{"</>"}</span>
                        <span>
                            <small>PROBLEMS SOLVED</small>
                            <strong>900+ overall</strong>
                        </span>
                    </div>
                    </div>
                </div>
            </header>

            {/* ========================== MARQUEE ========================== */}
            <div className="ab-marquee" aria-label="Core technologies">
                <div className="ab-marquee-track">
                    {[0, 1].map((copy) => (
                        <div className="ab-marquee-group" key={copy} aria-hidden={copy === 1}>
                            {MARQUEE.map((t) => (
                                <span key={t}>
                                    {t}
                                    <i>✳</i>
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* ========================== STAT STRIP ========================== */}
            <div className="ab-shell ab-stats-wrap">
                <div className="ab-stats" data-ab>
                    <div className="ab-stat">
                        <strong>
                            <Count to={8.95} decimals={2} />
                        </strong>
                        <span>CGPA · B.E. CSE</span>
                    </div>
                    <div className="ab-stat">
                        <strong>
                            <Count to={900} suffix="+" />
                        </strong>
                        <span>Problems solved</span>
                    </div>
                    <div className="ab-stat">
                        <strong>
                            <Count to={6} />
                        </strong>
                        <span>Coding platforms</span>
                    </div>
                    <div className="ab-stat">
                        <strong>
                            2<sup>nd</sup>
                        </strong>
                        <span>Year · Class of 2029</span>
                    </div>
                </div>
            </div>

            {/* ============================ STORY ============================ */}
            <section className="ab-shell ab-block">
                <Label n="01">WHO I AM</Label>

                <div className="ab-story">
                    <h2 className="ab-title" data-ab>
                        Not just writing code.
                        <br />
                        <span>Building with purpose.</span>
                    </h2>

                    <div className="ab-copy" data-ab>
                        <p>
                            I&apos;m a <strong>second-year Computer Science and Engineering</strong> student
                            at BMS Institute of Technology &amp; Management, Bengaluru. I like taking an idea
                            from a rough sketch to a working product, thinking through the interface, the
                            backend, and the experience in between.
                        </p>
                        <p>
                            Right now I&apos;m mastering <strong>DSA, full-stack development, AI and scalable
                            system design</strong>, and sharpening my fundamentals through consistent problem
                            solving: <strong>900+ problems</strong> across LeetCode, Codeforces, CodeChef,
                            GeeksforGeeks and TakeUForward.
                        </p>
                        <p>
                            I enjoy turning ideas into production-ready digital products with modern UI/UX
                            and optimized architecture.
                        </p>

                        <div className="ab-langs">
                            <small>LANGUAGES I SPEAK</small>
                            <ul>
                                {LANGUAGES.map((l) => (
                                    <li key={l.name}>
                                        <b>{l.name}</b>
                                        <span>{l.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="ab-focus">
                    {FOCUS.map((f, i) => (
                        <article className="ab-card ab-focus-card" key={f.n} data-ab style={{ "--d": `${i * 90}ms` }}>
                            <span className="ab-focus-n">{f.n}</span>
                            <span className="ab-focus-sym" aria-hidden="true">
                                {f.sym}
                            </span>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ========================== ACADEMICS ========================== */}
            <section className="ab-shell ab-block">
                <Label n="02">ACADEMICS</Label>

                <div className="ab-head" data-ab>
                    <h2 className="ab-title">
                        A strong base,
                        <br />
                        <span>year after year.</span>
                    </h2>
                    <p>Consistent results from school to university, with a current CGPA of 8.95.</p>
                </div>

                <div className="ab-edu">
                    {EDUCATION.map((e, i) => (
                        <article
                            className="ab-card ab-edu-card"
                            key={e.title}
                            data-ab
                            style={{ "--pct": `${e.pct}%`, "--d": `${i * 100}ms` }}
                        >
                            <span className="ab-edu-tag">{e.tag}</span>

                            <div className="ab-score">
                                <strong>
                                    <Count to={e.value} decimals={e.decimals} />
                                    <em>{e.unit}</em>
                                </strong>
                                <span>{e.label}</span>
                            </div>

                            <div className="ab-bar">
                                <i />
                            </div>

                            <h3>{e.title}</h3>
                            <p className="ab-school">{e.school}</p>
                            <p className="ab-where">
                                {e.place} · {e.period}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ======================= CODING PROFILES ======================= */}
            <section className="ab-shell ab-block">
                <Label n="03">CODING PROFILES</Label>

                <div className="ab-head" data-ab>
                    <h2 className="ab-title">
                        900+ problems,
                        <br />
                        <span>six platforms.</span>
                    </h2>
                    <p>
                        Practice happens everywhere: contests, daily problems and structured DSA roadmaps.
                        Every profile is public, so check the work yourself.
                    </p>
                </div>

                <div className="ab-platforms">
                    {PLATFORMS.map((p, i) => (
                        <a
                            key={p.name}
                            className="ab-card ab-plat"
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            data-ab
                            style={{ "--acc": p.acc, "--d": `${(i % 3) * 90}ms` }}
                        >
                            <div className="ab-plat-top">
                                <span className="ab-plat-mark">{p.mark}</span>
                                <span className="ab-plat-go">
                                    <Arrow />
                                </span>
                            </div>
                            <h3>{p.name}</h3>
                            <small>{p.kicker}</small>
                            <code>@{p.handle}</code>
                        </a>
                    ))}
                </div>
            </section>

            {/* ============================ SKILLS ============================ */}
            <section className="ab-shell ab-block">
                <Label n="04">THE TOOLKIT</Label>

                <div className="ab-head" data-ab>
                    <h2 className="ab-title">
                        Tools I use to
                        <br />
                        <span>make things happen.</span>
                    </h2>
                    <p>My toolkit keeps evolving. Filter by area to see what I work with.</p>
                </div>

                <div className="ab-filters" role="tablist" aria-label="Filter skills" data-ab>
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            type="button"
                            role="tab"
                            aria-selected={filter === f}
                            className={filter === f ? "on" : ""}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                    <span className="ab-count">{visibleSkills.length} shown</span>
                </div>

                <div className="ab-skills" key={filter}>
                    {visibleSkills.map(({ name, Icon, color }, i) => (
                        <span key={name} className="ab-skill" style={{ "--c": color, "--i": i }}>
                            <Icon />
                            {name}
                        </span>
                    ))}
                </div>
            </section>

            {/* ============================ JOURNEY ============================ */}
            <section className="ab-shell ab-block">
                <Label n="05">THE JOURNEY</Label>

                <div className="ab-head" data-ab>
                    <h2 className="ab-title">
                        From first line
                        <br />
                        <span>to what&apos;s next.</span>
                    </h2>
                </div>

                <div className="ab-timeline" ref={timelineRef}>
                    <div className="ab-rail" aria-hidden="true">
                        <i />
                    </div>

                    {TIMELINE.map((t, i) => (
                        <article
                            key={t.title}
                            className={`ab-card ab-tl ${t.future ? "future" : ""}`}
                            data-ab
                            style={{ "--d": `${i * 90}ms` }}
                        >
                            <span className="ab-tl-dot" aria-hidden="true" />
                            <span className="ab-tl-when">{t.when}</span>
                            <h3>{t.title}</h3>
                            <p>{t.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ========================== RECOGNITION ========================== */}
            <section className="ab-shell ab-block">
                <Label n="06">CERTIFICATIONS &amp; HONORS</Label>

                <div className="ab-reco">
                    {RECOGNITION.map((r, i) => (
                        <article
                            className="ab-card ab-reco-card"
                            key={r.title}
                            data-ab
                            style={{ "--d": `${i * 80}ms` }}
                        >
                            <span className="ab-reco-kind">{r.kind}</span>
                            <h3>{r.title}</h3>
                            <p>{r.meta}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ============================== CTA ============================== */}
            <section className="ab-shell ab-block ab-last">
                <div className="ab-cta" data-ab>
                    <p className="ab-kicker lime">HAVE AN IDEA?</p>
                    <h2>
                        Let&apos;s make
                        <br />
                        <span>it real.</span>
                    </h2>
                    <p className="ab-cta-text">
                        Open to learning opportunities, internships, collaborations, and conversations with
                        people who love building things.
                    </p>
                    <div className="ab-actions">
                        <a className="ab-btn primary" href={LINKEDIN} target="_blank" rel="noreferrer">
                            LinkedIn <Arrow />
                        </a>
                        <a className="ab-btn quiet" href={GITHUB} target="_blank" rel="noreferrer">
                            GitHub <Arrow />
                        </a>
                        <a className="ab-btn quiet" href={`mailto:${EMAIL}`}>
                            Email me <Arrow />
                        </a>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default About;