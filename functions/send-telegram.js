// Cloudflare Pages Function для отправки в Telegram
// Токены хранятся в переменных окружения Cloudflare (безопасно)

export async function onRequestPost(context) {
  try {
    // Получаем данные из запроса
    const data = await context.request.json();

    // Токены из переменных окружения (настраиваются в Cloudflare Dashboard)
    const TELEGRAM_BOT_TOKEN = context.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = context.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Telegram credentials not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, service, budget, contact, message, source } = data;

    // Формируем сообщение
    let text = `🔔 *Новая заявка с сайта!*\n\n`;
    text += `📍 *Источник:* ${source || 'Неизвестно'}\n\n`;

    if (name) text += `👤 *Имя:* ${name}\n`;
    if (service) text += `🎯 *Услуга:* ${service}\n`;
    if (budget) text += `💰 *Бюджет:* ${budget}\n`;
    if (contact) text += `📱 *Контакт:* ${contact}\n`;
    if (message) text += `💬 *Сообщение:* ${message}\n`;

    text += `\n⏰ *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Chisinau' })}`;

    // Отправляем в Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description || 'Telegram API error');
    }

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      ok: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
