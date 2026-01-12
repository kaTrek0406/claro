import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
            <span className="font-semibold">{t('nav.contacts')}</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] font-black uppercase tracking-tight mb-8">
            {t('privacy.title')}
          </h1>

          {/* Meta info */}
          <div className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-neutral-500 mb-1">{t('privacy.effectiveDate')}</div>
                <div className="font-bold">01.01.2025</div>
              </div>
              <div>
                <div className="text-neutral-500 mb-1">{t('privacy.lastUpdated')}</div>
                <div className="font-bold">01.01.2025</div>
              </div>
              <div>
                <div className="text-neutral-500 mb-1">{t('privacy.website')}</div>
                <div className="font-bold">claro-plus.md</div>
              </div>
            </div>
          </div>

          {/* Intro */}
          <p className="text-lg text-neutral-300 leading-relaxed mb-12">
            {t('privacy.intro')}
          </p>

          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-orange-500">
              {t('privacy.section1.title')}
            </h2>
            <div className="space-y-3 text-neutral-300 leading-relaxed">
              <p className="font-bold text-white">{t('privacy.section1.company')}</p>
              <p>{t('privacy.section1.address')}</p>
              <p>{t('privacy.section1.fiscalCode')}</p>
              <p>{t('privacy.section1.administrator')}</p>
              <p>{t('privacy.section1.phone')}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-cyan-400">
              {t('privacy.section2.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section2.intro')}</p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-white">{t('privacy.section2.voluntary.title')}</h3>
              <ul className="space-y-2">
                {t('privacy.section2.voluntary.items', { returnObjects: true }).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">{t('privacy.section2.technical.title')}</h3>
              <ul className="space-y-2">
                {t('privacy.section2.technical.items', { returnObjects: true }).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-pink-400">
              {t('privacy.section3.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section3.intro')}</p>
            <ul className="space-y-2">
              {t('privacy.section3.items', { returnObjects: true }).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-yellow-400">
              {t('privacy.section4.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section4.intro')}</p>
            <ul className="space-y-2">
              {t('privacy.section4.items', { returnObjects: true }).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-purple-400">
              {t('privacy.section5.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section5.intro')}</p>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">{t('privacy.section5.essential.title')}</h3>
                <p className="text-neutral-300">{t('privacy.section5.essential.text')}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">{t('privacy.section5.analytics.title')}</h3>
                <p className="text-neutral-300 mb-3">{t('privacy.section5.analytics.intro')}</p>
                <ul className="space-y-2">
                  {t('privacy.section5.analytics.items', { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold mb-3 text-white">{t('privacy.section5.advertising.title')}</h3>
                <p className="text-neutral-300 mb-3">{t('privacy.section5.advertising.intro')}</p>
                <ul className="space-y-2 mb-4">
                  {t('privacy.section5.advertising.items', { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-neutral-300">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-orange-400 font-semibold">{t('privacy.section5.advertising.important')}</p>
              </div>

              <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                <h3 className="text-xl font-bold mb-3 text-purple-400">{t('privacy.section5.management.title')}</h3>
                <p className="text-neutral-300">{t('privacy.section5.management.text')}</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-orange-500">
              {t('privacy.section6.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section6.intro')}</p>
            <ul className="space-y-2">
              {t('privacy.section6.items', { returnObjects: true }).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-cyan-400">
              {t('privacy.section7.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed">{t('privacy.section7.text')}</p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-pink-400">
              {t('privacy.section8.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section8.intro')}</p>
            <ul className="space-y-2">
              {t('privacy.section8.items', { returnObjects: true }).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-pink-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-yellow-400">
              {t('privacy.section9.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed">{t('privacy.section9.text')}</p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-purple-400">
              {t('privacy.section10.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-6">{t('privacy.section10.intro')}</p>
            <ul className="space-y-2 mb-6">
              {t('privacy.section10.items', { returnObjects: true }).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-neutral-300 mb-2">{t('privacy.section10.contact')} <a href="mailto:contact@claro-plus.md" className="text-purple-400 hover:underline">contact@claro-plus.md</a></p>
            <p className="text-neutral-400 text-sm">{t('privacy.section10.verification')}</p>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-orange-500">
              {t('privacy.section11.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed">{t('privacy.section11.text')}</p>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 text-cyan-400">
              {t('privacy.section12.title')}
            </h2>
            <p className="text-neutral-300 leading-relaxed">{t('privacy.section12.text')}</p>
          </section>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-center">
            <p className="text-lg text-neutral-300 mb-6">
              {t('privacy.section10.contact')} <a href="mailto:contact@claro-plus.md" className="text-orange-500 hover:underline font-bold">contact@claro-plus.md</a>
            </p>
            <a
              href="tel:+37379950191"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black uppercase tracking-tight rounded-full hover:scale-105 transition-all shadow-lg"
            >
              {t('footer.callUs')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
