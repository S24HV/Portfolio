import { useEffect } from "react";

import "./global.styles.scss";

import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";

import { useAppSelector } from "./store/hooks";

function App() {
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  return (
    <>
      <Header />
      <About />
      <h2>My Project:</h2>
      <Projects />
    </>
  );
}

export default App;
