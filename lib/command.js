const fs = require("fs");
const path = require("path");

global.commands = new Map();
global.categories = {};

const cmd = (info, execute) => {
    if (!info || !info.pattern || typeof execute !== "function") return;

    // Store the command
    global.commands.set(info.pattern, { ...info, execute });

    // Handle aliases
    if (info.alias && Array.isArray(info.alias)) {
        info.alias.forEach(alias => {
            global.commands.set(alias, { ...info, pattern: alias, execute });
        });
    }

    // Store category
    if (!global.categories[info.category]) {
        global.categories[info.category] = [];
    }
    global.categories[info.category].push(info.pattern);
};

const commands = global.commands;
const categories = global.categories;

const loadCommands = (dir = path.join(__dirname, "commands")) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            return loadCommands(filepath);
        }

        if (file.endsWith(".js")) {
            try {
                require(filepath);
            } catch (e) {
                console.error(`Failed to load command: ${file}`, e);
            }
        }
    });
};

module.exports = {
    cmd,
    commands,
    categories,
    loadCommands
};
