"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectDetail = ({ projectId }) => {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projectsData = {
    1: {
      title: "Mobi-Dical",
      images: [
        "/images/homeMobi-Dical.png",
        "/images/Mobi-Dical2.png",
        "/images/activity.png",
        "/images/responsiveMobi-Dical.png",
      ],
      description:
        "MobiDical is an educational web application designed to support children with autism through interactive games and activities. It allows parents to track their child's progress in a simple and accessible way.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      features: [
        "Parent Dashboard",
        "Educational Activities for Autistic Children",
        "Activity Tracking",
        "Child Progress Monitoring",
      ],
      liveLink:
        "https://drive.google.com/file/d/1Dqjli_cuawHY7vghwa2QVylliZtnZEAu/view?usp=sharing",
      githubLink: "https://github.com/MaryemBannour/MobiDical",
    },
    2: {
      title: "Portfolio",
      images: [
        "/images/Portfolio.png",
        "/images/projectDetail.png",
        "/images/responsivePortfolio.png",
      ],
      description:
        "A responsive portfolio website showcasing my skills and projects with modern design principles.",
      technologies: ["Next.js", "React", "Tailwind CSS"],
      features: [
        "Modern Responsive Design",
        "Project Showcase",
        "Skills & Technologies",
        "Smooth Navigation",
      ],
      liveLink: "#",
      githubLink: "https://github.com/MaryemBannour/Myportfolio2",
    },
    3: {
      title: "Habit tracker app",
      images: ["/images/habit-tracker.png"],
      description:
        "A mobile app to help users build and maintain healthy habits through reminders and progress tracking. This project is still in development",
      technologies: ["Flutter", "Dart", "Firebase"],
      features: [
        "Habit Creation",
        "Smart Reminders",
        "Progress Tracking",
        "User Authentication",
      ],
      liveLink: "#",
      githubLink: "#",
    },
  };

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

  useEffect(() => {
    if (projectId) {
      const numericId = Number(projectId);
      const foundProject = projectsData[numericId];

      if (foundProject) {
        setProject(foundProject);
        setCurrentImageIndex(0);
      }
      setLoading(false);
    }
  }, [projectId]);

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

  const goBackToPortfolio = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEEEEB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1C2A3A] mx-auto mb-4"></div>
          <p className="text-[#1C2A3A] text-xl">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FEEEEB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1C2A3A] mb-6">
            Project Not Found
          </h1>
          <p className="text-xl text-[#2D4A5F] mb-8">Project ID: {projectId}</p>
          <button
            onClick={goBackToPortfolio}
            className="bg-[#1C2A3A] text-white px-8 py-3 rounded-lg hover:bg-[#2D4A5F] transition duration-300 font-semibold"
          >
            Back to Portfolio
          </button>
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
          <button
            onClick={goBackToPortfolio}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium transition duration-300"
          >
            ← Back to Portfolio
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-[#1C2A3A] font-medium">
              {currentIndex + 1} / {projectIds.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => router.push(`/projects/${prevProjectId}`)}
                className="bg-transparent text-[#1C2A3A] border-2 border-[#1C2A3A] px-4 py-2 rounded-lg hover:bg-[#1C2A3A] hover:text-white transition duration-300"
              >
                ← Previous
              </button>
              <button
                onClick={() => router.push(`/projects/${nextProjectId}`)}
                className="bg-[#1C2A3A] text-white px-4 py-2 rounded-lg hover:bg-[#2D4A5F] transition duration-300"
              >
                Next →
              </button>
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
          {project.description}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C2A3A] mb-4">
            Technologies Used
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
            Key Features
          </h2>
          <ul className="space-y-3">
            {project.features.map((feature, index) => (
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
            className="bg-[#1C2A3A] text-white px-6 py-3 rounded-lg hover:bg-[#2D4A5F] transition duration-300 font-semibold"
          >
            Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[#1C2A3A] border-2 border-[#1C2A3A] px-6 py-3 rounded-lg hover:bg-[#1C2A3A] hover:text-white transition duration-300 font-semibold"
          >
            GitHub
          </a>
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#CBD9E6]">
          <button
            onClick={() => router.push(`/projects/${prevProjectId}`)}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium transition duration-300"
          >
            ← Previous Project: {projectsData[prevProjectId]?.title}
          </button>

          <button
            onClick={() => router.push(`/projects/${nextProjectId}`)}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium transition duration-300"
          >
            Next Project: {projectsData[nextProjectId]?.title} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
