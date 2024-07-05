import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";
import { WorkSpaceData } from "@WorkSpace/models/data/work.space.data";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";


interface AuthentificationValidateTokenAttrs{
  authDoc: AuthentificationDoc,
  index: number,
  tokenActivationAccount: string
}

export class AuthentificationRegisterActivateService extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_register_activate"]

/**
 * Validates the token for user authentication within a workspace.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.authDoc - The document associated with the user's registration.
 * @param {Object} params.index - Index workspace to make the changes.
 * @param {string} params.tokenActivation - The token sent from the client.
 * @throws {GenericError} Throws an error if the token is invalid or if the user is not registered with the workspace.
 */
  async authentificationValidateToken({ authDoc, index, tokenActivationAccount }: AuthentificationValidateTokenAttrs) {

    // If an index exists, then check if the status and token is valid
    if (authDoc.workSpaces[index].status || authDoc.workSpaces[index].tokenActivationAccount == "" ) {      
      throw new GenericError([{
        message: 'Account is not valid activation',
        field: 'email',
        detail: 'Account is not valid activation',
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
    
    // If an index exists, then check if the tokens match 
    if (authDoc?.workSpaces[index]?.tokenActivationAccount !== tokenActivationAccount){
      authDoc.workSpaces[index].attemptsTokenActivationAccount = authDoc.workSpaces[index].attemptsTokenActivationAccount + 1;
      await authDoc.save();
      throw new GenericError([{
        message: 'Token is not valid',
        field: 'token',
        detail: 'Token is not valid',
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }

    authDoc.workSpaces[index].status = true;
    await authDoc.save();

  }

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {
    const { 
      email,
      tokenActivationAccount
    } = this.req.body;
  
    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validateAuth = new AuthentificationData()
    validateAuth.setEmail(email);
    validateAuth.workSpaces.setTokenActivationAccount(tokenActivationAccount);

    const workSpaceFromHeader  = new WorkSpaceFromHeader()
    const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail({ email });

    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateExistOrFail({ authDoc, workSpaceDoc});

    await this.authentificationValidateToken({ authDoc, index, tokenActivationAccount })
    this.res.status(200).json({ success: true, email });
  }
}