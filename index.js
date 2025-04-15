// index.js - NOVA-MD Main Entry
// Created by Cool Kid Tech

const makeWASocket = require('@whiskeysockets/baileys').default;
const { useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const fs = require('fs');
const path = require('path');

const { loadCommands, commands } = require('./command');

// Load JSON database
global.db = {
    users: require('./bdd/users.json'),
    settings: require('./bdd/settings.json'),
    groups: require('./bdd/groups.json'),
    xp: require('./bdd/xp.json'),
    cooldowns: require('./bdd/cooldowns.json'),
    sessions: require('./bdd/sessions.json')
};

// Load commands
loadCommands();

const { state, saveState } = useSingleFileAuthState('./auth/session.json');

// Create socket
const startBot = async () => {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['NOVA-MD', 'Cool Kid Tech', '1.0.0']
    });

    sock.ev.on('creds.update', saveState);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key && m.key.remoteJid === 'status@broadcast') return;

        const from = m.key.remoteJid;
        const sender = m.key.participant || m.key.remoteJid;
        const pushname = m.pushName || 'User';
        const isGroup = from.endsWith('@g.us');

        let body = m.message.conversation || m.message?.extendedTextMessage?.text || '';
        let prefix = global.db.settings.prefix || '/';
        let isCmd = body.startsWith(prefix);

        if (!isCmd) return;

        const command = body.slice(prefix.length).split(' ')[0].toLowerCase();
        const args = body.split(' ').slice(1);
        const q = args.join(' ');

        const cmdObj = commands.find(cmd => cmd.pattern === command || (cmd.alias && cmd.alias.includes(command)));
        if (!cmdObj) return;

        try {
            await cmdObj.handler(sock, m, m, {
                from, sender, pushname, body, isCmd, command, args, q, isGroup,
                isOwner: sender === global.db.settings.owner,
                reply: (text) => sock.sendMessage(from, { text }, { quoted: m })
            });
        } catch (e) {
            console.error(`[ERROR]: ${e}`);
        }
    });

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log("Connection closed. Reconnecting...", shouldReconnect);
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.log('✅ NOVA-MD is online!');
        }
    });
};

startBot();
