// Отправка через Cloudflare Function (безопасно, токен на сервере)
export const sendToTelegram = async (data, source) => {
  try {
    const response = await fetch('/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        source: source
      })
    });

    const result = await response.json();

    if (!result.ok) {
      console.error('Telegram sending error:', result);
      throw new Error(result.error || 'Failed to send message');
    }

    return result;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    throw error;
  }
};
