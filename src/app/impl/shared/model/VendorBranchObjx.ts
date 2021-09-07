import { VendorBranchObj } from "app/shared/model/VendorBranchObj.Model";

export class VendorBranchObjX{
    VendorBranchObj: VendorBranchObj;
    RequestRFAObj : any;

    constructor(){
        this.VendorBranchObj = new VendorBranchObj();
    }
}