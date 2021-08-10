import { SrvyTaskObj } from "../SrvyTaskObj.Model";

export class ReqSrvyTaskAndSendToMobileObj {
    ReqListSrvyTaskObjs: Array<SrvyTaskObj>;
    Username: string;
    constructor() {
        this.Username = "";
    }
}