import { BaseReader } from "@Commons/crud/crud.reader.base";
import { MicroWorkSpaceDoc } from "../interface/work.space.schema.interface";
import { MicroWorkSpaceFilter } from "../filter/work.space.filter";
import { MicroWorkSpacePopulate } from "../populate/work.space.populate";
import { MicroWorkSpace } from "../work.space.model";




export class WorkSpaceRead extends BaseReader<MicroWorkSpaceDoc> {

  filter: MicroWorkSpaceFilter;
  populate: MicroWorkSpacePopulate;

  constructor() {
    super("workSpaceId");
    this.filter = new MicroWorkSpaceFilter(this.filterManager);
    this.populate = new MicroWorkSpacePopulate(this.populateModules);
  }
  
  getModel(){
    return MicroWorkSpace;
  }
  
  getData(doc: MicroWorkSpaceDoc){

    return {
      name: doc.name,
    }
  }

}