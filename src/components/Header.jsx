import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import LogoHover from "./LogoHover";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Check if we're on a category or case study page
  const isOnSubPage = location.pathname !== '/';

  const handleLogoClick = (e) => {
    e.preventDefault();
    closeMenu();

    if (isOnSubPage) {
      // If on category/case page, navigate to home page portfolio section
      navigate('/', { replace: true });
      // Wait for navigation to complete, then scroll to portfolio
      setTimeout(() => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          const headerOffset = 80;
          const elementPosition = portfolioSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If on home page, scroll to hero
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    closeMenu();

    if (isOnSubPage) {
      // If on subpage, navigate to home first, then scroll to section
      navigate('/', { replace: true });
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerOffset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If on home page, just scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        const headerOffset = 80;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 lg:h-28 flex items-center justify-between">
          <a href="#" onClick={handleLogoClick} className="cursor-pointer">
            <LogoHover />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-base md:text-lg lg:text-xl xl:text-2xl text-white font-bold">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="relative py-2 transition-colors hover:text-cyan-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.about")}</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="relative py-2 transition-colors hover:text-orange-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full">{t("nav.services")}</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="relative py-2 transition-colors hover:text-pink-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.portfolio")}</a>
            <a href="#contacts" onClick={(e) => handleNavClick(e, 'contacts')} className="relative py-2 transition-colors hover:text-purple-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">{t("nav.contacts")}</a>
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
        <div
          className="flex flex-col h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <nav
            className={`flex flex-col items-center justify-center flex-1 gap-8 text-2xl font-black uppercase tracking-tight transition-all duration-500 ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-10"
            }`}
          >
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="text-white hover:text-orange-500 transition-colors"
            >
              {t("nav.services")}
            </a>
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, 'portfolio')}
              className="text-white hover:text-pink-400 transition-colors"
            >
              {t("nav.portfolio")}
            </a>
            <a
              href="#contacts"
              onClick={(e) => handleNavClick(e, 'contacts')}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {t("nav.contacts")}
            </a>
          </nav>

          {/* Social Media Links */}
          <div className={`pb-8 px-4 transition-all duration-500 delay-100 ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.threads.net/@claro.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all hover:scale-110"
                aria-label="Threads"
              >
                <svg className="w-6 h-6" viewBox="0 0 192 192" fill="currentColor">
                  <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.144-10.459 21.614-10.459h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 7.872 5.885 13.424a70.643 70.643 0 0 0-17.087-2.12c-21.655 0-36.712 11.27-36.712 27.467 0 7.877 3.195 14.85 8.992 19.629 5.593 4.607 13.193 7.147 21.396 7.147 9.513 0 17.644-3.143 23.535-9.107 3.884-3.929 6.647-9.109 8.024-15.024 1.535-6.593 2.291-14.305 2.291-23.401v-3.536c16.054 8.191 23.69 21.093 23.69 39.865 0 11.922-3.537 21.834-10.507 29.488-6.698 7.36-16.24 11.099-28.372 11.099-12.091 0-21.615-3.722-28.31-11.068-6.597-7.237-9.938-17.033-9.938-29.141V96.389h-17v.001c0 15.17 4.37 27.725 12.992 37.301 8.792 9.763 20.891 14.72 35.962 14.72 15.13 0 27.309-4.973 36.2-14.786 8.737-9.639 13.165-22.473 13.165-38.163 0-25.684-11.253-43.308-34.464-53.874Z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/claro.md/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg text-white hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://t.me/Claro_md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all hover:scale-110"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}