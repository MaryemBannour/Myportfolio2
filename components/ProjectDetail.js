'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProjectDetail = ({ projectId }) => {
  const router = useRouter();
  
  // Données des projets
  const projects = {
    1: {
      title: "Mobi-Dical",
      image: "/images/Mobi-Dical2.png",
      description: "MobiDical is an educational web application designed to support children with autism through interactive games and activities. It allows parents to track their child’s progress in a simple and accessible way.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      features: ["Parent Dashboard", "Educational Games for Autistic Children", "Activity Tracking", "Child Progress Monitoring"],
      liveLink: "#",
      githubLink: "https://github.com/MaryemBannour/MobiDical"
    },
    2: {
      title: "Portfolio",
      image: "/images/Portfolio.png", 
      description: "A responsive portfolio website showcasing my skills and projects with modern design principles.",
      technologies: ["Next.js", "React", "Tailwind CSS"],
      features: ["Modern Responsive Design", "Project Showcase", "Skills & Technologies","Smooth Navigation"],
      liveLink: "#",
      githubLink: "https://github.com/MaryemBannour/Myportfolio2"
    },
    3: {
      title: "Habit tracker app",
      image: "/images/habit-tracker.png",
      description: "A mobile app to help users build and maintain healthy habits through reminders and progress tracking.This project is still in development",
      technologies: ["Flutter", "Dart", "Firebase"],
      features: ["Habit Creation", "Smart Reminders", "Progress Tracking","User Authentication"],
      liveLink: "#",
      githubLink: "#"
    }
  };

  const project = projects[projectId];
  const projectIds = Object.keys(projects).map(Number);
  const currentIndex = projectIds.indexOf(Number(projectId));
  const nextProjectId = projectIds[(currentIndex + 1) % projectIds.length];
  const prevProjectId = projectIds[(currentIndex - 1 + projectIds.length) % projectIds.length];

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FEEEEB] py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation supérieure */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.push('/#projects')}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium"
          >
            ← Back to Portfolio
          </button>
          
          <div className="flex items-center space-x-4">
            <span className="text-[#1C2A3A]">
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

        {/* Image du projet */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold text-[#1C2A3A] mb-4">{project.title}</h1>
        
        {/* Description */}
        <p className="text-xl text-[#2D4A5F] mb-8">{project.description}</p>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C2A3A] mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-[#CBD9E6] text-[#1C2A3A] px-4 py-2 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1C2A3A] mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-[#2D4A5F]">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Liens */}
        <div className="flex space-x-4">
          <a href={project.liveLink} className="bg-[#1C2A3A] text-white px-6 py-3 rounded-lg hover:bg-[#2D4A5F] transition duration-300">
            Live Demo
          </a>
          <a href={project.githubLink} className="bg-transparent text-[#1C2A3A] border-2 border-[#1C2A3A] px-6 py-3 rounded-lg hover:bg-[#1C2A3A] hover:text-white transition duration-300">
            GitHub
          </a>
        </div>

        {/* Navigation inférieure */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#CBD9E6]">
          <button 
            onClick={() => router.push(`/projects/${prevProjectId}`)}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium"
          >
            ← Previous Project: {projects[prevProjectId]?.title}
          </button>
          
          <button 
            onClick={() => router.push(`/projects/${nextProjectId}`)}
            className="flex items-center text-[#1C2A3A] hover:text-[#2D4A5F] font-medium"
          >
            Next Project: {projects[nextProjectId]?.title} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;