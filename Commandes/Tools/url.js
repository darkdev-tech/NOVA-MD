// Commandes/tool/url.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");
const FormData = require("form-data");

cmd({
  pattern: "url",
  alias: ["imgurl", "geturl"],
  desc: "Get public URL of an image",
  category: "tool",
  filename: __filename,
  use: "(reply to image)"
},
async (conn, mek, m, { quoted, mime, reply }) => {
  try {
    if (!quoted || !/image/.test(mime)) {
      return reply("🖼️ Please reply to an image to get its URL.");
    }

    const media = await quoted.download();
    const form = new FormData();
    form.append("file", media, "image.jpg");

    const res = await axios.post("https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY", form, {
      headers: form.getHeaders(),
    });

    const imageUrl = res.data?.data?.url;
    if (!imageUrl) return reply("❌ Failed to get URL.");

    reply(`🌐 *Image URL:*\n${imageUrl}`);
  } catch (e) {
    console.error(e);
    reply("❌ Error uploading image.");
  }
});
