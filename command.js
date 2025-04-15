// command.js - NOVA-MD Command Handler
// Created by Cool Kid Tech

const fs = require('fs');
const path = require('path');

global.commands = [];

function cmd(info, func) {
    const commandObject = {
        pattern: info.pattern,
        alias: info.alias || [],
        desc: info.desc || '',
        category: info.category || 'main',
        react: info.react || '',
        filename: info.filename || '',
        handler: func
    };
    global.commands.push(commandObject);
}

function loadCommands(dir = path.join(__dirname, 'Commandes')) {
    const categories = fs.readdirSync(dir);

    for (const category of categories) {
        const categoryPath = path.join(dir, category);
        if (!fs.lstatSync(categoryPath).isDirectory()) continue;

        const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const filePath = path.join(categoryPath, file);
            try {
                require(filePath);
                console.log(`✅ Loaded: ${category}/${file}`);
            } catch (err) {
                console.error(`❌ Failed to load: ${category}/${file}\n`, err);
            }
        }
    }
}

module.exports = {
    cmd,
    commands,
    loadCommands
};
