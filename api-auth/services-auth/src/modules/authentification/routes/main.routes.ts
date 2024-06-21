import { AuthentificationRoutes } from "./authentification.routes";
import { Router } from 'express';
const routers = Router();


routers.use('/v1/authentification', AuthentificationRoutes);


export { routers as AuthentificationMainRoutes};