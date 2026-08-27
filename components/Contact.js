"use client";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/meryembannour3@gmail.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#2D4A5F]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>

        <p className="text-xl text-[#CBD9E6] mb-12 max-w-2xl mx-auto">
          I&apos;m always interested in new opportunities and collaborations.
          Don&apos;t hesitate to reach out!
        </p>

        {/* Icônes simples */}
        <div className="flex justify-center space-x-12 mb-10">
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

        <p className="text-[#CBD9E6] mb-8">
          Reach out directly using the links above, or send me a message below.
        </p>

        <form onSubmit={handleSubmit} className="text-left mb-4 space-y-4">
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6]"
          />
          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6] resize-none"
          />

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-[#1C2A3A] px-8 py-3 rounded-lg font-medium hover:bg-[#CBD9E6] transition duration-300 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-[#CBD9E6] mt-4">
                Thanks! Your message has been sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-300 mt-4">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
