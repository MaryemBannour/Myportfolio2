import Link from "next/link";

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
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
