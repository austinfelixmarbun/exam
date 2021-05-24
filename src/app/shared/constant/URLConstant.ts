import { environment } from "environments/environment"; 
import { NavigationConstant } from "../NavigationConstant";

export class URLConstant {

    // SYS CONFIG RESULT
    public static GetSysConfigResultByCode = environment.FoundationR3Url + '/SysConfigResult/GetSysConfigResultByCode';

    // DOWNLOAD
    public static DownloadTemplate = environment.FoundationR3Url + '/Download/DownloadTemplate';

    // WEB SOCKET
    public static WebSocketUrl = environment.WebSocketURL + "/Notificationhub";

    //GENERAL SETTING
    public static GetBusinessDt = "/GeneralSetting/GetBusinessDate";
    public static AddGeneralSetting = environment.FoundationR3Url + "/GeneralSetting/AddGeneralSetting";
    public static EditGeneralSetting = environment.FoundationR3Url + "/GeneralSetting/EditGeneralSetting";
    public static GetGeneralSettingPaging = "/GeneralSetting/GetGeneralSettingPaging";
    public static GetGeneralSettingById = environment.FoundationR3Url + "/GeneralSetting/GetGeneralSettingById";
    public static GetGeneralSettingValue = "/GeneralSetting/GetGeneralSettingValue";
    public static GetGeneralSettingByCode = environment.FoundationR3Url + "/GeneralSetting/GetGeneralSettingByCode";
    public static GetGeneralSettingValueByCode = environment.FoundationR3Url + "/GeneralSetting/GetGeneralSettingValueByCode";
    public static GetListGeneralSettingByListGsCode = environment.FoundationR3Url + "/GeneralSetting/GetListGeneralSettingByListGsCode";

    //REF OFFICE
    public static GetRefOfficeByOfficeCode = environment.FoundationR3Url + "/RefOffice/GetRefOfficeByOfficeCode";
    public static GetListKvpActiveRefOfficeForPaging = environment.FoundationR3Url + "/RefOffice/GetListKvpActiveRefOfficeForPaging";
    public static GetRefOfficeObj = "/RefOffice/GetRefOfficeObj";
    public static GetRefOfficeByRefOfficeId = environment.FoundationR3Url + "/RefOffice/GetRefOfficeByRefOfficeId"
    public static GetRefOfficeActiveAndNonVirtualKeyValue = "/RefOffice/GetRefOfficeActiveAndNonVirtualKeyValue";
    public static GetAllRefOffice = "/RefOffice/GetAllRefOffice";
    public static GetListUpperHierarchyRefOfficeByRefOrgId = "/RefOffice/GetListUpperHierarchyRefOfficeByRefOrgId";
    public static AddRefOffice = environment.FoundationR3Url + "/RefOffice/AddRefOffice";
    public static AddRefOfficeAreaMember = environment.FoundationR3Url + "/RefOffice/AddRefOfficeAreaMember";
    public static UpdateRefOfficeAreaId = "/RefOffice/UpdateRefOfficeAreaId";
    public static EditRefOffice = environment.FoundationR3Url + "/RefOffice/EditRefOffice";
    public static GetCenterGrpByCenterGrpTypeCode = "/RefOffice/GetCenterGrpByCenterGrpCode";
    public static GetListOfficeCenterGrp = "/RefOffice/GetListOfficeCenterGrp";
    public static AddCenterGroupOfficeMember = "RefOffice/AddCenterGroupOfficeMember";
    public static AddCenterGrpOfficeMember = environment.FoundationR3Url + "/CenterGrpOfficeMbr/AddCenterGrpOfficeMember";
    public static GetListCenterGrpMemberByRefOfficeId = environment.FoundationR3Url + "/CenterGrpOfficeMbr/GetListCenterGrpMemberByRefOfficeId"
    public static DeleteCenterGroupOfficeMember = "/RefOffice/DeleteCenterGroupOfficeMember";
    public static DeleteCenterGrpOfficeMember = "/CenterGrpOfficeMbr/DeleteCenterGrpOfficeMember";
    public static GetListActiveRefOffice = "/RefOffice/GetListActiveRefOffice";
    public static GetListRefOfficeByRefOfficeAreaId = environment.FoundationR3Url + "/RefOffice/GetListRefOfficeByRefOfficeAreaId";
    public static GetListKvpActiveRefOffice = environment.FoundationR3Url + "/RefOffice/GetListKvpActiveRefOffice";

    //CENTER GROUP
    public static GetCenterGrpByCode = environment.FoundationR3Url + "/CenterGrp/GetCenterGrpByCode";
    public static GetCenterGrpById = environment.FoundationR3Url + "/CenterGrp/GetCenterGrpById";

    //REF OFFICE AREA
    public static GetAllListArea = "/RefOfficeArea/GetAllListArea";
    public static GetRefOfficeAreaPaging = "/RefOfficeArea/GetRefOfficeAreaPaging";
    public static GetRefArea = "/RefOfficeArea/GetRefArea";
    public static GetRefOfficeAreaByRefOfficeAreaId = "/RefOfficeArea/GetRefOfficeAreaByRefOfficeAreaId";
    public static AddRefOfficeArea = environment.FoundationR3Url + "/RefOfficeArea/AddRefOfficeArea";
    public static EditRefOfficeArea = environment.FoundationR3Url + "/RefOfficeArea/EditRefOfficeArea";
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
    public static AddRefEmp = environment.FoundationR3Url + "/RefEmp/AddRefEmp";
    public static EditRefEmp = environment.FoundationR3Url + "/RefEmp/EditRefEmp";
    public static GetEmpBankAccByRefEmpId = environment.FoundationR3Url + "/EmpBankAcc/GetEmpBankAccByRefEmpId";
    public static AddRefEmpAndEmpBankAcc = "/RefEmp/AddRefEmpAndEmpBankAcc";
    public static EditRefEmpAndEmpBankAcc = "/RefEmp/EditRefEmpAndEmpBankAcc";
    public static DeleteRefEmpAndEmpBankAcc = "/RefEmp/DeleteRefEmpAndEmpBankAcc";
    public static GetListEmployeebyRefEmpId = "/EmpPosition/GetListEmployeebyRefEmpId";
    public static GetEmpListByOfficeIdAndIsActive = "/RefEmp/GetEmpListByOfficeIdAndIsActive";
    public static GetEmpForUpdateById = environment.FoundationR3Url + "/RefEmp/GetRefEmpForUpdateByRefEmpId"

    //EMP_POSITION
    public static GetEmpPositionPaging = "/EmpPosition/GetEmpPositionPaging";
    public static GetEmpByEmpPositionId = "/EmpPosition/GetEmpByEmpPositionId";
    public static AddEmpPosition = "/EmpPosition/AddEmpPosition";
    public static EditEmpPosition = "/EmpPosition/EditEmpPosition";
    public static DeleteEmpPosition = "/EmpPosition/DeleteEmpPosition";
    public static GetListUserEmployee = "/EmpPosition/GetListUserEmployee";

    //REF-USER
    public static GetRefUserPaging = "/UserManagement/GetRefUserPaging";
    public static EditRefUserForRefEmpR3 = environment.FoundationR3Url + "/RefUser/EditRefUserForRefEmp";
    public static ChangePassword = "/UserManagement/ChangePassword";
    public static GetRefUser = "/UserManagement/GetRefUser";
    public static GetUserByUsername = "/UserManagement/GetUserByUsername";
    public static ValidatePwd = "/UserManagement/ValidatePwd";
    public static GetCountRefUserByRefEmpId = "/UserManagement/GetCountRefUserByRefEmpId";
    public static ResetPassword = "/UserManagement/ResetPassword";
    public static GetRefUserById = environment.FoundationR3Url + "/RefUser/GetRefUserById";
    public static GetRefUserByUsername = environment.FoundationR3Url + "/RefUser/GetRefUserByUsername";
    public static GetUserEmpByUsername = environment.FoundationR3Url + "/RefUser/GetUserEmpByUsername";
    public static GetRefUserByRefEmpId = environment.FoundationR3Url + "/RefUser/GetRefUserByRefEmpId";
    public static AddRefUserRole = environment.FoundationR3Url + "/RefUserRole/AddRefUserRole"
    public static EditRefUserRole = environment.FoundationR3Url + "/RefUserRole/EditRefUserRole";
    public static GetRefUserRoleById = environment.FoundationR3Url + "/RefUserRole/GetRefUserRoleById";
    public static ChangePasswordRefUserByUsername = environment.FoundationR3Url + "/RefUser/ChangePasswordRefUserByUsername";
    public static DeleteRefUserRole = "/RefUserRole/DeleteRefUserRole";
    public static GetRefUserByResetCode = environment.FoundationR3Url + "/RefUser/GetRefUserByResetCode";
    public static ResetPasswordByUsername = environment.FoundationR3Url + "/RefUser/ResetPasswordByUsername";
    
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
    public static GetListActiveRefRole = "/RefRole/GetListActiveRefRole"

    //REF FEE
    public static AddRefFee = environment.FoundationR3Url + "/RefFee/AddRefFee";
    public static EditRefFee = environment.FoundationR3Url + "/RefFee/EditRefFee";
    public static GetRefFeeByRefFeeId = environment.FoundationR3Url + "/RefFee/GetRefFeeByRefFeeId";

    //REF LOB
    public static GetListRefLob = environment.FoundationR3Url + "/RefLob/GetListRefLob";
    public static GetListBizTemplateCodeByRefFeeId = environment.FoundationR3Url + "/RefLob/GetListBizTemplateCodeByRefFeeId"
    public static GetListBizTmpltCode = environment.FoundationR3Url + "/RefLob/GetListBizTmpltCode"

    //SURVEYOR
    public static AddSurveyor = environment.FoundationR3Url + "/Surveyor/AddSurveyor";
    public static EditSurveyor = environment.FoundationR3Url + "/Surveyor/EditSurveyor";
    public static GetSurveyorBySurveyorId = environment.FoundationR3Url + "/Surveyor/GetSurveyorBySurveyorId";


    //ZIPCODE
    public static GetRefZipcodePaging = "/RefZipcode/GetRefZipcodePaging";
    public static GetRefZipCode = "/RefZipcode/GetRefZipcode";
    public static GetRefProvDistrictObj = "/RefProvDistrict/GetRefProvDistrict";
    public static EditRefZipcode = environment.FoundationR3Url + "/RefZipcode/EditRefZipcode";
    public static AddRefZipcode = environment.FoundationR3Url + "/RefZipcode/AddRefZipcode";
    public static GetOfficeZipcodeMemberAddPaging = "/RefZipcode/GetOfficeZipcodeMemberAddPaging";
    public static GetRefZipCodeById = environment.FoundationR3Url + "/RefZipcode/GetRefZipcodeById";
    public static GetZipcodeDataByZipCode = environment.FoundationR3Url + "/RefZipcode/GetZipcodeDataByZipCode";

    //OFFICE ZIPCODE MEMBER
    public static GetOfficeZipCodeMemberPaging = environment.FoundationR3Url + "/OfficeZipcodeMember/GetOfficeZipCodeMemberPaging";
    public static GetRefOfficeZipcodePaging = environment.FoundationR3Url + "/OfficeZipcodeMember/GetRefOfficeZipcodePaging";
    public static AddOfficeZipcodeMember = environment.FoundationR3Url + "/OfficeZipcodeMember/AddOfficeZipCodeMember";
    public static DeleteOfficeZipcodeMember = environment.FoundationR3Url + "/OfficeZipcodeMember/DeleteOfficeZipcodeMember";

    //BUSINESS UNIT
    public static GetBusinessUnitPaging = environment.FoundationR3Url + "/OrganizationDefinition/GetRefBizUnitPaging";
    public static GetRefBizUnit = environment.FoundationR3Url + "/RefBizUnit/GetRefBizUnitByRefBizUnitId";
    public static AddRefBizUnit = environment.FoundationR3Url + "/RefBizUnit/AddRefBizUnit";
    public static EditRefBizUnit = environment.FoundationR3Url + "/RefBizUnit/EditRefBizUnit";
    public static DeleteRefBizUnit = "/RefBizUnit/DeleteRefBizUnit";

    //REF COY
    public static GetRefCoyPaging = environment.FoundationR3Url + "/RefCoy/GetRefCoyPaging";
    public static GetRefCoy = environment.FoundationR3Url + "/RefCoy/GetRefCoy";
    public static EditRefCoy = environment.FoundationR3Url + "/RefCoy/EditRefCoy";
    public static GetCoyBodPaging = environment.FoundationR3Url + "/CoyBod/GetCoyBodPaging";
    public static AddCoyBod = environment.FoundationR3Url + "/CoyBod/AddCoyBOD";
    public static EditCoyBod = environment.FoundationR3Url + "/CoyBod/EditCoyBOD";
    public static DeleteCoyBod = environment.FoundationR3Url + "/CoyBod/DeleteCoyBOD";
    public static GetCoyBod = environment.FoundationR3Url + "/CoyBod/GetCoyBod";
    public static GetCommissionerPaging = environment.FoundationR3Url + "/CoyCommissioner/GetCoyCommissionerPaging";
    public static AddCoyCommissioner = environment.FoundationR3Url + "/CoyCommissioner/AddCoyCommissioner";
    public static EditCoyCommissioner = environment.FoundationR3Url + "/CoyCommissioner/EditCoyCommissioner";
    public static DeleteCoyCommissioner = environment.FoundationR3Url + "/CoyCommissioner/DeleteCoyCommissioner";
    public static GetCoyCommissioner = environment.FoundationR3Url + "/CoyCommissioner/GetCoyCommissioner";

    //REF TAX OFFICE
    public static GetAllActiveRefTaxOffice = "/RefTaxOffice/GetAllActiveRefTaxOffice";

    //REF MASTER
    public static GetRefMasterList = "/RefMaster/GetRefMasterList";
    public static GetRefMastersByCriteria = "/RefMaster/GetRefMastersByCriteria";
    public static GetRefMaster = "/RefMaster/GetRefMaster";
    public static GetRefMasterListByTypeCode = "/RefMaster/GetRefMasterListByTypeCode";
    public static GetRefMasterListKeyValuePair = "/RefMaster/GetRefMasterListKeyValuePair";
    public static AddRefMaster = environment.FoundationR3Url + "/RefMaster/AddRefMaster";
    public static EditRefMaster = environment.FoundationR3Url + "/RefMaster/EditRefMaster";
    public static GetRefMasterType = "/RefMaster/GetRefMasterType";
    public static GetRefMasterTypeKeyValueUserSetting = "/RefMaster/GetRefMasterTypeKeyValueUserSetting";
    public static GetRefMasterPaging = "/RefMaster/GetRefMasterPaging";
    public static GetRefMasterListDesc = "/RefMaster/GetRefMasterListDesc";
    public static GetRefMasterListKeyValueActiveByCode = environment.FoundationR3Url + "/RefMaster/GetListKeyValueActiveByCode"
    public static GetListActiveRefMasterType = "/RefMasterType/GetListKeyValueActiveByCode";
    public static GetRefMasterByRefMasterId = environment.FoundationR3Url + "/RefMaster/GetRefMasterByRefMasterId";
    public static GetListActiveRefMaster = environment.FoundationR3Url + "/RefMaster/GetListKeyValueActiveByCode";
    public static GetRefMasterByMasterCode = environment.FoundationR3Url + "/RefMaster/GetRefMasterByMasterCode";
    public static GetListActiveRefMasterWithMappingCodeAll = environment.FoundationR3Url + "/RefMaster/GetListActiveRefMasterWithMappingCodeAll";
    public static GetListActiveRefMasterByRefMasterTypeCode = environment.FoundationR3Url + "/RefMaster/GetListActiveRefMasterByRefMasterTypeCode";
    public static GetRefMasterByRefMasterTypeCodeAndMasterCode = environment.FoundationR3Url + "/RefMaster/GetRefMasterByRefMasterTypeCodeAndMasterCode";
    public static GetKvpRefMasterByRefMasterTypeCodeAndMasterCode = environment.FoundationR3Url + "/RefMaster/GetKvpRefMasterByRefMasterTypeCodeAndMasterCode";
    public static GetRefMasterByRefMasterTypeCode = environment.FoundationR3Url + "/RefMaster/GetRefMasterByRefMasterTypeCode"
  
    //REF COUNTRY
    public static GetListRefCountry = environment.FoundationR3Url + "/RefCountry/GetListRefCountry";
    public static GetRefCountryByCountryCode = environment.FoundationR3Url + "/RefCountry/GetRefCountryByCountryCode";

    //REF INDUSTRY TYPE
    public static GetRefIndustryTypeById = environment.FoundationR3Url + "/RefIndustryType/GetRefIndustryTypeByRefIndustryTypeId";
    public static AddRefIndustryType = environment.FoundationR3Url + "/RefIndustryType/AddRefIndustryType";
    public static EditRefIndustryType = environment.FoundationR3Url + "/RefIndustryType/EditRefIndustryType";
    public static GetRefIndustryTypeByIndustryTypeCode = environment.FoundationR3Url + "/RefIndustryType/GetRefIndustryTypeByIndustryTypeCode";

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
    public static LoginURLFrontEnd = NavigationConstant.PAGES_LOGIN;

    //FORM FEATURE
    public static GetListRefFeature = "/RefFeature/GetListRefFeature";
    public static GetRefFeatureByComponent = "/RefFeature/GetRefFeatureByComponent";

    //HOLIDAY
    public static GetAllActiveHolidaySchmH = "/Holiday/GetAllActiveHolidaySchmH";
    public static GetListActiveHolidaySchemeH = environment.FoundationR3Url + "/HolidaySchm/GetListActiveHolidaySchemeH"
    public static GetHolidayPaging = "/Holiday/GetHolidayPaging";
    public static AddHolidaySchmH = environment.FoundationR3Url + "/HolidaySchm/AddHolidaySchmH";
    public static AddHolidaySchmD = environment.FoundationR3Url + "/HolidaySchm/AddHolidaySchmD";
    public static AddHolidaySchmDUntilYear = environment.FoundationR3Url + "/HolidaySchm/AddHolidaySchmDUntilYear";
    public static GetHolidaySchmH = "/Holiday/GetHolidaySchmH";
    public static GetHolidaySchmHById = environment.FoundationR3Url + "/HolidaySchm/GetHolidaySchmHById";
    public static GetHolidaySchmDById = environment.FoundationR3Url + "/HolidaySchm/GetHolidaySchmDById";
    public static EditHolidaySchmHOnly = "/Holiday/EditHolidaySchmHOnly";
    public static EditHolidaySchmH = environment.FoundationR3Url + "/HolidaySchm/EditHolidaySchmH";
    public static EditHolidaySchmD = environment.FoundationR3Url + "/HolidaySchm/EditHolidaySchmD";
    public static DeleteHolidaySchmD = "/HolidaySchm/DeleteHolidaySchmD";
    public static GetHolidayDetailPaging = "/Holiday/GetHolidayDetailPaging";
    public static CopyHolidaySchmH = environment.FoundationR3Url + "/HolidaySchm/CopyHolidaySchmH";

    //USER SESSION LOG
    public static SelectRole = "/UserSessionLog/SelectRole";

    //NOTIFICATION
    public static SendNotificationRemainingPasswordExpirationDaysToUser = environment.FoundationR3Url + "/Notification/SendNotificationRemainingPasswordExpirationDaysToUser";
    public static NotificationPost = "/Message/Post";
    public static NotificationSignalR = "/notification";
    public static GetNotificationHByNotificationHId = environment.FoundationR3Url + "/NotificationH/GetNotificationHByNotificationHId";
    public static GetListUsernameAndEmpNameByNotificationHId = "/NotificationD/GetListUsernameAndEmpNameByNotificationHId"
    public static AddNotificationHAndD = "/NotificationH/AddNotificationHAndD"
    public static EditNotificationH = environment.FoundationR3Url + "/NotificationH/EditNotificationH"
    public static UpdateReadNotification = environment.FoundationR3Url + "/NotificationD/UpdateReadNotificationD";
    public static GetListNotificationHByRefUserId = environment.FoundationR3Url + "/NotificationH/GetListNotificationHByRefUserId";

    //REF CURR
    public static GetRefCurrPaging = "/RefCurr/GetRefCurrPaging";
    public static AddRefCurr = environment.FoundationR3Url + "/RefCurr/AddRefCurr";
    public static EditRefCurr = environment.FoundationR3Url + "/RefCurr/EditRefCurr";
    public static GetRefCurrById = environment.FoundationR3Url + "/RefCurr/GetRefCurrById";
    public static GetRefCurrByCode = environment.FoundationR3Url + "/RefCurr/GetRefCurrByCode";

    //REF ECONOMIC SECTOR
    public static AddRefEconomicSector = environment.FoundationR3Url + "/RefEconomicSector/AddRefEconomicSector";
    public static EditRefEconomicSector = environment.FoundationR3Url + "/RefEconomicSector/EditRefEconomicSector";
    public static GetRefEconomicSectorById = environment.FoundationR3Url + "/RefEconomicSector/GetRefEconomicSectorById";

    //REF PROV DISTRICT
    public static AddRefProvDistrict = environment.FoundationR3Url + "/RefProvDistrict/AddRefProvDistrict";
    public static EditRefProvDistrict = environment.FoundationR3Url + "/RefProvDistrict/EditRefProvDistrict";
    public static GetRefProvDistrictById = environment.FoundationR3Url + "/RefProvDistrict/GetRefProvDistrictByRefProvDistrictId";

    //ASSET MASTER
    public static AddAssetMaster = environment.FoundationR3Url + "/AssetMaster/AddAssetMaster";
    public static EditAssetMaster = environment.FoundationR3Url + "/AssetMaster/EditAssetMaster";
    public static GetAssetMasterById = environment.FoundationR3Url + "/AssetMaster/GetAssetMasterById";
    public static GetValueAssetType = environment.FoundationR3Url + "/AssetType/GetListKeyValueActiveById";
    public static GetListAssetCategory = environment.FoundationR3Url + "/AssetCategory/GetListAssetCategoryByIdWithCriteriaObj";
    public static GetListAssetSchmH = environment.FoundationR3Url + "/AssetSchmH/GetListAssetSchmHByAssetMasterId";
    public static GetListAssetMasterByAssetSchmHId = environment.FoundationR3Url + "/AssetMaster/GetListAssetMasterByAssetSchmHId";
    public static EditListAssetSchmDByAssetMasterId = environment.FoundationR3Url + "/AssetSchmD/EditListAssetSchmDByAssetMasterId";
    public static GetUploadAssetMasterByUploadMonitoringNoAndTrxType = environment.FoundationR3Url + '/AssetMaster/GetUploadAssetMasterByUploadMonitoringNoAndTrxType';
    public static AddAssetMasterAttrContent = environment.FoundationR3Url + "/AssetMasterAttrContent/AddAssetMasterAttrContent";
    public static GetAssetMasterAttrContentForAssetMaster = environment.FoundationR3Url + "/AssetMasterAttrContent/GetAssetMasterAttrContentForAssetMaster";
    public static GetAssetMasterAttrContentForAssetMasterByAttrTypeCode = environment.FoundationR3Url + "/AssetMasterAttrContent/GetAssetMasterAttrContentForAssetMasterByAttrTypeCode";

    //REF ATTR
    public static GetListActiveRefAttrType = environment.FoundationR3Url + "/RefAttrType/GetListActiveRefAttrType";
    public static GetRefAttrById = environment.FoundationR3Url + "/RefAttr/GetRefAttrById";
    public static AddRefAttr = environment.FoundationR3Url + "/RefAttr/AddRefAttr";
    public static EditRefAttr = environment.FoundationR3Url + "/RefAttr/EditRefAttr";
    public static GetListActiveRefAttrByAttrGroup = environment.FoundationR3Url + "/RefAttr/GetListActiveRefAttrByAttrGroup"
    public static GetListActiveRefAttrByListAttrGroup = environment.FoundationR3Url + "/RefAttr/GetListActiveRefAttrByListAttrGroup"
    
    //REF PROFESSION
    public static AddRefProfession = environment.FoundationR3Url + "/RefProfession/AddRefProfession";
    public static EditRefProfession = environment.FoundationR3Url + "/RefProfession/EditRefProfession";
    public static DeleteRefProfession = "/RefProfession/DeleteRefProfession";
    public static GetRefProfessionById = environment.FoundationR3Url + "/RefProfession/GetRefProfessionByRefProfessionId";
    public static GetRefProfessionByProfessionCode = environment.FoundationR3Url + "/RefProfession/GetRefProfessionByProfessionCode"
    public static GetRefProfessionByRefProfessionId = environment.FoundationR3Url + "/RefProfession/GetRefProfessionByRefProfessionId";

    //REF REASON
    public static AddRefReason = environment.FoundationR3Url + "/RefReason/AddRefReason";
    public static EditRefReason = environment.FoundationR3Url + "/RefReason/EditRefReason";
    public static GetRefReasonById = environment.FoundationR3Url + "/RefReason/GetRefReasonByRefReasonId";

    //REF REASON TYPE
    public static GetValueReasonType = environment.FoundationR3Url + "/RefReasonType/GetListKeyValueByCode";

    //GENERIC
    public static GetObjectBySQL = "/Generic/GetObjectBySQL";
    public static AddObjectBySQL = "/Generic/AddObjectBySQL";
    public static UpdateObjectBySQL = "/Generic/UpdateObjectBySQL";
    public static DeleteObjectBySQL = "/Generic/DeleteObjectBySQL";

    //WORKHOUR
    public static GetListActiveWorkingSchmH = environment.FoundationR3Url + "/WorkingHourSchm/GetListActiveWorkingSchmH";
    public static GetWorkHourSchmHPaging = "/WorkHour/GetWorkHourSchmHPaging";
    public static AddWorkingHourSchmH = environment.FoundationR3Url + "/WorkingHourSchm/AddWorkingHourSchmH";
    public static AddListWorkingHourSchmD = environment.FoundationR3Url + "/WorkingHourSchm/AddListWorkingHourSchmD";
    public static EditListWorkingHourSchmD = environment.FoundationR3Url + "/WorkingHourSchm/EditListWorkingHourSchmD";
    public static EditWorkingHourSchmH = environment.FoundationR3Url + "/WorkingHourSchm/EditWorkingHourSchmH";
    public static GetWorkingHourSchmH = "/WorkHour/GetWorkingHourSchmH";
    public static GetWorkingHourSchmD = "/WorkHour/GetWorkingHourSchmD";
    public static GetWorkingHourSchmHById = environment.FoundationR3Url + "/WorkingHourSchm/GetWorkingHourSchmHById";
    public static GetListWorkingHourSchmDByWorkingHourHId = environment.FoundationR3Url + "/WorkingHourSchm/GetListWorkingHourSchmDByWorkingHourHId";

    //QUEUE
    public static AddQueue = environment.FoundationR3Url + "/RabbitMq/AddQueue";

    //REF MODULE
    public static GetListRefModuleKeyValue = environment.FoundationR3Url + "/RefModule/GetListRefModuleKeyValue";
    public static GetListKeyValueByCode = environment.FoundationR3Url + "/RefModule/GetListKeyValueByCode";
    public static GetListKeyValueRefModuleById = environment.FoundationR3Url + "/RefModule/GetListKeyValueRefModuleById";

    //REF EMP LEAVE MANAGEMENT
    public static GetRefEmpLeaveMngmntPaging = "/RefEmpLeaveManagement/GetRefEmpLeaveMngmntPaging";
    public static DeleteRefEmpLeaveMngmnt = "/RefEmpLeaveMngmnt/DeleteRefEmpLeaveMngmnt";
    public static GetRefEmpLeaveMngmntById = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/GetRefEmpLeaveByRefEmpLeaveId";
    public static EditRefEmpLeaveMngmnt = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/EditRefEmpLeaveMngmnt";
    public static AddRefEmpLeaveMngmnt = environment.FoundationR3Url + "/RefEmpLeaveMngmnt/AddRefEmpLeaveMngmnt";

    //UPLOAD
    public static UploadReview = environment.FoundationR3Url + "/Upload/UploadReview";
    public static UpdateUploadMonitoringHStatActivity = environment.FoundationR3Url + "/Upload/UpdateUploadMonitoringHStatActivity";
    public static CancelUpload = environment.FoundationR3Url + "/Upload/CancelUpload";
    public static UploadFile = environment.FoundationR3Url + "/Upload/UploadFile";

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
    public static GetUrlPagingObjectBySQL = environment.FoundationR3Url + "/Generic/GetPagingObjectBySQL"

    // ASSET TYPE
    public static AddAssetType = environment.FoundationR3Url + "/AssetType/AddAssetType"
    public static EditAssetType = environment.FoundationR3Url + "/AssetType/EditAssetType"
    public static GetAssetTypeByCode = environment.FoundationR3Url + "/AssetType/GetAssetTypeByCode"
    public static GetAssetTypeById = environment.FoundationR3Url + "/AssetType/GetAssetTypeById"
    public static GetListAssetType = environment.FoundationR3Url + "/AssetType/GetListAssetType"
    public static GetListActiveAssetType = environment.FoundationR3Url + "/AssetType/GetListActiveAssetType"

    //REF REASON
    public static GetValueReasonModel = environment.FoundationR3Url + "/RefReason/GetListKeyValueByCode";

    //asset accesory
    public static AddNewAssetAccesory = environment.FoundationR3Url + "/AssetAccessory/AddAssetAccessory"
    public static EditAssetAccessory = environment.FoundationR3Url + "/AssetAccessory/EditAssetAccessory"
    public static GetAssetAccessorybyAssetAccesoryCode = environment.FoundationR3Url + "/AssetAccessory/GetAssetAccessoryByCode"
    public static GetAssetAccessorybyAssetAccessoryId = environment.FoundationR3Url + "/AssetAccessory/GetAssetAccessoryById"
    public static GetlistAssetAccessorybyAssetTypeId = environment.FoundationR3Url + "/AssetAccessory/GetListAssetAccessoryByAssetTypeId"
    public static DeleteAssetAccessory = "/AssetAccessory/DeleteAssetAccessory"

    //asset attr
    public static AddAssetAttr = environment.FoundationR3Url +"/AssetAttr/AddAssetAttr";
    public static EditAssetAttr = environment.FoundationR3Url +"/AssetAttr/EditAssetAttr";
    public static GetListAssetAttrByAssetTypeId = environment.FoundationR3Url +"/AssetAttr/GetListAssetAttrByAssetTypeId";
    public static GetAssetAttrByAssetAttrId = environment.FoundationR3Url +"/AssetAttr/GetAssetAttrByAssetAttrId";
    public static DeleteAssetAttr = "/AssetAttr/DeleteAssetAttr";

    //asset category
    public static AddNewAssetCategory = environment.FoundationR3Url + "/AssetCategory/AddAssetCategory"
    public static EditAssetCategory = environment.FoundationR3Url + "/AssetCategory/EditAssetCategory"
    public static GetAssetCategoryByAssetCategoryCode = environment.FoundationR3Url + "/AssetCategory/GetAssetCategoryByCode"
    public static GetAssetCategorybyAssetCategoryId = environment.FoundationR3Url + "/AssetCategory/GetAssetCategoryById"
    public static GetlistAssetCategorybyAssetTypeId = environment.FoundationR3Url + "/AssetCategory/GetListAssetCategoryByAssetTypeId"//
    public static DeleteAssetCategory = "/AssetCategory/DeleteAssetCategory"
    public static GetActiveAssetCategoryValue = environment.FoundationR3Url + "/AssetCategory/GetListActiveAssetCategoryValue"

    // ASSET DOC LIST
    public static AddNewAssetDocList = environment.FoundationR3Url + "/AssetDocList/AddAssetDocList"
    public static EditAssetDocList = environment.FoundationR3Url + "/AssetDocList/EditAssetDocList"
    public static GetAssetDocListByAssetDocListId = environment.FoundationR3Url + "/AssetDocList/GetAssetDocListById"
    public static GetlistAssetDocListByAssetTypeId = environment.FoundationR3Url + "/AssetDocList/GetListAssetDocListByAssetTypeId"
    public static DeleteAssetDocList = "/AssetDocList/DeleteAssetDocList"

    // ASSET REF DOC
    public static AddNewRefAssetDocData = environment.FoundationR3Url + "/RefAssetDoc/AddRefAssetDoc"
    public static EditRefAssetDocData = environment.FoundationR3Url + "/RefAssetDoc/EditRefAssetDoc"
    public static GetRefAssetDocByAssetDocCode = environment.FoundationR3Url + "/RefAssetDoc/GetRefAssetDocByAssetDocCode"
    public static GetRefAssetDocByRefAssetDocId = environment.FoundationR3Url + "/RefAssetDoc/GetRefAssetDocByRefAssetDocId"
    public static GetListRefAssetDoc = environment.FoundationR3Url + "/RefAssetDoc/GetListRefAssetDoc"
    

    // ASSET SCHEME
    public static GetAssetSchmHById = environment.FoundationR3Url + "/AssetSchmH/GetAssetSchmHById";
    public static AddAssetSchmH = environment.FoundationR3Url + "/AssetSchmH/AddAssetSchmH";
    public static EditAssetSchmH = environment.FoundationR3Url + "/AssetSchmH/EditAssetSchmH";
    public static GetListAssetSchmDByAssetSchmHId = environment.FoundationR3Url + "/AssetSchmD/GetListAssetSchmDByAssetSchmHId"
    public static EditListAssetSchmD = environment.FoundationR3Url + "/AssetSchmD/EditListAssetSchmD"
    public static AddListAssetSchmD = environment.FoundationR3Url + "/AssetSchmD/AddListAssetSchmD";
    public static DeleteAssetSchmD = "/AssetSchmD/DeleteAssetSchmD";
    public static AddRangeAssetSchmD = environment.FoundationR3Url + "/AssetSchmD/AddRangeAssetSchmD";

    // ASSET TYPE
    public static GetActiveAssetTypeValue = environment.FoundationR3Url + "/AssetType/GetListActiveAssetType";

    // ASSET NEGATIVE
    public static AddAssetNegative = environment.FoundationR3Url + "/AssetNegative/AddAssetNegative";
    public static EditAssetNegative = environment.FoundationR3Url + "/AssetNegative/EditAssetNegative";
    public static GetAssetNegativeByIdEditPage = environment.FoundationR3Url + "/AssetNegative/GetAssetNegativeByIdEditPage";
    public static GetUploadAssetNegativeByUploadMonitoringNoAndTrxType = environment.FoundationR3Url + "/AssetNegative/GetUploadAssetNegativeByUploadMonitoringNoAndTrxType";

    // VENDOR
    public static AddVendorHO = environment.FoundationR3Url + "/Vendor/AddVendorHO";
    public static EditVendorHO = environment.FoundationR3Url + "/Vendor/EditVendorHO";
    public static AddVendorHolding = environment.FoundationR3Url + "/Vendor/AddVendorHolding";
    public static EditVendorHolding = environment.FoundationR3Url + "/Vendor/EditVendorHolding";
    public static AddVendorATPM = environment.FoundationR3Url + "/Vendor/AddVendorATPM";
    public static EditVendorATPM = environment.FoundationR3Url + "/Vendor/EditVendorATPM";
    public static GetVendorAndVendorAddr = environment.FoundationR3Url + "/Vendor/GetVendorAndVendorTaxAddrByVendorId";
    public static GetVendorByVendorId = environment.FoundationR3Url + "/Vendor/GetVendorByVendorId";
    public static AddVendorAddr = environment.FoundationR3Url + "/VendorAddr/AddVendorAddr";
    public static EditVendorAddr = environment.FoundationR3Url + "/VendorAddr/EditVendorAddr";
    public static GetVendorAddrByVendorId = environment.FoundationR3Url + "/VendorAddr/GetVendorAddrByVendorIdMrAddrType";
    public static GetListHoByVendorId = environment.FoundationR3Url + "/Vendor/GetListHoByVendorId";
    public static GetListVendorBankAccByVendorId = environment.FoundationR3Url + "/VendorBankAcc/GetListVendorBankAccByVendorId";
    public static AddVendorBankAcc = environment.FoundationR3Url + "/VendorBankAcc/AddVendorBankAcc";
    public static EditVendorBankAcc = environment.FoundationR3Url + "/VendorBankAcc/EditVendorBankAcc";
    public static GetVendorBankAccByVendorBankAccId = environment.FoundationR3Url + "/VendorBankAcc/GetVendorBankAccByVendorBankAccId";
    public static DeleteVendorBankAcc = environment.FoundationR3Url + "/VendorBankAcc/DeleteVendorBankAcc";
    public static GetVendorContactPersonById = environment.FoundationR3Url + "/VendorContactPerson/GetVendorContactPersonById";
    public static AddVendorContactPerson = environment.FoundationR3Url + "/VendorContactPerson/AddVendorContactPerson";
    public static EditVendorContactPerson = environment.FoundationR3Url + "/VendorContactPerson/EditVendorContactPerson";
    public static DeleteVendorContactPerson = environment.FoundationR3Url + "/VendorContactPerson/DeleteVendorContactPerson";
    public static GetListVendorContactPersonByVendorId = environment.FoundationR3Url + "/VendorContactPerson/GetListVendorContactPersonByVendorId"
    public static GetListBranchByVendorId = environment.FoundationR3Url + "/Vendor/GetListBranchByVendorId";
    public static GetListVendorBankAccByVendorEmpId = environment.FoundationR3Url + "/VendorBankAcc/GetListVendorBankAccByVendorEmpId";
    public static GetVendorAddrByVendorAddrId = environment.FoundationR3Url + "/VendorAddr/GetVendorAddrByVendorAddrId";

    // VENDOR OFFICE MEMBER
    public static AddListVendorOfficeMember = environment.FoundationR3Url + "/VendorOfficeMbr/AddListVendorOfficeMember"
    public static GetListVendorOfficeMbrByVendorId = environment.FoundationR3Url + "/VendorOfficeMbr/GetListVendorOfficeMbrByVendorId"
    public static DeleteVendorOfficeMember = environment.FoundationR3Url + "/VendorOfficeMbr/DeleteVendorOfficeMember"

    // VENDOR GROUP
    public static AddVendorGrp = environment.FoundationR3Url + "/VendorGrp/AddVendorGrp";
    public static EditVendorGrp = environment.FoundationR3Url + "/VendorGrp/EditVendorGrp";
    public static GetVendorGrpByVendorGrpCode = environment.FoundationR3Url + "/VendorGrp/GetVendorGrpByVendorGrpCode";
    public static GetVendorGrpByVendorGrpId = environment.FoundationR3Url + "/VendorGrp/GetVendorGrpByVendorGrpId";
    public static GetVendorGrpForUpdateByVendorGrpCode = environment.FoundationR3Url + "/VendorGrp/GetVendorGrpForUpdateByVendorGrpCode";
    public static GetVendorGrpForUpdateByVendorGrpId = environment.FoundationR3Url + "VendorGrp/GetVendorGrpForUpdateByVendorGrpId";
    public static GetListVendorGrpByVendorId = environment.FoundationR3Url + "/VendorGrp/GetListVendorGrpByVendorId";

    // VENDOR GROUP MEMBER 
    public static GetListVendorGrpMbrByVendorGrpId = environment.FoundationR3Url + "/VendorGrpMbr/GetListVendorGrpMbrByVendorGrpId";
    public static GetListVendorGrpMbrByVendorId = environment.FoundationR3Url + "/VendorGrpMbr/GetListVendorGrpMbrByVendorId";
    public static AddRangeVendorGrpMbr = environment.FoundationR3Url + "/VendorGrpMbr/AddRangeVendorGrpMbr";
    public static DeleteVendorGrpMemberById = "/VendorGrpMbr/DeleteVendorGrpMbrById"

    // VENDOR BRANCH
    public static AddVendorBranch = environment.FoundationR3Url + "/Vendor/AddVendorBranch"
    public static GetVendorBranchAndVendorTaxAddrByVendorId = environment.FoundationR3Url + "/Vendor/GetVendorBranchAndVendorTaxAddrByVendorId"
    public static EditVendorBranch = environment.FoundationR3Url + "/Vendor/EditVendorBranch";

    // VENDOR EMP
    public static AddVendorBranchEmp = environment.FoundationR3Url + "/VendorEmp/AddVendorBranchEmp"
    public static GetVendorEmpByVendorEmpId = environment.FoundationR3Url + "/VendorEmp/GetVendorEmpByVendorEmpId"
    public static GetVendorEmpAndVendorTaxAddrByVendorEmpId = environment.FoundationR3Url + "/VendorEmp/GetVendorEmpAndVendorTaxAddrByVendorEmpId"
    public static EditVendorBranchEmp = environment.FoundationR3Url + "/VendorEmp/EditVendorBranchEmp";
    public static GetListVendorEmpByVendorId = environment.FoundationR3Url + "/VendorEmp/GetListVendorEmpByVendorId";

    // VENDOR ADDR
    public static GetVendorAddrByVendorEmpId = environment.FoundationR3Url + "/VendorAddr/GetVendorAddrByVendorEmpIdMrAddrType";

    // VENDOR SCHEME
    public static AddVendorSchm = environment.FoundationR3Url + "/VendorSchm/AddVendorSchm";
    public static EditVendorSchm = environment.FoundationR3Url + "/VendorSchm/EditVendorSchm";
    public static GetVendorSchmByVendorSchmId = environment.FoundationR3Url + "/VendorSchm/GetVendorSchmByVendorSchmId";
    public static AddVendorSchmMember = environment.FoundationR3Url + "/VendorSchmMbr/AddVendorSchmMember";
    public static DeleteVendorSchmMember = "/VendorSchmMbr/DeleteVendorSchmMember"
    public static GetListVendorSchmMemberByVendorSchmId = environment.FoundationR3Url + "/VendorSchmMbr/GetListVendorSchmMemberByVendorSchmId"

    // VENDOR ATTR
    public static GetListActiveVendorAttrByVendorCategoryCode = environment.FoundationR3Url + "/VendorAttr/GetListActiveVendorAttrByVendorCategoryCode";

    // VENDOR ATTR CONTENT
    public static AddRangeVendorAttrContent = environment.FoundationR3Url + "/VendorAttrContent/AddRangeVendorAttrContent";
    public static EditListVendorAttrContent = environment.FoundationR3Url + "/VendorAttrContent/EditListVendorAttrContent";
    public static DeleteRangeVendorAttrContentByIds = environment.FoundationR3Url + "/VendorAttrContent/DeleteRangeVendorAttrContentByIds";
    public static GetListVendorAttrContentByVendorAttrId = environment.FoundationR3Url + "/VendorAttrContent/GetListVendorAttrContentByVendorAttrId";
    public static GetListVendorAttrContentByVendorId = environment.FoundationR3Url + "/VendorAttrContent/GetListVendorAttrContentByVendorId";

    // VERIFICATION
    // REF VERF ANSWER TYPE
    public static GetActiveRefVerfAnswerTypes = environment.FoundationR3Url + "/RefVerfAnswerType/GetActiveRefVerfAnswerTypes";
    public static GetRefVerfAnswerTypeByCode = environment.FoundationR3Url + "/RefVerfAnswerType/GetRefVerfAnswerTypeByCode";
    public static GetRefVerfAnswerTypeById = environment.FoundationR3Url + "/RefVerfAnswerType/GetRefVerfAnswerTypeById";
    public static GetRefVerfAnswerTypes = environment.FoundationR3Url + "/RefVerfAnswerType/GetRefVerfAnswerTypes";
    public static GetRefVerfAnswerTypeForUpdateById = environment.FoundationR3Url + "/RefVerfAnswerType/GetRefVerfAnswerTypeForUpdateById";
    public static GetRefVerfAnswerTypeForUpdateByCode = environment.FoundationR3Url + "/RefVerfAnswerType/GetRefVerfAnswerTypeForUpdateByCode";

    // VERF QUESTION ANSWER
    public static AddVerfQuestionAnswer = environment.FoundationR3Url + "/VerfQuestionAnswer/AddVerfQuestionAnswer";
    public static EditVerfQuestionAnswer = environment.FoundationR3Url + "/VerfQuestionAnswer/EditVerfQuestionAnswer";
    public static GetVerfQuestionAnswerByRefVerfAnswerTypeId = environment.FoundationR3Url + "/VerfQuestionAnswer/GetVerfQuestionAnswerByRefVerfAnswerTypeId";
    public static GetVerfQuestionAnswerForUpdateById = environment.FoundationR3Url + "/VerfQuestionAnswer/GetVerfQuestionAnswerForUpdateById";

    // VERF QUESTION GRP H
    public static AddVerfQuestionGrpH = environment.FoundationR3Url + "/VerfQuestionGrpH/AddVerfQuestionGrpH";
    public static EditVerfQuestionGrpH = environment.FoundationR3Url + "/VerfQuestionGrpH/EditVerfQuestionGrpH";
    public static GetActiveVerfQuestionGrpHs = environment.FoundationR3Url + "/VerfQuestionGrpH/GetActiveVerfQuestionGrpHs";
    public static GetVerfQuestionGrpHs = environment.FoundationR3Url + "/VerfQuestionGrpH/GetVerfQuestionGrpHs";
    public static GetQuestionGrpHById = environment.FoundationR3Url + "/VerfQuestionGrpH/GetQuestionGrpHById";
    public static GetQuestionGrpHForUpdateById = environment.FoundationR3Url + "/VerfQuestionGrpH/GetQuestionGrpHForUpdateById";
    public static GetQuestionGrpHByCode = environment.FoundationR3Url + "/VerfQuestionGrpH/GetQuestionGrpHByCode";
    public static GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById = environment.FoundationR3Url + "/VerfQuestionGrpH/GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById"

    // VERF QUESTION GRP D
    public static AddListVerfQuestionGrpD = environment.FoundationR3Url + "/VerfQuestionGrpD/AddListVerfQuestionGrpD";
    public static DeleteVerfQuestionGroupDById = environment.FoundationR3Url + "/VerfQuestionGrpD/DeleteVerfQuestionGroupDById";
    public static EditVerfQuestionGrpD = environment.FoundationR3Url + "/VerfQuestionGrpD/EditVerfQuestionGrpD";
    public static GetActiveVerfQuestionGrpDsByGrpHId = environment.FoundationR3Url + "/VerfQuestionGrpD/GetActiveVerfQuestionGrpDsByGrpHId";
    public static GetVerfQuestionGrpDById = environment.FoundationR3Url + "/VerfQuestionGrpD/GetVerfQuestionGrpDById";
    public static GetVerfQuestionGrpDByGrpHId = environment.FoundationR3Url + "/VerfQuestionGrpD/GetVerfQuestionGrpDByGrpHId";
    public static GetVerfQuestionGrpDForUpdateById = environment.FoundationR3Url + "/VerfQuestionGrpD/GetVerfQuestionGrpDForUpdateById";
    
    // VERF RESULT
    public static GetVerfResultsByTrxRefNo = environment.FoundationR3Url + "/VerfResult/GetVerfResultsByTrxRefNo";
    public static GetVerfResultById = environment.FoundationR3Url + "/VerfResult/GetVerfResultById";
    public static GetVerfResultByResultNo = environment.FoundationR3Url + "/VerfResult/GetVerfResultByResultNo";

    // VERF RESULT H
    public static GetVerfResultHsByVerfResultId = environment.FoundationR3Url + "/VerfResultH/GetVerfResultHsByVerfResultId";
    public static GetVerfResultHById = environment.FoundationR3Url + "/VerfResultH/GetVerfResultHById";

    // VERF RESULT D
    public static EditVerfResultD = environment.FoundationR3Url + "/VerfResultD/EditVerfResultD";
    public static GetVerfResultDsByVerfResultHId = environment.FoundationR3Url + "/VerfResultD/GetVerfResultDsByVerfResultHId";
    public static GetVerfResultDById = environment.FoundationR3Url + "/VerfResultD/GetVerfResultDById";

    // VERF SCHEME H
    public static AddVerfSchemeH = environment.FoundationR3Url + "/VerfSchemeH/AddVerfSchemeH";
    public static EditVerfSchemeH = environment.FoundationR3Url + "/VerfSchemeH/EditVerfSchemeH";
    public static DeleteVerfSchemeHById = environment.FoundationR3Url + "/VerfSchemeH/DeleteVerfSchemeHById";
    public static GetActiveVerfSchemeHs = environment.FoundationR3Url + "/VerfSchemeH/GetActiveVerfSchemeHs";
    public static GetVerfSchemeHs = environment.FoundationR3Url + "/VerfSchemeH/GetVerfSchemeHs";
    public static GetVerfSchemeHById = environment.FoundationR3Url + "/VerfSchemeH/GetVerfSchemeHById";
    public static GetVerfSchemeHByCode = environment.FoundationR3Url + "/VerfSchemeH/GetVerfSchemeHByCode";

    // VERF SCHEME D
    public static EditVerfSchemeD = environment.FoundationR3Url + "/VerfSchemeD/EditVerfSchemeD";
    public static GetVerfSchemeHForUpdateById = environment.FoundationR3Url + "/VerfSchemeH/GetVerfSchemeHForUpdateById";
    public static GetVerfSchemeDataByVerfSchemeHId = environment.FoundationR3Url + "/VerfSchemeH/GetVerfSchemeDataByVerfSchemeHId";
    public static AddListVerfSchemeD = environment.FoundationR3Url + "/VerfSchemeD/AddListVerfSchemeD";
    public static DeleteVerfSchemeD = environment.FoundationR3Url + "/VerfSchemeD/DeleteVerfSchemeD";
    public static GetVerfSchemeDsByVerfSchemeHId = environment.FoundationR3Url + "/VerfSchemeD/GetVerfSchemeDsByVerfSchemeHId";
    public static GetVerfSchemeDById = environment.FoundationR3Url + "/VerfSchemeD/GetVerfSchemeDById";

    // CUST DUPLICATE CHECKING
    public static GetCustomerDuplicateCheck = environment.FoundationR3Url + "/CustDuplicateCheck/GetCustomerDuplicateCheck";
    public static GetNegativeCustomerDuplicateCheck = environment.FoundationR3Url + "/CustDuplicateCheck/GetNegativeCustomerDuplicateCheck";
    public static GetCustomerAndNegativeCustDuplicateCheck = environment.FoundationR3Url + "/CustDuplicateCheck/GetCustomerAndNegativeCustDuplicateCheck";

    // CUSTOMER PERSONAL
    public static AddNewCustPersonal = environment.FoundationR3Url + "/CustPersonal/AddCustPersonal"
    public static EditCustPersonal = environment.FoundationR3Url + "/CustPersonal/EditCustPersonal"
    public static GetCustPersonalbyCustPersonalId = environment.FoundationR3Url + "/CustPersonal/GetCustPersonalByCustPersonalId"
    public static GetCustPersonalbyCustId = environment.FoundationR3Url + "/CustPersonal/GetCustPersonalByCustId"

    // CUSTOMER
    public static AddNewCust = environment.FoundationR3Url + "/Cust/AddCust";
    public static AddCustPersonalMainData = environment.FoundationR3Url + "/Cust/AddCustPersonalMainData";
    public static AddCustCompanyMainData = environment.FoundationR3Url + "/Cust/AddCustCompanyMainData";
    public static EditCust = environment.FoundationR3Url + "/Cust/EditCust";
    public static EditCustPersonalMainData = environment.FoundationR3Url + "/Cust/EditCustPersonalMainData";
    public static EditCustCompanyMainData = environment.FoundationR3Url + "/Cust/EditCustCompanyMainData";
    public static EditDuplicateCust = environment.FoundationR3Url + "/Cust/EditDuplicateCust";
    public static EditNegativeDuplicateCust = environment.FoundationR3Url + "/Cust/EditNegativeDuplicateCust";
    public static GetCustByCustId = environment.FoundationR3Url + "/Cust/GetCustByCustId";
    public static GetCustPersonalForUpdateByCustNo = environment.FoundationR3Url + "/Cust/GetCustPersonalForUpdateByCustNo";
    public static GetCustCompanyForUpdateByCustNo = environment.FoundationR3Url + "/Cust/GetCustCompanyForUpdateByCustNo";
    public static DeleteNegativeCustomer = environment.FoundationR3Url + "/NegativeCust/DeleteNegativeCust";
    public static GetListCustGrpByMemberCustIdForCustGrpTab = environment.FoundationR3Url + "/CustGrp/GetListCustGrpByMemberCustIdForCustGrpTab";
    public static GetCustByCustNo = environment.FoundationR3Url + "/Cust/GetCustByCustNo";

    // CUSTOMER COMPANY
    public static GetListViewCustCompanyLegalDocByCustCompanyId = environment.FoundationR3Url + "/CustCompanyLegalDoc/GetListViewCustCompanyLegalDocByCustCompanyId";
    public static DeleteCustCompanyLegalDoc = environment.FoundationR3Url + "/CustCompanyLegalDoc/DeleteCustCompanyLegalDoc";
    public static AddCustCompanyLegalDoc = environment.FoundationR3Url + "/CustCompanyLegalDoc/AddCustCompanyLegalDoc";

    // CUSTOMER GROUP
    public static AddCustGrpBothWays = environment.FoundationR3Url + "/CustGrp/AddCustGrpBothWays";
    public static AddCustGrp = environment.FoundationR3Url + "/CustGrp/AddCustGrp";
    public static DeleteCustGrp = environment.FoundationR3Url + "/CustGrp/DeleteCustGrp";

    // CUSTOMER FIN DATA
    public static GetCBAForCustFinDataByCustId = environment.FoundationR3Url + "/CustBankAcc/GetCBAForCustFinDataByCustId";
    public static AddCBAForCustFinData = environment.FoundationR3Url + "/CustBankAcc/AddCBAForCustFinData";
    public static EditCBAForCustFinData = environment.FoundationR3Url + "/CustBankAcc/EditCBAForCustFinData";
    public static GetCustBankAccByCustBankAccId = environment.FoundationR3Url + "/CustBankAcc/GetCustBankAccByCustBankAccId";
    public static GetCBAForCustFinDataEditModeByCustBankAccId = environment.FoundationR3Url + "/CustBankAcc/GetCBAForCustFinDataEditModeByCustBankAccId";
    public static GetCustBankAccByCustBankAccIdWithRefBank = environment.FoundationR3Url + "/CustBankAcc/GetCustBankAccByCustBankAccIdWithRefBank";
    public static AddCustBankAcc = environment.FoundationR3Url + "/CustBankAcc/AddCustBankAcc";
    public static GetCustPersonalFinDataByCustPersonalId = environment.FoundationR3Url + "/CustPersonalFinData/GetCustPersonalFinDataByCustPersonalId";
    public static GetCustCompanyFinDataByCustCompanyId = environment.FoundationR3Url + "/CustomerCompanyFinData/GetCustCompanyFinDataByCustCompanyId";
    public static AddCustCompanyFinData = environment.FoundationR3Url + "/CustomerCompanyFinData/AddCustCompanyFinData";
    public static EditCustCompanyFinData = environment.FoundationR3Url + "/CustomerCompanyFinData/EditCustCompanyFinData";
    public static AddCustPersonalFinData = environment.FoundationR3Url + "/CustPersonalFinData/AddCustPersonalFinData";
    public static EditCustPersonalFinData = environment.FoundationR3Url + "/CustPersonalFinData/EditCustPersonalFinData";
    public static GetCustPersonalFinDataForCustViewByCustId = environment.FoundationR3Url + "/CustPersonalFinData/GetCustPersonalFinDataForCustViewByCustId";
    public static EditCustBankAcc = environment.FoundationR3Url + "/CustBankAcc/EditCustBankAcc";
    public static DeleteCustBankAccAndStmnt = environment.FoundationR3Url + "/CustBankAcc/DeleteCustBankAccAndStmnt";

    // CUSTOMER ADDRESS
    public static GetListCustAddr = environment.FoundationR3Url + "/CustAddr/GetListCustAddr";
    public static AddCustAddr = environment.FoundationR3Url + "/CustAddr/AddCustAddr";
    public static EditCustAddr = environment.FoundationR3Url + "/CustAddr/EditCustAddr";
    public static GetCustAddr = environment.FoundationR3Url + "/CustAddr/GetCustAddrByCustAddrId";
    public static GetListCustAddrByCustId = environment.FoundationR3Url + "/CustAddr/GetListCustAddrByCustId";
    public static GetListCustAddrByCustIdForCustomerPersonalView = environment.FoundationR3Url + "/CustAddr/GetListCustAddrByCustIdForCustomerPersonalView";
    public static GetCustAddrLegalAddrByCustId = environment.FoundationR3Url + "/CustAddr/GetCustAddrLegalAddrByCustId"
    public static GetCustAddrByMrCustAddrType = environment.FoundationR3Url + "/CustAddr/GetCustAddrByMrCustAddrType"
    public static DeleteCustAddr = environment.FoundationR3Url + "/CustAddr/DeleteCustAddr"

    // CUSTOMER ADDRESS HISTORY
    public static GetListCustAddrHistByCustId = environment.FoundationR3Url + "/CustAddrHist/GetListCustAddrHistByCustId";
    public static GetListCustAddrHistByCustIdForCustomerPersonalView = environment.FoundationR3Url + "/CustAddrHist/GetListCustAddrHistByCustIdForCustomerPersonalView";

    // CUSTOMER JOB DATA
    public static AddCustPersonalJobData = environment.FoundationR3Url + "/CustPersonalJobData/AddCustPersonalJobData";
    public static EditCustPersonalJobData = environment.FoundationR3Url + "/CustPersonalJobData/EditCustPersonalJobData";
    public static GetCustPersonalJobDataByCustId = environment.FoundationR3Url + "/CustPersonalJobData/GetCustPersonalJobDataByCustId";

    // CUSTOMER COMPANY LEGAL DOC
    public static GetCustCompanyLegalDocForCustViewByCustId = environment.FoundationR3Url + "/CustCompanyLegalDoc/GetCustCompanyLegalDocForCustViewByCustId";

    // CUSTOMER COMPANY 
    public static GetCustCompanyByCustId = environment.FoundationR3Url + "/CustCompany/GetCustCompanyByCustId"
    public static EditCustCompany = environment.FoundationR3Url + "/CustCompany/EditCustCompany"

    // CUSTOMER COMPANY CONTACT PERSON
    public static AddCustCompanyContactPerson = environment.FoundationR3Url + "/CustCompanyContactPerson/AddCustCompanyContactPerson"
    public static GetCustCompanyContactPersonByCustCompanyContactPersonId = environment.FoundationR3Url + "/CustCompanyContactPerson/GetCustCompanyContactPersonByCustCompanyContactPersonId"
    public static GetCustCompanyContactPersonByCustCompanyId = environment.FoundationR3Url + "/CustCompanyContactPerson/GetCustCompanyContactPersonByCustCompanyId"
    public static EditCustCompanyContactPersonByCustCompanyId = environment.FoundationR3Url + "/CustCompanyContactPerson/EditCustCompanyContactPersonByCustCompanyId"

    // CUSTOMER COMPANY MANAGEMENT SHAREHOLDER
    public static GetCustCompanyMgmntShrholderForCustViewByCustId = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderForCustViewByCustId";
    public static AddCustCompanyMgmntShrholder = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholder";
    public static AddCustCompanyMgmntShrholderPersonal = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderPersonal";
    public static AddCustCompanyMgmntShrholderCompany = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/AddCustCompanyMgmntShrholderCompany";
    public static EditCustCompanyMgmntShrholder = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/EditCustCompanyMgmntShrholder";
    public static DeleteCustCompanyMgmntShrholder = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/DeleteCustCompanyMgmntShrholder";
    public static GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId";
    public static GetListCustCompanyMgmntShrholderByCustId = environment.FoundationR3Url + "/CustCompanyMgmntShrholder/GetListCustCompanyMgmntShrholderByCustId";

    // CUST ATTR CONTENT
    public static GetCustAttrContentForCustViewByCustId = environment.FoundationR3Url + "/CustAttrContent/GetCustAttrContentForCustViewByCustId";
    public static AddEditListCustAttrContent = environment.FoundationR3Url + "/CustAttrContent/AddEditListCustAttrContent";
    public static GetListCustAttrContentByCustIdForCust = environment.FoundationR3Url + "/CustAttrContent/GetListCustAttrContentByCustIdForCust";
    public static GetListCustAttrContentByCustIdAndAttrGroup = environment.FoundationR3Url + "/CustAttrContent/GetListCustAttrContentByCustIdAndAttrGroup"

    // CUST FIN DATA ATTR CONTENT
    public static GetListCustFinDataAttrContentByCustIdAndListAttrGroup = environment.FoundationR3Url + "/CustFinDataAttrContent/GetListCustFinDataAttrContentByCustIdAndListAttrGroup"
    public static GetCustFinDataAttrContentForCustViewByCustId = environment.FoundationR3Url + "/CustFinDataAttrContent/GetCustFinDataAttrContentForCustViewByCustId"
    
    //CUST CONTACT PERSON
    public static GetCustCompanyContactPersonForCustViewByCustId = environment.FoundationR3Url + "/CustCompanyContactPerson/GetCustCompanyContactPersonForCustViewByCustId";
    public static GetListCustPersonalContactPersonForCustViewByCustId = environment.FoundationR3Url + "/CustPersonalContactPerson/GetListCustPersonalContactPersonForCustViewByCustId";

    // CUST GROUP
    public static GetListCustGrpForCustViewByCustId = environment.FoundationR3Url + "/CustGrp/GetListCustGrpForCustViewByCustId";

    // NEGATIVE CUSTOMER
    public static AddNegativeCustomer = environment.FoundationR3Url + "/NegativeCust/AddNegativeCust";
    public static EditNegativeCustomer = environment.FoundationR3Url + "/NegativeCust/EditNegativeCust";
    public static EditDuplicateNegativeCust = environment.FoundationR3Url + "/NegativeCust/EditDuplicateNegativeCust";
    public static GetNegativeCustByNegativeCustId = environment.FoundationR3Url + "/NegativeCust/GetNegativeCustByNegativeCustId";
    public static AddNegativeCustChangeTrx = environment.FoundationR3Url + "/NegativeCustChangeTrx/AddNegativeCustChangeTrx";
    public static EditNegativeCustChangeTrx = environment.FoundationR3Url + "/NegativeCustChangeTrx/EditNegativeCustChangeTrx";
    public static GetNegativeCustChangeTrxByNegativeCustId = environment.FoundationR3Url + "/NegativeCustChangeTrx/GetNegativeCustChangeTrxByNegativeCustId";
    public static GetListNegativeCustChangeTrxByNegativeCustId = environment.FoundationR3Url + "/NegativeCustChangeTrx/GetListNegativeCustChangeTrxByNegativeCustId";
    public static GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType = environment.FoundationR3Url + '/NegativeCust/GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType';
    public static GetNegativeCustByNegativeCustNameAndCustType = environment.FoundationR3Url + "/NegativeCust/GetNegativeCustByNegativeCustNameAndCustType";

    // CUSTOMER OTHER INFO
    public static AddCustOtherInfo = environment.FoundationR3Url + "/CustOtherInfo/AddCustOtherInfo";
    public static EditCustOtherInfo = environment.FoundationR3Url + "/CustOtherInfo/EditCustOtherInfo";
    public static GetCustOtherInfoByCustId = environment.FoundationR3Url + "/CustOtherInfo/GetCustOtherInfoByCustId";

    //Custsomer Personal Contact Person
    public static AddNewCustPersonalContactPerson = environment.FoundationR3Url + "/CustPersonalContactPerson/AddCustPersonalContactPerson"
    public static GetListCustPersonalContactPersonByCustId = environment.FoundationR3Url + "/CustPersonalContactPerson/GetListCustPersonalContactPersonByCustId"
    public static DeleteCustPersonalContactPerson = environment.FoundationR3Url + "/CustPersonalContactPerson/DeleteCustPersonalContactPerson"
    public static EditCustPersonalContactPerson = environment.FoundationR3Url + "/CustPersonalContactPerson/EditCustPersonalContactPerson"
    public static GetCustPersonalContactPersonByCustPersonalContactPersonId = environment.FoundationR3Url + "/CustPersonalContactPerson/GetCustPersonalContactPersonByCustPersonalContactPersonId"
    public static AddCustPersonalEmergencyContact = environment.FoundationR3Url + "/CustPersonalContactPerson/AddCustPersonalEmergencyContact";
    public static EditCustPersonalEmergencyContact = environment.FoundationR3Url + "/CustPersonalContactPerson/EditCustPersonalEmergencyContact";
    public static GetCustPersonalEmergencyContactByCustId = environment.FoundationR3Url + "/CustPersonalContactPerson/GetCustPersonalEmergencyContactByCustId";
    public static AddCustPersonalFamily = environment.FoundationR3Url + "/CustPersonalFamily/AddCustPersonalFamily";
    public static EditCustPersonalFamily = environment.FoundationR3Url + "/CustPersonalFamily/EditCustPersonalFamily";
    public static DeleteCustPersonalFamily = environment.FoundationR3Url + "/CustPersonalFamily/DeleteCustPersonalFamily";
    public static GetCustPersonalFamilyByCustPersonalFamilyId = environment.FoundationR3Url + "/CustPersonalFamily/GetCustPersonalFamilyByCustPersonalFamilyId";
    public static GetMainCustAndListCustPersonalFamilyByCustId = environment.FoundationR3Url + "/CustPersonalFamily/GetMainCustAndListCustPersonalFamilyByCustId";
    public static GetListCustPersonalEmergencyContactByCustId = environment.FoundationR3Url + "/CustPersonalContactPerson/GetListCustPersonalEmergencyContactByCustId";

    // SURVEY TASK
    public static GetListSrvyTaskBySrvyOrderId = environment.FoundationR3Url + "/SrvyTask/GetListSrvyTaskBySrvyOrderId";
    public static GetListSrvyTaskBySrvyOrderIdForUpdate = environment.FoundationR3Url + "/SrvyTask/GetListSrvyTaskBySrvyOrderIdForUpdate";
    public static AddSrvyTask = environment.FoundationR3Url + "/SrvyTask/AddSrvyTask";
    public static EditSrvyTask = environment.FoundationR3Url + "/SrvyTask/EditSurveyTask";
    public static DeleteSrvyTask = environment.FoundationR3Url + "/SrvyTask/DeleteSrvyTask";
    public static GetSrvyTaskBySrvyTaskId = environment.FoundationR3Url + "/SrvyTask/GetSrvyTaskBySrvyTaskId";
    public static CancelSurveyTaskBySurveyTaskId = environment.FoundationR3Url + "/SrvyTask/CancelSurveyTaskBySurveyTaskId";
    public static GetSurveyorNameBySurveyorId = environment.FoundationR3Url + "/SrvyTask/GetSurveyorNameBySurveyorId";
    public static GetListSrvyTaskBySrvyOrderIdForView = environment.FoundationR3Url + "/SrvyTask/GetListSrvyTaskBySrvyOrderIdForView";
    public static GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview = environment.FoundationR3Url + "/SrvyTask/GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview";
    public static ReviewSurveyResult = environment.FoundationR3Url + "/SrvyTask/ReviewSurveyResult";

    // SURVEY ORDER
    public static GetSrvyOrderBySrvyOrderId = environment.FoundationR3Url + "/SrvyOrder/GetSrvyOrderBySrvyOrderId";
    public static GetSrvyOrderByTrxRefNoAndSrvySourceCode = environment.FoundationR3Url + "/SrvyOrder/GetSrvyOrderByTrxRefNoAndSrvySourceCode";
    public static GetListSryvObject = environment.FoundationR3Url + "/SrvyOrder/GetListSryvObject";
    public static SendSrvyOrder = environment.FoundationR3Url + "/SrvyOrder/SendSrvyOrder";

    // SURVEY FORM SCHM
    public static GetListAllSrvyFormSchm = environment.FoundationR3Url + "/SrvyFormSchm/GetListAllSrvyFormSchm";
    public static GetSrvyFormSchmBySrvyFormSchmId = environment.FoundationR3Url + "/SrvyFormSchm/GetSrvyFormSchmBySrvyFormSchmId";
    public static GetListKeyValueSrvyFormSchm = environment.FoundationR3Url + "/SrvyFormSchm/GetListKeyValueSrvyFormSchm";

    // REF FORM
    public static EditRefFormData = environment.FoundationR3Url + "/RefForm/EditRefForm";
    public static AddRefFormData = environment.FoundationR3Url + "/RefForm/AddRefForm";
    public static GetRefFormDataByRefFormId = environment.FoundationR3Url + "/RefForm/GetRefFormByRefFormId"
    public static DeleteRefFormData = "/RefForm/DeleteRefForm";

    // AUTH FORM
    public static AddListAuthForm = environment.FoundationR3Url + "/AuthForm/AddListAuthForm";
    public static GetListAuthFormByRefFormId = environment.FoundationR3Url + "/AuthForm/GetListAuthFormByRefFormId";
    public static DeleteAuthForm = "/AuthForm/DeleteAuthForm";
    public static GetListAuthFormByRefRoleId = environment.FoundationR3Url + "/AuthForm/GetListAuthFormByRefRoleId";

    // Workflow Engine
    public static ClaimTask = environment.FoundationR3Url + "/Workflow/ClaimTask";

    //SCORE CATEGORY SCHM H
    public static GetScoreCategorySchmHById = environment.FoundationR3Url + "/ScoreCategorySchmH/GetScoreCategorySchmHById";
    public static AddScoreCategorySchmH = environment.FoundationR3Url + "/ScoreCategorySchmH/AddScoreCategorySchmH";
    public static EditScoreCategorySchmH = environment.FoundationR3Url + "/ScoreCategorySchmH/EditScoreCategorySchmH";
    public static GetRefScoreCategoryTypeWithDetailById = environment.FoundationR3Url + "/ScoreCategorySchmH/GetScoreCategorySchmHWithDetailById";

    // REF SCORE CATEGORY
    public static AddRangeScoreCategorySchmD = environment.FoundationR3Url + "/ScoreCategorySchmD/AddRangeScoreCategorySchmD";

    // Authentication
    public static RequestNewPassword = environment.FoundationR3Url + "/Authenticate/RequestNewPassword";

    // INTEGRATION
    public static SendMasterDailyToRabbitMq = environment.FoundationR3Url + "/Integration/SendMasterDailyToRabbitMq";

    // UPDATE MASTER CUST
    public static GetCustDataForUpdateMasterCustDetail = environment.FoundationR3Url + "/UpdateMasterCust/GetCustDataForUpdateMasterCustDetail";
    public static GetCustAddrDataForUpdateMasterCustAddr = environment.FoundationR3Url + "/UpdateMasterCust/GetCustAddrDataForUpdateMasterCustAddr";
    public static GetCustFamilyDataForUpdateMasterCustFamily = environment.FoundationR3Url + "/UpdateMasterCust/GetCustFamilyDataForUpdateMasterCustFamily";
    public static GetCustEmergencyDataForUpdateMasterCustEmergency = environment.FoundationR3Url + "/UpdateMasterCust/GetCustEmergencyDataForUpdateMasterCustEmergency";
    public static GetCustJobDataForUpdateMasterCustJobData = environment.FoundationR3Url + "/UpdateMasterCust/GetCustJobDataForUpdateMasterCustJobData";
    public static GetCustFinDataForUpdateMasterCustFinData = environment.FoundationR3Url + "/UpdateMasterCust/GetCustFinDataForUpdateMasterCustFinData";
    public static GetCustCompanyDataForUpdateMasterCustCompany = environment.FoundationR3Url + "/UpdateMasterCust/GetCustCompanyDataForUpdateMasterCustCompany";
    public static GetShareholderForUpdateMasterCustCompanyShareholder = environment.FoundationR3Url + "/UpdateMasterCust/GetShareholderForUpdateMasterCustCompanyShareholder";
    public static GetContactInfoForUpdateMasterCustCompanyContactInfo = environment.FoundationR3Url + "/UpdateMasterCust/GetContactInfoForUpdateMasterCustCompanyContactInfo";
    public static GetFinDataForUpdateMasterCustCompanyFinData = environment.FoundationR3Url + "/UpdateMasterCust/GetFinDataForUpdateMasterCustCompanyFinData";
    public static GetLegalDocForUpdateMasterCustCompanyLegalDoc = environment.FoundationR3Url + "/UpdateMasterCust/GetLegalDocForUpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustomer = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustomer";
    public static UpdateMasterCustAddr = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustAddr";
    public static UpdateMasterCustFamily = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustFamily";
    public static UpdateMasterCustEmergency = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustEmergency";
    public static UpdateMasterCustJobData = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustJobData";
    public static UpdateMasterCustFinData = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustFinData";
    public static UpdateMasterCustCompanyDetail = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustCompanyDetail";
    public static UpdateMasterCustCompanyShareholder = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustCompanyShareholder";
    public static UpdateMasterCustCompanyLegalDoc = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustCompanyLegalDoc";
    public static UpdateMasterCustCompanyContactInfo = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustCompanyContactInfo";
    public static UpdateMasterCustCompanyFinData = environment.FoundationR3Url + "/UpdateMasterCust/UpdateMasterCustCompanyFinData";
    
    // Payment Allocation
    public static GetListKeyValueRefPaymentAllocActive = environment.FoundationR3Url + "/RefPaymentAlloc/GetListKeyValueRefPaymentAllocActive";
    public static GetRefPaymentAllocByID = environment.FoundationR3Url + "/RefPaymentAlloc/GetRefPaymentAllocById";
    public static GetListKeyValueRefPaymentAllocByPayAllocGrpCode  = environment.FoundationR3Url +  "/RefPaymentAlloc/GetListKeyValueRefPaymentAllocByPayAllocGrpCode";
    public static SubmitRefPaymentAlloc = environment.FoundationR3Url + "/RefPaymentAlloc/SubmitRefPaymentAlloc";

    // REF PAYMENT ALLOC GRP
    public static GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate = environment.FoundationR3Url + "/RefPaymentAllocGrp/GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate";
    public static AddRefPaymentAllocGrp = environment.FoundationR3Url + "/RefPaymentAllocGrp/AddRefPaymentAllocGrp";
    public static EditRefPaymentAllocGrp = environment.FoundationR3Url + "/RefPaymentAllocGrp/EditRefPaymentAllocGrp";
    
    // COA
    public static GetRefCoaByRefCoaId = environment.FoundationR3Url + "/Coa/GetRefCoaByRefCoaId";
    public static SubmitCoa = environment.FoundationR3Url + "/Coa/SubmitCoa";
    public static SubmitListCoa = environment.FoundationR3Url + "/Coa/SubmitListCoa";
    public static GetListRefCoaByCoaSchmId = environment.FoundationR3Url + "/Coa/GetListRefCoaByCoaSchmId";

    // COA Scheme
    public static GetCoaSchmByCoaSchmId = environment.FoundationR3Url + "/CoaSchm/GetCoaSchmByCoaSchmId";
    public static SubmitCoaSchm = environment.FoundationR3Url + "/CoaSchm/SubmitCoaSchm";
    public static GetListCoaSchm = environment.FoundationR3Url + "/CoaSchm/GetListCoaSchm";
    

    // View Cabinet, Rack, FIling
    public static GetListRackByCabinetCode = environment.FoundationR3Url + "/ViewDocument/GetListRackByCabinetCode";
    public static GetCabinetByCabinetCode = environment.FoundationR3Url + "/ViewDocument/GetCabinetByCabinetCode";

    public static GetListFilingByRackCode = environment.FoundationR3Url + "/ViewDocument/GetListFilingByRackCode";
    public static GetRackByRackCode = environment.FoundationR3Url + "/ViewDocument/GetRackByRackCode";

    public static GetRackAndListFilingByRackCode = environment.FoundationR3Url + "/DocManagement/GetRackAndListFilingByRackCode";
    public static GetRackAndListFilingByFilingCode = environment.FoundationR3Url + "/DocManagement/GetRackAndListFilingByFilingCode";
    public static GetCabinetAndListRackByCabinetCode = environment.FoundationR3Url + "/DocManagement/GetCabinetAndListRackByCabinetCode";
    public static GetRackByCode = environment.FoundationR3Url + "/DocManagement/GetRackByCode";

    //Auction Company
    public static AddAuctionCompany = environment.FoundationR3Url + "/AuctionCompany/AddAuctionCompany";
    public static EditAuctionCompany = environment.FoundationR3Url + "/AuctionCompany/EditAuctionCompany";
    public static GetVendorByIdForEdit = environment.FoundationR3Url + "/AuctionCompany/GetVendorByIdForEdit";
    
    // Cust Exposure
    public static GetCustExpsrInfoByCustId = environment.FoundationR3Url + "/CustExpsrInfo/GetCustExpsrInfoByCustId";
    public static RequestExposure = environment.FoundationR3Url + "/CustExpsrInfo/RequestExposure";
    public static GetListCustExpsrBucketByCustExpsrDId = environment.FoundationR3Url + "/CustExpsrInfo/GetListCustExpsrBucketByCustExpsrDId";
    public static GetListCustExpsrAppAgrHistByCustExpsrHId = environment.FoundationR3Url + "/CustExpsrInfo/GetListCustExpsrAppAgrHistByCustExpsrHId";

    //OTP
    public static SendOtp = environment.FoundationR3Url + "/Authenticate/SendOtp";
    public static ConfirmOtp = environment.FoundationR3Url + "/Authenticate/ConfirmOtp";
    public static GetOtpProperties = environment.FoundationR3Url + "/Authenticate/GetOtpProperties";
    
    // OFFICE BANK ACCOUNT
    public static DeleteOfficeBankAcc = "/OfficeBankAcc/DeleteOfficeBankAcc";
    public static GetListActiveBankName = environment.FoundationR3Url + "/RefBank/GetListKeyValueActiveById";
    public static GetListBankAccType = environment.FoundationR3Url + "/OfficeBankAcc/GetListBankAccType";
    public static GetListKvpActiveRefCurr = environment.FoundationR3Url + "/RefCurr/GetListKvpActiveRefCurr";
    public static GetOfficeBankAccByOfficeBankAccId = environment.FoundationR3Url + "/OfficeBankAcc/GetOfficeBankAccByOfficeBankAccId";
    public static SubmitOfficeBankAcc = environment.FoundationR3Url + "/OfficeBankAcc/SubmitOfficeBankAcc";
    public static AddOfficeBankAcc = environment.FoundationR3Url + "/OfficeBankAcc/AddOfficeBankAcc";
    public static EditOfficeBankAcc = environment.FoundationR3Url + "/OfficeBankAcc/EditOfficeBankAcc";
    public static EditDetailOfficeBankAcc = environment.FoundationR3Url + "/OfficeBankAcc/EditDetailOfficeBankAcc";

    //SYS CONFIG
    public static GetSysConfigPncplResultByCode = environment.FoundationR3Url + "/SysConfigResult/GetSysConfigPncplResultByCode";

    // GENERIC
    public static GetJournalResultPagingObjectBySQL = "/Generic/GetJournalResultPagingObjectBySQL";

    // JOURNAL
    public static RerunJournal = "/Journal/RerunJournal";
    public static DownloadJournalFile = environment.FoundationR3Url +"/Journal/DownloadJournalFile";
}