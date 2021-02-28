import { Command } from "discord-akairo";
import { Message } from "discord.js";
import config from "../../config";
import { createCategoryEmbed } from "../../config/help";

export default class Guide extends Command {
    constructor(){
        super("guide", {
            aliases: ["guide", "howto"],
            category: "general",
            channel: "guild" || "dm",
            description: "How to get started?"
        })
        
    }
    exec(message: Message) {
        message.author.send("**A guide on \"how to propelery talk to me\"**")
        message.author.send(createCategoryEmbed(this.handler.categories.get("game")));
        message.author.send(`1. **Creating a game**
For that do \`${config.bot.prefix} new\`.
Once you do I will ask you what you want to call it. No worries, I'm quite the patient lad.
2. **Getting your game**
Simply do \`${config.bot.prefix} show\`.
3. ** Changing score**
You can do \`${config.bot.prefix} win\` or \`${config.bot.prefix} undo\` to add and subtract a point accordlingly.
4. **Inviting friends**
Be sure to go back to **BotHaven**. Visit the \`#post-office\` and do tell me to do

For more information feel free to reach out to me. Just do \`${config.bot.prefix} help\` and I can help you out.
\`${config.bot.prefix} invite\`
        `).then((sentInstruction) => {
            sentInstruction.react("👍");
            sentInstruction.react("👎");
        })
    }
}