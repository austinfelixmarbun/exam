import { environment } from "environments/environment";
import { URLConstant } from "../constant/URLConstant";

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
    EnableRequiredNotes: boolean;
    constructor() { 
        this.TaskId = 0;
        this.EnvUrl = environment.FoundationR3Url + "/v1";
        this.PathUrlGetLevelVoting = URLConstant.GetLevelVoting;
        this.PathUrlGetPossibleResult = URLConstant.GetPossibleResult;
        this.PathUrlSubmitApproval = URLConstant.SubmitApproval;
        this.PathUrlGetNextNodeMember = URLConstant.GetNextNodeMember;
        this.PathUrlGetReasonActive = URLConstant.GetRefReasonActive;
        this.PathUrlGetChangeFinalLevel = URLConstant.GetCanChangeMinFinalLevel;
        this.PathUrlReturnToLevel = "";
        this.PathUrlContinueToLevel = "";
        this.TrxNo = "";
        this.RequestId = 0;
        this.PathUrlGetHistory = URLConstant.GetTaskHistory;
        this.EnableRequiredNotes = true;
    }
}  