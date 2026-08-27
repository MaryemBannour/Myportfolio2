const Experience = () => {
  const experiences = [
    {
      role: "Mobile Developer Intern",
      company: "Clevertech",
      dates: "Jul 2026 – Present",
      current: true,
      bullets: [
        "Building the mobile version of Archimatch, a platform connecting building industry professionals in Tunisia",
        "Owning features end-to-end, from design to deployment",
        "Upcoming: AI integration into the project roadmap",
      ],
    },
    {
      role: "Full-Stack Developer Intern",
      company: "Mobelite",
      dates: "Feb 2025 – May 2025",
      current: false,
      bullets: [
        "Built MobiDical, a full-stack web app supporting autistic children's progress tracking",
        "Developed REST APIs with Node.js, Express, MongoDB, and JWT authentication",
        "Built a rule-based recommendation engine that analyzes a child's progress metrics to suggest tailored activities for parents",
      ],
    },
    {
      role: "Mobile Developer Intern",
      company: "CodinGOAT",
      dates: "Jul 2024 – Aug 2024",
      current: false,
      bullets: [
        "Learned Flutter/Dart for cross-platform mobile development",
        "Built Streakly, a habit-tracking app with Firebase (auth + real-time sync)",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          Experience
        </h2>

        <div className="relative max-w-3xl mx-auto pl-10 border-l-2 border-[#CBD9E6]">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[3.05rem] top-1.5 w-4 h-4 rounded-full bg-[#1C2A3A] border-4 border-white shadow" />

              <div className="bg-[#FFFFFB] rounded-lg p-6">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-[#1C2A3A]">
                    {exp.role} — {exp.company}
                  </h3>
                  {exp.current && (
                    <span className="bg-[#1C2A3A] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#2D4A5F] mb-4">{exp.dates}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="text-[#2D4A5F]">
                      • {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
