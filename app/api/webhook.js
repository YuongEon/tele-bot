// pages/api/webhook.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Kiểm tra nếu có tin nhắn
      if (data.message) {
        const chatId = data.message.chat.id;
        const messageText = data.message.text;

        // Xử lý tin nhắn (ví dụ: gửi tin nhắn phản hồi)
        if (messageText === '/start') {
          await sendMessage(chatId, 'App is running!');
        }
      }

      res.status(200).json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function sendMessage(chatId, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN; // Lấy token từ environment variables
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });
}
