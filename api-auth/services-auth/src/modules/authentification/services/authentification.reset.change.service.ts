import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { WorkSpacesData } from "@Authentification/models/data/work.spaces.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { Encrypt } from "@Commons/functions/encrypt";
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
async authentificationValidateTokenReset({ authDoc, index, tokenPasswordReset, password }: AuthentificationValidateTokenAttrs) {

  // If an index exists, then check if the tokens match
  if (authDoc?.workSpaces[index]?.tokenPasswordReset === tokenPasswordReset &&
    authDoc?.workSpaces[index]?.tokenPasswordReset != ""
  ) {
    //Reset the passwork and activate the account
    const passwordEncript = await Encrypt.toHash(password)
    authDoc.workSpaces[index].password = passwordEncript;
    authDoc.workSpaces[index].status = true;
    authDoc.workSpaces[index].attemptsPasswordReset = 0;
    authDoc.workSpaces[index].attemptsTokenActivationAccount = 0;
    authDoc.workSpaces[index].attemptsLogin = 0;
    authDoc.workSpaces[index].tokenPasswordReset = "";
    await authDoc.save();
  } else {
    authDoc.workSpaces[index].attemptsPasswordReset = authDoc.workSpaces[index].attemptsPasswordReset + 1
    await authDoc.save();
    //Sent Generic error
    throw new GenericError([{
      message: 'Token to reset password is not valid',
      field: 'token',
      detail: 'Token to reset password is not valid',
      code: MODELERRORTEXTTYPE.is_invalid
    }]);
  }
}

  async run() {

    const { 
      email,
      keyPublic,
      password,
      tokenPasswordReset
    } = this.req.body;

    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validateAuth = new AuthentificationData()
    validateAuth.workSpaces.setPassword(password);

    //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    const validateWork = new WorkSpacesData()
    validateWork.setTokenPasswordReset(tokenPasswordReset);

    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail(email);
    
    //Valida que exista un workSpaceValido registrado para este usuario
    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateOrFail({ authDoc, workSpaceDoc});

    await this.authentificationValidateTokenReset({ authDoc, index, tokenPasswordReset, password })
    this.res.status(200).json({ success: true, email});
  }
}