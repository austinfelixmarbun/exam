import { SrvyTaskObj } from "../SrvyTaskObj.Model";

export class ReqSrvyTaskAndSendToMobileObj {
    ReqListSrvyTaskObjs: Array<SrvyTaskObj>;
    Username: string;
    SrvyOrderId: number;
    constructor() {
        this.Username = "";
    }
}