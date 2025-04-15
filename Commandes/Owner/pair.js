// Commandes/owner/pair.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "pair",
  desc: "Trigger WhatsApp pairing (terminal QR)",
  category: "owner",
  filename: __filename
},
async (conn, mek, m, { reply, isOwner }) => {
  if (!isOwner) return reply("❌ Only the bot owner can use this command.");

  reply("⏳ Generating QR code... Please check your terminal to scan the QR and pair your device.");

  try {
    await conn.logout(); // Force re-auth if needed
  } catch (e) {
    console.log("No previous session to logout.");
  }

  process.send("reset-session"); // Signal to regenerate QR (handled in main process)
});
