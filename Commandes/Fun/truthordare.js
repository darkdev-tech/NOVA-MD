// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Truth or Dare Command (tod)

module.exports = {
  name: 'tod',
  category: 'fun',
  desc: 'Play Truth or Dare',
  async execute(sock, m, args, commandInfo) {
    const { sendMessage } = sock;
    const { from } = m;

    const truths = [
      "What's your biggest fear?",
      "Have you ever had a crush on someone here?",
      "What's the most embarrassing thing you've done?",
      "What secret are you keeping right now?",
      "What's your guilty pleasure?"
    ];

    const dares = [
      "Text your crush and say hi.",
      "Change your profile pic to something funny for 10 mins.",
      "Say a pickup line to the last person who texted.",
      "Speak only in emojis for 10 minutes.",
      "Pretend you're a cat for 2 minutes."
    ];

    const type = args[0]?.toLowerCase();

    if (type === 'truth') {
      const randomTruth = truths[Math.floor(Math.random() * truths.length)];
      await sendMessage(from, { text: `🧠 *Truth:* ${randomTruth}` }, { quoted: m });
    } else if (type === 'dare') {
      const randomDare = dares[Math.floor(Math.random() * dares.length)];
      await sendMessage(from, { text: `🔥 *Dare:* ${randomDare}` }, { quoted: m });
    } else {
      await sendMessage(from, { text: `Choose one:\n• ${commandInfo.prefix}tod truth\n• ${commandInfo.prefix}tod dare` }, { quoted: m });
    }
  }
};
