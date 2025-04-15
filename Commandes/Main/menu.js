// Commandes/main/menu.js
// Created by cool kid tech — do not modify this file

const { cmd, commands } = require("../command");
const pkg = require("../../package.json");

cmd({
  pattern: "menu",
  alias: ["help", "commands", "cmds"],
  desc: "Show all available commands",
  category: "main",
  filename: __filename
},
async (conn, mek, m, { pushname, prefix, reply }) => {
  try {
    const grouped = {};

    for (let command of commands) {
      const cat = command.category || "other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(`${prefix}${command.pattern}`);
    }

    let menuText = `*╭───❰ NOVA-MD MENU ❱───⊷*\n│\n`;
    menuText += `│ *User:* ${pushname || "Guest"}\n`;
    menuText += `│ *Commands:* ${commands.length}\n`;
    menuText += `│ *Version:* ${pkg.version}\n│\n`;

    for (let category in grouped) {
      menuText += `│──『 ${category.toUpperCase()} 』\n`;
      grouped[category].forEach(cmd => {
        menuText += `│ • ${cmd}\n`;
      });
      menuText += `│\n`;
    }

    menuText += `╰───⭓ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄᴏᴏʟ ᴋɪᴅ`;

    reply(menuText);
  } catch (e) {
    console.error(e);
    reply("❌ Error displaying menu.");
  }
});
