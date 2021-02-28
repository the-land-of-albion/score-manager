import { Category, Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";

export function createHelpEmbed(){
    const categoriesEmbed = new MessageEmbed()
      .setColor("#FC2C26")
      .setTitle("Command categories.")
      .setDescription("Try doing **!sb help game**")
      .setTimestamp()
      .setImage(
        "https://raw.githubusercontent.com/BotHaven/static/main/img/cpt_scoreboard.png"
      )
      .setFooter("For more info on seperate commands do `!sb help <category>`")
      .addField("1️⃣ game", "> Game related commands, creating, deleting,...")
      .addField(
        "2️⃣ score",
        "> Score related commands, incrementing and decrementing,..."
      )
      .addField("3️⃣ general", "> General commands ie: ping, help,...");
      return categoriesEmbed
}

export function createCategoryEmbed(
      category: Category<string, Command> | undefined
    ) {
      console.log(category?.id);
      if (!category) return new MessageEmbed();
      const fields = category.map((cat) => ({
        name: cat.id || "nothing",
        value: `> ${
          cat.description || "nothing"
        }\n Aliases: **${cat.aliases.join(", ")}**`,
      }));
      const embed = new MessageEmbed()
        .setColor("#FC2C26")
        .setTitle(`Category: ${category.id}`)
        .setDescription("Game related commands, creating, deleting,...")
        .setAuthor(
          "Arr matey!",
          "https://raw.githubusercontent.com/BotHaven/static/main/img/cpt_scoreboard.png"
        )
        .setTimestamp()
        .addFields(fields);
      return embed;
    }