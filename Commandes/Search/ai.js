// Commandes/search/ai.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "ai",
  desc: "Ask AI anything",
  category: "search",
  filename: __filename,
  use: "<question>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q) return reply("❓ Please provide a question for the AI.");

  try {
    // Example using a public AI API (you can replace this with your own endpoint)
    const res = await axios.get(`https://api.safone.dev/ask?q=${encodeURIComponent(q)}`);
    const answer = res.data.answer || "❌ AI could not find an answer.";

    reply(`🤖 *AI Response:*\n\n${answer}`);
  } catch (e) {
    console.error(e);
    reply("❌ Failed to get a response from the AI.");
  }
});
