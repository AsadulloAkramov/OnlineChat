import  * as Express from 'express';
import * as mongoose from 'mongoose';
import * as Http from 'http';
import * as bodyParser from 'body-parser';
import * as Cors from 'cors';
import * as Colors from 'colors';
import routes from './Routes';
import { MongoDB } from './modules/MongoDBModule';

export interface IAppOptions {
  host: string,
  port: number,
  mongoUrl:string
}

export class Application {
  constructor(options:IAppOptions) {
    this.host = options.host;
    this.port = options.port;
    this.mongoUrl = options.mongoUrl;
  }

  public host: string;
  public port: number;
  public mongoUrl: string;
  public http:any;
  public db:any;
  public express:any;

  async start() {
    await this.dbConnect();
    await this.startExpress();
    // await this.startSocket();
  }

  async dbConnect() {
    const mongodb = new MongoDB();
    this.db = await mongodb.connect(this.mongoUrl);
  }

  async startExpress() {
    let corsOptions = {
      origin: "*",
      methods: "GET,PUT,POST,PATCH,DELETE,OPTIONS",
      allowedHeaders: ["Content-Type", "Authorization", "Lang"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
    this.express = Express();
    this.express.use(bodyParser.json({limit:"50mb"}));
    this.express.use(Cors(corsOptions));
    this.express.use(routes);
    this.http = Http.createServer(this.express);
    this.http.listen(
      this.port,
      console.log(Colors.rainbow(`Server running on http://${this.host}:${this.port}`))
    );
  }
  async startSocket() {

  }

  shutdown = () => {
    this.http.close((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });
  };
}