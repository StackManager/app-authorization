import mongoose from 'mongoose';
import { SCHEMAWORKSPACE, MicroWorkSpaceDoc } from './interface/work.space.schema.interface';
import { workSpaceMiddleware } from './middleware/work.space.middleware';
import paginate from 'mongoose-paginate-v2';

const workSpaceSchema = new mongoose.Schema<MicroWorkSpaceDoc>({
  name: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,  
    required: true, 
  },
  registrationDate: { 
    type: Date, 
    default: Date.now, 
    immutable: true 
  },
  lastUpdateDate: { 
    type: Date, 
    default: Date.now 
  },
  deleted: { 
    type: Boolean, 
    default: false 
  }
});

workSpaceMiddleware.validate(workSpaceSchema);
workSpaceSchema.plugin(paginate);
const MicroWorkSpace = global.dbtc.model<MicroWorkSpaceDoc, mongoose.PaginateModel<MicroWorkSpaceDoc>>(SCHEMAWORKSPACE, workSpaceSchema);
export { MicroWorkSpace };