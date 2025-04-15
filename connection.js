// connection.js - NOVA-MD WhatsApp Connection Handler
// Created by Cool Kid Tech

const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const P = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');

const { loadCommands } = require('./command');

// Load DB (optional if global.db is already set in index.js)
global.db = {
    users: require('./bdd/users.json'),
    settings: require('./bdd/settings.json'),
    groups: require('./bdd/groups.json'),
    xp: require('./bdd/xp.json'),
    cooldowns: require('./bdd/cooldowns.json'),
    sessions: require('./bdd/sessions.json')
};

const { state, saveState } = useSingleFileAuthState('./auth/session.json');

const connectToWhatsApp = async () => {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['NOVA-MD', 'Cool Kid Tech', '1.0.0']
    });

    // Save auth credentials
    sock.ev.on('creds.update', saveState);

    // Command loader
    loadCommands();

    // Message handler
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key.remoteJid === 'status@broadcast') return;

        // Extract useful info
        const from = m.key.remoteJid;
        const sender = m.key.participant || m.key.remoteJid;
        const pushname = m.pushName || 'User';
        const isGroup = from.endsWith('@g.us');
        const body = m.message.conversation || m.message.extendedTextMessage?.text || '';
        const prefix = global.db.settings.prefix || '.';
        const isCmd = body.startsWith(prefix);
        const command = body.slice(prefix.length).split(' ')[0].toLowerCase();
        const args = body.split(' ').slice(1);
        const q = args.join(' ');

        // Match command
        const cmdObj = global.commands.find(cmd => cmd.pattern === command || (cmd.alias && cmd.alias.includes(command)));
        if (!cmdObj) return;

        // Run command
        try {
            await cmdObj.handler(sock, m, m, {
                from, sender, pushname, body, isCmd, command, args, q, isGroup,
                isOwner: sender === global.db.settings.owner,
                reply: (text) => sock.sendMessage(from, { text }, { quoted: m })
            });
        } catch (e) {
            console.error(`[ERROR in ${cmdObj.pattern}]:`, e);
        }
    });

    // Connection updates
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error = new Boom(lastDisconnect?.error))?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("❌ Disconnected. Reconnecting:", shouldReconnect);
            if (shouldReconnect) connectToWhatsApp();
        } else if (connection === 'open') {
            console.log("✅ Connected to WhatsApp - NOVA-MD is online!");
        }
    });
};

module.exports = { connectToWhatsApp };
