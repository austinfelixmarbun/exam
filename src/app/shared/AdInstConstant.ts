import { formatDate } from "@angular/common";
import { environment } from "../../environments/environment";

export class AdInsConstant {
  public static RestrictionLike = "Like";
  public static RestrictionEq = "Eq";
  public static RestrictionNotIn = "NotIn";
  public static RestrictionIsNull = "isnull";
  public static RestrictionIsNotNull = "isnotnull";
  public static showData = "10,50,100";
  public static TimeoutSession = 6000000;
  public static GetListProduct = "http://creator_websvr:7272/NEW_FINANCING/api/Catalog/getPopularViewByCriteria";
  public static Login = "/Authenticate/Login";
  public static LoginToken = "/UserManagement/HTML6Login";
  public static Logout = "/UserManagement/LogOut"
  public static GetListOffice = "/RefOffice/GetRefOfficePaging";
  public static GetProvince = "/los/v1/get_provinsi";
  public static GetCityByProvince = "/los/v1/get_kota";
  public static getProspectByProspectNo = "/api/MobileProspectTask/GetProspectByProspectNo";
  public static submitNCProspect = "/api/MobileProspectTask/submitNCProspect";
  public static addCustPersonal = "";
  public static FormDefault = "dashboard/dash-board";

  //GENERAL SETTING
  public static GetBusinessDt = "/GeneralSetting/GetBusinessDate";
  public static AddGeneralSetting = environment.FoundationR3Url + "/GeneralSetting/AddGeneralSetting";
  public static EditGeneralSetting = environment.FoundationR3Url + "/GeneralSetting/EditGeneralSetting";
  public static GetGeneralSettingPaging = "/GeneralSetting/GetGeneralSettingPaging";
  public static GetGeneralSettingById = environment.FoundationR3Url + "/GeneralSetting/GetGeneralSettingById";
  public static GetGeneralSettingValue = "/GeneralSetting/GetGeneralSettingValue";


  //REF OFFICE
  public static GetRefOfficeObj = "/RefOffice/GetRefOfficeObj";
  public static GetRefOfficeActiveAndNonVirtualKeyValue = "/RefOffice/GetRefOfficeActiveAndNonVirtualKeyValue";
  public static GetAllRefOffice = "/RefOffice/GetAllRefOffice";
  public static GetListUpperHierarchyRefOfficeByRefOrgId = "/RefOffice/GetListUpperHierarchyRefOfficeByRefOrgId";
  public static AddRefOffice = "/RefOffice/AddRefOffice";
  public static EditRefOffice = "/RefOffice/EditRefOffice";
  public static DeleteRefOffice = "/RefOffice/DeleteRefOffice";
  public static GetCenterGrpByCenterGrpTypeCode = "/RefOffice/GetCenterGrpByCenterGrpCode";
  public static GetListOfficeCenterGrp = "/RefOffice/GetListOfficeCenterGrp";
  public static AddCenterGroupOfficeMember = "RefOffice/AddCenterGroupOfficeMember";
  public static DeleteCenterGroupOfficeMember = "/RefOffice/DeleteCenterGroupOfficeMember";

  //REF OFFICE AREA
  public static GetAllListArea = "/RefOfficeArea/GetAllListArea";
  public static GetRefOfficeAreaPaging = "/RefOfficeArea/GetRefOfficeAreaPaging";
  public static GetRefArea = "/RefOfficeArea/GetRefArea";
  public static AddRefOfficeArea = "/RefOfficeArea/AddRefOfficeArea";
  public static EditRefOfficeArea = "/RefOfficeArea/EditRefOfficeArea";
  public static DeleteRefOfficeArea = "/RefOfficeArea/DeleteRefOfficeArea";
  public static CheckDuplAreaCode = "/RefOfficeArea/CheckDuplAreaCode";

  //ORGANIZATION
  public static GetRefOrg = "/OrganizationDefinition/GetRefOrg";
  public static EditRefOrgWithOldParentId = "/OrganizationDefinition/EditRefOrgWithOldParentId";
  public static EditRefOrg = "/OrganizationDefinition/EditRefOrg";
  public static DeleteRefOrg = "/OrganizationDefinition/DeleteRefOrg";
  public static GetListAllRefOrg = "/OrganizationDefinition/GetListAllRefOrg";
  public static AddRefOrg = "/OrganizationDefinition/AddRefOrg";
  public static GetRefOrgPaging = "/OrganizationDefinition/GetRefOrgPaging";
  public static GetAllRefBizUnit = "/OrganizationDefinition/GetAllRefBizUnit";
  public static GetOrgJobTitleByMdlStruc = "/OrganizationDefinition/GetOrgJobTitleByMdlStruc";
  public static GetRefBizUnitByOffice = "/OrganizationDefinition/GetRefBizUnitByOffice";
  public static GetAllOrgMdl = "/OrganizationDefinition/GetAllOrgMdl";
  public static GetAllActiveOrgMdlByRefOrgId = "/OrganizationDefinition/GetAllActiveOrgMdlByRefOrgId";
  public static GetOrgMdlPaging = "/OrganizationDefinition/GetOrgMdlPaging";
  public static DeleteOrgMdl = "/OrganizationDefinition/DeleteOrgMdl";
  public static EditOrgMdl = "/OrganizationDefinition/EditOrgMdl";
  public static AddOrgMdl = "/OrganizationDefinition/AddOrgMdl";
  public static GetOrgMdl = "/OrganizationDefinition/GetOrgMdl";
  public static GetOrgMdlByOrgMdlId = "/OrganizationDefinition/GetOrgMdlByOrgMdlId";
  public static GetAllRefBizUnitKeyValuePair = "/OrganizationDefinition/GetAllRefBizUnitKeyValuePair";
  public static DeleteOrgMdlStruc = "/OrganizationDefinition/DeleteOrgMdlStruc";
  public static AddOrgMdlStruc = "/OrganizationDefinition/AddOrgMdlStruc";
  public static EditOrgMdlStruc = "/OrganizationDefinition/EditOrgMdlStruc";
  public static GetOrgMdlStruc = "/OrganizationDefinition/GetOrgMdlStruc";
  public static GetOrgMdlStrucPaging = "/OrganizationDefinition/GetOrgMdlStrucPaging";
  public static GetOrgMdlStrucById = "/OrganizationDefinition/GetOrgMdlStrucById";

  //REF-JOB-TITLE
  public static GetRefJobTitle = "/OrganizationDefinition/GetRefJobTitlePaging";
  public static AddRefJobTitle = environment.FoundationR3Url + "/RefJobTitle/AddRefJobTitle";
  public static EditRefJobTitle = environment.FoundationR3Url + "/RefJobTitle/EditRefJobTitle";
  public static DeleteRefJobTitle = environment.FoundationR3Url + "/RefJobTitle/DeleteRefJobTitle";
  public static GetJobPositionLvl = "/OrganizationDefinition/GetJobPositionLvl";
  public static GetRefJobTitleById = environment.FoundationR3Url + "/RefJobTitle/GetRefJobTitleByRefJobTitleId";

  //ORG JOB TITLE
  public static GetOrgJobTitlePaging = "/OrganizationDefinition/GetOrgJobTitlePaging";
  public static AddOrgJobTitle = "/OrganizationDefinition/AddOrgJobTitle";
  public static EditOrgJobTitle = "/OrganizationDefinition/EditOrgJobTitle";
  public static DeleteOrgJobTitle = "/OrganizationDefinition/DeleteOrgJobTitle";
  public static GetOrgJobTitleByOrgJobTitleId = "/OrganizationDefinition/GetOrgJobTitleByOrgJobTitleId";

  //REF-BANK
  public static GetBankPaging = "/RefBank/GetRefBankPaging";
  public static GetBank = "/RefBank/GetBank";
  public static GetRefBankByRefBankIdAsync = "/RefBank/GetRefBankByRefBankIdAsync";
  public static EditRefBank = "/RefBank/EditRefBank";
  public static AddRefBank = "/RefBank/AddRefBank";
  public static AddRefBankAsync= "/RefBank/AddRefBankAsync";
  public static DeleteRefBank = "/RefBank/DeleteRefBank";
  public static GetBankByBankCode = "/RefBank/GetBankByBankCode";

  //REF-EMP
  public static GetListEmployee = "/RefEmp/GetRefEmpPaging";
  public static GetRefEmployeeById = "/RefEmp/GetEmp"
  public static AddRefEmp = "/RefEmp/AddRefEmp";
  public static EditRefEmp = "/RefEmp/EditRefEmp";
  public static DeleteRefEmployee = "/RefEmp/DeleteRefEmp";
  public static AddEmpBankAcc = "/EmpBankAcc/AddEmpBankAcc";
  public static GetEmpBankAccByRefEmpId = "/EmpBankAcc/GetEmpBankAccByRefEmpId";
  public static AddRefEmpAndEmpBankAcc = "/RefEmp/AddRefEmpAndEmpBankAcc";
  public static EditRefEmpAndEmpBankAcc = "/RefEmp/EditRefEmpAndEmpBankAcc";
  public static DeleteRefEmpAndEmpBankAcc = "/RefEmp/DeleteRefEmpAndEmpBankAcc";
  public static GetListEmployeebyRefEmpId = "/EmpPosition/GetListEmployeebyRefEmpId";
  public static GetEmpListByOfficeIdAndIsActive = "/RefEmp/GetEmpListByOfficeIdAndIsActive";

  //EMP_POSITION
  public static GetEmpPositionPaging = "/EmpPosition/GetEmpPositionPaging";
  public static GetEmpByEmpPositionId = "/EmpPosition/GetEmpByEmpPositionId";
  public static AddEmpPosition = "/EmpPosition/AddEmpPosition";
  public static EditEmpPosition = "/EmpPosition/EditEmpPosition";
  public static DeleteEmpPosition = "/EmpPosition/DeleteEmpPosition";
  public static GetListUserEmployee = "/EmpPosition/GetListUserEmployee";

  //REF-USER
  public static GetRefUserPaging = "/UserManagement/GetRefUserPaging";
  public static AddRefUser = "/UserManagement/AddRefUser";
  public static EditRefUser = "/UserManagement/EditRefUser";
  public static ChangePassword = "/UserManagement/ChangePassword";
  public static GetRefUser = "/UserManagement/GetRefUser";
  public static GetUserByUsername = "/UserManagement/GetUserByUsername";
  public static ValidatePwd = "/UserManagement/ValidatePwd";
  public static GetCountRefUserByRefEmpId = "/UserManagement/GetCountRefUserByRefEmpId";
  public static ResetPassword = "/UserManagement/ResetPassword";

  //REF-ROLE
  public static GetRefRolePaging = "/UserManagement/GetRefRolePaging";
  public static AddRefRole = environment.FoundationR3Url +"/RefRole/AddRefRole";
  public static EditRefRole = environment.FoundationR3Url +"/RefRole/EditRefRole";
  public static DeleteRefRole = "/RefRole/DeleteRefRole";
  public static GetRefRoleByRefRoleId = environment.FoundationR3Url + "/RefRole/GetRefRoleById";
  public static GetRefRoleByCode = environment.FoundationR3Url + "/RefRole/GetRefRoleByCode";
  public static GetActiveRefRoleByRefRoleId = "/RefRole/GetActiveRefRoleByRefRoleId";
  public static GetRefRole = "/RefRole/GetRefRole";
  public static GetListDataCurrentUser = "/UserManagement/GetListDataCurrentUser";
  public static GetRefRoleByEmpPositionId = "/RefRole/GetRefRoleByEmpPositionId";
  public static EditUserTitleRole = "/UserManagement/EditUserTitleRole";
  public static AddUserTitleRole = "/UserManagement/AddUserTitleRole";
  public static AssignRoleToUsers = "/UserManagement/AssignRoleToUsers";
  public static GetUserTitleRoleByEmpPositionIdAndRefRoleId = "/UserManagement/GetUserTitleRoleByEmpPositionIdAndRefRoleId";

  //ZIPCODE
  public static GetRefZipcodePaging = "/RefZipcode/GetRefZipcodePaging";
  public static GetRefZipCode = "/RefZipcode/GetRefZipcode";
  public static GetRefProvDistrictObj = "/RefProvDistrict/GetRefProvDistrict";
  public static EditRefZipcode = environment.FoundationR3Url +"/RefZipcode/EditRefZipCode";
  public static AddRefZipcode = environment.FoundationR3Url +"/RefZipcode/AddRefZipCode";
  public static DeleteRefZipcode = environment.FoundationR3Url + "/RefZipcode/DeleteRefZipCode";
  public static GetOfficeZipcodeMemberAddPaging = "/RefZipcode/GetOfficeZipcodeMemberAddPaging";
  public static GetRefZipCodeById = environment.FoundationR3Url + "/RefZipcode/GetRefZipcodeById";

  //OFFICE ZIPCODE MEMBER
  public static GetOfficeZipCodeMemberPaging = "/OfficeZipcodeMember/GetOfficeZipCodeMemberPaging";
  public static GetRefOfficeZipcodePaging = "/OfficeZipcodeMember/GetRefOfficeZipcodePaging";
  public static AddOfficeZipcodeMember = "/OfficeZipcodeMember/AddOfficeZipcodeMember";
  public static DeleteOfficeZipcodeMember = "/OfficeZipcodeMember/DeleteOfficeZipcodeMember";

  //BUSINESS UNIT
  public static GetBusinessUnitPaging = "/OrganizationDefinition/GetRefBizUnitPaging";
  public static GetRefBizUnit = "/RefBizUnit/GetRefBizUnitByRefBizUnitId";
  public static AddRefBizUnit = "/RefBizUnit/AddRefBizUnit";
  public static EditRefBizUnit = "/RefBizUnit/EditRefBizUnit";

  //REF COY
  public static GetRefCoyPaging = "/RefCoy/GetRefCoyPaging";
  public static GetRefCoy = "/RefCoy/GetRefCoy";
  public static EditRefCoy = "/RefCoy/EditRefCoy";
  public static GetCoyBodPaging = "/CoyBod/GetCoyBodPaging";
  public static AddCoyBod = "/CoyBod/AddCoyBOD";
  public static EditCoyBod = "/CoyBod/EditCoyBOD";
  public static DeleteCoyBod = "/CoyBod/DeleteCoyBOD";
  public static GetCoyBod = "/CoyBod/GetCoyBod";
  public static GetCommissionerPaging = "/CoyCommissioner/GetCoyCommissionerPaging";
  public static AddCoyCommissioner = "/CoyCommissioner/AddCoyCommissioner";
  public static EditCoyCommissioner = "/CoyCommissioner/EditCoyCommissioner";
  public static DeleteCoyCommissioner = "/CoyCommissioner/DeleteCoyCommissioner";
  public static GetCoyCommissioner = "/CoyCommissioner/GetCoyCommissioner";

  //REF TAX OFFICE
  public static GetAllActiveRefTaxOffice = "/RefTaxOffice/GetAllActiveRefTaxOffice";

  //REF MASTER
  public static GetRefMasterList = "/RefMaster/GetRefMasterList";
  public static GetRefMastersByCriteria = "/RefMaster/GetRefMastersByCriteria";
  public static GetRefMaster = "/RefMaster/GetRefMaster";
  public static GetRefMasterListByTypeCode = "/RefMaster/GetRefMasterListByTypeCode";
  public static GetRefMasterListKeyValuePair = "/RefMaster/GetRefMasterListKeyValuePair";
  public static AddRefMaster = "/RefMaster/AddRefMaster";
  public static EditRefMaster = "/RefMaster/EditRefMaster";
  public static GetRefMasterType = "/RefMaster/GetRefMasterType";
  public static GetRefMasterTypeKeyValueUserSetting = "/RefMaster/GetRefMasterTypeKeyValueUserSetting";
  public static DeleteRefMaster = "/RefMaster/DeleteRefMaster";
  public static GetRefMasterPaging = "/RefMaster/GetRefMasterPaging";
  public static GetRefMasterListDesc = "/RefMaster/GetRefMasterListDesc";
  public static GetListActiveRefMasterType = "/RefMasterType/GetListKeyValueActiveByCode";
  public static GetRefMasterByRefMasterId = "/RefMaster/GetRefMasterByRefMasterId";

  //REF INDUSTRY TYPE
  public static GetRefIndustryTypeById = "/RefIndustryType/GetRefIndustryTypeByRefIndustryTypeId";
  public static AddRefIndustryType = "/RefIndustryType/AddRefIndustryType";
  public static EditRefIndustryType = "/RefIndustryType/EditRefIndustryType";

  //REF PROV DISTRICT
  public static GetRefProvDistrictPaging = "/RefProvDistrict/GetRefProvDistrictPaging";

  //MENU
  public static GetRefFormPaging = "/MenuManagement/GetRefFormPaging";
  public static GetAllActiveRefFormByRefRoleId = "/MenuManagement/GetAllActiveRefFormByRefRoleId";
  public static GetRefFormByRefFormId = "/MenuManagement/GetRefFormByRefFormId";
  public static EditRefForm = "/MenuManagement/EditRefForm";
  public static AddRefForm = "/MenuManagement/AddRefForm";
  public static DeleteRefForm = "/MenuManagement/DeleteRefForm";
  public static AssignRoleToForms = "/MenuManagement/AssignRoleToForms";
  public static GetAllAuthFormsByRefRoleId = "/MenuManagement/GetAllAuthFormsByRefRoleId";
  public static GetAuthByRefFormIdAndRefRoleId = "/MenuManagement/GetAuthByRefFormIdAndRefRoleId";
  public static UpdateFormFeatureAuthForm = "/MenuManagement/UpdateFormFeatureAuthForm";
  public static GetAllActiveRefFormAndPathExist = "/MenuManagement/GetAllActiveRefFormAndPathExist";
  public static GetAllActiveRefForm = "/MenuManagement/GetAllActiveRefForm";
  public static LoginByRole = "/Authenticate/LoginByRole";
  

  //FORM FEATURE
  public static GetListRefFeature = "/RefFeature/GetListRefFeature";
  public static GetRefFeatureByComponent = "/RefFeature/GetRefFeatureByComponent";

  //HOLIDAY
  public static GetAllActiveHolidaySchmH = "/Holiday/GetAllActiveHolidaySchmH";
  public static GetHolidayPaging = "/Holiday/GetHolidayPaging";
  public static AddHolidaySchmH = "/HolidaySchm/AddHolidaySchmH";
  public static AddHolidaySchmD = "/Holiday/AddHolidaySchmD";
  public static AddHolidaySchmDUntilYear = "/Holiday/AddHolidaySchmDUntilYear";
  public static GetHolidaySchmH = "/Holiday/GetHolidaySchmH";
  public static GetHolidaySchmHById = "/HolidaySchm/GetHolidaySchmHById";
  public static EditHolidaySchmHOnly = "/Holiday/EditHolidaySchmHOnly";
  public static EditHolidaySchmH = "/HolidaySchm/EditHolidaySchmH";
  public static DeleteHolidaySchmH = "/Holiday/DeleteHolidaySchmH";
  public static DeleteHolidaySchmD = "/Holiday/DeleteHolidaySchmD";
  public static GetHolidayDetailPaging = "/Holiday/GetHolidayDetailPaging";
  public static CopyHolidaySchm = "/Holiday/CopyHolidaySchm";

  //USER SESSION LOG
  public static SelectRole = "/UserSessionLog/SelectRole";

  //NOTIFICATION
  public static NotificationPost = "/Message/Post";

  //REF CURR

  public static GetRefCurrPaging = "/RefCurr/GetRefCurrPaging";
  public static AddRefCurr = environment.FoundationR3Url + "/RefCurr/AddRefCurr";
  public static EditRefCurr = environment.FoundationR3Url + "/RefCurr/EditRefCurr";
  public static GetRefCurrById = environment.FoundationR3Url + "/RefCurr/GetRefCurrById";

  //REF ECONOMIC SECTOR

  public static AddRefEconomicSector = environment.FoundationR3Url + "/RefEconomicSector/AddRefEconomicSector";
  public static EditRefEconomicSector = environment.FoundationR3Url + "/RefEconomicSector/EditRefEconomicSector";
  public static DeleteRefEconomicSector = "/RefEconomicSector/DeleteRefEconomicSector";
  public static GetRefEconomicSectorById = environment.FoundationR3Url + "/RefEconomicSector/GetRefEconomicSectorById";

  //REF PROV DISTRICT

  public static AddRefProvDistrict = environment.FoundationR3Url + "/RefProvDistrict/AddRefProvDistrict";
  public static EditRefProvDistrict = environment.FoundationR3Url + "/RefProvDistrict/EditRefProvDistrict";
  public static DeleteRefProvDistrict = "/RefProvDistrict/DeleteRefProvDistrict";
  public static GetRefProvDistrictById = environment.FoundationR3Url + "/RefProvDistrict/GetRefProvDistrictByRefProvDistrictId";

  //REF PROFESSION

  public static AddRefProfession = environment.FoundationR3Url + "/RefProfession/AddRefProfession";
  public static EditRefProfession = environment.FoundationR3Url + "/RefProfession/EditRefProfession";
  public static DeleteRefProfession = "/RefProfession/DeleteRefProfession";
  public static GetRefProfessionById = environment.FoundationR3Url + "/RefProfession/GetRefProfessionByRefProfessionId";
  public static GetValueCustModel = environment.FoundationR3Url + "/RefCustModel/GetListKeyValueByCode";

  //GENERIC
  public static GetObjectBySQL = "/Generic/GetObjectBySQL";
  public static AddObjectBySQL = "/Generic/AddObjectBySQL";
  public static UpdateObjectBySQL = "/Generic/UpdateObjectBySQL";
  public static DeleteObjectBySQL = "/Generic/DeleteObjectBySQL";

  //WORKHOUR
  public static GetListOfWorkingHourSchm = "/WorkHour/GetListOfWorkingHourSchm";
  public static GetWorkHourSchmHPaging = "/WorkHour/GetWorkHourSchmHPaging";
  public static AddWorkingHourSchmH = environment.FoundationR3Url + "/WorkingHourSchm/AddWorkingHourSchmH";
  public static AddListWorkingHourSchmD = environment.FoundationR3Url + "/WorkingHourSchm/AddListWorkingHourSchmD";
  public static EditListWorkingHourSchmD = environment.FoundationR3Url + "/WorkingHourSchm/EditListWorkingHourSchmD";
  public static EditWorkingHourSchmH = environment.FoundationR3Url +  "/WorkingHourSchm/EditWorkingHourSchmH";
  public static GetWorkingHourSchmH = "/WorkHour/GetWorkingHourSchmH";
  public static GetWorkingHourSchmD = "/WorkHour/GetWorkingHourSchmD";
  public static DeleteWorkingHourSchmH = "/WorkHour/DeleteWorkingHourSchmH";
  public static DeleteWorkingHourSchm = "/WorkingHourSchm/DeleteWorkingHourSchm";
  public static GetWorkingHourSchmHById = environment.FoundationR3Url + "/WorkingHourSchm/GetWorkingHourSchmHById";
  public static GetListWorkingHourSchmDByWorkingHourHId = environment.FoundationR3Url + "/WorkingHourSchm/GetListWorkingHourSchmDByWorkingHourHId";



  //QUEUE
  public static AddQueue = "http://R3App-Server/FOUNDATION/RabbitMq/AddQueue";

  //REF MODULE
  public static GetListRefModuleKeyValue = environment.FoundationR3Url + "/RefModule/GetListRefModuleKeyValue";
  public static GetListKeyValueByCode = environment.FoundationR3Url + "/RefModule/GetListKeyValueByCode";
  public static GetListKeyValueById = environment.FoundationR3Url + "/RefModule/GetListKeyValueById";

  //REF EMP LEAVE MANAGEMENT
  public static GetRefEmpLeaveMngmntPaging = "/RefEmpLeaveManagement/GetRefEmpLeaveMngmntPaging";
  public static DeleteRefEmpLeaveMngmnt = "/RefEmpLeaveManagement/DeleteRefEmpLeaveMngmnt";
  public static GetRefEmpLeaveMngmntById = "/RefEmpLeaveManagement/GetRefEmpLeaveMngmntById";
  public static EditRefEmpLeaveMngmnt = "/RefEmpLeaveManagement/EditRefEmpLeaveMngmnt";
  public static AddRefEmpLeaveMngmnt = "/RefEmpLeaveManagement/AddRefEmpLeaveMngmnt";

  //UPLOAD MONITORING FOUNDATION
  public static GetUploadMonitoringPaging = "/UploadMonitoring/GetUploadMonitoringPaging"

  //UPLOAD TYPE
  public static GetUploadTypeByUploadTypeId = "/UploadType/GetUploadTypeByUploadTypeId"
  public static GetUploadTypePaging = "/UploadType/GetUploadTypePaging"

  //UPLOAD SETTING
  public static GetUploadSettingHIdByUploadTypeId = "/UploadSetting/GetUploadSettingHIdByUploadTypeId"
  public static GetListUploadSettingDIdByUploadSettingHId = "/UploadSetting/GetListUploadSettingDIdByUploadSettingHId"
  public static GetListUploadSettingDIdByUploadTypeId = "/UploadSetting/GetListUploadSettingDIdByUploadTypeId"
  public static AssignRoleToUploadSetting = "/UploadSetting/AssignRoleToUploadSetting"
  public static GetListRefRoleByUploadTypeId = "/UploadSetting/GetListRefRoleByUploadTypeId"
  public static GetListUploadSettingDByUploadSettingHId = '/UploadSetting/GetListUploadSettingDByUploadSettingHId'

  // GENERIC
  public static GetPagingObjectBySQL = "/Generic/GetPagingObjectBySQL"

}
