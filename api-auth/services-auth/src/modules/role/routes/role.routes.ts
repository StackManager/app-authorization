
import { RoleWorkSpaceCreateService } from '@Role/services/role.work.space.create.service';
import { RoleWorkSpaceDeletedService } from '@Role/services/role.work.space.delete.service';
import { RoleWorkSpaceListService } from '@Role/services/role.work.space.list.service';
import { RoleWorkSpaceStatusService } from '@Role/services/role.work.space.status.service';
import { Request, Response, NextFunction, Router } from 'express';

const routers = Router();

// Ruta POST crear una nueva instancia
routers.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new RoleWorkSpaceCreateService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET Lista los roles de un WorkSpace
routers.get('/:workSpaceId', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new RoleWorkSpaceListService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para cambiar el estatus de este elemento
routers.patch('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new RoleWorkSpaceStatusService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });  
});

// Ruta DELETE para eliminar de manera SOFT
routers.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new RoleWorkSpaceDeletedService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

export { routers as roleRoutes };
