import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationData } from "@Authentification/models/data/authentification.data";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { UserFindWorkspace } from "@Authentification/validations/user.find.wordspace";
import { Encrypt } from "@Commons/functions/encrypt";
import { generateRandomToken } from "@Commons/generate/numbers";
import { authEmailServiceExternal } from "@Commons/microservices/authentification/external/authentification.login";
import { emailServiceExternal } from "@Commons/microservices/email/external/email.service";
import { WorkSpaceFromHeader } from "@WorkSpace/classes/get.work.space.header";
import { Schema } from "mongoose";

interface AuthentificationCreateProfileAttrs{
  workSpaceId: Schema.Types.ObjectId,
  email: string,
  password: string,
  token: string
}

interface AuthentificationAddProfileAttrs extends AuthentificationCreateProfileAttrs{
  authDoc: AuthentificationDoc
}

export class AuthentificationRegisterService extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_register"]

  //Anade un nuevo password, y configuracion a un email ya creado
  async authentificationAddProfile({ authDoc, workSpaceId, password, token }: AuthentificationAddProfileAttrs) {

    // //Validamos que el espacio de trabajo no este asociado al email
    // const userInWorkspace = new UserFindWorkspace()
    // userInWorkspace.validateWorkSpaceNoExistOrFail({ workSpaces: authDoc.workSpaces, workSpaceId });
    // const passwordEncript = await Encrypt.toHash(password)
    // //Registra la nueva configuracion, con la cuenta desactivada
    // authDoc.workSpaces.push({
    //   workSpaceId, 
    //   password: passwordEncript,
    //   tokenActivationAccount: token,
    //   attemptsTokenActivationAccount: 0,
    //   attemptsPasswordReset: 0,
    //   attemptsLogin: 0,
    //   roleIds: [],
    //   status: true
    // });
    // authDoc.save()
  }
  
  //Crea el perfil completo del usuario 
  async authentificaCreateProfile({
    workSpaceId,
    email,
    password,
    token
  }: AuthentificationCreateProfileAttrs){
    // const passwordEncript = await Encrypt.toHash(password)
    // const authDoc = new Authentification({ 
    //   email, 
    //   workSpaces: [{ 
    //     workSpaceId, 
    //     password: passwordEncript,
    //     tokenActivationAccount: token,
    //     attemptsTokenActivationAccount: 0,
    //     attemptsPasswordReset: 0,
    //     attemptsLogin: 0,
    //     status: true
    //   }] 
    // });
    // await authDoc.save();
  }

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {
    // const { 
    //   email,
    //   password
    // } = this.req.body;

    // //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    // const validateAuth = new AuthentificationData()
    // validateAuth.setEmail(email);
    // validateAuth.workSpaces.setPassword(password);

    // const workSpaceFromHeader  = new WorkSpaceFromHeader()
    // const workSpaceDoc = await workSpaceFromHeader.getWorkSpace(this.req)
  
    // //Carga el usuario y comprueba que exista el email valido
    // const userExist = new UserExist();
    // const authDoc = await userExist.validate({ email });
    // const token = generateRandomToken(6);
    // if (authDoc){
    //   //Si el email existe añade solo un nuevo espacio de trabajo
    //   await this.authentificationAddProfile({
    //     authDoc,
    //     workSpaceId: workSpaceDoc._id,
    //     email,
    //     password,
    //     token
    //   })
    // }else{
    //   //Si no existe crea el perfil completo
    //   await this.authentificaCreateProfile({
    //     workSpaceId: workSpaceDoc._id,
    //     email,
    //     password,
    //     token
    //   })
    // }

    // await emailServiceExternal.sentEmail({
    //   recipient: email,
    //   slug: 'correo-electronico-activar-cuenta',
    //   vars: {
    //     AUTHENTIFICATIONCODE: token.toString(),
    //     AUTHENTIFICATIONNAME: email,
    //     WORKSPACENAME: workSpaceDoc?.name
    //   }
    // })


    // this.res.status(201).json({ success: true, email });
  }
}