import { PopulateMongose } from '@Commons/mongose/populate.mongose';

export class PermissionPopulate extends PopulateMongose {
  fields(select = '') {
    return 'name ' + select;
  }
}
