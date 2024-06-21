import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";


interface AuthentificationValidateTokenAttrs{
  authDoc: AuthentificationDoc,
  index: number,
  tokenActivation: string
}

export class AuthentificationRegisterActivateService extends AuthentificationBase {

  getSession = false;
  getPermission = ["authentification_register_activate"]

/**
 * Validates the token for user authentication within a workspace.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.authDoc - The document associated with the user's registration.
 * @param {Object} params.index - Index workspace to make the changes.
 * @param {string} params.tokenActivation - The token sent from the client.
 * @throws {GenericError} Throws an error if the token is invalid or if the user is not registered with the workspace.
 */
  async authentificationValidateToken({ authDoc, index, tokenActivation }: AuthentificationValidateTokenAttrs) {

    // If an index exists, then check if the tokens match
    if (authDoc?.workSpaces[index]?.tokenActivationAccount === tokenActivation) {
      authDoc.workSpaces[index].status = true;
      await authDoc.save();
    } else {
      throw new GenericError([{
        message: 'Token is not valid',
        field: 'token',
        detail: 'Token is not valid',
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }

  //Metodo inicial para ejecutar la clase completa
  //El controlador global se encarga de gestionar las excepciones
  async run() {
    const { 
      email,
      keyPublic,
      tokenActivation
    } = this.req.body;
  
    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail(email);

    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateOrFail({ authDoc, workSpaceDoc});

    this.authentificationValidateToken({ authDoc, index, tokenActivation })
    this.res.status(200).json({ success: true, email });
  }
}