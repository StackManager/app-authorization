import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { RolePermissionAssociation } from "@Role/class/role.permission.assoation";
import { RoleBase } from "@Role/controller/role.base";

export class RoleWorkSpacePermissionDeleteService extends RoleBase {

  getSession = true;
  permissionService =  ["role_work_space_permission_delete"]


  async run() {

    //Get the id params
    const {roleId, permissionId} = this.req.params;
    const getAssociation = new RolePermissionAssociation()
    const {roleDoc, permissionDoc} = await getAssociation.getValid({roleId, permissionId})

    //Update
    const filter = roleDoc.permissions.filter((perm) => 
      perm.toString() !== permissionDoc._id.toString()
    );

    // Check if the filter is empty and throw an exception if it is
    if (filter.length == roleDoc.permissions.length) {
      throw new GenericError([{
        message: 'Permission no found',
        field: 'permission',
        detail: 'Permission no found',
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }

    roleDoc.permissions = filter;

    //Save and validate the changes
    await roleDoc.save();
    // Response 
    this.res.status(200).json({role: roleDoc.name, permission:  permissionDoc.name });
  }
}