import { Schema } from 'mongoose';
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";

export class MyValidate{

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

}