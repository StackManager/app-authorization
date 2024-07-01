import { PopulateMongose } from '@Commons/mongose/populate.mongose';

export class RolePopulate extends PopulateMongose {
  fields(select = '') {
    return 'name ' + select;
  }
}
