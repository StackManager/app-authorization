
import { DataBaseController } from "@Commons/database/database.controller";
import { DatabaseData } from "@Commons/database/database.data";
import { Connection } from "mongoose";

// Clase para configurar los datos
export class DatabaseDataTrasacctional {
  private dbController: DataBaseController;

  constructor(){
    const {
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_HOSTNAME,
      MONGO_PORT,
      MONGO_DB
    } = process.env;

    const databaseData = new DatabaseData();
    databaseData.mongoUsername = MONGO_USERNAME;
    databaseData.mongoPassword = MONGO_PASSWORD;
    databaseData.mongoHostname = MONGO_HOSTNAME;
    databaseData.mongoPort = MONGO_PORT;
    databaseData.mongoDB = MONGO_DB;
    
    // Crear una instancia de DataBaseController
    this.dbController = new DataBaseController(databaseData);
  }

  async get(): Promise<Connection> {
    if (this.dbController.get() === null) 
      await this.dbController.connect();
    return this.dbController.get()!;
  }

  async disconnect(){
    await this.dbController.disconnect();
  }
}