import Navbar from "./Navbar";
import { Typewriter } from "react-simple-typewriter";
import "./Home.css";
import profile from "./assets/profile.jpeg";

function Home() {
    return (
        <>
            <header className="hero">
                <Navbar />

                <div className="hero-content">
                    <div className="hero-text">
                        <h1>
                            Hi, I’m{" "}
                            <span className="highlight">
                                <Typewriter
                                    words={[
                                        "Ketan",
                                        "a Frontend Developer",
                                        "a React Developer",
                                    ]}
                                    loop={0}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={80}
                                    deleteSpeed={60}
                                    delaySpeed={1500}
                                />
                            </span>
                        </h1>
                    </div>

                    <div className="hero-image">
                        <img src={profile} alt="Ketan profile" />
                    </div>
                </div>
            </header>

            <section className="intro">
                <h2 className="intro-title">LET ME INTRODUCE MYSELF</h2>

                <p>
                    I’m <strong>Ketan Kumar Jha</strong>, a passionate learner and aspiring
                    <strong> Software Engineer</strong> who enjoys transforming ideas into
                    clean, functional, and user-friendly web applications.
                </p>

                <p>
                    Over time, I’ve explored different programming languages and technologies
                    and found my interest in building interactive user interfaces and
                    scalable web solutions.
                </p>

                <p>
                    I’m proficient in <strong>HTML, CSS, JavaScript, C, C++</strong>, and
                    <strong> Python</strong>, and I’m currently learning
                    <strong> React</strong> to strengthen my frontend development skills.
                </p>

                <p>
                    My key areas of interest include <strong>Web Development</strong>,
                    building real-world projects, and continuously improving my
                    problem-solving abilities.
                </p>

                <p>
                    Whenever possible, I enjoy building projects using modern tools and
                    frameworks while learning best practices to write clean and efficient
                    code.
                </p>
            </section>
        </>
    );
}

export default Home;
