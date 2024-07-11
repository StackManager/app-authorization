import { RoleList } from "@Role/models/crud/role.list";

export class WorkSpaceRolesDefaults {

  async get({ workSpaceId }: { workSpaceId: string}){
    const list = new RoleList();
    list.filter.workSpaceId(workSpaceId);
    list.filter.default(true)
    list.filter.active()
    const result = await list.paginate({ page: 1, limit: 10 });
    return result.docs.map(doc => doc._id);
  }
}