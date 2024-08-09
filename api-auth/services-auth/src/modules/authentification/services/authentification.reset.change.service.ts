import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { WorkSpacesData } from "@Authentification/models/data/work.spaces.data";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";


export class AuthentificationPassworResetChange extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_reset_change"]

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {

    // const { 
    //   email,
    //   password,
    //   tokenPasswordReset
    // } = this.req.body;

    // const workSpaceFromHeader  = new WorkSpaceFromHeader()
    // const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)

    // //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    // const validateAuth = new AuthentificationData()
    // validateAuth.workSpaces.setPassword(password);

    // //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    // const validateWork = new WorkSpacesData()
    // validateWork.setTokenPasswordReset(tokenPasswordReset);

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
    // await userInWorkspace.validateTokenResetOrFail({ authDoc, index, tokenPasswordReset, password, workSpaceDoc })
    // this.res.status(200).json({ success: true, email});
  }
}