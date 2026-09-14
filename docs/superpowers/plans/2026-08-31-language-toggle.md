# Language Toggle (FR/EN) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors switch the entire portfolio site between English and French via a navbar toggle, with the language auto-detected from the browser on first visit and remembered afterward.

**Architecture:** A client-side `LanguageContext` (React Context) holds the current language and exposes the active translation dictionary. All display text moves from hardcoded JSX strings into a single `data/translations.js` file (`{ en: {...}, fr: {...} }`), keyed to mirror each section of the site. No routing changes, no new dependency.

**Tech Stack:** Next.js 15 (App Router, `output: 'export'`), React Context + hooks, plain JS data objects (no i18n library).

**Spec:** `docs/superpowers/specs/2026-08-31-language-toggle-design.md`

## Global Constraints

- No new npm dependency is added — plain React Context + a JS dictionary, matching the project's existing style of plain data objects (`data/projectsData.js`, `components/Skills.js`).
- `output: 'export'` in `next.config.mjs` means everything is statically pre-rendered; the first client render must match server output exactly (always English) to avoid a React hydration mismatch. Language detection/restoration happens in a `useEffect`, after mount.
- No URL change between languages — switching is purely visual, no navigation.
- `basePath: '/Myportfolio2'` (see `next.config.mjs`) must prefix any hardcoded `public/` asset path. The existing convention in this repo is a local `const basePath = "/Myportfolio2";` per file (see `components/Navbar.js`, `components/Hero.js`, `data/projectsData.js`) — follow the same pattern, don't introduce a shared import for it.
- Technology names (e.g. "React", "Node.js"), company names (Clevertech, Mobelite, CodinGOAT), project titles (Mobi-Dical, CineScope, Habit tracker app), and date ranges are **not** translated. Job titles ("Mobile Developer Intern"), descriptions, features, and all UI chrome **are** translated.
- No automated test framework exists in this repo (no Jest/RTL config, no `test` script in `package.json`). Every task's verification step is manual: run `npm run dev` and check specific rendered text at `http://localhost:3000/Myportfolio2/`.
- Two CV files already exist in `public/`: `Maryem_Bannour_CV_en.pdf` (English) and `maryem-bannour-fr.pdf` (French). The Resume button must point to the one matching the active language.

---

## File Structure

- **Create** `data/translations.js` — the single source of truth for all display text, in both languages.
- **Create** `context/LanguageContext.js` — `LanguageProvider` (client component) + `useLanguage()` hook.
- **Modify** `app/layout.js` — wrap `{children}` in `LanguageProvider`.
- **Modify** `components/Navbar.js` — translated nav labels, language toggle control, per-language CV link.
- **Modify** `components/Hero.js` — translated title/description/buttons, per-language CV link.
- **Modify** `components/Experience.js` — translated section title, "Current" badge, role + bullets per entry.
- **Modify** `components/Skills.js` — translated section title, category titles, and the "Language skills" item labels (other category items are tech names, left as-is).
- **Modify** `data/projectsData.js` — remove `description` and `features` (they move to `translations.js`); keep `title`, `images`, `technologies`, `liveLink`, `githubLink`.
- **Modify** `components/Projects.js` — translated section title, category badges, "View Details", pagination; project `description` read from `translations.js`.
- **Modify** `components/ProjectDetail.js` — translated labels; project `description`/`features` read from `translations.js`.
- **Modify** `components/Contact.js` — translated heading, intro, form placeholders, button states, status messages.

---

### Task 1: Translations data file

**Files:**
- Create: `data/translations.js`

**Interfaces:**
- Produces: `translations` (named export), shape `{ en: {...}, fr: {...} }` with the keys `nav`, `hero`, `experience`, `skills`, `projects`, `contact`, `projectDetail` as detailed below. Every later task reads from `translations[language].<section>.<key>`.

- [ ] **Step 1: Create `data/translations.js` with the full dictionary**

```js
export const translations = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      title: "Hi, I'm Maryem — I build things, and I'm learning to make them think.",
      description:
        "I'm a Master's student in Computer Systems Engineering, currently interning as a mobile developer at Clevertech on Archimatch. I care about writing clean, maintainable code across web and mobile — and lately, about making that code smarter, exploring how AI agents and tools like MCP can fit naturally into real products. Currently looking for a final-year internship in France to keep growing in that direction.",
      viewProjects: "View Projects",
      getInTouch: "Get In Touch",
      resume: "Resume",
    },
    experience: {
      sectionTitle: "Experience",
      current: "Current",
      items: [
        {
          role: "Mobile Developer Intern",
          bullets: [
            "Building the mobile version of Archimatch, a platform connecting building industry professionals in Tunisia",
            "Owning features end-to-end, from design to deployment",
            "Upcoming: AI integration into the project roadmap",
          ],
        },
        {
          role: "Full-Stack Developer Intern",
          bullets: [
            "Built MobiDical, a full-stack web app supporting autistic children's progress tracking",
            "Developed REST APIs with Node.js, Express, MongoDB, and JWT authentication",
            "Built a rule-based recommendation engine that analyzes a child's progress metrics to suggest tailored activities for parents",
          ],
        },
        {
          role: "Mobile Developer Intern",
          bullets: [
            "Learned Flutter/Dart for cross-platform mobile development",
            "Built Streakly, a habit-tracking app with Firebase (auth + real-time sync)",
          ],
        },
      ],
    },
    skills: {
      sectionTitle: "Skills",
      categories: [
        {
          title: "Language skills",
          items: ["Arabic (native)", "French", "English"],
        },
        {
          title: "Web Development",
          items: ["React", "Next.js", "JavaScript", "TypeScript"],
        },
        {
          title: "Backend Development",
          items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
        },
        {
          title: "Mobile Development",
          items: ["React Native", "Flutter", "Dart"],
        },
        {
          title: "Database Management",
          items: ["MongoDB", "MySQL", "Oracle", "Firebase"],
        },
      ],
    },
    projects: {
      sectionTitle: "My Projects",
      categoryMobile: "Mobile App",
      categoryWeb: "Web App",
      viewDetails: "View Details",
      previous: "← Previous",
      next: "Next →",
      items: {
        1: {
          description:
            "MobiDical is an educational web application designed to support children with autism through interactive games and activities. It allows parents to track their child's progress in a simple and accessible way.",
          features: [
            "Parent Dashboard",
            "Educational Activities for Autistic Children",
            "Activity Tracking",
            "Child Progress Monitoring",
          ],
        },
        2: {
          description:
            "A personalized movie and TV show discovery platform, featuring tailored recommendations, curated collections of new releases and classics, and user ratings. Movie and show data is powered by the TMDB API.",
          features: [
            "Personalized Recommendations",
            "Genre & Year Filtering",
            "User Ratings",
            "Detailed Movie & Show Pages",
          ],
        },
        3: {
          description:
            "A mobile app to help users build and maintain healthy habits through reminders and progress tracking. This project is still in development.",
          features: [
            "Habit Creation",
            "Smart Reminders",
            "Progress Tracking",
            "User Authentication",
          ],
        },
      },
    },
    contact: {
      title: "Get In Touch",
      intro:
        "I'm always interested in new opportunities and collaborations. Don't hesitate to reach out!",
      chooseText:
        "Reach out directly using the links above, or send me a message below.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      sendButton: "Send Message",
      sendingButton: "Sending...",
      successMessage:
        "Thanks! Your message has been sent — I'll get back to you soon.",
      errorMessage:
        "Something went wrong. Please try again or email me directly.",
    },
    projectDetail: {
      technologiesUsed: "Technologies Used",
      keyFeatures: "Key Features",
      liveDemo: "Live Demo",
      github: "GitHub",
      backToPortfolio: "Back to Portfolio",
      previousProject: "Previous Project",
      nextProject: "Next Project",
      notFoundTitle: "Project Not Found",
      notFoundProjectId: "Project ID:",
    },
  },
  fr: {
    nav: {
      about: "À propos",
      experience: "Expérience",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      resume: "CV",
    },
    hero: {
      title:
        "Salut, je suis Maryem — je construis des choses, et j'apprends à les rendre intelligentes.",
      description:
        "Je suis étudiante en Master Ingénierie des Systèmes Informatiques, actuellement stagiaire développeuse mobile chez Clevertech sur Archimatch. J'attache une grande importance à écrire du code propre et maintenable, aussi bien web que mobile — et depuis peu, à le rendre plus intelligent, en explorant comment les agents IA et des outils comme MCP peuvent s'intégrer naturellement dans de vrais produits. Je suis actuellement à la recherche d'un stage de fin d'études (PFE) en France pour continuer à progresser dans cette direction.",
      viewProjects: "Voir les projets",
      getInTouch: "Me contacter",
      resume: "CV",
    },
    experience: {
      sectionTitle: "Expérience",
      current: "En cours",
      items: [
        {
          role: "Stagiaire développeuse mobile",
          bullets: [
            "Développement de la version mobile d'Archimatch, une plateforme connectant les professionnels du secteur du bâtiment en Tunisie",
            "Prise en charge de fonctionnalités de bout en bout, de la conception au déploiement",
            "À venir : intégration de l'IA dans la feuille de route du projet",
          ],
        },
        {
          role: "Stagiaire développeuse Full-Stack",
          bullets: [
            "Développement de MobiDical, une application web full-stack de suivi des progrès d'enfants autistes",
            "Développement d'API REST avec Node.js, Express, MongoDB et authentification JWT",
            "Conception d'un moteur de recommandation à base de règles qui analyse les indicateurs de progrès d'un enfant pour suggérer des activités adaptées aux parents",
          ],
        },
        {
          role: "Stagiaire développeuse mobile",
          bullets: [
            "Apprentissage de Flutter/Dart pour le développement mobile multiplateforme",
            "Développement de Streakly, une application de suivi d'habitudes avec Firebase (authentification + synchronisation en temps réel)",
          ],
        },
      ],
    },
    skills: {
      sectionTitle: "Compétences",
      categories: [
        {
          title: "Langues",
          items: ["Arabe (langue maternelle)", "Français", "Anglais"],
        },
        {
          title: "Développement Web",
          items: ["React", "Next.js", "JavaScript", "TypeScript"],
        },
        {
          title: "Développement Backend",
          items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
        },
        {
          title: "Développement Mobile",
          items: ["React Native", "Flutter", "Dart"],
        },
        {
          title: "Gestion de bases de données",
          items: ["MongoDB", "MySQL", "Oracle", "Firebase"],
        },
      ],
    },
    projects: {
      sectionTitle: "Mes projets",
      categoryMobile: "Application Mobile",
      categoryWeb: "Application Web",
      viewDetails: "Voir les détails",
      previous: "← Précédent",
      next: "Suivant →",
      items: {
        1: {
          description:
            "MobiDical est une application web éducative conçue pour accompagner les enfants autistes à travers des jeux et activités interactives. Elle permet aux parents de suivre les progrès de leur enfant de façon simple et accessible.",
          features: [
            "Tableau de bord parent",
            "Activités éducatives pour enfants autistes",
            "Suivi des activités",
            "Suivi des progrès de l'enfant",
          ],
        },
        2: {
          description:
            "Une plateforme personnalisée de découverte de films et séries, avec des recommandations sur mesure, des collections organisées de nouveautés et de classiques, et des notes utilisateurs. Les données sont fournies par l'API TMDB.",
          features: [
            "Recommandations personnalisées",
            "Filtrage par genre et par année",
            "Notes des utilisateurs",
            "Pages détaillées par film et série",
          ],
        },
        3: {
          description:
            "Une application mobile pour aider les utilisateurs à créer et maintenir de bonnes habitudes grâce à des rappels et un suivi de progression. Ce projet est encore en développement.",
          features: [
            "Création d'habitudes",
            "Rappels intelligents",
            "Suivi de progression",
            "Authentification utilisateur",
          ],
        },
      },
    },
    contact: {
      title: "Me contacter",
      intro:
        "Je suis toujours intéressée par de nouvelles opportunités et collaborations. N'hésitez pas à me contacter !",
      chooseText:
        "Contactez-moi directement via les liens ci-dessus, ou envoyez-moi un message ci-dessous.",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      messagePlaceholder: "Votre message",
      sendButton: "Envoyer le message",
      sendingButton: "Envoi en cours...",
      successMessage:
        "Merci ! Votre message a bien été envoyé — je vous répondrai bientôt.",
      errorMessage:
        "Une erreur s'est produite. Merci de réessayer ou de m'écrire directement par email.",
    },
    projectDetail: {
      technologiesUsed: "Technologies utilisées",
      keyFeatures: "Fonctionnalités clés",
      liveDemo: "Démo en ligne",
      github: "GitHub",
      backToPortfolio: "Retour au portfolio",
      previousProject: "Projet précédent",
      nextProject: "Projet suivant",
      notFoundTitle: "Projet introuvable",
      notFoundProjectId: "ID du projet :",
    },
  },
};
```

- [ ] **Step 2: Verify the file has no syntax errors**

Run: `node -e "require('./data/translations.js')"` — this fails because it's an ES module (`export const`); instead verify via the dev server in a later task, or run:

Run: `node --input-type=module -e "import('./data/translations.js').then(m => console.log(Object.keys(m.translations.en), Object.keys(m.translations.fr)))"`
Expected output: two identical arrays, e.g. `[ 'nav', 'hero', 'experience', 'skills', 'projects', 'contact', 'projectDetail' ] [ 'nav', 'hero', 'experience', 'skills', 'projects', 'contact', 'projectDetail' ]`

- [ ] **Step 3: Commit**

```bash
git add data/translations.js
git commit -m "feat: add EN/FR translations dictionary"
```

---

### Task 2: LanguageContext

**Files:**
- Create: `context/LanguageContext.js`

**Interfaces:**
- Consumes: `translations` from `data/translations.js` (Task 1).
- Produces: `LanguageProvider` (component, wraps children) and `useLanguage()` hook returning `{ language: 'en' | 'fr', setLanguage: (lang: 'en' | 'fr') => void, t: object }`. Every later component task calls `useLanguage()`.

- [ ] **Step 1: Create `context/LanguageContext.js`**

```js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "fr") {
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
    localStorage.setItem("lang", lang);
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
```

- [ ] **Step 2: Wire the provider into the root layout**

Modify `app/layout.js`:

```js
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata = {
  title: 'Maryem Bannour - Portfolio',
  description: 'Portfolio personnel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify it doesn't crash**

Run: `npm run dev`, open `http://localhost:3000/Myportfolio2/` in a browser.
Expected: page loads normally (still showing the old English-only text — components aren't wired to `t` yet, that's Tasks 4-10). No red error overlay, no "useLanguage must be used within a LanguageProvider" error in the console.

- [ ] **Step 4: Commit**

```bash
git add context/LanguageContext.js app/layout.js
git commit -m "feat: add LanguageProvider and useLanguage hook"
```

---

### Task 3: Navbar — translated labels + language toggle + CV link

**Files:**
- Modify: `components/Navbar.js`

**Interfaces:**
- Consumes: `useLanguage()` from `context/LanguageContext.js` (Task 2) → `{ language, setLanguage, t }`.

- [ ] **Step 1: Rewrite `components/Navbar.js`**

```js
"use client";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

// Ne pas utiliser process.env côté client, utiliser directement le basePath
const basePath = "/Myportfolio2";

const cvFileByLang = {
  en: "Maryem_Bannour_CV_en.pdf",
  fr: "maryem-bannour-fr.pdf",
};

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold text-[#1C2A3A]">
          Maryem Bannour
        </Link>
        <div className="flex items-center space-x-8">
          <a
            href="#hero"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.about}
          </a>
          <a
            href="#experience"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.experience}
          </a>
          <a
            href="#skills"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.skills}
          </a>
          <a
            href="#projects"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.projects}
          </a>
          <a
            href="#contact"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.contact}
          </a>
          <div className="flex items-center gap-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setLanguage("fr")}
              className={
                language === "fr"
                  ? "text-[#1C2A3A] font-bold"
                  : "text-gray-400 hover:text-[#1C2A3A]"
              }
            >
              FR
            </button>
            <span className="text-gray-300">/</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={
                language === "en"
                  ? "text-[#1C2A3A] font-bold"
                  : "text-gray-400 hover:text-[#1C2A3A]"
              }
            >
              EN
            </button>
          </div>
          <a
            href={`${basePath}/${cvFileByLang[language]}`}
            download
            className="flex items-center gap-2 border border-[#1C2A3A] text-[#1C2A3A] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#1C2A3A] hover:text-white transition-colors duration-300"
          >
            <FaDownload className="text-xs" />
            {t.nav.resume}
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/Myportfolio2/`.
Expected:
- Nav shows "About / Experience / Skills / Projects / Contact" in English by default, plus an "FR / EN" toggle (EN bold) and a "Resume" pill button.
- Click "FR": nav labels become "À propos / Expérience / Compétences / Projets / Contact", "FR" becomes bold, "Resume" button becomes "CV".
- Right-click → Inspect the "CV"/"Resume" link's `href`: in English it ends with `/Maryem_Bannour_CV_en.pdf`; in French it ends with `/maryem-bannour-fr.pdf`.
- Reload the page: the last-picked language is still active (persisted via `localStorage`).

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.js
git commit -m "feat: translate navbar and add FR/EN language toggle"
```

---

### Task 4: Hero — translated copy + CV link

**Files:**
- Modify: `components/Hero.js`

**Interfaces:**
- Consumes: `useLanguage()` (Task 2).

- [ ] **Step 1: Rewrite `components/Hero.js`**

```js
"use client";
import Maryem3 from "../public/images/maryem3.png";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

// Ne pas utiliser process.env côté client, utiliser directement le basePath
const basePath = "/Myportfolio2";

const cvFileByLang = {
  en: "Maryem_Bannour_CV_en.pdf",
  fr: "maryem-bannour-fr.pdf",
};

const Hero = () => {
  const { language, t } = useLanguage();

  return (
    <section id="hero" className="bg-[#FEEEEB] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1C2A3A] mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-[#2D4A5F] max-w-3xl leading-relaxed mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="btn-theme-primary text-center">
                {t.hero.viewProjects}
              </a>
              <a href="#contact" className="btn-theme-primary text-center">
                {t.hero.getInTouch}
              </a>
              <a
                href={`${basePath}/${cvFileByLang[language]}`}
                download
                className="btn-theme-secondary text-center flex items-center justify-center gap-2"
              >
                <FaDownload className="text-sm" />
                {t.hero.resume}
              </a>
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm h-96 rounded-2xl overflow-hidden border-4 border-[#CBD9E6] shadow-xl">
              <Image
                src={Maryem3}
                alt="Maryem bannour"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/Myportfolio2/`.
Expected: toggling FR/EN in the navbar instantly changes the Hero title, description, and all three buttons ("View Projects"/"Voir les projets", "Get In Touch"/"Me contacter", "Resume"/"CV").

- [ ] **Step 3: Commit**

```bash
git add components/Hero.js
git commit -m "feat: translate Hero section"
```

---

### Task 5: Experience — translated section

**Files:**
- Modify: `components/Experience.js`

**Interfaces:**
- Consumes: `useLanguage()` (Task 2). `t.experience.items[i]` aligns positionally with the existing `experiences[i]` array (same order: Clevertech, Mobelite, CodinGOAT) — company name, dates, and `current` flag stay hardcoded in the component (not translated); only `role` and `bullets` come from `t`.

- [ ] **Step 1: Rewrite `components/Experience.js`**

```js
"use client";
import { useLanguage } from "@/context/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    { company: "Clevertech", dates: "Jul 2026 – Present", current: true },
    { company: "Mobelite", dates: "Feb 2025 – May 2025", current: false },
    { company: "CodinGOAT", dates: "Jul 2024 – Aug 2024", current: false },
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          {t.experience.sectionTitle}
        </h2>

        <div className="relative max-w-3xl mx-auto pl-10 border-l-2 border-[#CBD9E6]">
          {experiences.map((exp, index) => {
            const item = t.experience.items[index];
            return (
              <div key={index} className="relative mb-12 last:mb-0">
                <span className="absolute -left-[3.05rem] top-1.5 w-4 h-4 rounded-full bg-[#1C2A3A] border-4 border-white shadow" />

                <div className="bg-[#FFFFFB] rounded-lg p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-[#1C2A3A]">
                      {item.role} — {exp.company}
                    </h3>
                    {exp.current && (
                      <span className="bg-[#1C2A3A] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {t.experience.current}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#2D4A5F] mb-4">{exp.dates}</p>
                  <ul className="space-y-2">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-[#2D4A5F]">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, scroll to the Experience section.
Expected: in English, first entry reads "Mobile Developer Intern — Clevertech" with a "Current" badge; switching to French it reads "Stagiaire développeuse mobile — Clevertech" with an "En cours" badge, and all bullet points switch language. Company names and dates stay identical in both languages.

- [ ] **Step 3: Commit**

```bash
git add components/Experience.js
git commit -m "feat: translate Experience section"
```

---

### Task 6: Skills — translated section

**Files:**
- Modify: `components/Skills.js`

**Interfaces:**
- Consumes: `useLanguage()` (Task 2). `t.skills.categories` fully replaces the local `skillCategories` array (same order: Language skills, Web Development, Backend Development, Mobile Development, Database Management).

- [ ] **Step 1: Rewrite `components/Skills.js`**

```js
"use client";
import { useLanguage } from "@/context/LanguageContext";

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 bg-[#FEEEEB]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          {t.skills.sectionTitle}
        </h2>
        <div className="grid grid-colos-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
          {t.skills.categories.map((category, index) => (
            <div key={index} className="bg-[#FFFFFB] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#1C2A3A] mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-[#2D4A5F]">
                    {" "}
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Skills;
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, scroll to Skills.
Expected: English shows "Language skills / Web Development / Backend Development / Mobile Development / Database Management". French shows "Langues / Développement Web / Développement Backend / Développement Mobile / Gestion de bases de données". The "Langues" category items switch to "Arabe (langue maternelle) / Français / Anglais"; the other four categories' items (tech names) stay identical in both languages.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.js
git commit -m "feat: translate Skills section"
```

---

### Task 7: projectsData — remove translated fields

**Files:**
- Modify: `data/projectsData.js`

**Interfaces:**
- Produces: `projectsData` entries now only have `title`, `images`, `technologies`, `liveLink`, `githubLink` — no `description`, no `features`. Tasks 8 and 9 read `description`/`features` from `translations[language].projects.items[id]` instead.

- [ ] **Step 1: Remove `description` and `features` from every entry in `data/projectsData.js`**

Resulting file:

```js
// Ne pas utiliser process.env côté client, utiliser directement le basePath
const basePath = '/Myportfolio2';

const imagePath = (path) => `${basePath}${path}`;

export const projectsData = {
  1: {
    title: "Mobi-Dical",
    images: [
      imagePath("/images/homeMobi-Dical.png"),
      imagePath("/images/Mobi-Dical2.png"),
      imagePath("/images/activity.png"),
      imagePath("/images/responsiveMobi-Dical.png"),
    ],
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    liveLink:
      "https://drive.google.com/file/d/1Dqjli_cuawHY7vghwa2QVylliZtnZEAu/view?usp=sharing",
    githubLink: "https://github.com/MaryemBannour/MobiDical",
  },
  2: {
    title: "CineScope",
    images: [
      imagePath("/images/home.png"),
      imagePath("/images/browse.png"),
      imagePath("/images/detail.png"),
    ],
    technologies: ["React.js", "TMDB API", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  3: {
    title: "Habit tracker app",
    images: [imagePath("/images/habit-tracker.png")],
    technologies: ["Flutter", "Dart", "Firebase"],
    liveLink: "#",
    githubLink: "#",
  },
};
```

- [ ] **Step 2: Commit**

Wait to commit until Task 8 and Task 9 also compile against this change (a commit here alone would leave `Projects.js`/`ProjectDetail.js` referencing `project.description`/`project.features`, which would render `undefined`). Skip standalone verification/commit for this step — it's finished together with Task 8's commit.

---

### Task 8: Projects — translated section + description from translations

**Files:**
- Modify: `components/Projects.js`

**Interfaces:**
- Consumes: `useLanguage()` (Task 2), `projectsData` (Task 7, no longer has `description`/`features`).

- [ ] **Step 1: Rewrite `components/Projects.js`**

```js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectsData } from "@/data/projectsData";
import { useLanguage } from "@/context/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const projects = Object.entries(projectsData).map(([id, data]) => ({
    id: Number(id),
    title: data.title,
    image: data.images[0],
    category:
      data.technologies[0] === "Flutter" ? t.projects.categoryMobile : t.projects.categoryWeb,
  }));

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  const visibleProjects = projects.slice(
    currentProjectIndex,
    currentProjectIndex + 2
  );

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          {t.projects.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64 bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1C2A3A] text-white px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1C2A3A] mb-2">
                  {project.title}
                </h3>

                <Link
                  href={`/projects/${project.id}`}
                  className="inline-block bg-[#1C2A3A] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#2D4A5F] transition duration-300 mt-4"
                >
                  {t.projects.viewDetails}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={prevProject}
            className="btn-theme-secondary text-center"
          >
            {t.projects.previous}
          </button>

          <span className="flex items-center text-[#1C2A3A]">
            {Math.floor(currentProjectIndex / 2) + 1} /{" "}
            {Math.ceil(projects.length / 2)}
          </span>

          <button
            onClick={nextProject}
            className="btn-theme-primary text-center"
          >
            {t.projects.next}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
```

Note: the Projects grid cards themselves never showed `description` (only title + category + image), so this component only needs `t.projects.*` for chrome — the translated `description`/`features` from `translations.js` are consumed in Task 9 (`ProjectDetail.js`).

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, scroll to Projects.
Expected: heading shows "My Projects" (EN) / "Mes projets" (FR); category badges show "Web App"/"Application Web" (Mobi-Dical, CineScope) — the Habit tracker card shows "Mobile App"/"Application Mobile" since it's Flutter; "View Details" becomes "Voir les détails"; pagination buttons become "← Précédent" / "Suivant →".

- [ ] **Step 3: Commit (includes Task 7's `projectsData.js` change)**

```bash
git add data/projectsData.js components/Projects.js
git commit -m "feat: translate Projects section, move descriptions to translations"
```

---

### Task 9: ProjectDetail — translated labels + description/features from translations

**Files:**
- Modify: `components/ProjectDetail.js`

**Interfaces:**
- Consumes: `useLanguage()` (Task 2), `projectsData` (Task 7), `translations[language].projects.items[id]` for `description`/`features`.

- [ ] **Step 1: Update `components/ProjectDetail.js`**

Add the import and the `t`/language pull at the top of the component, then replace every hardcoded string and the two removed data fields:

```js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { projectsData } from "@/data/projectsData";
import { useLanguage } from "@/context/LanguageContext";

const ProjectDetail = ({ projectId }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = useMemo(() => {
    if (projectId) {
      const numericId = Number(projectId);
      return projectsData[numericId] || null;
    }
    return null;
  }, [projectId]);

  const projectText = t.projects.items[Number(projectId)];

  const getImageClassName = (imagePath) => {
    const isMobileImage =
      imagePath.includes("responsive") ||
      imagePath.includes("mobile") ||
      imagePath.includes("mobile-view");

    const isReportOrDetailImage =
      imagePath.includes("Mobi-Dical2") ||
      imagePath.includes("projectDetail") ||
      imagePath.includes("activity") ||
      imagePath.includes("home") ||
      imagePath.includes("Portfolio") ||
      imagePath.includes("report") ||
      imagePath.includes("detail");

    return isMobileImage || isReportOrDetailImage
      ? "object-contain bg-white"
      : "object-cover";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const projectIds = Object.keys(projectsData).map(Number);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FEEEEB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1C2A3A] mb-6">
            {t.projectDetail.notFoundTitle}
          </h1>
          <p className="text-xl text-[#2D4A5F] mb-8">
            {t.projectDetail.notFoundProjectId} {projectId}
          </p>
          <Link
            href="/"
            className="bg-[#1C2A3A] text-white px-8 py-3 rounded-lg hover:bg-[#2D4A5F] transition duration-300 font-semibold inline-block"
          >
            {t.projectDetail.backToPortfolio}
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = projectIds.indexOf(Number(projectId));
  const nextProjectId = projectIds[(currentIndex + 1) % projectIds.length];
  const prevProjectId =
    projectIds[(currentIndex - 1 + projectIds.length) % projectIds.length];

  return (
    <div className="min-h-screen bg-[#FEEEEB] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium transition duration-300"
          >
            ← {t.projectDetail.backToPortfolio}
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-[#1C2A3A] font-medium">
              {currentIndex + 1} / {projectIds.length}
            </span>
            <div className="flex space-x-2">
              <Link
                href={`/projects/${prevProjectId}`}
                className="bg-transparent text-[#1C2A3A] border-2 border-[#1C2A3A] px-4 py-2 rounded-lg hover:bg-[#1C2A3A] hover:text-white transition duration-300"
              >
                {t.projects.previous}
              </Link>
              <Link
                href={`/projects/${nextProjectId}`}
                className="bg-[#1C2A3A] text-white px-4 py-2 rounded-lg hover:bg-[#2D4A5F] transition duration-300"
              >
                {t.projects.next}
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-white">
            <Image
              src={project.images[currentImageIndex]}
              alt={`${project.title} - View ${currentImageIndex + 1}`}
              fill
              className={getImageClassName(project.images[currentImageIndex])}
              priority
            />

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#1C2A3A] w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#1C2A3A] w-10 h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition duration-300 ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>

          {project.images.length > 1 && (
            <div className="flex justify-center space-x-3 mt-4">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition duration-300 ${
                    index === currentImageIndex
                      ? "border-[#1C2A3A]"
                      : "border-transparent hover:border-[#CBD9E6]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={getImageClassName(image)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold text-[#1C2A3A] mb-4">
          {project.title}
        </h1>

        <p className="text-xl text-[#2D4A5F] mb-8 leading-relaxed">
          {projectText.description}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C2A3A] mb-4">
            {t.projectDetail.technologiesUsed}
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-[#CBD9E6] text-[#1C2A3A] px-4 py-2 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C2A3A] mb-4">
            {t.projectDetail.keyFeatures}
          </h2>
          <ul className="space-y-3">
            {projectText.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#1C2A3A] font-bold mr-3">•</span>
                <span className="text-[#2D4A5F] text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-4 mb-12">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1C2A3A] text-white px-6 py-3 rounded-lg hover:bg-[#2D4A5F] transition duration-300 font-semibold"
          >
            {t.projectDetail.liveDemo}
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[#1C2A3A] border-2 border-[#1C2A3A] px-6 py-3 rounded-lg hover:bg-[#1C2A3A] hover:text-white transition duration-300 font-semibold"
          >
            {t.projectDetail.github}
          </a>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#CBD9E6]">
          <Link
            href={`/projects/${prevProjectId}`}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium transition duration-300"
          >
            ← {t.projectDetail.previousProject}: {projectsData[prevProjectId]?.title}
          </Link>

          <Link
            href={`/projects/${nextProjectId}`}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium transition duration-300"
          >
            {t.projectDetail.nextProject}: {projectsData[nextProjectId]?.title} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, click "View Details" on any project card.
Expected: in English, the page shows "Technologies Used", "Key Features", "Live Demo", "GitHub", "← Back to Portfolio", "← Previous Project: ...", "Next Project: ... →". Switch to French via the navbar toggle (still visible/sticky on this page): labels become "Technologies utilisées", "Fonctionnalités clés", "Démo en ligne", "← Retour au portfolio", "← Projet précédent : ...", "Projet suivant : ... →", and the paragraph description + feature bullets switch to French. Test this on all three project ids (1, 2, 3).

- [ ] **Step 3: Commit**

```bash
git add components/ProjectDetail.js
git commit -m "feat: translate ProjectDetail page"
```

---

### Task 10: Contact — translated form and messages

**Files:**
- Modify: `components/Contact.js`

**Interfaces:**
- Consumes: `useLanguage()` (Task 2). Note: the `formData` keys sent to FormSubmit (`name`, `email`, `message`) are unchanged — only the placeholders/labels/status text are translated.

- [ ] **Step 1: Update `components/Contact.js`**

```js
"use client";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/meryembannour3@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#2D4A5F]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">{t.contact.title}</h2>

        <p className="text-xl text-[#CBD9E6] mb-12 max-w-2xl mx-auto">
          {t.contact.intro}
        </p>

        {/* Icônes simples */}
        <div className="flex justify-center space-x-12 mb-10">
          <a
            href="https://www.linkedin.com/in/maryem-bannour-299937311"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300 mb-3">
              <FaLinkedin className="text-3xl text-[#1C2A3A] group-hover:text-[#2D4A5F] transition duration-300" />
            </div>
            <span className="text-white font-medium">LinkedIn</span>
          </a>
          <a
            href="https://github.com/mrymBn"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300 mb-3">
              <FaGithub className="text-3xl text-[#1C2A3A] group-hover:text-[#2D4A5F] transition duration-300" />
            </div>
            <span className="text-white font-medium">GitHub</span>
          </a>
          <a
            href="mailto:meryembannour3@gmail.com"
            className="group flex flex-col items-center"
          >
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300 mb-3">
              <FaEnvelope className="text-3xl text-[#1C2A3A] group-hover:text-[#2D4A5F] transition duration-300" />
            </div>
            <span className="text-white font-medium">Email</span>
          </a>
        </div>

        <p className="text-[#CBD9E6] mb-8">{t.contact.chooseText}</p>

        <form onSubmit={handleSubmit} className="text-left mb-4 space-y-4">
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

          <input
            type="text"
            name="name"
            placeholder={t.contact.namePlaceholder}
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6]"
          />
          <input
            type="email"
            name="email"
            placeholder={t.contact.emailPlaceholder}
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6]"
          />
          <textarea
            name="message"
            placeholder={t.contact.messagePlaceholder}
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6] resize-none"
          />

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-[#1C2A3A] px-8 py-3 rounded-lg font-medium hover:bg-[#CBD9E6] transition duration-300 disabled:opacity-60"
            >
              {status === "loading" ? t.contact.sendingButton : t.contact.sendButton}
            </button>

            {status === "success" && (
              <p className="text-[#CBD9E6] mt-4">{t.contact.successMessage}</p>
            )}
            {status === "error" && (
              <p className="text-red-300 mt-4">{t.contact.errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`, scroll to Contact.
Expected: heading, intro paragraph, and "Reach out directly..." line switch between EN/FR. Form placeholders ("Your name"/"Votre nom", etc.) switch. Submit button shows "Sending..."/"Envoi en cours..." while loading. LinkedIn/GitHub/Email labels stay unchanged in both languages (proper nouns).

- [ ] **Step 3: Commit**

```bash
git add components/Contact.js
git commit -m "feat: translate Contact section"
```

---

### Task 11: Full-site verification and spec cleanup

**Files:**
- None modified (verification only), then delete the working spec doc.

- [ ] **Step 1: Full manual walkthrough**

Run: `npm run dev`, open `http://localhost:3000/Myportfolio2/`.
1. Confirm the site loads in English by default (no `localStorage` set yet — clear it first via DevTools → Application → Local Storage if it carries over from earlier testing).
2. Click "FR" in the navbar. Confirm every section updates: Navbar, Hero, Experience, Skills, Projects, Contact.
3. Reload the page. Confirm it reopens in French (persisted via `localStorage`).
4. Click "EN". Confirm everything reverts to English and persists after reload.
5. Visit each of the 3 project detail pages (`/projects/1`, `/projects/2`, `/projects/3` under the basePath) in both languages and confirm description, features, and all labels switch correctly.
6. Submit the contact form once (real submission — this triggers FormSubmit's one-time confirmation email) and confirm the success message renders in the currently active language.
7. Open DevTools console throughout steps 1-6: confirm there are no hydration warnings and no "useLanguage must be used within a LanguageProvider" errors.

- [ ] **Step 2: Delete the working spec (per user instruction — not to be committed)**

```bash
rm docs/superpowers/specs/2026-08-31-language-toggle-design.md
```

Do not commit this deletion as part of the feature commits above — it simply removes a working document that was never committed in the first place (confirm with `git status` that the file was untracked, then delete it).

- [ ] **Step 3: Final check**

Run: `git status`
Expected: no pending changes related to `docs/superpowers/specs/2026-08-31-language-toggle-design.md` (it was never tracked), and `docs/superpowers/plans/2026-08-31-language-toggle.md` (this plan file) is present — leave it as-is unless the user asks to remove it too.
