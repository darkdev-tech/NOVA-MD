// Commandes/downlods/ytmp3.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "ytmp3",
  alias: ["ytaudio", "yta"],
  desc: "Download YouTube video as MP3 audio",
  category: "downlods",
  filename: __filename,
  use: "<youtube link>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q || (!q.includes("youtube.com") && !q.includes("youtu.be"))) {
    return reply("🔗 Please provide a valid YouTube link.");
  }

  try {
    const res = await axios.get(`https://api.safone.dev/ytmp3?url=${encodeURIComponent(q)}`);
    const { title, audio_url, size } = res.data;

    if (!audio_url) return reply("❌ Failed to fetch audio.");

    await conn.sendMessage(m.chat, {
      audio: { url: audio_url },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      ptt: false
    }, { quoted: mek });

    reply(`🎵 *${title}*\n📁 *Size:* ${size}`);

  } catch (e) {
    console.error(e);
    reply("❌ Error downloading YouTube audio.");
  }
});
