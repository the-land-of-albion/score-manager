"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const Game_1 = require("../../util/Game");
const newOptions_1 = require("../../util/newOptions");
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
            ],
        });
    }
    async exec(message, args) {
        var _a, _b;
        newOptions_1.optionsBuilder.build(`http://localhost:3000/scores/${(_a = message.member) === null || _a === void 0 ? void 0 : _a.id}/${args.game}`, "PUT", { body: new Game_1.default(args.game, [(_b = message.member) === null || _b === void 0 ? void 0 : _b.id, args.player1, args.player2, args.player3]).build() })
            .then((e) => {
            if (!e.ok) {
                return message.reply("☠️ Under attack, get cover!");
            }
            return message.reply("🏴‍☠️ As you wish matey!");
        }).catch((err) => {
            return message.reply("☠️ Under attack, get cover!");
        });
    }
}
exports.default = NewGame;
//# sourceMappingURL=newGame.js.map