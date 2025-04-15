// Commandes/search/lyrics.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "lyrics",
  alias: ["lyric"],
  desc: "Find song lyrics",
  category: "search",
  filename: __filename,
  use: "<song name>"
},
async (conn, mek, m, { reply, q }) => {
  if (!q) return reply("🎵 Please provide a song name to search lyrics for.");

  try {
    const res = await axios.get(`https://api.safone.dev/lyrics?query=${encodeURIComponent(q)}`);
    const { title, artist, lyrics } = res.data;

    if (!lyrics) return reply("❌ Lyrics not found.");

    const caption = `🎶 *${title}* by *${artist}*\n\n${lyrics.slice(0, 4000)}`;
    reply(caption);
  } catch (e) {
    console.error(e);
    reply("❌ Failed to fetch lyrics.");
  }
});
