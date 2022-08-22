import { CustCompanyObj } from "app/shared/model/cust-company-obj.model";

export class CustCompanyObjX {
    CustCompanyObj: CustCompanyObj;
    RefSectorEconomySlikXId: number;
    IsForeigner: boolean;

    constructor() {
        this.CustCompanyObj = new CustCompanyObj();
        this.RefSectorEconomySlikXId = 0;
        this.IsForeigner = false;
    }
}