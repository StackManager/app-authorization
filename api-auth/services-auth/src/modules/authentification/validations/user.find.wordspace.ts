import { AuthentificationDoc, WorkSpacesAttrs } from "@Authentification/models/interface/authentification.schema.interface";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { Encrypt } from "@Commons/functions/encrypt";
import { WorkSpaceRolesDefaults } from "@WorkSpace/classes/work.space.roles.default";
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
  workSpaceDoc: WorkSpaceDoc,
  password: string,
}

interface ValidateWorkSpaceNoExistOrFailAttrs{
  workSpaces:  WorkSpacesAttrs[],
  workSpaceId: Schema.Types.ObjectId,
}

interface IsAvailableAuthentification{
  index: number,
  authDoc: AuthentificationDoc,
  workSpaceDoc: WorkSpaceDoc,
}

interface ValidateActivationOrFail{
  authDoc: AuthentificationDoc,
  index: number,
  workSpaceDoc: WorkSpaceDoc,
  tokenActivationAccount: string
}

interface AuthentificationValidateTokenAttrs{
  authDoc: AuthentificationDoc,
  index: number,
  tokenPasswordReset: string,
  password: string,
  workSpaceDoc: WorkSpaceDoc,
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

  async validatePasswordOrFail({ index, authDoc, workSpaceDoc, password }: ValidatePasswordOrFailAttrs){
    // If an index exists, then check if the tokens match
    const storePassword = authDoc.workSpaces[index].password
    const comparation = await Encrypt.compare(storePassword, password)
    if (!comparation) {

      authDoc.workSpaces[index].attemptsLogin = authDoc.workSpaces[index].attemptsLogin + 1
      
      if (authDoc.workSpaces[index].attemptsLogin >= workSpaceDoc.maxAttemptsLogin) {
        // Obtenemos la fecha actual
        const currentDate = new Date();
    
        // Sumamos los minutos a la fecha actual
        const minutesBlocked = workSpaceDoc.minutesBlockedByMaxAttemptsLogin;
        authDoc.workSpaces[index].dateBlock = new Date(currentDate.getTime() + minutesBlocked * 60000);
    
      }
      
      await authDoc.save()

      throw new GenericError([{
        message: 'Password is not valid',
        field: 'password',
        detail: 'Password is not valid',
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
  }


  /**
 * Validates the token for user authentication within a workspace.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.authDoc - The document associated with the user's registration.
 * @param {Object} params.index - Index workspace to make the changes.
 * @param {string} params.tokenActivation - The token sent from the client.
 * @throws {GenericError} Throws an error if the token is invalid or if the user is not registered with the workspace.
 */
  async validateActivationOrFail({ authDoc, index, workSpaceDoc, tokenActivationAccount }: ValidateActivationOrFail) {

    // If an index exists, then check if the status and token is valid
    if (authDoc.workSpaces[index].registeredEmail || authDoc.workSpaces[index].tokenActivationAccount == "" ) {      
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


      if (authDoc.workSpaces[index].attemptsTokenActivationAccount >= workSpaceDoc.maxAttemptsTokenActivationAccount) {
        // Obtenemos la fecha actual
        const currentDate = new Date();
    
        // Sumamos los minutos a la fecha actual
        const minutesBlocked = workSpaceDoc.minutesBlockedByMaxAttemptsTokenActivationAccount;
        authDoc.workSpaces[index].dateBlock = new Date(currentDate.getTime() + minutesBlocked * 60000);
    
      }

      await authDoc.save();
      throw new GenericError([{
        message: 'Token is not valid',
        field: 'token',
        detail: 'Token is not valid',
        code: MODELERRORTEXTTYPE.is_invalid
      }]);
    }
    
    const workSpaceRoles = new WorkSpaceRolesDefaults()
    const defaults = await workSpaceRoles.get({ workSpaceId: workSpaceDoc._id})

    authDoc.workSpaces[index].roleIds = defaults;
    authDoc.workSpaces[index].registeredEmail = true;
    await authDoc.save();

  }

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
  async validateTokenResetOrFail({ authDoc, index, tokenPasswordReset, password, workSpaceDoc }: AuthentificationValidateTokenAttrs) {

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
      if (authDoc.workSpaces[index].attemptsPasswordReset >= workSpaceDoc.maxAttemptsPasswordReset ) {
        // Obtenemos la fecha actual
        const currentDate = new Date();
    
        // Sumamos los minutos a la fecha actual
        const minutesBlocked = workSpaceDoc.minutesBlockedByMaxAttemptsPasswordReset;
        authDoc.workSpaces[index].dateBlock = new Date(currentDate.getTime() + minutesBlocked * 60000);
    
      }

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

  isAvailableStatus ({ authDoc, index }: IsAvailableAuthentification) {
    if (authDoc.workSpaces[index].status == false){
      throw new GenericError([{
        message: `Access no authorizated in this workspace`,
        field: 'email',
        detail: `Access no authorizated in this workspace`,
        code: MODELERRORTEXTTYPE.is_blocked
      }]);
    }
  }

  isAvailableDeleted ({ authDoc, index }: IsAvailableAuthentification) {

    if (authDoc.workSpaces[index].deleted == true){
      throw new GenericError([{
        message: `Access no authorizated in this workspace`,
        field: 'email',
        detail: `Access no authorizated in this workspace`,
        code: MODELERRORTEXTTYPE.is_blocked
      }]);
    }
  }

  isAvailableBlocked ({ authDoc, index }: IsAvailableAuthentification) {
    const now = Date.now();
    const dateBlock = authDoc.workSpaces[index].dateBlock;
    if (dateBlock && dateBlock instanceof Date && dateBlock.getTime() >= now) {
      throw new GenericError([{
        message: `Access no authorizated in this workspace`,
        field: 'email',
        detail: `Access no authorizated in this workspace`,
        code: MODELERRORTEXTTYPE.is_blocked
      }]);
    }
  }

  isAvailableRegisteredEmail ({ authDoc, index }: IsAvailableAuthentification) {
    if (authDoc.workSpaces[index].registeredEmail == false){
      throw new GenericError([{
        message: `Registration activation needed`,
        field: 'email',
        detail: `Registration activation needed`,
        code: MODELERRORTEXTTYPE.is_blocked
      }]);
    }
  }
}
