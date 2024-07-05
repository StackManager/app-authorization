import { BaseList } from '@Commons/crud/crud.list.base';
import { PermissionDoc } from '../interface/permissionschema.interface';
import { PermissionFilter } from '../filter/permission.filter';
import { PermissionPopulate } from '../populate/permission.populate';
import { Permission } from '../permission.model';


export class PermissionList extends BaseList<PermissionDoc> {
  filter: PermissionFilter;
  populate: PermissionPopulate;

  constructor() {
    super('permission');
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
