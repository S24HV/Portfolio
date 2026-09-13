import "./roadmap.scss";

interface RoadmapItem {
  title: string;
  description: string;
  status: "done" | "active" | "planned";
}

const roadmap: RoadmapItem[] = [
  {
    title: "Frontend Development",
    description:
      "React, TypeScript, JavaScript, HTML & CSS — completed the ProWeb program and built several production-style projects.",
    status: "done",
  },
  {
    title: "Python & Bash Scripting",
    description:
      "Learning for automation, tooling, and as a foundation for security work.",
    status: "active",
  },
  {
    title: "Penetration Testing & Web App Security",
    description:
      "Studying OWASP fundamentals, common vulnerabilities, and hands-on labs.",
    status: "active",
  },
  {
    title: "Network Security",
    description:
      "Next up — protocols, defensive techniques, and network-level analysis.",
    status: "planned",
  },
  {
    title: "Cybersecurity Specialist",
    description:
      "Long-term goal — combine frontend engineering experience with a strong security mindset.",
    status: "planned",
  },
];

const statusLabel: Record<RoadmapItem["status"], string> = {
  done: "Completed",
  active: "In progress",
  planned: "Planned",
};

const Roadmap = () => {
  return (
    <div className="roadmap-container">
      {roadmap.map((item, idx) => (
        <div
          className={`roadmap-item ${item.status} fade-in`}
          key={item.title}
          style={{ animationDelay: `${idx * 120}ms` }}>
          <div className="roadmap-node">
            <span className="roadmap-dot" />
          </div>
          <div className="roadmap-content">
            <span className={`roadmap-status ${item.status}`}>
              {statusLabel[item.status]}
            </span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roadmap;