import { PermissionCreateService } from '@Permission/services/permission.create.service';
import { PermissionDeletedService } from '@Permission/services/permission.delete.service';
import { PermissionEditService } from '@Permission/services/permission.edit.service';
import { PermissionListService } from '@Permission/services/permission.list.service';
import { PermissionStatusService } from '@Permission/services/permission.status.service';
import { Request, Response, NextFunction, Router } from 'express';

const routers = Router();

// Ruta POST crear una nueva instancia
routers.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new PermissionCreateService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET Lista los permissions de un 
routers.get('/:workSpaceId', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new PermissionListService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta PUT editar una nueva instancia
routers.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new PermissionEditService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para cambiar el estatus de este elemento
routers.patch('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new PermissionStatusService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });  
});

// Ruta DELETE para eliminar de manera SOFT
routers.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new PermissionDeletedService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

export { routers as permissionRoutes };
