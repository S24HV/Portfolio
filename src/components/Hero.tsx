import { useEffect, useState } from "react";
import "./hero.scss";

const LINES = [
  "> whoami",
  "S24HV — frontend developer, aspiring cybersecurity specialist",
  "",
  "> status --check",
  "[ACCESS GRANTED] clearance: junior_pentester",
  "",
  "> hobbies --list",
  "coding · web security · ice hockey 🏒",
];

const Hero = () => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= LINES.length) return;
    const currentLine = LINES[lineIndex];

    if (charIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="hero-terminal fade-in">
      <div className="hero-terminal-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="hero-terminal-title">s24hv@portfolio: ~</span>
      </div>
      <div className="hero-terminal-body">
        {displayed.map((line, idx) => (
          <p key={idx}>
            {line}
            {idx === lineIndex && <span className="hero-cursor" />}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Hero;