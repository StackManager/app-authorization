import { PopulateMongose } from "@Commons/mongose/populate.mongose";


export class WorkSpacePopulate extends PopulateMongose{

  fields(select = ''){
    return 'name status deleted ' + select
  }

}