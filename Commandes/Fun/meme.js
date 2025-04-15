// Commandes/fun/meme.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "meme",
  desc: "Send a random meme",
  category: "fun",
  react: "😂",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  try {
    const res = await axios.get("https://meme-api.com/gimme");
    const meme = res.data;

    await conn.sendMessage(m.chat, {
      image: { url: meme.url },
      caption: `*${meme.title}*\n\nFrom: _${meme.subreddit}_`
    }, { quoted: mek });

  } catch (e) {
    console.error("Meme fetch error:", e);
    reply("❌ Couldn't fetch meme. Try again later.");
  }
});
