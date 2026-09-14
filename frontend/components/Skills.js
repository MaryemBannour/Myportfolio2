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
