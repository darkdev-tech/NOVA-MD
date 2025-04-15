
// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// Fake Hack Command

module.exports = {
  name: 'hack',
  category: 'fun',
  desc: 'Fake hack a user for fun',
  async execute(sock, m, args, commandInfo) {
    const { sendMessage, delay } = sock;
    const { from, quoted, sender, mentions } = m;

    const target = mentions[0] || args[0] || sender;
    const fakeTarget = typeof target === 'string' ? target.replace(/[@ ]/g, '') : 'unknown_user';

    await sendMessage(from, { text: `🟢 Hacking @${fakeTarget}...`, mentions: [target] }, { quoted: m });
    await delay(1500);
    await sendMessage(from, { text: `📡 Finding IP...` }, { quoted: m });
    await delay(1500);
    await sendMessage(from, { text: `🌐 IP Found: 192.168.0.${Math.floor(Math.random() * 255)}` }, { quoted: m });
    await delay(1500);
    await sendMessage(from, { text: `🧠 Accessing device...` }, { quoted: m });
    await delay(1500);
    await sendMessage(from, { text: `📁 Files: \n- selfies.jpg\n- chat_backup.zip\n- memes_folder\n\nUploading to cloud...` }, { quoted: m });
    await delay(2000);
    await sendMessage(from, { text: `✅ Hack complete! Target @${fakeTarget} has been exposed!`, mentions: [target] }, { quoted: m });
  }
};
