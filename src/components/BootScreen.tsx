import { useEffect, useState } from "react";
import "./bootscreen.scss";

const SEQUENCE = [
  "INITIALIZING ACCESS...",
  "ИНИЦИАЛИЗАЦИЯ ДОСТУПА...",
  "アクセスを初期化しています...",
  "ACCESS GRANTED",
];

const BootScreen = () => {
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (index >= SEQUENCE.length - 1) {
      const t1 = setTimeout(() => setFadeOut(true), 500);
      const t2 = setTimeout(() => setHidden(true), 1100);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    const timeout = setTimeout(() => setIndex((i) => i + 1), 550);
    return () => clearTimeout(timeout);
  }, [index]);

  if (hidden) return null;

  return (
    <div className={`boot-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="boot-screen-content">
        <span className="boot-line" key={index}>
          {SEQUENCE[index]}
        </span>
        <div className="boot-bar">
          <div className="boot-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default BootScreen;