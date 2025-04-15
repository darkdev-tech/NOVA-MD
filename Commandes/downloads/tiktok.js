// Commandes/downlods/tiktok.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "tiktok",
  alias: ["tt", "tiktokdl"],
  desc: "Download TikTok video without watermark",
  category: "downlods",
  filename: __filename,
  use: "<tiktok link>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q || !q.includes("tiktok.com")) {
    return reply("🔗 Please provide a valid TikTok video link.");
  }

  try {
    const res = await axios.get(`https://api.safone.dev/tiktok?url=${encodeURIComponent(q)}`);
    const { video, author, title } = res.data;

    if (!video) return reply("❌ Failed to fetch TikTok video.");

    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption: `🎬 *${title}*\n👤 *By:* ${author}`
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Error downloading TikTok video.");
  }
});
