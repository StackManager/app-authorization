import { PopulateMongose } from "@Commons/mongose/populate.mongose";


export class AuthentificationPopulate extends PopulateMongose{

  fields(select = ''){
    return 'email ' + select
  }

}