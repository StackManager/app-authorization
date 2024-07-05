import { RoleBase } from "@Role/controller/role.base";
import { RoleRead } from "@Role/models/crud/role.read";
import { RoleData } from "@Role/models/data/role.data";

export class RoleWorkSpaceEditService extends RoleBase {

  getSession = true;
  permissionService =  ["role_work_space_edit"]
  read: RoleRead = new RoleRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    const { 
      name,
    } = this.req.body;


    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validate = new RoleData()
    validate.setName(name);
    validate.setId(id);

    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    // TODO: Validar que el lugar desde donde se crea sea valido, el origin o IP
    //Get the instance with read
    const doc = await this.read.getById(id);
    //Edit
    doc.name = name;
    doc.slug = validate.getSlug()
    
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({name: doc.name, status: doc.status});
  }
}