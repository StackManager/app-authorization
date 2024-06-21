import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
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
  async authentificationGenerateToken({ authDoc, index  }: AuthentificationGenerateTokenAttrs) {
      
      //TODO: Se debe validar si ya tiene token asignado enviar un error
      //Reset the passwork and activate the account
      authDoc.workSpaces[index].tokenPasswordReset = '1234'
      await authDoc.save();
  }

  async run() {

    const { 
      email,
      keyPublic,
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

    this.authentificationGenerateToken({ authDoc, index })
    this.res.status(200).json({ success: true, email});
  }
}