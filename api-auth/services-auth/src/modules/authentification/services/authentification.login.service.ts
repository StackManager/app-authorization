import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { JWT } from "@Commons/session/jwt.session";
import { WorkSpaceData } from "@WorkSpace/models/data/work.space.data";
import { WorkSpaceDoc } from "@WorkSpace/models/interface/work.space.schema.interface";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";


interface AuthentificationLoginAttrs{
  authDoc: AuthentificationDoc,
  workSpaceDoc: WorkSpaceDoc
}

export class AuthentificationLoginService extends AuthentificationBase {

  getSession = false;
  getPermission = ["word_space_create"]

  authentificationLogin({ authDoc, workSpaceDoc }: AuthentificationLoginAttrs) {
    // Aquí generamos el token JWT
    const payload = {
      id: authDoc.id,
      email: authDoc.email,
      //permissions: this.getPermission
    };

    return JWT.sign({ payload, keySecret: workSpaceDoc.keySecret })

  }

  //Metodo inicial para ejecutar la clase completa
  //El controlador global se encarga de gestionar las excepciones
  async run() {
    const { 
      email,
      keyPublic,
      password
    } = this.req.body;
  
    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validateAuth = new AuthentificationData()
    validateAuth.setEmail(email);
    validateAuth.workSpaces.setPassword(password);

    //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    const validateWork = new WorkSpaceData()
    validateWork.setKeyPublic(keyPublic);

    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);

    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validateOrFail(email);
    
    //Valida que exista un workSpaceValido registrado para este usuario
    const userInWorkspace = new UserFindWorkspace()
    const {index} = userInWorkspace.validateOrFail({ authDoc, workSpaceDoc});
    //Valida que el password coincida con el enviado
    await userInWorkspace.validatePasswordOrFail({authDoc, index, password });

    const token = this.authentificationLogin({ authDoc,  workSpaceDoc })
    this.res.status(200).json({ success: true, email, token });
  }
}