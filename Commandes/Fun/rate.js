// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Rate Command

module.exports = {
  name: 'rate',
  category: 'fun',
  desc: 'Rates a person randomly (fun)',
  async execute(sock, m, args) {
    const { sendMessage } = sock;
    const { from, sender, mentionedJid } = m;

    const target = mentionedJid?.[0] || sender;
    const rate = Math.floor(Math.random() * 101);

    const messages = [
      `I'd rate @${target.split('@')[0]} a solid *${rate}%* cool!`,
      `Hmmm... @${target.split('@')[0]} is *${rate}%* awesome.`,
      `According to my sensors, @${target.split('@')[0]} has *${rate}%* swag.`,
      `Analysis complete: @${target.split('@')[0]} is *${rate}%* charming.`
    ];

    const response = messages[Math.floor(Math.random() * messages.length)];

    await sendMessage(from, {
      text: response,
      mentions: [target]
    }, { quoted: m });
  }
};
