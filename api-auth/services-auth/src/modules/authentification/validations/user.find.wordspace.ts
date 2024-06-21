import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";

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
  password: string,
}

export class UserFindWorkspace{

  validatePasswordOrFail({ index, password }: ValidatePasswordOrFailAttrs){
    // // If an index exists, then check if the tokens match
    // if (authDoc?.workSpaces[index]?.tokenActivationAccount === tokenActivation) {
    //   authDoc.workSpaces[index].status = true;
    //   await authDoc.save();
    // } else {
    //   throw new GenericError([{
    //     message: 'Token is not valid',
    //     field: 'token',
    //     detail: 'Token is not valid',
    //     code: MODELERRORTEXTTYPE.is_invalid
    //   }]);
    // }
  }

  validateOrFail({ authDoc, workSpaceDoc }: ValidateAttrs): Validate {
    const { isValid, index } = this.validate({ authDoc, workSpaceDoc })

    if (isValid) {
      throw new GenericError([{
        message: `User is not registered with this workspace`,
        field: 'email',
        detail: `User is not registered with this workspace`,
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }  
    return { isValid, index }
  }

  validate({ authDoc, workSpaceDoc }: ValidateAttrs): Validate {
    // Verifica que el usuario este asociado al dominio
    const index = authDoc.workSpaces.findIndex(d => d.workSpaceId === workSpaceDoc._id);
    let isValid = false;

    if (index !== -1){
      isValid = true
    }

    return { isValid, index }
  }



}
