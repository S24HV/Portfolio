import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import {
  getAllRepos,
  getGitHubStats,
  getRepoReadme,
  getRepoScreenshotUrl,
  type IGitHubStats,
  type IRepo,
} from "../services/github";

import { useLanguage } from "../services/language";
import { useAppSelector } from "../store/hooks";

import "./projects.scss";

const README_PREVIEW_LENGTH = 280;

const stripMarkdown = (text: string) =>
  text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const Projects = () => {
  const theme = useAppSelector((state) => state.theme);
  const { language } = useLanguage();

  const [projects, setProjects] = useState<IRepo[]>([]);
  const [stats, setStats] = useState<IGitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRepositories, setShowRepositories] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [expandedReadmes, setExpandedReadmes] = useState<Set<number>>(new Set());
  const [readmesLoading, setReadmesLoading] = useState<Set<number>>(new Set());
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      setLoading(true);

      try {
        const repos = await getAllRepos();

        if (cancelled) return;

        setProjects(repos);
        setLoading(false);

        const githubStats = await getGitHubStats(repos);

        if (!cancelled) {
          setStats(githubStats);
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setProjects([]);
        }
      }
    };

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const filters = useMemo(() => {
    const languages = projects
      .map((project) => project.language)
      .filter((value): value is string => Boolean(value));

    return ["ALL", ...Array.from(new Set(languages)).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "ALL") return projects;

    return projects.filter(
      (project) => project.language === selectedFilter
    );
  }, [projects, selectedFilter]);

  useEffect(() => {
    if (!showRepositories || filteredProjects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });

    return () => observer.disconnect();
  }, [filteredProjects, showRepositories]);

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleReadme = async (project: IRepo, event: MouseEvent) => {
    event.stopPropagation();

    if (expandedReadmes.has(project.id)) {
      setExpandedReadmes((previous) => {
        const next = new Set(previous);
        next.delete(project.id);
        return next;
      });
      return;
    }

    if (!project.readme) {
      setReadmesLoading((previous) => {
        const next = new Set(previous);
        next.add(project.id);
        return next;
      });

      const readme = await getRepoReadme(project.name);

      setProjects((previous) =>
        previous.map((item) =>
          item.id === project.id ? { ...item, readme } : item
        )
      );

      setReadmesLoading((previous) => {
        const next = new Set(previous);
        next.delete(project.id);
        return next;
      });
    }

    setExpandedReadmes((previous) => {
      const next = new Set(previous);
      next.add(project.id);
      return next;
    });
  };

  const handleImageError = (id: number) => {
    setBrokenImages((previous) => {
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  };

  return (
    <section className={`projects-section ${theme}`} id="projects">
      <div className="projects-title">
        <span>{language === "ru" ? "Проекты" : "Featured Projects"}</span>
      </div>

      {stats && (
        <div className="github-stats">
          <div className="github-stat">
            <strong>{stats.public_repos}</strong>
            <span>{language === "ru" ? "РЕПОЗИТОРИИ" : "REPOSITORIES"}</span>
          </div>
          <div className="github-stat">
            <strong>{stats.total_stars}</strong>
            <span>STARS</span>
          </div>
          <div className="github-stat">
            <strong>{stats.total_forks}</strong>
            <span>FORKS</span>
          </div>
          <div className="github-stat">
            <strong>{stats.followers}</strong>
            <span>{language === "ru" ? "ПОДПИСЧИКИ" : "FOLLOWERS"}</span>
          </div>
        </div>
      )}

      <div className="repositories-toggle-wrapper">
        <button
          type="button"
          className={`repositories-toggle ${theme} ${showRepositories ? "active" : ""}`}
          onClick={() => setShowRepositories((previous) => !previous)}
          aria-expanded={showRepositories}
        >
          <span className="repositories-toggle-icon">
            <span />
            <span />
          </span>

          <span className="repositories-toggle-text">
            {showRepositories
              ? language === "ru"
                ? "СКРЫТЬ РЕПОЗИТОРИИ"
                : "CLOSE REPOSITORIES"
              : language === "ru"
                ? "ПОКАЗАТЬ РЕПОЗИТОРИИ"
                : "VIEW REPOSITORIES"}
          </span>

          <span className="repositories-toggle-arrow">
            {showRepositories ? "↑" : "↓"}
          </span>

          <span className="repositories-toggle-line" />
        </button>
      </div>

      <div className={`repositories-wrapper ${showRepositories ? "open" : ""}`}>
        <div className="repositories-inner">
          {loading && (
            <div className="projects-loading">
              <div className="loading-panel">
                <div className="loading-icon">
                  <div className="loading-ring ring-1" />
                  <div className="loading-ring ring-2" />
                  <div className="loading-ring ring-3" />
                  <div className="loading-core"><span /></div>
                </div>

                <div className="loading-status">
                  <span className="status-dot" />
                  <span>{language === "ru" ? "СОЕДИНЕНИЕ С GITHUB" : "GITHUB CONNECTION"}</span>
                </div>

                <div className="loading-title">CONNECTING...</div>

                <div className="loading-progress"><span /></div>

                <div className="loading-meta">
                  <span>GITHUB API</span>
                  <span>{language === "ru" ? "СИНХРОНИЗАЦИЯ..." : "SYNCING..."}</span>
                </div>
              </div>
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="projects-empty">
              <div className="empty-symbol">//</div>
              <div>{language === "ru" ? "РЕПОЗИТОРИИ ВРЕМЕННО НЕДОСТУПНЫ" : "REPOSITORIES TEMPORARILY UNAVAILABLE"}</div>
              <small>{language === "ru" ? "Данные появятся после следующей синхронизации." : "The repository data will appear after the next sync."}</small>
            </div>
          )}

          {!loading && projects.length > 0 && (
            <>
              <div className="project-filters" aria-label="Project filters">
                {filters.map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={selectedFilter === filter ? "active" : ""}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter === "ALL" && language === "ru" ? "ВСЕ" : filter}
                  </button>
                ))}
              </div>

              <div className="projects-count">
                {String(filteredProjects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} {language === "ru" ? "ПРОЕКТОВ" : "PROJECTS"}
              </div>

              {filteredProjects.map((project, index) => {
                const isReverse = index % 2 === 1;
                const isReadmeExpanded = expandedReadmes.has(project.id);
                const imageBroken = brokenImages.has(project.id);
                const readme = project.readme?.trim() || "";
                const readmePlain = stripMarkdown(readme);
                const readmePreview =
                  readmePlain.length > README_PREVIEW_LENGTH
                    ? `${readmePlain.slice(0, README_PREVIEW_LENGTH)}...`
                    : readmePlain;
                const isReadmeLoading = readmesLoading.has(project.id);

                return (
                  <article
                    key={project.id}
                    ref={(element) => {
                      projectRefs.current[index] = element;
                    }}
                    className={`project ${theme} ${isReverse ? "project-reverse" : ""}`}
                    onClick={() => openInNewTab(project.html_url)}
                  >
                    <div className="project-media">
                      {!imageBroken ? (
                        <img
                          src={getRepoScreenshotUrl(project.name)}
                          alt={`${project.name} preview`}
                          loading="lazy"
                          onError={() => handleImageError(project.id)}
                        />
                      ) : (
                        <div className="project-placeholder">
                          <div className="placeholder-grid" />
                          <span>{project.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                      )}

                      <div className="project-image-overlay" />
                      <div className="project-corner top-left" />
                      <div className="project-corner top-right" />
                      <div className="project-corner bottom-left" />
                      <div className="project-corner bottom-right" />
                    </div>

                    <div className="project-info">
                      <div className="project-label">
                        {index < 3 ? "FEATURED PROJECT" : "GITHUB REPOSITORY"}
                      </div>

                      <h2>{project.name}</h2>

                      <div className="project-type">
                        {project.language || (language === "ru" ? "НЕСКОЛЬКО ТЕХНОЛОГИЙ" : "MULTIPLE TECHNOLOGIES")}
                      </div>

                      <div className="project-description">
                        <p>
                          {project.description || (language === "ru"
                            ? "Проект на GitHub с использованием современных web-технологий."
                            : "A project built with modern web technologies and available on GitHub.")}
                        </p>
                      </div>

                      {readme && (
                        <div className="project-readme" onClick={(event) => event.stopPropagation()}>
                          <button
                            type="button"
                            className="readme-toggle"
                            onClick={(event) => toggleReadme(project, event)}
                          >
                            <span>
                              {isReadmeLoading
                                ? "LOADING..."
                                : isReadmeExpanded
                                  ? language === "ru" ? "СКРЫТЬ README" : "HIDE README"
                                  : language === "ru" ? "ПОКАЗАТЬ README" : "SHOW README"}
                            </span>
                            <span>{isReadmeExpanded ? "↑" : "↓"}</span>
                          </button>

                          {isReadmeExpanded ? (
                            <div className="readme-content">
                              {readme.split("\n").map((line, lineIndex) => (
                                <p key={`${project.id}-${lineIndex}`}>{line}</p>
                              ))}
                            </div>
                          ) : (
                            <p className="readme-preview">{readmePreview}</p>
                          )}
                        </div>
                      )}

                      {!readme && (
                        <button
                          type="button"
                          className="readme-load-button"
                          onClick={(event) => toggleReadme(project, event)}
                        >
                          {isReadmeLoading
                            ? "LOADING README..."
                            : language === "ru" ? "ЗАГРУЗИТЬ README" : "LOAD README"}
                        </button>
                      )}

                      <div className="project-github">
                        <span className="github-icon">GH</span>
                        <span>{language === "ru" ? "ОТКРЫТЬ НА GITHUB" : "VIEW ON GITHUB"}</span>
                        <span className="github-arrow">↗</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
