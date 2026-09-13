import { useEffect, useState } from "react";
import { getAllRepos, GitHubUsername } from "../services/github";
import "./techstack.scss";

interface LanguageStat {
  name: string;
  count: number;
  percent: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  HTML: "#e34f26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Python: "#3776ab",
  Shell: "#89e051",
};

const TechStack = () => {
  const [stats, setStats] = useState<LanguageStat[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      const repos = await getAllRepos();
      const counts: Record<string, number> = {};

      repos.forEach((repo) => {
        if (!repo.language) return;
        counts[repo.language] = (counts[repo.language] || 0) + 1;
      });

      const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

      const result = Object.entries(counts)
        .map(([name, count]) => ({
          name,
          count,
          percent: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.count - a.count);

      setStats(result);
      requestAnimationFrame(() => setTimeout(() => setReady(true), 50));
    };

    load();
  }, []);

  return (
    <div className="techstack-container fade-in">
      <p className="techstack-caption">
        Auto-generated from{" "}
        <a href={`https://github.com/${GitHubUsername}`} target="_blank" rel="noreferrer">
          @{GitHubUsername}
        </a>{" "}
        repositories
      </p>
      <div className="techstack-bars">
        {stats.map((stat, i) => (
          <div
            className="techstack-bar-row"
            key={stat.name}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="techstack-bar-label">
              <span
                className="techstack-dot"
                style={{ background: LANGUAGE_COLORS[stat.name] || "var(--accent)" }}
              />
              {stat.name}
              <span className="techstack-percent">{stat.percent}%</span>
            </div>
            <div className="techstack-bar-track">
              <div
                className="techstack-bar-fill"
                style={{
                  width: ready ? `${stat.percent}%` : "0%",
                  background: LANGUAGE_COLORS[stat.name] || "var(--accent)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;