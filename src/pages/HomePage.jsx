import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Section from "../components/Section";
import Marquee from "../components/Marquee";
import ServicesAccordion from "../components/ServicesAccordion";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import PriceCalculator from "../components/PriceCalculator";
import ContactForm from "../components/ContactForm";
import ParallaxText from "../components/ParallaxText";
import SocialSection from "../components/SocialSection";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import FloatingBrief from "../components/FloatingBrief";
import ScrollReveal from "../components/ScrollReveal";
import ParallaxShapes from "../components/ParallaxShapes";
import CookieBanner from "../components/CookieBanner";

export default function HomePage() {
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Parallax Background Shapes */}
      <ParallaxShapes />

      <Header />

      <main className="pt-20 sm:pt-24 lg:pt-28 relative z-10 overflow-x-hidden w-full">
        {/* HERO */}
        <section id="hero" className="min-h-[calc(100vh-5rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-7rem)] flex flex-col justify-center px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-black uppercase tracking-tight">
              {t("hero.mainTitle.line1")}{" "}
              <span className="group relative inline-flex items-center text-yellow-400 cursor-default">
                {t("hero.mainTitle.data")}
                <span className="absolute left-[calc(100%+0.25rem)] top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 z-10">
                  <img src={`${import.meta.env.BASE_URL}icons/data.svg`} alt="Data" className="w-full h-full" />
                </span>
              </span>
              ,<br />
              {t("hero.mainTitle.line2")}{" "}
              <span className="group relative inline-flex items-center text-cyan-400 cursor-default">
                {t("hero.mainTitle.algorithms")}
                <span className="absolute left-[calc(100%+0.25rem)] top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 z-10">
                  <img src={`${import.meta.env.BASE_URL}icons/algorithms.svg`} alt="Algorithms" className="w-full h-full" />
                </span>
              </span>
              ,<br />
              {t("hero.mainTitle.line3")}{" "}
              <span className="group relative inline-flex items-center text-pink-400 cursor-default">
                {t("hero.mainTitle.result")}
                <span className="absolute left-[calc(100%+0.25rem)] top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 z-10">
                  <img src={`${import.meta.env.BASE_URL}icons/result.svg`} alt="Result" className="w-full h-full" />
                </span>
              </span>
              ,<br />
              {t("hero.mainTitle.line4")}{" "}
              <span className="group relative inline-flex items-center text-orange-500 cursor-default">
                {t("hero.mainTitle.leads")}
                <span className="absolute left-[calc(100%+0.25rem)] top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300 z-10">
                  <img src={`${import.meta.env.BASE_URL}icons/leads.svg`} alt="Leads" className="w-full h-full" />
                </span>
              </span>
              .
            </h1>
          </div>

          <div className="mt-16 md:mt-24">
            <Marquee text={t("hero.marquee")} />
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left Column - Title */}
            <ScrollReveal animation="fade-right" duration={1000}>
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[0.95] font-black uppercase tracking-tight mb-8">
                  {t("about.mainTitle.part1")}{" "}
                  <span className="text-cyan-400">{t("about.mainTitle.part2")}</span>,{" "}
                  {t("about.mainTitle.part3")}{" "}
                  <span className="text-pink-400">{t("about.mainTitle.part4")}</span>.
                </h2>

                {/* Skills Icons */}
                <div className="flex gap-4">
                {/* Meta (Facebook) */}
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                {/* Google */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                {/* Python */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" fill="white"/>
                  </svg>
                </div>
                {/* React */}
                <div className="w-16 h-16 rounded-full bg-cyan-400 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="#61DAFB" viewBox="0 0 24 24">
                    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9.81 1.5l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47-.54-.03-1.11-.03-1.71-.03-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47z"/>
                  </svg>
                </div>
              </div>
              </div>
            </ScrollReveal>

            {/* Right Column - Content */}
            <ScrollReveal animation="fade-left" duration={1000} delay={200}>
              <div>
              {/* Greeting Animation */}
              <div className="flex items-center gap-4 mb-8">
                {/* Speech Bubble */}
                <div className="relative bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-xl animate-[bounce_2s_ease-in-out_infinite] -rotate-6">
                  {t("about.greeting")}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-purple-600 border-b-[8px] border-b-transparent"></div>
                </div>

                {/* Waving Emoji */}
                <div className="text-6xl animate-[wave_1s_ease-in-out_infinite] rotate-12">
                  👋
                </div>
              </div>

              {/* Team Emojis */}
              <div className="flex gap-4 mb-8">
                <span className="text-5xl">👨‍💻</span>
                <span className="text-5xl">👩‍💼</span>
                <span className="text-5xl">🧑‍🎨</span>
              </div>

              <style>{`
                @keyframes wave {
                  0%, 100% { transform: rotate(0deg); }
                  25% { transform: rotate(20deg); }
                  75% { transform: rotate(-20deg); }
                }
              `}</style>

              <div className="text-neutral-300 leading-relaxed space-y-4 mb-12">
                <p>
                  {t("about.text1")}
                </p>
                <p>
                  {t("about.text2")}
                </p>
                <p>
                  {t("about.text3")}
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 bg-white text-black font-black uppercase tracking-tight rounded-full hover:bg-neutral-200 transition-colors text-lg group"
              >
                {t("about.cta")}
                <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </button>
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* SERVICES */}
        <Section id="services" className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            <ScrollReveal animation="fade-up" duration={1000}>
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl leading-[0.95] font-black uppercase tracking-tight">
                  {t("services.mainTitle.part1")}{" "}
                  <span className="text-orange-500">{t("services.mainTitle.part2")}</span>,{" "}
                  {t("services.mainTitle.part3")}{" "}
                  <span className="text-purple-400">{t("services.mainTitle.part4")}</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" duration={1000} delay={200}>
              <div>
                <ServicesAccordion />
              </div>
            </ScrollReveal>
          </div>
        </Section>

        {/* PORTFOLIO */}
        <Section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6">
          <Portfolio />
        </Section>

        {/* PARALLAX TEXT */}
        <ParallaxText
          text="ТАРГЕТ • РЕЗУЛЬТАТ • РОСТ • ЗАЯВКИ • КОНВЕРСИИ • МЕТРИКИ"
          onServiceClick={handleServiceClick}
        />

        {/* TESTIMONIALS */}
        <Section id="testimonials" className="overflow-x-hidden">
          <Testimonials />
        </Section>

        {/* PRICE CALCULATOR */}
        <Section id="calculator">
          <PriceCalculator />
        </Section>

        {/* FAQ */}
        <Section id="faq">
          <FAQ />
        </Section>

        {/* SOCIAL SECTION */}
        <Section id="social">
          <SocialSection onContactClick={() => setIsFormOpen(true)} />
        </Section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedService("");
        }}
        preselectedService={selectedService}
      />

      {/* Floating Brief Button */}
      <FloatingBrief />

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}
