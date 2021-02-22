"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const fetch = require("node-fetch");
const Game_1 = require("../../util/Game");
const Options_1 = require("../../util/Options");
class NewGame extends discord_akairo_1.Command {
    constructor() {
        super("new", {
            aliases: ["new", "n"],
            args: [
                { id: "game", type: "string", default: "" },
                { id: "player1", type: "string", default: "" },
                { id: "player2", type: "string", default: "" },
                { id: "player3", type: "string", default: "" },
                { id: "player4", type: "string", default: "" },
                { id: "player5", type: "string", default: "" },
                { id: "player6", type: "string", default: "" },
                { id: "player7", type: "string", default: "" },
                { id: "player8", type: "string", default: "" },
            ],
        });
    }
    async exec(message, args) {
        var _a;
        const options = new Options_1.default("PUT", new Game_1.default(args.game, [args.player1, args.player2, args.player3]), {
            Authorization: "Bearer mypassword",
            "Content-Type": "application/json",
            Accepts: "application/json",
        }).transform();
        const res = await fetch(`http://localhost:3000/scores/${(_a = message.member) === null || _a === void 0 ? void 0 : _a.id}/${args.game}`, options);
        res.json().then((e) => console.log(e));
        if (!res.ok) {
            return message.reply("☠️ Under attack, get cover!");
        }
        return message.reply("🏴‍☠️ As you wish matey!");
    }
}
exports.default = NewGame;
//# sourceMappingURL=newGame.js.map