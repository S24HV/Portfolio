import { useEffect, useState } from "react";

import "./global.styles.scss";

import BootScreen from "./components/BootScreen";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Roadmap from "./components/Roadmap";

import { useAppSelector } from "./store/hooks";

function App() {
  const theme = useAppSelector((state) => state.theme);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  return (
    <>
      <BootScreen />
      <Header />
      <BottomBar />
      <Hero />
      <About />
      <h2 className="section-title fade-in">Tech Stack</h2>
      <TechStack />
      <h2 className="section-title fade-in">Featured Projects</h2>
      {!showProjects ? (
        <div className="projects-gate fade-in">
          <button className="access-button" onClick={() => setShowProjects(true)}>
            $ ./access_repositories.sh
          </button>
          <p className="projects-gate-hint">
            Click to decrypt and load repositories from GitHub
          </p>
        </div>
      ) : (
        <>
          <Projects />
          <div className="projects-gate fade-in">
            <button className="access-button close" onClick={() => setShowProjects(false)}>
              $ ./close_repositories.sh
            </button>
          </div>
        </>
      )}
      <h2 className="section-title fade-in">Roadmap</h2>
      <Roadmap />
    </>
  );
}

export default App;