// Commandes/owner/broadcast.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "broadcast",
  alias: ["bc"],
  desc: "Broadcast message to all chats",
  category: "owner",
  filename: __filename,
  use: "<text>"
},
async (conn, mek, m, { reply, q, isOwner }) => {
  if (!isOwner) return reply("❌ Only the bot owner can use this command.");
  if (!q) return reply("Please provide a message to broadcast.");

  const chats = await conn.groupFetchAllParticipating();
  const groupIds = Object.keys(chats);

  reply(`📢 Broadcasting message to *${groupIds.length}* groups...`);

  for (const id of groupIds) {
    await conn.sendMessage(id, {
      text: `📢 *Broadcast Message:*\n\n${q}`
    });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Avoid rate limit
  }

  reply("✅ Broadcast completed!");
});
