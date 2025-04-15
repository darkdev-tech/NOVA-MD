// command.js
// command .js by cool kid tech

const fs = require("fs");
const path = require("path");

// Array to hold all registered commands
const commands = [];

function cmd(options, handler) {
  // Push command object to command list
  commands.push({ ...options, handler });
}

function loadCommands(dir = "./Commandes") {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(fullPath); // Recursively load subfolders
    } else if (file.endsWith(".js")) {
      try {
        require(fullPath);
      } catch (e) {
        console.error(`❌ Failed to load command file: ${file}`);
        console.error(e);
      }
    }
  });
}

module.exports = {
  cmd,
  commands,
  loadCommands
};
