const ms = require("parse-ms");

/**
 * Format process uptime into HH:MM:SS
 * @param {number} seconds
 * @returns {string}
 */
const runtime = (seconds) => {
    const time = ms(seconds * 1000);
    return `${time.hours}h ${time.minutes}m ${time.seconds}s`;
};

/**
 * Check if user is an admin in a group
 * @param {string} userId
 * @param {Array} groupAdmins
 * @returns {boolean}
 */
const isAdmin = (userId, groupAdmins = []) => {
    return groupAdmins.includes(userId);
};

/**
 * Simple delay
 * @param {number} ms
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Capitalize first letter
 * @param {string} text
 */
const capitalize = (text = '') => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

module.exports = {
    runtime,
    isAdmin,
    delay,
    capitalize
};
