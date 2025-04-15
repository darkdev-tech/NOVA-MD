const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const path = require('path');
const fs = require('fs');
const { loadCommands } = require('./command');
const chalk = require('chalk');

async function startNova() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'session'));

    const nova = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ["NOVA-MD", "Cool Kid Tech", "1.0.0"]
    });

    // Load commands
    loadCommands();

    // Command handling
    nova.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const type = Object.keys(msg.message)[0];
        const body = msg.message?.conversation || msg.message[type]?.text || '';
        const prefix = ".";
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).split(" ")[0].toLowerCase() : '';
        const args = body.trim().split(/\s+/).slice(1);
        const sender = msg.key.participant || msg.key.remoteJid;

        if (isCmd && global.commands.has(command)) {
            const cmdObj = global.commands.get(command);
            try {
                await cmdObj.execute(nova, msg, msg, {
                    from: msg.key.remoteJid,
                    sender,
                    body,
                    isCmd,
                    command,
                    args,
                    q: args.join(" "),
                    pushname: msg.pushName || "User"
                });
            } catch (e) {
                console.log(chalk.red("❌ Error:"), e);
            }
        }
    });

    nova.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        const reason = lastDisconnect?.error?.output?.statusCode;

        if (connection === 'close') {
            if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("❌ Session expired. Please delete session folder and restart."));
            } else {
                console.log(chalk.yellow("⚠️ Reconnecting..."));
                startNova();
            }
        } else if (connection === 'open') {
            console.log(chalk.green("✅ NOVA-MD connected."));
        }
    });

    nova.ev.on('creds.update', saveCreds);
}

startNova();
