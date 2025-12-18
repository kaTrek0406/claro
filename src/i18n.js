import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import ro from "./locales/ro.json";

// Получаем сохраненный язык из localStorage или используем "ru" по умолчанию
const savedLanguage = localStorage.getItem("language") || "ru";

i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, ro: { translation: ro } },
  lng: savedLanguage,
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

// Сохраняем выбранный язык при изменении
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;
