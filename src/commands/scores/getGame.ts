import { Command } from "discord-akairo";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";
import Options from "../../util/Options";

class GetGame extends Command {
  constructor() {
    super("get game", {
      aliases: ["get", "show"],
      channel: "guild",
      category: "game",
      description: "Get game stats.",
      args: [{ id: "game", type: "string", prompt: {
        start: "Which game?"
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
          const reply = user.bio ? [...text, `> ${user.bio}`] : [...text];
          return message.reply(reply.join("\n"));
        })
        .catch((err)=> console.log(err));

      });

  }

  
}

export default GetGame;
