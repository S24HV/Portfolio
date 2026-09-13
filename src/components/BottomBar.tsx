import { useEffect, useRef, useState } from "react";

import GitIcon from "../assets/github.svg";
import MailIcon from "../assets/mail.svg";
import TgIcon from "../assets/tg.svg";

import "./bottombar.scss";

const SCROLL_THRESHOLD = 10; // px of movement before we react
const REVEAL_AFTER = 300; // don't show the bar until user scrolled this far down

const BottomBar = () => {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < SCROLL_THRESHOLD) return;

      if (currentY < REVEAL_AFTER) {
        // near the top — header is already visible, no need for the bar
        setVisible(false);
      } else if (delta < 0) {
        // scrolling up
        setVisible(true);
      } else {
        // scrolling down
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`bottom-bar ${visible ? "visible" : ""}`}>
      <a
        className="bottom-bar-link"
        href="https://github.com/S24HV"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub">
        <img src={GitIcon} alt="GitHub" />
      </a>
      <a
        className="bottom-bar-link"
        href="mailto:amirsuhov@gmail.com"
        aria-label="Email">
        <img src={MailIcon} alt="Mail" />
      </a>
      <a
        className="bottom-bar-link"
        href="https://t.me/S_24_HV"
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram">
        <img src={TgIcon} alt="Telegram" />
      </a>
      <button
        className="bottom-bar-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top">
        ↑ Top
      </button>
    </div>
  );
};

export default BottomBar;
