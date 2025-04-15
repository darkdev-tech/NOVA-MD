// Commandes/main/help.js

const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  category: "main",
  desc: "Show all commands or details of one",
  use: "[command name]",
  async exec(sock, m, { args, command, commands }) {
    const prefix = "."; // Customize your prefix here

    if (args.length > 0) {
      const cmd = commands.get(args[0].toLowerCase());
      if (!cmd) return m.reply("Command not found.");
      return m.reply(`*Command:* ${cmd.name}
*Description:* ${cmd.desc || "No description"}
*Usage:* ${prefix}${cmd.name} ${cmd.use || ""}
*Category:* ${cmd.category}`);
    }

    // Group commands by category
    const categoryMap = {};
    commands.forEach((cmd, name) => {
      const cat = cmd.category || "other";
      if (!categoryMap[cat]) categoryMap[cat] = [];
      categoryMap[cat].push(name);
    });

    let helpText = `*🧠 NOVA-MD Help Menu*\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄᴏᴏʟ ᴋɪᴅ\n\n`;

    for (const [cat, cmds] of Object.entries(categoryMap)) {
      helpText += `*${cat.toUpperCase()}*\n`;
      helpText += cmds.map(cmd => `• ${prefix}${cmd}`).join("\n") + "\n\n";
    }

    m.reply(helpText.trim());
  },
};
