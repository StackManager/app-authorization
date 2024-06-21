
import { AuthentificationMainRoutes } from "@Authentification/routes/main.routes";
import { WorkSpaceMainRoutes } from "@WorkSpace/routes/main.routes";
import { Router } from "express";


export const routes: Router[] = [
  AuthentificationMainRoutes,
  WorkSpaceMainRoutes
];