import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { config } from "dotenv";
config();



let mongo: any;
beforeAll(async () => {
  
  process.env.JWT_KEY = "inventory";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(mongoUri, {});
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

