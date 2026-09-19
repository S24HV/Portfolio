import { useLanguage } from "../services/language";
import "./roadmap.scss";

interface RoadmapItem {
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  status: "done" | "active" | "planned";
}

const roadmap: RoadmapItem[] = [
  {
    title: "Frontend Development",
    titleRu: "Frontend Development",
    description: "React, TypeScript, JavaScript, HTML & CSS — completed the ProWeb program and built several production-style projects.",
    descriptionRu: "React, TypeScript, JavaScript, HTML и CSS — программа ProWeb завершена, создано несколько полноценных проектов.",
    status: "done",
  },
  {
    title: "Python & Bash Scripting",
    titleRu: "Python и Bash",
    description: "Learning for automation, tooling, and as a foundation for security work.",
    descriptionRu: "Изучаю автоматизацию, инструменты и основы scripting для security-задач.",
    status: "active",
  },
  {
    title: "Penetration Testing & Web App Security",
    titleRu: "Penetration Testing и Web Security",
    description: "Studying OWASP fundamentals, common vulnerabilities, and hands-on labs.",
    descriptionRu: "Изучаю основы OWASP, распространённые уязвимости и практические лабораторные задания.",
    status: "active",
  },
  {
    title: "Network Security",
    titleRu: "Network Security",
    description: "Next up — protocols, defensive techniques, and network-level analysis.",
    descriptionRu: "Следующий этап — протоколы, защитные методы и анализ сетевого уровня.",
    status: "planned",
  },
  {
    title: "Cybersecurity Specialist",
    titleRu: "Cybersecurity Specialist",
    description: "Long-term goal — combine frontend engineering experience with a strong security mindset.",
    descriptionRu: "Долгосрочная цель — объединить опыт frontend-разработки с сильным подходом к безопасности.",
    status: "planned",
  },
];

const Roadmap = () => {
  const { language } = useLanguage();

  const statusLabel: Record<RoadmapItem["status"], string> = {
    done: language === "ru" ? "Завершено" : "Completed",
    active: language === "ru" ? "В процессе" : "In progress",
    planned: language === "ru" ? "Запланировано" : "Planned",
  };

  return (
    <div className="roadmap-container" id="roadmap">
      {roadmap.map((item, idx) => (
        <div
          className={`roadmap-item ${item.status} fade-in`}
          key={item.title}
          style={{ animationDelay: `${idx * 120}ms` }}
        >
          <div className="roadmap-node">
            <span className="roadmap-dot" />
          </div>

          <div className="roadmap-content">
            <span className={`roadmap-status ${item.status}`}>
              {statusLabel[item.status]}
            </span>

            <h3>{language === "ru" ? item.titleRu : item.title}</h3>
            <p>{language === "ru" ? item.descriptionRu : item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;
