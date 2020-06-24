export class SrvyTaskObj {
    SrvyTaskId: number;
    SrvyOrderId: number;
    SrvyTaskNo: string;
    SrvyFormSchmId: number;
    MrSrvySubjCode: string;
    MrSrvyObjCode: string;
    MrSrvySubj: string;
    MrSrvyObj: string;
    MrSrvyTypeCode: string;
    MrSrvyStatCode: string;
    SurveyorCode: string;
    AssignDt: Date;
    UpdateDt: Date;
    Notes: string;
    ThirdPartyAssignNo: string;
    VerfResultNo: string;
    RowVersion: string;

    constructor() {
        this.SrvyTaskId = 0;
        this.SrvyOrderId = 0;
        this.SrvyTaskNo = "";
        this.SrvyFormSchmId = 0
        this.MrSrvySubjCode = "";
        this.MrSrvyObjCode = "";
        this.MrSrvySubj = "";
        this.MrSrvyObj = "";
        this.MrSrvyTypeCode = "";
        this.MrSrvyStatCode = "";
        this.SurveyorCode = "";
        this.AssignDt = new Date();
        this.UpdateDt = new Date();
        this.Notes = "";
        this.ThirdPartyAssignNo = "";
        this.VerfResultNo = "";
        this.RowVersion = "";
    }
}  