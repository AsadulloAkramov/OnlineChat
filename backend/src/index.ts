import { Application, IAppOptions } from "./Application";
import * as dotenv from 'dotenv';

dotenv.config();
const options:IAppOptions = {
  host:process.env.HOST,
  port: Number(process.env.PORT),
  mongoUrl:process.env.CHAT_MONGO_URL
}

const app = new Application(options);
app.start();

process.on("SIGINT", () => {
  app.shutdown();
});