import { RoleBase } from "@Role/controller/role.base";
import { RoleRead } from "@Role/models/crud/role.read";


export class RoleWorkSpaceStatusService extends RoleBase {

  getSession = true;
  getPermission = ["role_work_space_update_status"]
  read: RoleRead = new RoleRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;

    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    // TODO: Validar que el lugar desde donde se crea sea valido, el origin o IP
    //Get the instance with read
    const doc = await this.read.getById(id);
    //Update status
    doc.status = !doc.status;
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({name: doc.name, status: doc.status});
  }
}