import mongoose from "mongoose";
import { Authentification } from "../authentification.model";
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";
import { Role } from "@Role/models/role.model";
import { SCHEMAPERMISSION } from "@Permission/models/interface/permissionschema.interface";


interface GetPermissionsByEmailAndWorkSpaceIdAttrs{
  authId: string,
  workSpaceId: string
}

interface GetPermissionsByEmailAndWorkSpaceId{
  workspaces: any,
  permissions: any
}

export async function getPermissionsByEmailAndWorkSpaceId({ authId, workSpaceId }: GetPermissionsByEmailAndWorkSpaceIdAttrs ): Promise<GetPermissionsByEmailAndWorkSpaceId> {

  try{
    const userId = new mongoose.Types.ObjectId(authId) 
    const workSpaceId_ = new mongoose.Types.ObjectId(workSpaceId)

    const result = await Authentification.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$workSpaces' },
      { $match: { 'workSpaces.workSpaceId': workSpaceId_ } },
    ]);

    //console.log(JSON.stringify(result, undefined, 2));

    // Check if result is found
    if (!result || result.length === 0) {
      return { 
        workspaces: [],
        permissions: []
      }
    }
    
    const allRoleIds = result.flatMap(item => item.workSpaces.workSpaceEnviroments.flatMap((env: { roleIds: any; }) => env.roleIds.toString()));
    const uniqueRoleIds = [...new Set(allRoleIds)];
  
    const roles = await Role
                  .find({ _id: { $in: uniqueRoleIds } })
                  .populate("permissions")

    
    const rolesPrepare = roles.map((e) => {

      // Utilizar .map en lugar de tratar de invocar e.permissions como una función
      const permissionsSlug = e.permissions.map((i: any) => {
        return i.slug
        
      });
    
      return {
        id: e._id,  // Asegúrate de usar la propiedad _id o id según tu esquema
        permission: permissionsSlug
      };
    });

     return {
       workspaces: result[0].workSpaces.workSpaceEnviroments,
       permissions: rolesPrepare
    };
    
  }catch{
    return { 
      workspaces: [],
      permissions: []
    }
  }
}