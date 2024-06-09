import { WorkSpaceRoutes } from "./work.space.routes";
import { Router } from 'express';
const routers = Router();


routers.use('/v1/work-space', WorkSpaceRoutes);


export { routers as WorkSpaceMainRoutes};