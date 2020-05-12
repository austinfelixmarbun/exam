export class RdlcReportObj {
    RequestUserId: number;
    RequesterEmail: string;
    ReportProcessorSelector: string;
    ExportFormat: string;
    ReportName: string;
    ExportFile: string;
    MainReportParameter: MainReportObj;
    MainReportInfoDetail: MainReportDetailObj;
    ReportTemplate: string;

    constructor() {
        this.RequestUserId = 0;
        this.RequesterEmail = "";
        this.ReportProcessorSelector = "";
        this.ExportFormat = "";
        this.ReportName = "";
        this.ExportFile = "";
        this.MainReportParameter = new MainReportObj();
        this.MainReportInfoDetail = new MainReportDetailObj();
        this.ReportTemplate = "";
    }

}

export class MainReportObj {
    FilterBy: string;
    UserName: string;
    SystemDate: Date;
    CoyName: string;
    OfficeName: string;
    From: string;
    To: string;

    constructor() {
        this.FilterBy = "";
        this.UserName = "";
        this.SystemDate = new Date();
        this.CoyName = "";
        this.OfficeName = "";
        this.From = "";
        this.To = "";
    }
}

export class MainReportDetailObj {
    ReportDataProviderName: string;
    ReportDataProviderParameter: any;
    ReportTemplateName: string;

    constructor() {
        this.ReportDataProviderName = "";
        this.ReportTemplateName = "";
    }

}