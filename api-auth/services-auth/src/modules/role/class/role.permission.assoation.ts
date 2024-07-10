import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";
import { PermissionRead } from "@Permission/models/crud/permission.read";
import { PermissionData } from "@Permission/models/data/permission.data";
import { PermissionDoc } from "@Permission/models/interface/permissionschema.interface";
import { RoleRead } from "@Role/models/crud/role.read";
import { RoleData } from "@Role/models/data/role.data";
import { RoleDoc } from "@Role/models/interface/role.schema.interface";


interface RolePermissionAssociationValidate {
  permissionDoc: PermissionDoc,
  roleDoc: RoleDoc
}

export class RolePermissionAssociation {

  readRole: RoleRead = new RoleRead();
  readPermission: PermissionRead = new PermissionRead();

  async getValid({roleId, permissionId}: {roleId: any, permissionId: any}): Promise<RolePermissionAssociationValidate>{

    //Validamos los datos que proceden del request
    const validateRole = new RoleData()
    validateRole.setId(roleId);

    //Validamos los datos que proceden del request
    const validatePerm = new PermissionData()
    validatePerm.setId(permissionId);


    //Get or fail the instance
    const permissionDoc = await this.readPermission.getById(permissionId) 
    //Get or fail the instance
    const roleDoc = await this.readRole.getById(roleId);

    //Tienen que pertenecer al mismo workspace
    if (permissionDoc.workSpaceId.toString() !== roleDoc.workSpaceId.toString()){
      throw new NotAuthorizedError("Invalid association");
    }

    if (permissionDoc.status == false || permissionDoc.deleted == true){
      throw new NotAuthorizedError("Invalid permission access");
    }

    if (roleDoc.status == false || roleDoc.deleted == true){
      throw new NotAuthorizedError("Invalid role access");
    }

    return {
      permissionDoc,
      roleDoc,
    }

  }

}