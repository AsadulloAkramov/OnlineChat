import * as mongoose from 'mongoose';

export class MongoDB {
  async connect (connection:string) {
    const dbOptions = {
      autoIndex: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    try {
      return await mongoose.connect(connection, dbOptions);
    }
    catch(error) {
      console.log(`Mongoose connection error : ${error}`)
    }
  }
}