// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Quiz Command

module.exports = {
  name: 'quiz',
  category: 'fun',
  desc: 'Get a random quiz question',
  async execute(sock, m, args, commandInfo) {
    const { sendMessage, getMessage } = sock;
    const { from, sender } = m;

    const quizzes = [
      {
        question: "What is the capital of France?",
        answer: "paris"
      },
      {
        question: "What planet is known as the Red Planet?",
        answer: "mars"
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "shakespeare"
      },
      {
        question: "What is 9 x 9?",
        answer: "81"
      },
      {
        question: "What is the largest ocean on Earth?",
        answer: "pacific"
      }
    ];

    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];

    await sendMessage(from, { text: `🧠 *Quiz Time!*\n${randomQuiz.question}\n\n_Reply within 15 seconds!_` }, { quoted: m });

    // Listen for reply
    const replyCollector = async (msg) => {
      if (msg.key.fromMe || msg.key.remoteJid !== from || msg.key.participant !== sender) return false;

      const userAnswer = msg.message?.conversation?.toLowerCase() || '';
      if (userAnswer.includes(randomQuiz.answer)) {
        await sendMessage(from, { text: `✅ Correct! Nice one.` }, { quoted: msg });
      } else {
        await sendMessage(from, { text: `❌ Wrong! The correct answer was *${randomQuiz.answer}*.` }, { quoted: msg });
      }

      return true; // End listener
    };

    // This depends on your message handling system - you might need a global collector setup.
    // Replace with your event or reply management logic if needed.
  }
};
