import { useState } from "react";

import TgIcon from "../assets/tg.svg";
import MailIcon from "../assets/mail.svg";
import { useLanguage } from "../services/language";

import "./about.scss";

const About = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("amirsuhov@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="about-container fade-in" id="about">
      <div className="about-row">
        <div className="about-text">
          <h2>{language === "ru" ? "Обо мне" : "About Me"}</h2>

          <p>
            {language === "ru" ? (
              <>Привет! Я Amir, frontend-разработчик из Узбекистана с хорошей базой в <strong>React, TypeScript, JavaScript, HTML и CSS</strong>. Я прошёл программу ProWeb и люблю создавать адаптивные, быстрые web-приложения с чистым кодом и продуманным UX/UI.</>
            ) : (
              <>Hi! I'm Amir, a frontend developer from Uzbekistan with a solid foundation in <strong>React, TypeScript, JavaScript, HTML and CSS</strong>. I completed the ProWeb program and enjoy building responsive, performance-focused web applications with clean code and thoughtful UX/UI.</>
            )}
          </p>

          <p>
            {language === "ru" ? (
              <>Сейчас я развиваюсь в направлении <strong>cybersecurity</strong> — изучаю penetration testing и web application security, чтобы в будущем объединить frontend-разработку с сильным security mindset.</>
            ) : (
              <>I'm currently expanding into <strong>cybersecurity</strong> — studying penetration testing and web application security, with the long-term goal of combining frontend engineering with a strong security mindset.</>
            )}
          </p>

          <p>
            {language === "ru"
              ? "Постоянно изучаю новые инструменты и подходы. Открыт к интересным проектам и сотрудничеству."
              : "Always exploring new tools and best practices. Open to interesting projects and collaboration — feel free to reach out."}
          </p>
        </div>

        <div className="about-logo">
          <span className="about-logo-text">S24HV</span>
          <div className="about-logo-scan" />
          <div className="about-logo-corners" />
        </div>
      </div>

      <div className="about-contacts">
        <div className="email-control">
          <a href="mailto:amirsuhov@gmail.com">
            <img src={MailIcon} alt="Mail" />
            amirsuhov@gmail.com
          </a>

          <button type="button" onClick={copyEmail} aria-label="Copy email">
            {copied ? "✓" : "COPY"}
          </button>
        </div>

        <a href="https://t.me/S_24_HV" target="_blank" rel="noreferrer">
          <img src={TgIcon} alt="Telegram" />
          @S_24_HV
        </a>
      </div>
    </div>
  );
};

export default About;
