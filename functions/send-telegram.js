// Cloudflare Pages Function для отправки в Telegram
// Токены хранятся в переменных окружения Cloudflare (безопасно)

export async function onRequestPost(context) {
  try {
    // Получаем данные из запроса
    const data = await context.request.json();

    // Токены из переменных окружения (настраиваются в Cloudflare Dashboard)
    const TELEGRAM_BOT_TOKEN = context.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_IDS_ENV = context.env.TELEGRAM_CHAT_IDS; // Строка с ID через запятую

    // Список получателей из переменных окружения или fallback
    let TELEGRAM_CHAT_IDS = [];

    if (TELEGRAM_CHAT_IDS_ENV) {
      // Если есть в env - используем из env
      TELEGRAM_CHAT_IDS = TELEGRAM_CHAT_IDS_ENV.split(',').map(id => id.trim());
    } else {
      // Fallback если забыли настроить в Cloudflare
      TELEGRAM_CHAT_IDS = [
        '709195195',   // Основной получатель
        '8431791891',  // Дополнительный получатель
        '758348467',   // Дополнительный получатель
        '506221717'    // Дополнительный получатель
      ];
    }

    if (!TELEGRAM_BOT_TOKEN) {
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

    // Отправляем в Telegram на все ID
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const sendResults = [];

    for (const chatId of TELEGRAM_CHAT_IDS) {
      try {
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
          })
        });

        const result = await response.json();
        sendResults.push({ chatId, success: result.ok, result });
      } catch (error) {
        sendResults.push({ chatId, success: false, error: error.message });
      }
    }

    // Отправляем на email через Resend API
    const emailRecipient = (context.env.EMAIL_RECIPIENT || 'vladislav.caireac17@gmail.com').trim();
    const RESEND_API_KEY = context.env.RESEND_API_KEY;
    let emailResult = null;

    if (RESEND_API_KEY) {
      try {
        console.log('📧 Attempting to send email via Resend to:', emailRecipient);

        // Формируем HTML письмо
        const emailHtml = `
          <h2>🔔 Новая заявка с сайта!</h2>
          <p><strong>📍 Источник:</strong> ${source || 'Неизвестно'}</p>
          ${name ? `<p><strong>👤 Имя:</strong> ${name}</p>` : ''}
          ${service ? `<p><strong>🎯 Услуга:</strong> ${service}</p>` : ''}
          ${budget ? `<p><strong>💰 Бюджет:</strong> ${budget}</p>` : ''}
          ${contact ? `<p><strong>📱 Контакт:</strong> ${contact}</p>` : ''}
          ${message ? `<p><strong>💬 Сообщение:</strong> ${message}</p>` : ''}
          <p><strong>⏰ Время:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Chisinau' })}</p>
        `;

        const emailPayload = {
          from: 'Claro Website <onboarding@resend.dev>',
          to: [emailRecipient],
          subject: `Новая заявка с сайта - ${source || 'Контакт'}`,
          html: emailHtml
        };

        console.log('📤 Sending via Resend to:', emailRecipient);

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        const responseData = await emailResponse.json();
        console.log('📬 Resend response:', JSON.stringify(responseData));

        if (emailResponse.ok) {
          console.log('✅ Email sent successfully via Resend!');
          emailResult = {
            success: true,
            status: emailResponse.status,
            recipient: emailRecipient,
            messageId: responseData.id
          };
        } else {
          console.error('❌ Resend error:', responseData);
          emailResult = {
            success: false,
            status: emailResponse.status,
            error: responseData.message || JSON.stringify(responseData),
            recipient: emailRecipient
          };
        }
      } catch (error) {
        console.error('❌ Email sending exception:', error.message);
        console.error('❌ Full error:', error);
        emailResult = {
          success: false,
          error: error.message,
          recipient: emailRecipient
        };
      }
    } else {
      console.log('⚠️ RESEND_API_KEY not configured, skipping email');
      emailResult = {
        success: false,
        error: 'RESEND_API_KEY not configured',
        recipient: emailRecipient
      };
    }

    // Проверяем успешность хотя бы одной отправки в Telegram
    const anyTelegramSuccess = sendResults.some(r => r.success);

    return new Response(JSON.stringify({
      ok: anyTelegramSuccess,
      telegram: sendResults,
      email: emailResult
    }), {
      status: anyTelegramSuccess ? 200 : 500,
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
