import { Schema } from 'mongoose';
import { PermissionDoc } from '../interface/permissionschema.interface';
import { MyValidate } from './permission.middleware.validate';


export class PermissionMiddleware {
  static validate(schema: Schema<PermissionDoc>): void {
    schema.pre('validate', async function (next) {

      const myValidate = new MyValidate()

      if (this.isNew){
        await myValidate.workSpaceNoRepeatSlug(this.slug, this.workSpaceId)
      } 

      next();
    });
  }
}
