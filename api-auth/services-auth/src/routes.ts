
import { AuthentificationMainRoutes } from "@Authentification/routes/main.routes";
import { PermissionMainRoutes } from "@Permission/routes/main.routes";
import { RoleMainRoutes } from "@Role/routes/main.routes";
import { WorkSpaceMainRoutes } from "@WorkSpace/routes/main.routes";
import { Router } from "express";


export const routes: Router[] = [
  RoleMainRoutes,
  PermissionMainRoutes,
  AuthentificationMainRoutes,
  WorkSpaceMainRoutes,
];