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
