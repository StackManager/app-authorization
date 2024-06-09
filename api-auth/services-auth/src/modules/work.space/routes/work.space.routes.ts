import { WorkSpaceCreateService } from '@WorkSpace/services/work.space.create.service';
import { WorkSpaceDeletedService } from '@WorkSpace/services/work.space.delete.service';
import { WorkSpaceEditService } from '@WorkSpace/services/work.space.edit.service';
import { WorkSpaceListService } from '@WorkSpace/services/work.space.list.service';
import { WorkSpaceStatusService } from '@WorkSpace/services/work.space.status.service';
import { Request, Response, NextFunction, Router } from 'express';

const routers = Router();

// Ruta POST crear una nueva instancia
routers.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new WorkSpaceCreateService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para obtener el listado con paginador
routers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new WorkSpaceListService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

// Ruta PUT editar una nueva instancia
routers.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new WorkSpaceEditService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta GET para cambiar el estatus de este elemento
routers.patch('/:id/status', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new WorkSpaceStatusService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });  
});

// Ruta DELETE para eliminar de manera SOFT
routers.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new WorkSpaceDeletedService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

export { routers as WorkSpaceRoutes };

