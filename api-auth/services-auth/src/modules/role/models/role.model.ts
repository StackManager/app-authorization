import mongoose from 'mongoose';
import {
  RoleDoc,
  SCHEMAROLE,
} from './interface/role.schema.interface';
import { RoleMiddleware } from './middleware/role.middleware';
import paginate from 'mongoose-paginate-v2';
import { SCHEMAWORKSPACE } from '@WorkSpace/models/interface/work.space.schema.interface';
import { SCHEMAPERMISSION } from '@Permission/models/interface/permissionschema.interface';

const roleSchema = new mongoose.Schema<RoleDoc>({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  default: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: Boolean, 
    default: false 
  },
  deleted: { 
    type: Boolean, 
    default: false 
  },
  workSpaceId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: SCHEMAWORKSPACE, 
    required: true 
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: SCHEMAPERMISSION,
    required: false 
  }]
});

RoleMiddleware.validate(roleSchema);
roleSchema.plugin(paginate);
const Role = global.dbtc.model<RoleDoc, mongoose.PaginateModel<RoleDoc>>(
  SCHEMAROLE,
  roleSchema
);
export { Role };
