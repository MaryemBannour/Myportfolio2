const Skills = () => {
  const skillCategories = [
    {
      title: "Language skills",
      items: ["Arabic (native)", "French ", "English "],
    },
    {
      title: "Web Development",
      items: ["React", "Next.js", "JavaScript", "TypeScript"],
    },
    {
      title: "Mobile Development",
      items: ["React Native", "Flutter", "Dart"],
    },
    {
      title: "Database Management",
      items: ["MongoDB", "MySQL", "Oracle", "Firebase"],
    },
  ];
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#1C2A3A] text-center mb-16">
          Skills
        </h2>
        <div className="grid grid-colos-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
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