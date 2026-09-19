import type { CSSProperties } from "react";
import { useLanguage } from "../services/language";
import { useAppSelector } from "../store/hooks";
import "./techstack.scss";

interface Tech {
  name: string;
  short: string;
}

const TECHS: Tech[] = [
  { name: "React", short: "⚛" },
  { name: "TypeScript", short: "TS" },
  { name: "JavaScript", short: "JS" },
  { name: "HTML", short: "HTML" },
  { name: "CSS", short: "CSS" },
  { name: "SCSS", short: "S" },
  { name: "Git", short: "GIT" },
  { name: "GitHub", short: "GH" },
  { name: "Vite", short: "V" },
  { name: "Figma", short: "F" },
  { name: "Linux", short: "L" },
  { name: "Cybersecurity", short: "CS" },
];

const TechStack = () => {
  const theme = useAppSelector((state) => state.theme);
  const { language } = useLanguage();

  return (
    <section className={`techstack-visual ${theme}`} id="techstack">
      <div className="techstack-heading">
        <p>
          {language === "ru" ? (
            <>Я <span>Frontend Developer</span> и изучаю <span>Cybersecurity</span></>
          ) : (
            <>I'm a <span>Frontend Developer</span> learning <span>Cybersecurity</span></>
          )}
        </p>

        <small>
          {language === "ru"
            ? "Создаю современные web-интерфейсы и развиваю навыки cybersecurity"
            : "Building modern web interfaces while developing my cybersecurity skills"}
        </small>
      </div>

      <div className="techstack-scene">
        <div className="techstack-chips">
          {TECHS.map((tech, index) => (
            <div
              className="techstack-chip"
              key={tech.name}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="techstack-chip-icon">
                {tech.short}
              </div>

              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        <svg
          className="techstack-connections"
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M115 80 C145 180 350 235 500 355" />
          <path d="M185 80 C210 190 380 250 500 355" />
          <path d="M255 80 C280 205 410 270 500 355" />
          <path d="M325 80 C340 210 455 285 500 355" />
          <path d="M395 80 C410 220 470 295 500 355" />
          <path d="M465 80 C475 225 490 300 500 355" />
          <path d="M535 80 C525 225 510 300 500 355" />
          <path d="M605 80 C590 220 535 295 500 355" />
          <path d="M675 80 C650 210 545 285 500 355" />
          <path d="M745 80 C720 205 590 270 500 355" />
          <path d="M815 80 C790 190 620 250 500 355" />
          <path d="M885 80 C855 180 650 235 500 355" />
        </svg>

        <div className="techstack-core">
          <div className="core-glow" />
          <div className="core-circle">
            <span>Σ</span>
          </div>

          <div className="core-ring core-ring-1" />
          <div className="core-ring core-ring-2" />
          <div className="core-ring core-ring-3" />
        </div>

        <div className="techstack-orbits">
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
          <div className="orbit orbit-3" />

          <span className="orbit-dot dot-1" />
          <span className="orbit-dot dot-2" />
          <span className="orbit-dot dot-3" />
          <span className="orbit-dot dot-4" />
          <span className="orbit-dot dot-5" />
          <span className="orbit-dot dot-6" />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
