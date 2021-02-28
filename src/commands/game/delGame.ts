import { Command } from "discord-akairo";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";

class delGame extends Command {
  constructor() {
    super("delete game", {
      aliases: ["delete", "del", "remove"],
      args: [
        { id: "game", type: "string", 
      prompt: {
        start: "Which game?"
      }}
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(
      `${config.api.prefix}/user/${message.member?.id}/game/${args.game}`,
      "DELETE"
    )
      .then(async (res) => {
          console.log(res,res.ok)
      if(!res.ok){

        switch (res.status) {
          case 404:
            return message.reply("Game not found")
            break;
          case 409:
            return message.reply("TODO-409")
          default:
            return message.reply("☠️ Under attack, get cover!");
            break;
        }
      }
      
      return message.reply(`Delted ${args.game}. Hopefully.`)
      });
  }
}

export default delGame;