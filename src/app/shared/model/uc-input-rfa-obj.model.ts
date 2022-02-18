import { environment } from "environments/environment";
import { CookieService } from "ngx-cookie";
import { AdInsHelper } from "../AdInsHelper";
import { AdInsConstant } from "../AdInstConstant";
import { CommonConstant } from "../constant/CommonConstant";

export class UcInputRFAObj {
    ApvTypecodes: any;
    EnvUrl: string;
    PathUrlGetSchemeBySchemeCode: string;
    PathUrlGetCategoryByCategoryCode: string;
    PathUrlGetAdtQuestion: string;
    PathUrlGetPossibleMemberAndAttributeExType: string;
    PathUrlGetApprovalReturnHistory: string;
    PathUrlCreateNewRFA: string;
    PathUrlCreateJumpRFA: string;
    CategoryCode: string;
    SchemeCode: string;
    TrxNo: string;
    Reason: any;
    OfficeCode: string;
    RequestedBy: string;

    constructor(private cookieService: CookieService) {
        let context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.RequestedBy = context[CommonConstant.USER_NAME];
        this.OfficeCode = context[CommonConstant.OFFICE_CODE];
        this.ApvTypecodes = [];
        this.EnvUrl = environment.FoundationR3Url + "/v1";
        this.PathUrlGetSchemeBySchemeCode = AdInsConstant.GetSchemesBySchemeCode;
        this.PathUrlGetCategoryByCategoryCode = AdInsConstant.GetRefSingleCategoryByCategoryCode;
        this.PathUrlGetAdtQuestion = AdInsConstant.GetRefAdtQuestion;
        this.PathUrlGetPossibleMemberAndAttributeExType = AdInsConstant.GetPossibleMemberAndAttributeExType;
        this.PathUrlGetApprovalReturnHistory = AdInsConstant.GetApprovalReturnHistory;
        this.PathUrlCreateNewRFA = AdInsConstant.CreateNewRFA;
        this.PathUrlCreateJumpRFA = AdInsConstant.CreateJumpRFA;
        this.CategoryCode = "";
        this.SchemeCode = "";
        this.TrxNo = "";
        this.Reason = [];
    }
}