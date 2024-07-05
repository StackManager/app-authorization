import { PermissionBase } from "@Permission/controller/permission.base";
import { PermissionList } from "@Permission/models/crud/permission.list";


export class PermissionListService extends PermissionBase {
  getSession = true;
  permissionService =  ['permission_work_space_list'];

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
    const list = new PermissionList();
    if (id) list.filter.id(id);
    if (name) list.filter.name(name);
    if (status) list.filter.status(status);
    if (deleted) list.filter.deleted(deleted);

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
