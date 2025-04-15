// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Meme Command

const axios = require('axios');

module.exports = {
  name: 'meme',
  category: 'fun',
  desc: 'Sends a random meme',
  async execute(sock, m) {
    const { sendMessage } = sock;
    const { from } = m;

    try {
      const res = await axios.get('https://meme-api.com/gimme');
      const { title, url, postLink, subreddit } = res.data;

      await sendMessage(from, {
        image: { url },
        caption: `*${title}*\n🔗 ${postLink}\n📷 From r/${subreddit}`
      }, { quoted: m });

    } catch (err) {
      await sendMessage(from, { text: '❌ Failed to fetch a meme. Try again later!' }, { quoted: m });
      console.error('Meme Error:', err.message);
    }
  }
};
