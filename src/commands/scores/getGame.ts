import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";
import { promptGame } from "../../config/prompts/game";
import Options from "../../util/Options";

class GetGame extends Command {
  constructor() {
    super("get game", {
      aliases: ["get", "show"],
      channel: "guild",
      category: "game",
      description: "Get game stats.",
      args: [{ id: "game", type: "string", prompt: {
        start: promptGame
      } }],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("GET");

    fetch(
      `http://localhost:3000/user/${message.member?.id}/game/${args.game}/`, "GET"
    )
      .then((res) => {
        if(!res.ok){
          switch (res.status) {
            case 404:
            return message.reply("game not found")   
            
            default:
              break;
          }
        }
        return res.json()
      })
      .then((data) => {

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
        })
        .catch((err)=> console.log(err));

      });

  }

  
}

export default GetGame;
