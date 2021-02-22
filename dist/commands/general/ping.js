"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class PingCommand extends discord_akairo_1.Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }
    exec(message) {
        return message.reply('Pong!');
    }
}
exports.default = PingCommand;
//# sourceMappingURL=ping.js.map