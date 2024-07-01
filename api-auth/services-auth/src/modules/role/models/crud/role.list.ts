import { BaseList } from '@Commons/crud/crud.list.base';
import { RoleDoc } from '../interface/role.schema.interface';
import { RoleFilter } from '../filter/role.filter';
import { RolePopulate } from '../populate/role.populate';
import { Role } from '../role.model';


export class RoleList extends BaseList<RoleDoc> {
  filter: RoleFilter;
  populate: RolePopulate;

  constructor() {
    super('role');
    this.filter = new RoleFilter(this.filterManager);
    this.populate = new RolePopulate(this.populateModules);
  }

  getModel() {
    return Role;
  }

  getData(doc: RoleDoc) {
    return {
      name: doc.name,
    };
  }
}
