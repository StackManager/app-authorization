import {app} from './app'
import { Connection } from 'mongoose';
import { RouteController } from '@Commons/routes/routes.controller';
import { DatabaseDataTrasacctional } from '@DB/database.transactional.connect';


// Declara dbtc como una variable global
declare global {
  var dbtc: Connection;
  //var dbec: Connection;
 }
 
const start = async () => {
 
  try {
    // Initialize the global variables
    const dbtc = new DatabaseDataTrasacctional();
    //const dbte = new DatabaseDataStadistic();

    //Initialize the global databases
    global.dbtc = await dbtc.get();
    //global.dbec = await dbte.get();

    //const migrations = new MigrationExecLocal();
    //await migrations.run();

    const routeManager = new RouteController(app);
    routeManager.run();

    // Iniciar el servidor
    app.listen(3000, async() => {
      console.log(`Servidor iniciado en el puerto ${3000}`);
    });
  
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

start();
