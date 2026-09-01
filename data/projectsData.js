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
