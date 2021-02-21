import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import Options from "../../util/Options";

class GetGame extends Command {
  constructor() {
    super("get", {
      aliases: ["get", "show"],
      args: [
        { id: "game", type: "string", default: "" },
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("GET").transform();

    console.log(`http://localhost:3000/scores/${message.member?.id}/${args.game}`,options)
    const res: Response = await fetch(
      `http://localhost:3000/scores/${message.member?.id}/${args.game}`,
      options
    );

    if (!res.ok) {
      return message.reply("☠️ Under attack, get cover!");
    }
    return message.reply("🏴‍☠️ As you wish matey!");
  }
}

export default GetGame;
