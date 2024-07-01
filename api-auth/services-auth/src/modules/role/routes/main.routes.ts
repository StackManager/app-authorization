import { roleRoutes } from './role.routes';
import { Router } from 'express';
const routers = Router();

routers.use('/v1/role', roleRoutes);

export { routers as RoleMainRoutes };
