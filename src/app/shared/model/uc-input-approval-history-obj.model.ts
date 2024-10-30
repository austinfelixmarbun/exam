import { URLConstant } from "../constant/URLConstant";

export class UcInputApprovalHistoryObj {
    RequestId: number;
    EnvUrl: string;
    PathUrl: string;
    constructor() { 
        this.RequestId = 0;
        this.EnvUrl = URLConstant.env.FoundationR3Url + "/v1";
        this.PathUrl = "";
    }
}  