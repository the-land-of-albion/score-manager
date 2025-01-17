import { Command } from 'discord-akairo';
import { Message } from "discord.js";

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'],
           category: "general",
           description: "Pings server."
        });
    }

    exec(message: Message) {
        return message.reply('Pong!');
    }
}

export default PingCommand;