// Commandes/fun/quiz.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");

cmd({
  pattern: "quiz",
  desc: "Ask a random quiz question",
  category: "fun",
  react: "🧠",
  filename: __filename
},
async (conn, mek, m, { reply }) => {
  const quizzes = [
    {
      question: "What is the capital of France?",
      options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
      answer: "C"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["A. Earth", "B. Mars", "C. Venus", "D. Jupiter"],
      answer: "B"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["A. William Wordsworth", "B. Charles Dickens", "C. William Shakespeare", "D. Jane Austen"],
      answer: "C"
    },
    {
      question: "How many continents are there on Earth?",
      options: ["A. 5", "B. 6", "C. 7", "D. 8"],
      answer: "C"
    },
    {
      question: "What is the largest mammal?",
      options: ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Orca"],
      answer: "B"
    }
  ];

  const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

  reply(
    `*QUIZ TIME!*\n\n${randomQuiz.question}\n${randomQuiz.options.join('\n')}\n\n_Reply with the correct option letter (A, B, C, or D)._`
  );
});
