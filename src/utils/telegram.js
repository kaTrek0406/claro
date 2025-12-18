const TELEGRAM_BOT_TOKEN = "8527435735:AAFNRFeRJUzcR7Wk3FEhumzdJGw1bCg6vzo";
const TELEGRAM_CHAT_ID = "709195195";

export const sendToTelegram = async (data, source) => {
  const { name, service, budget, contact, message } = data;

  let text = `🔔 *Новая заявка с сайта!*\n\n`;
  text += `📍 *Источник:* ${source}\n\n`;

  if (name) text += `👤 *Имя:* ${name}\n`;
  if (service) text += `🎯 *Услуга:* ${service}\n`;
  if (budget) text += `💰 *Бюджет:* ${budget}\n`;
  if (contact) text += `📱 *Контакт:* ${contact}\n`;
  if (message) text += `💬 *Сообщение:* ${message}\n`;

  text += `\n⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Chisinau' })}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "Markdown"
      })
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      throw new Error(result.description || "Failed to send message");
    }

    return result;
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    throw error;
  }
};
