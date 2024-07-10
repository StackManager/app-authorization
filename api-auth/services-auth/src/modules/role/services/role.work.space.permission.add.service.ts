import { PermissionData } from "@Permission/models/data/permission.data";
import { RolePermissionAssociation } from "@Role/class/role.permission.assoation";
import { RoleBase } from "@Role/controller/role.base";
import { RoleRead } from "@Role/models/crud/role.read";
import { RoleData } from "@Role/models/data/role.data";


export class RoleWorkSpacePermissionAddService extends RoleBase {

  getSession = true;
  permissionService =  ["role_work_space_permission_add"]
  read: RoleRead = new RoleRead();

  async run() {
  
    //Get the id params
    const {roleId, permissionId} = this.req.params;
    const getAssociation = new RolePermissionAssociation()
    const {roleDoc, permissionDoc} = await getAssociation.getValid({roleId, permissionId})
        
    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    // TODO: Validar que el lugar desde donde se crea sea valido, el origin o IP
    
    //Update
    roleDoc.permissions.push(permissionDoc._id);
    //Save and validate the changes
    await roleDoc.save();
    // Response 
    this.res.status(200).json({role: roleDoc.name, permission:  permissionDoc.name });
  }
}