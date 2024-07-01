import { Schema } from 'mongoose';
import { RoleDoc } from '../interface/role.schema.interface';
import { RoleData } from '../data/role.data';

export class RoleMiddleware {
  static validate(schema: Schema<RoleDoc>): void {
    schema.pre('validate', async function (next) {


      next();
    });
  }
}
