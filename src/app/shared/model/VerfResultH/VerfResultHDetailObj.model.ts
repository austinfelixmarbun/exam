import { VerfResultHObj } from "./VerfResultH.Model";

export class VerifResulHDetailObj {
  VerfResultHId: number;
  VerfResultHObj: VerfResultHObj;
  VerfResultDListObj: any;


  constructor() {
    this.VerfResultHObj = new VerfResultHObj();
    this.VerfResultHId = 0;
  }
}
