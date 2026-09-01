"use client";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
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
        <h2 className="text-4xl font-bold text-white mb-8">{t.contact.title}</h2>

        <p className="text-xl text-[#CBD9E6] mb-12 max-w-2xl mx-auto">
          {t.contact.intro}
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

        <p className="text-[#CBD9E6] mb-8">{t.contact.chooseText}</p>

        <form onSubmit={handleSubmit} className="text-left mb-4 space-y-4">
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

          <input
            type="text"
            name="name"
            placeholder={t.contact.namePlaceholder}
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6]"
          />
          <input
            type="email"
            name="email"
            placeholder={t.contact.emailPlaceholder}
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-3 text-[#1C2A3A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CBD9E6]"
          />
          <textarea
            name="message"
            placeholder={t.contact.messagePlaceholder}
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
              {status === "loading" ? t.contact.sendingButton : t.contact.sendButton}
            </button>

            {status === "success" && (
              <p className="text-[#CBD9E6] mt-4">{t.contact.successMessage}</p>
            )}
            {status === "error" && (
              <p className="text-red-300 mt-4">{t.contact.errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
