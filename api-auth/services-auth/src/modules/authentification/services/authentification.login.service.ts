import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { getPermissionsByEmailAndWorkSpaceId } from "@Authentification/models/aggregations/get.permissions.by.email.and.work.spaceId";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";
import { JWT } from "@Commons/session/jwt.session";


interface AuthentificationLoginAttrs{
  authDoc: AuthentificationDoc,
  workSpaceDoc: WorkSpaceDoc
}

export class AuthentificationLoginService extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_login"]

  async authentificationLogin({ authDoc, workSpaceDoc }: AuthentificationLoginAttrs) {
    
    const userPermissions = await getPermissionsByEmailAndWorkSpaceId({
      authId: authDoc._id.toString(),
      workSpaceId: workSpaceDoc._id.toString(),
    })

    // Aquí generamos el token JWT
    const payload = {
      id: authDoc.id,
      email: authDoc.email,
      keyPublic: workSpaceDoc.keyPublic,
      workSpaceId: workSpaceDoc._id,
      workspaces: userPermissions.workspaces,
      permissions: userPermissions.permissions
    };

    return JWT.sign({ 
       payload,
       keySecret: workSpaceDoc.keySecret,
       sessionTime: workSpaceDoc.sessionTime
    })

  }

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {
    const { 
      email,
      password
    } = this.req.body;
    
    //console.log(1, "AuthentificationLoginService")
    const workSpaceFromHeader  = new WorkSpaceFromHeader()
    const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)
    //console.log(2, "AuthentificationLoginService")
    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validateAuth = new AuthentificationData()
    validateAuth.setEmail(email);
    validateAuth.workSpaces.setPassword(password);
    //console.log(3, "AuthentificationLoginService")
    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail({ email });
    //console.log(4, "AuthentificationLoginService", authDoc, workSpaceDoc)
    //Valida que exista un workSpaceValido registrado para este usuario
    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateExistOrFail({ authDoc, workSpaceDoc});
    //console.log(5, "AuthentificationLoginService")
    // Valida la accesibilidad
    userInWorkspace.isAvailableBlocked({authDoc, index, workSpaceDoc})
    userInWorkspace.isAvailableRegisteredEmail({authDoc, index, workSpaceDoc})
    userInWorkspace.isAvailableStatus({authDoc, index, workSpaceDoc})
    userInWorkspace.isAvailableDeleted({authDoc, index, workSpaceDoc})
    //console.log(6, "AuthentificationLoginService")
    //Valida que el password coincida con el enviado
    await userInWorkspace.validatePasswordOrFail({authDoc, workSpaceDoc, index, password });
    //console.log(7, "AuthentificationLoginService")
    
    const token = await this.authentificationLogin({ authDoc,  workSpaceDoc }) 
    this.res.status(200).json({ success: true, email, token });
  }
}