import { BaseList } from "@Commons/crud/crud.list.base";
import { WorkSpaceDoc } from "../interface/work.space.schema.interface";
import { WorkSpaceFilter } from "../filter/work.space.filter";
import { WorkSpacePopulate } from "../populate/work.space.populate";
import { WorkSpace } from "../work.space.model";

export class WorkSpaceList extends BaseList<WorkSpaceDoc> {

  filter: WorkSpaceFilter;
  populate: WorkSpacePopulate;

  constructor() {
    super("WorkSpace");
    this.filter = new WorkSpaceFilter(this.filterManager);
    this.populate = new WorkSpacePopulate(this.populateModules);
  }
  
  getModel(){
    return WorkSpace;
  }

  getData(doc: WorkSpaceDoc){

    return {
      name: doc.name,
    }
  }

}