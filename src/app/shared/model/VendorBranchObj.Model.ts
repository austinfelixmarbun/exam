import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorBranchMainObj } from "./VendorBranchMainObj.Model";
import { VendorAttrContentObj } from "./VendorAttrContentObj.Model";

export class VendorBranchObj {
    
    VendorBranchMainObj: VendorBranchMainObj;
    VendorAddrObj: VendorAddrObj;
    VendorAttrContentObjs : VendorAttrContentObj;
    constructor()
    {
        this.VendorBranchMainObj = new VendorBranchMainObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}