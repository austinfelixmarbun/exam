export class UploadReviewCustomObj{
    TaskListId : number;
    UploadMonitoringNo : string;
    MrUploadStatusCode : string;
}

export class UploadReviewCustomV2Obj{
    TaskListId : string;
    UploadMonitoringNo : string;
    MrUploadStatusCode : string;

    constructor() {
        this.TaskListId = "";
        this.UploadMonitoringNo = "";
        this.MrUploadStatusCode = "";
    }
}