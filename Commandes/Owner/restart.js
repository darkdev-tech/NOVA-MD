// Commandes/owner/restart.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "restart",
  desc: "Restart the bot",
  category: "owner",
  filename: __filename
},
async (conn, mek, m, { reply, isOwner }) => {
  if (!isOwner) return reply("❌ Only the bot owner can use this command.");

  reply("♻️ Restarting bot, please wait...");

  await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for reply to go out
  process.exit(0); // Exit process, use PM2/Heroku/etc to auto-restart
});
