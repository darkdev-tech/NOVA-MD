const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require("fs");
const path = require("path");
const { loadCommands } = require("./command");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, "session"));

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["NOVA-MD", "Safari", "1.0.0"],
        generateHighQualityLinkPreview: true,
        syncFullHistory: true
    });

    // Load all commands once the bot starts
    loadCommands();

    // Event: message received
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key.fromMe) return;

        const msgType = Object.keys(m.message)[0];
        const body = m.message.conversation || m.message[msgType]?.text || "";

        const prefix = ".";
        const isCmd = body.startsWith(prefix);
        const commandName = isCmd ? body.slice(prefix.length).split(" ")[0].toLowerCase() : null;
        const args = body.trim().split(/\s+/).slice(1);

        if (isCmd && global.commands.has(commandName)) {
            const cmdObj = global.commands.get(commandName);
            try {
                await cmdObj.execute(sock, m, m, {
                    from: m.key.remoteJid,
                    body,
                    isCmd,
                    command: commandName,
                    args,
                    q: args.join(" "),
                    sender: m.key.participant || m.key.remoteJid,
                    pushname: m.pushName || "User"
                });
            } catch (err) {
                console.error("❌ Command Error:", err);
            }
        }
    });

    // Save creds on changes
    sock.ev.on("creds.update", saveCreds);

    // Auto reconnect if disconnected
    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log("⚠️ Reconnecting...");
                startBot();
            } else {
                console.log("❌ Logged out. Please re-scan QR.");
            }
        } else if (connection === "open") {
            console.log("✅ BOT CONNECTED");
        }
    });
}

startBot();
