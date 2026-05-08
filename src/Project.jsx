import "./Project.css";
import { useEffect } from "react";
import {
    ExternalLink,
    Sparkles
} from "lucide-react";

function Project() {

    useEffect(() => {

        const cards = document.querySelectorAll(".project-card");

        cards.forEach(card => {

            const move = (e) => {

                const rect = card.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX =
                    -(y - rect.height / 2) / 20;

                const rotateY =
                    (x - rect.width / 2) / 20;

                card.style.transform = `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.02)
                `;

                card.style.setProperty("--x", `${x}px`);
                card.style.setProperty("--y", `${y}px`);
            };

            const leave = () => {

                card.style.transform = `
                    perspective(1200px)
                    rotateX(0deg)
                    rotateY(0deg)
                    translateY(0px)
                    scale(1)
                `;
            };

            card.addEventListener("mousemove", move);
            card.addEventListener("mouseleave", leave);

        });

    }, []);

    const projects = [
        {
            title: "CarbonTrack",
            desc: "AI-powered sustainability platform with carbon tracking, AQI monitoring, and smart environmental analytics.",
            tech: "React • Node • IoT • Firebase",
            link: "https://github.com/ketankumarjha2007/Carbon_Footprint"
        },

        {
            title: "Calculator",
            desc: "Modern arithmetic engine featuring responsive UI, smooth animations, and optimized calculations.",
            tech: "HTML • CSS • JS",
            link: "https://github.com/ketankumarjha2007/simple_calculator"
        },

        {
            title: "Todo App",
            desc: "Minimal productivity system designed for efficient task management and focused workflow.",
            tech: "React • Local Storage",
            link: "https://github.com/ketankumarjha2007/todo-list"
        },

        {
            title: "Currency Converter",
            desc: "Real-time exchange converter with elegant UI and accurate currency conversion logic.",
            tech: "API • JavaScript",
            link: "https://github.com/ketankumarjha2007/currency_converter"
        },

        {
            title: "Rock Paper Scissors",
            desc: "Interactive game experience built with dynamic animations and engaging gameplay logic.",
            tech: "JavaScript • Game Logic",
            link: "https://github.com/ketankumarjha2007/Rock_paper_scissors_game"
        },

        {
            title: "Digital Watch",
            desc: "Real-time animated digital clock system with elegant glassmorphism interface.",
            tech: "JavaScript • UI Design",
            link: "https://github.com/ketankumarjha2007/digital_watch"
        }
    ];

    return (

        <section className="projects-section">

            {/* BACKGROUND GLOW */}
            <div className="projects-bg"></div>

            {/* HEADER */}
            <div className="projects-header">

                <div className="projects-badge">
                    <Sparkles size={16} />
                    Featured Work
                </div>

                <h1 className="projects-title">
                    Crafted With
                    <span> Passion & Precision </span>
                </h1>

                <p className="projects-subtitle">
                    A collection of projects focused on performance,
                    user experience, creativity, and real-world impact.
                </p>

            </div>

            {/* GRID */}
            <div className="projects-grid">

                {projects.map((p, i) => (

                    <div className="project-card" key={i}>

                        {/* SHINE */}
                        <div className="shine"></div>

                        {/* NUMBER */}
                        <div className="project-number">
                            0{i + 1}
                        </div>

                        {/* CONTENT */}
                        <div className="project-content">

                            <h3>{p.title}</h3>

                            <p>{p.desc}</p>

                            <div className="project-tech">
                                {p.tech}
                            </div>

                        </div>

                        {/* FOOTER */}
                        <div className="project-footer">

                            <a
                                href={p.link}
                                target="_blank"
                                rel="noreferrer"
                                className="project-btn"
                            >

                                View Project

                                <ExternalLink size={16} />

                            </a>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Project;