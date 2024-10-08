import { AuthentificationListService } from '@Authentification/services/authentification.list.service';
import { AuthentificationLoginService } from '@Authentification/services/authentification.login.service';
import { AuthentificationRegisterActivateService } from '@Authentification/services/authentification.register.activate.service';
import { AuthentificationRegisterService } from '@Authentification/services/authentification.register.service';
import { AuthentificationPassworResetChange } from '@Authentification/services/authentification.reset.change.service';
import { AuthentificationPassworResetGenerateToken } from '@Authentification/services/authentification.reset.generate.token.service';
import { AuthentificationCreateRole } from '@Authentification/services/testing/authentification.register.assing.service';
import { Request, Response, NextFunction, Router } from 'express';

const routers = Router();

// Ruta POST crea un nuevo usuario asignado un dominio
routers.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new AuthentificationRegisterService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta POST valida un nuevo usuario asignado a un dominio con un token
routers.post('/register/activate', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new AuthentificationRegisterActivateService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta POST genera un JWT y RefreshToken, si el usuario y password son correctos y validos
routers.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new AuthentificationLoginService(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta POST genera un token, para un correo electronico en particular
routers.post('/reset-password/token', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new AuthentificationPassworResetGenerateToken(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

// Ruta POST cambia el passwork si el token es valido
routers.patch('/reset-password/change', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new AuthentificationPassworResetChange(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});


//TESTING MODE
//TODO: disable in production
// Ruta GET para obtener el listado con paginador
routers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const exec = new AuthentificationListService(req, res, next);
  await exec.handleAsync(async () => {
    await exec.run();
  });
});

routers.post('/create-role-admin', async (req: Request, res: Response, next: NextFunction) => {
  const auth = new AuthentificationCreateRole(req, res, next);
   await auth.handleAsync(async () => {
     await auth.run();
   });
});

export { routers as AuthentificationRoutes };

