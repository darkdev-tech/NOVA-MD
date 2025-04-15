// Commandes/owner/eval.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "eval",
  alias: ["ev"],
  desc: "Run JavaScript code",
  category: "owner",
  filename: __filename,
  use: "<code>"
},
async (conn, mek, m, { reply, q, isOwner }) => {
  if (!isOwner) return reply("❌ Only the bot owner can use this command.");
  if (!q) return reply("⚠️ Please provide some JavaScript code.");

  try {
    let result = await eval(q);
    if (typeof result !== "string") {
      result = require("util").inspect(result);
    }
    reply("🧠 *Eval Result:*\n\n" + result);
  } catch (err) {
    reply("❌ *Error:*\n\n" + err.message);
  }
});
