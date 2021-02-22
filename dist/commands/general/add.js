"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class AddCommand extends discord_akairo_1.Command {
    constructor() {
        super('add', {
            aliases: ['add'],
            args: [
                {
                    id: 'numOne',
                    type: 'string',
                    default: 0
                },
                {
                    id: 'numTwo',
                    type: 'string',
                    default: 0
                },
                {
                    id: 'numThree',
                    type: 'string',
                    default: 0
                }
            ]
        });
    }
    exec(message, args) {
        console.log(args);
        const sum = args.numOne + args.numTwo + args.numThree;
        return message.reply(`The sum is ${sum}!`);
    }
}
exports.default = AddCommand;
//# sourceMappingURL=add.js.map