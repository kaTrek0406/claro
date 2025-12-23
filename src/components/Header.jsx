import { useState } from "react";
import { useTranslation } from "react-i18next";
import LogoHover from "./LogoHover";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 lg:h-28 flex items-center justify-between">
          <a href="#hero" onClick={closeMenu}>
            <LogoHover />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm lg:text-base text-white font-semibold">
            <a href="#about" className="relative py-2 transition-colors hover:text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.about")}</a>
            <a href="#services" className="relative py-2 transition-colors hover:text-orange-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full">{t("nav.services")}</a>
            <a href="#portfolio" className="relative py-2 transition-colors hover:text-pink-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.portfolio")}</a>
            <a href="#contacts" className="relative py-2 transition-colors hover:text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.contacts")}</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex gap-1.5 sm:gap-2 text-xs font-black">
              <button
                onClick={() => i18n.changeLanguage("ru")}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 transition-all duration-300 ${
                  i18n.language === "ru"
                    ? "bg-orange-500 text-white border-orange-500 scale-105"
                    : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                }`}
              >
                RU
              </button>
              <button
                onClick={() => i18n.changeLanguage("ro")}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 transition-all duration-300 ${
                  i18n.language === "ro"
                    ? "bg-orange-500 text-white border-orange-500 scale-105"
                    : "border-white/20 text-white/60 hover:text-white hover:border-white/40"
                }`}
              >
                RO
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2.5 bg-orange-500 rounded-lg hover:bg-orange-600 transition-all relative z-50"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 sm:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      >
        <nav
          className={`flex flex-col items-center justify-center h-full gap-8 text-2xl font-black uppercase tracking-tight transition-all duration-500 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-10"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <a
            href="#about"
            onClick={closeMenu}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            {t("nav.about")}
          </a>
          <a
            href="#services"
            onClick={closeMenu}
            className="text-white hover:text-orange-500 transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="#portfolio"
            onClick={closeMenu}
            className="text-white hover:text-pink-400 transition-colors"
          >
            {t("nav.portfolio")}
          </a>
          <a
            href="#contacts"
            onClick={closeMenu}
            className="text-white hover:text-purple-400 transition-colors"
          >
            {t("nav.contacts")}
          </a>
        </nav>
      </div>
    </>
  );
}