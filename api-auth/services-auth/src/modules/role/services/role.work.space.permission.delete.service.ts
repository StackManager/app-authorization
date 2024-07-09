import { PermissionData } from "@Permission/models/data/permission.data";
import { RoleBase } from "@Role/controller/role.base";
import { RoleRead } from "@Role/models/crud/role.read";
import { RoleData } from "@Role/models/data/role.data";

export class RoleWorkSpacePermissionDeleteService extends RoleBase {

  getSession = true;
  permissionService =  ["role_work_space_permission_delete"]
  read: RoleRead = new RoleRead();

  async run() {
    //Get the id params
    const {roleId, permissionId} = this.req.params;

    //Validamos los datos que proceden del request
    const validateRole = new RoleData()
    validateRole.setId(roleId);

    //Validamos los datos que proceden del request
    const validatePerm = new PermissionData()
    validatePerm.setId(permissionId);

    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    //Get the instance with read
    const doc = await this.read.getById(validateRole.getId());
    //Update status
    
    // Actualizar los permisos del documento
    const filter = doc.permissions.filter((perm) => 
      perm.toString() !== permissionId
    );
    doc.permissions = filter;

    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({name: doc.name, status: doc.status});
  }
}