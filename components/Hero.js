import Maryem3 from "../public/images/maryem3.png";
import Image from "next/image";
const Hero = () => {
  return (
    <section id="hero" className="min-h-screen bg-[#FEEEEB] flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-6xl font-bold text-[#1C2A3A] mb-6">
              Maryem Bannour
            </h1>
            <h1 className="text-6xl text-[#2D4A5F] mb-8">
              Web and Mobile developer
            </h1>
            <p className="text-3xl text-[#1C2A3A] max-w-3xl leading-relaxed mb-12">
              {" "}
              I'm a junior software engineer crafting modern web and mobile
              applications with clean code and intuitive user experiences. Let's
              collaborate to bring your digital vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="btn-theme-primary text-center">
                View Projects
              </a>
              <a href="#contact" className="btn-theme-primary text-center">
                Get In Touch
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden border-4 border-[#CBD9E6] shadow-xl">
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
