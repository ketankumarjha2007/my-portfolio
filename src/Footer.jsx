import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-left">
                    Designed by <span>Ketan Kumar Jha</span>
                </div>

                
                <div className="footer-center">
                    © {new Date().getFullYear()} Ketan Kumar Jha
                </div>
                <div className="footer-right">
                    <a href="https://github.com/ketankumarjha2007" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/ketan-kumar-jha-499064305/" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:ketankumarjha70@gmail.com">
                        <FaEnvelope />
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
