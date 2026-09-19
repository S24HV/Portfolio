import { useEffect, useState } from "react";

export type Language = "en" | "ru";

const STORAGE_KEY = "portfolio-language";
const EVENT_NAME = "portfolio-language-change";

const getInitialLanguage = (): Language => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "ru" ? "ru" : "en";
};

export const setLanguage = (language: Language) => {
  localStorage.setItem(STORAGE_KEY, language);
  window.dispatchEvent(new CustomEvent<Language>(EVENT_NAME, { detail: language }));
};

export const useLanguage = () => {
  const [language, setCurrentLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      if (customEvent.detail === "en" || customEvent.detail === "ru") {
        setCurrentLanguage(customEvent.detail);
      }
    };

    window.addEventListener(EVENT_NAME, handleLanguageChange);

    return () => window.removeEventListener(EVENT_NAME, handleLanguageChange);
  }, []);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
  };

  return { language, changeLanguage };
};
