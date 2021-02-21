import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import Options from "../../util/Options";

class NewGame extends Command {
  constructor() {
    super("new", {
      aliases: ["new", "n"],
      args: [
        { id: "game", type: "string", default: "" },
        { id: "player1", type: "string", default: "" },
        { id: "player2", type: "string", default: "" },
        { id: "player3", type: "string", default: "" },
        { id: "player4", type: "string", default: "" },
        { id: "player5", type: "string", default: "" },
        { id: "player6", type: "string", default: "" },
        { id: "player7", type: "string", default: "" },
        { id: "player8", type: "string", default: "" },
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const options = new Options("PUT", new Game(args.game, [args.player1, args.player2, args.player3]), {
        Authorization: "Bearer mypassword",
        "Content-Type": "application/json",
        Accepts: "application/json",
      }).transform();

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

export default NewGame;
