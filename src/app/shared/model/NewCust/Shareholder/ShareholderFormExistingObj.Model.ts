import { CustPersonalJobDataObj } from "../../CustPersonalJobDataObj.Model";
import { CustCompanyMgmntShrholderObj } from "../CustCompanyMgmntShrholderObj.Model";

export class ShareholderFormExistingObj {
    CustCompanyMgmntShrholder: CustCompanyMgmntShrholderObj;
    CustPersonalJob: CustPersonalJobDataObj;

    constructor() {
        this.CustCompanyMgmntShrholder = new CustCompanyMgmntShrholderObj();
        this.CustPersonalJob = new CustPersonalJobDataObj();
    }
}