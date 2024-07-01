import mongoose from 'mongoose';
import {
  RoleDoc,
  SCHEMAROLE,
} from './interface/role.schema.interface';
import { RoleMiddleware } from './middleware/role.middleware';
import paginate from 'mongoose-paginate-v2';
import { SCHEMAWORKSPACE } from '@WorkSpace/models/interface/work.space.schema.interface';

const roleSchema = new mongoose.Schema<RoleDoc>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
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
});

RoleMiddleware.validate(roleSchema);
roleSchema.plugin(paginate);
const Role = global.dbtc.model<RoleDoc, mongoose.PaginateModel<RoleDoc>>(
  SCHEMAROLE,
  roleSchema
);
export { Role };
