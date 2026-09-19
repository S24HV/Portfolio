import { useEffect, useState } from "react";
import { useLanguage } from "../services/language";
import "./bootscreen.scss";

const BOOT_LINES = [
  "BIOS // S24HV PORTFOLIO",
  "NETWORK ADAPTER ........ ONLINE",
  "SECURITY MODULE ........ READY",
  "FRONTEND CORE .......... LOADED",
  "ACCESS .................. GRANTED",
];

const BootScreen = () => {
  const { language } = useLanguage();
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => Math.min(100, value + 4));
    }, 65);

    const lineTimer = window.setInterval(() => {
      setLineIndex((value) => Math.min(BOOT_LINES.length - 1, value + 1));
    }, 260);

    const fadeTimer = window.setTimeout(() => setFadeOut(true), 1900);
    const hideTimer = window.setTimeout(() => setHidden(true), 2500);

    return () => {
      window.clearInterval(progressTimer);
      window.clearInterval(lineTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`boot-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="boot-grid" />
      <div className="boot-noise" />

      <div className="boot-screen-content">
        <div className="boot-brand">S24HV</div>

        <div className="boot-terminal">
          <div className="boot-terminal-header">
            <span>S24HV_SECURE_BOOT</span>
            <span>{language === "ru" ? "ЗАПУСК" : "BOOT"}</span>
          </div>

          <div className="boot-lines">
            {BOOT_LINES.slice(0, lineIndex + 1).map((line, index) => (
              <div className={index === lineIndex ? "current" : ""} key={line}>
                <span className="boot-prefix">[{String(index + 1).padStart(2, "0")}]</span>
                <span>{line}</span>
                <b>{index < lineIndex ? "OK" : "..."}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="boot-progress-row">
          <span>LOAD</span>
          <div className="boot-bar">
            <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="boot-status">
          <span />
          {language === "ru" ? "СИСТЕМА ГОТОВА" : "SYSTEM READY"}
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
