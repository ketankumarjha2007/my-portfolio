import "./contact.css";

import { useRef } from "react";

import emailjs from "@emailjs/browser";

import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaPaperPlane
} from "react-icons/fa";

function Contact() {

    const form = useRef();

    const sendEmail = (e) => {

        e.preventDefault();

        emailjs.sendForm(

            "service_35b7czb",
            "template_2l4b4sy",
            form.current,
            "AgJz8ubKOhKnwN_LV"

        )
        .then(() => {

            alert("Message Sent Successfully!");

            form.current.reset();
        })

        .catch(() => {

            alert("Failed To Send Message!");
        });
    };

    return (

        <section className="contact">

            {/* BACKGROUND GLOW */}
            <div className="contact-glow"></div>

            <div className="contact-container">

                {/* LEFT SIDE */}
                <div className="contact-left">

                    <div className="contact-badge">
                        🚀 Let's Connect
                    </div>

                    <h1>
                        Get In <span>Touch</span>
                    </h1>

                    <p className="contact-text">

                        Have an exciting idea,
                        collaboration opportunity,
                        or project in mind?

                        Feel free to connect with me.
                        I'm always open to discussing
                        technology, development,
                        AI, startups, and innovation.

                    </p>

                    {/* CONTACT INFO */}
                    <div className="contact-info">

                        <a
                            href="mailto:ketankumarjha70@gmail.com"
                            className="info-card"
                        >

                            <FaEnvelope />

                            <span>
                                ketankumarjha70@gmail.com
                            </span>

                        </a>

                        <a
                            href="https://github.com/ketankumarjha2007"
                            target="_blank"
                            rel="noreferrer"
                            className="info-card"
                        >

                            <FaGithub />

                            <span>GitHub</span>

                        </a>

                        <a
                            href="https://www.linkedin.com/in/ketan-kumar-jha-499064305/"
                            target="_blank"
                            rel="noreferrer"
                            className="info-card"
                        >

                            <FaLinkedin />

                            <span>LinkedIn</span>

                        </a>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="contact-right">

                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="contact-form"
                    >

                        {/* NAME */}
                        <div className="input-group">

                            <input
                                type="text"
                                name="user_name"
                                placeholder="Your Name"
                                required
                            />

                        </div>

                        {/* EMAIL */}
                        <div className="input-group">

                            <input
                                type="email"
                                name="user_email"
                                placeholder="Your Email"
                                required
                            />

                        </div>

                        {/* MESSAGE */}
                        <div className="input-group">

                            <textarea
                                name="message"
                                rows="6"
                                placeholder="Write your message..."
                                required
                            ></textarea>

                        </div>

                        {/* BUTTON */}
                        <button type="submit">

                            <FaPaperPlane />

                            Send Message

                        </button>

                    </form>

                </div>

            </div>

        </section>
    );
}

export default Contact;