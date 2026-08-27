import Link from "next/link";
import { FaDownload } from "react-icons/fa";

// Ne pas utiliser process.env côté client, utiliser directement le basePath
const basePath = "/Myportfolio2";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="#" className="text-2xl font-bold text-[#1C2A3A]">
          Maryem Bannour
        </Link>
        <div className="flex space-x-8">
          <a
            href="#hero"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#experience"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            Experience
          </a>
          <a
            href="#skills"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-[#2D4A5F] hover:text-[#1C2A3A] transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href={`${basePath}/Maryem_Bannour_CV_en.pdf`}
            download
            className="flex items-center gap-2 border border-[#1C2A3A] text-[#1C2A3A] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#1C2A3A] hover:text-white transition-colors duration-300"
          >
            <FaDownload className="text-xs" />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
