// Commandes/search/play.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "play",
  alias: ["ytaudio", "ytplay"],
  desc: "Play music from YouTube",
  category: "search",
  filename: __filename,
  use: "<song name>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q) return reply("🎵 Please enter a song name to play.");

  try {
    const res = await axios.get(`https://api.safone.dev/ytplay?query=${encodeURIComponent(q)}`);
    const { title, url, thumbnail, audio } = res.data;

    if (!audio) return reply("❌ Could not fetch audio link.");

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: `🎧 *${title}*\n\n🔗 ${url}\n\n⬇️ Downloading audio...`,
    }, { quoted: mek });

    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to fetch or send audio.");
  }
});
