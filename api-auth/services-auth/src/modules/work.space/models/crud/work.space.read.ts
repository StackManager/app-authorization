import { BaseReader } from "@Commons/crud/crud.reader.base";
import { WorkSpaceDoc } from "../interface/work.space.schema.interface";
import { WorkSpaceFilter } from "../filter/work.space.filter";
import { WorkSpacePopulate } from "../populate/work.space.populate";
import { WorkSpace } from "../work.space.model";


export class WorkSpaceRead extends BaseReader<WorkSpaceDoc> {

  filter: WorkSpaceFilter;
  populate: WorkSpacePopulate;

  constructor() {
    super("workSpaceId");
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