import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#2D4A5F]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>

        <p className="text-xl text-[#CBD9E6] mb-12 max-w-2xl mx-auto">
          I&apos;m always interested in new opportunities and collaborations.
          Don&apos;t hesitate to reach out!
        </p>

        {/* Icônes simples */}
        <div className="flex justify-center space-x-12">
          <a
            href="https://www.linkedin.com/in/maryem-bannour-299937311"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300 mb-3">
              <FaLinkedin className="text-3xl text-[#1C2A3A] group-hover:text-[#2D4A5F] transition duration-300" />
            </div>
            <span className="text-white font-medium">LinkedIn</span>
          </a>
          <a
            href="https://github.com/mrymBn"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300 mb-3">
              <FaGithub className="text-3xl text-[#1C2A3A] group-hover:text-[#2D4A5F] transition duration-300" />
            </div>
            <span className="text-white font-medium">GitHub</span>
          </a>
          <a
            href="mailto:meryembannour3@gmail.com"
            className="group flex flex-col items-center"
          >
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition duration-300 mb-3">
              <FaEnvelope className="text-3xl text-[#1C2A3A] group-hover:text-[#2D4A5F] transition duration-300" />
            </div>
            <span className="text-white font-medium">Email</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
