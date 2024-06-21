import { Schema, Document } from "mongoose";

export const SCHEMAWORKSPACE = 'work.space'

// that are requried to create a new User
export interface WorkSpaceAttrs {
  name: string;
  description?: string;
  domain: string;
  keySecret: string; // Llave con la que se genera el JWT
  keyPublic: string; // 
  maxAttemptsTokenActivationAccount: number; //Maximo numero de veces que un usuario puede intentar ingresar un token incorrecto para activar una cuenta
  maxAttemptsPasswordReset: number; //Maximo numero de veces que un usuario puede intentar ingresar un token incorrecto para resetear el passoword
  maxAttemptsLogin: number; // Maximo numero de veces que un usuario puede intentar ingresar un password incorrecto para obtener un JWT correcto
  status: boolean; // Estado del dominio debe ser true para aprobar cualquier generacion de JWT
  registrationDate: Date; //Fecha de la creacion del workspace
  lastUpdateDate: Date; // Ultima actualizacion
  deleted: boolean; 
}

export interface WorkSpaceDoc extends WorkSpaceAttrs, Document{}  

