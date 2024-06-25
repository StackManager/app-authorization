import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { Encrypt } from "@Commons/functions/encrypt";
import { generateRandomToken } from "@Commons/generate/numbers";
import { WorkSpaceData } from "@WorkSpace/models/data/work.space.data";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";
import { Schema } from "mongoose";

interface AuthentificationCreateProfileAttrs{
  workSpaceId: Schema.Types.ObjectId,
  email: string,
  password: string
}

interface AuthentificationAddProfileAttrs extends AuthentificationCreateProfileAttrs{
  authDoc: AuthentificationDoc
}

export class AuthentificationRegisterService extends AuthentificationBase {

  getSession = false;
  getPermission = ["authentification_register"]

  //Anade un nuevo password, y configuracion a un email ya creado
  async authentificationAddProfile({ authDoc, workSpaceId, password }: AuthentificationAddProfileAttrs) {

    //Validamos que el espacio de trabajo no este asociado al email
    const userInWorkspace = new UserFindWorkspace()
    userInWorkspace.validateWorkSpaceNoExistOrFail({ workSpaces: authDoc.workSpaces, workSpaceId });

    //Registra la nueva configuracion, con la cuenta desactivada
    authDoc.workSpaces.push({
      workSpaceId, 
      password,
      tokenActivationAccount: generateRandomToken(6),
      attemptsTokenActivationAccount: 0,
      attemptsPasswordReset: 0,
      attemptsLogin: 0
    });
    authDoc.save()
  }
  
  //Crea el perfil completo del usuario 
  async authentificaCreateProfile({
    workSpaceId,
    email,
    password
  }: AuthentificationCreateProfileAttrs){
    const passwordEncript = await Encrypt.toHash(password)
    const authDoc = new Authentification({ 
      email, 
      workSpaces: [{ 
        workSpaceId, 
        password: passwordEncript,
        tokenActivationAccount: generateRandomToken(6),
        attemptsTokenActivationAccount: 0,
        attemptsPasswordReset: 0,
        attemptsLogin: 0
      }] 
    });
    await authDoc.save();
  }

  //Metodo inicial para ejecutar la clase completa
  //El controlador global se encarga de gestionar las excepciones
  async run() {
    const { 
      email,
      password,
      keyPublic,
    } = this.req.body;

    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validateAuth = new AuthentificationData()
    validateAuth.setEmail(email);
    validateAuth.workSpaces.setPassword(password);

    //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    const validateWork = new WorkSpaceData()
    validateWork.setKeyPublic(keyPublic);
    
    //Carga el workspace y comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);
  
    //Carga el usuario y comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validate(email);

    if (authDoc){
      //Si el email existe añade solo un nuevo espacio de trabajo
      await this.authentificationAddProfile({
        authDoc,
        workSpaceId: workSpaceDoc._id,
        email,
        password
      })
    }else{
      //Si no existe crea el perfil completo
      await this.authentificaCreateProfile({
        workSpaceId: workSpaceDoc._id,
        email,
        password
      })
    }

    this.res.status(201).json({ success: true, email });
  }
}