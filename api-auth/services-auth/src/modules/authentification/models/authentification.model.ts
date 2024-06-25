import mongoose from 'mongoose';
import { SCHEMAAUTHENTIFICATION, AuthentificationDoc, SCHEMALANGUAGE, SCHEMAROLE, WorkSpacesAttrs } from './interface/authentification.schema.interface';
import { AuthentificationMiddleware } from './middleware/authentification.middleware';
import paginate from 'mongoose-paginate-v2';
import { SCHEMAWORKSPACE } from '@WorkSpace/models/interface/work.space.schema.interface';

const workSpacesSchema = new mongoose.Schema<WorkSpacesAttrs>({
  password: { 
    type: String, 
    required: true 
  },
  session: { 
    type: String, 
    default: null 
  },
  tokenPasswordReset: { 
    type: String, 
    required: false,
    default: ''
  },
  tokenActivationAccount: { 
    type: String, 
    required: true,
    default: ''
  },
  attemptsTokenActivationAccount: { 
    type: Number, 
    default: 0 
  },
  attemptsPasswordReset: { 
    type: Number, 
    default: 0 
  },
  attemptsLogin: { 
    type: Number, 
    default: 0 
  },
  status: { 
    type: Boolean, 
    default: false 
  },
  dateBlock: { 
    type: Date, 
    default: null 
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
  // langId: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: SCHEMALANGUAGE, 
  //   required: true 
  // },
  // roleIds: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: SCHEMAROLE, 
  //   required: true 
  // }]
});

const AuthentificationSchema = new mongoose.Schema<AuthentificationDoc>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  workSpaces: [workSpacesSchema]
});

AuthentificationMiddleware.validate(AuthentificationSchema);
AuthentificationSchema.plugin(paginate);
const Authentification = global.dbtc.model<AuthentificationDoc, mongoose.PaginateModel<AuthentificationDoc>>(SCHEMAAUTHENTIFICATION, AuthentificationSchema);
export { Authentification };