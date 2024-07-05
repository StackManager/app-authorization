import { RoleBase } from "@Role/controller/role.base";
import { RoleData } from "@Role/models/data/role.data";
import { WorkSpace } from "@WorkSpace/models/work.space.model";


export class RoleWorkSpaceCreateService extends RoleBase {

  getSession = true;
  permissionService =  ["role_work_space_create"]

  async run() {
    const { 
      name,
      workSpaceId
    } = this.req.body;


    //Validamos los datos que proceden del request body, y que seran asignandos authentificacion
    const validate = new RoleData()
    validate.setName(name);
    validate.setWorkSpaceId(workSpaceId);

    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    // TODO: Validar que el lugar desde donde se crea sea valido, el origin o IP

    const doc = new WorkSpace ({
      name,
      slug: validate.getSlug(),
      workSpaceId,
      status: true
    });
    
    await doc.save();
    const data = doc.toJSON();
    this.res.status(201).json({ ...data });
  }
}