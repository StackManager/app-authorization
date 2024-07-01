import { BaseReader } from '@Commons/crud/crud.reader.base';
import { RoleDoc } from '../interface/role.schema.interface';
import { RoleFilter } from '../filter/role.filter';
import { RolePopulate } from '../populate/role.populate';
import { Role } from '../role.model';

export class RoleRead extends BaseReader<RoleDoc> {
  filter: RoleFilter;
  populate: RolePopulate;

  constructor() {
    super('roleId');
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
