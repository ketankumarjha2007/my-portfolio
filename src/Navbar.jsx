import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="link">
                <img src={logo} alt="Ketan Logo" className="logo" />
            </Link>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/project">Projects</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
