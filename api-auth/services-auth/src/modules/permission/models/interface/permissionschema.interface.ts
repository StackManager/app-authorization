import { Schema, Document } from 'mongoose';

export const SCHEMAPERMISSION = 'authentification.permissions';

// Define la interfaz para la autenticación
export interface PermissionAttrs {
  name: string;
  slug: string;
  status: boolean; // El status del rol
  deleted: boolean; // Si se encuentra eliminado
}

export interface PermissionDoc extends PermissionAttrs, Document {}
