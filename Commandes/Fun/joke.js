// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Joke Command

const axios = require('axios');

module.exports = {
  name: 'joke',
  category: 'fun',
  desc: 'Sends a random joke',
  async execute(sock, m) {
    const { sendMessage } = sock;
    const { from } = m;

    try {
      const res = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single');
      const joke = res.data?.joke || "I couldn't find a joke, but you're already funny.";

      await sendMessage(from, { text: `😂 *Here's a joke:*\n${joke}` }, { quoted: m });

    } catch (err) {
      await sendMessage(from, { text: '❌ Failed to fetch a joke. Try again later!' }, { quoted: m });
      console.error('Joke Error:', err.message);
    }
  }
};
