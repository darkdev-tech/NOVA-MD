// Commandes/tool/sticker.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "sticker",
  alias: ["s", "stik", "stikerr"],
  desc: "Convert image or short video to sticker",
  category: "tool",
  filename: __filename,
  use: "(reply to image/video)"
},
async (conn, mek, m, { quoted, mime, reply }) => {
  try {
    if (!quoted) return reply("🖼️ Reply to an image or short video to convert to sticker.");
    if (!/image|video/.test(mime)) return reply("❌ File type must be image or video.");

    const media = await quoted.download();

    await conn.sendMessage(m.chat, {
      sticker: media
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to create sticker.");
  }
});
