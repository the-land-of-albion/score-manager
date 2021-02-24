import { Command } from "discord-akairo";
import { Message } from "discord.js";
import * as fetch from "node-fetch";
import Game from "../../util/Game";
import {optionsBuilder} from "../../util/newOptions";
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
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    const members = [args.player1, args.player2, args.player3, args.player4];
    console.log(members, args.game);
    const game = new Game(args.game, members).build();
    console.log(game);
    const options = new Options("PUT", game).transform();
    fetch(`http://localhost:3000/scores/${message.member?.id}/${args.game}`,options)
    .then((e: Response) => {
      if(!e.ok){
        console.log("rip")
        return message.reply("☠️ Under attack, get cover!");
      }
    return message.reply("🏴‍☠️ As you wish matey!");
    }).catch((err) => {
      console.log(err);
      return message.reply("☠️ Under attack, get cover!");
    })

  }
}

export default NewGame;
