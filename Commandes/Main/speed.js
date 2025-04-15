// Commandes/main/speed.js

const { cmd } = require("../command");
const { performance } = require("perf_hooks");

cmd({
  pattern: "speed",
  desc: "Check bot response speed",
  category: "main",
  react: "⚡",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const start = performance.now();
  await reply("🕒 Testing speed...");
  const end = performance.now();
  const speed = (end - start).toFixed(3);
  reply(`⚡ *Speed:* _${speed} ms_`);
});
