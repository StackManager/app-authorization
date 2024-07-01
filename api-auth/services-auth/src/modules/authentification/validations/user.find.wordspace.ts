import { AuthentificationDoc, WorkSpacesAttrs } from "@Authentification/models/interface/authentification.schema.interface";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { Encrypt } from "@Commons/functions/encrypt";
import { JWT } from "@Commons/session/jwt.session";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";
import { Schema } from "mongoose";

interface ValidateAttrs{
  authDoc: AuthentificationDoc,
  workSpaceDoc: WorkSpaceDoc,
}

interface Validate{
  isValid: boolean,
  index: number,
}

interface ValidatePasswordOrFailAttrs{
  index: number,
  authDoc: AuthentificationDoc,
  password: string,
}

interface ValidateWorkSpaceNoExistOrFailAttrs{
  workSpaces:  WorkSpacesAttrs[],
  workSpaceId: Schema.Types.ObjectId,
}

export class UserFindWorkspace{

  validateWorkSpaceNoExistOrFail({workSpaces, workSpaceId}: ValidateWorkSpaceNoExistOrFailAttrs){
  // Validar si el workspaceId ya existe en workSpaces
  const isRegistered = workSpaces.some(d => d.workSpaceId.toString() === workSpaceId.toString());

    if (isRegistered) {
      throw new GenericError([{
        message: `User is already registered in the workspace`,
        field: 'email',
        detail: `User is already registered in the workspace`,
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }
  }

  async validatePasswordOrFail({ index, authDoc, password }: ValidatePasswordOrFailAttrs){
    // If an index exists, then check if the tokens match
    const storePassword = authDoc.workSpaces[index].password
    const comparation = await Encrypt.compare(storePassword, password)
    if (!comparation) {

      authDoc.workSpaces[index].attemptsLogin = authDoc.workSpaces[index].attemptsLogin + 1
      await authDoc.save()

      throw new GenericError([{
        message: 'Password is not valid',
        field: 'password',
        detail: 'Password is not valid',
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }

  validateExistOrFail({ authDoc, workSpaceDoc }: ValidateAttrs): Validate {
    const { isValid, index } = this.validateExist({ authDoc, workSpaceDoc })

    if (!isValid) {
      throw new GenericError([{
        message: `User is not registered with this workspace`,
        field: 'email',
        detail: `User is not registered with this workspace`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }  
    return { isValid, index }
  }

  validateExist({ authDoc, workSpaceDoc }: ValidateAttrs): Validate {
    // Verifica que el usuario este asociado al dominio
    const index = authDoc.workSpaces.findIndex(d => d.workSpaceId.toString() === workSpaceDoc._id.toString());
    let isValid = false;

    if (index !== -1){
      isValid = true
    }

    return { isValid, index }
  }

  

}
