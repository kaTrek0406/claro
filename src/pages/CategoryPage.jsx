import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Данные по категориям (статические: иконки, цвета, изображения, лого)
const categoriesData = {
  "travel-agency": {
    id: "travel-agency",
    icon: "✈️",
    color: "yellow",
    clients: [
      {
        id: "vivatour",
        logo: "✈️",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
      }
    ]
  },
  "beauty-sphere": {
    id: "beauty-sphere",
    icon: "💅",
    color: "cyan",
    clients: [
      {
        id: "kerashop",
        logo: "💅",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
      }
    ]
  },
  "carsharing": {
    id: "carsharing",
    icon: "🚗",
    color: "pink",
    clients: [
      {
        id: "getmancar",
        logo: "🚗",
        image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
      }
    ]
  },
  "gift": {
    id: "gift",
    icon: "🎁",
    color: "orange",
    clients: [
      {
        id: "ritzygift",
        logo: "🎁",
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"
      }
    ]
  },
  "pharma": {
    id: "pharma",
    icon: "💊",
    color: "purple",
    clients: [
      {
        id: "heel",
        logo: "💊",
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80"
      }
    ]
  },
  "interior-design": {
    id: "interior-design",
    icon: "🏠",
    color: "yellow",
    clients: [
      {
        id: "cdihome",
        logo: "🏠",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
      }
    ]
  },
  "beauty-salon": {
    id: "beauty-salon",
    icon: "💇",
    color: "yellow",
    clients: [
      {
        id: "epilbar",
        logo: "💇",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
      }
    ]
  },
  "realtors": {
    id: "realtors",
    icon: "🏡",
    color: "cyan",
    clients: [
      {
        id: "connectimobil",
        logo: "🏡",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
      }
    ]
  },
  "developers": {
    id: "developers",
    icon: "🏗️",
    color: "pink",
    clients: [
      {
        id: "colinaverde",
        logo: "🏗️",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
      }
    ]
  },
};

const colorVariants = {
  yellow: {
    text: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
    hoverBorder: "hover:border-yellow-400",
    gradient: "from-yellow-600/20 to-orange-600/20",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    hoverBorder: "hover:border-cyan-400",
    gradient: "from-cyan-600/20 to-pink-600/20",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/30",
    hoverBorder: "hover:border-pink-400",
    gradient: "from-pink-600/20 to-purple-600/20",
  },
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    hoverBorder: "hover:border-orange-500",
    gradient: "from-orange-600/20 to-yellow-600/20",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    hoverBorder: "hover:border-purple-400",
    gradient: "from-purple-600/20 to-pink-600/20",
  },
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const category = categoriesData[categoryId];

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('categoryPage.notFound')}</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600"
          >
            {t('categoryPage.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const colors = colorVariants[category.color];
  const categoryName = t(`categoryPage.categories.${categoryId}.name`);
  const categoryDescription = t(`categoryPage.categories.${categoryId}.description`);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">{t('categoryPage.toHome')}</span>
          </button>
          <div className="text-4xl">{category.icon}</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-bounce-slow">{category.icon}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold uppercase tracking-tight mb-6">
              <span className={colors.text}>{categoryName}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-400 max-w-3xl mx-auto">
              {categoryDescription}
            </p>
          </div>

          {/* Stats */}
          <div className={`max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 ${colors.border} ${colors.bg} backdrop-blur-sm mb-16`}>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center">
              <div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text} mb-1 sm:mb-2`}>{category.clients.length}</div>
                <div className="text-neutral-400 text-xs sm:text-sm leading-tight">{t('categoryPage.stats.clients')}</div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text} mb-1 sm:mb-2`}>100%</div>
                <div className="text-neutral-400 text-xs sm:text-sm leading-tight">{t('categoryPage.stats.satisfied')}</div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${colors.text} mb-1 sm:mb-2`}>+250%</div>
                <div className="text-neutral-400 text-xs sm:text-sm leading-tight">{t('categoryPage.stats.growth')}</div>
              </div>
            </div>
          </div>

          {/* Clients Grid */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8 text-center">
              {t('categoryPage.ourClients')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.clients.map((client, idx) => {
                const clientName = t(`categoryPage.categories.${categoryId}.clients.${client.id}.name`);
                const clientDescription = t(`categoryPage.categories.${categoryId}.clients.${client.id}.description`);
                const clientSolution = t(`categoryPage.categories.${categoryId}.clients.${client.id}.solution`);

                return (
                  <div
                    key={idx}
                    onClick={() => navigate(`/case/${categoryId}/${client.id}`)}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group cursor-pointer rounded-3xl overflow-hidden border-2 ${colors.border} ${colors.hoverBorder} bg-black transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2`}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={client.image}
                        alt={clientName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${colors.gradient} opacity-60 group-hover:opacity-40 transition-opacity`}></div>

                      {/* Logo */}
                      <div className="absolute top-4 left-4">
                        <div className="text-5xl drop-shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">{client.logo}</div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center transform group-hover:scale-110 transition-transform duration-500">
                          <div className="text-4xl mb-2 animate-pulse">👁️</div>
                          <div className="font-bold">{t('categoryPage.viewCase')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`text-2xl font-bold uppercase tracking-tight mb-2 transition-colors duration-300 ${
                        hoveredIndex === idx ? colors.text : "text-white"
                      }`}>
                        {clientName}
                        {hoveredIndex === idx && <span className="ml-2 inline-block animate-pulse">→</span>}
                      </h3>
                      <p className="text-neutral-400 text-sm mb-4 group-hover:text-neutral-300 transition-colors duration-300 font-normal">{clientDescription}</p>
                      <div className={`p-4 rounded-xl bg-black border-2 ${colors.border} group-hover:border-opacity-100 transition-all duration-300`}>
                        <div className="text-neutral-500 text-xs font-bold mb-2 uppercase">{t('categoryPage.solutionLabel')}</div>
                        <p className={`text-sm leading-relaxed font-normal ${colors.text}`}>{clientSolution}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold uppercase mb-6">
            {t('categoryPage.cta.title')}
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            {t('categoryPage.cta.description')}
          </p>
          <button
            onClick={() => {
              window.dispatchEvent(new Event('openBriefForm'));
            }}
            className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold uppercase tracking-tight rounded-full hover:scale-105 transition-all shadow-lg`}
          >
            {t('categoryPage.cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
}
