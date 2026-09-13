import TgIcon from "../assets/tg.svg";
import MailIcon from "../assets/mail.svg";

import "./about.scss";

const About = () => {
  return (
    <div className="about-container fade-in">
      <div className="about-row">
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            Hi! I'm Amir, a frontend developer from Uzbekistan with a solid foundation in{" "}
            <strong>React, TypeScript, JavaScript, HTML and CSS</strong>. I completed the ProWeb
            program and enjoy building responsive, performance-focused web applications with
            clean code and thoughtful UX/UI.
          </p>
          <p>
            I'm currently expanding into <strong>cybersecurity</strong> — studying penetration
            testing and web application security, with the long-term goal of combining frontend
            engineering with a strong security mindset.
          </p>
          <p>
            Always exploring new tools and best practices. Open to interesting projects and
            collaboration — feel free to reach out.
          </p>
        </div>
        <div className="about-logo">
          <span className="about-logo-text">S24HV</span>
          <div className="about-logo-scan" />
        </div>
      </div>
      <div className="about-contacts">
        <span>
         <a href="mailto:amirsuhov@gmail.com">
  <img src={MailIcon} alt="Mail Icon" />
  amirsuhov@gmail.com
               </a>
        </span>
        <span>
          <a href="https://t.me/S_24_HV" target="_blank" rel="noreferrer">
            <img src={TgIcon} alt="Telegram Icon" />
            @S_24_HV
          </a>
        </span>
      </div>
    </div>
  );
};

export default About;