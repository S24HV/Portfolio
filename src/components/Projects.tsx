import { useEffect, useState } from "react";
import { marked } from "marked";

import GitImg from "../assets/git.png";

import {
  getAllRepos,
  getRepoDescription,
  GitHubUsername,
  IRepo,
  isRepoImage,
} from "../services/github";

import "./projects.scss";

import { useAppSelector } from "../store/hooks";

const Projects = () => {
  const [projects, setProjects] = useState<IRepo[]>([]);
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    const getAndSetProjects = async () => {
      const projectsRes = await getAllRepos();
      const projectsWithDescriptions = await Promise.all(
        projectsRes.map(async (project) => {
          const description = await getRepoDescription(project.name);
          const isImage = await isRepoImage(project.name);
          return { ...project, description, isImage };
        })
      );
      setProjects(projectsWithDescriptions);
    };
    getAndSetProjects();
  }, []);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <div
          className={`project ${theme}`}
          key={project.id}
          onClick={() => openInNewTab(project.html_url)}>
          <img
            src={
              project.isImage
                ? `https://raw.githubusercontent.com/${GitHubUsername}/${project.name}/master/preview.jpg`
                : GitImg
            }
            alt={"project preview"}
          />
          <h2>{project.name}</h2>
          <h3>Language: {project.language}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: marked(project.description || ""),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Projects;
