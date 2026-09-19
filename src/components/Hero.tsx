import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../services/language";
import "./hero.scss";

const Hero = () => {
  const { language } = useLanguage();
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const lines = useMemo(
    () =>
      language === "ru"
        ? [
            "> whoami",
            "S24HV — frontend developer, начинающий cybersecurity specialist",
            "",
            "> status --check",
            "[ACCESS GRANTED] clearance: junior_pentester",
            "",
            "> focus --list",
            "frontend · web security · automation",
          ]
        : [
            "> whoami",
            "S24HV — frontend developer, aspiring cybersecurity specialist",
            "",
            "> status --check",
            "[ACCESS GRANTED] clearance: junior_pentester",
            "",
            "> focus --list",
            "frontend · web security · automation",
          ],
    [language]
  );

  useEffect(() => {
    setDisplayed([]);
    setLineIndex(0);
    setCharIndex(0);
  }, [language]);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex <= currentLine.length) {
      const timeout = window.setTimeout(() => {
        setDisplayed((previous) => {
          const next = [...previous];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        setCharIndex((value) => value + 1);
      }, 25);

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setLineIndex((value) => value + 1);
      setCharIndex(0);
    }, 220);

    return () => window.clearTimeout(timeout);
  }, [charIndex, lineIndex, lines]);

  return (
    <section className="hero-terminal fade-in" aria-label="Terminal introduction">
      <div className="hero-terminal-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="hero-terminal-title">s24hv@portfolio: ~</span>
        <span className="hero-terminal-status">ONLINE</span>
      </div>

      <div className="hero-terminal-body">
        {displayed.map((line, idx) => (
          <p key={`${language}-${idx}`}>
            {line}
            {idx === lineIndex && <span className="hero-cursor" />}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Hero;
