import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorObj } from "./VendorObj.Model";
import { VendorContactPersonObj } from "./VendorContactPersonObj.Model";

export class AuctionCompanyObj {
    VendorObj: VendorObj;
    VendorAddrObj: VendorAddrObj;
    VendorContactPersonObj : VendorContactPersonObj;
    constructor()
    {
        this.VendorObj = new VendorObj();
        this.VendorAddrObj = new VendorAddrObj();
        this.VendorContactPersonObj = new VendorContactPersonObj();
    }
}
