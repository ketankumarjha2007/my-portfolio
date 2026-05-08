import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">

            <div className="nav-container">

                {/* DESKTOP LINKS */}
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

                    <li>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/about" onClick={() => setMenuOpen(false)}>
                            About
                        </Link>
                    </li>

                    <li>
                        <Link to="/project" onClick={() => setMenuOpen(false)}>
                            Projects
                        </Link>
                    </li>

                    <li>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>
                    </li>

                </ul>
            </div>

        </nav>
    );
}

export default Navbar;