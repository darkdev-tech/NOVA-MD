// Commandes/main/info.js

const os = require("os");
const { cmd } = require("../command");
const { runtime } = require("../lib/functions");

cmd({
  pattern: "info",
  alias: ["botinfo", "about"],
  desc: "Show bot information",
  category: "main",
  react: "ℹ️",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const platform = "Heroku Platform";
    const cpuModel = os.cpus()[0].model;
    const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
    const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
    const uptime = runtime(process.uptime());

    const info = `╭───❰ *NOVA-MD INFO* ❱───╮
┃ 🤖 *Bot Name* : NOVA-MD
┃ 👤 *Owner* : ᴄᴏᴏʟᴋɪᴅ ᴛᴇᴄʜ
┃ ⏱️ *Uptime* : ${uptime}
┃ 💾 *RAM* : ${usedMem}MB / ${totalMem}MB
┃ 🧠 *CPU* : ${cpuModel}
┃ 🌐 *Platform* : ${platform}
┃ 🧬 *Version* : 1.0.0
╰───❰ Clone if you can 🙂 ❱───╯`;

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/nk71o3.jpg" }, // Custom image
      caption: info
    }, { quoted: mek });

  } catch (e) {
    console.error("Error in info command:", e);
    reply(`❌ Error: ${e.message}`);
  }
});
