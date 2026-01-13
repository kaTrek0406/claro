import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  const phoneRaw = "+37379950191";
  const telegramLink = "https://t.me/";
  const addressLink = "https://www.google.com/maps/search/?api=1&query=Valea+Trandafirilor+20%2C+Chisinau%2C+Moldova";

  return (
    <footer id="contacts" className="bg-orange-500 text-black py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3">
          {/* Контакт */}
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight">
              {t('footer.contact')}
            </h2>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <a href={`tel:${phoneRaw}`} className="text-xs md:text-sm font-bold hover:underline">
                  +373 79 950 191
                </a>
                <span className="text-black/40">•</span>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs md:text-sm font-bold hover:underline"
                >
                  @claro_plus
                </a>
              </div>

              <a
                href={addressLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs md:text-sm font-semibold hover:underline block"
              >
                Valea Trandafirilor 20, Кишинев, Молдова
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t-2 border-black/20 pt-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-bold">
              {t('footer.copyright')}
            </p>
            <span className="text-black/40">•</span>
            <Link to="/privacy-policy" className="text-xs hover:underline font-bold">
              {t('footer.privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


