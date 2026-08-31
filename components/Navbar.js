"use client";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

// Ne pas utiliser process.env côté client, utiliser directement le basePath
const basePath = "/Myportfolio2";

const cvFileByLang = {
  en: "Maryem_Bannour_CV_en.pdf",
  fr: "maryem-bannour-fr.pdf",
};

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold text-[#1C2A3A]">
          Maryem Bannour
        </Link>
        <div className="flex items-center space-x-8">
          <a
            href="#hero"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.about}
          </a>
          <a
            href="#experience"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.experience}
          </a>
          <a
            href="#skills"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.skills}
          </a>
          <a
            href="#projects"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.projects}
          </a>
          <a
            href="#contact"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            {t.nav.contact}
          </a>
          <div className="flex items-center gap-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setLanguage("fr")}
              className={
                language === "fr"
                  ? "text-[#1C2A3A] font-bold"
                  : "text-gray-400 hover:text-[#1C2A3A]"
              }
            >
              FR
            </button>
            <span className="text-gray-300">/</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={
                language === "en"
                  ? "text-[#1C2A3A] font-bold"
                  : "text-gray-400 hover:text-[#1C2A3A]"
              }
            >
              EN
            </button>
          </div>
          <a
            href={`${basePath}/${cvFileByLang[language]}`}
            download
            className="flex items-center gap-2 border border-[#1C2A3A] text-[#1C2A3A] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#1C2A3A] hover:text-white transition-colors duration-300"
          >
            <FaDownload className="text-xs" />
            {t.nav.resume}
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
