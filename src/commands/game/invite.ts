import { Command } from "discord-akairo";
import { GuildMember } from "discord.js";
import { Message } from "discord.js";
import config from "../../config";
import {fetch} from "../../config/fetch";

class inviteUser extends Command {
  constructor() {
    super("invite user to game", {
      aliases: ["invite"],
      args: [
        { id: "game", type: "string", 
      prompt: {
        start: "Which game?",
        timeout: "Oops, thausert's a timeout"
      }},
      {id: "user", type: "string", prompt: {
          start: "The user's username now..",
          timeout: "Oops, that's a timeout"
      }}
      ],
    });
  }

  async exec(message: Message, args: Record<string, any>) {
    fetch(
      `${config.api.prefix}/user/${message.member?.id}/game/${args.game}/invite`,
      "PUT", { body: {user: args.user}}
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
      
      return message.reply(`Invited ${args.user}.`)
      });
  }
}

export default inviteUser;