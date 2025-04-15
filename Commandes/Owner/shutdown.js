// Commandes/owner/shutdown.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "shutdown",
  desc: "Shutdown the bot",
  category: "owner",
  filename: __filename
},
async (conn, mek, m, { reply, isOwner }) => {
  if (!isOwner) return reply("❌ Only the bot owner can use this command.");

  reply("⚠️ Shutting down the bot...");

  await new Promise(resolve => setTimeout(resolve, 1000)); // Short delay for response
  process.exit(1); // Clean shutdown
});
