import { formatDate } from "@angular/common";
import { environment } from "../../environments/environment";

export class AdInsConstant {
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
  public static GetGeneralSettingByCode = "/GeneralSetting/GetGeneralSettingByCode";


  //REF OFFICE
  public static GetRefOfficeObj = "/RefOffice/GetRefOfficeObj";
  public static GetRefOfficeByRefOfficeId = environment.FoundationR3Url + "/RefOffice/GetRefOfficeByRefOfficeId"
  public static GetRefOfficeActiveAndNonVirtualKeyValue = "/RefOffice/GetRefOfficeActiveAndNonVirtualKeyValue";
  public static GetAllRefOffice = "/RefOffice/GetAllRefOffice";
  public static GetListUpperHierarchyRefOfficeByRefOrgId = "/RefOffice/GetListUpperHierarchyRefOfficeByRefOrgId";
  public static AddRefOffice = "/RefOffice/AddRefOffice";
  public static EditRefOffice = "/RefOffice/EditRefOffice";
  public static DeleteRefOffice = "/RefOffice/DeleteRefOffice";
  public static GetCenterGrpByCenterGrpTypeCode = "/RefOffice/GetCenterGrpByCenterGrpCode";
  public static GetListOfficeCenterGrp = "/RefOffice/GetListOfficeCenterGrp";
  public static AddCenterGroupOfficeMember = "RefOffice/AddCenterGroupOfficeMember";
  public static AddCenterGrpOfficeMember = "/CenterGrpOfficeMbr/AddCenterGrpOfficeMember";
  public static GetListCenterGrpMemberByRefOfficeId = "/CenterGrpOfficeMbr/GetListCenterGrpMemberByRefOfficeId"
  public static DeleteCenterGroupOfficeMember = "/RefOffice/DeleteCenterGroupOfficeMember";
  public static DeleteCenterGrpOfficeMember = "/CenterGrpOfficeMbr/DeleteCenterGrpOfficeMember";

  //REF OFFICE AREA
  public static GetAllListArea = "/RefOfficeArea/GetAllListArea";
  public static GetRefOfficeAreaPaging = "/RefOfficeArea/GetRefOfficeAreaPaging";
  public static GetRefArea = "/RefOfficeArea/GetRefArea";
  public static GetRefOfficeAreaByRefOfficeAreaId = "/RefOfficeArea/GetRefOfficeAreaByRefOfficeAreaId";
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
  public static GetRefBankByRefBankIdAsync = environment.FoundationR3Url + "/RefBank/GetRefBankByRefBankIdAsync";
  public static EditRefBank = environment.FoundationR3Url + "/RefBank/EditRefBank";
  public static AddRefBank = "/RefBank/AddRefBank";
  public static AddRefBankAsync = environment.FoundationR3Url + "/RefBank/AddRefBankAsync";
  public static DeleteRefBank = "/RefBank/DeleteRefBank";
  public static GetBankByBankCode = "/RefBank/GetBankByBankCode";

  //REF-EMP
  public static GetListEmployee = "/RefEmp/GetRefEmpPaging";
  public static GetRefEmployeeById = environment.FoundationR3Url + "/RefEmp/GetRefEmpByRefEmpId"
  public static AddRefEmp = "/RefEmp/AddRefEmp";
  public static EditRefEmp = "/RefEmp/EditRefEmp";
  public static DeleteRefEmployee = "/RefEmp/DeleteRefEmp";
  public static AddEmpBankAcc = "/EmpBankAcc/AddEmpBankAcc";
  public static EditEmpBankAcc = "EmpBankAcc/EditEmpBankAcc";
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
  public static AddRefUserR3 = "/RefUser/AddRefUser";
  public static GetRefUserById = environment.FoundationR3Url + "/RefUser/GetRefUserById";
  public static GetRefUserByRefEmpId = "/RefUser/GetRefUserByRefEmpId";
  public static AddRefUserRole = environment.FoundationR3Url + "/RefUserRole/AddRefUserRole"
  public static EditRefUserRole = environment.FoundationR3Url + "/RefUserRole/EditRefUserRole";
  public static GetRefUserRoleById = environment.FoundationR3Url + "/RefUserRole/GetRefUserRoleById";
  public static DeleteRefUserRole = "/RefUserRole/DeleteRefUserRole";
  //REF-ROLE
  public static GetRefRolePaging = "/UserManagement/GetRefRolePaging";
  public static AddRefRole = environment.FoundationR3Url + "/RefRole/AddRefRole";
  public static EditRefRole = environment.FoundationR3Url + "/RefRole/EditRefRole";
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
  public static EditRefZipcode = environment.FoundationR3Url + "/RefZipcode/EditRefZipCode";
  public static AddRefZipcode = environment.FoundationR3Url + "/RefZipcode/AddRefZipCode";
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
  public static GetRefBizUnit = environment.FoundationR3Url + "/RefBizUnit/GetRefBizUnitByRefBizUnitId";
  public static AddRefBizUnit = "/RefBizUnit/AddRefBizUnit";
  public static EditRefBizUnit = "/RefBizUnit/EditRefBizUnit";
  public static DeleteRefBizUnit = "/RefBizUnit/DeleteRefBizUnit";
  
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
  public static GetListActiveRefMaster = environment.FoundationR3Url +"/RefMaster/GetListKeyValueActiveByCode";

  //REF INDUSTRY TYPE
  public static GetRefIndustryTypeById = "/RefIndustryType/GetRefIndustryTypeByRefIndustryTypeId";
  public static AddRefIndustryType = "/RefIndustryType/AddRefIndustryType";
  public static EditRefIndustryType = "/RefIndustryType/EditRefIndustryType";
  public static DeleteRefIndustryType = "/RefIndustryType/DeleteRefIndustryType";

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
  public static LoginByToken = "/Authenticate/LoginByToken";
  public static UpdateToken = "/Authenticate/UpdateRole";

  //FORM FEATURE
  public static GetListRefFeature = "/RefFeature/GetListRefFeature";
  public static GetRefFeatureByComponent = "/RefFeature/GetRefFeatureByComponent";

  //HOLIDAY
  public static GetAllActiveHolidaySchmH = "/Holiday/GetAllActiveHolidaySchmH";
  public static GetHolidayPaging = "/Holiday/GetHolidayPaging";
  public static AddHolidaySchmH = environment.FoundationR3Url + "/HolidaySchm/AddHolidaySchmH";
  public static AddHolidaySchmD = "/Holiday/AddHolidaySchmD";
  public static AddHolidaySchmDUntilYear = "/Holiday/AddHolidaySchmDUntilYear";
  public static GetHolidaySchmH = "/Holiday/GetHolidaySchmH";
  public static GetHolidaySchmHById = environment.FoundationR3Url + "/HolidaySchm/GetHolidaySchmHById";
  public static EditHolidaySchmHOnly = "/Holiday/EditHolidaySchmHOnly";
  public static EditHolidaySchmH = environment.FoundationR3Url + "/HolidaySchm/EditHolidaySchmH";
  public static DeleteHolidaySchmH = "/HolidaySchm/DeleteHolidaySchmH";
  public static DeleteHolidaySchmD = "/Holiday/DeleteHolidaySchmD";
  public static GetHolidayDetailPaging = "/Holiday/GetHolidayDetailPaging";
  public static CopyHolidaySchm = "/Holiday/CopyHolidaySchm";

  //USER SESSION LOG
  public static SelectRole = "/UserSessionLog/SelectRole";

  //NOTIFICATION
  public static NotificationPost = "/Message/Post";
  public static NotificationSignalR = "/notification";

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

  //ASSET MASTER
  public static AddAssetMaster = environment.FoundationR3Url + "/AssetMaster/AddAssetMaster";
  public static EditAssetMaster = environment.FoundationR3Url + "/AssetMaster/EditAssetMaster";
  public static DeleteAssetMaster = "/AssetMaster/DeleteAssetMaster";
  public static GetAssetMasterById = environment.FoundationR3Url + "/AssetMaster/GetAssetMasterById";
  public static GetValueAssetType = environment.FoundationR3Url + "/AssetType/GetListKeyValueById";
  public static GetListAssetCategory = environment.FoundationR3Url + "/AssetCategory/GetListAssetCategoryByIdWithCriteriaObj";
  public static GetListAssetSchmH = environment.FoundationR3Url + "/AssetSchmH/GetListAssetSchmHByAssetMasterId";
  public static GetListAssetMasterByAssetSchmHId = "http://localhost:5000" + "/AssetMaster/GetListAssetMasterByAssetSchmHId"
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
  public static EditWorkingHourSchmH = environment.FoundationR3Url + "/WorkingHourSchm/EditWorkingHourSchmH";
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
  public static DeleteRefEmpLeaveMngmnt = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/DeleteRefEmpLeaveMngmnt";
  public static GetRefEmpLeaveMngmntById = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/GetRefEmpLeaveByRefEmpLeaveId";
  public static EditRefEmpLeaveMngmnt = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/EditRefEmpLeaveMngmnt";
  public static AddRefEmpLeaveMngmnt = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/AddRefEmpLeaveMngmnt";

  //UPLOAD MONITORING FOUNDATION
  public static GetUploadMonitoringPaging = "/UploadMonitoring/GetUploadMonitoringPaging";

  //UPLOAD TYPE
  public static GetUploadTypeByUploadTypeId = "/UploadType/GetUploadTypeByUploadTypeId";
  public static GetUploadTypePaging = "/UploadType/GetUploadTypePaging";

  //UPLOAD SETTING
  public static GetUploadSettingHIdByUploadTypeId = "/UploadSetting/GetUploadSettingHIdByUploadTypeId";
  public static GetListUploadSettingDIdByUploadSettingHId = "/UploadSetting/GetListUploadSettingDIdByUploadSettingHId";
  public static GetListUploadSettingDIdByUploadTypeId = "/UploadSetting/GetListUploadSettingDIdByUploadTypeId";
  public static AssignRoleToUploadSetting = "/UploadSetting/AssignRoleToUploadSetting";
  public static GetListRefRoleByUploadTypeId = "/UploadSetting/GetListRefRoleByUploadTypeId";
  public static GetListUploadSettingDByUploadSettingHId = '/UploadSetting/GetListUploadSettingDByUploadSettingHId';

  // GENERIC
  public static GetPagingObjectBySQL = "/Generic/GetPagingObjectBySQL"

  // ASSET TYPE
  public static AddAssetType = environment.FoundationR3Url + "/AssetType/AddAssetType"
  public static EditAssetType = environment.FoundationR3Url + "/AssetType/EditAssetType"
  public static GetAssetTypeByCode = environment.FoundationR3Url + "/AssetType/GetAssetTypeByCode"
  public static GetAssetTypeById = environment.FoundationR3Url + "/AssetType/GetAssetTypeById"
  public static GetListAssetType = environment.FoundationR3Url + "/AssetType/GetListAssetType"
  public static GetListActiveAssetType = environment.FoundationR3Url + "/AssetType/GetListActiveAssetType"
  public static DeleteAssetType = "/AssetType/DeleteAssetType"

  // PRODUCT
  public static GetProductMainInfo = environment.FoundationR3Url + "/Product/GetProductMainInfo"
  public static AddProduct = environment.FoundationR3Url + "/Product/AddProduct"
  public static EditProduct = environment.FoundationR3Url + "/Product/EditProduct"
  public static RequestDeactivation = environment.FoundationR3Url + "/Product/RequestDeactivation"
  public static GetListProdBranchOfficeMbrByProdHId = environment.FoundationR3Url + "/Product/GetListProdBranchOfficeMbrByProdHId"
  public static GetListProdHVersionByProdId = environment.FoundationR3Url + "/Product/GetListProdHVersionByProdId";
  public static GetProductDetailComponentInfo = environment.FoundationR3Url + "/Product/GetProductDetailComponentInfo";
  public static AddOrEditProductDetail = environment.FoundationR3Url + "/Product/AddOrEditProductDetail";


  //PRODUCT OFFERING
  public static GetProductOfferingMainInfo = environment.FoundationR3Url + "/ProductOffering/GetProductOfferingMainInfo"
  public static AddProdOffering = environment.FoundationR3Url + "/ProductOffering/AddProdOffering"
  public static EditProdOffering = environment.FoundationR3Url + "/ProductOffering/EditProdOffering"
  public static GetListProdOfferingVersionByProdId = environment.FoundationR3Url + "/ProductOffering/GetListProdOfferingVersionByProdId"
  public static GetListProdOfferingBranchOfficeMbrByProdHId = environment.FoundationR3Url + "/ProductOffering/GetListProdOfferingBranchOfficeMbrByProdHId"

  // PRODUCT COMPONENT
  public static GetProductHOComponent = environment.FoundationR3Url + "/ProductComponent/GetProductHOComponent";

  //REF REASON
  public static GetValueReasonModel = environment.FoundationR3Url + "/RefReason/GetListKeyValueByCode";

  //asset accesory
  public static AddNewAssetAccesory = "/AssetAccessory/AddAssetAccessory"
  public static EditAssetAccessory = "/AssetAccessory/EditAssetAccessory"
  public static GetAssetAccessorybyAssetAccesoryCode = "/AssetAccessory/GetAssetAccessoryByCode"
  public static GetAssetAccessorybyAssetAccessoryId = "/AssetAccessory/GetAssetAccessoryById"
  public static GetlistAssetAccessorybyAssetTypeId = "/AssetAccessory/GetListAssetAccessoryByAssetTypeId"
  public static DeleteAssetAccessory = "/AssetAccessory/DeleteAssetAccessory"

  //asset category
  public static AddNewAssetCategory = "/AssetCategory/AddAssetCategory"
  public static EditAssetCategory = "/AssetCategory/EditAssetCategory"
  public static GetAssetCategoryByAssetCategoryCode = "/AssetCategory/GetAssetCategoryByCode"
  public static GetAssetCategorybyAssetCategoryId = "/AssetCategory/GetAssetCategoryById"
  public static GetlistAssetCategorybyAssetTypeId = "/AssetCategory/GetListAssetCategoryByAssetTypeId"//
  public static DeleteAssetCategory = "/AssetCategory/DeleteAssetCategory"
  public static GetActiveAssetCategoryValue = environment.FoundationR3Url + "/AssetCategory/GetListActiveAssetCategoryValue"

  //   public static AddNewAssetAccesory = "/AssetAccessory/AddAssetAccessory";
  //   public static EditAssetAccessory = "/AssetAccessory/EditAssetAccessory";
  //   public static GetAssetAccessorybyAssetAccesoryCode = "/AssetAccessory/GetAssetAccessoryByCode";
  //   public static GetAssetAccessorybyAssetAccessoryId = "/AssetAccessory/GetAssetAccessoryById";
  //   public static GetlistAssetAccessorybyAssetTypeId = "/AssetAccessory/GetListAssetAccessoryByAssetTypeId";
  //   public static DeleteAssetAccessory = "/AssetAccessory/DeleteAssetAccessory";
  // //asset category
  //   public static AddNewAssetCategory = "/AssetCategory/AddAssetCategory";
  //   public static EditAssetCategory = "/AssetCategory/EditAssetCategory";
  //   public static GetAssetCategoryByAssetCategoryCode = "/AssetCategory/GetAssetCategoryByCode";
  //   public static GetAssetCategorybyAssetCategoryId = "/AssetCategory/GetAssetCategoryById";
  //   public static GetlistAssetCategorybyAssetTypeId = "/AssetCategory/GetListAssetCategoryByAssetTypeId";//;
  //   public static DeleteAssetCategory = "/AssetCategory/DeleteAssetCategory";
  //asset doc list
  public static AddNewAssetDocList = "/AssetDocList/AddAssetDocList"
  public static EditAssetDocList = "/AssetDocList/EditAssetDocList"
  public static GetAssetDocListByAssetDocListId = "/AssetDocList/GetAssetDocListById"
  public static GetlistAssetDocListByAssetTypeId = "/AssetDocList/GetListAssetDocListByAssetTypeId"
  public static DeleteAssetDocList = "/AssetDocList/DeleteAssetDocList"

  //asset ref doc
  public static AddNewRefAssetDocData = "/RefAssetDoc/AddRefAssetDoc"
  public static EditRefAssetDocData = "/RefAssetDoc/EditRefAssetDoc"
  public static GetRefAssetDocByAssetDocCode = "/RefAssetDoc/GetRefAssetDocByAssetDocCode"
  public static GetRefAssetDocByRefAssetDocId = "/RefAssetDoc/GetRefAssetDocByRefAssetDocId"
  public static GetListRefAssetDoc = "/RefAssetDoc/GetListRefAssetDoc"
  public static DeleteRefAssetDocData = "/RefAssetDoc/DeleteRefAssetDoc"
   
  //Asset Scheme
  public static GetAssetSchmHById =   environment.FoundationR3Url + "/AssetSchmH/GetAssetSchmHById";
  public static AddAssetSchmH =   environment.FoundationR3Url + "/AssetSchmH/AddAssetSchmH";
  public static EditAssetSchmH =   environment.FoundationR3Url + "/AssetSchmH/EditAssetSchmH";
  public static GetListAssetSchmDByAssetSchmHId = "http://localhost:5000" + "/AssetSchmD/GetListAssetSchmDByAssetSchmHId"
  public static EditAssetSchmHAndD = environment.FoundationR3Url + "/AssetSchmH/EditAssetSchmHAndD"
  public static EditListAssetSchmD = environment.FoundationR3Url + "/AssetSchmD/EditListAssetSchmD"
  public static AddListAssetSchmD =  "http://localhost:5000"  + "/AssetSchmD/AddListAssetSchmD";
  public static DeleteAssetSchmD = "/AssetSchmD/DeleteAssetSchmD";
  // ASSET TYPE
  public static GetActiveAssetTypeValue = environment.FoundationR3Url + "/AssetType/GetListActiveAssetType";

  // ASSET NEGATIVE
  public static AddAssetNegative = environment.FoundationR3Url + "/AssetNegative/AddAssetNegative";
  public static EditAssetNegative = environment.FoundationR3Url + "/AssetNegative/EditAssetNegative";
  public static GetAssetNegativeByIdEditPage = environment.FoundationR3Url + "/AssetNegative/GetAssetNegativeByIdEditPage";

  //VENDOR
  public static DeleteVendor ="/Vendor/DeleteVendor";

  // // ASSET NEGATIVE
  // public static AddAssetNegative = environment.FoundationR3Url + "/AssetNegative/AddAssetNegative";
  // public static EditAssetNegative = environment.FoundationR3Url + "/AssetNegative/EditAssetNegative";
  // public static GetAssetNegativeByIdEditPage = environment.FoundationR3Url + "/AssetNegative/GetAssetNegativeByIdEditPage";


  // PRODUCT COMPONENT
  // public static GetProductHOComponent = environment.FoundationR3Url + "/ProductComponent/GetProductHOComponent";

  public static DeleteNegativeCustomer = environment.FoundationR3Url + "/NegativeCust/DeleteNegativeCust";

  // NEGATIVE CUSTOMER
  public static AddNegativeCustomer = environment.FoundationR3Url + "/NegativeCust/AddNegativeCust";
  public static EditNegativeCustomer = environment.FoundationR3Url + "/NegativeCust/EditNegativeCust";
  public static GetNegativeCustByNegativeCustId = environment.FoundationR3Url + "/NegativeCust/GetNegativeCustByNegativeCustId";
  public static AddNegativeCustChangeTrx = environment.FoundationR3Url + "/NegativeCustChangeTrx/AddNegativeCustChangeTrx";
  public static EditNegativeCustChangeTrx = environment.FoundationR3Url + "/NegativeCustChangeTrx/EditNegativeCustChangeTrx";
  public static GetNegativeCustChangeTrxByNegativeCustId = environment.FoundationR3Url + "/NegativeCustChangeTrx/GetNegativeCustChangeTrxByNegativeCustId";
  //Customer Personal
  public static AddNewCustPersonal = environment.FoundationR3Url + "/CustPersonal/AddCustPersonal"
  public static EditCustPersonal = environment.FoundationR3Url + "/CustPersonal/EditCustPersonal"
  public static GetCustPersonalbyCustPersonalId = environment.FoundationR3Url + "/CustPersonal/GetCustPersonalByCustPersonalId"
 
  // Customer
  public static AddNewCust =   environment.FoundationR3Url + "/Cust/AddCust"
  public static  GetCustByCustId =   environment.FoundationR3Url + "/Cust/GetCustByCustId"
  
 
 
}
