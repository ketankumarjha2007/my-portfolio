import "./About.css";

function About() {
    return (
        <section className="about-section">
            <h1 className="about-title">
                Know Who <span>I'M</span>
            </h1>

            <p>
                Hi everyone! I’m <strong>Ketan Kumar Jha</strong>, currently pursuing my
                undergraduate studies at <strong>BMS Institute of Technology & Management,
                Bengaluru</strong>. I’m in my <strong>2nd semester</strong> and passionate
                about learning and building with technology.
            </p>

            <p>
                I have a strong foundation in <strong>HTML, CSS, JavaScript, C, C++</strong>,
                and <strong>Python</strong>. I have built <strong>6 projects</strong> so far
                and I’m currently learning <strong>React</strong> to develop modern and
                interactive web applications.
            </p>

            <p>
                Apart from coding, here are a few things I enjoy doing:
            </p>

            <ul className="about-hobbies">
                <li>Playing Games</li>
                <li>Building and Exploring Projects</li>
                <li>Learning New Technologies</li>
                <li>Improving Myself Every Day</li>
            </ul>

            <p className="quote">
                “Strive to build things that make a difference!”
            </p>

            <h2 className="signature">— Ketan Kumar Jha</h2>

            <h2 className="section-title">Professional Skillset</h2>
            <div className="skills-grid">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>React</span>
                <span>Python</span>
                <span>C</span>
                <span>C++</span>
                <span>Git</span>
            </div>

            <h2 className="section-title">Tools I Use</h2>
            <div className="skills-grid">
                <span>VS Code</span>
                <span>GitHub</span>
                <span>Chrome</span>
                <span>Windows</span>
            </div>
        </section>
    );
}

export default About;
