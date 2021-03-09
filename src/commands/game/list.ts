import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import config from "../../config";
import { fetch } from "../../config/fetch";

class listGames extends Command {
  constructor() {
    super("list games", {
      aliases: ["list"],
      channel: "guild",
      category: "game",
      description: "Lists all current games.",
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(`${config.api.prefix}/user/${message.member?.id}/game`, "GET").then(
      async (res) => {
        if (!res.ok) {
          switch (res.status) {
            case 404:
              return message.reply("Games not found");
              break;
            case 409:
              return message.reply("TODO-409");
            default:
              return message.reply("☠️ Under attack, get cover!");
              break;
          }
        }
        const data: [{ title: string; scores: {} }] = await res.json();
        const text = data.map(
          (game) =>
            `Game: \`${game.title}\` - Winner: \`${getWinner(game.scores)}\``
        );
        const base = new MessageEmbed()
          .setColor("RANDOM")
          .setThumbnail(config.bot.iconURL)
          .setFooter(
            `Requested by ${
              message.member?.nickname || message.author.username
            }`,
            message.member?.user.displayAvatarURL({ dynamic: true })
          );
        const gameTitles = data.map((game, i) => game.title);
        const fields = data.map((game, i) => ({
          name: gameTitles[i],
          value: `> Winner: ${getWinner(game.scores)}`,
        }));
        const ratio = () => {
          const winsAndLosses = data.map((game) => {
            const me = Object.keys(game.scores)[0];
            const winnerUsername = getWinner(game.scores);
            return me === winnerUsername ? 1 : 0;
          });
          const wins = winsAndLosses.filter((e) => e);
          const losses = winsAndLosses.filter((e) => !e);
          return `${wins.length} / ${losses.length}`;
        };

        const gamePrompt = new MessageEmbed(base)
          .setTitle("Your games")
          .addFields(fields)
          .addField("W/L:", ratio());

        return message.reply(gamePrompt);

        function getWinner(score) {
          const keys = Object.keys(score);
          const values: number[] = Object.values(score);
          const winnerIndex = values.findIndex(
            (val) => val === Math.max(...values)
          );
          console.log(values, winnerIndex);
          return keys[winnerIndex];
        }
      }
    );
  }
}

export default listGames;
