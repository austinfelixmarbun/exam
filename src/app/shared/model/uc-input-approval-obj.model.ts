import { environment } from "environments/environment";
import { AdInsConstant } from "../AdInstConstant";

export class UcInputApprovalObj {
    TaskId: number;
    EnvUrl: string;
    PathUrlGetLevelVoting: string;
    PathUrlGetPossibleResult: string;
    PathUrlSubmitApproval: string;
    PathUrlGetNextNodeMember: string;
    PathUrlGetReasonActive:string;
    PathUrlGetChangeFinalLevel: string;
    PathUrlReturnToLevel: string;
    PathUrlContinueToLevel: string;
    RequestId: number;
    PathUrlGetHistory: string;
    TrxNo: string;
    constructor() { 
        this.TaskId = 0;
        this.EnvUrl = environment.FoundationR3Url + "/v1";
        this.PathUrlGetLevelVoting = AdInsConstant.GetLevelVoting; //pindah ke adins.constant
        this.PathUrlGetPossibleResult = AdInsConstant.GetPossibleResult;
        this.PathUrlSubmitApproval = AdInsConstant.SubmitApproval;
        this.PathUrlGetNextNodeMember = AdInsConstant.GetNextNodeMember;
        this.PathUrlGetReasonActive = AdInsConstant.GetRefReasonActive;
        this.PathUrlGetChangeFinalLevel = AdInsConstant.GetCanChangeMinFinalLevel;
        this.PathUrlReturnToLevel = "";
        this.PathUrlContinueToLevel = "";
        this.TrxNo = "";
        this.RequestId = 0;
        this.PathUrlGetHistory = AdInsConstant.GetTaskHistory;
    }
}  