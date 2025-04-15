// Commandes/main/owner.js

const { cmd } = require("../command");

cmd({
  pattern: "owner",
  desc: "Show bot owner contact info",
  category: "main",
  react: "👑",
  filename: __filename
},
async (conn, mek, m, { from }) => {
  try {
    const ownerNumber = "254107065646@s.whatsapp.net";

    const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:ᴄᴏᴏʟ ᴋɪᴅ
ORG:NOVA-MD;
TEL;type=CELL;type=VOICE;waid=254107065646:+254701065646
END:VCARD`;

    await conn.sendMessage(from, {
      contacts: {
        displayName: "ᴄᴏᴏʟ ᴋɪᴅ",
        contacts: [{ vcard }]
      }
    }, { quoted: mek });

  } catch (err) {
    console.error("Error in owner command:", err);
    m.reply("❌ Couldn't fetch owner contact.");
  }
});
