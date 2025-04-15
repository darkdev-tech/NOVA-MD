// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Riddle Command

module.exports = {
  name: 'riddle',
  category: 'fun',
  desc: 'Sends a riddle and waits for your answer',
  async execute(sock, m) {
    const { sendMessage } = sock;
    const { from, sender } = m;

    const riddles = [
      {
        question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        answer: "echo"
      },
      {
        question: "What can run but never walks, has a bed but never sleeps, has a mouth but never talks?",
        answer: "river"
      },
      {
        question: "The more of me you take, the more you leave behind. What am I?",
        answer: "footsteps"
      },
      {
        question: "What has to be broken before you can use it?",
        answer: "egg"
      },
      {
        question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
        answer: "candle"
      }
    ];

    const riddle = riddles[Math.floor(Math.random() * riddles.length)];

    await sendMessage(from, {
      text: `🧩 *Riddle Time!*\n${riddle.question}\n\n_Reply with your answer within 20 seconds!_`
    }, { quoted: m });

    // Optional: If you want reply detection, implement your message collector system
    // or let me help you build it.
  }
};
