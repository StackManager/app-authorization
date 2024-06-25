import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceData } from "@WorkSpace/models/data/work.space.data";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";

interface AuthentificationGenerateTokenAttrs{
  authDoc: AuthentificationDoc,
  index: number,
}

export class AuthentificationPassworResetGenerateToken extends AuthentificationBase {

  getSession = false;
  getPermission = ["word_space_create"]

  /**
   * Generate the token to reset a account
   *
   * @param {Object} params - The parameters for the function.
   * @param {Object} params.authDoc - The document associated with the user's registration.
   * @param {Object} params.index - Index workspace to make the changes.
   * @throws {GenericError} Throws an error if the token is invalid or if the user is not registered with the workspace.
   */
  async authentificationGenerateTokenReset({ authDoc, index  }: AuthentificationGenerateTokenAttrs) {

      //Reset the passwork and activate the account
      if (authDoc.workSpaces[index].tokenPasswordReset == "") {
        authDoc.workSpaces[index].tokenPasswordReset = '123456'
        await authDoc.save();
      }else{
        authDoc.workSpaces[index].attemptsPasswordReset = authDoc.workSpaces[index].attemptsPasswordReset + 1
        await authDoc.save();
        //Sent Generic error
        throw new GenericError([{
          message: 'Token is already assigned',
          field: 'token',
          detail: 'Token is already assigned',
          code: MODELERRORTEXTTYPE.is_invalid
        }]);
      }
  }

  async run() {

    const { 
      email,
      keyPublic,
    } = this.req.body;

    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validateAuth = new AuthentificationData()
    validateAuth.setEmail(email);

    //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    const validateWork = new WorkSpaceData()
    validateWork.setKeyPublic(keyPublic);

    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail(email);
    
    //Valida que exista un workSpaceValido registrado para este usuario
    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateOrFail({ authDoc, workSpaceDoc});

    await this.authentificationGenerateTokenReset({ authDoc, index })
    this.res.status(200).json({ success: true, email });
  }
}