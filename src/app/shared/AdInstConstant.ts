import { environment } from "../../environments/environment";

export class AdInsConstant {
  //Application Item
  public static RestrictionBetween = "Between"
  public static RestrictionLike = "Like";
  public static RestrictionEq = "Eq";
  public static RestrictionNeq = "NEQ";
  public static RestrictionGt = "GT";
  public static RestrictionGte = "GTE";
  public static RestrictionLt = "LT";
  public static RestrictionLte = "LTE";
  public static RestrictionIn = "IN";
  public static RestrictionNotIn = "NotIn";
  public static RestrictionOr = "Or"; //pastikan ada 1 criteria sebelumnya
  public static RestrictionOrNeq = "OrNeq"; //pastikan ada 1 criteria sebelumnya
  public static RestrictionIsNull = "isnull";
  public static RestrictionIsNotNull = "isnotnull";
  public static RestrictionGTE = "GTE";
  public static RestrictionLTE = "LTE";

  public static ApvHoldTaskUrl = environment.ApprovalURL + "/ApprovalInstance/HoldUnholdTask";
  public static ApvTakeBackTaskUrl = environment.ApprovalURL + "/ApprovalInstance/TakeBackTask";

  public static showData = "10,50,100";
  public static TimeoutSession = 6000000;
  public static GetListProduct = "http://creator_websvr:7272/NEW_FINANCING/api/Catalog/getPopularViewByCriteria";
  public static Login = "/Authenticate/Login";
  public static LoginWithToken = environment.FoundationR3Url+"/Authenticate/LoginWithToken";
  public static LoginToken = "/UserManagement/HTML6Login";
  public static Logout = "/UserManagement/LogOut"
  public static GetListOffice = "/RefOffice/GetRefOfficePaging";
  public static GetProvince = "/los/v1/get_provinsi";
  public static GetCityByProvince = "/los/v1/get_kota";
  public static getProspectByProspectNo = "/api/MobileProspectTask/GetProspectByProspectNo";
  public static submitNCProspect = "/api/MobileProspectTask/submitNCProspect";
  public static addCustPersonal = "";
  public static FormDefault = "dashboard/dash-board";
}