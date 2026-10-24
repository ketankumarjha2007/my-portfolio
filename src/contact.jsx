import "./contact.css";

import { useEffect, useRef, useState } from "react";

import emailjs from "@emailjs/browser";

import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaPaperPlane,
    FaCopy,
    FaCheck,
    FaArrowUpRightFromSquare,
    FaCircleCheck,
    FaCircleExclamation,
} from "react-icons/fa6";

const EMAIL = "ketankumarjha70@gmail.com";
const MAX_CHARS = 600;

const SOCIALS = [
    {
        label: "GitHub",
        value: "@ketankumarjha2007",
        href: "https://github.com/ketankumarjha2007",
        Icon: FaGithub,
    },
    {
        label: "LinkedIn",
        value: "Ketan Kumar Jha",
        href: "https://www.linkedin.com/in/ketan-kumar-jha-499064305/",
        Icon: FaLinkedin,
    },
];

const TOPICS = ["Collaboration", "Project", "Internship", "Just saying hi"];

function Contact() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const tiltRef = useRef(null);

    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [chars, setChars] = useState(0);
    const [copied, setCopied] = useState(false);
    const [topic, setTopic] = useState(TOPICS[0]);

    /* ---------- reveal on scroll ---------- */
    useEffect(() => {
        const els = sectionRef.current?.querySelectorAll("[data-reveal]");
        if (!els) return;

        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        en.target.classList.add("is-in");
                        io.unobserve(en.target);
                    }
                }),
            { threshold: 0.15 }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    /* ---------- cursor spotlight (no re-render) ---------- */
    const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const handleSectionMove = (e) => {
        if (!canHover) return;
        const r = sectionRef.current.getBoundingClientRect();
        sectionRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        sectionRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    /* ---------- 3D tilt on form card ---------- */
    const handleTiltMove = (e) => {
        if (!canHover || !tiltRef.current) return;
        const r = tiltRef.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tiltRef.current.style.setProperty("--ry", `${px * 6}deg`);
        tiltRef.current.style.setProperty("--rx", `${py * -6}deg`);
    };

    const resetTilt = () => {
        if (!tiltRef.current) return;
        tiltRef.current.style.setProperty("--ry", "0deg");
        tiltRef.current.style.setProperty("--rx", "0deg");
    };

    /* ---------- copy email ---------- */
    const copyEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    /* ---------- send ---------- */
    const sendEmail = (e) => {
        e.preventDefault();
        if (status === "sending") return;

        // honeypot: bots fill hidden fields
        if (formRef.current.elements.company?.value) {
            setStatus("success");
            formRef.current.reset();
            return;
        }

        setStatus("sending");

        emailjs
            .sendForm(
                "service_35b7czb",
                "template_2l4b4sy",
                formRef.current,
                "AgJz8ubKOhKnwN_LV"
            )
            .then(() => {
                setStatus("success");
                setChars(0);
                formRef.current.reset();
                setTopic(TOPICS[0]);
                setTimeout(() => setStatus("idle"), 6000);
            })
            .catch(() => {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 6000);
            });
    };

    return (
        <section
            className="contact"
            ref={sectionRef}
            onMouseMove={handleSectionMove}
            id="contact"
        >
            {/* ===== ATMOSPHERE ===== */}
            <div className="ct-aurora" aria-hidden="true">
                <span className="blob b1" />
                <span className="blob b2" />
                <span className="blob b3" />
            </div>
            <div className="ct-grid" aria-hidden="true" />
            <div className="ct-spotlight" aria-hidden="true" />
            <div className="ct-noise" aria-hidden="true" />

            <div className="contact-container">
                {/* ================= LEFT ================= */}
                <div className="contact-left">
                    <div className="contact-badge" data-reveal style={{ "--d": "0ms" }}>
                        <span className="pulse-dot" />
                        Available for new opportunities
                    </div>

                    <h1 data-reveal style={{ "--d": "80ms" }}>
                        Let’s build
                        <br />
                        something <span className="grad">legendary</span>
                    </h1>

                    <p className="contact-text" data-reveal style={{ "--d": "160ms" }}>
                        Have an idea, a collaboration, or a project in mind? I’m always
                        open to talking about technology, development, AI, startups and
                        innovation. Drop a message and I’ll get back to you soon.
                    </p>

                    {/* quick stats */}
                    <div className="ct-stats" data-reveal style={{ "--d": "240ms" }}>
                        <div className="stat">
                            <strong>&lt; 24h</strong>
                            <span>Avg. reply</span>
                        </div>
                        <div className="stat">
                            <strong>100%</strong>
                            <span>Read by me</span>
                        </div>
                        <div className="stat">
                            <strong>24/7</strong>
                            <span>Open inbox</span>
                        </div>
                    </div>

                    {/* contact cards */}
                    <div className="contact-info">
                        <a
                            href={`mailto:${EMAIL}`}
                            className="info-card"
                            data-reveal
                            style={{ "--d": "320ms" }}
                        >
                            <span className="ic">
                                <FaEnvelope />
                            </span>
                            <span className="meta">
                                <small>Email</small>
                                <b>{EMAIL}</b>
                            </span>
                            <button
                                type="button"
                                className={`copy-btn ${copied ? "ok" : ""}`}
                                onClick={copyEmail}
                                aria-label="Copy email address"
                            >
                                {copied ? <FaCheck /> : <FaCopy />}
                                <span>{copied ? "Copied" : "Copy"}</span>
                            </button>
                        </a>

                        {SOCIALS.map(({ label, value, href, Icon }, i) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="info-card"
                                data-reveal
                                style={{ "--d": `${400 + i * 80}ms` }}
                            >
                                <span className="ic">
                                    <Icon />
                                </span>
                                <span className="meta">
                                    <small>{label}</small>
                                    <b>{value}</b>
                                </span>
                                <FaArrowUpRightFromSquare className="go" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="contact-right" data-reveal style={{ "--d": "200ms" }}>
                    <div
                        className="tilt"
                        ref={tiltRef}
                        onMouseMove={handleTiltMove}
                        onMouseLeave={resetTilt}
                    >
                        <div className="form-shell">
                            <form
                                ref={formRef}
                                onSubmit={sendEmail}
                                className="contact-form"
                                noValidate={false}
                            >
                                <div className="form-head">
                                    <h2>Send a message</h2>
                                    <p>I usually respond within a day.</p>
                                </div>

                                {/* topic chips (sent as a field) */}
                                <div className="chips" role="radiogroup" aria-label="Topic">
                                    {TOPICS.map((t) => (
                                        <button
                                            type="button"
                                            key={t}
                                            role="radio"
                                            aria-checked={topic === t}
                                            className={`chip ${topic === t ? "on" : ""}`}
                                            onClick={() => setTopic(t)}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <input type="hidden" name="topic" value={topic} />

                                {/* honeypot */}
                                <input
                                    type="text"
                                    name="company"
                                    tabIndex="-1"
                                    autoComplete="off"
                                    className="hp"
                                    aria-hidden="true"
                                />

                                <div className="field">
                                    <input
                                        id="ct-name"
                                        type="text"
                                        name="user_name"
                                        placeholder=" "
                                        autoComplete="name"
                                        required
                                    />
                                    <label htmlFor="ct-name">Your name</label>
                                    <i className="bar" />
                                </div>

                                <div className="field">
                                    <input
                                        id="ct-email"
                                        type="email"
                                        name="user_email"
                                        placeholder=" "
                                        autoComplete="email"
                                        required
                                    />
                                    <label htmlFor="ct-email">Your email</label>
                                    <i className="bar" />
                                </div>

                                <div className="field">
                                    <textarea
                                        id="ct-msg"
                                        name="message"
                                        rows="5"
                                        placeholder=" "
                                        maxLength={MAX_CHARS}
                                        onChange={(e) => setChars(e.target.value.length)}
                                        required
                                    />
                                    <label htmlFor="ct-msg">Tell me about your idea…</label>
                                    <i className="bar" />
                                    <span className={`count ${chars > MAX_CHARS - 50 ? "warn" : ""}`}>
                                        {chars}/{MAX_CHARS}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className={`send ${status}`}
                                    disabled={status === "sending"}
                                >
                                    <span className="send-bg" />
                                    <span className="send-inner">
                                        {status === "sending" ? (
                                            <>
                                                <span className="spinner" /> Sending…
                                            </>
                                        ) : status === "success" ? (
                                            <>
                                                <FaCheck /> Sent!
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane /> Send Message
                                            </>
                                        )}
                                    </span>
                                </button>

                                <div className="status-slot" aria-live="polite">
                                    {status === "success" && (
                                        <div className="notice ok">
                                            <FaCircleCheck /> Message sent successfully. Talk soon!
                                        </div>
                                    )}
                                    {status === "error" && (
                                        <div className="notice bad">
                                            <FaCircleExclamation /> Something went wrong. Please try
                                            again or email me directly.
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;