import { Schema } from 'mongoose';
import { RoleDoc } from '../interface/role.schema.interface';
import { MyValidate } from './role.middleware.validate';

export class RoleMiddleware {
  static validate(schema: Schema<RoleDoc>): void {
    schema.pre('validate', async function (next) {

      const myValidate = new MyValidate()
      if (this.isNew || this.isModified('permissions')) {
        myValidate.workSpaceNoRepeatPermission(this.permissions)
      }

      if (this.isNew || this.isModified('slug')){
        await myValidate.workSpaceNoRepeatSlug(this.slug, this.workSpaceId)
      } 

      next();
    });
  }
}
