// 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇💙
// ⚠️𝐃𝐎 𝐍𝐎𝐓 𝐌𝐎𝐃𝐈𝐅𝐘 𝐓𝐇𝐈𝐒 𝐅𝐈𝐋𝐄 ⚠️
// 𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐌𝐄 𝐅𝐎𝐑 𝐌𝐎𝐑𝐄 𝐄𝐗𝐂𝐋𝐔𝐒𝐈𝐕𝐄 .𝐉𝐒

const menu = (prefix, senderName) => {
  return `
╭──〔 *NOVA-MD MENU* 〕──╮
│ Hello, *${senderName}*!
│ Prefix: *${prefix}*
│ Bot Name: *NOVA-MD*
│ Time: *${new Date().toLocaleString()}*
│
├─❏ *🛠️ Main Commands*
│ • ${prefix}menu
│ • ${prefix}help
│ • ${prefix}info
│ • ${prefix}speed
│ • ${prefix}owner
│
├─❏ *👥 Group Tools*
│ • ${prefix}kick @user
│ • ${prefix}add [number]
│ • ${prefix}promote @user
│ • ${prefix}demote @user
│ • ${prefix}tagall
│ • ${prefix}group open/close
│
├─❏ *📥 Downloads*
│ • ${prefix}ytmp3 [link]
│ • ${prefix}ytmp4 [link]
│ • ${prefix}tiktok [link]
│ • ${prefix}mediafire [link]
│
├─❏ *🎮 Fun Commands*
│ • ${prefix}joke
│ • ${prefix}meme
│ • ${prefix}truth
│ • ${prefix}dare
│ • ${prefix}rate @user
│
├─❏ *🧰 Tools & Convert*
│ • ${prefix}sticker
│ • ${prefix}toimg
│ • ${prefix}tourl
│ • ${prefix}tinyurl
│
├─❏ *🧠 AI & Search*
│ • ${prefix}ai [query]
│ • ${prefix}google [query]
│ • ${prefix}lyrics [song]
│ • ${prefix}play [song]
│
├─❏ *👑 Owner Commands*
│ • ${prefix}shutdown
│ • ${prefix}restart
│ • ${prefix}eval
│ • ${prefix}broadcast [text]
│
╰─〔 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐂𝐎𝐎𝐋_𝐊𝐈𝐃 𝐓𝐄𝐂𝐇 〕
`;
};

module.exports = menu;
