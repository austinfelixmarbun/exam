import { VerifResulHDetailObj } from "../../VerfResultH/VerfResultHDetailObj.model";

export class ReqUpdateSrvyTaskAndAddVerfResultHDObj {
  VerfResultHD: VerifResulHDetailObj;
  SrvyTaskId: number;

  constructor() {
    this.VerfResultHD = new VerifResulHDetailObj();
  }
}