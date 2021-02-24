"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const fetch = require("node-fetch");
const Options_1 = require("../../util/Options");
class undoGame extends discord_akairo_1.Command {
    constructor() {
        super("undo", {
            aliases: ["undo", "u"],
            args: [
                { id: "game", type: "string", default: "" },
                { id: "player", type: "string", default: "" },
            ],
        });
    }
    async exec(message, args) {
        var _a;
        const options = new Options_1.default("PATCH", null, {
            Authorization: "Bearer mypassword",
            "Content-Type": "application/json",
            Accepts: "application/json",
        }).transform();
        const res = await fetch(`http://localhost:3000/scores/undo/${(_a = message.member) === null || _a === void 0 ? void 0 : _a.id}/${args.game}/${args.player}`, options);
        const data = await res.json();
        if (!res.ok) {
            return message.reply("☠️ Under attack, get cover!");
        }
        console.log(data);
        const players = Object.keys(data.score);
        const scores = players.map((p) => data.score[p]);
        return message.reply(`🏴‍☠️ Arr, ${players[0]} has ${scores[0]}, an the other lad, he has ${scores[1]}!`);
    }
}
exports.default = undoGame;
//# sourceMappingURL=decGame.js.map