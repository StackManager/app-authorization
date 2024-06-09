import { FilterManager, FilterOptions } from "@Commons/crud/crud.filter.base";

export class WorkSpaceFilter {

  filterManager: FilterManager;

  constructor(filterManager: FilterManager){
    this.filterManager = filterManager;
  }

  id(value: any): void{
    const filter: FilterOptions =  { value, key: "_id" };
    this.filterManager.addFilter(filter);
  }

  name(value: any): void{
    const filter: FilterOptions =  { value, key: "name", type: 'regex' };
    this.filterManager.addFilter(filter);
  }

  status(deleted: any): void{
    const filter: FilterOptions =  { value: deleted, key: "status" };
    this.filterManager.addFilter(filter);
  }

  deleted(status: any): void{
    const filter: FilterOptions =  { value: status, key: "deleted" };
    this.filterManager.addFilter(filter);
  }

  active(){
    this.deleted(false);
    this.status(true);
  }
}