import { environment } from "environments/environment";
import * as _urlConstant from "../../../assets/urlConstant.json";
import * as _environment from "../../../assets/config/enviConfig.json";

// URL" API di concat dengan environment url + version + api path
// KECUALI: API" yang di pakai di UC". contoh: GetPagingObjectBySQL, DeleteFromPaging, Approval CreateNewRFA
// HARAP JANGAN PAKE INI LAGI, KARENA SEKARANG SUDAH ADA UrlConstantNew YANG PAKE JSON
export const envi = _environment;
const urlConstant = _urlConstant;
export class URLConstant {
    // FRAMEWORK
    public static GetPagingObjectBySQL = "/Generic/GetPagingObjectBySQL" // UCPaging
    public static GetJournalResultPagingObjectBySQL = "/Generic/GetJournalResultPagingObjectBySQL";

    // SYS CONFIG RESULT
    public static GetSysConfigResultByCode = environment.FoundationR3Url + "/v1" + "/SysConfigResult/GetSysConfigResultByCode";

    // DOWNLOAD
    public static DownloadTemplate = environment.FoundationR3Url + "/v2" + "/Download/DownloadTemplate";

    // WEB SOCKET
    public static WebSocketUrl = environment.FoundationR3Url + "/Notificationhub";

    //GENERAL SETTING
    public static AddGeneralSetting = environment.FoundationR3Url + "/v1" + "/GeneralSetting/AddGeneralSetting";
    public static EditGeneralSetting = environment.FoundationR3Url + "/v1" + "/GeneralSetting/EditGeneralSetting";
    public static GetGeneralSettingById = environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingById";
    public static GetGeneralSettingValue = "/v1" + "/GeneralSetting/GetGeneralSettingValue";
    public static GetGeneralSettingByCode = environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingByCode";
    public static GetGeneralSettingValueByCode = environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingValueByCode";
    public static GetListGeneralSettingByListGsCode = environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetListGeneralSettingByListGsCode";

    //REF OFFICE
    public static GetRefOfficeByOfficeCode = environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeByOfficeCode";
    public static GetListKvpActiveRefOfficeForPaging = environment.FoundationR3Url + "/v1" + "/RefOffice/GetListKvpActiveRefOfficeForPaging";
    public static GetRefOfficeObj = environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeObj";
    public static GetRefOfficeByRefOfficeId = environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeByRefOfficeId"
    public static GetAllRefOffice = environment.FoundationR3Url + "/v1" + "/RefOffice/GetAllRefOffice";
    public static AddRefOffice = environment.FoundationR3Url + "/v1" + "/RefOffice/AddRefOffice";
    public static AddRefOfficeV2 = environment.FoundationR3Url + "/v2" + "/RefOffice/AddRefOffice";
    public static AddRefOfficeV2_1 = environment.FoundationR3Url + "/v2.1" + "/RefOffice/AddRefOffice";
    public static AddRefOfficeAreaMember = environment.FoundationR3Url + "/v1" + "/RefOffice/AddRefOfficeAreaMember";
    public static UpdateRefOfficeAreaId = environment.FoundationR3Url + "/v1" + "/RefOffice/UpdateRefOfficeAreaId";
    public static EditRefOffice = environment.FoundationR3Url + "/v1" + "/RefOffice/EditRefOffice";
    public static EditRefOfficeV2 = environment.FoundationR3Url + "/v2" + "/RefOffice/EditRefOffice";
    public static EditRefOfficeV2_1 = environment.FoundationR3Url + "/v2.1" + "/RefOffice/EditRefOffice";
    public static GetCenterGrpByCenterGrpTypeCode = "/v1" + "/RefOffice/GetCenterGrpByCenterGrpCode";
    public static GetListOfficeCenterGrp = "/v1" + "/RefOffice/GetListOfficeCenterGrp";
    public static AddCenterGroupOfficeMember = "/v1" + "RefOffice/AddCenterGroupOfficeMember";
    public static AddCenterGrpOfficeMember = environment.FoundationR3Url + "/v1" + "/CenterGrpOfficeMbr/AddCenterGrpOfficeMember";
    public static GetListCenterGrpMemberByRefOfficeId = environment.FoundationR3Url + "/v1" + "/CenterGrpOfficeMbr/GetListCenterGrpMemberByRefOfficeId"
    public static DeleteCenterGrpOfficeMember = environment.FoundationR3Url + "/v1" + "/CenterGrpOfficeMbr/DeleteCenterGrpOfficeMember";
    public static GetListActiveRefOffice = "/v1" + "/RefOffice/GetListActiveRefOffice";
    public static GetListRefOfficeByRefOfficeAreaId = environment.FoundationR3Url + "/v1" + "/RefOffice/GetListRefOfficeByRefOfficeAreaId";
    public static GetListKvpActiveRefOffice = environment.FoundationR3Url + "/v1" + "/RefOffice/GetListKvpActiveRefOffice";
    public static GetRefOfficeDetailByRefOfficeId = environment.FoundationR3Url + "/v1" + "/RefOffice/GetRefOfficeDetailByRefOfficeId"

    //CENTER GROUP
    public static GetCenterGrpByCode = environment.FoundationR3Url + "/v1" + "/CenterGrp/GetCenterGrpByCode";
    public static GetCenterGrpById = environment.FoundationR3Url + "/v1" + "/CenterGrp/GetCenterGrpById";

    //REF OFFICE AREA
    public static GetAllListArea = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetAllListArea";
    public static GetRefOfficeAreaPaging = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetRefOfficeAreaPaging";
    public static GetRefArea = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetRefArea";
    public static GetRefOfficeAreaByRefOfficeAreaId = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/GetRefOfficeAreaByRefOfficeAreaId";
    public static AddRefOfficeArea = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/AddRefOfficeArea";
    public static EditRefOfficeArea = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/EditRefOfficeArea";
    public static CheckDuplAreaCode = environment.FoundationR3Url + "/v1" + "/RefOfficeArea/CheckDuplAreaCode";

    //ORGANIZATION
    public static GetRefOrg = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefOrg";
    public static EditRefOrgWithOldParentId = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditRefOrgWithOldParentId";
    public static EditRefOrg = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditRefOrg";
    public static DeleteRefOrg = "/OrganizationDefinition/DeleteRefOrg";
    public static GetListAllRefOrg = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetListAllRefOrg";
    public static AddRefOrg = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddRefOrg";
    public static GetRefOrgPaging = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefOrgPaging";
    public static GetAllRefBizUnit = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllRefBizUnit";
    public static GetOrgJobTitleByMdlStruc = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgJobTitleByMdlStruc";
    public static GetRefBizUnitByOffice = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefBizUnitByOffice";
    public static GetAllOrgMdl = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllOrgMdl";
    public static GetAllActiveOrgMdlByRefOrgId = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllActiveOrgMdlByRefOrgId";
    public static GetOrgMdlPaging = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlPaging";
    public static DeleteOrgMdl = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/DeleteOrgMdl";
    public static EditOrgMdl = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditOrgMdl";
    public static AddOrgMdl = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddOrgMdl";
    public static GetOrgMdl = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdl";
    public static GetOrgMdlByOrgMdlId = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlByOrgMdlId";
    public static GetAllRefBizUnitKeyValuePair = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetAllRefBizUnitKeyValuePair";
    public static DeleteOrgMdlStruc = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/DeleteOrgMdlStruc";
    public static AddOrgMdlStruc = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddOrgMdlStruc";
    public static EditOrgMdlStruc = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditOrgMdlStruc";
    public static GetOrgMdlStruc = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlStruc";
    public static GetOrgMdlStrucPaging = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlStrucPaging";
    public static GetOrgMdlStrucById = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgMdlStrucById";

    //REF-JOB-TITLE
    public static GetRefJobTitle = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefJobTitlePaging";
    public static AddRefJobTitle = environment.FoundationR3Url + "/v1" + "/RefJobTitle/AddRefJobTitle";
    public static EditRefJobTitle = environment.FoundationR3Url + "/v1" + "/RefJobTitle/EditRefJobTitle";
    public static GetJobPositionLvl = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetJobPositionLvl";
    public static GetRefJobTitleById = environment.FoundationR3Url + "/v1" + "/RefJobTitle/GetRefJobTitleByRefJobTitleId";

    //ORG JOB TITLE
    public static GetOrgJobTitlePaging = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgJobTitlePaging";
    public static AddOrgJobTitle = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/AddOrgJobTitle";
    public static EditOrgJobTitle = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/EditOrgJobTitle";
    public static DeleteOrgJobTitle = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/DeleteOrgJobTitle";
    public static GetOrgJobTitleByOrgJobTitleId = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetOrgJobTitleByOrgJobTitleId";

    //REF-BANK
    public static GetBankPaging = environment.FoundationR3Url + "/v1" + "/RefBank/GetRefBankPaging";
    public static GetBank = environment.FoundationR3Url + "/v1" + "/RefBank/GetBank";
    public static GetRefBankByRefBankIdAsync = environment.FoundationR3Url + "/v1" + "/RefBank/GetRefBankByRefBankIdAsync";
    public static GetRefBankByRefBankCodeAsync = environment.FoundationR3Url + "/v1" + "/RefBank/GetRefBankByBankCodeAsync";
    public static EditRefBank = environment.FoundationR3Url + "/v1" + "/RefBank/EditRefBank";
    public static AddRefBank = environment.FoundationR3Url + "/v1" + "/RefBank/AddRefBank";
    public static AddRefBankAsync = environment.FoundationR3Url + "/v1" + "/RefBank/AddRefBankAsync";
    public static DeleteRefBank = environment.FoundationR3Url + "/v1" + "/RefBank/DeleteRefBank";
    public static GetBankByBankCode = environment.FoundationR3Url + "/v1" + "/RefBank/GetBankByBankCode";

//LBPPMS-CNTRPRT
public static GetLbppmsCntrprtByLbppmsCntrprtCode = environment.FoundationR3Url + "/v1" + "/Vendor/GetLbppmsCntrprtByLbppmsCntrprtCode";

    //REF-EMP
    public static GetEmpNameByRefUserId = environment.FoundationR3Url + "/v1" + "/RefEmp/GetEmpNameByRefUserId";
    public static GetListEmployee = environment.FoundationR3Url + "/v1" + "/RefEmp/GetRefEmpPaging";
    public static GetRefEmployeeById = environment.FoundationR3Url + "/v1" + "/RefEmp/GetRefEmpByRefEmpId"
    public static AddRefEmp = environment.FoundationR3Url + "/v1" + "/RefEmp/AddRefEmp";
    public static EditRefEmp = environment.FoundationR3Url + "/v1" + "/RefEmp/EditRefEmp";
    public static GetEmpBankAccByRefEmpId = environment.FoundationR3Url + "/v1" + "/EmpBankAcc/GetEmpBankAccByRefEmpId";
    public static AddRefEmpAndEmpBankAcc = environment.FoundationR3Url + "/v1" + "/RefEmp/AddRefEmpAndEmpBankAcc";
    public static EditRefEmpAndEmpBankAcc = environment.FoundationR3Url + "/v1" + "/RefEmp/EditRefEmpAndEmpBankAcc";
    public static DeleteRefEmpAndEmpBankAcc = environment.FoundationR3Url + "/v1" + "/RefEmp/DeleteRefEmpAndEmpBankAcc";
    public static GetListEmployeebyRefEmpId = environment.FoundationR3Url + "/v1" + "/EmpPosition/GetListEmployeebyRefEmpId";
    public static GetEmpListByOfficeIdAndIsActive = environment.FoundationR3Url + "/v1" + "/RefEmp/GetEmpListByOfficeIdAndIsActive";
    public static GetEmpForUpdateById = environment.FoundationR3Url + "/v1" + "/RefEmp/GetRefEmpForUpdateByRefEmpId"

    //EMP_POSITION
    public static GetEmpPositionPaging = environment.FoundationR3Url + "/v1" + "/EmpPosition/GetEmpPositionPaging";
    public static GetEmpByEmpPositionId = environment.FoundationR3Url + "/v1" + "/EmpPosition/GetEmpByEmpPositionId";
    public static AddEmpPosition = environment.FoundationR3Url + "/v1" + "/EmpPosition/AddEmpPosition";
    public static EditEmpPosition = environment.FoundationR3Url + "/v1" + "/EmpPosition/EditEmpPosition";
    public static DeleteEmpPosition = environment.FoundationR3Url + "/v1" + "/EmpPosition/DeleteEmpPosition";
    public static GetListUserEmployee = environment.FoundationR3Url + "/v1" + "/EmpPosition/GetListUserEmployee";

    //REF-USER
    public static GetRefUserPaging = environment.FoundationR3Url + "/v1" + "/UserManagement/GetRefUserPaging";
    public static EditRefUserForRefEmpR3 = environment.FoundationR3Url + "/v1" + "/RefUser/EditRefUserForRefEmp";
    public static ChangePassword = environment.FoundationR3Url + "/v1" + "/UserManagement/ChangePassword";
    public static GetRefUser = environment.FoundationR3Url + "/v1" + "/UserManagement/GetRefUser";
    public static GetUserByUsername = environment.FoundationR3Url + "/v1" + "/UserManagement/GetUserByUsername";
    public static ValidatePwd = environment.FoundationR3Url + "/v1" + "/UserManagement/ValidatePwd";
    public static GetCountRefUserByRefEmpId = environment.FoundationR3Url + "/v1" + "/UserManagement/GetCountRefUserByRefEmpId";
    public static ResetPassword = environment.FoundationR3Url + "/v1" + "/UserManagement/ResetPassword";
    public static GetRefUserById = environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserById";
    public static GetRefUserByUsername = environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByUsername";
    public static GetUserEmpByUsername = environment.FoundationR3Url + "/v1" + "/RefUser/GetUserEmpByUsername";
    public static GetRefUserByRefEmpId = environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByRefEmpId";
    public static AddRefUserRole = environment.FoundationR3Url + "/v1" + "/RefUserRole/AddRefUserRole"
    public static EditRefUserRole = environment.FoundationR3Url + "/v1" + "/RefUserRole/EditRefUserRole";
    public static GetRefUserRoleById = environment.FoundationR3Url + "/v1" + "/RefUserRole/GetRefUserRoleById";
    public static ChangePasswordRefUserByUsername = environment.FoundationR3Url + "/v1" + "/RefUser/ChangePasswordRefUserByUsername";
    public static DeleteRefUserRole = "/RefUserRole/DeleteRefUserRole";
    public static GetRefUserByResetCode = environment.FoundationR3Url + "/v1" + "/RefUser/GetRefUserByResetCode";
    public static ResetPasswordByUsername = environment.FoundationR3Url + "/v1" + "/RefUser/ResetPasswordByUsername";

    //REF-ROLE
    public static GetRefRolePaging = environment.FoundationR3Url + "/v1" + "/UserManagement/GetRefRolePaging";
    public static AddRefRole = environment.FoundationR3Url + "/v1" + "/RefRole/AddRefRole";
    public static AddRefRoleV2 = environment.FoundationR3Url + "/v2" + "/RefRole/AddRefRole";
    public static EditRefRole = environment.FoundationR3Url + "/v1" + "/RefRole/EditRefRole";
    public static DeleteRefRole = environment.FoundationR3Url + "/v1" + "/RefRole/DeleteRefRole";
    public static GetRefRoleByRefRoleId = environment.FoundationR3Url + "/v1" + "/RefRole/GetRefRoleById";
    public static GetRefRoleByCode = environment.FoundationR3Url + "/v1" + "/RefRole/GetRefRoleByCode";
    public static GetActiveRefRoleByRefRoleId = "/v1" + "/RefRole/GetActiveRefRoleByRefRoleId";
    public static GetRefRole = environment.FoundationR3Url + "/v1" + "/RefRole/GetRefRole";
    public static GetListDataCurrentUser = "/v1" + "/UserManagement/GetListDataCurrentUser";
    public static GetRefRoleByEmpPositionId = "/v1" + "/RefRole/GetRefRoleByEmpPositionId";
    public static EditUserTitleRole = environment.FoundationR3Url + "/v1" + "/UserManagement/EditUserTitleRole";
    public static AddUserTitleRole = environment.FoundationR3Url + "/v1" + "/UserManagement/AddUserTitleRole";
    public static AssignRoleToUsers = environment.FoundationR3Url + "/v1" + "/UserManagement/AssignRoleToUsers";
    public static GetUserTitleRoleByEmpPositionIdAndRefRoleId = "/v1" + "/UserManagement/GetUserTitleRoleByEmpPositionIdAndRefRoleId";
    public static GetListActiveRefRole = environment.FoundationR3Url + "/v1" + "/RefRole/GetListActiveRefRole"

    //REF FEE
    public static AddRefFee = environment.FoundationR3Url + "/v1" + "/RefFee/AddRefFee";
    public static EditRefFee = environment.FoundationR3Url + "/v1" + "/RefFee/EditRefFee";
    public static GetRefFeeByRefFeeId = environment.FoundationR3Url + "/v1" + "/RefFee/GetRefFeeByRefFeeId";

    //REF LOB
    public static GetListRefLob = environment.FoundationR3Url + "/v1" + "/RefLob/GetListRefLob";
    public static GetListBizTemplateCodeByRefFeeId = environment.FoundationR3Url + "/v1" + "/RefLob/GetListBizTemplateCodeByRefFeeId"
    public static GetListBizTmpltCode = environment.FoundationR3Url + "/v1" + "/RefLob/GetListBizTmpltCode"

    //SURVEYOR
    public static AddSurveyor = environment.FoundationR3Url + "/v1" + "/Surveyor/AddSurveyor";
    public static EditSurveyor = environment.FoundationR3Url + "/v1" + "/Surveyor/EditSurveyor";
    public static GetSurveyorBySurveyorId = environment.FoundationR3Url + "/v1" + "/Surveyor/GetSurveyorBySurveyorId";


    //ZIPCODE
    public static GetRefZipcodePaging = environment.FoundationR3Url + "/v1" + "/RefZipcode/GetRefZipcodePaging";
    public static GetRefZipCode = environment.FoundationR3Url + "/v1" + "/RefZipcode/GetRefZipcode";
    public static GetRefProvDistrictObj = environment.FoundationR3Url + "/v1" + "/RefProvDistrict/GetRefProvDistrict";
    public static EditRefZipcode = environment.FoundationR3Url + "/v1" + "/RefZipcode/EditRefZipcode";
    public static EditRefZipcodeV2 = environment.FoundationR3Url + "/v2" + "/RefZipcode/EditRefZipcode";
    public static AddRefZipcode = environment.FoundationR3Url + "/v1" + "/RefZipcode/AddRefZipcode";
    public static AddRefZipcodeV2 = environment.FoundationR3Url + "/v2" + "/RefZipcode/AddRefZipcode";
    public static GetOfficeZipcodeMemberAddPaging = environment.FoundationR3Url + "/v1" + "/RefZipcode/GetOfficeZipcodeMemberAddPaging";
    public static GetRefZipCodeById = environment.FoundationR3Url + "/v1" + "/RefZipcode/GetRefZipcodeById";
    public static GetZipcodeDataByZipCode = environment.FoundationR3Url + "/v1" + "/RefZipcode/GetZipcodeDataByZipCode";

    //OFFICE ZIPCODE MEMBER
    public static GetOfficeZipCodeMemberPaging = environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/GetOfficeZipCodeMemberPaging";
    public static GetRefOfficeZipcodePaging = environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/GetRefOfficeZipcodePaging";
    public static AddOfficeZipcodeMember = environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/AddOfficeZipCodeMember";
    public static DeleteOfficeZipcodeMember = environment.FoundationR3Url + "/v1" + "/OfficeZipcodeMember/DeleteOfficeZipcodeMember";

    //BUSINESS UNIT
    public static GetBusinessUnitPaging = environment.FoundationR3Url + "/v1" + "/OrganizationDefinition/GetRefBizUnitPaging";
    public static GetRefBizUnit = environment.FoundationR3Url + "/v1" + "/RefBizUnit/GetRefBizUnitByRefBizUnitId";
    public static AddRefBizUnit = environment.FoundationR3Url + "/v1" + "/RefBizUnit/AddRefBizUnit";
    public static EditRefBizUnit = environment.FoundationR3Url + "/v1" + "/RefBizUnit/EditRefBizUnit";
    public static DeleteRefBizUnit = "/RefBizUnit/DeleteRefBizUnit";

    //REF COY
    public static GetRefCoyPaging = environment.FoundationR3Url + "/v1" + "/RefCoy/GetRefCoyPaging";
    public static GetRefCoy = environment.FoundationR3Url + "/v1" + "/RefCoy/GetRefCoy";
    public static EditRefCoy = environment.FoundationR3Url + "/v1" + "/RefCoy/EditRefCoy";
    public static GetCoyBodPaging = environment.FoundationR3Url + "/v1" + "/CoyBod/GetCoyBodPaging";
    public static AddCoyBod = environment.FoundationR3Url + "/v1" + "/CoyBod/AddCoyBOD";
    public static EditCoyBod = environment.FoundationR3Url + "/v1" + "/CoyBod/EditCoyBOD";
    public static DeleteCoyBod = "/CoyBod/DeleteCoyBOD";
    public static GetCoyBod = environment.FoundationR3Url + "/v1" + "/CoyBod/GetCoyBod";
    public static GetCommissionerPaging = environment.FoundationR3Url + "/v1" + "/CoyCommissioner/GetCoyCommissionerPaging";
    public static AddCoyCommissioner = environment.FoundationR3Url + "/v1" + "/CoyCommissioner/AddCoyCommissioner";
    public static EditCoyCommissioner = environment.FoundationR3Url + "/v1" + "/CoyCommissioner/EditCoyCommissioner";
    public static DeleteCoyCommissioner = "/CoyCommissioner/DeleteCoyCommissioner";
    public static GetCoyCommissioner = environment.FoundationR3Url + "/v1" + "/CoyCommissioner/GetCoyCommissioner";

    //REF TAX OFFICE
    public static GetAllActiveRefTaxOffice = environment.FoundationR3Url + "/v1" + "/RefTaxOffice/GetAllActiveRefTaxOffice";

    //REF MASTER
    public static GetRefMasterList = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterList";
    public static GetRefMastersByCriteria = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMastersByCriteria";
    public static GetRefMaster = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMaster";
    public static GetRefMasterListByTypeCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterListByTypeCode";
    public static GetRefMasterListKeyValuePair = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterListKeyValuePair";
    public static AddRefMaster = environment.FoundationR3Url + "/v1" + "/RefMaster/AddRefMaster";
    public static EditRefMaster = environment.FoundationR3Url + "/v1" + "/RefMaster/EditRefMaster";
    public static GetRefMasterType = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterType";
    public static GetRefMasterTypeKeyValueUserSetting = "/v1" + "/RefMaster/GetRefMasterTypeKeyValueUserSetting";
    public static GetRefMasterPaging = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterPaging";
    public static GetRefMasterListDesc = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterListDesc";
    public static GetRefMasterListKeyValueActiveByCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCode";
    public static GetListKeyValueActiveByCodeOrderBySeqNo = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCodeOrderBySeqNo";
    public static GetListActiveRefMasterType = environment.FoundationR3Url + "/v1" + "/RefMasterType/GetListKeyValueActiveByCode";
    public static GetListActiveRefMasterTypeForDdl = "/RefMasterType/GetListKeyValueActiveByCode";
    public static GetRefMasterByRefMasterId = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByRefMasterId";
    public static GetListActiveRefMaster = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCode";
    public static GetRefMasterByMasterCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByMasterCode";
    public static GetListActiveRefMasterWithMappingCodeAll = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListActiveRefMasterWithMappingCodeAll";
    public static GetListActiveRefMasterByRefMasterTypeCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListActiveRefMasterByRefMasterTypeCode";
    public static GetRefMasterByRefMasterTypeCodeAndMasterCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByRefMasterTypeCodeAndMasterCode";
    public static GetKvpRefMasterByRefMasterTypeCodeAndMasterCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetKvpRefMasterByRefMasterTypeCodeAndMasterCode";
    public static GetRefMasterByRefMasterTypeCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetRefMasterByRefMasterTypeCode";
    public static GetListActiveRefMasterDDL = "/RefMaster/GetListKeyValueActiveByCode";
    public static GetListActiveRefMasterOrderSeqNoDDL = "/RefMaster/GetListKeyValueActiveByCodeOrderBySeqNo";
    public static GetListKeyValueActiveByCodeOrderBySeqNoDDL = "/RefMaster/GetListKeyValueActiveByCodeOrderBySeqNo";

    public static GetListActiveRefMasterDetail = environment.FoundationR3Url + '/v1' + "/RefMaster/GetListActiveRefMaster";
    
    //REF COUNTRY
    public static GetListRefCountry = environment.FoundationR3Url + "/v1" + "/RefCountry/GetListRefCountry";
    public static GetRefCountryByCountryCode = environment.FoundationR3Url + "/v1" + "/RefCountry/GetRefCountryByCountryCode";

    //REF INDUSTRY TYPE
    public static GetRefIndustryTypeById = environment.FoundationR3Url + "/v1" + "/RefIndustryType/GetRefIndustryTypeByRefIndustryTypeId";
    public static AddRefIndustryType = environment.FoundationR3Url + "/v1" + "/RefIndustryType/AddRefIndustryType";
    public static EditRefIndustryType = environment.FoundationR3Url + "/v1" + "/RefIndustryType/EditRefIndustryType";
    public static DeleteRefIndustryType = environment.FoundationR3Url + "/v1" + "/RefIndustryType/DeleteRefIndustryType";
    public static GetRefIndustryTypeByIndustryTypeCode = environment.FoundationR3Url + "/v1" + "/RefIndustryType/GetRefIndustryTypeByIndustryTypeCode";

    //REF PROV DISTRICT
    public static GetRefProvDistrictPaging = environment.FoundationR3Url + "/v1" + "/RefProvDistrict/GetRefProvDistrictPaging";

    //MENU
    public static GetRefFormPaging = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetRefFormPaging";
    public static GetAllActiveRefFormByRefRoleId = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllActiveRefFormByRefRoleId";
    public static GetRefFormByRefFormId = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetRefFormByRefFormId";
    public static EditRefForm = environment.FoundationR3Url + "/v1" + "/MenuManagement/EditRefForm";
    public static AddRefForm = environment.FoundationR3Url + "/v1" + "/MenuManagement/AddRefForm";
    public static DeleteRefForm = "/MenuManagement/DeleteRefForm";
    public static AssignRoleToForms = environment.FoundationR3Url + "/v1" + "/MenuManagement/AssignRoleToForms";
    public static GetAllAuthFormsByRefRoleId = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllAuthFormsByRefRoleId";
    public static GetAuthByRefFormIdAndRefRoleId = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAuthByRefFormIdAndRefRoleId";
    public static UpdateFormFeatureAuthForm = environment.FoundationR3Url + "/v1" + "/MenuManagement/UpdateFormFeatureAuthForm";
    public static GetAllActiveRefFormAndPathExist = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllActiveRefFormAndPathExist";
    public static GetAllActiveRefForm = environment.FoundationR3Url + "/v1" + "/MenuManagement/GetAllActiveRefForm";
    public static LoginByRole = environment.FoundationR3Url + "/v1" + "/Authenticate/LoginByRole";
    public static LoginByToken = environment.FoundationR3Url + "/v1" + "/Authenticate/LoginByToken";
    public static UpdateToken = environment.FoundationR3Url + "/v1" + "/Authenticate/UpdateRole";
    public static LogoutAuth = environment.FoundationR3Url + "/v1" + "/Authenticate/Logout";

    //FORM FEATURE
    public static GetListRefFeature = environment.FoundationR3Url + "/v1" + "/RefFeature/GetListRefFeature";
    public static GetRefFeatureByComponent = environment.FoundationR3Url + "/v1" + "/RefFeature/GetRefFeatureByComponent";

    //HOLIDAY
    public static GetAllActiveHolidaySchmH = environment.FoundationR3Url + "/v1" + "/Holiday/GetAllActiveHolidaySchmH";
    public static GetListActiveHolidaySchemeH = environment.FoundationR3Url + "/v1" + "/HolidaySchm/GetListActiveHolidaySchemeH"
    public static GetHolidayPaging = environment.FoundationR3Url + "/v1" + "/Holiday/GetHolidayPaging";
    public static AddHolidaySchmH = environment.FoundationR3Url + "/v1" + "/HolidaySchm/AddHolidaySchmH";
    public static AddHolidaySchmD = environment.FoundationR3Url + "/v1" + "/HolidaySchm/AddHolidaySchmD";
    public static AddHolidaySchmDUntilYear = environment.FoundationR3Url + "/v1" + "/HolidaySchm/AddHolidaySchmDUntilYear";
    public static GetHolidaySchmH = environment.FoundationR3Url + "/v1" + "/Holiday/GetHolidaySchmH";
    public static GetHolidaySchmHById = environment.FoundationR3Url + "/v1" + "/HolidaySchm/GetHolidaySchmHById";
    public static GetHolidaySchmDById = environment.FoundationR3Url + "/v1" + "/HolidaySchm/GetHolidaySchmDById";
    public static EditHolidaySchmHOnly = environment.FoundationR3Url + "/v1" + "/Holiday/EditHolidaySchmHOnly";
    public static EditHolidaySchmH = environment.FoundationR3Url + "/v1" + "/HolidaySchm/EditHolidaySchmH";
    public static EditHolidaySchmD = environment.FoundationR3Url + "/v1" + "/HolidaySchm/EditHolidaySchmD";
    public static DeleteHolidaySchmD = environment.FoundationR3Url + "/v1" + "/HolidaySchm/DeleteHolidaySchmD";
    public static GetHolidayDetailPaging = environment.FoundationR3Url + "/v1" + "/Holiday/GetHolidayDetailPaging";
    public static CopyHolidaySchmH = environment.FoundationR3Url + "/v1" + "/HolidaySchm/CopyHolidaySchmH";

    //NOTIFICATION
    public static SendNotificationRemainingPasswordExpirationDaysToUser = environment.FoundationR3Url + "/v1" + "/Notification/SendNotificationRemainingPasswordExpirationDaysToUser";
    public static GetNotificationHByNotificationHId = environment.FoundationR3Url + "/v1" + "/NotificationH/GetNotificationHByNotificationHId";
    public static GetListUsernameAndEmpNameByNotificationHId = environment.FoundationR3Url + "/v1" + "/NotificationD/GetListUsernameAndEmpNameByNotificationHId"
    public static AddNotificationHAndD = environment.FoundationR3Url + "/v1" + "/NotificationH/AddNotificationHAndD"
    public static EditNotificationH = environment.FoundationR3Url + "/v1" + "/NotificationH/EditNotificationH"
    public static UpdateReadNotification = environment.FoundationR3Url + "/v1" + "/NotificationD/UpdateReadNotificationD";
    public static GetListNotificationHByRefUserId = environment.FoundationR3Url + "/v1" + "/NotificationH/GetListNotificationHByRefUserId";

    //REF CURR
    public static GetRefCurrPaging = environment.FoundationR3Url + "/v1" + "/RefCurr/GetRefCurrPaging";
    public static AddRefCurr = environment.FoundationR3Url + "/v1" + "/RefCurr/AddRefCurr";
    public static EditRefCurr = environment.FoundationR3Url + "/v1" + "/RefCurr/EditRefCurr";
    public static GetRefCurrById = environment.FoundationR3Url + "/v1" + "/RefCurr/GetRefCurrById";
    public static GetRefCurrByCode = environment.FoundationR3Url + "/v1" + "/RefCurr/GetRefCurrByCode";
    public static GetListKvpActiveRefCurr = environment.FoundationR3Url + "/v1" + "/RefCurr/GetListKvpActiveRefCurr";
    public static AddExchangeRate = environment.FoundationR3Url + "/v1" + "/RefCurr/AddExchangeRate";

    //REF ECONOMIC SECTOR
    public static AddRefEconomicSector = environment.FoundationR3Url + "/v1" + "/RefEconomicSector/AddRefEconomicSector";
    public static EditRefEconomicSector = environment.FoundationR3Url + "/v1" + "/RefEconomicSector/EditRefEconomicSector";
    public static GetRefEconomicSectorById = environment.FoundationR3Url + "/v1" + "/RefEconomicSector/GetRefEconomicSectorById";

    //REF PROV DISTRICT
    public static AddRefProvDistrict = environment.FoundationR3Url + "/v1" + "/RefProvDistrict/AddRefProvDistrict";
    public static EditRefProvDistrict = environment.FoundationR3Url + "/v1" + "/RefProvDistrict/EditRefProvDistrict";
    public static GetRefProvDistrictById = environment.FoundationR3Url + "/v1" + "/RefProvDistrict/GetRefProvDistrictByRefProvDistrictId";

    //ASSET MASTER
    public static AddAssetMaster = environment.FoundationR3Url + "/v1" + "/AssetMaster/AddAssetMaster";
    public static EditAssetMaster = environment.FoundationR3Url + "/v1" + "/AssetMaster/EditAssetMaster";
    public static GetAssetMasterById = environment.FoundationR3Url + "/v1" + "/AssetMaster/GetAssetMasterById";
    public static GetValueAssetType = environment.FoundationR3Url + "/v1" + "/AssetType/GetListKeyValueActiveById";
    public static GetListAssetCategory = environment.FoundationR3Url + "/v1" + "/AssetCategory/GetListAssetCategoryByIdWithCriteriaObj";
    public static GetListAssetSchmH = environment.FoundationR3Url + "/v1" + "/AssetSchmH/GetListAssetSchmHByAssetMasterId";
    public static GetListAssetMasterByAssetSchmHId = environment.FoundationR3Url + "/v1" + "/AssetMaster/GetListAssetMasterByAssetSchmHId";
    public static EditListAssetSchmDByAssetMasterId = environment.FoundationR3Url + "/v1" + "/AssetSchmD/EditListAssetSchmDByAssetMasterId";
    public static GetUploadAssetMasterByUploadMonitoringNoAndTrxType = environment.FoundationR3Url + "/v2" + "/AssetMaster/GetUploadAssetMasterByUploadMonitoringNoAndTrxType";
    public static AddAssetMasterAttrContent = environment.FoundationR3Url + "/v1" + "/AssetMasterAttrContent/AddAssetMasterAttrContent";
    public static GetAssetMasterAttrContentForAssetMaster = environment.FoundationR3Url + "/v1" + "/AssetMasterAttrContent/GetAssetMasterAttrContentForAssetMaster";
    public static GetAssetMasterAttrContentForAssetMasterByAttrTypeCode = environment.FoundationR3Url + "/v1" + "/AssetMasterAttrContent/GetAssetMasterAttrContentForAssetMasterByAttrTypeCode";

    //REF ATTR
    public static GetListActiveRefAttrType = environment.FoundationR3Url + "/v1" + "/RefAttrType/GetListActiveRefAttrType";
    public static GetRefAttrById = environment.FoundationR3Url + "/v1" + "/RefAttr/GetRefAttrById";
    public static AddRefAttr = environment.FoundationR3Url + "/v1" + "/RefAttr/AddRefAttr";
    public static EditRefAttr = environment.FoundationR3Url + "/v1" + "/RefAttr/EditRefAttr";
    public static GetListActiveRefAttrByAttrGroup = environment.FoundationR3Url + "/v1" + "/RefAttr/GetListActiveRefAttrByAttrGroup"
    public static GetListActiveRefAttrByListAttrGroup = environment.FoundationR3Url + "/v1" + "/RefAttr/GetListActiveRefAttrByListAttrGroup"

    //REF PROFESSION
    public static AddRefProfession = environment.FoundationR3Url + "/v1" + "/RefProfession/AddRefProfession";
    public static EditRefProfession = environment.FoundationR3Url + "/v1" + "/RefProfession/EditRefProfession";
    public static DeleteRefProfession = "/RefProfession/DeleteRefProfession";
    public static GetRefProfessionById = environment.FoundationR3Url + "/v1" + "/RefProfession/GetRefProfessionByRefProfessionId";
    public static GetRefProfessionByProfessionCode = environment.FoundationR3Url + "/v1" + "/RefProfession/GetRefProfessionByProfessionCode"
    public static GetRefProfessionByRefProfessionId = environment.FoundationR3Url + "/v1" + "/RefProfession/GetRefProfessionByRefProfessionId";

    //REF REASON
    public static AddRefReason = environment.FoundationR3Url + "/v1" + "/RefReason/AddRefReason";
    public static EditRefReason = environment.FoundationR3Url + "/v1" + "/RefReason/EditRefReason";
    public static GetRefReasonById = environment.FoundationR3Url + "/v1" + "/RefReason/GetRefReasonByRefReasonId";

    //REF REASON TYPE
    public static GetValueReasonType = environment.FoundationR3Url + "/v1" + "/RefReasonType/GetListKeyValueByCode";

    //WORKHOUR
    public static GetListActiveWorkingSchmH = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/GetListActiveWorkingSchmH";
    public static GetWorkHourSchmHPaging = environment.FoundationR3Url + "/v1" + "/WorkHour/GetWorkHourSchmHPaging";
    public static AddWorkingHourSchmH = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/AddWorkingHourSchmH";
    public static AddListWorkingHourSchmD = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/AddListWorkingHourSchmD";
    public static EditListWorkingHourSchmD = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/EditListWorkingHourSchmD";
    public static EditWorkingHourSchmH = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/EditWorkingHourSchmH";
    public static GetWorkingHourSchmH = environment.FoundationR3Url + "/v1" + "/WorkHour/GetWorkingHourSchmH";
    public static GetWorkingHourSchmD = environment.FoundationR3Url + "/v1" + "/WorkHour/GetWorkingHourSchmD";
    public static GetWorkingHourSchmHById = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/GetWorkingHourSchmHById";
    public static GetListWorkingHourSchmDByWorkingHourHId = environment.FoundationR3Url + "/v1" + "/WorkingHourSchm/GetListWorkingHourSchmDByWorkingHourHId";

    //QUEUE
    public static AddQueue = environment.FoundationR3Url + "/v1" + "/RabbitMq/AddQueue";

    //REF MODULE
    public static GetListRefModuleKeyValue = environment.FoundationR3Url + "/v1" + "/RefModule/GetListRefModuleKeyValue";
    public static GetListKeyValueByCode = environment.FoundationR3Url + "/v1" + "/RefModule/GetListKeyValueByCode";
    public static GetListKeyValueRefModuleById = environment.FoundationR3Url + "/v1" + "/RefModule/GetListKeyValueRefModuleById";

    //REF EMP LEAVE MANAGEMENT
    public static GetRefEmpLeaveMngmntPaging = environment.FoundationR3Url + "/v1" + "/RefEmpLeaveManagement/GetRefEmpLeaveMngmntPaging";
    public static DeleteRefEmpLeaveMngmnt = environment.FoundationR3Url + "/v2" + "/RefEmpLeaveMngmnt/DeleteRefEmpLeaveMngmnt";
    public static GetRefEmpLeaveMngmntById = environment.FoundationR3Url + "/v1" + "/RefEmpLeaveMngmnt/GetRefEmpLeaveByRefEmpLeaveId";
    public static EditRefEmpLeaveMngmnt = environment.FoundationR3Url + "/v2" + "/RefEmpLeaveMngmnt/EditRefEmpLeaveMngmnt";
    public static AddRefEmpLeaveMngmnt = environment.FoundationR3Url + "/v2" + "/RefEmpLeaveMngmnt/AddRefEmpLeaveMngmnt";

    //UPLOAD
    public static UploadReview = environment.FoundationR3Url + "/v1" + "/Upload/UploadReview";
    public static UploadReviewV2 = environment.FoundationR3Url + "/v2" + "/Upload/UploadReview";
    public static UpdateUploadMonitoringHStatActivity = environment.FoundationR3Url + "/v1" + "/Upload/UpdateUploadMonitoringHStatActivity";
    public static CancelUpload = environment.FoundationR3Url + "/v1" + "/Upload/CancelUpload";
    public static CancelUploadV2 = environment.FoundationR3Url + "/v2" + "/Upload/CancelUpload";
    public static UploadFile = environment.FoundationR3Url + "/v1" + "/Upload/UploadFile";
    public static UploadFileV2 = environment.FoundationR3Url + "/v2" + "/Upload/UploadFile";

    //UPLOAD MONITORING FOUNDATION
    public static GetUploadMonitoringPaging = environment.FoundationR3Url + "/v1" + "/UploadMonitoring/GetUploadMonitoringPaging";

    //UPLOAD TYPE
    public static GetUploadTypeByUploadTypeId = environment.FoundationR3Url + "/v1" + "/UploadType/GetUploadTypeByUploadTypeId";
    public static GetUploadTypePaging = environment.FoundationR3Url + "/v1" + "/UploadType/GetUploadTypePaging";

    //UPLOAD SETTING
    public static GetUploadSettingHIdByUploadTypeId = environment.FoundationR3Url + "/v1" + "/UploadSetting/GetUploadSettingHIdByUploadTypeId";
    public static GetListUploadSettingDIdByUploadSettingHId = environment.FoundationR3Url + "/v1" + "/UploadSetting/GetListUploadSettingDIdByUploadSettingHId";
    public static GetListUploadSettingDIdByUploadTypeId = environment.FoundationR3Url + "/v1" + "/UploadSetting/GetListUploadSettingDIdByUploadTypeId";
    public static AssignRoleToUploadSetting = environment.FoundationR3Url + "/v1" + "/UploadSetting/AssignRoleToUploadSetting";
    public static GetListRefRoleByUploadTypeId = environment.FoundationR3Url + "/v1" + "/UploadSetting/GetListRefRoleByUploadTypeId";
    public static GetListUploadSettingDByUploadSettingHId = "/UploadSetting/GetListUploadSettingDByUploadSettingHId";

    // GENERIC
    public static GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode = environment.ApprovalR3Url + "/Generic/GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode";

    // ASSET TYPE
    public static AddAssetType = environment.FoundationR3Url + "/v1" + "/AssetType/AddAssetType"
    public static EditAssetType = environment.FoundationR3Url + "/v1" + "/AssetType/EditAssetType"
    public static GetAssetTypeByCode = environment.FoundationR3Url + "/v1" + "/AssetType/GetAssetTypeByCode"
    public static GetAssetTypeById = environment.FoundationR3Url + "/v1" + "/AssetType/GetAssetTypeById"
    public static GetListAssetType = environment.FoundationR3Url + "/v1" + "/AssetType/GetListAssetType"
    public static GetListActiveAssetType = environment.FoundationR3Url + "/v1" + "/AssetType/GetListActiveAssetType"

    // LIST APPROVER
    public static ApvHoldTaskUrl = environment.FoundationR3Url + "/v1" + "/Approval/Hold";
    public static ApvTakeBackTaskUrl = environment.FoundationR3Url + "/v1" + "/Approval/TakeBack";

    //REF REASON
    public static GetValueReasonModel = environment.FoundationR3Url + "/v1" + "/RefReason/GetListKeyValueByCode";
    public static GetListActiveRefReason = environment.FoundationR3Url + "/v1" + "/RefReason/GetListActiveRefReason";
    //asset accesory
    public static AddNewAssetAccesory = environment.FoundationR3Url + "/v1" + "/AssetAccessory/AddAssetAccessory"
    public static EditAssetAccessory = environment.FoundationR3Url + "/v1" + "/AssetAccessory/EditAssetAccessory"
    public static GetAssetAccessorybyAssetAccesoryCode = environment.FoundationR3Url + "/v1" + "/AssetAccessory/GetAssetAccessoryByCode"
    public static GetAssetAccessorybyAssetAccessoryId = environment.FoundationR3Url + "/v1" + "/AssetAccessory/GetAssetAccessoryById"
    public static GetlistAssetAccessorybyAssetTypeId = environment.FoundationR3Url + "/v1" + "/AssetAccessory/GetListAssetAccessoryByAssetTypeId"
    public static DeleteAssetAccessory = environment.FoundationR3Url + "/v1" + "/AssetAccessory/DeleteAssetAccessory"

    //asset attr
    public static AddAssetAttr = environment.FoundationR3Url + "/v1" + "/AssetAttr/AddAssetAttr";
    public static EditAssetAttr = environment.FoundationR3Url + "/v1" + "/AssetAttr/EditAssetAttr";
    public static GetListAssetAttrByAssetTypeId = environment.FoundationR3Url + "/v1" + "/AssetAttr/GetListAssetAttrByAssetTypeId";
    public static GetAssetAttrByAssetAttrId = environment.FoundationR3Url + "/v1" + "/AssetAttr/GetAssetAttrByAssetAttrId";
    public static DeleteAssetAttr = environment.FoundationR3Url + "/v1" + "/AssetAttr/DeleteAssetAttr";

    //asset category
    public static AddNewAssetCategory = environment.FoundationR3Url + "/v1" + "/AssetCategory/AddAssetCategory"
    public static EditAssetCategory = environment.FoundationR3Url + "/v1" + "/AssetCategory/EditAssetCategory"
    public static GetAssetCategoryByAssetCategoryCode = environment.FoundationR3Url + "/v1" + "/AssetCategory/GetAssetCategoryByCode"
    public static GetAssetCategorybyAssetCategoryId = environment.FoundationR3Url + "/v1" + "/AssetCategory/GetAssetCategoryById"
    public static GetlistAssetCategorybyAssetTypeId = environment.FoundationR3Url + "/v1" + "/AssetCategory/GetListAssetCategoryByAssetTypeId"//
    public static DeleteAssetCategory = environment.FoundationR3Url + "/v1" + "/AssetCategory/DeleteAssetCategory"
    public static GetActiveAssetCategoryValue = environment.FoundationR3Url + "/v1" + "/AssetCategory/GetListActiveAssetCategoryValue"

    // ASSET DOC LIST
    public static AddNewAssetDocList = environment.FoundationR3Url + "/v1" + "/AssetDocList/AddAssetDocList"
    public static EditAssetDocList = environment.FoundationR3Url + "/v1" + "/AssetDocList/EditAssetDocList"
    public static GetAssetDocListByAssetDocListId = environment.FoundationR3Url + "/v1" + "/AssetDocList/GetAssetDocListById"
    public static GetlistAssetDocListByAssetTypeId = environment.FoundationR3Url + "/v1" + "/AssetDocList/GetListAssetDocListByAssetTypeId"
    public static DeleteAssetDocList = environment.FoundationR3Url + "/v1" + "/AssetDocList/DeleteAssetDocList"

    // ASSET REF DOC
    public static AddNewRefAssetDocData = environment.FoundationR3Url + "/v1" + "/RefAssetDoc/AddRefAssetDoc"
    public static EditRefAssetDocData = environment.FoundationR3Url + "/v1" + "/RefAssetDoc/EditRefAssetDoc"
    public static GetRefAssetDocByAssetDocCode = environment.FoundationR3Url + "/v1" + "/RefAssetDoc/GetRefAssetDocByAssetDocCode"
    public static GetRefAssetDocByRefAssetDocId = environment.FoundationR3Url + "/v1" + "/RefAssetDoc/GetRefAssetDocByRefAssetDocId"
    public static GetListRefAssetDoc = environment.FoundationR3Url + "/v1" + "/RefAssetDoc/GetListRefAssetDoc"


    // ASSET SCHEME
    public static GetAssetSchmHById = environment.FoundationR3Url + "/v1" + "/AssetSchmH/GetAssetSchmHById";
    public static AddAssetSchmH = environment.FoundationR3Url + "/v1" + "/AssetSchmH/AddAssetSchmH";
    public static EditAssetSchmH = environment.FoundationR3Url + "/v1" + "/AssetSchmH/EditAssetSchmH";
    public static GetListAssetSchmDByAssetSchmHId = environment.FoundationR3Url + "/v1" + "/AssetSchmD/GetListAssetSchmDByAssetSchmHId"
    public static EditListAssetSchmD = environment.FoundationR3Url + "/v1" + "/AssetSchmD/EditListAssetSchmD"
    public static AddListAssetSchmD = environment.FoundationR3Url + "/v1" + "/AssetSchmD/AddListAssetSchmD";
    public static DeleteAssetSchmD = environment.FoundationR3Url + "/v1" + "/AssetSchmD/DeleteAssetSchmD";
    public static AddRangeAssetSchmD = environment.FoundationR3Url + "/v1" + "/AssetSchmD/AddRangeAssetSchmD";

    // ASSET TYPE
    public static GetActiveAssetTypeValue = environment.FoundationR3Url + "/v1" + "/AssetType/GetListActiveAssetType";

    // ASSET NEGATIVE
    public static AddAssetNegative = environment.FoundationR3Url + "/v1" + "/AssetNegative/AddAssetNegative";
    public static EditAssetNegative = environment.FoundationR3Url + "/v1" + "/AssetNegative/EditAssetNegative";
    public static GetAssetNegativeByIdEditPage = environment.FoundationR3Url + "/v1" + "/AssetNegative/GetAssetNegativeByIdEditPage";
    public static GetUploadAssetNegativeByUploadMonitoringNoAndTrxType = environment.FoundationR3Url + "/v2" + "/AssetNegative/GetUploadAssetNegativeByUploadMonitoringNoAndTrxType";

    // VENDOR
    public static AddVendorHO = environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorHO";
    public static EditVendorHO = environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorHO";
    public static AddVendorHolding = environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorHolding";
    public static EditVendorHolding = environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorHolding";
    public static AddVendorATPM = environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorATPM";
    public static EditVendorATPM = environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorATPM";
    public static GetVendorAndVendorAddr = environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorAndVendorTaxAddrByVendorId";
    public static GetVendorAddrByVendorIdOnly = environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorId";
    public static GetVendorByVendorId = environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorByVendorId";
    public static AddVendorAddr = environment.FoundationR3Url + "/v1" + "/VendorAddr/AddVendorAddr";
    public static EditVendorAddr = environment.FoundationR3Url + "/v1" + "/VendorAddr/EditVendorAddr";
    public static GetVendorAddrByVendorId = environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorIdMrAddrType";
    public static GetListHoByVendorId = environment.FoundationR3Url + "/v1" + "/Vendor/GetListHoByVendorId";
    public static GetListVendorBankAccByVendorId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetListVendorBankAccByVendorId";
    public static AddVendorBankAcc = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/AddVendorBankAcc";
    public static EditVendorBankAcc = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/EditVendorBankAcc";
    public static GetVendorBankAccByVendorBankAccId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetVendorBankAccByVendorBankAccId";
    public static DeleteVendorBankAcc = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/DeleteVendorBankAcc";
    public static GetListVendorContactPersonByVendorCode = environment.FoundationR3Url + "/v1" + "/VendorContactPerson/GetListVendorContactPersonByVendorCode"
    public static GetVendorContactPersonById = environment.FoundationR3Url + "/v1" + "/VendorContactPerson/GetVendorContactPersonById";
    public static AddVendorContactPerson = environment.FoundationR3Url + "/v1" + "/VendorContactPerson/AddVendorContactPerson";
    public static EditVendorContactPerson = environment.FoundationR3Url + "/v1" + "/VendorContactPerson/EditVendorContactPerson";
    public static DeleteVendorContactPerson = environment.FoundationR3Url + "/v1" + "/VendorContactPerson/DeleteVendorContactPerson";
    public static GetListVendorContactPersonByVendorId = environment.FoundationR3Url + "/v1" + "/VendorContactPerson/GetListVendorContactPersonByVendorId"
    public static GetListBranchByVendorId = environment.FoundationR3Url + "/v1" + "/Vendor/GetListBranchByVendorId";
    public static GetListVendorBankAccByVendorEmpId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetListVendorBankAccByVendorEmpId";
    public static GetVendorAddrByVendorAddrId = environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorAddrId";
    public static GetVendorByVendorCode = environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorByVendorCode";
    public static GetListKeyValueActiveByCategoryCodeAndOfficeCode = environment.FoundationR3Url + "/v1" + "/Vendor/GetListKeyValueActiveByCategoryCodeAndOfficeCode";
    public static GetListKvpVendorObjByCategoryCode = environment.FoundationR3Url + "/v1" + "/Vendor/GetListKvpVendorObjByCategoryCode";
    
    //VENDOR FUNDING COY
    public static AddVendorFundingCoy = environment.FoundationR3Url + "/v1" + "/Vendor/AddFundingCompany";
    public static EditVendorFundingCoy = environment.FoundationR3Url + "/v1" + "/Vendor/EditFundingCompany";

    // VENDOR ADDR
    public static GetVendorAddrByVendorCodeAndMrAddrTypeCode = environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorCodeAndMrAddrTypeCode";
    public static GetVendorAddrByVendorCode = environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorCode";
    // VENDOR BANK ACC
    public static GetVendorBankAccDefaultByVendorId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetVendorBankAccDefaultByVendorId";

    // VENDOR GRADING
    public static SubmitRequestVendorGrading = environment.FoundationR3Url + "/v1" + "/VendorGrading/SubmitRequestVendorGrading";
    public static SubmitRequestVendorGradingV2 = environment.FoundationR3Url + "/v2" + "/VendorGrading/SubmitRequestVendorGrading";
    public static GetRuleVendorGrading = environment.FoundationR3Url + "/v1" + "/VendorGrading/GetRuleVendorGrading";
    public static GetRuleVendorGradingV2 = environment.FoundationR3Url + "/v2" + "/VendorGrading/GetRuleVendorGrading";
    public static GetVendorGrade = environment.FoundationR3Url + "/v1" + "/VendorGrading/GetVendorGrade";

    // VENDOR OFFICE MEMBER
    public static AddListVendorOfficeMember = environment.FoundationR3Url + "/v1" + "/VendorOfficeMbr/AddListVendorOfficeMember"
    public static GetListVendorOfficeMbrByVendorId = environment.FoundationR3Url + "/v1" + "/VendorOfficeMbr/GetListVendorOfficeMbrByVendorId"
    public static DeleteVendorOfficeMember = environment.FoundationR3Url + "/v1" + "/VendorOfficeMbr/DeleteVendorOfficeMember"

    // VENDOR GROUP
    public static AddVendorGrp = environment.FoundationR3Url + "/v1" + "/VendorGrp/AddVendorGrp";
    public static EditVendorGrp = environment.FoundationR3Url + "/v1" + "/VendorGrp/EditVendorGrp";
    public static GetVendorGrpByVendorGrpCode = environment.FoundationR3Url + "/v1" + "/VendorGrp/GetVendorGrpByVendorGrpCode";
    public static GetVendorGrpByVendorGrpId = environment.FoundationR3Url + "/v1" + "/VendorGrp/GetVendorGrpByVendorGrpId";
    public static GetVendorGrpForUpdateByVendorGrpCode = environment.FoundationR3Url + "/v1" + "/VendorGrp/GetVendorGrpForUpdateByVendorGrpCode";
    public static GetVendorGrpForUpdateByVendorGrpId = environment.FoundationR3Url + "/v1" + "VendorGrp/GetVendorGrpForUpdateByVendorGrpId";
    public static GetListVendorGrpByVendorId = environment.FoundationR3Url + "/v1" + "/VendorGrp/GetListVendorGrpByVendorId";

    // VENDOR GROUP MEMBER 
    public static GetListVendorGrpMbrByVendorGrpId = environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/GetListVendorGrpMbrByVendorGrpId";
    public static GetListVendorGrpMbrByVendorId = environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/GetListVendorGrpMbrByVendorId";
    public static AddRangeVendorGrpMbr = environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/AddRangeVendorGrpMbr";
    public static DeleteVendorGrpMemberById = environment.FoundationR3Url + "/v1" + "/VendorGrpMbr/DeleteVendorGrpMbrById"

    // VENDOR BRANCH
    public static AddVendorBranch = environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorBranch"
    public static GetVendorBranchAndVendorTaxAddrByVendorId = environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorBranchAndVendorTaxAddrByVendorId"
    public static EditVendorBranch = environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorBranch";

    // VENDOR EMP
    public static AddVendorBranchEmp = environment.FoundationR3Url + "/v1" + "/VendorEmp/AddVendorBranchEmp";
    public static AddVendorBranchEmpV2 = environment.FoundationR3Url + "/v2" + "/VendorEmp/AddVendorBranchEmp";
    public static GetVendorEmpByVendorEmpId = environment.FoundationR3Url + "/v1" + "/VendorEmp/GetVendorEmpByVendorEmpId";
    public static GetVendorEmpAndVendorTaxAddrByVendorEmpId = environment.FoundationR3Url + "/v1" + "/VendorEmp/GetVendorEmpAndVendorTaxAddrByVendorEmpId";
    public static EditVendorBranchEmp = environment.FoundationR3Url + "/v1" + "/VendorEmp/EditVendorBranchEmp";
    public static EditVendorBranchEmpV2 = environment.FoundationR3Url + "/v2" + "/VendorEmp/EditVendorBranchEmp";
    public static GetListVendorEmpByVendorId = environment.FoundationR3Url + "/v1" + "/VendorEmp/GetListVendorEmpByVendorId";

    // VENDOR ADDR
    public static GetVendorAddrByVendorEmpId = environment.FoundationR3Url + "/v1" + "/VendorAddr/GetVendorAddrByVendorEmpIdMrAddrType";

    // VENDOR SCHEME
    public static AddVendorSchm = environment.FoundationR3Url + "/v1" + "/VendorSchm/AddVendorSchm";
    public static EditVendorSchm = environment.FoundationR3Url + "/v1" + "/VendorSchm/EditVendorSchm";
    public static GetVendorSchmByVendorSchmId = environment.FoundationR3Url + "/v1" + "/VendorSchm/GetVendorSchmByVendorSchmId";
    public static AddVendorSchmMember = environment.FoundationR3Url + "/v1" + "/VendorSchmMbr/AddVendorSchmMember";
    public static DeleteVendorSchmMember = environment.FoundationR3Url + "/v1" + "/VendorSchmMbr/DeleteVendorSchmMember"
    public static GetListVendorSchmMemberByVendorSchmId = environment.FoundationR3Url + "/v1" + "/VendorSchmMbr/GetListVendorSchmMemberByVendorSchmId"

    // VENDOR ATTR
    public static GetListActiveVendorAttrByVendorCategoryCode = environment.FoundationR3Url + "/v1" + "/VendorAttr/GetListActiveVendorAttrByVendorCategoryCode";

    // VENDOR ATTR CONTENT
    public static AddRangeVendorAttrContent = environment.FoundationR3Url + "/v1" + "/VendorAttrContent/AddRangeVendorAttrContent";
    public static EditListVendorAttrContent = environment.FoundationR3Url + "/v1" + "/VendorAttrContent/EditListVendorAttrContent";
    public static DeleteRangeVendorAttrContentByIds = "/VendorAttrContent/DeleteRangeVendorAttrContentByIds";
    public static GetListVendorAttrContentByVendorAttrId = environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListVendorAttrContentByVendorAttrId";
    public static GetListVendorAttrContentByVendorId = environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListVendorAttrContentByVendorId";
    public static GetListVendorAttrContentByVendorCode = environment.FoundationR3Url + "/v1" + "/VendorAttrContent/GetListVendorAttrContentByVendorCode";

    // VENDOR ATPM MAPPING
    public static GetListVendorAtpmMappingByVendorId = environment.FoundationR3Url + "/v1" + "/Vendor/GetListVendorAtpmMappingByVendorId"

    // VERIFICATION
    // REF VERF ANSWER TYPE
    public static GetActiveRefVerfAnswerTypes = environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetActiveRefVerfAnswerTypes";
    public static GetRefVerfAnswerTypeByCode = environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeByCode";
    public static GetRefVerfAnswerTypeById = environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeById";
    public static GetRefVerfAnswerTypes = environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypes";
    public static GetRefVerfAnswerTypeForUpdateById = environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeForUpdateById";
    public static GetRefVerfAnswerTypeForUpdateByCode = environment.FoundationR3Url + "/v1" + "/RefVerfAnswerType/GetRefVerfAnswerTypeForUpdateByCode";

    // VERF QUESTION ANSWER
    public static AddVerfQuestionAnswer = environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/AddVerfQuestionAnswer";
    public static EditVerfQuestionAnswer = environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/EditVerfQuestionAnswer";
    public static GetVerfQuestionAnswerByRefVerfAnswerTypeId = environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerByRefVerfAnswerTypeId";
    public static GetVerfQuestionAnswerForUpdateById = environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerForUpdateById";
    public static GetVerfQuestionAnswerListByVerfSchemeCode = environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerListByVerfSchemeCode";
    public static GetVerfQuestionAnswerListByVerfSchemeHId = environment.FoundationR3Url + "/v1" + "/VerfQuestionAnswer/GetVerfQuestionAnswerListByVerfSchemeHId";

    // VERF QUESTION GRP H
    public static AddVerfQuestionGrpH = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/AddVerfQuestionGrpH";
    public static EditVerfQuestionGrpH = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/EditVerfQuestionGrpH";
    public static GetActiveVerfQuestionGrpHs = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetActiveVerfQuestionGrpHs";
    public static GetVerfQuestionGrpHs = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetVerfQuestionGrpHs";
    public static GetQuestionGrpHById = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHById";
    public static GetQuestionGrpHForUpdateById = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHForUpdateById";
    public static GetQuestionGrpHByCode = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHByCode";
    public static GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpH/GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById"

    // VERF QUESTION GRP D
    public static AddListVerfQuestionGrpD = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/AddListVerfQuestionGrpD";
    public static DeleteVerfQuestionGroupDById = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/DeleteVerfQuestionGroupDById";
    public static EditVerfQuestionGrpD = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/EditVerfQuestionGrpD";
    public static GetActiveVerfQuestionGrpDsByGrpHId = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetActiveVerfQuestionGrpDsByGrpHId";
    public static GetVerfQuestionGrpDById = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetVerfQuestionGrpDById";
    public static GetVerfQuestionGrpDByGrpHId = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetVerfQuestionGrpDByGrpHId";
    public static GetVerfQuestionGrpDForUpdateById = environment.FoundationR3Url + "/v1" + "/VerfQuestionGrpD/GetVerfQuestionGrpDForUpdateById";

    // VERF RESULT
    public static GetVerfResultsByTrxRefNo = environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultsByTrxRefNo";
    public static GetVerfResultById = environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultById";
    public static GetVerfResultByResultNo = environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultByResultNo";
    public static GetVerfResultByTrxRefNoAndVerfTrxTypeCode = environment.FoundationR3Url + "/v1" + "/VerfResult/GetVerfResultByTrxRefNoAndVerfTrxTypeCode";
    public static AddVerfResult = environment.FoundationR3Url + "/v1" + "/VerfResult/AddVerfResult";
    public static AddVerfResultHeaderAndVerfResultDetailForSurveyVerif = environment.FoundationR3Url + "/v1" + "/VerfResultH/AddVerfResultHeaderAndVerfResultDetailForSurveyVerif";

    // VERF RESULT H
    public static GetVerfResultHsByVerfResultId = environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHsByVerfResultId";
    public static GetVerfResultHById = environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHById";
    public static GetVerfResultHsByTrxRefNo = environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHsByTrxRefNo";
    public static GetVerfResultHByTrxRefNoAndMrAddrTypeCode = environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHByTrxRefNoAndMrAddrTypeCode";
    public static GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode = environment.FoundationR3Url + "/v1" + "/VerfResultH/GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode";

    // VERF RESULT D
    public static EditVerfResultD = environment.FoundationR3Url + "/v1" + "/VerfResultD/EditVerfResultD";
    public static GetVerfResultDsByVerfResultHId = environment.FoundationR3Url + "/v1" + "/VerfResultD/GetVerfResultDsByVerfResultHId";
    public static GetVerfResultDById = environment.FoundationR3Url + "/v1" + "/VerfResultD/GetVerfResultDById";
    public static GetListVerfResultDInQuestionGrp = environment.FoundationR3Url + "/v1" + "/VerfResultD/GetListVerfResultDInQuestionGrp";
    
    // VERF SCHEME H
    public static AddVerfSchemeH = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/AddVerfSchemeH";
    public static EditVerfSchemeH = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/EditVerfSchemeH";
    public static DeleteVerfSchemeHById = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/DeleteVerfSchemeHById";
    public static GetActiveVerfSchemeHs = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetActiveVerfSchemeHs";
    public static GetVerfSchemeHs = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHs";
    public static GetVerfSchemeHById = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHById";
    public static GetVerfSchemeHByCode = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHByCode";

    // VERF SCHEME D
    public static EditVerfSchemeD = environment.FoundationR3Url + "/v1" + "/VerfSchemeD/EditVerfSchemeD";
    public static GetVerfSchemeHForUpdateById = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeHForUpdateById";
    public static GetVerfSchemeDataByVerfSchemeHId = environment.FoundationR3Url + "/v1" + "/VerfSchemeH/GetVerfSchemeDataByVerfSchemeHId";
    public static AddListVerfSchemeD = environment.FoundationR3Url + "/v1" + "/VerfSchemeD/AddListVerfSchemeD";
    public static DeleteVerfSchemeD = environment.FoundationR3Url + "/v1" + "/VerfSchemeD/DeleteVerfSchemeD";
    public static GetVerfSchemeDsByVerfSchemeHId = environment.FoundationR3Url + "/v1" + "/VerfSchemeD/GetVerfSchemeDsByVerfSchemeHId";
    public static GetVerfSchemeDById = environment.FoundationR3Url + "/v1" + "/VerfSchemeD/GetVerfSchemeDById";

    // CUST DUPLICATE CHECKING
    public static GetCustomerDuplicateCheck = environment.FoundationR3Url + "/v1" + "/CustDuplicateCheck/GetCustomerDuplicateCheck";
    public static GetNegativeCustomerDuplicateCheck = environment.FoundationR3Url + "/v1" + "/CustDuplicateCheck/GetNegativeCustomerDuplicateCheck";
    public static GetCustomerAndNegativeCustDuplicateCheck = environment.FoundationR3Url + "/v1" + "/CustDuplicateCheck/GetCustomerAndNegativeCustDuplicateCheck";

    // CUSTOMER PERSONAL
    public static AddNewCustPersonal = environment.FoundationR3Url + "/v1" + "/CustPersonal/AddCustPersonal"
    public static EditCustPersonal = environment.FoundationR3Url + "/v1" + "/CustPersonal/EditCustPersonal"
    public static GetCustPersonalbyCustPersonalId = environment.FoundationR3Url + "/v1" + "/CustPersonal/GetCustPersonalByCustPersonalId"
    public static GetCustPersonalbyCustId = environment.FoundationR3Url + "/v1" + "/CustPersonal/GetCustPersonalByCustId"

    // CUSTOMER
    public static AddNewCust = environment.FoundationR3Url + "/v1" + "/Cust/AddCust";
    public static AddCustPersonalMainData = environment.FoundationR3Url + "/v1" + "/Cust/AddCustPersonalMainData";
    public static AddCustPersonalMainDataV2 = environment.FoundationR3Url + "/v2" + "/Cust/AddCustPersonalMainData";
    public static AddCustCompanyMainData = environment.FoundationR3Url + "/v1" + "/Cust/AddCustCompanyMainData";
    public static AddCustCompanyMainDataV2 = environment.FoundationR3Url + "/v2" + "/Cust/AddCustCompanyMainData";
    public static EditCust = environment.FoundationR3Url + "/v1" + "/Cust/EditCust";
    public static EditCustPersonalMainData = environment.FoundationR3Url + "/v1" + "/Cust/EditCustPersonalMainData";
    public static EditCustPersonalMainDataV2 = environment.FoundationR3Url + "/v2" + "/Cust/EditCustPersonalMainData";
    public static EditCustCompanyMainData = environment.FoundationR3Url + "/v1" + "/Cust/EditCustCompanyMainData";
    public static EditCustCompanyMainDataV2 = environment.FoundationR3Url + "/v2" + "/Cust/EditCustCompanyMainData";
    public static EditDuplicateCust = environment.FoundationR3Url + "/v1" + "/Cust/EditDuplicateCust";
    public static EditNegativeDuplicateCust = environment.FoundationR3Url + "/v1" + "/Cust/EditNegativeDuplicateCust";
    public static GetCustByCustId = environment.FoundationR3Url + "/v1" + "/Cust/GetCustByCustId";
    public static GetCustPersonalForUpdateByCustNo = environment.FoundationR3Url + "/v1" + "/Cust/GetCustPersonalForUpdateByCustNo";
    public static GetCustCompanyForUpdateByCustNo = environment.FoundationR3Url + "/v1" + "/Cust/GetCustCompanyForUpdateByCustNo";
    public static DeleteNegativeCustomer = environment.FoundationR3Url + "/v1" + "/NegativeCust/DeleteNegativeCust";
    public static GetListCustGrpByMemberCustIdForCustGrpTab = environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpByMemberCustIdForCustGrpTab";
    public static GetListCustGrpByMemberCustId = environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpByMemberCustId";
    public static GetCustByCustNo = environment.FoundationR3Url + "/v1" + "/Cust/GetCustByCustNo";
    public static AddCustAsset = environment.FoundationR3Url + "/v1" + "/CustAsset/AddCustAsset";
    public static DeleteCustAsset = environment.FoundationR3Url + "/v1" + "/CustAsset/DeleteCustAsset";
    public static EditCustAsset = environment.FoundationR3Url + "/v1" + "/CustAsset/EditCustAsset";
    public static GetCustAssetByCustAssetId = environment.FoundationR3Url + "/v1" + "/CustAsset/GetCustAssetByCustAssetId";
    public static GetListCustAssetByCustId = environment.FoundationR3Url + "/v1" + "/CustAsset/GetListCustAssetByCustId";

    public static SaveCustPersonalShareholderMainData = environment.FoundationR3Url  + '/v1' + "/Cust/SaveCustPersonalShareholderMainData";
    public static SaveCustPersonalShareholderMainDataV2 = environment.FoundationR3Url  + '/v2' + "/Cust/SaveCustPersonalShareholderMainData";
    public static SaveCustCompanyShareholderMainData = environment.FoundationR3Url  + '/v1' + "/Cust/SaveCustCompanyShareholderMainData";
    public static SaveCustCompanyShareholderMainDataV2 = environment.FoundationR3Url  + '/v2' + "/Cust/SaveCustCompanyShareholderMainData";
    public static SaveCustPersonalFamilyMainData = environment.FoundationR3Url  + '/v1' + "/Cust/SaveCustPersonalFamilyMainData";
    public static SaveCustPersonalFamilyMainDataV2 = environment.FoundationR3Url  + '/v2' + "/Cust/SaveCustPersonalFamilyMainData";
    public static NewEditDuplicateCust = environment.FoundationR3Url  + '/v1' + "/Cust/NewEditDuplicateCust";
    public static NewEditDuplicateCustV2 = environment.FoundationR3Url  + '/v2' + "/Cust/NewEditDuplicateCust";    
    public static GetCustHighlightCommentByCustId = environment.FoundationR3Url + "/v1" + "/Cust/GetCustHighlightCommentByCustId";
    public static SendCustomerDataToRabbitMq = environment.FoundationR3Url + "/v1" + "/Cust/SendCustomerDataToRabbitMq";
    public static UpdateToMainCustomer = environment.FoundationR3Url + "/v1" + "/Cust/UpdateToMainCustomer";
    
    // CUSTOMER COMPANY
    public static GetListViewCustCompanyLegalDocByCustCompanyId = environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/GetListViewCustCompanyLegalDocByCustCompanyId";
    public static DeleteCustCompanyLegalDoc = environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/DeleteCustCompanyLegalDoc";
    public static AddCustCompanyLegalDoc = environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/AddCustCompanyLegalDoc";
    public static EditCustCompanyLegalDoc = environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/EditCustCompanyLegalDoc";

    // CUSTOMER GROUP
    public static AddCustGrpBothWays = environment.FoundationR3Url + "/v1" + "/CustGrp/AddCustGrpBothWays";
    public static AddCustGrp = environment.FoundationR3Url + "/v1" + "/CustGrp/AddCustGrp";
    public static EditCustGrp = environment.FoundationR3Url + "/v1" + "/CustGrp/EditCustGrp";
    public static DeleteCustGrp = environment.FoundationR3Url + "/v1" + "/CustGrp/DeleteCustGrp";

    // CUSTOMER FIN DATA
    public static GetCBAForCustFinDataByCustId = environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCBAForCustFinDataByCustId";
    public static AddCBAForCustFinData = environment.FoundationR3Url + "/v1" + "/CustBankAcc/AddCBAForCustFinData";
    public static EditCBAForCustFinData = environment.FoundationR3Url + "/v1" + "/CustBankAcc/EditCBAForCustFinData";
    public static GetCustBankAccByCustBankAccId = environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCustBankAccByCustBankAccId";
    public static GetCBAForCustFinDataEditModeByCustBankAccId = environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCBAForCustFinDataEditModeByCustBankAccId";
    public static GetCustBankAccByCustBankAccIdWithRefBank = environment.FoundationR3Url + "/v1" + "/CustBankAcc/GetCustBankAccByCustBankAccIdWithRefBank";
    public static AddCustBankAcc = environment.FoundationR3Url + "/v1" + "/CustBankAcc/AddCustBankAcc";
    public static GetCustPersonalFinDataByCustPersonalId = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetCustPersonalFinDataByCustPersonalId";
    public static GetListCustPersonalFinDataByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetListCustPersonalFinDataByCustId";
    public static GetCustCompanyFinDataByCustCompanyId = environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/GetCustCompanyFinDataByCustCompanyId";
    public static GetListCustCompanyFinDataByCustId = environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/GetListCustCompanyFinDataByCustId";
    public static AddCustCompanyFinData = environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/AddCustCompanyFinData";
    public static EditCustCompanyFinData = environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/EditCustCompanyFinData";
    public static DeleteCustCompanyFinData =  environment.FoundationR3Url + "/v1" + "/CustomerCompanyFinData/DeleteCustCompanyFinData";
    public static AddCustPersonalFinData = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/AddCustPersonalFinData";
    public static EditCustPersonalFinData = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/EditCustPersonalFinData";
    public static DeleteCustPersonalFinData = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/DeleteCustPersonalFinData";
    public static GetCustPersonalFinDataForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetCustPersonalFinDataForCustViewByCustId";
    public static GetListCustPersonalFinDataForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalFinData/GetListCustPersonalFinDataForCustViewByCustId";
    public static EditCustBankAcc = environment.FoundationR3Url + "/v1" + "/CustBankAcc/EditCustBankAcc";
    public static DeleteCustBankAccAndStmnt = environment.FoundationR3Url + "/v1" + "/CustBankAcc/DeleteCustBankAccAndStmnt";

    // CUSTOMER ADDRESS
    public static GetListCustAddr = environment.FoundationR3Url + "/v1" + "/CustAddr/GetListCustAddr";
    public static AddCustAddr = environment.FoundationR3Url + "/v1" + "/CustAddr/AddCustAddr";
    public static EditCustAddr = environment.FoundationR3Url + "/v1" + "/CustAddr/EditCustAddr";
    public static GetCustAddr = environment.FoundationR3Url + "/v1" + "/CustAddr/GetCustAddrByCustAddrId";
    public static GetListCustAddrByCustId = environment.FoundationR3Url + "/v1" + "/CustAddr/GetListCustAddrByCustId";
    public static GetListCustAddrByCustIdForCustomerPersonalView = environment.FoundationR3Url + "/v1" + "/CustAddr/GetListCustAddrByCustIdForCustomerPersonalView";
    public static GetCustAddrLegalAddrByCustId = environment.FoundationR3Url + "/v1" + "/CustAddr/GetCustAddrLegalAddrByCustId"
    public static GetCustAddrByMrCustAddrType = environment.FoundationR3Url + "/v1" + "/CustAddr/GetCustAddrByMrCustAddrType"
    public static DeleteCustAddr = "/CustAddr/DeleteCustAddr"

    // CUSTOMER ADDRESS HISTORY
    public static GetListCustAddrHistByCustId = environment.FoundationR3Url + "/v1" + "/CustAddrHist/GetListCustAddrHistByCustId";
    public static GetListCustAddrHistByCustIdForCustomerPersonalView = environment.FoundationR3Url + "/v1" + "/CustAddrHist/GetListCustAddrHistByCustIdForCustomerPersonalView";

    // CUSTOMER JOB DATA
    public static AddCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobData/AddCustPersonalJobData";
    public static EditCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobData/EditCustPersonalJobData";
    public static GetCustPersonalJobDataByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalJobData/GetCustPersonalJobDataByCustId";

    // CUSTOMER COMPANY LEGAL DOC
    public static GetCustCompanyLegalDocForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/GetCustCompanyLegalDocForCustViewByCustId";

    // CUSTOMER COMPANY 
    public static GetCustCompanyByCustId = environment.FoundationR3Url + "/v1" + "/CustCompany/GetCustCompanyByCustId"
    public static EditCustCompany = environment.FoundationR3Url + "/v1" + "/CustCompany/EditCustCompany"

    // CUSTOMER COMPANY CONTACT PERSON
    public static AddCustCompanyContactPerson = environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/AddCustCompanyContactPerson"
    public static GetCustCompanyContactPersonByCustCompanyContactPersonId = environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/GetCustCompanyContactPersonByCustCompanyContactPersonId"
    public static GetCustCompanyContactPersonByCustCompanyId = environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/GetCustCompanyContactPersonByCustCompanyId"
    public static EditCustCompanyContactPersonByCustCompanyId = environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/EditCustCompanyContactPersonByCustCompanyId"

    // CUSTOMER COMPANY MANAGEMENT SHAREHOLDER
    public static GetCustCompanyMgmntShrholderForCustViewByCustId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderForCustViewByCustId";
    public static AddCustCompanyMgmntShrholder = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholder";
    public static AddCustCompanyMgmntShrholderPersonal = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderPersonal";
    public static AddCustCompanyMgmntShrholderCompany = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderCompany";
    public static EditCustCompanyMgmntShrholder = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/EditCustCompanyMgmntShrholder";
    public static DeleteCustCompanyMgmntShrholder = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/DeleteCustCompanyMgmntShrholder";
    public static GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId";
    public static GetListCustCompanyMgmntShrholderByCustId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetListCustCompanyMgmntShrholderByCustId";
    public static GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId";
    public static AddCustCompanyMgmntShrholderPublic = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderPublic";
    public static EditCustCompanyMgmntShrholderPublic = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/EditCustCompanyMgmntShrholderPublic";
    public static GetListManagementShareholderForListPagingByCustId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetListManagementShareholderForListPagingByCustId";
    public static GetCustCompanyMgmntShrholderByCustIdAndShrholderId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderByCustIdAndShrholderId";
    public static GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId = environment.FoundationR3Url + '/v1' + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId";

    // CUST ATTR CONTENT
    public static GetCustAttrContentForCustViewByCustId = environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetCustAttrContentForCustViewByCustId";
    public static AddEditListCustAttrContent = environment.FoundationR3Url + '/v1' + "/CustAttrContent/AddEditListCustAttrContent";
    public static GetListCustAttrContentByCustIdForCust = environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdForCust";
    public static GetListCustAttrContentByCustIdAndAttrGroup = environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdAndAttrGroup";
    public static GetListCustAttrContentByCustIdAndListAttrGroups = environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdAndListAttrGroups";
    public static GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes = environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes";
    public static GetRuleForAttrContent = environment.FoundationR3Url + '/v1' + "/CustAttrContent/GetRuleForAttrContent";

    //CUST CONTACT PERSON
    public static GetCustCompanyContactPersonForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustCompanyContactPerson/GetCustCompanyContactPersonForCustViewByCustId";
    public static GetListCustPersonalContactPersonForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetListCustPersonalContactPersonForCustViewByCustId";

    // CUST GROUP
    public static GetListCustGrpForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpForCustViewByCustId";
    public static GetListCustGrpForCustViewByMemberCustId = environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpForCustViewByMemberCustId";
    public static GetListCustGrpForCustViewById = environment.FoundationR3Url + "/v1" + "/CustGrp/GetListCustGrpForCustViewById"

    // NEGATIVE CUSTOMER
    public static AddNegativeCustomer = environment.FoundationR3Url + "/v1" + "/NegativeCust/AddNegativeCust";
    public static EditNegativeCustomer = environment.FoundationR3Url + "/v1" + "/NegativeCust/EditNegativeCust";
    public static EditDuplicateNegativeCust = environment.FoundationR3Url + "/v1" + "/NegativeCust/EditDuplicateNegativeCust";
    public static EditDuplicateNegativeCustV2 = environment.FoundationR3Url + "/v2" + "/NegativeCust/EditDuplicateNegativeCust";
    public static GetNegativeCustByNegativeCustId = environment.FoundationR3Url + "/v1" + "/NegativeCust/GetNegativeCustByNegativeCustId";
    public static AddNegativeCustChangeTrx = environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/AddNegativeCustChangeTrx";
    public static EditNegativeCustChangeTrx = environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/EditNegativeCustChangeTrx";
    public static GetNegativeCustChangeTrxByNegativeCustId = environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/GetNegativeCustChangeTrxByNegativeCustId";
    public static GetListNegativeCustChangeTrxByNegativeCustId = environment.FoundationR3Url + "/v1" + "/NegativeCustChangeTrx/GetListNegativeCustChangeTrxByNegativeCustId";
    public static GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType = environment.FoundationR3Url + "/v2" + "/NegativeCust/GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType";
    public static GetNegativeCustByNegativeCustNameAndCustType = environment.FoundationR3Url + "/v1" + "/NegativeCust/GetNegativeCustByNegativeCustNameAndCustType";

    // CUSTOMER OTHER INFO
    public static AddCustOtherInfo = environment.FoundationR3Url + "/v1" + "/CustOtherInfo/AddCustOtherInfo";
    public static EditCustOtherInfo = environment.FoundationR3Url + "/v1" + "/CustOtherInfo/EditCustOtherInfo";
    public static GetCustOtherInfoByCustId = environment.FoundationR3Url + "/v1" + "/CustOtherInfo/GetCustOtherInfoByCustId";

    //Custsomer Personal Contact Person
    public static AddNewCustPersonalContactPerson = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/AddCustPersonalContactPerson"
    public static GetListCustPersonalContactPersonByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetListCustPersonalContactPersonByCustId"
    public static DeleteCustPersonalContactPerson = "/CustPersonalContactPerson/DeleteCustPersonalContactPerson"
    public static EditCustPersonalContactPerson = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/EditCustPersonalContactPerson"
    public static GetCustPersonalContactPersonByCustPersonalContactPersonId = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetCustPersonalContactPersonByCustPersonalContactPersonId"
    public static AddCustPersonalEmergencyContact = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/AddCustPersonalEmergencyContact";
    public static EditCustPersonalEmergencyContact = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/EditCustPersonalEmergencyContact";
    public static GetCustPersonalEmergencyContactByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetCustPersonalEmergencyContactByCustId";
    public static AddCustPersonalFamily = environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/AddCustPersonalFamily";
    public static EditCustPersonalFamily = environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/EditCustPersonalFamily";
    public static DeleteCustPersonalFamily = environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/DeleteCustPersonalFamily";
    public static GetCustPersonalFamilyByCustPersonalFamilyId = environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/GetCustPersonalFamilyByCustPersonalFamilyId";
    public static GetMainCustAndListCustPersonalFamilyByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalFamily/GetMainCustAndListCustPersonalFamilyByCustId";
    public static GetListCustPersonalEmergencyContactByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalContactPerson/GetListCustPersonalEmergencyContactByCustId";

    // SURVEY TASK
    public static GetListSrvyTaskBySrvyOrderId = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListSrvyTaskBySrvyOrderId";
    public static GetListSrvyTaskBySrvyOrderIdForUpdate = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListSrvyTaskBySrvyOrderIdForUpdate";
    public static AddSrvyTask = environment.FoundationR3Url + "/v1" + "/SrvyTask/AddSrvyTask";
    public static EditSrvyTask = environment.FoundationR3Url + "/v1" + "/SrvyTask/EditSurveyTask";
    public static EditSrvyTaskAndSendToMobile = environment.FoundationR3Url + "/v1" + "/SrvyTask/EditSurveyTaskAndSendToMobile";
    public static DeleteSrvyTask = "/SrvyTask/DeleteSrvyTask";
    public static GetSrvyTaskBySrvyTaskId = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetSrvyTaskBySrvyTaskId";
    public static CancelSurveyTaskBySurveyTaskId = environment.FoundationR3Url + "/v1" + "/SrvyTask/CancelSurveyTaskBySurveyTaskId";
    public static GetSurveyorNameBySurveyorId = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetSurveyorNameBySurveyorId";
    public static GetListSrvyTaskBySrvyOrderIdForView = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListSrvyTaskBySrvyOrderIdForView";
    public static GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview";
    public static ReviewSurveyResult = environment.FoundationR3Url + "/v1" + "/SrvyTask/ReviewSurveyResult";
    public static GetHtmlCodeFromMobile = environment.FoundationR3Url + "/v1" + "/SrvyTask/GetHtmlCodeFromMobile";
    public static UpdateSrvyTaskAndAddVerfResultH = environment.FoundationR3Url + "/v1" + "/SrvyTask/UpdateSrvyTaskAndAddVerfResultH";
    public static UpdateSrvyTaskAndEditVerfResultH = environment.FoundationR3Url + "/v1" + "/SrvyTask/UpdateSrvyTaskAndEditVerfResultH";
    public static UpdateMrSurveyTaskStatCode = environment.FoundationR3Url + "/v1" + "/SrvyTask/UpdateMrSurveyTaskStatCode";
   
    // SURVEY ORDER
    public static GetSrvyOrderBySrvyOrderId = environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetSrvyOrderBySrvyOrderId";
    public static GetSrvyOrderByTrxRefNo = environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetSrvyOrderByTrxRefNo";
    public static GetListSryvObject = environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetListSryvObject";
    public static SendSrvyOrder = environment.FoundationR3Url + "/v1" + "/SrvyOrder/SendSrvyOrder";
    public static GetSrvyOrderDataBySrvyOrderId = environment.FoundationR3Url + "/v1" + "/SrvyOrder/GetSrvyOrderDataBySrvyOrderId";

    // SURVEY FORM SCHM
    public static GetListAllSrvyFormSchm = environment.FoundationR3Url + "/v1" + "/SrvyFormSchm/GetListAllSrvyFormSchm";
    public static GetSrvyFormSchmBySrvyFormSchmId = environment.FoundationR3Url + "/v1" + "/SrvyFormSchm/GetSrvyFormSchmBySrvyFormSchmId";
    public static GetListKeyValueSrvyFormSchm = environment.FoundationR3Url + "/v1" + "/SrvyFormSchm/GetListKeyValueSrvyFormSchm";

    // REF FORM
    public static EditRefFormData = environment.FoundationR3Url + "/v1" + "/RefForm/EditRefForm";
    public static AddRefFormData = environment.FoundationR3Url + "/v1" + "/RefForm/AddRefForm";
    public static GetRefFormDataByRefFormId = environment.FoundationR3Url + "/v1" + "/RefForm/GetRefFormByRefFormId"
    public static GetTemplateIcon = environment.FoundationR3Url + "/v1" + "/RefForm/GetTemplateIcon";
    public static DeleteRefFormData = environment.FoundationR3Url + "/v1" + "/RefForm/DeleteRefForm";

    // AUTH FORM
    public static AddListAuthForm = environment.FoundationR3Url + "/v1" + "/AuthForm/AddListAuthForm";
    public static GetListAuthFormByRefFormId = environment.FoundationR3Url + "/v1" + "/AuthForm/GetListAuthFormByRefFormId";
    public static DeleteAuthForm = environment.FoundationR3Url + "/v1" + "/AuthForm/DeleteAuthForm";
    public static GetListAuthFormByRefRoleId = environment.FoundationR3Url + "/v1" + "/AuthForm/GetListAuthFormByRefRoleId";

    // Workflow Engine
    public static ClaimTask = environment.FoundationR3Url + "/v1" + "/Workflow/ClaimTask";
    public static ClaimTaskV2 = environment.FoundationR3Url + "/v2" + "/Workflow/ClaimTask";
    public static GetAllTaskWorkflow = environment.FoundationR3Url + "/v2" + "/Workflow/GetAllTaskWorkflow";
    public static GetSingleTaskWorkflow = environment.FoundationR3Url + "/v2" + "/Workflow/GetSingleTask";

    //SCORE CATEGORY SCHM H
    public static GetScoreCategorySchmHById = environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/GetScoreCategorySchmHById";
    public static AddScoreCategorySchmH = environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/AddScoreCategorySchmH";
    public static EditScoreCategorySchmH = environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/EditScoreCategorySchmH";
    public static GetRefScoreCategoryTypeWithDetailById = environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmH/GetScoreCategorySchmHWithDetailById";

    // REF SCORE CATEGORY
    public static AddRangeScoreCategorySchmD = environment.FoundationR3Url + "/v1" + "/ScoreCategorySchmD/AddRangeScoreCategorySchmD";

    // Authentication
    public static RequestNewPassword = environment.FoundationR3Url + "/v1" + "/Authenticate/RequestNewPassword";

    // INTEGRATION
    public static SendMasterDailyToRabbitMq = environment.FoundationR3Url + "/v1" + "/Integration/SendMasterDailyToRabbitMq";

    // UPDATE MASTER CUST
    public static GetCustDataForUpdateMasterCustDetail = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustDataForUpdateMasterCustDetail";
    public static GetCustAddrDataForUpdateMasterCustAddr = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustAddrDataForUpdateMasterCustAddr";
    public static GetCustFamilyDataForUpdateMasterCustFamily = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustFamilyDataForUpdateMasterCustFamily";
    public static GetCustEmergencyDataForUpdateMasterCustEmergency = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustEmergencyDataForUpdateMasterCustEmergency";
    public static GetCustJobDataForUpdateMasterCustJobData = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustJobDataForUpdateMasterCustJobData";
    public static GetCustFinDataForUpdateMasterCustFinData = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustFinDataForUpdateMasterCustFinData";
    public static GetCustCompanyDataForUpdateMasterCustCompany = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetCustCompanyDataForUpdateMasterCustCompany";
    public static GetShareholderForUpdateMasterCustCompanyShareholder = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetShareholderForUpdateMasterCustCompanyShareholder";
    public static GetContactInfoForUpdateMasterCustCompanyContactInfo = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetContactInfoForUpdateMasterCustCompanyContactInfo";
    public static GetFinDataForUpdateMasterCustCompanyFinData = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetFinDataForUpdateMasterCustCompanyFinData";
    public static GetLegalDocForUpdateMasterCustCompanyLegalDoc = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/GetLegalDocForUpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustomer = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustomer";
    public static UpdateMasterCustAddr = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustAddr";
    public static UpdateMasterCustFamily = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustFamily";
    public static UpdateMasterCustEmergency = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustEmergency";
    public static UpdateMasterCustJobData = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustJobData";
    public static UpdateMasterCustFinData = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustFinData";
    public static UpdateMasterCustFinDataV2 = environment.FoundationR3Url + "/v2" + "/UpdateMasterCust/UpdateMasterCustFinData";
    public static UpdateMasterCustCompanyDetail = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyDetail";
    public static UpdateMasterCustCompanyShareholder = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyShareholder";
    public static UpdateMasterCustCompanyLegalDoc = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustCompanyLegalDocv2 = environment.FoundationR3Url + "/v2" + "/UpdateMasterCust/UpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustCompanyContactInfo = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyContactInfo";
    public static UpdateMasterCustCompanyFinData = environment.FoundationR3Url + "/v1" + "/UpdateMasterCust/UpdateMasterCustCompanyFinData";

    //Application Source
    public static AddRefAppSrc = environment.FoundationR3Url + "/v1" + "/RefAppSrc/AddRefAppSrc";
    public static AddRefAppSrcOfficeMbr = environment.FoundationR3Url + "/v1" + "/RefAppSrc/AddRefAppSrcOfficeMbr";
    public static DeleteRefAppSrcOfficeMbr = environment.FoundationR3Url + "/v1" + "/RefAppSrc/DeleteRefAppSrcOfficeMbr";
    public static EditRefAppSrc = environment.FoundationR3Url + "/v1" + "/RefAppSrc/EditRefAppSrc";
    public static GetRefAppSrcByRefAppSrcId = environment.FoundationR3Url + "/v1" + "/RefAppSrc/GetRefAppSrcByRefAppSrcId";
    public static GetListRefAppSrcOfficeMbrByRefAppSrcId = environment.FoundationR3Url + "/v1" + "/RefAppSrc/GetListRefAppSrcOfficeMbrByRefAppSrcId"

    // List Approver
    public static GetApprovedBy = environment.ApprovalURL + "/api/RFAWeb/GetApprovedBy/";
    public static GetRecommendations = environment.ApprovalURL + "/api/RFAWeb/GetRecommendations/";

    // New Approval R3
    public static CreateNewRFA = "/Approval/CreateNewRFA";
    public static CreateJumpRFA = "/Approval/CreateJumpRFA";
    public static GetRefSingleCategoryByCategoryCode = "/Approval/GetRefSingleCategoryByCategoryCode";
    public static GetSchemesBySchemeCode = "/Approval/GetSchemesBySchemeCode";
    public static GetRefAdtQuestion = "/Approval/GetRefAdtQuestion";
    public static GetPossibleMemberAndAttributeExType = "/Approval/GetPossibleMemberAndAttributeExType";
    public static GetApprovalReturnHistory = "/Approval/GetApprovalReturnHistory";
    public static GetSchemesByCategoryId = "/Approval/GetSchemesByCategoryId";
    public static SubmitApproval = "/v1" + "/Approval/SubmitApproval";
    public static GetLevelVoting = "/Approval/GetLevelVoting";
    public static GetPossibleResult = "/Approval/GetPossibleResult";
    public static GetNextNodeMember = "/Approval/GetNextNodeMember";
    public static GetRefReasonActive = "/Approval/GetRefReasonActive";
    public static GetCanChangeMinFinalLevel = "/Approval/GetCanChangeMinFinalLevel";
    public static GetTaskHistory = "/Approval/GetTaskHistory";
    public static ReturnLevel = "/Approval/ReturnLevel";
    public static ContinueToLevel = "/Approval/ContinueToLevel";

    // Payment Allocation
    public static GetListKeyValueRefPaymentAllocActive = environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/GetListKeyValueRefPaymentAllocActive";
    public static GetRefPaymentAllocByID = environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/GetRefPaymentAllocById";
    public static GetListKeyValueRefPaymentAllocByPayAllocGrpCode = environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/GetListKeyValueRefPaymentAllocByPayAllocGrpCode";
    public static SubmitRefPaymentAlloc = environment.FoundationR3Url + "/v1" + "/RefPaymentAlloc/SubmitRefPaymentAlloc";
    public static GetRefPaymentAllocAttrByRefPaymentAllocId = environment.FoundationR3Url + urlConstant.GetRefPaymentAllocAttrByRefPaymentAllocId;

    // REF PAYMENT ALLOC GRP
    public static GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate = environment.FoundationR3Url + "/v1" + "/RefPaymentAllocGrp/GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate";
    public static AddRefPaymentAllocGrp = environment.FoundationR3Url + "/v1" + "/RefPaymentAllocGrp/AddRefPaymentAllocGrp";
    public static EditRefPaymentAllocGrp = environment.FoundationR3Url + "/v1" + "/RefPaymentAllocGrp/EditRefPaymentAllocGrp";

    // COA
    public static GetRefCoaByRefCoaId = environment.FoundationR3Url + "/v1"+ "/Coa/GetRefCoaByRefCoaId";
    public static SubmitCoa = environment.FoundationR3Url +"/v1"+  "/Coa/SubmitCoa";
    public static SubmitListCoa = environment.FoundationR3Url +"/v1"+  "/Coa/SubmitListCoa";
    public static GetListRefCoaByCoaSchmId = environment.FoundationR3Url + "/v1"+ "/Coa/GetListRefCoaByCoaSchmId";

    // COA Scheme
    public static GetCoaSchmByCoaSchmId = environment.FoundationR3Url + "/v1" + "/CoaSchm/GetCoaSchmByCoaSchmId";
    public static SubmitCoaSchm = environment.FoundationR3Url + "/v1" + "/CoaSchm/SubmitCoaSchm";
    public static GetListCoaSchm = environment.FoundationR3Url + "/v1" + "/CoaSchm/GetListCoaSchm";


    // View Cabinet, Rack, FIling
    public static GetListRackByCabinetCode = environment.FoundationR3Url + "/v1" + "/ViewDocument/GetListRackByCabinetCode";
    public static GetCabinetByCabinetCode = environment.FoundationR3Url + "/v1" + "/ViewDocument/GetCabinetByCabinetCode";

    public static GetListFilingByRackCodeAndCabinetCode = environment.FoundationR3Url + "/v1" + "/ViewDocument/GetListFilingByRackCodeAndCabinetCode";
    public static GetRackByRackCode = environment.FoundationR3Url + "/v1" + "/ViewDocument/GetRackByRackCode";

    public static GetRackAndListFilingByRackCodeAndCabinetCode = environment.FoundationR3Url + "/v1" + "/DocManagement/GetRackAndListFilingByRackCodeAndCabinetCode";
    public static GetRackAndListFilingByFilingCodeAndRackId = environment.FoundationR3Url + "/v1" + "/DocManagement/GetRackAndListFilingByFilingCodeAndRackId";
    public static GetCabinetAndListRackByCabinetCode = environment.FoundationR3Url + "/v1" + "/DocManagement/GetCabinetAndListRackByCabinetCode";
    public static GetRackByCode = environment.FoundationR3Url + "/v1" + "/DocManagement/GetRackByCode";
    public static GetCabinetByCode = environment.FoundationR3Url + "/v1" + "/DocManagement/GetCabinetByCode";
    public static AddCabinet = environment.FoundationR3Url + "/v1" + "/DocManagement/AddCabinet";
    public static EditCabinet = environment.FoundationR3Url + "/v1" + "/DocManagement/EditCabinet";
    public static AddFiling = environment.FoundationR3Url + "/v1" + "/DocManagement/AddFiling";
    public static EditFiling = environment.FoundationR3Url + "/v1" + "/DocManagement/EditFiling";
    public static AddRack = environment.FoundationR3Url + "/v1" + "/DocManagement/AddRack";
    public static EditRack = environment.FoundationR3Url + "/v1" + "/DocManagement/EditRack";
    public static GetCabinetAndRackByRackCodeAndCabinetId = environment.FoundationR3Url + "/v1" + "/DocManagement/GetCabinetAndRackByRackCodeAndCabinetId";

    //Auction Company
    public static AddAuctionCompany = environment.FoundationR3Url + "/v1" + "/AuctionCompany/AddAuctionCompany";
    public static EditAuctionCompany = environment.FoundationR3Url + "/v1" + "/AuctionCompany/EditAuctionCompany";
    public static GetVendorByIdForEdit = environment.FoundationR3Url + "/v1" + "/AuctionCompany/GetVendorByIdForEdit";

    // Cust Exposure
    public static GetCustExpsrInfoByCustId = environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/GetCustExpsrInfoByCustId";
    public static RequestExposure = environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/RequestExposure";
    public static RequestExposureV2 = environment.FoundationR3Url + "/v2" + "/CustExpsrInfo/RequestExposure";
    public static GetListCustExpsrBucketByCustExpsrDId = environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/GetListCustExpsrBucketByCustExpsrDId";
    public static GetListCustExpsrAppAgrHistByCustExpsrHId = environment.FoundationR3Url + "/v1" + "/CustExpsrInfo/GetListCustExpsrAppAgrHistByCustExpsrHId";

    //OTP
    public static SendOtp = environment.FoundationR3Url + "/v1" + "/Authenticate/SendOtp";
    public static ConfirmOtp = environment.FoundationR3Url + "/v1" + "/Authenticate/ConfirmOtp";
    public static GetOtpProperties = environment.FoundationR3Url + "/v1" + "/Authenticate/GetOtpProperties";

    // OFFICE BANK ACCOUNT
    public static DeleteOfficeBankAcc = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/DeleteOfficeBankAcc";
    public static GetListActiveBankName = environment.FoundationR3Url + "/v1" + "/RefBank/GetListKeyValueActiveById";
    public static GetListBankAccType = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/GetListBankAccType";
    public static GetListKeyValueActiveOfficeBankAcc = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/GetListKeyValueActiveOfficeBankAcc";
    public static GetOfficeBankAccByOfficeBankAccId = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/GetOfficeBankAccByOfficeBankAccId";
    public static SubmitOfficeBankAcc = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/SubmitOfficeBankAcc";
    public static AddOfficeBankAcc = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/AddOfficeBankAcc";
    public static EditOfficeBankAcc = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/EditOfficeBankAcc";
    public static EditDetailOfficeBankAcc = environment.FoundationR3Url + "/v1" + "/OfficeBankAcc/EditDetailOfficeBankAcc";

    //SYS CONFIG
    public static GetSysConfigPncplResultByCode = environment.FoundationR3Url + "/v1" + "/SysConfigResult/GetSysConfigPncplResultByCode";
    public static GetSysCtrlCoyBySysKey = environment.FoundationR3Url + "/v1" + "/SysCtrlCoy/GetSysCtrlCoyByKey"

    // JOURNAL
    public static RerunJournal = "/v1" + "/Journal/RerunJournal";
    public static DownloadJournalFile = environment.FoundationR3Url + "/v1" + "/Journal/DownloadJournalFile";
    public static GetJrSourceFileByJrSourceFileId = environment.FoundationR3Url + "/v1"+ "/Journal/GetJrSourceFileByJrSourceFileId";
    public static GetJrMHeaderAndJrMGroupByJrMHeaderId = environment.FoundationR3Url + "/v1" +"/Journal/GetJrMHeaderAndJrMGroupByJrMHeaderId";
    public static SaveJrMGroup = environment.FoundationR3Url +"/v1" + "/Journal/SaveJrMGroup";
    public static GetJrMGroupAndJrMGroupDFactByJrMGroupId = environment.FoundationR3Url + "/v1" + "/Journal/GetJrMGroupAndJrMGroupDFactByJrMGroupId";
    public static SaveJrMGroupDFact = environment.FoundationR3Url +"/v1"+"/Journal/SaveJrMGroupDFact";
    public static GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId = environment.FoundationR3Url +"/v1" +"/Journal/GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId";
    public static SaveJrMHeaderFact = environment.FoundationR3Url +"/v1"+"/Journal/SaveJrMHeaderFact";
    public static GetJrMGroupAndJrMItemValueByJrMGroupId = environment.FoundationR3Url +"/v1" +"/Journal/GetJrMGroupAndJrMItemValueByJrMGroupId"
    public static SaveJrMItemValue = environment.FoundationR3Url +"/v1" +"/Journal/SaveJrMItemValue";
    public static SaveJrMEntity = environment.FoundationR3Url +"/v1"+"/Journal/SaveJrMEntity";
    public static AddJrMHeader = environment.FoundationR3Url +"/v1"+"/Journal/AddJrMHeader";
    public static GetJournalResultByJrMsgHId = environment.FoundationR3Url +"/v1"+"/Journal/GetJournalResultByJrMsgHId";
    public static UploadJournalFile = environment.FoundationR3Url +"/v1" +"/Journal/UploadJournalFile";

    // Industry Type Category
    public static AddEditIndustryTypeCategory = environment.FoundationR3Url + "/v1" + "/IndustryTypeCategory/AddEditIndustryTypeCategory";
    public static GetIndustryTypeCategoryByIndustryTypeCategoryId = environment.FoundationR3Url + "/v1" + "/IndustryTypeCategory/GetIndustryTypeCategoryByIndustryTypeCategoryId";

    // Sector Economy Slik
    public static GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlik/GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId"

    // CUST FIN DATA ATTR CONTENT
    public static GetListCustFinDataAttrContentByCustIdAndListAttrGroup = environment.FoundationR3Url + "/v1" + "/CustFinDataAttrContent/GetListCustFinDataAttrContentByCustIdAndListAttrGroup";
    public static AddCustFinDataAttrContent = environment.FoundationR3Url + "/v1" + "/CustFinDataAttrContent/AddCustFinDataAttrContent";
    public static GetCustFinDataAttrContentForCustViewByCustId = environment.FoundationR3Url + "/v1" + "/CustFinDataAttrContent/GetCustFinDataAttrContentForCustViewByCustId";


    // LICENSE
    public static UploadLicense = environment.FoundationR3Url + "/v1" + "/License/UploadLicense";
    public static GetLicenses = environment.FoundationR3Url + "/v1" + "/License/GetLicenses";
    public static RetrieveLicenseDetail = environment.FoundationR3Url + "/v1" + "/License/RetrieveLicenseDetail";

    // LIST IFRAME VIEW
    public static GetCustListIframeView = environment.FoundationR3Url + "/v1" + "/Cust/GetCustListIframeView";

    //REF STATUS
    public static GetListActiveRefStatusByStatusGrpCode = environment.FoundationR3Url + "/v1" + "/RefStatus/GetListKeyValueActiveGrpCodeByCode";
    // MASTER SEQUENCE
    public static GenerateTransactionNoFromRedis = environment.FoundationR3Url + "/v1" + "/MasterSequence/GenerateTransactionNoFromRedis";

    // THIRD PARTY RSLT
    public static GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode = environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode";
    public static GetThirdPartyTrustsocRsltByThirdPartyRsltHId = environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/GetThirdPartyTrustsocRsltByThirdPartyRsltHId";
    public static UploadConsentTrustingSocial = environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/UploadConsentTrustingSocial";
    public static UploadConsentTrustingSocialV2 = environment.FoundationR3Url + "/v2" + "/ThirdPartyRslt/UploadConsentTrustingSocial";
    public static UploadConsentTrustingSocialV21 = environment.FoundationR3Url + "/v2.1" + "/ThirdPartyRslt/UploadConsentTrustingSocial";
    public static GetListThirdPartyTrustingSocialByTrxNo = environment.FoundationR3Url + "/v1" + "/ThirdPartyRslt/GetListThirdPartyTrustingSocialByTrxNo";
    public static SaveCustDocFile = environment.FoundationR3Url + "/v2" + "/Cust/SaveCustDocFile";
    public static SaveCustDocFile21 = environment.FoundationR3Url + "/v2.1" + "/Cust/SaveCustDocFile";

    //DIGITALIZATION
    public static AddTrxSrcDataForTrustingSocial = environment.FoundationR3Url + "/v1" + "/Digitalization/AddTrxSrcDataForTrustingSocial";
    public static AddTrxSrcDataForTrustingSocialV2 = environment.FoundationR3Url + "/v2" + "/Digitalization/AddTrxSrcDataForTrustingSocial";
    public static AddTrxSrcDataForPefindo = environment.FoundationR3Url + "/v1" + "/Digitalization/AddTrxSrcDataForPefindo";
    public static AddTrxSrcDataForPefindoV2 = environment.FoundationR3Url + "/v2" + "/Digitalization/AddTrxSrcDataForPefindo";
    public static AddTrxSrcDataForPefindoMultiResult = environment.FoundationR3Url + "/v1" + "/Digitalization/AddTrxSrcDataForPefindoMultiResult";
    public static GetPefindoMultiResultByGroupTrxNo = environment.FoundationR3Url + "/v1" + "/Digitalization/GetPefindoMultiResultByThirdPartyRsltGroupNo";
    public static AddTrxScrDataForAsliRi = environment.FoundationR3Url + "/v1" + "/IntegratorAsliRi/AddTrxSrcDataForAsliRi";
    public static GetTrxSrcDataForAsliRi = environment.FoundationR3Url + "/v1" + "/IntegratorAsliRi/GetTrxResultDataForAsliRi";

    //PEFINDO
    public static GetViewMOSummary = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewMOSummary";
    public static GetViewPefindoScore = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewPefindoScore";
    public static GetViewSubjectInfoPersonal = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSubjectInfoPersonal";
    public static GetViewSubjectInfoCompany = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSubjectInfoCompany";
    public static GetViewSubjectInfoAllHistory = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSubjectInfoAllHistory";
    public static GetViewContracts = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewContracts";
    public static GetViewPefindoAlertQuest = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewPefindoAlertQuest";
    public static GetViewSecurities = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewSecurities";
    public static GetViewOtherLiabilities = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewOtherLiabilities";
    public static GetViewInvolvements = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewInvolvements";
    public static GetViewRelations = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewRelations";
    public static GetViewInquiries = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewInquiries";
    public static GetViewDisputes = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewDisputes";
    public static GetViewFinancialStatements = environment.FoundationR3Url + "/v1" + "/Pefindo/GetViewFinancialStatements";
    public static PefindoSmartSearch = environment.FoundationR3Url + "/v1" + "/Pefindo/PefindoSmartSearch";
    public static GetPefindoContracts = environment.FoundationR3Url + "/v1" + "/Pefindo/GetPefindoContracts";
    public static GetPefindoTrxSrcData = environment.FoundationR3Url + "/v1" + "/Pefindo/GetPefindoTrxSrcData";

    // THINGS TO DO
  public static GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo = "ServiceTask/GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo";
  public static GetThingsToDoByRole = environment.FoundationR3Url + "/v1" + "/ThingsToDo/GetThingsToDoByRole";

  // CUST DOC FILE
  public static GetListCustDocFileByCustId = environment.FoundationR3Url + "/v1" + "/CustDocFile/GetListCustDocFileByCustId";

  // REF TC
  public static AddRefTc = environment.FoundationR3Url + "/v1" + "/RefTc/AddRefTc";
  public static EditRefTc = environment.FoundationR3Url + "/v1" + "/RefTc/EditRefTc";
  public static GetRefTcById = environment.FoundationR3Url + "/v1" + "/RefTc/GetRefTcById";

  public static GetCustCompanyLegalDocByCustCompanyLegalDocId = environment.FoundationR3Url + "/v1" + "/CustCompanyLegalDoc/GetCustCompanyLegalDocByCustCompanyLegalDocId";

  //SAVE THIRDPARTYTRXNO
  public static SaveCustThirdPartyTrxNo = environment.FoundationR3Url + "/v2" + "/Cust/SaveCustThirdPartyTrxNo";

  //Generate
  public static GenerateAPIKey = environment.FoundationR3Url + "/v1" + "/Authenticate/GenerateAPIKey";
  public static RevokeAPIKey = environment.FoundationR3Url + "/v1" + "/Authenticate/RevokeAPIKey";

  //REF TAX OFFICE
  public static AddRefTaxOffice = environment.FoundationR3Url + "/v1" + "/RefTaxOffice/AddRefTaxOffice";
  public static EditRefTaxOffice = environment.FoundationR3Url + "/v1" + "/RefTaxOffice/EditRefTaxOffice";
  public static DeleteRefTaxOffice = environment.FoundationR3Url + "/v1" + "/RefTaxOffice/DeleteRefTaxOffice";
  public static GetRefTaxOfficeDetailById = environment.FoundationR3Url + "/v1" + "/RefTaxOffice/GetRefTaxOfficeDetailById";
  public static GetListRefTaxOfficeActive = environment.FoundationR3Url + "/v1" + "/RefTaxOffice/GetListRefTaxOfficeActive";

   // ASSET INS CLAIM DOC
   public static AddRefInsClaimDoc = environment.FoundationR3Url + "/v1" + "/RefInsClaimDoc/AddRefInsClaimDoc"
   public static EditRefInsClaimDoc = environment.FoundationR3Url + "/v1" + "/RefInsClaimDoc/EditRefInsClaimDoc"
   public static GetRefInsClaimDocByRefInsClaimDocCode = environment.FoundationR3Url + "/v1" + "/RefInsClaimDoc/GetRefInsClaimDocByRefInsClaimDocCode"
}

