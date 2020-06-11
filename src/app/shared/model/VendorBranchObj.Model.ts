import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorBranchMainObj } from "./VendorBranchMainObj.Model";

export class VendorBranchObj {
    
    VendorBranchMainObj: VendorBranchMainObj;
    VendorAddrObj: VendorAddrObj;

    constructor()
    {
        this.VendorBranchMainObj = new VendorBranchMainObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}