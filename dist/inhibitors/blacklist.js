"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class BlacklistInhibitor extends discord_akairo_1.Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        });
    }
    exec(message) {
        // He's a meanie!
        const blacklist = ['81440962496172032'];
        return blacklist.includes(message.author.id);
    }
}
exports.default = BlacklistInhibitor;
//# sourceMappingURL=blacklist.js.map