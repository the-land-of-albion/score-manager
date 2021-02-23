import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import {optionsBuilder} from "../../util/newOptions";

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
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    optionsBuilder.build(`http://localhost:3000/scores/${message.member?.id}/${args.game}`,"PUT", { body: new Game(args.game, [message.member?.id, args.player1, args.player2, args.player3]).build() })
    .then((e: Response) => {
      if(!e.ok){
        return message.reply("☠️ Under attack, get cover!");
      }
    return message.reply("🏴‍☠️ As you wish matey!");
    }).catch((err) => {
      return message.reply("☠️ Under attack, get cover!");
    })

  }
}

export default NewGame;
