import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

const projectsConfig = [
  {
    id: "nedvizhimost",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/20",
    rotation: "rotate-6",
    icon: "🏠",
    gradient: "from-yellow-600/20 to-cyan-600/20",
    statsColors: ["text-yellow-400", "text-cyan-400", "text-pink-400"],
  },
  {
    id: "medical",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/20",
    rotation: "-rotate-6",
    icon: "⚕️",
    gradient: "from-cyan-600/20 to-pink-600/20",
    statsColors: ["text-cyan-400", "text-pink-400", "text-orange-500"],
  },
  {
    id: "ecommerce",
    color: "text-pink-400",
    bgColor: "bg-pink-400/20",
    rotation: "rotate-6",
    icon: "🛍️",
    gradient: "from-pink-600/20 to-orange-600/20",
    statsColors: ["text-pink-400", "text-orange-500", "text-purple-400"],
  },
  {
    id: "education",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    rotation: "-rotate-6",
    icon: "📚",
    gradient: "from-orange-600/20 to-purple-600/20",
    statsColors: ["text-orange-500", "text-purple-400", "text-yellow-400"],
  },
];

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative">
      <ScrollReveal animation="fade-up" duration={1000}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-black uppercase tracking-tight text-center mb-16 relative max-w-5xl mx-auto">
          {t('portfolio.mainTitle.part1')}{" "}
          <span className="relative inline-flex items-center text-cyan-400">
            {t('portfolio.mainTitle.part2')}
            <span
              className="absolute left-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 text-4xl md:text-5xl lg:text-6xl transition-transform duration-500"
              style={{
                transform: hoveredIndex !== null
                  ? `translateY(-50%) rotate(${hoveredIndex % 2 === 0 ? '-6deg' : '6deg'})`
                  : 'translateY(-50%) rotate(6deg)'
              }}
            >
              🌍
            </span>
          </span>
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Список проектов */}
        <div className="space-y-0 relative z-10">
          {projectsConfig.map((project, idx) => {
            const projectData = t(`portfolio.projects.${project.id}`, { returnObjects: true });
            return (
              <ScrollReveal key={idx} animation="fade-left" duration={800} delay={idx * 100}>
                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate(`/category/${project.id}`)}
                  className="border-b border-white/10 py-6 cursor-pointer group"
                >
                  <div className="flex flex-col gap-4">
                    <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight transition-colors ${
                      hoveredIndex === idx ? project.color : "text-white"
                    }`}>
                      {projectData.name}
                      {hoveredIndex === idx && <span className="ml-3 text-2xl">↗</span>}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {projectData.tags.map((tag, i) => (
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
            );
          })}
        </div>

        {/* Изображение-заглушка справа */}
        <div className="hidden lg:block absolute -right-32 top-1/2 w-[600px] h-[450px] pointer-events-none" style={{ marginTop: '-225px' }}>
          {hoveredIndex !== null && projectsConfig[hoveredIndex] && (() => {
            const project = projectsConfig[hoveredIndex];
            const metrics = t(`portfolio.projects.${project.id}.metrics`, { returnObjects: true });
            return (
              <div
                key={hoveredIndex}
                className={`w-full h-full bg-gradient-to-br ${project.gradient} rounded-3xl border border-white/10 p-10 flex items-center justify-center shadow-2xl ${project.rotation === 'rotate-6' ? 'animate-[fadeInScaleRotate6_0.4s_ease-out_forwards]' : 'animate-[fadeInScaleRotateNeg6_0.4s_ease-out_forwards]'}`}
              >
                <div className="text-center">
                  <div className="text-7xl mb-6 animate-[fadeIn_0.5s_ease-out]">{project.icon}</div>
                  <div className="text-3xl font-black mb-3 animate-[fadeIn_0.6s_ease-out]">{metrics.growth}</div>
                  <div className="text-neutral-300 text-lg mb-8 animate-[fadeIn_0.7s_ease-out]">{metrics.label}</div>
                  <div className="grid grid-cols-3 gap-6 text-center bg-black/30 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out]">
                    {metrics.stats.map((stat, i) => (
                      <div key={i}>
                        <div className={`text-2xl font-black ${project.statsColors[i]}`}>{stat.value}</div>
                        <div className="text-xs text-neutral-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        <style>{`
          @keyframes fadeInScaleRotate6 {
            from {
              opacity: 0;
              transform: scale(0.8) rotate(6deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(6deg);
            }
          }

          @keyframes fadeInScaleRotateNeg6 {
            from {
              opacity: 0;
              transform: scale(0.8) rotate(-6deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotate(-6deg);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
