
import { RoleWorkSpaceCreateService } from '@Role/services/role.work.space.create.service';
import { RoleWorkSpaceDeletedService } from '@Role/services/role.work.space.delete.service';
import { RoleWorkSpaceEditService } from '@Role/services/role.work.space.edit.service';
import { RoleWorkSpaceListService } from '@Role/services/role.work.space.list.service';
import { RoleWorkSpacePermissionAddService } from '@Role/services/role.work.space.permission.add.service';
import { RoleWorkSpacePermissionDeleteService } from '@Role/services/role.work.space.permission.delete.service';
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

// Ruta PUT editar una nueva instancia
routers.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new RoleWorkSpaceEditService(req, res, next);
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

// Ruta PATCH para añadir permisos a un rol
routers.patch('/:roleId/permission/:permissionId/add', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new RoleWorkSpacePermissionAddService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });  
});

// Ruta PATCH para eliminar permisos a un rol
routers.patch('/:roleId/permission/:permissionId/delete', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new RoleWorkSpacePermissionDeleteService(req, res, next);
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
