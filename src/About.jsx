import "./About.css";
import { useEffect } from "react";

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
    FaDatabase
} from "react-icons/fa";

function About() {

    useEffect(() => {

        const fadeEls = document.querySelectorAll(".fade");

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        }, { threshold: 0.15 });

        fadeEls.forEach(el => observer.observe(el));

        const magneticEls = document.querySelectorAll(".magnetic");

        const handlers = [];

        magneticEls.forEach(el => {

            const move = (e) => {

                const rect = el.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left - rect.width / 2) / 8;

                const y =
                    (e.clientY - rect.top - rect.height / 2) / 8;

                el.style.transform =
                    `translate(${x}px, ${y}px) scale(1.05)`;
            };

            const leave = () => {
                el.style.transform =
                    "translate(0,0) scale(1)";
            };

            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);

            handlers.push({ el, move, leave });

        });

        const glow = document.querySelector(".cursor-glow");

        const moveGlow = (e) => {

            if (glow) {

                glow.style.left = e.clientX + "px";
                glow.style.top = e.clientY + "px";
            }
        };

        window.addEventListener("mousemove", moveGlow);

        return () => {

            fadeEls.forEach(el =>
                observer.unobserve(el)
            );

            handlers.forEach(({ el, move, leave }) => {

                el.removeEventListener("mousemove", move);

                el.removeEventListener("mouseleave", leave);

            });

            window.removeEventListener("mousemove", moveGlow);
        };

    }, []);

    return (

        <section className="about">

            {/* CURSOR GLOW */}
            <div className="cursor-glow"></div>

            <div className="about-wrapper">

                {/* LEFT SIDE */}
                <div className="about-left fade">

                    <div className="about-badge">
                        <FaRocket />
                        Full Stack Developer
                    </div>

                    <h1>
                        About <span>Me</span>
                    </h1>

                    <p className="tagline">
                        Building systems that scale.
                        Designing experiences that last.
                    </p>

                    <div className="line"></div>

                    <p className="highlight">
                        I'm <strong>Ketan Kumar Jha</strong> —
                        a passionate developer focused on creating
                        high-performance web applications,
                        impactful products, and futuristic experiences.
                    </p>

                    <p>
                        Currently pursuing B.Tech at
                        <strong> BMS Institute of Technology </strong>
                        and actively mastering
                        <strong> DSA, Full Stack Development,
                            AI, and scalable system design.</strong>
                    </p>

                    <p>
                        I enjoy transforming ideas into beautiful,
                        production-ready digital products with
                        modern UI/UX and optimized architecture.
                    </p>

                    {/* STATS */}
                    <div className="about-stats">

                        <div className="stat-box magnetic">
                            <h2>10+</h2>
                            <span>Projects</span>
                        </div>

                        <div className="stat-box magnetic">
                            <h2>MERN</h2>
                            <span>Stack</span>
                        </div>

                        <div className="stat-box magnetic">
                            <h2>AI</h2>
                            <span>Explorer</span>
                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="about-right fade">

                    {/* SKILLS */}
                    <div className="glass section-card">

                        <div className="section-heading">

                            <FaLaptopCode />

                            <h2>Skills</h2>

                        </div>

                        <div className="skills">

                            <span className="magnetic">
                                <FaHtml5 /> HTML
                            </span>

                            <span className="magnetic">
                                <FaCss3Alt /> CSS
                            </span>

                            <span className="magnetic">
                                <FaJs /> JavaScript
                            </span>

                            <span className="magnetic">
                                <FaReact /> React
                            </span>

                            <span className="magnetic">
                                <FaNodeJs /> Node.js
                            </span>

                            <span className="magnetic">
                                <FaPython /> Python
                            </span>

                            <span className="magnetic">
                                <FaCode /> C
                            </span>

                            <span className="magnetic">
                                <FaCode /> C++
                            </span>

                            <span className="magnetic">
                                <FaDatabase /> MongoDB
                            </span>

                            <span className="magnetic">
                                <FaDatabase /> MySQL
                            </span>

                            <span className="magnetic">
                                <FaGitAlt /> Git
                            </span>

                            <span className="magnetic">
                                <FaCode /> Express.js
                            </span>

                        </div>

                    </div>

                    {/* TOOLS */}
                    <div className="glass section-card">

                        <div className="section-heading">

                            <FaChrome />

                            <h2>Tools & Platforms</h2>

                        </div>

                        <div className="skills">

                            <span className="magnetic">
                                VS Code
                            </span>

                            <span className="magnetic">
                                GitHub
                            </span>

                            <span className="magnetic">
                                Vercel
                            </span>

                            <span className="magnetic">
                                Railway
                            </span>

                            <span className="magnetic">
                                Render
                            </span>

                            <span className="magnetic">
                                Chrome DevTools
                            </span>

                        </div>

                    </div>

                    {/* JOURNEY */}
                    <div className="glass section-card">

                        <div className="section-heading">

                            <FaRocket />

                            <h2>Journey</h2>

                        </div>

                        <div className="timeline">

                            <div className="timeline-item">

                                <span>2025</span>

                                <p>
                                    Started B.Tech and entered
                                    the world of development.
                                </p>

                            </div>

                            <div className="timeline-item">

                                <span>2025 — Present</span>

                                <p>
                                    Building real-world projects
                                    and mastering DSA.
                                </p>

                            </div>

                            <div className="timeline-item future">

                                <span>Next Mission</span>

                                <p>
                                    Building impactful scalable
                                    products.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;