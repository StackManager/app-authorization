import { BaseReader } from '@Commons/crud/crud.reader.base';
import { PermissionDoc } from '../interface/permissionschema.interface';
import { PermissionFilter } from '../filter/permission.filter';
import { PermissionPopulate } from '../populate/permission.populate';
import { Permission } from '../permission.model';

export class PermissionRead extends BaseReader<PermissionDoc> {
  filter: PermissionFilter;
  populate: PermissionPopulate;

  constructor() {
    super('permissionId');
    this.filter = new PermissionFilter(this.filterManager);
    this.populate = new PermissionPopulate(this.populateModules);
  }

  getModel() {
    return Permission;
  }

  getData(doc: PermissionDoc) {
    return {
      name: doc.name,
    };
  }
}
