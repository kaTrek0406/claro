import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// Данные по категориям и клиентам
const categories = {
  "nedvizhimost": {
    id: "nedvizhimost",
    name: "Недвижимость",
    icon: "🏠",
    description: "Помогаем агентствам недвижимости и застройщикам привлекать покупателей через digital-каналы",
    color: "yellow",
    clients: [
      {
        id: "premium-estate",
        name: "Premium Estate",
        logo: "🏢",
        description: "Агентство недвижимости премиум-класса",
        result: "+245% заявок",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
      },
      {
        id: "city-realty",
        name: "City Realty",
        logo: "🏘️",
        description: "Продажа квартир в новостройках",
        result: "+180% продаж",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80",
      },
      {
        id: "smart-homes",
        name: "Smart Homes",
        logo: "🏡",
        description: "Загородная недвижимость",
        result: "+320% обращений",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
      },
    ]
  },
  "medical": {
    id: "medical",
    name: "Медицина",
    icon: "⚕️",
    description: "Digital-решения для клиник, медицинских центров и частных практик",
    color: "cyan",
    clients: [
      {
        id: "zdorovie-plus",
        name: "Здоровье+",
        logo: "🏥",
        description: "Многопрофильная клиника",
        result: "+180% записей",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
      },
      {
        id: "dental-clinic",
        name: "Стоматология SmilePro",
        logo: "🦷",
        description: "Стоматологическая клиника",
        result: "+220% пациентов",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
      },
    ]
  },
  "ecommerce": {
    id: "ecommerce",
    name: "E-commerce",
    icon: "🛍️",
    description: "Автоматизация и рост продаж для интернет-магазинов",
    color: "pink",
    clients: [
      {
        id: "gadget-store",
        name: "Gadget Store",
        logo: "📱",
        description: "Интернет-магазин электроники",
        result: "+320% продаж",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80",
      },
      {
        id: "fashion-shop",
        name: "Fashion Boutique",
        logo: "👗",
        description: "Магазин одежды онлайн",
        result: "+265% заказов",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
      },
    ]
  },
  "education": {
    id: "education",
    name: "Образование",
    icon: "📚",
    description: "SMM и таргет для образовательных центров и онлайн-школ",
    color: "orange",
    clients: [
      {
        id: "speakup",
        name: "SpeakUp",
        logo: "🗣️",
        description: "Школа английского языка",
        result: "+195% студентов",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
      },
      {
        id: "coding-academy",
        name: "Coding Academy",
        logo: "💻",
        description: "Школа программирования",
        result: "+280% учеников",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
      },
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
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const category = categories[categoryId];

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Категория не найдена</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const colors = colorVariants[category.color];

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
            <span className="font-semibold">На главную</span>
          </button>
          <div className="text-4xl">{category.icon}</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-bounce-slow">{category.icon}</div>
            <h1 className="text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] leading-[0.95] font-black uppercase tracking-tight mb-6">
              <span className={colors.text}>{category.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-400 max-w-3xl mx-auto">
              {category.description}
            </p>
          </div>

          {/* Stats */}
          <div className={`max-w-4xl mx-auto p-8 rounded-3xl border-2 ${colors.border} ${colors.bg} backdrop-blur-sm mb-16`}>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className={`text-4xl font-black ${colors.text} mb-2`}>{category.clients.length}</div>
                <div className="text-neutral-400 text-sm">Клиентов</div>
              </div>
              <div>
                <div className={`text-4xl font-black ${colors.text} mb-2`}>100%</div>
                <div className="text-neutral-400 text-sm">Довольны</div>
              </div>
              <div>
                <div className={`text-4xl font-black ${colors.text} mb-2`}>+250%</div>
                <div className="text-neutral-400 text-sm">Средний рост</div>
              </div>
            </div>
          </div>

          {/* Clients Grid */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 text-center">
              Наши клиенты
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.clients.map((client, idx) => (
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
                      alt={client.name}
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
                        <div className="font-bold">Смотреть кейс</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 transition-colors duration-300 ${
                      hoveredIndex === idx ? colors.text : "text-white"
                    }`}>
                      {client.name}
                      {hoveredIndex === idx && <span className="ml-2 inline-block animate-pulse">→</span>}
                    </h3>
                    <p className="text-neutral-400 text-sm mb-4 group-hover:text-neutral-300 transition-colors duration-300">{client.description}</p>
                    <div className={`inline-block px-4 py-2 rounded-full bg-black border-2 ${colors.text.replace('text-', 'border-')} group-hover:scale-110 transition-transform duration-300`}>
                      <span className={`font-black ${colors.text}`}>{client.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black uppercase mb-6">
            Хотите такие же результаты?
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Расскажем, как мы это сделали и поможем вашему бизнесу
          </p>
          <button
            onClick={() => navigate('/')}
            className={`px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black uppercase tracking-tight rounded-full hover:scale-105 transition-all shadow-lg`}
          >
            Обсудить проект
          </button>
        </div>
      </section>
    </div>
  );
}
