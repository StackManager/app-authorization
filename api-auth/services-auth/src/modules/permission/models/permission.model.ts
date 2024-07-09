import mongoose from 'mongoose';
import {
  PermissionDoc,
  SCHEMAPERMISSION,
} from './interface/permissionschema.interface';
import { PermissionMiddleware } from './middleware/permission.middleware';
import paginate from 'mongoose-paginate-v2';
import { SCHEMAWORKSPACE } from '@WorkSpace/models/interface/work.space.schema.interface';

const permissionSchema = new mongoose.Schema<PermissionDoc>({
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

PermissionMiddleware.validate(permissionSchema);
permissionSchema.plugin(paginate);
const Permission = global.dbtc.model<PermissionDoc, mongoose.PaginateModel<PermissionDoc>>(
  SCHEMAPERMISSION,
  permissionSchema
);
export { Permission };
