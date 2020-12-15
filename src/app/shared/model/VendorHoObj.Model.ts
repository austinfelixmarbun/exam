import { VendorAddrObj } from "./VendorAddrObj.Model";
import { VendorAttrContentObj } from "./VendorAttrContentObj.Model";
import { VendorObj } from "./VendorObj.Model";
import { VendorAtpmMappingObj } from "./VendorAtpmMappingObj.Model";

export class VendorHoObj {
    VendorObj: VendorObj;
    VendorAddrObj: VendorAddrObj;
    VendorAttrContentObjs : Array<VendorAttrContentObj>;
    VendorAtpmMappingObjs : Array<VendorAtpmMappingObj>;

    constructor()
    {
        this.VendorObj = new VendorObj();
        this.VendorAddrObj = new VendorAddrObj();
        
    }
}
