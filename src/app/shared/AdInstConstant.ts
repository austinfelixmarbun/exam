import { HttpHeaders } from "@angular/common/http";
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

  // Storage Watch Key
  public static WatchRoleState = "RoleState";
  public static WatchRoleLang = "lang";

  // public static ApvHoldTaskUrl = environment.ApprovalURL + "/ApprovalInstance/HoldUnholdTask";
  // public static ApvTakeBackTaskUrl = environment.ApprovalURL + "/ApprovalInstance/TakeBackTask";
  public static ApvHoldTaskUrl = environment.FoundationR3Url + "/v1" + "/Approval/Hold";
  public static ApvTakeBackTaskUrl = environment.FoundationR3Url + "/v1" + "/Approval/TakeBack";
  public static ApvUnclaimTaskUrl = environment.FoundationR3Url + "/v1" + "/Approval/UnClaim";
  public static ApvClaimTask = environment.FoundationR3Url + "/v1" + "/Approval/ClaimTask";

  public static showData = "10,50,100";
  public static TimeoutSession = 6000000;
  public static GetListProduct = "http://creator_websvr:7272/NEW_FINANCING/api/Catalog/getPopularViewByCriteria";
  public static Login = environment.FoundationR3Url + '/v1' + "/Authenticate/Login";
  public static LoginV2 = environment.FoundationR3Url + '/v2' + "/Authenticate/Login";
  public static LoginWithToken = environment.FoundationR3Url + '/v1' + "/Authenticate/LoginWithToken";
  public static Logout = environment.FoundationR3Url + "/v1" + "/UserManagement/LogOut"
  public static FormDefault = "dashboard/dash-board";
  public static JoinTypeInner = "INNER";
  public static LoginByRole = environment.FoundationR3Url + "/v1" + "/Authenticate/LoginByRole";
  public static LoginByRoleV2 = environment.FoundationR3Url + "/v2" + "/Authenticate/LoginByRole";
  public static LoginByToken = environment.FoundationR3Url + "/v1" + "/Authenticate/LoginByToken";
  public static LoginByTokenV2 = environment.FoundationR3Url + "/v2" + "/Authenticate/LoginByToken";
  public static UpdateToken = environment.FoundationR3Url + "/v1" + "/Authenticate/UpdateRole";
  public static UpdateTokenV2 = environment.FoundationR3Url + "/v2" + "/Authenticate/UpdateRole";
  public static UpdateTokenV2_1 = environment.FoundationR3Url + "/v2.1" + "/Authenticate/UpdateRole";
  public static GetAllActiveRefFormByRoleCodeAndModuleCode = environment.FoundationR3Url + "/v1" + "/RefForm/GetAllActiveRefFormByRoleCodeAndModuleCode";
  public static GetThingsToDoByRole = environment.FoundationR3Url + "/v1" + "/ThingsToDo/GetThingsToDoByRole";
  public static GetDashboardAccessToken = environment.FoundationR3Url + "/v2" + "/Dashboard/GetDashboardAccessToken";
  public static GetThingsToDoByRoleV2 = environment.FoundationR3Url + "/v2" + "/ThingsToDo/GetThingsToDoByRole";
  public static GetThingsToDoCamunda = environment.FoundationR3Url + "/v2" + "/ThingsToDo/GetThingsToDoCamunda";
  public static GetListApvTaskListByUsernameAndRoleCodeForThingsToDo = environment.ApprovalR3Url + "/Generic/GetListApvTaskListByUsernameAndRoleCodeForThingsToDo";
  public static GetListJobTitleByUsernameAndModule = environment.FoundationR3Url + "/v1" + "/Authenticate/GetListJobTitleByUsernameAndModule";
  public static GetListJobTitleByUsernameAndModuleV2 = environment.FoundationR3Url + "/v2" + "/Authenticate/GetListJobTitleByUsernameAndModule";
  public static CheckUserSessionLog = environment.FoundationR3Url + "/v1" + "/Authenticate/CheckUserSessionLog";
  
  //MENU
  public static LogoutAuth = environment.FoundationR3Url + "/v1" + "/Authenticate/Logout";

  //SYS CTRL COY
  public static GetSysCtrlCoyBySysKey = environment.FoundationR3Url + "/v1" + "/SysCtrlCoy/GetSysCtrlCoyByKey";

  //REF-USER
  public static GetRefUserByUsername = environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByUsername";

  //FRAMEWORK
  public static GetPagingObjectBySQL = "/Generic/GetPagingObjectBySQL"; // UCPaging

  //NEW APPROVAL R3
  public static GetLevelVoting = "/Approval/GetLevelVoting";
  public static GetPossibleResult = "/Approval/GetPossibleResult";
  public static SubmitApproval = "/v1" + "/Approval/SubmitApproval";
  public static GetNextNodeMember = "/Approval/GetNextNodeMember";
  public static GetRefReasonActive = "/Approval/GetRefReasonActive";
  public static GetCanChangeMinFinalLevel = "/Approval/GetCanChangeMinFinalLevel";
  public static GetTaskHistory = "/Approval/GetTaskHistory";
  public static GetSchemesBySchemeCode = "/Approval/GetSchemesBySchemeCode";
  public static GetRefSingleCategoryByCategoryCode = "/Approval/GetRefSingleCategoryByCategoryCode";
  public static GetRefAdtQuestion = "/Approval/GetRefAdtQuestion";
  public static CreateNewRFA = "/Approval/CreateNewRFA";
  public static CreateJumpRFA = "/Approval/CreateJumpRFA";
  public static GetPossibleMemberAndAttributeExType = "/Approval/GetPossibleMemberAndAttributeExType";
  public static GetApprovalReturnHistory = "/Approval/GetApprovalReturnHistory";

  // DOWNLOAD
  public static DownloadTemplate = environment.FoundationR3Url + "/v2" + "/Download/DownloadTemplate";

  //UPLOAD
  public static UploadFileV2 = environment.FoundationR3Url + "/v2" + "/Upload/UploadFile";

  // THINGS TO DO
  public static GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo = "ServiceTask/GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo";

  private static SpinnerHeaders = new HttpHeaders({
    'IsLoading': "true"});
  public static SpinnerOptions = {headers: AdInsConstant.SpinnerHeaders};
}