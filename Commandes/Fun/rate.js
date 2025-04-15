// Commandes/fun/rate.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "rate",
  desc: "Rate anything from 1% to 100%",
  category: "fun",
  react: "📊",
  filename: __filename
},
async (conn, mek, m, { reply, q }) => {
  const input = q || "you";
  const rating = Math.floor(Math.random() * 100) + 1;

  reply(`📈 I'd rate *${input}* a *${rating}%* out of 100.`);
});
