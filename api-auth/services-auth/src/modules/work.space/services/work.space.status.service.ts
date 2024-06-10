import { WorkSpaceBase } from "@WorkSpace/controller/work.space.base";
import { WorkSpaceRead } from "@WorkSpace/models/crud/work.space.read";


export class WorkSpaceStatusService extends WorkSpaceBase {

  getSession = false;
  getPermission = ["work_space_update_status"]
  read: WorkSpaceRead = new WorkSpaceRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    //Get the instance with read
    const doc = await this.read.getById(id);
    //Update status
    doc.status = !doc.status;
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({name: doc.name, status: doc.status});
  }
}