import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorAttrContentObj } from "./VendorAttrContentObj.Model";
import { VendorObj } from "./VendorObj.Model";

export class VendorHoObj {
    VendorObj: VendorObj;
    VendorAddrObj: VendorAddrObj;
    VendorAttrContentObjs : Array<VendorAttrContentObj>;

    constructor()
    {
        this.VendorObj = new VendorObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}
