import { Message } from "discord.js";
import config from "..";
import { fetch } from "../fetch";

export function promptGame(message: Message){
    fetch(`${config.api.prefix}/user/${message.member?.id}/game`, "GET")
        .then((res) => {

            if(!res.ok) return message.reply("Which game?")
            return res.json();
        })
        .then((games: [{title: string}]) => {
            if(games.length){message.reply("Choose a game:\n" + games.map((game) => "`- "+game.title+ "`").join("\n"));}
            else { message.reply("Which game?")}

        })
}