import { WorkSpaceBase } from "@WorkSpace/controller/work.space.base";
import { WorkSpaceRead } from "@WorkSpace/models/crud/work.space.read";


export class WorkSpaceDeletedService extends WorkSpaceBase {

  getSession = true;
  getPermission = ["work_space_deleted"]
  read: WorkSpaceRead = new WorkSpaceRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    //Get the instance with read
    const doc = await this.read.getById(id);
    //Update status
    doc.deleted = !doc.deleted;
    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({status: doc.status});
  }
}