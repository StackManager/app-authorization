import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { Authentification } from "@Authentification/models/authentification.model";
import { generateSlug } from "@Commons/format/string";
import { Encrypt } from "@Commons/functions/encrypt";
import { Permission } from "@Permission/models/permission.model";
import { Role } from "@Role/models/role.model";
import { WorkSpace } from "@WorkSpace/models/work.space.model";
import { Schema } from 'mongoose';

export class AuthentificationCreateRole extends AuthentificationBase {

  getSession = false;
  permissionService =  ["authentification_register"]

  

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */

  async createAuthentification (){

    const {
      SYSTEM_KEY_PUBLIC,
      SYSTEM_KEY_PRIVATE
    } = process.env;

    const workSpaceDoc = new WorkSpace ({
      name: "Authentification system",
      description:"Authentification system",
      domain: "localhost.com",
      keySecret: SYSTEM_KEY_PRIVATE,
      keyPublic: SYSTEM_KEY_PUBLIC,
      status: true
    });

    await workSpaceDoc.save();

    //CREATE PERMISSIONS
    const permission: Schema.Types.ObjectId[] = [];
    const names = [
      "word_space_create", 
      "work_space_deleted", 
      "word_space_edit", 
      "work_space_list", 
      "work_space_update_status",
      "permission_work_space_create",
      "permission_work_space_deleted",
      "permission_work_space_edit",
      "permission_work_space_list",
      "permission_work_space_update_status",
      "role_work_space_create",
      "role_work_space_deleted",
      "role_work_space_edit",
      'role_work_space_list',
      "role_work_space_update_status",
      "role_work_space_permission_add",
      "role_work_space_permission_delete",
      "role_work_space_default_register"
    ];
    
    names.forEach(async (name) => {
      const doc = new Permission({ name, slug: name, status: true, workSpaceId: workSpaceDoc._id });
      permission.push(doc._id);
      await doc.save();
    });
    
    //CREATE ROLES
    const role = new Role ({
      name: "Admin",
      slug: "Admin",
      workSpaceId: workSpaceDoc._id,
      permissions: permission,
      status: true
    });
        
    await role.save();

    const roleII = new Role ({
      name: "User",
      slug: "user",
      workSpaceId: workSpaceDoc._id,
      permissions:[],
      status: true
    });
    
    await roleII.save();

    return {
      role: role._id,
      wp: workSpaceDoc._id
    }

  }

  async createWorkSpaceExample(){

    const {
      SYSTEM_KEY_PUBLIC,
      SYSTEM_KEY_PRIVATE
    } = process.env;

    const workSpaceDocI = new WorkSpace ({
      name: "Authentification system II",
      description:"Authentification system",
      domain: "localhosts.com",
      keySecret: SYSTEM_KEY_PRIVATE+"178923",
      keyPublic: SYSTEM_KEY_PUBLIC+"789123",
      status: true
    });

    await workSpaceDocI.save();
  }


  async createWorkSpaceEmail (){

    const workSpaceDoc = new WorkSpace ({
      name: "Email Manager",
      description:"Manejador de correos electronicos",
      domain: "authentification.com",
      keySecret: "E[6X:[a(m%(M2J)%(*m^k=3*NP4AJQ.gNc2+A<[c+e%k<)",
      keyPublic: "n]XB[}5yJS@QzP@ymNx1C)8KSWfAUCV68N8!4h%x<l+o(X",
      status: true
    });

    await workSpaceDoc.save();

    //CREATE PERMISSIONS
    const permissionEmail: Schema.Types.ObjectId[] = [];
    const namesEmail = [
      "word_space_email_create", 
      "work_space_email_deleted", 
      "word_space_email_edit", 
      "work_space_email_list", 
      "work_space_email_update_status",
      "email_schedule_create",
      "email_schedule_delete",
      "email_schedule_list"
    ];

    namesEmail.forEach(async (name) => {
      const doc = new Permission({ name, slug: name, status: true, workSpaceId: workSpaceDoc._id });
      permissionEmail.push(doc._id);
      await doc.save();
    });

    //CREATE ROLES
    const role = new Role ({
      name: "Admin",
      slug: "Admin",
      workSpaceId: workSpaceDoc._id,
      permissions: permissionEmail,
      status: true
    });
    await role.save();

    return {
      role: role._id,
      wp: workSpaceDoc._id
    }

  }

  async createWorkSpaceImage (){

    const workSpaceDoc = new WorkSpace ({
      name: "Images Manager",
      description:"Manejador de imagenes",
      domain: "imagenes.com",
      keySecret: "E[XD:[a(5%(M2J)%(*m^k=3*N44.AJQ.gNc2+A<[c+e%k<Z",
      keyPublic: "n]XD[}5yJ1@QzP@ymNx1C)8KSW3A.UC168N8!4h%x<l+o(Z",
      status: true
    });

    await workSpaceDoc.save();

    //CREATE PERMISSIONS
    const permissionEmail: Schema.Types.ObjectId[] = [];
    const namesEmail = [
      "word_space_images_create", 
      "work_space_images_deleted", 
      "work_space_images_list", 
    ];

    namesEmail.forEach(async (name) => {
      const doc = new Permission({ name, slug: name, status: true, workSpaceId: workSpaceDoc._id });
      permissionEmail.push(doc._id);
      await doc.save();
    });

    //CREATE ROLES
    const role = new Role ({
      name: "Admin",
      slug: "Admin",
      workSpaceId: workSpaceDoc._id,
      permissions: permissionEmail,
      status: true
    });
    await role.save();

    
    return {
      role: role._id,
      wp: workSpaceDoc._id
    }

  }

  async run() {

    const wpAuth = await this.createAuthentification()
    const wpAuthE = await this.createWorkSpaceExample()
    const wpEmail = await this.createWorkSpaceEmail()
    const wpImage = await this.createWorkSpaceImage() 

    const passwordEncriptEmail = await Encrypt.toHash("Angel1986*")
    const authenticationStandar = {
      password: passwordEncriptEmail,
      tokenActivationAccount: "1234",
      attemptsTokenActivationAccount: 0,
      attemptsPasswordReset: 0,
      attemptsLogin: 0,
      status: true,
      registeredEmail: true
    }


    const createAuth = new Authentification({ 
      email: "managerstack.oficial@gmail.com",
      workSpaces: [
      { 
        roleIds: [wpAuth.role],
        workSpaceId: wpAuth.wp,
        ...authenticationStandar
      },  
      { 
        roleIds: [wpEmail.role],
        workSpaceId: wpEmail.wp,
        ...authenticationStandar
      },
      { 
        roleIds: [wpImage.role],
        workSpaceId: wpImage.wp,
        ...authenticationStandar
      }
    ]
    });
    await createAuth.save()


    this.res.status(201).json({ success: true });
  }
}