import { useTranslation } from "react-i18next";

export default function Contacts() {
  const { t } = useTranslation();
  const phoneRaw = "+37379950191";

  return (
    <div className="grid md:grid-cols-12 gap-8">
      <div className="md:col-span-4">
        <h2 className="text-2xl md:text-3xl font-semibold">{t("contacts.title")}</h2>
      </div>

      <div className="md:col-span-8 space-y-3 text-neutral-200">
        <div className="text-lg">
          <a className="underline underline-offset-4" href={`tel:${phoneRaw}`}>
            {t("contacts.phone")}
          </a>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
          <a className="underline underline-offset-4" href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
          <a className="underline underline-offset-4" href={`https://wa.me/${phoneRaw.replace("+", "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="underline underline-offset-4" href={`viber://chat?number=%2B${phoneRaw.replace("+", "")}`}>Viber</a>
        </div>

        <div className="text-sm text-neutral-300">
          Instagram:{" "}
          <a className="underline underline-offset-4" href="https://instagram.com/Claro_md" target="_blank" rel="noreferrer">
            {t("contacts.instagram")}
          </a>
        </div>

        <div className="text-sm text-neutral-300">{t("contacts.address")}</div>
      </div>
    </div>
  );
}
