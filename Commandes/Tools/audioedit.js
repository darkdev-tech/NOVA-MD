// Commandes/tool/audioedit.js
// Created by cool kid tech — do not modify this file

const { cmd } = require("../command");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

cmd({
  pattern: "audioedit",
  desc: "Apply audio effects to voice/audio message",
  category: "tool",
  filename: __filename,
  use: "<bass|deep|reverse|fast|slow|robot> (reply to audio)"
},
async (conn, mek, m, { reply, q, quoted, mime }) => {
  if (!quoted || !/audio/.test(mime)) {
    return reply("🎧 Please reply to an audio/voice message to edit.");
  }

  const effect = q.toLowerCase();
  const validEffects = ["bass", "deep", "reverse", "fast", "slow", "robot"];
  if (!validEffects.includes(effect)) {
    return reply(`❌ Invalid effect. Choose one of: ${validEffects.join(", ")}`);
  }

  try {
    const media = await quoted.download();
    const input = path.join(__dirname, `${Date.now()}.mp3`);
    const output = path.join(__dirname, `out_${Date.now()}.mp3`);
    fs.writeFileSync(input, media);

    let command = "";

    switch (effect) {
      case "bass":
        command = `ffmpeg -i ${input} -af "bass=g=20" ${output}`;
        break;
      case "deep":
        command = `ffmpeg -i ${input} -af "asetrate=44100*0.8,aresample=44100" ${output}`;
        break;
      case "reverse":
        command = `ffmpeg -i ${input} -af "areverse" ${output}`;
        break;
      case "fast":
        command = `ffmpeg -i ${input} -filter:a "atempo=1.5" -vn ${output}`;
        break;
      case "slow":
        command = `ffmpeg -i ${input} -filter:a "atempo=0.7" -vn ${output}`;
        break;
      case "robot":
        command = `ffmpeg -i ${input} -af "afftfilt=real='hypot(re,im)':imag='atan2(im,re)'" ${output}`;
        break;
    }

    exec(command, async (err) => {
      if (err) {
        console.error(err);
        return reply("❌ Failed to process audio.");
      }

      const buff = fs.readFileSync(output);
      await conn.sendMessage(m.chat, {
        audio: buff,
        mimetype: "audio/mp4",
        ptt: false
      }, { quoted: mek });

      fs.unlinkSync(input);
      fs.unlinkSync(output);
    });
  } catch (e) {
    console.error(e);
    reply("❌ Error while editing audio.");
  }
});
