import mongoose from "mongoose";
import { Authentification } from "../authentification.model";
import { NotAuthorizedError } from "@Commons/errors/factory/authorized.error";


interface GetPermissionsByEmailAndWorkSpaceIdAttrs{
  authId: string,
  workSpaceId: string
}

interface GetPermissionsByEmailAndWorkSpaceId{
  email: string,
  permissions: string[]
}

export async function getPermissionsByEmailAndWorkSpaceId({ authId, workSpaceId }: GetPermissionsByEmailAndWorkSpaceIdAttrs ): Promise<GetPermissionsByEmailAndWorkSpaceId> {

  try{
    const userId = new mongoose.Types.ObjectId(authId) 
    const workSpaceId_ = new mongoose.Types.ObjectId(workSpaceId)

    const result = await Authentification.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$workSpaces' },
      { $match: { 'workSpaces.workSpaceId': workSpaceId_ } },
      {
        $lookup: {
          from: 'authentification.roles',
          localField: 'workSpaces.roleIds',
          foreignField: '_id',
          as: 'roles'
        }
      },
      { $unwind: '$roles' },
      {
        $lookup: {
          from: 'authentification.permissions',
          localField: 'roles.permissions',
          foreignField: '_id',
          as: 'permissions'
        }
      },
      {
        $group: {
          _id: '$email',
          permissions: { $addToSet: '$permissions.slug' }
        }
      },
      {
        $project: {
          _id: 0,
          email: '$_id',
          permissions: 1
        }
      }
    ]);

    // Check if result is found
    if (!result || result.length === 0) {
      return { 
        email: '',
        permissions: []
      }
    }

    return {
      email: result[0].email,
      permissions: result[0].permissions.flat()
    };
    
  }catch{
    return { 
      email: '',
      permissions: []
    }
  }
}