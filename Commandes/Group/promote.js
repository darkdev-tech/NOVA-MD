// Commandes/group/promote.js

const { cmd } = require("../command");

cmd({
  pattern: "promote",
  desc: "Promote a member to group admin",
  category: "group",
  react: "⬆️",
  filename: __filename
},
async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, mentionByTag, reply }) => {
  if (!isGroup) return reply("❌ This command can only be used in *groups*.");
  if (!isAdmins) return reply("❌ Only *group admins* can use this.");
  if (!isBotAdmins) return reply("❌ I need to be *admin* to promote someone.");
  
  const target = mentionByTag[0];
  if (!target) return reply("⚠️ Tag the user you want to promote.");

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], "promote");
    reply(`✅ Promoted @${target.split("@")[0]} to admin.`, { mentions: [target] });
  } catch (e) {
    console.error("Promote error:", e);
    reply("❌ Failed to promote user.");
  }
});
