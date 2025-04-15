// Commandes/fun/tod.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "tod",
  desc: "Truth or Dare game",
  category: "fun",
  react: "🎲",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const mode = Math.random() < 0.5 ? "truth" : "dare";

  const truths = [
    "What is your biggest fear?",
    "Have you ever lied to your best friend?",
    "What's a secret you've never told anyone?",
    "Who was your first crush?",
    "What's the most embarrassing thing you've done?"
  ];

  const dares = [
    "Send a voice note saying 'I'm a potato'.",
    "Text your crush 'I like you' and screenshot the reply.",
    "Do 10 jumping jacks and record it.",
    "Say the alphabet backwards in voice note.",
    "Change your profile pic to a funny meme for 1 hour."
  ];

  const task = mode === "truth"
    ? truths[Math.floor(Math.random() * truths.length)]
    : dares[Math.floor(Math.random() * dares.length)];

  reply(`*🎮 Truth or Dare?*\n\nYou got: *${mode.toUpperCase()}*\n\n${task}`);
});
