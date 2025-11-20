import Link from "next/link";
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Mobi-Dical",
      description:
        "MobiDical is an educational web application designed to support autistic children with autism through interactive games and activities. It allows parents to track their child’s progress in a simple and accessible way.",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "A responsive portfolio website showcasing my skills and projects with modern design principles.",
    },
    {
      id: 3,
      title: "Habit tracker App",
      description:
        "A mobile app to help users build and maintain healthy habits through reminders and progress tracking.",
    },
  ];
  return (
    <section id="projects" className="py-20 bg-[#FEEEEB]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-[#1C2A3A] mb-3">
                {project.title}
              </h3>
              <p className="text-[#2D4A5F] mb-4">{project.description}</p>
              <Link
                href={`/projects/${project.id}`}
                className="btn-theme-primary inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
            <button className="btn-theme-secondary">Back</button>
            <button className="btn-theme-primary">Next</button>
        </div>
      </div>
    </section>
  );
};
export default Projects;
