// Commandes/group/groupopen.js

const { cmd } = require("../command");

cmd({
  pattern: "group(open|close)",
  alias: ["gcopen", "gcclose", "gropen", "grclose"],
  desc: "Open or close the group for messages",
  category: "group",
  react: "🔐",
  filename: __filename
},
async (conn, mek, m, { inputCmd, isGroup, isAdmins, isBotAdmins, reply }) => {
  if (!isGroup) return reply("❌ This command is for *groups* only.");
  if (!isAdmins) return reply("❌ Only *group admins* can use this.");
  if (!isBotAdmins) return reply("❌ I need to be *admin* to manage group settings.");

  const action = inputCmd.includes("open") ? "not_announcement" : "announcement";

  try {
    await conn.groupSettingUpdate(m.chat, action);
    reply(`✅ Group has been *${action === "announcement" ? "closed" : "opened"}*.`);
  } catch (e) {
    console.error("Group setting error:", e);
    reply("❌ Failed to update group settings.");
  }
});
