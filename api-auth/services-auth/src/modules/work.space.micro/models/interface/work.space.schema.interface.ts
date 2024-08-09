import { Schema, Document } from "mongoose";

export const SCHEMAWORKSPACE = 'work.space.micro'

// that are requried to create a new User
export interface MicroWorkSpaceAttrs {
  name: string;
  description?: string;
    
  status: boolean; // Estado del dominio debe ser true para aprobar cualquier generacion de JWT
  registrationDate: Date; //Fecha de la creacion del workspace
  lastUpdateDate: Date; // Ultima actualizacion
  deleted: boolean; 
}

export interface MicroWorkSpaceDoc extends MicroWorkSpaceAttrs, Document{}  

