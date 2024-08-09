import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { authServiceExternal } from "@Commons/microservices/authentification/external/authentification.login";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";

export class AuthentificationRegisterActivateService extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_register_activate"]

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {
    // const { 
    //   email,
    //   tokenActivationAccount
    // } = this.req.body;

    // //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    // const validateAuth = new AuthentificationData()
    // validateAuth.setEmail(email);
    // validateAuth.workSpaces.setTokenActivationAccount(tokenActivationAccount);

    // const workSpaceFromHeader  = new WorkSpaceFromHeader()
    // const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)

    // //Comprueba que exista el email valido
    // const userExist = new UserExist();
    // const authDoc = await userExist.validateOrFail({ email });

    // const userInWorkspace = new UserFindWorkspace()
    // const {index} = userInWorkspace.validateExistOrFail({ authDoc, workSpaceDoc});
    // userInWorkspace.isAvailableBlocked({authDoc, index, workSpaceDoc})
    // userInWorkspace.isAvailableDeleted({authDoc, index, workSpaceDoc})
    // await userInWorkspace.validateActivationOrFail({ authDoc, index, tokenActivationAccount, workSpaceDoc })
    
    // this.res.status(200).json({ success: true, email });
  }
}