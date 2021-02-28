import { Command } from "discord-akairo";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";

class listGames extends Command {
  constructor() {
    super("list", {
      aliases: ["list"],
      channel: "guild",
      category: "game",
      description: "Lists all current games."
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(
      `${config.api.prefix}/user/${message.member?.id}/game`,
      "GET"
    )
      .then(async (res) => {
      if(!res.ok){

        switch (res.status) {
          case 404:
            return message.reply("Games not found")
            break;
          case 409:
            return message.reply("TODO-409")
          default:
            return message.reply("☠️ Under attack, get cover!");
            break;
        }
      }
      const data : [{title: string, scores:{}}] = await res.json();
      const text = data.map((game) => `Game: \`${game.title}\` - Winner: \`${getWinner(game.scores)}\``)

      return message.reply(text.join("\n"));

      function getWinner(score) {
          const keys = Object.keys(score);
          const values: number[] = Object.values(score);
          const winnerIndex = values.findIndex((val) => val === Math.max(...values));
          console.log(values, winnerIndex)
          return keys[winnerIndex];
      }

      });
  }
}

export default listGames;