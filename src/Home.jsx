import { useEffect, useRef, useState } from "react";
import "./Home.css";
import profile from "./assets/profile.jpg";

function Home() {
  const glowRef = useRef(null);
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState("");
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(-1);

  /* ================= TYPEWRITER ================= */
  const typeLine = (text) => {
    let i = 0;
    let temp = "";

    const interval = setInterval(() => {
      temp += text[i];
      setCurrent(temp);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        setLines((prev) => [...prev, temp]);
        setCurrent("");
      }
    }, 18);
  };

  /* ================= AI OS COMMAND SYSTEM ================= */
  const runCommand = (cmd) => {
    let output = [];

    switch (cmd) {
      case "help":
        output = [
          "Available Commands:",
          "about  → who am I",
          "projects → open work",
          "contact → get info",
          "resume → download CV",
          "clear → reset terminal",
          "hack → ???"
        ];
        break;

      case "about":
        output = [
          "Initializing profile...",
          "Name: Ketan",
          "Role: Full Stack Developer",
          "Focus: Secure + Scalable Systems"
        ];
        break;

      case "projects":
        output = ["Accessing project directory..."];
        setTimeout(() => (window.location.href = "/project"), 1000);
        break;

      case "contact":
        output = [
          "Establishing secure channel...",
          "Email: ketankumarjha70@gmail.com",
          "Mobile: +91 7903156445"
        ];
        break;

      case "resume":
        output = ["Opening resume..."];
        setTimeout(() => {
          window.open("/resume.pdf");
        }, 800);
        break;

      case "hack":
        output = [
          "Bypassing firewall...",
          "Injecting payload...",
          "Access Denied ",
          "Nice try "
        ];
        break;

      case "clear":
        setLines([]);
        return;

      default:
        output = ["Command not recognized. Type 'help'"];
    }

    setLines((prev) => [...prev, "> " + cmd]);

    output.forEach((line, i) => {
      setTimeout(() => {
        typeLine(line);
      }, i * 350);
    });
  };
  const handleKey = (e) => {
    if (e.key === "Enter") {
      const cmd = e.target.value.trim().toLowerCase();
      if (!cmd) return;

      setHistory((prev) => [...prev, cmd]);
      setIndex(-1);

      runCommand(cmd);
      e.target.value = "";
    }

    /* HISTORY NAV */
    if (e.key === "ArrowUp") {
      if (history.length === 0) return;
      const newIndex = index < history.length - 1 ? index + 1 : index;
      setIndex(newIndex);
      e.target.value = history[history.length - 1 - newIndex];
    }

    if (e.key === "ArrowDown") {
      if (index <= 0) {
        setIndex(-1);
        e.target.value = "";
      } else {
        const newIndex = index - 1;
        setIndex(newIndex);
        e.target.value = history[history.length - 1 - newIndex];
      }
    }
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop =
        terminalBodyRef.current.scrollHeight;
    }
  }, [lines, current]);

  useEffect(() => {
    const boot = [
      "Booting KETAN OS...",
      "Injecting modules ██████████",
      "Bypassing firewall...",
      "Access granted.",
      "Welcome, Ketan."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < boot.length) {
        setLines((prev) => [...prev, boot[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const move = (e) => {
      glowRef.current.style.left = e.clientX + "px";
      glowRef.current.style.top = e.clientY + "px";

      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;

      cardRef.current.style.transform =
        `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="container">

      {/* SYSTEM STATUS */}
      <div className="system-bar">SYSTEM ONLINE</div>

      {/* CURSOR */}
      <div className="cursor-glow" ref={glowRef}></div>

      {/* NAV */}
      <header className="nav">
        <div className="logo">KETAN.exe</div>
        <div className="nav-links">
          <a href="/about">about</a>
          <a href="/project">projects</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">

        {/* LEFT */}
        <div className="left">

          <h1 className="title">
            <span>Ketan Jha</span>
          </h1>

          <p className="subtitle">Full Stack Developer</p>

          <p className="desc">
            Secure systems. Scalable architecture. Clean execution.
          </p>

          {/* TERMINAL */}
          <div className="terminal">

            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <p>KETAN SYSTEM</p>
            </div>

            <div className="terminal-body" ref={terminalBodyRef}>
              {lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {current && <p>{current}</p>}
            </div>

            <div className="terminal-input">
              <span>&gt;</span>
              <input ref={inputRef} onKeyDown={handleKey} autoFocus />
              <span className="cursor-blink">|</span>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="buttons">
            <a href="/project" className="btn primary">View Work</a>
            <a href="/resume.pdf" className="btn ghost">Resume</a>
          </div>

        </div>

        {/* RIGHT */}
        <div className="right">
          <div ref={cardRef} className="profile-card">
            <img src={profile} alt="profile" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default Home;