import { URLConstant } from "../constant/URLConstant";

export class UcInputApprovalGeneralInfoObj {
    TaskId: number;
    EnvUrl: string;
    PathUrl: string;
    constructor() { 
        this.TaskId = 0;
        this.EnvUrl = URLConstant.env.FoundationR3Url + "/v1";
        this.PathUrl = "";
    }
}  