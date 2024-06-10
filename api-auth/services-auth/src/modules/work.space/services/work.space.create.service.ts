import { WorkSpaceBase } from "@WorkSpace/controller/work.space.base";
import { WorkSpace } from "@WorkSpace/models/work.space.model";


export class WorkSpaceCreateService extends WorkSpaceBase {

  getSession = false;
  getPermission = ["word_space_create"]

  async run() {
    const { 
      name,
      description,
      domain,
      keySecret,
      keyPublic,
    } = this.req.body;

    const doc = new WorkSpace ({
      name,
      description,
      domain,
      keySecret,
      keyPublic,
      status: true
    });
    
    await doc.save();
    const data = doc.toJSON();
    this.res.status(201).json({ ...data });
  }
}