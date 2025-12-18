import { useTranslation } from "react-i18next";
import LogoHover from "./LogoHover";

export default function Header() {
  const { t, i18n } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero">
          <LogoHover />
        </a>

        <nav className="hidden md:flex gap-8 text-base text-white font-semibold">
          <a href="#about" className="relative py-2 transition-colors hover:text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.about")}</a>
          <a href="#services" className="relative py-2 transition-colors hover:text-orange-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full">{t("nav.services")}</a>
          <a href="#portfolio" className="relative py-2 transition-colors hover:text-pink-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.portfolio")}</a>
          <a href="#contacts" className="relative py-2 transition-colors hover:text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.contacts")}</a>
        </nav>

        <div className="flex gap-2 text-xs font-black">
          <button
            onClick={() => i18n.changeLanguage("ru")}
            className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
              i18n.language === "ru"
                ? "bg-orange-500 text-white border-orange-500 scale-105"
                : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
            }`}
          >
            RU
          </button>
          <button
            onClick={() => i18n.changeLanguage("ro")}
            className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
              i18n.language === "ro"
                ? "bg-orange-500 text-white border-orange-500 scale-105"
                : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
            }`}
          >
            RO
          </button>
        </div>
      </div>
    </header>
  );
}
