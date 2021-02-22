"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const fetch = require("node-fetch");
const Options_1 = require("../../util/Options");
class GetGame extends discord_akairo_1.Command {
    constructor() {
        super("get", {
            aliases: ["get", "show"],
            args: [
                { id: "game", type: "string", default: "" },
            ],
        });
    }
    async exec(message, args) {
        var _a, _b;
        const options = new Options_1.default("GET").transform();
        console.log(`http://localhost:3000/scores/${(_a = message.member) === null || _a === void 0 ? void 0 : _a.id}/${args.game}`, options);
        const res = await fetch(`http://localhost:3000/scores/${(_b = message.member) === null || _b === void 0 ? void 0 : _b.id}/${args.game}`, options);
        if (!res.ok) {
            return message.reply("☠️ Under attack, get cover!");
        }
        return message.reply("🏴‍☠️ As you wish matey!");
    }
}
exports.default = GetGame;
//# sourceMappingURL=getGame.js.map