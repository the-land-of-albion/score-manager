const {NODE_ENV} = process.env;
const prefix = NODE_ENV == "production" ? "!sb" :  "?sb";
export default {
    bot: {
        prefix,
        name: "Captain. Scoreboard",
        iconURL: "https://raw.githubusercontent.com/BotHaven/static/main/img/cpt_scoreboard.png"
    },
    api: {
        prefix: "http://localhost:3000"
    }
}