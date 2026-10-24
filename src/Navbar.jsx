import { Link, NavLink, useLocation } from "react-router-dom";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./Navbar.css";

const GITHUB = "https://github.com/ketankumarjha2007";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/project", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Navbar() {
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false });
  const [animated, setAnimated] = useState(false);

  const listRef = useRef(null);
  const burgerRef = useRef(null);
  const openRef = useRef(false);
  openRef.current = menuOpen;

  /* ---------- sliding highlight behind the desktop links ---------- */

  const moveTo = useCallback((el) => {
    if (!el) {
      setPill((current) => ({ ...current, on: false }));
      return;
    }
    setPill({ x: el.offsetLeft, w: el.offsetWidth, on: true });
  }, []);

  const syncActive = useCallback(() => {
    moveTo(listRef.current?.querySelector("a.active"));
  }, [moveTo]);

  useLayoutEffect(() => {
    syncActive();
  }, [pathname, syncActive]);

  useEffect(() => {
    // switch transitions on only after the first measurement, so the pill never slides in from 0
    const id = requestAnimationFrame(() => setAnimated(true));
    window.addEventListener("resize", syncActive);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncActive);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", syncActive);
    };
  }, [syncActive]);

  /* ---------- close the menu on navigation / desktop resize ---------- */

  useEffect(() => {
    setMenuOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 721px)");
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  /* ---------- lock page scroll + Esc while the menu is open ---------- */

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* ---------- solid background after scrolling, hide on scroll down ---------- */

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 8);

      if (openRef.current || reducedMotion()) {
        setHidden(false);
      } else if (y > last + 6 && y > 140) {
        setHidden(true);
      } else if (y < last - 6 || y <= 140) {
        setHidden(false);
      }

      last = y;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header
        className={[
          "navbar",
          scrolled ? "is-scrolled" : "",
          hidden && !menuOpen ? "is-hidden" : "",
          menuOpen ? "is-open" : "",
        ].join(" ")}
        onFocusCapture={() => setHidden(false)}
      >
        <nav className="nav-bar" aria-label="Primary">
          <Link className="nav-logo" to="/" aria-label="Home">
            K<span>.</span>
          </Link>

          {/* DESKTOP + TABLET LINKS */}
          <div
            className="nav-links"
            ref={listRef}
            onMouseLeave={syncActive}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) syncActive();
            }}
          >
            <span
              className={`nav-pill ${pill.on ? "is-on" : ""} ${animated ? "is-animated" : ""}`}
              style={{ "--x": `${pill.x}px`, "--w": `${pill.w}px` }}
              aria-hidden="true"
            />
            <ul>
              {links.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onMouseEnter={(event) => moveTo(event.currentTarget)}
                    onFocus={(event) => moveTo(event.currentTarget)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <a className="nav-ext" href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight size={15} />
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            ref={burgerRef}
            type="button"
            className="nav-burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-panel"
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* MOBILE PANEL (sibling of the header so blur/transform never trap it) */}
      <div id="nav-panel" className={`nav-panel ${menuOpen ? "is-open" : ""}`}>
        <ul>
          {links.map(({ to, label, end }, index) => (
            <li key={to} style={{ "--i": index }}>
              <NavLink to={to} end={end} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowRight size={22} />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-panel-foot">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight size={15} />
          </a>
          <span>© 2026</span>
        </div>
      </div>
    </>
  );
}

export default Navbar;