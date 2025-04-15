// Commandes/fun/riddle.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "riddle",
  desc: "Send a random riddle",
  category: "fun",
  react: "❓",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const riddles = [
    {
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      answer: "An echo."
    },
    {
      question: "The more of me you take, the more you leave behind. What am I?",
      answer: "Footsteps."
    },
    {
      question: "What has to be broken before you can use it?",
      answer: "An egg."
    },
    {
      question: "What can travel around the world while staying in the same corner?",
      answer: "A stamp."
    },
    {
      question: "I have keys but no locks. I have a space but no room. You can enter, but can’t go outside. What am I?",
      answer: "A keyboard."
    }
  ];

  const random = riddles[Math.floor(Math.random() * riddles.length)];
  reply(`*RIDDLE TIME!*\n\n${random.question}\n\n_Reply with your answer!_\n\n||Answer: ${random.answer}||`);
});
