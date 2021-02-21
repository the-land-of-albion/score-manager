import { Command } from 'discord-akairo';

class AddCommand extends Command {
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

export default AddCommand;