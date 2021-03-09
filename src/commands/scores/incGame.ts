import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";
import { promptGame } from "../../config/prompts/game";

class WinGame extends Command {
  constructor() {
    super("increment score", {
      aliases: ["win", "won"],
      channel: "guild",
      category: "score",
      description: "Increment player's score",
      args: [
        { id: "game", type: "string", prompt: {
          start: promptGame
        } },
        { id: "player", type: "string", prompt: {
          start: "Which user?"
        } },
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(
      `${config.api.prefix}/user/${message.member?.id}/game/${args.game}/score/${args.player}/inc`,
      "PATCH"
    )
      .then(async (res) => {
      if(!res.ok){
        console.log(res);

        switch (res.status) {
          case 404:
            return message.reply("Game not found")
            break;
          case 409:
            return message.reply("user is not participant")
          default:
            return message.reply("☠️ Under attack, get cover!");
            break;
        }
      }
      const data = await res.json();

      const players = Object.keys(data.scores);
      const scores = players.map((p) => data.scores[p])
      const text = players.map((val, index) => {
        return `${players[index]} has ${scores[index]}`
      })

      const max = Math.max(...scores)
      const maxIndex = scores.findIndex((e) => e == max)
      const winnerUsername = players[maxIndex];

      return fetch(`${config.api.prefix}/user/${winnerUsername}`,"GET", {headers: {"User-Agent": "none"}})
        .then((res) => {
          console.log(res);
          if(!res.ok) return message.reply("whoops");
          return res.json()})
        .then((user) => {
          const fields = Object.entries(data.scores).map(([username, score])=>({name: username, value: score}))
          const GameCard = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(config.bot.iconURL)
            .setFooter(`Requested by ${message.member?.nickname || message.author.username}`, message.member?.user.displayAvatarURL({dynamic: true}))
            .setTitle(args.game)
            .addFields(fields)
            .setDescription(`> ${user.bio} ~ ${winnerUsername}`)
          
            return message.reply(GameCard);
          const reply = user.bio ? [...text, `> ${user.bio}`] : [...text];
          return message.reply(reply.join("\n"));
        })
        .catch((err)=> console.log(err));

      });
  }
}

export default WinGame;
