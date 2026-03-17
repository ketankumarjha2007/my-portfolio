import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./Home.css";
import profile from "./assets/profile.jpg";
import { Link } from "react-router-dom";
function Home() {
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const move = (e) => {
      const glow = document.querySelector(".cursor-glow");
      if (glow) {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="cursor-glow"></div>
      {showResume && (
        <div className="modal-overlay" onClick={() => setShowResume(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowResume(false)}
            >
              ✖
            </button>
            <iframe
              src="/resume.pdf"
              title="Resume"
              className="resume-frame"
            ></iframe>
            <a href="/resume.pdf" download="KETAN_RESUME.pdf">
              <button className="btn primary download-btn">
                ⬇ Download Resume
              </button>
            </a>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <h1>
              Hi, I’m <span className="name">Ketan</span>
            </h1>

            <h2 className="typing">
              <Typewriter
                words={[
                  "a Full Stack Developer",
                  "a Problem Solver",
                  "a Tech Enthusiast",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1200}
              />
            </h2>

            <p className="desc">
              I craft high-performance web apps with stunning UI and scalable backend systems.
            </p>

            {/* BUTTONS */}
            <div className="buttons">
              <Link to="/project" className="btn primary">Projects</Link>
              <button
                className="btn ghost"
                onClick={() => setShowResume(true)}
              >
                👁 View Resume
              </button>

              <a href="/resume.pdf" download="KETAN_RESUME.pdf">
                <button className="btn primary">
                  ⬇ Download Resume
                </button>
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="profile-card">
              <img src={profile} alt="profile" />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;
