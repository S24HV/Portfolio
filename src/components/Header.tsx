import { useEffect, useState } from "react";

import MoonSvg from "../assets/moon.svg";
import SunSvg from "../assets/sun.svg";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTheme } from "../store/theme/theme";
import { setLanguage, useLanguage } from "../services/language";

import "./header.scss";

const Header = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { language } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const toggle = () => dispatch(toggleTheme());

  return (
    <header className={`header-container ${theme}`}>
      <div
        className="header-scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <a className="header-title" href="#top" aria-label="S24HV home">
        S24HV
      </a>

      <nav className="header-nav" aria-label="Main navigation">
        <a href="#about">{language === "ru" ? "ОБО МНЕ" : "ABOUT"}</a>
        <a href="#techstack">{language === "ru" ? "СТЕК" : "STACK"}</a>
        <a href="#projects">{language === "ru" ? "ПРОЕКТЫ" : "PROJECTS"}</a>
        <a href="#roadmap">{language === "ru" ? "ПЛАН" : "ROADMAP"}</a>
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="language-toggle"
          onClick={() => setLanguage(language === "en" ? "ru" : "en")}
          aria-label="Change language"
        >
          <span className={language === "en" ? "active" : ""}>EN</span>
          <i />
          <span className={language === "ru" ? "active" : ""}>RU</span>
        </button>

        <button
          type="button"
          className="change-theme-toggle"
          onClick={toggle}
          aria-label="Change theme"
        >
          {theme === "light" ? (
            <img className="theme-icon" src={MoonSvg} alt="Dark mode" />
          ) : (
            <img className="theme-icon" src={SunSvg} alt="Light mode" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
