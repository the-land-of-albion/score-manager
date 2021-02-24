import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import Options from "../../util/Options";

class WinGame extends Command {
  constructor() {
    super("win", {
      aliases: ["win", "won"],
      args: [
        { id: "game", type: "string", default: "" },
        { id: "player", type: "string", default: "" },
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("PATCH", null, {
        Authorization: "Bearer mypassword",
        "Content-Type": "application/json",
        Accepts: "application/json",
      }).transform();

    const res: Response = await fetch(
      `http://localhost:3000/scores/${message.member?.id}/${args.game}/${args.player}`,
      options
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(res, data);
      return message.reply("☠️ Under attack, get cover!");
    }
    console.log(data);
     const players = Object.keys(data.score);
     const scores = players.map((p) => data.score[p])
    return message.reply(`🏴‍☠️ Arr, ${players[0]} has ${scores[0]}, an the other lad, he has ${scores[1]}!`);
  }
}

export default WinGame;
