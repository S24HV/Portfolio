import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getAllRepos,
  getRepoLanguages,
  getRepoReadme,
  getRepoScreenshotUrl,
  IRepo,
} from "../services/github";

import "./projects.scss";

import { useAppSelector } from "../store/hooks";

const README_PREVIEW_LENGTH = 260;

// Strips the most common markdown syntax so the collapsed preview
// reads as plain text instead of raw "# Title", "**bold**", etc.
const stripMarkdown = (text: string) =>
  text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Projects = () => {
  const [projects, setProjects] = useState<IRepo[]>([]);
  const [expandedReadmes, setExpandedReadmes] = useState<Set<number>>(
    new Set()
  );
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    const getAndSetProjects = async () => {
      const projectsRes = await getAllRepos();
      const projectsWithDetails = await Promise.all(
        projectsRes.map(async (project) => {
          const [languages, readme] = await Promise.all([
            getRepoLanguages(project.name),
            getRepoReadme(project.name),
          ]);
          return { ...project, languages, readme };
        })
      );
      setProjects(projectsWithDetails);
    };
    getAndSetProjects();
  }, []);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const toggleReadme = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedReadmes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="projects-container">
      {projects.map((project, idx) => {
        const isExpanded = expandedReadmes.has(project.id);
        const hasImageError = brokenImages.has(project.id);
        const readme = project.readme?.trim();
        const readmePlain = readme ? stripMarkdown(readme) : "";
        const readmePreview =
          readmePlain.length > README_PREVIEW_LENGTH
            ? `${readmePlain.slice(0, README_PREVIEW_LENGTH)}…`
            : readmePlain;

        return (
          <div
            className={`project ${theme}`}
            key={project.id}
            style={{ animationDelay: `${idx * 60}ms` }}
            onClick={() => openInNewTab(project.html_url)}>
            <div className="project-media">
              {!hasImageError ? (
                <img
                  src={getRepoScreenshotUrl(project.name)}
                  alt={`${project.name} preview`}
                  onError={() =>
                    setBrokenImages((prev) => new Set(prev).add(project.id))
                  }
                />
              ) : (
                <div className="project-placeholder">
                  <span>{project.name.slice(0, 2).toUpperCase()}</span>
                </div>
              )}
            </div>

            <h2>{project.name}</h2>
            <h3>{project.language || "Multiple languages"}</h3>

            {!!project.languages?.length && (
              <div className="project-languages">
                {project.languages.map((lang) => (
                  <span className="language-chip" key={lang}>
                    {lang}
                  </span>
                ))}
              </div>
            )}

            <p>{project.description || "No description provided."}</p>

            {readme && (
              <div
                className="project-readme"
                onClick={(e) => e.stopPropagation()}>
                <button
                  className="readme-toggle"
                  type="button"
                  onClick={(e) => toggleReadme(project.id, e)}>
                  {isExpanded ? "Скрыть README ▲" : "Показать README ▼"}
                </button>
                {isExpanded ? (
                  <div className="readme-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readme}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="readme-preview">{readmePreview}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
