import "./Project.css";
import { useEffect } from "react";

function Project() {

    useEffect(() => {
        const cards = document.querySelectorAll(".project-card");

        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = -(y - rect.height / 2) / 18;
                const rotateY = (x - rect.width / 2) / 18;

                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
                card.style.setProperty("--x", `${x}px`);
                card.style.setProperty("--y", `${y}px`);
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = `rotateX(0) rotateY(0) scale(1)`;
            });
        });

    }, []);

    const projects = [
        {
            title: "Carbon Platform",
            desc: "Track emissions & AQI with real-world insights.",
            link: "https://github.com/ketankumarjha2007/Carbon_Footprint"
        },
        {
            title: "Calculator",
            desc: "Fast, responsive arithmetic engine with smooth UI.",
            link: "https://github.com/ketankumarjha2007/simple_calculator"
        },
        {
            title: "Todo App",
            desc: "Minimal task system designed for focus.",
            link: "https://github.com/ketankumarjha2007/todo-list"
        },
        {
            title: "Currency Converter",
            desc: "Live exchange logic with clean UX.",
            link: "https://github.com/ketankumarjha2007/currency_converter"
        },
        {
            title: "Rock Paper Scissors",
            desc: "Interactive gameplay using JS logic.",
            link: "https://github.com/ketankumarjha2007/Rock_paper_scissors_game"
        },
        {
            title: "Digital Watch",
            desc: "Real-time animated clock system.",
            link: "https://github.com/ketankumarjha2007/digital_watch"
        }
    ];

    return (
        <section className="projects">

            <h1 className="projects-title">Projects</h1>
            <p className="projects-subtitle">
                Designed to feel. Built to perform.
            </p>

            <div className="projects-grid">
                {projects.map((p, i) => (
                    <div className="project-card" key={i}>
                        <div className="shine"></div>

<<<<<<< HEAD
                <div className="project-card">
                    <h3>Calculator App</h3>
                    <p>
                        A simple calculator built using HTML, CSS, and JavaScript with
                        basic arithmetic functionality.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/simple_calculator"
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                    >
                        View on GitHub
                    </a>
                </div>

                <div className="project-card">
                    <h3>Todo List</h3>
                    <p>
                        A task management app to add, delete, and manage daily tasks.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/todo-list"
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                    >
                        View on GitHub
                    </a>
                </div>

                <div className="project-card">
                    <h3>Carbon Footprint and AQI monitoring platform</h3>
                    <p>
                        Calculates carbon footprint and AQI based on user inputs and city details to promote awareness.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/Carbon_Footprint"
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                    >
                        View on GitHub
                    </a>
                </div>

                <div className="project-card">
                    <h3>Currency Converter</h3>
                    <p>
                        A JavaScript-based currency converter using exchange rate logic.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/currency_converter"
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                    >
                        View on GitHub
                    </a>
                </div>

                <div className="project-card">
                    <h3>Rock Paper Scissors</h3>
                    <p>
                        A fun interactive game showcasing JavaScript logic and DOM manipulation.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/Rock_paper_scissors_game"
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                    >
                        View on GitHub
                    </a>
                </div>

                <div className="project-card">
                    <h3>Digital Watch</h3>
                    <p>
                        A real-time digital clock using JavaScript date and time functions.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/digital_watch"
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                    >
                        View on GitHub
                    </a>
                </div>
=======
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
>>>>>>> d1abeca (added many features and improve UI)

                        <a href={p.link} target="_blank" rel="noreferrer">
                            Explore →
                        </a>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Project;