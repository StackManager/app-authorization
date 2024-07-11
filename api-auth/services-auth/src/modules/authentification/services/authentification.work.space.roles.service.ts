import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";
import { WorkSpaceData } from "@WorkSpace/models/data/work.space.data";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";

interface AuthentificationLoginAttrs{
  authDoc: AuthentificationDoc,
  workSpaceDoc: WorkSpaceDoc
}

export class AuthentificationWorkSpaceRolesService extends AuthentificationBase {

  getSession = true;
  permissionService =  [] //"authentification_work_space_roles"

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {
    const { 
      keyPrivate,
      id
    } = this.req.body;
  
    //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    const validateWork = new WorkSpaceData()
    validateWork.setKeySecret(keyPrivate);

    const workSpaceFromHeader  = new WorkSpaceFromHeader()
    const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail({ _id: id });
    
    //Valida que exista un workSpaceValido registrado para este usuario
    //const userInWorkspace = new UserFindWorkspace()
    //const {index} = userInWorkspace.validateExistOrFail({ authDoc, workSpaceDoc});


    this.res.status(200).json({ success: true });
  }
}