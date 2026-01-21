import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

const projectColors = [
  { color: "text-yellow-400", bgColor: "bg-yellow-400/20" },
  { color: "text-cyan-400", bgColor: "bg-cyan-400/20" },
  { color: "text-pink-400", bgColor: "bg-pink-400/20" },
  { color: "text-orange-500", bgColor: "bg-orange-500/20" },
  { color: "text-yellow-400", bgColor: "bg-yellow-400/20" },
  { color: "text-purple-400", bgColor: "bg-purple-400/20" },
  { color: "text-yellow-400", bgColor: "bg-yellow-400/20" },
  { color: "text-cyan-400", bgColor: "bg-cyan-400/20" },
  { color: "text-pink-400", bgColor: "bg-pink-400/20" },
];

export default function Portfolio() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSideIndex, setHoveredSideIndex] = useState(null);
  const [showFirstFour, setShowFirstFour] = useState(true);
  const [clickedMobileIndex, setClickedMobileIndex] = useState(null);
  const navigate = useNavigate();

  const allProjects = t('portfolio.projects', { returnObjects: true }).map((project, index) => ({
    ...project,
    ...projectColors[index]
  }));

  const projects = allProjects.slice(0, 5);
  const sideProjects = allProjects.slice(5);

  return (
    <div className="relative">
      <ScrollReveal animation="fade-up" duration={1000}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold uppercase tracking-tight text-center mb-16 relative max-w-5xl mx-auto px-4">
          <span className="block md:inline">
            {t('portfolio.heroTitle')}{" "}
          </span>
          <span className="relative inline-block text-cyan-400">
            {t('portfolio.heroTitleHighlight')}
            {/* Эмодзи absolute на десктопе */}
            <span
              className="hidden md:inline-block absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 text-4xl md:text-5xl lg:text-6xl transition-transform duration-500"
              style={{
                transform: hoveredIndex !== null
                  ? `translateY(-50%) rotate(${hoveredIndex % 2 === 0 ? '-6deg' : '6deg'})`
                  : 'translateY(-50%) rotate(6deg)'
              }}
            >
              🌍
            </span>
          </span>
          {/* Эмодзи inline на мобильных - отдельной строкой для центрирования */}
          <span className="block md:hidden mt-2 text-4xl">
            🌍
          </span>
        </h2>
      </ScrollReveal>

      {/* Desktop: Grid layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-start">
            {/* Левая колонка */}
            <div className="w-[420px] ml-12 lg:ml-16 xl:ml-20 space-y-8">
              {projects.map((project, idx) => (
                <ScrollReveal key={idx} animation="fade-left" duration={800} delay={idx * 100}>
                  <div
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => navigate(`/category/${project.id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="flex flex-col gap-4">
                      <h3 className={`text-2xl md:text-4xl font-bold uppercase tracking-tight transition-colors ${
                        hoveredIndex === idx ? project.color : "text-white"
                      }`}>
                        {project.name}
                        {hoveredIndex === idx && <span className="ml-3 text-2xl">↗</span>}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              i === 0 ? `${project.bgColor} ${project.color}` : "bg-white/10 text-neutral-300"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Правая колонка */}
            <div className="w-[420px] space-y-8">
              {sideProjects.map((project, idx) => (
                <ScrollReveal key={idx} animation="fade-right" duration={800} delay={idx * 100}>
                  <div
                    onMouseEnter={() => setHoveredSideIndex(idx)}
                    onMouseLeave={() => setHoveredSideIndex(null)}
                    onClick={() => navigate(`/category/${project.id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="flex flex-col gap-4">
                      <h3 className={`text-2xl md:text-4xl font-bold uppercase tracking-tight transition-colors ${
                        hoveredSideIndex === idx ? project.color : "text-white"
                      }`}>
                        {project.name}
                        {hoveredSideIndex === idx && <span className="ml-3 text-2xl">↗</span>}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              i === 0 ? `${project.bgColor} ${project.color}` : "bg-white/10 text-neutral-300"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Grid with toggle */}
      <div className="lg:hidden px-4">
        <div className="grid grid-cols-1 gap-6">
          {(showFirstFour ? projects : sideProjects).map((project, idx) => (
            <div
              key={idx}
              onClick={() => {
                setClickedMobileIndex(idx);
                setTimeout(() => {
                  navigate(`/category/${project.id}`);
                }, 200);
              }}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <h3 className={`text-2xl font-bold uppercase tracking-tight transition-colors duration-200 ${
                  clickedMobileIndex === idx ? project.color : "text-white"
                }`}>
                  {project.name}
                  {clickedMobileIndex === idx && <span className="ml-3 text-2xl">↗</span>}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        i === 0 ? `${project.bgColor} ${project.color}` : "bg-white/10 text-neutral-300"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Стрелка переключения */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowFirstFour(!showFirstFour)}
            className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
          >
            <svg
              className={`w-6 h-6 text-white transition-transform duration-300 ${showFirstFour ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
