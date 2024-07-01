import { AuthentificationBase } from "@Authentification/controller/authentification.base";
import { AuthentificationList } from "@Authentification/models/crud/authentification.list";


export class AuthentificationListService extends AuthentificationBase {

  getSession = false;
  getPermission = ["authentification_space_list"]

  /**
   *  Metodo inicial para ejecutar la clase completa
   *  El controlador global se encarga de gestionar las excepciones
   */
  async run() {

    const {id, name, page = 1, pageSize = 10, status, deleted } = this.req.query;

    const list = new AuthentificationList();
    if (id) list.filter.id(id);
    //if (name) list.filter.name(name);
    //if (status) list.filter.status(status);
    //if (deleted) list.filter.deleted(deleted);
    const result = await list.paginate({ 
      page, 
      limit: pageSize
    });

    this.res.status(200).json({
      elements: result.docs,
      total: result.totalDocs
    });
  }
}