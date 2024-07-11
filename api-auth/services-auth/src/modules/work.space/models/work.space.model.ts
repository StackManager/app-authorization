import mongoose from 'mongoose';
import { SCHEMAWORKSPACE, WorkSpaceDoc } from './interface/work.space.schema.interface';
import { workSpaceMiddleware } from './middleware/work.space.middleware';
import paginate from 'mongoose-paginate-v2';

const workSpaceSchema = new mongoose.Schema<WorkSpaceDoc>({
  name: {
    type: String
  },
  description: {
    type: String
  },
  domain: { 
    type: String,  
    required: true, 
    unique: true 
  },

  maxAttemptsTokenActivationAccount: { 
    type: Number, 
    default: 10,
    min: 2, 
    max: 10  
  },
  maxAttemptsPasswordReset: { 
    type: Number, 
    default: 10,
    min: 2, 
    max: 10 
  },
  maxAttemptsLogin: { 
    type: Number, 
    default: 10,
    min: 2, 
    max: 10 
  },

  minutesBlockedByMaxAttemptsLogin:{
    type: Number, 
    default: 60,
    min: 5, 
    max: 14400 
  },

  minutesBlockedByMaxAttemptsTokenActivationAccount:{
    type: Number, 
    default: 60,
    min: 5, 
    max: 14400 
  },

  minutesBlockedByMaxAttemptsPasswordReset:{
    type: Number, 
    default: 60,
    min: 5, 
    max: 14400 
  },

  sessionTime:{
    type: Number,
    default: 60,
    min: 1,
    max: 14400
  },

  keySecret: {
    type: String,  
    required: true,
    unique: true 
  },
  keyPublic: {
    type: String,  
    required: true,
    unique: true 
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
const WorkSpace = global.dbtc.model<WorkSpaceDoc, mongoose.PaginateModel<WorkSpaceDoc>>(SCHEMAWORKSPACE, workSpaceSchema);
export { WorkSpace };