import "./Project.css";

function Project() {
    return (
        <section className="projects">
            <h1 className="projects-title">My Projects</h1>
            <p className="projects-subtitle">
                Here are some projects I’ve built while learning and exploring web development.
            </p>

            <div className="projects-grid">

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
                    <h3>Carbon Footprint Calculator</h3>
                    <p>
                        Calculates carbon footprint based on user inputs to promote awareness.
                    </p>
                    <a
                        href="https://github.com/ketankumarjha2007/Carbon-footprint-calcultor"
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

            </div>
        </section>
    );
}

export default Project;

