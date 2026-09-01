"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem("lang");
    } catch {
      // localStorage may be unavailable (blocked storage, private browsing, etc.);
      // fall through to navigator-based detection as if nothing was stored.
      stored = null;
    }
    if (stored === "en" || stored === "fr") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: static export must hydrate as EN, then correct post-mount
      setLanguageState(stored);
      return;
    }
    setLanguageState(navigator.language.startsWith("fr") ? "fr" : "en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Storage blocked (e.g. private browsing) — language still updates
      // for the current session, it just won't persist across reloads.
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
