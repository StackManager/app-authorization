import { Schema, Document } from "mongoose";

export const SCHEMAWORKSPACE = 'work.space'

// that are requried to create a new User
export interface WorkSpaceAttrs {
  name: string;
  description?: string;
  domain: string;

  sessionTime: number; //Tiempo que dura el jwt generado

  keySecret: string; // Llave con la que se genera el JWT
  keyPublic: string; // Llave con la cuenta se ingresa cada peticion en el header

  maxAttemptsTokenActivationAccount: number; //Maximo numero de veces que un usuario puede intentar ingresar un token incorrecto para activar una cuenta
  maxAttemptsPasswordReset: number; //Maximo numero de veces que un usuario puede intentar ingresar un token incorrecto para resetear el passoword
  maxAttemptsLogin: number; // Maximo numero de veces que un usuario puede intentar ingresar un password incorrecto para obtener un JWT correcto
  
  minutesBlockedByMaxAttemptsTokenActivationAccount: number; //Minutos que se bloqueara la cuenta por maximo intentos al activar
  minutesBlockedByMaxAttemptsPasswordReset: number; //Minutos que se bloqueara la cuenta por maximo intentos al activar
  minutesBlockedByMaxAttemptsLogin: number; // Minutos que se bloqueara la cuenta por maximo intentos al hacer login
    
  status: boolean; // Estado del dominio debe ser true para aprobar cualquier generacion de JWT
  registrationDate: Date; //Fecha de la creacion del workspace
  lastUpdateDate: Date; // Ultima actualizacion
  deleted: boolean; 
}

export interface WorkSpaceDoc extends WorkSpaceAttrs, Document{}  

