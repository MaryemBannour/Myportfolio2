import Maryem3 from "../public/images/maryem3.png";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";

// Ne pas utiliser process.env côté client, utiliser directement le basePath
const basePath = "/Myportfolio2";

const Hero = () => {
  return (
    <section id="hero" className="bg-[#FEEEEB] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1C2A3A] mb-6 leading-tight">
              Hi, I&apos;m Maryem — I build things, and I&apos;m learning to
              make them think.
            </h1>
            <p className="text-lg md:text-xl text-[#2D4A5F] max-w-3xl leading-relaxed mb-8">
              I&apos;m a Master&apos;s student in Computer Systems
              Engineering, currently interning as a mobile developer at
              Clevertech on Archimatch. I care about writing clean,
              maintainable code across web and mobile — and lately, about
              making that code smarter, exploring how AI agents and tools
              like MCP can fit naturally into real products. Currently
              looking for a final-year internship in France to keep growing
              in that direction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="btn-theme-primary text-center">
                View Projects
              </a>
              <a href="#contact" className="btn-theme-primary text-center">
                Get In Touch
              </a>
              <a
                href={`${basePath}/Maryem_Bannour_CV_en.pdf`}
                download
                className="btn-theme-secondary text-center flex items-center justify-center gap-2"
              >
                <FaDownload className="text-sm" />
                Resume
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
