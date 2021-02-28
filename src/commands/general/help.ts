import { Category, Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { User } from "discord.js";
import { MessageReaction } from "discord.js";
import { ReactionEmoji } from "discord.js";
import { Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { createCategoryEmbed, createHelpEmbed } from "../../config/help";

class Help extends Command {
  constructor() {
    super("help", {
      aliases: ["help"],
      channel: "guild",
      category: "general",
      description: "Lists general command info.",
      args: [
        {
          id: "category",
          default: "default",
        },
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const commandsByCategory = this.handler.categories.get(args.category);
    // const possibleCateogires = this.handler.categories.map((category) => category.id)
    const categoryEmbed = createHelpEmbed();
    if (!commandsByCategory) {
      return message.reply(categoryEmbed).then((sentMessage) => {
        // sentMessage.react("🅰️");
        sentMessage.react("1️⃣");
        sentMessage.react("2️⃣");
        sentMessage.react("3️⃣");

        return sentMessage
          .awaitReactions(
            (reaction: any, user: User) => user.id == message.author.id,
            { max: 1, time: 30000  }
          )
          .then((collected) => {
            if (collected.first()?.emoji.name == "1️⃣") {
              sentMessage.edit(createCategoryEmbed(this.handler.categories.get("game")));
            } else if(collected.first()?.emoji.name == "2️⃣"){
              sentMessage.edit(createCategoryEmbed(this.handler.categories.get("score")));
            } else if (collected.first()?.emoji.name == "3️⃣") {
              sentMessage.edit(createCategoryEmbed(this.handler.categories.get("general")));
            }
            return
          })
          .catch(() => message.reply("something went wrong"));
      });
    }
    

    return message.reply(createCategoryEmbed(commandsByCategory));
  }
}

export default Help;
