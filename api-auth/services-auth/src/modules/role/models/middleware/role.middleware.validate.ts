import { Schema } from 'mongoose';
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { RoleRead } from '../crud/role.read';

export class MyValidate{
  read: RoleRead = new RoleRead();

  workSpaceNoRepeatPermission(permission: Schema.Types.ObjectId[]){
    const permissionSet = new Set(permission.map(id => id.toString()));
    if (permissionSet.size !== permission.length) {
      throw new GenericError([{
        message: 'Duplicate permissions found',
        field: 'permission',
        detail: 'Duplicate permissions found',
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }
  }

  async workSpaceNoRepeatSlug(slug: string, workSpaceId: Schema.Types.ObjectId){

    //Get the instance with read
    this.read.filter.slug(slug)
    this.read.filter.workSpaceId(workSpaceId.toString())
    const doc = await this.read.get()
    if (doc){
      throw new GenericError([{
        message: 'Duplicate role name found',
        field: 'permission',
        detail: 'Duplicate role name found',
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }

  }

}