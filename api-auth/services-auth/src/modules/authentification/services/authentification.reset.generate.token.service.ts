import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";


interface AuthentificationGenerateTokenAttrs{
  authDoc: AuthentificationDoc,
  index: number,
}

export class AuthentificationPassworResetGenerateToken extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_reset_generate_token"]

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
      }
  }

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {

    // const { 
    //   email
    // } = this.req.body;

    // //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    // const validateAuth = new AuthentificationData()
    // validateAuth.setEmail(email);

    // const workSpaceFromHeader  = new WorkSpaceFromHeader()
    // const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)

    // //Comprueba que exista el email valido
    // const userExist = new UserExist();
    // const authDoc = await userExist.validateOrFail({ email });
    
    // //Valida que exista un workSpaceValido registrado para este usuario
    // const userInWorkspace = new UserFindWorkspace()
    // const {index} = userInWorkspace.validateExistOrFail({ authDoc, workSpaceDoc});
    // userInWorkspace.isAvailableBlocked({authDoc, index, workSpaceDoc})
    // userInWorkspace.isAvailableRegisteredEmail({authDoc, index, workSpaceDoc})
    // userInWorkspace.isAvailableStatus({authDoc, index, workSpaceDoc})
    // userInWorkspace.isAvailableDeleted({authDoc, index, workSpaceDoc})
    
    // await this.authentificationGenerateTokenReset({ authDoc, index })
    // this.res.status(200).json({ success: true, email });
  }
}