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
  async run() {

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

    
    const workSpaceDocI = new WorkSpace ({
      name: "Authentification system",
      description:"Authentification system",
      domain: "localhosts.com",
      keySecret: SYSTEM_KEY_PRIVATE+"178923",
      keyPublic: SYSTEM_KEY_PUBLIC+"789123",
      status: true
    });

    await workSpaceDocI.save();

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
      "role_work_space_update_status"
    ];

    names.forEach(async (name) => {
      const doc = new Permission({ name, slug: name, status: true });
      permission.push(doc._id);
      await doc.save();
    });
    
    //CREATE ROLES
    const roleI = new Role ({
      name: "Admin",
      slug: "Admin",
      workSpaceId: workSpaceDoc._id,
      permissions: permission,
      status: true
    });
    
    await roleI.save();

    const roleII = new Role ({
      name: "User",
      slug: "user",
      workSpaceId: workSpaceDoc._id,
      permissions:[],
      status: true
    });
    
    await roleII.save();

    const passwordEncript = await Encrypt.toHash("Angel1986*")
    const authDoc = new Authentification({ 
      email: "angel0@gmail.com", 
      workSpaces: [{ 
        roleIds: [roleI._id],
        workSpaceId: workSpaceDoc._id,
        password: passwordEncript,
        tokenActivationAccount: "1234",
        attemptsTokenActivationAccount: 0,
        attemptsPasswordReset: 0,
        attemptsLogin: 0,
        status: true
      }]
    });
    await authDoc.save()

    const authDocII = new Authentification({ 
      email: "angel1@gmail.com", 
      workSpaces: [{ 
        roleIds: [roleII._id],
        workSpaceId: workSpaceDoc._id,
        password: passwordEncript,
        tokenActivationAccount: "1234",
        attemptsTokenActivationAccount: 0,
        attemptsPasswordReset: 0,
        attemptsLogin: 0,
        status: true
      }] 
    });
    await authDocII.save()

    this.res.status(201).json({ success: true });
  }
}