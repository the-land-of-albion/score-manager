"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const fetch = require("node-fetch");
const Options_1 = require("../../util/Options");
class GetGame extends discord_akairo_1.Command {
    constructor() {
        super("get", {
            aliases: ["get", "show"],
            args: [{ id: "game", type: "string", default: "" }],
        });
    }
    async exec(message, args) {
        var _a;
        const options = new Options_1.default("GET");
        const res = await fetch(`http://localhost:3000/scores/${(_a = message.member) === null || _a === void 0 ? void 0 : _a.id}/${args.game}`, options);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            return message.reply("☠️ Under attack, get cover!");
        }
        const players = Object.keys(data.score);
        const parsedPlayers = players.map((p) => { var _a; return this.parseUsername((_a = message.member) === null || _a === void 0 ? void 0 : _a.id, p); });
        const scores = players.map((p) => data.score[p]);
        let i = scores.indexOf(Math.max(...scores));
        const winner = players[i];
        return message.reply(`🏴‍☠️ Arr, ${parsedPlayers[0]} has ${scores[0]}, an the other lad, he has ${scores[1]}!\nBack on the post, meh lad, can't keep playing \`${data.title}\` for ever.\n\n> ${await this.getWinnerMessage(winner)}`);
    }
    parseUsername(self, username) {
        // if(self === username) return "you";
        if (typeof parseInt(username) == "number")
            return `<@${username}>`;
        return username;
    }
    async getWinnerMessage(username) {
        console.log(username);
        const options = new Options_1.default("GET");
        const response = await fetch(`http://localhost:3000/auth/user/${username}`, options);
        const data = await response.json();
        console.log(data);
        return data.bio;
    }
}
exports.default = GetGame;
//# sourceMappingURL=getGame.js.map