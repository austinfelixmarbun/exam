import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorObj } from "./VendorObj.Model";

export class VendorHoObj {
    VendorObj: VendorObj;
    VendorAddrObj: VendorAddrObj;

    constructor()
    {
        this.VendorObj = new VendorObj();
        this.VendorAddrObj = new VendorAddrObj();
    }
}
