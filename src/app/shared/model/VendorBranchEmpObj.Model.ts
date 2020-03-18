import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorEmpObj } from "./VendorEmpObj.Model";

export class VendorBranchEmpObj {
    VendorEmpObj: VendorEmpObj;
    VendorAddrObj: VendorAddrObj;

    constructor()
    {
        this.VendorEmpObj = new VendorEmpObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}
