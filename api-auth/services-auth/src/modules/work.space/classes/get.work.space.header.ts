import { Request } from 'express';
import { WorkSpaceData } from "@WorkSpace/models/data/work.space.data";
import { WorkSpaceExist } from "@WorkSpace/validations/work.space.exist.validation";
import { WorkSpaceDoc } from '@WorkSpace/models/interface/work.space.schema.interface';


export class WorkSpaceFromHeader{

  async getWorkSpace (req: Request): Promise<WorkSpaceDoc>{
    const keyPublic = req.headers['key-public'];

    //Validadmos los datos que proceden del request body, y que pertenecen a workspace
    const validateWork = new WorkSpaceData()
    validateWork.setKeyPublic(keyPublic);

    //Comprueba que exista el workspace valido o fall
    const workSpaceExist = new WorkSpaceExist();
    const workSpaceDoc = await workSpaceExist.validateOrFail(validateWork.getKeyPublic());

    return workSpaceDoc
  }

}

