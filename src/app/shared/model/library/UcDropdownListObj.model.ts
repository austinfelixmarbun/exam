import { CommonConstant } from "app/shared/constant/CommonConstant";

export class UcDropdownListObj {
    enviromentUrl: string;
    apiPath: string;
    ddlType: string;
    customKey: string;
    customValue: string;
    requestObj: Object;
    isObject: boolean;
    customObjName: string;
    isSelectOutput: boolean;

    constructor() {
        this.enviromentUrl = "";
        this.apiPath = "";
        this.ddlType = ""; // one | all | none
        this.customKey = "Key";
        this.customValue = "Value";
        this.requestObj = new Object();
        this.isObject = true;
        this.customObjName = CommonConstant.ReturnObj;
        this.isSelectOutput = false;
    }
}