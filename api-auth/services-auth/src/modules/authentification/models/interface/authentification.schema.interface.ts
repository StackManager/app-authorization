import { Schema, Document } from "mongoose";

export const SCHEMAAUTHENTIFICATION = 'authentification.users'
export const SCHEMAROLE = "authentification.roles"
export const SCHEMALANGUAGE = 'configuration.languages'

// Define la interfaz para un dominio
export interface WorkSpacesAttrs {

  password: string; // El password asociado al dominio
  status?: boolean; // El status de la cuenta asociado a este dominio
  session?: string; // El ultimo token session generado para este dominio
  
  dateBlock?: Date | null; // Fecha hasta la que estara bloqueada la cuenta 
  
  tokenPasswordReset?: string; // Token generado y enviado al email, para poder colocar un password nuevo
  tokenActivationAccount?: string; // Token generado y enviado al email, para poder activar la cuenta para este dominio
  
  attemptsTokenActivationAccount: number; // Numero de veces que el usuario intento colocar un token para generar la cuenta, pero coloco un token incorrecto
  attemptsPasswordReset: number; // Numero de veces que un usuario intento resetear su passwork, pero coloco un token incorrecto 
  attemptsLogin: number; //Numero de veces seguidas que un usuario coloco un password incorrecto, para intentar obtener las credenciales

  deleted?: boolean; //
  workSpaceId: Schema.Types.ObjectId; //El espacio de trabajo  donde esta subscrito el usuario
  //langId: Schema.Types.ObjectId; // Lenguaje predefinido para el usuario
  //roleIds: Schema.Types.ObjectId[]; // Conjunto de roles que son asignados al usuario
}

// Define la interfaz para la autenticación
export interface AuthentificationAttrs{
  email: string;
  workSpaces: WorkSpacesAttrs[];
}

export interface AuthentificationDoc extends AuthentificationAttrs, Document{}  

