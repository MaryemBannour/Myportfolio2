"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectsData } from "@/data/projectsData";

const Projects = () => {
  // Convertir projectsData (objet) en tableau
  const projects = Object.entries(projectsData).map(([id, data]) => ({
    id: Number(id),
    title: data.title,
    image: data.images[0], // Prendre la première image du projet
    category: data.technologies[0] === "Flutter" ? "Mobile App" : "Web App",
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
    <section id="projects" className="py-20 bg-[#FEEEEB]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          My Projects
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
                  View Details
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
            ← Previous
          </button>

          <span className="flex items-center text-[#1C2A3A]">
            {Math.floor(currentProjectIndex / 2) + 1} /{" "}
            {Math.ceil(projects.length / 2)}
          </span>

          <button
            onClick={nextProject}
            className="btn-theme-primary text-center"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;