// Commandes/group/kick.js

const { cmd } = require("../command");

cmd({
  pattern: "kick",
  desc: "Remove a member from the group",
  category: "group",
  filename: __filename,
  react: "👢"
},
async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, mentionByTag, reply }) => {
  if (!isGroup) return reply("❌ This command is for *groups* only.");
  if (!isAdmins) return reply("❌ Only *group admins* can use this command.");
  if (!isBotAdmins) return reply("❌ I need to be *admin* to kick someone.");

  const target = mentionByTag[0];
  if (!target) return reply("⚠️ Tag the user you want to kick.");

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], "remove");
    reply("✅ User kicked.");
  } catch (e) {
    console.error("Kick error:", e);
    reply("❌ Failed to kick user.");
  }
});
