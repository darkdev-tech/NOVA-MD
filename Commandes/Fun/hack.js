// Commandes/fun/hack.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "hack",
  desc: "Fake hacking simulation",
  category: "fun",
  react: "💻",
  filename: __filename
},
async (conn, mek, m, { reply, args }) => {
  const target = args[0] || "user";
  const fakeProcess = [
    `[${target}] Connecting to WhatsApp server...`,
    `[${target}] Bypassing 2FA...`,
    `[${target}] Downloading chats...`,
    `[${target}] Extracting media files...`,
    `[${target}] Injecting virus...`,
    `[${target}] Cleaning traces...`,
    `✅ Successfully hacked ${target} (Just Kidding!)`
  ];

  for (let i = 0; i < fakeProcess.length; i++) {
    await new Promise(res => setTimeout(res, 1000));
    await reply(fakeProcess[i]);
  }
});
