import { BaseList } from "@Commons/crud/crud.list.base";
import { MicroWorkSpaceDoc } from "../interface/work.space.schema.interface";
import { MicroWorkSpace } from "../work.space.model";
import { MicroWorkSpaceFilter } from "../filter/work.space.filter";
import { MicroWorkSpacePopulate } from "../populate/work.space.populate";


export class MicroWorkSpaceList extends BaseList<MicroWorkSpaceDoc> {

  filter: MicroWorkSpaceFilter;
  populate: MicroWorkSpacePopulate;

  constructor() {
    super("WorkSpace");
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