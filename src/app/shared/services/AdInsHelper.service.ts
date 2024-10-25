import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { CommonConstant } from "../constant/CommonConstant";
import { URLConstant } from "../constant/URLConstant";
import { NavigationConstant } from "../NavigationConstant";

@Injectable()
export class AdInsHelperService {
  constructor(){ }

	public OpenCustomerViewByCustId(CustId) {
    	let url = URLConstant.env.FoundationR3Web + NavigationConstant.VIEW_CUST_PERSONAL_DETAIL + "?CustId=" + CustId;
    	window.open(url, "_blank");
		}

	public OpenCustomerViewByCustIdForTemplate(CustId) {
		let url = URLConstant.env.FoundationR3Web + NavigationConstant.SELF_CUSTOM_VIEW_CUST_PERSONAL_DETAIL + "?CustId=" + CustId;
		window.open(url, "_blank");
	}

	public OpenCustomerCoyViewByCustId(CustId) {
		let url = URLConstant.env.FoundationR3Web + NavigationConstant.VIEW_CUST_COY_DETAIL + "?CustId=" + CustId;
		window.open(url, "_blank");
	}

  public OpenCustomerCoyViewByCustIdForTemplate(CustId) {
		let url = URLConstant.env.FoundationR3Web + NavigationConstant.SELF_CUSTOM_VIEW_CUST_COY_DETAIL + "?CustId=" + CustId;
		window.open(url, "_blank");
	}

	public OpenPefindoView(TrxNo: string, MrCustTypeCode: string) {
		var url = URLConstant.env.FoundationR3Web + "/View/Pefindo?TrxNo=" + TrxNo + "&MrCustTypeCode=" + MrCustTypeCode;
		window.open(url, "_blank");
	}

	public OpenPefindoViewForTemplate(TrxNo: string, MrCustTypeCode: string) {
		var url = URLConstant.env.FoundationR3Web + "/View/SelfCustomPefindo/SelfCustom/Pefindo?TrxNo=" + TrxNo + "&MrCustTypeCode=" + MrCustTypeCode;
		window.open(url, "_blank");
	}

	public OpenPefindoMultiResultView(TrxNo: string, MrCustTypeCode: string) {
		var url = URLConstant.env.FoundationR3Web + "/View/Pefindo?GroupTrxNo=" + TrxNo + "&MrCustTypeCode=" + MrCustTypeCode;
		window.open(url, "_blank");
}

	public OpenProdOfferingViewByCodeAndVersion(Code, Version) {
		window.open(URLConstant.env.FoundationR3Web + "/View/Offering?prodOfferingHId=0&prodOfferingCode=" + Code + "&prodOfferingVersion=" + Version, "_blank");
	}

	public OpenCustExposure(CustId: number) {
			window.open(URLConstant.env.FoundationR3Web + NavigationConstant.VIEW_CUST_EXPOSURE + "?CustId=" + CustId);
	}

	public OpenSurveyOrderViewBySrvyOrderId(SrvyOrderId: number) {
			window.open(URLConstant.env.FoundationR3Web + NavigationConstant.VIEW_SRVY_ORDER + "?SrvyOrderId=" + SrvyOrderId, '_blank');
	}

	public OpenSurveyTaskViewBySrvyTaskId(SrvyTaskId: number) {
			window.open(URLConstant.env.FoundationR3Web + NavigationConstant.VIEW_SRVY_TASK + "?SrvyTaskId=" + SrvyTaskId, "_blank");
	}

  public OpenViewNegativeCustomerPersonal(negativeCustId: number){
    window.open(NavigationConstant.VIEW_CUSTOM_CUST_NEG_PERSONAL + "?negativeCustId=" + negativeCustId, "_blank");
  }

	public ClearAllLogAndRemoveToken(cookieService: CookieService, http: HttpClient) {
        var url = URLConstant.LogoutAuth;
        http.post(url, {}).subscribe();
        let version = localStorage.getItem(CommonConstant.VERSION);
        localStorage.clear();
        localStorage.setItem("Version", version);
        cookieService.removeAll();
    }

	public ForceLogOut(cookieService: CookieService, timeLeft, toastr, http: HttpClient) {
        let interval = setInterval(() => {
            if (timeLeft > 0) {
                console.log("Time Left : " + timeLeft)
                toastr.warningMessage("Automatic Log out at : " + timeLeft);
                timeLeft--;
            } else {
                this.ClearAllLogAndRemoveToken(cookieService, http);
                window.location.reload();
            }
        }, 1000)
    }
}
