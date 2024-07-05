import { WorkSpaceBase } from "@WorkSpace/controller/work.space.base";
import { WorkSpaceList } from "@WorkSpace/models/crud/work.space.list";


export class WorkSpaceListService extends WorkSpaceBase {

  getSession = true;
  permissionService =  ["work_space_list"]

  async run() {

    const {id, name, page = 1, pageSize = 10, status, deleted } = this.req.query;

    const list = new WorkSpaceList();
    if (id) list.filter.id(id);
    if (name) list.filter.name(name);
    if (status) list.filter.status(status);
    if (deleted) list.filter.deleted(deleted);
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