import myClient from "./client";
import * as path from "path";
import * as dotenv from "dotenv";
const PDotEnv = path.join(path.dirname(__dirname), ".env");
console.log(PDotEnv);
dotenv.config({path:PDotEnv});

myClient.start();