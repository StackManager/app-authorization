import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";


interface AuthentificationValidateTokenAttrs{
  authDoc: AuthentificationDoc,
  index: number,
  tokenPasswordReset: string,
  password: string
}


export class AuthentificationPassworResetChange extends AuthentificationBase {

  getSession = false;
  getPermission = ["word_space_create"]

/**
 * Validates the token for user authentication, and reset the passwork
 *
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.authDoc - The document associated with the user's registration.
 * @param {Object} params.index - Index workspace to make the changes.
 * @param {string} params.tokenPasswordReset - The token sent from the client.
 * @param {string} params.password - New password sent from the client.
 * @throws {GenericError} Throws an error if the token is invalid or if the user is not registered with the workspace.
 */
async authentificationValidateToken({ authDoc, index, tokenPasswordReset, password }: AuthentificationValidateTokenAttrs) {

  // If an index exists, then check if the tokens match
  if (authDoc?.workSpaces[index]?.tokenPasswordReset === tokenPasswordReset) {
    //Reset the passwork and activate the account
    authDoc.workSpaces[index].password = password;
    authDoc.workSpaces[index].status = true;
    authDoc.workSpaces[index].attemptsPasswordReset = 0;
    authDoc.workSpaces[index].attemptsTokenActivationAccount = 0;
    authDoc.workSpaces[index].attemptsLogin = 0;
    await authDoc.save();
  } else {
    //Sent Generic error
    throw new GenericError([{
      message: 'Token is not valid',
      field: 'token',
      detail: 'Token is not valid',
      code: MODELERRORTEXTTYPE.is_invalid
    }]);
  }
}

  async run() {

    const { 
      email,
      keyPublic,
      password,
      passwordConfirmation,
      tokenPasswordReset
    } = this.req.body;

    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail(email);
    
    //Valida que exista un workSpaceValido registrado para este usuario
    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateOrFail({ authDoc, workSpaceDoc});

    this.authentificationValidateToken({ authDoc, index, tokenPasswordReset, password })
    this.res.status(200).json({ success: true, email});
  }
}