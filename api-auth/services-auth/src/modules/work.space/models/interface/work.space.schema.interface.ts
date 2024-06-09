import { Schema, Document } from "mongoose";

export const SCHEMAWORKSPACE = 'work.space'

// that are requried to create a new User
export interface WorkSpaceAttrs {
  name: string;
  description?: string;
  domain: string;
  keySecret: string;
  keyPublic: string;
  status: boolean;
  registrationDate: Date;
  lastUpdateDate: Date;
  deleted: boolean; 
}

export interface WorkSpaceDoc extends WorkSpaceAttrs, Document{}  

