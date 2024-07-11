import { Schema } from 'mongoose';
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { PermissionRead } from '../crud/permission.read';


export class MyValidate{
  read: PermissionRead = new PermissionRead();

  async workSpaceNoRepeatSlug(slug: string, workSpaceId: Schema.Types.ObjectId){

    //Get the instance with read
    this.read.filter.slug(slug)
    this.read.filter.workSpaceId(workSpaceId.toString())
    console.log(slug, workSpaceId)
    const doc = await this.read.get()
    console.log(doc, slug)
    console.log("------------------------")
    if (doc){
      throw new GenericError([{
        message: 'Duplicate permission name found',
        field: 'permission',
        detail: 'Duplicate permission name found',
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }
  }
}