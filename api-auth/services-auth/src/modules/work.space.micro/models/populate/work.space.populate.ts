import { PopulateMongose } from "@Commons/mongose/populate.mongose";


export class MicroWorkSpacePopulate extends PopulateMongose{

  fields(select = ''){
    return 'name status deleted ' + select
  }

}