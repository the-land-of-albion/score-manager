"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const path = require("path");
const config_1 = require("./config");
class MyClient extends discord_akairo_1.AkairoClient {
    constructor() {
        super({
            ownerID: "384079582267047937",
        }, {
            disableMentions: "everyone",
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path.join(__dirname, "./commands/"),
            prefix: config_1.default.bot.prefix,
        });
        this.inhibitorHandler = new discord_akairo_1.InhibitorHandler(this, {
            directory: path.join(__dirname, "./inhibitors/"),
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path.join(__dirname, "./listeners/"),
        });
        this.load();
    }
    start() {
        this.login(process.env.DISCORD_BOT_TOKEN);
    }
    load() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.inhibitorHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.loadAll();
        this.commandHandler.loadAll();
    }
}
exports.default = new MyClient();
//# sourceMappingURL=client.js.map