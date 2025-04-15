// Created by cool kid tech do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "joke",
  desc: "Send a random joke",
  category: "fun",
  react: "🤣",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my computer I needed a break, and now it won't stop sending me Kit-Kats.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    "I'm reading a book about anti-gravity. It's impossible to put down!"
  ];

  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  reply(`😂 *Here's a joke:*\n\n${randomJoke}`);
});
