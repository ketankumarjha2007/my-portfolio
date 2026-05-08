import { useEffect, useRef } from "react";
import "./Home.css";
import profile from "./assets/profile.jpg";
import { Link } from "react-router-dom";

function Home() {
  const glowRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }

      if (cardRef.current) {
        const x = (window.innerWidth / 2 - e.clientX) / 35;
        const y = (window.innerHeight / 2 - e.clientY) / 35;

        cardRef.current.style.transform = `
          rotateY(${x}deg)
          rotateX(${y}deg)
        `;
      }
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="container">

      {/* CURSOR GLOW */}
      <div className="cursor-glow" ref={glowRef}></div>

      {/* HERO SECTION */}
      <section className="hero">

        {/* LEFT SIDE */}
        <div className="left">

          <div className="badge">
            🚀 Full Stack Developer
          </div>

          <h1 className="title">
            Hi, I'm
            <span> Ketan Kumar Jha </span>
          </h1>

          <p className="subtitle">
            Passionate Full Stack Developer focused on building
            modern, scalable, and impactful web applications.
            I love creating beautiful user experiences,
            solving real-world problems, and exploring new technologies.
          </p>

          {/* STATS */}
          <div className="stats">

            <div className="stat-card">
              <h2>10+</h2>
              <p>Projects Built</p>
            </div>

            <div className="stat-card">
              <h2>MERN</h2>
              <p>Tech Stack</p>
            </div>

            <div className="stat-card">
              <h2>AI + IoT</h2>
              <p>Explorer</p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="buttons">

            <Link to="/project" className="btn primary">
              View Projects
            </Link>

            <a
              href="/resume.pdf"
              download="KETAN_RESUME.pdf"
              className="btn secondary"
            >
              Download Resume
            </a>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="right">

          <div ref={cardRef} className="profile-card">

            <img src={profile} alt="Ketan" />

            <div className="card-content">
              <h2>Ketan Kumar Jha</h2>
              <p>Full Stack Developer</p>
            </div>

          </div>

        </div>

      </section>
      <section className="features">

        <div className="feature-card">
          <h3>Web Development</h3>
          <p>
            Building responsive and high-performance
            full stack web applications using modern technologies.
          </p>
        </div>

        <div className="feature-card">
          <h3> Problem Solving</h3>
          <p>
            Solving DSA and competitive programming problems
            with optimized and efficient approaches.
          </p>
        </div>

        <div className="feature-card">
          <h3> Innovation</h3>
          <p>
            Exploring AI, IoT, and sustainability-focused
            projects to create impactful solutions.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;