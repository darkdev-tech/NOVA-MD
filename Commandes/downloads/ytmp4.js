// Commandes/downlods/ytmp4.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "ytmp4",
  alias: ["yta", "ytvideo"],
  desc: "Download YouTube video as MP4",
  category: "downlods",
  filename: __filename,
  use: "<youtube link>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q || !q.includes("youtube.com") && !q.includes("youtu.be")) {
    return reply("🔗 Please provide a valid YouTube link.");
  }

  try {
    const res = await axios.get(`https://api.safone.dev/ytmp4?url=${encodeURIComponent(q)}`);
    const { title, video_url, size } = res.data;

    if (!video_url) return reply("❌ Failed to fetch video.");

    await conn.sendMessage(m.chat, {
      video: { url: video_url },
      caption: `🎬 *${title}*\n📁 *Size:* ${size}`
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Error downloading YouTube video.");
  }
});
