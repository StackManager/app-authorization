import { Schema } from 'mongoose';
import { PermissionDoc } from '../interface/permissionschema.interface';
import { PermissionData } from '../data/permission.data';

export class PermissionMiddleware {
  static validate(schema: Schema<PermissionDoc>): void {
    schema.pre('validate', async function (next) {

      next();
    });
  }
}
