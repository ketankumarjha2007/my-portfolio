import "./About.css";
import { useEffect } from "react";

import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython,
    FaNodeJs, FaGitAlt, FaChrome, FaCode
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
                const x = (e.clientX - rect.left - rect.width / 2) / 8;
                const y = (e.clientY - rect.top - rect.height / 2) / 8;
                el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            };

            const leave = () => {
                el.style.transform = "translate(0,0) scale(1)";
            };

            el.addEventListener("mousemove", move);
            el.addEventListener("mouseleave", leave);

            handlers.push({ el, move, leave });
        });
        const glow = document.querySelector(".cursor-glow");

        const moveGlow = (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        };

        window.addEventListener("mousemove", moveGlow);

        return () => {
            fadeEls.forEach(el => observer.unobserve(el));
            handlers.forEach(({ el, move, leave }) => {
                el.removeEventListener("mousemove", move);
                el.removeEventListener("mouseleave", leave);
            });
            window.removeEventListener("mousemove", moveGlow);
        };

    }, []);

    return (
        <section className="about">
            <div className="cursor-glow"></div>

            <div className="about-wrapper">
                <div className="about-left fade">
                    <h1>About</h1>

                    <p className="tagline">
                        Building systems that scale. Designing experiences that last.
                    </p>

                    <div className="line"></div>

                    <p className="highlight">
                        I am <strong>Ketan Kumar Jha</strong> — crafting fast,
                        scalable, and production-ready web systems.
                    </p>
                    <br />
                    <p>
                        Pursuing B.Tech at <strong>BMS Institute of Technology</strong> (2025),
                        focused on Data Structures and system design,currently in my <strong>2nd sem</strong>.
                    </p>
                    <br />
                    <p>
                        I focus on performance, clean architecture,
                        and seamless user experiences.
                    </p>
                </div>
                <div className="about-right fade">

                    <h2>Skills</h2>

                    <div className="skills glass">

                        <span className="magnetic"><FaHtml5 /> HTML</span>
                        <span className="magnetic"><FaCss3Alt /> CSS</span>
                        <span className="magnetic"><FaJs /> JavaScript</span>
                        <span className="magnetic"><FaReact /> React</span>
                        <span className="magnetic"><FaPython /> Python</span>

                        <span className="magnetic text-chip"><FaCode /> C</span>
                        <span className="magnetic text-chip"><FaCode /> C++</span>

                        <span className="magnetic"><FaNodeJs /> Node.js</span>
                        <span className="magnetic text-chip">MongoDB</span>
                        <span className="magnetic text-chip">MySQL</span>
                        <span className="magnetic"><FaGitAlt /> Git</span>
                        <span className="magnetic text-chip"><FaCode /> Express.js</span>

                    </div>

                    <h2 className="tools-title">Tools</h2>

                    <div className="skills glass">
                        <span className="magnetic text-chip">VS Code</span>
                        <span className="magnetic text-chip">GitHub</span>
                        <span className="magnetic text-chip">Vercel</span>
                        <span className="magnetic text-chip">Railway</span>
                        <span className="magnetic text-chip">Render</span>
                        <span className="magnetic"><FaChrome /> Chrome</span>
                    </div>

                    <h2 className="journey-title">Journey</h2>

                    <div className="timeline">
                        <div className="timeline-item">
                            <span> 2025</span>
                            <p>Started B.Tech and entered development</p>
                        </div>

                        <div className="timeline-item">
                            <span> 2025 — Present</span>
                            <p>Building projects and mastering DSA</p>
                        </div>

                        <div className="timeline-item future">
                            <span> Next</span>
                            <p>Building impactful scalable products</p>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;