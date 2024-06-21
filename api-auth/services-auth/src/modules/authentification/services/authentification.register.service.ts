import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { AuthentificationDoc } from "@Authentification/models/interface/authentification.schema.interface";
import { UserExist } from "@Authentification/validations/user.exist.validation";
import { MODELERRORTEXTTYPE } from "@Commons/errors/error.types";
import { GenericError } from "@Commons/errors/factory/generic.error";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";
import { Schema } from "mongoose";

interface AuthentificationCreateProfileAttrs{
  workSpaceId: Schema.Types.ObjectId,
  email: string,
  password: string
}

interface AuthentificationAddProfileAttrs extends AuthentificationCreateProfileAttrs{
  authentification: AuthentificationDoc
}

export class AuthentificationRegisterService extends AuthentificationBase {

  getSession = false;
  getPermission = ["authentification_register"]

  //Anade un nuevo password, y configuracion a un email ya creado
  async authentificationAddProfile({ authentification, workSpaceId, password }: AuthentificationAddProfileAttrs) {

    // Verifica que el usuario no este registrado en el mismo dominio
    const isRegistered = authentification.workSpaces.some(d => d.workSpaceId === workSpaceId);
    if (isRegistered) {
      throw new GenericError([{
        message: `User already registered with this workspace`,
        field: 'email',
        detail: `User already registered with this workspace`,
        code: MODELERRORTEXTTYPE.is_value_duplicated
      }]);
    }
    //Registra la nueva configuracion
    authentification.workSpaces.push({
      workSpaceId, 
      password,
      attemptsTokenActivationAccount: 0,
      attemptsPasswordReset: 0,
      attemptsLogin: 0
    });

  }
  
  //Crea el perfil completo del usuario 
  async authentificaCreateProfile({
    workSpaceId,
    email,
    password
  }: AuthentificationCreateProfileAttrs){
    const new_ = new Authentification({ 
      email, 
      workSpaces: [{ 
        workSpaceId, 
        password,
        attemptsTokenActivationAccount: 0,
        attemptsPasswordReset: 0,
        attemptsLogin: 0
      }] 
    });
    await new_.save();
  }


  //Metodo inicial para ejecutar la clase completa
  //El controlador global se encarga de gestionar las excepciones
  async run() {
    const { 
      email,
      password,
      keyPublic,
    } = this.req.body;
  
    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(keyPublic);
  
    //Comprueba que exista el email valido
    const userExist = new UserExist();
    const authDoc = await userExist.validate(email);

    if (authDoc){
      //Si el email existe añade solo un nuevo espacio de trabajo
      await this.authentificationAddProfile({
        authentification: authDoc,
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