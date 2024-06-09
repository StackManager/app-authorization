import { WorkSpaceBase } from "@WorkSpace/controller/work.space.base";
import { WorkSpaceRead } from "@WorkSpace/models/crud/work.space.read";


export class WorkSpaceEditService extends WorkSpaceBase {

  getSession = true;
  getPermission = ["word_space_edit"]
  read: WorkSpaceRead = new WorkSpaceRead();

  async run() {
    //Get the id params
    const {id} = this.req.params;
    const { 
      name,
      description,
      domain,
      keySecret,
      keyPublic,
    } = this.req.body;
    //Get the instance with read
    const doc = await this.read.getById(id);
    //Edit
    doc.name = name;
    doc.description = description
    doc.domain = domain
    doc.keySecret = keySecret
    doc.keyPublic = keyPublic

    //Save and validate the changes
    await doc.save();
    // Response 
    this.res.status(200).json({status: doc.status});
  }
}