import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import Options from "../../util/Options";

class GetGame extends Command {
  constructor() {
    super("get", {
      aliases: ["get", "show"],
      args: [{ id: "game", type: "string", default: "" }],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("GET");

    const res: Response = await fetch(
      `http://localhost:3000/scores/${message.member?.id}/${args.game}`,
      options
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return message.reply("☠️ Under attack, get cover!");
    }

    const players = Object.keys(data.score);
    const parsedPlayers = players.map((p) => this.parseUsername(message.member?.id as string, p))
    const scores = players.map((p) => data.score[p]);
    let i = scores.indexOf(Math.max(...scores));
    const winner = players[i];
    return message.reply(
      `🏴‍☠️ Arr, ${parsedPlayers[0]} has ${scores[0]}, an the other lad, he has ${scores[1]}!\nBack on the post, meh lad, can't keep playing \`${data.title}\` for ever.\n\n> ${await this.getWinnerMessage(winner)}`
    );
  }

  parseUsername(self: string, username: string){
    // if(self === username) return "you";
    if(typeof parseInt(username) == "number") return `<@${username}>`;
    return username;
  }
  async getWinnerMessage(username: string){
    console.log(username);
    const options = new Options("GET");
    const response = await fetch(`http://localhost:3000/auth/user/${username}`, options);

    const data = await response.json();
    console.log(data);
    return data.bio;


  }
}

export default GetGame;
