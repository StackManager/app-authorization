import { BaseReader } from "@Commons/crud/crud.reader.base";
import { AuthentificationDoc } from "../interface/authentification.schema.interface";
import { AuthentificationFilter } from "../filter/authentification.filter";
import { AuthentificationPopulate } from "../populate/authentification.populate";
import { Authentification } from "../authentification.model";


export class AuthentificationRead extends BaseReader<AuthentificationDoc> {

  filter: AuthentificationFilter;
  populate: AuthentificationPopulate;

  constructor() {
    super("AuthentificationId");
    this.filter = new AuthentificationFilter(this.filterManager);
    this.populate = new AuthentificationPopulate(this.populateModules);
  }
  
  getModel(){
    return Authentification;
  }
  
  getData(doc: AuthentificationDoc){

    return {
      name: doc.email,
    }
  }

}