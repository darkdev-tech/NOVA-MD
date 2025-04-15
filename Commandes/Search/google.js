// Commandes/search/google.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "google",
  alias: ["gsearch", "g"],
  desc: "Search something on Google",
  category: "search",
  filename: __filename,
  use: "<query>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q) return reply("❓ Please enter something to search on Google.");

  try {
    const res = await axios.get(`https://api.safone.dev/google?q=${encodeURIComponent(q)}`);
    const results = res.data.results;

    if (!results || results.length === 0) return reply("🔍 No results found.");

    let text = `🔎 *Google Search Results for:* _${q}_\n\n`;
    results.slice(0, 5).forEach((r, i) => {
      text += `*${i + 1}. ${r.title}*\n${r.link}\n_${r.snippet}_\n\n`;
    });

    reply(text.trim());
  } catch (e) {
    console.error(e);
    reply("❌ Failed to fetch Google search results.");
  }
});
