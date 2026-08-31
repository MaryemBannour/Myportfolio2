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
