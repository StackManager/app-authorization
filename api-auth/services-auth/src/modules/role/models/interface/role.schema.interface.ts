import { Schema, Document } from 'mongoose';

export const SCHEMAROLE = 'authentification.roles';

// Define la interfaz para la autenticación
export interface RoleAttrs {
  name: string;
  slug: string;
  status: boolean; // El status del rol
  deleted: boolean; // Si se encuentra eliminado
  workSpaceId: Schema.Types.ObjectId; //El espacio de trabajo  donde esta subscrito el rol
}

export interface RoleDoc extends RoleAttrs, Document {}
