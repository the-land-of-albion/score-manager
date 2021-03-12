const {NODE_ENV} = process.env;
const prefix = NODE_ENV == "production" ? "!sb" :  "?sb";
export default {
    bot: {
        prefix,
        name: "Lord Helyes",
        iconURL: "https://raw.githubusercontent.com/BotHaven/static/main/img/three-wise-men/gaspar.png"
    },
    api: {
        prefix: "http://localhost:3000"
    }
}