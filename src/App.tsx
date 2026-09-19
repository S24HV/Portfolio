import { useEffect } from "react";

import "./global.styles.scss";

import BootScreen from "./components/BootScreen";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Roadmap from "./components/Roadmap";

import { useLanguage } from "./services/language";
import { useAppSelector } from "./store/hooks";

function App() {
  const theme = useAppSelector((state) => state.theme);
  const { language } = useLanguage();

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <div id="top" />

      <BootScreen />
      <Header />
      <BottomBar />

      <main className={`app-main ${language}`}>
        <Hero />
        <About />
        <TechStack />
        <Projects />

        <h2 className="section-title fade-in">
          {language === "ru" ? "План развития" : "Roadmap"}
        </h2>

        <Roadmap />
      </main>
    </>
  );
}

export default App;
