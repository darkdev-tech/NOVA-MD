// Commandes/group/demote.js

const { cmd } = require("../command");

cmd({
  pattern: "demote",
  desc: "Demote a group admin",
  category: "group",
  filename: __filename,
  react: "⬇️"
},
async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, mentionByTag, reply }) => {
  if (!isGroup) return reply("❌ This command is for *groups* only.");
  if (!isAdmins) return reply("❌ Only *group admins* can use this command.");
  if (!isBotAdmins) return reply("❌ I need to be *admin* to demote someone.");

  const target = mentionByTag[0];
  if (!target) return reply("⚠️ Please tag the admin you want to demote.");

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], "demote");
    reply("✅ User has been demoted.");
  } catch (e) {
    console.error("Demote error:", e);
    reply("❌ Failed to demote the user.");
  }
});
