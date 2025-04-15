// Commandes/group/add.js

const { cmd } = require("../command");

cmd({
  pattern: "add",
  desc: "Add a member to the group",
  category: "group",
  react: "➕",
  filename: __filename
},
async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, args, reply }) => {
  if (!isGroup) return reply("❌ This command can only be used in *groups*.");
  if (!isAdmins) return reply("❌ Only *group admins* can use this.");
  if (!isBotAdmins) return reply("❌ I need to be *admin* to add members.");
  if (!args[0]) return reply("⚠️ Please provide a number to add. Example: `.add 254107065646`");

  const number = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

  try {
    await conn.groupParticipantsUpdate(m.chat, [number], "add");
    reply(`✅ Successfully added @${number.split("@")[0]}`, { mentions: [number] });
  } catch (e) {
    console.error("Add error:", e);
    reply("❌ Couldn't add the user. They may have left recently, privacy settings may block it, or the number is incorrect.");
  }
});
