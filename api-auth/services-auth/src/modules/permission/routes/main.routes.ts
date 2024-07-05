import { permissionRoutes } from './permission.routes';
import { Router } from 'express';
const routers = Router();

routers.use('/v1/permission', permissionRoutes);

export { routers as PermissionMainRoutes };
