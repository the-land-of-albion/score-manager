import { Listener } from "discord-akairo";

export default class ReactionAdded extends Listener {
  public constructor() {
    super("messageReactionAdd", {
      emitter: "client",
      event: "messageReactionAdd",
      category: "client",
    });
  }
  exec(){
      console.log("ji")
  }
}