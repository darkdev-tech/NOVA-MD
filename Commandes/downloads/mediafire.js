// Commandes/downlods/mediafire.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");
const { fromBuffer } = require("file-type");

cmd({
  pattern: "mediafire",
  alias: ["mfire"],
  desc: "Download file from Mediafire link",
  category: "downlods",
  filename: __filename,
  use: "<mediafire link>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q || !q.includes("mediafire.com")) {
    return reply("🔗 Please provide a valid Mediafire link.");
  }

  try {
    const res = await axios.get(`https://api.safone.dev/mediafire?url=${encodeURIComponent(q)}`);
    const { name, size, mime, link } = res.data;

    if (!link) return reply("❌ Failed to fetch download link.");

    const file = await axios.get(link, { responseType: "arraybuffer" });
    const fileType = await fromBuffer(file.data);
    const mimetype = fileType?.mime || mime || "application/octet-stream";

    reply(`📦 *File Name:* ${name}\n📁 *Size:* ${size}\n⌛ Sending file...`);

    await conn.sendMessage(m.chat, {
      document: file.data,
      fileName: name,
      mimetype
    }, { quoted: mek });

  } catch (e) {
    console.error(e);
    reply("❌ Error fetching Mediafire file.");
  }
});
