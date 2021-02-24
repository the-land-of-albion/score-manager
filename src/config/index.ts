const {NODE_ENV} = process.env;
const prefix = NODE_ENV == "production" ? "!sb" :  "?sb";
export default {
    bot: {
        prefix,
        name: "Captain. Scoreboard"
    }
}