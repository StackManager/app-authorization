import { RoleBase } from "@Role/controller/role.base";
import { RoleList } from "@Role/models/crud/role.list";


export class RoleWorkSpaceListService extends RoleBase {
  getSession = true;
  permissionService =  ['role_work_space_list'];

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {
    const {
      id,
      name,
      page = 1,
      pageSize = 10,
      status,
      deleted,
    } = this.req.query;

    const { workSpaceId } = this.req.params
    
    // TODO: Validar que el usuario tenga permisos para crear en este workspaceID
    // TODO: Validar que el lugar desde donde se crea sea valido, el origin o IP
    const list = new RoleList();
    if (id) list.filter.id(id);
    if (name) list.filter.name(name);
    if (status) list.filter.status(status);
    if (deleted) list.filter.deleted(deleted);
    list.filter.workSpaceId(workSpaceId);
    const result = await list.paginate({
      page,
      limit: pageSize,
    });

    this.res.status(200).json({
      elements: result.docs,
      total: result.totalDocs,
    });
  }
}
