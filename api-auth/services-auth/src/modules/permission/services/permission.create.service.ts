import { PermissionBase } from "@Permission/controller/permission.base";
import { PermissionData } from "@Permission/models/data/permission.data";
import { Permission } from "@Permission/models/permission.model";

export class PermissionCreateService extends PermissionBase {

  getSession = true;
  permissionService =  ["permission_work_space_create"]

  async run() {
    const { 
      name,
      workSpaceId
    } = this.req.body;


    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validate = new PermissionData()
    validate.setName(name);
    validate.setWorkSpaceId(workSpaceId);

    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    // TODO: Validar que el lugar desde donde se crea sea valido, el origin o IP

    const doc = new Permission ({
      name,
      slug: validate.getSlug(),
      status: true,
      workSpaceId
    });
    
    await doc.save();
    const data = doc.toJSON();
    this.res.status(201).json({ ...data });
  }
}