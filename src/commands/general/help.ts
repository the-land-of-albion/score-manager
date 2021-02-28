import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { getByCategory, getCategories } from "../../config/help";

class Help extends Command {
  constructor() {
    super("help", {
      aliases: ["help"],
      channel: "guild",
      category: "general",
      description: "Lists general command info.",
      args: [{
        id:"category", default: "default"
      }]
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const commandsByCategory = this.handler.categories.get(args.category);
    // const possibleCateogires = this.handler.categories.map((category) => category.id)
    const categoryEmbed = new MessageEmbed()
      .setColor("#FC2C26")
      .setTitle("Command categories.")
      .setDescription("Try doing **\!sb help game**")
      .setTimestamp()
      .setImage("https://raw.githubusercontent.com/BotHaven/static/main/img/cpt_scoreboard.png")
      .setFooter("For more info on seperate commands do \`!sb help <category>\`")
      .addField("game", "> Game related commands, creating, deleting,...")
      .addField("general", "> General commands ie: ping, help,...")
      .addField("score", "> Score related commands, incrementing and decrementing,...")
    if(!commandsByCategory) return message.reply(categoryEmbed);
    const fields = commandsByCategory?.map((cat) => ({name: cat.id || "nothing", value: `> ${cat.description || "nothing"}\n Aliases: **${cat.aliases.join(", ")}**`}));
    const embed =  new MessageEmbed()
    .setColor("#FC2C26")
    .setTitle(`Category: ${args.category}`)
    .setDescription("Game related commands, creating, deleting,...")
    .setAuthor("Arr matey!","https://raw.githubusercontent.com/BotHaven/static/main/img/cpt_scoreboard.png")
    .setTimestamp()
    .addFields(fields)

    return message.reply(embed);
  }

  
}

export default Help;