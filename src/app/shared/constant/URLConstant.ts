import * as _urlConstant from "../../../assets/urlConstant.json";
import * as _environment from "../../../assets/config/enviConfig.json";

const urlConstant = _urlConstant;
export class URLConstant {
    public static get env() {
        const _env = JSON.parse(localStorage.getItem('envi'));
        return _env || _environment;
    }

    // SYS CONFIG RESULT
    public static GetSysConfigResultByCode = this.env.FoundationR3Url + urlConstant.GetSysConfigResultByCode;

    // WEB SOCKET
    public static WebSocketUrl = this.env.WebSocketURL + urlConstant.Notificationhub;

    //GENERAL SETTING
    public static AddGeneralSetting = this.env.FoundationR3Url + urlConstant.AddGeneralSetting;
    public static EditGeneralSetting = this.env.FoundationR3Url + urlConstant.EditGeneralSetting;
    public static GetGeneralSettingById = this.env.FoundationR3Url + urlConstant.GetGeneralSettingById;
    public static GetGeneralSettingValue = urlConstant.GetGeneralSettingValue;
    public static GetGeneralSettingByCode = this.env.FoundationR3Url + urlConstant.GetGeneralSettingByCode;
    public static GetGeneralSettingValueByCode = this.env.FoundationR3Url + urlConstant.GetGeneralSettingValueByCode;
    public static GetListGeneralSettingByListGsCode = this.env.FoundationR3Url + urlConstant.GetListGeneralSettingByListGsCode;

    //REF OFFICE
    public static GetRefOfficeByOfficeCode = this.env.FoundationR3Url + urlConstant.GetRefOfficeByOfficeCode;
    public static GetListKvpActiveRefOfficeForPaging = this.env.FoundationR3Url + urlConstant.GetListKvpActiveRefOfficeForPaging;
    public static GetRefOfficeObj = this.env.FoundationR3Url + urlConstant.GetRefOfficeObj;
    public static GetRefOfficeByRefOfficeId = this.env.FoundationR3Url + urlConstant.GetRefOfficeByRefOfficeId;
    public static GetAllRefOffice = this.env.FoundationR3Url + urlConstant.GetAllRefOffice;
    public static AddRefOffice = this.env.FoundationR3Url + urlConstant.AddRefOffice;
    public static AddRefOfficeV2 = this.env.FoundationR3Url + urlConstant.AddRefOfficeV2;
    public static AddRefOfficeV2_1 = this.env.FoundationR3Url + urlConstant.AddRefOfficeV2_1;
    public static AddRefOfficeAreaMember = this.env.FoundationR3Url + urlConstant.AddRefOfficeAreaMember;
    public static UpdateRefOfficeAreaId = this.env.FoundationR3Url + urlConstant.UpdateRefOfficeAreaId;
    public static EditRefOffice = this.env.FoundationR3Url + urlConstant.EditRefOffice;
    public static EditRefOfficeV2 = this.env.FoundationR3Url + urlConstant.EditRefOfficeV2;
    public static EditRefOfficeV2_1 = this.env.FoundationR3Url + urlConstant.EditRefOfficeV2_1;
    public static GetCenterGrpByCenterGrpTypeCode = urlConstant.GetCenterGrpByCenterGrpTypeCode;
    public static GetListOfficeCenterGrp = urlConstant.GetListOfficeCenterGrp;
    public static AddCenterGroupOfficeMember = urlConstant.AddCenterGroupOfficeMember;
    public static AddCenterGrpOfficeMember = this.env.FoundationR3Url + urlConstant.AddCenterGrpOfficeMember;
    public static GetListCenterGrpMemberByRefOfficeId = this.env.FoundationR3Url + urlConstant.GetListCenterGrpMemberByRefOfficeId
    public static DeleteCenterGrpOfficeMember = this.env.FoundationR3Url + urlConstant.DeleteCenterGrpOfficeMember;
    public static GetListActiveRefOffice = urlConstant.GetListActiveRefOffice;
    public static GetListRefOfficeByRefOfficeAreaId = this.env.FoundationR3Url + urlConstant.GetListRefOfficeByRefOfficeAreaId;
    public static GetListKvpActiveRefOffice = this.env.FoundationR3Url + urlConstant.GetListKvpActiveRefOffice;
    public static GetRefOfficeDetailByRefOfficeId = this.env.FoundationR3Url + urlConstant.GetRefOfficeDetailByRefOfficeId

    //CENTER GROUP
    public static GetCenterGrpByCode = this.env.FoundationR3Url + urlConstant.GetCenterGrpByCode;
    public static GetCenterGrpById = this.env.FoundationR3Url + urlConstant.GetCenterGrpById;

    //REF OFFICE AREA
    public static GetAllListArea = this.env.FoundationR3Url + urlConstant.GetAllListArea;
    public static GetRefOfficeAreaPaging = this.env.FoundationR3Url + urlConstant.GetRefOfficeAreaPaging;
    public static GetRefArea = this.env.FoundationR3Url + urlConstant.GetRefArea;
    public static GetRefOfficeAreaByRefOfficeAreaId = this.env.FoundationR3Url + urlConstant.GetRefOfficeAreaByRefOfficeAreaId;
    public static AddRefOfficeArea = this.env.FoundationR3Url + urlConstant.AddRefOfficeArea;
    public static EditRefOfficeArea = this.env.FoundationR3Url + urlConstant.EditRefOfficeArea;
    public static CheckDuplAreaCode = this.env.FoundationR3Url + urlConstant.CheckDuplAreaCode;

    //ORGANIZATION
    public static GetRefOrg = this.env.FoundationR3Url + urlConstant.GetRefOrg;
    public static EditRefOrgWithOldParentId = this.env.FoundationR3Url + urlConstant.EditRefOrgWithOldParentId;
    public static EditRefOrg = this.env.FoundationR3Url + urlConstant.EditRefOrg;
    public static DeleteRefOrg = urlConstant.DeleteRefOrg;
    public static GetListAllRefOrg = this.env.FoundationR3Url + urlConstant.GetListAllRefOrg;
    public static AddRefOrg = this.env.FoundationR3Url + urlConstant.AddRefOrg;
    public static GetRefOrgPaging = this.env.FoundationR3Url + urlConstant.GetRefOrgPaging;
    public static GetAllRefBizUnit = this.env.FoundationR3Url + urlConstant.GetAllRefBizUnit;
    public static GetOrgJobTitleByMdlStruc = this.env.FoundationR3Url + urlConstant.GetOrgJobTitleByMdlStruc;
    public static GetRefBizUnitByOffice = this.env.FoundationR3Url + urlConstant.GetRefBizUnitByOffice;
    public static GetAllOrgMdl = this.env.FoundationR3Url + urlConstant.GetAllOrgMdl;
    public static GetAllActiveOrgMdlByRefOrgId = this.env.FoundationR3Url + urlConstant.GetAllActiveOrgMdlByRefOrgId;
    public static GetOrgMdlPaging = this.env.FoundationR3Url + urlConstant.GetOrgMdlPaging;
    public static DeleteOrgMdl = this.env.FoundationR3Url + urlConstant.DeleteOrgMdl;
    public static EditOrgMdl = this.env.FoundationR3Url + urlConstant.EditOrgMdl;
    public static AddOrgMdl = this.env.FoundationR3Url + urlConstant.AddOrgMdl;
    public static GetOrgMdl = this.env.FoundationR3Url + urlConstant.GetOrgMdl;
    public static GetOrgMdlByOrgMdlId = this.env.FoundationR3Url + urlConstant.GetOrgMdlByOrgMdlId;
    public static GetAllRefBizUnitKeyValuePair = this.env.FoundationR3Url + urlConstant.GetAllRefBizUnitKeyValuePair;
    public static DeleteOrgMdlStruc = this.env.FoundationR3Url + urlConstant.DeleteOrgMdlStruc;
    public static AddOrgMdlStruc = this.env.FoundationR3Url + urlConstant.AddOrgMdlStruc;
    public static EditOrgMdlStruc = this.env.FoundationR3Url + urlConstant.EditOrgMdlStruc;
    public static GetOrgMdlStruc = this.env.FoundationR3Url + urlConstant.GetOrgMdlStruc;
    public static GetOrgMdlStrucPaging = this.env.FoundationR3Url + urlConstant.GetOrgMdlStrucPaging;
    public static GetOrgMdlStrucById = this.env.FoundationR3Url + urlConstant.GetOrgMdlStrucById;

    //REF-JOB-TITLE
    public static GetRefJobTitle = this.env.FoundationR3Url + urlConstant.GetRefJobTitle;
    public static AddRefJobTitle = this.env.FoundationR3Url + urlConstant.AddRefJobTitle;
    public static EditRefJobTitle = this.env.FoundationR3Url + urlConstant.EditRefJobTitle;
    public static GetJobPositionLvl = this.env.FoundationR3Url + urlConstant.GetJobPositionLvl;
    public static GetRefJobTitleById = this.env.FoundationR3Url + urlConstant.GetRefJobTitleById;

    //ORG JOB TITLE
    public static GetOrgJobTitlePaging = this.env.FoundationR3Url + urlConstant.GetOrgJobTitlePaging;
    public static AddOrgJobTitle = this.env.FoundationR3Url + urlConstant.AddOrgJobTitle;
    public static EditOrgJobTitle = this.env.FoundationR3Url + urlConstant.EditOrgJobTitle;
    public static DeleteOrgJobTitle = this.env.FoundationR3Url + urlConstant.DeleteOrgJobTitle;
    public static GetOrgJobTitleByOrgJobTitleId = this.env.FoundationR3Url + urlConstant.GetOrgJobTitleByOrgJobTitleId;

    //REF-BANK
    public static GetBankPaging = this.env.FoundationR3Url + urlConstant.GetBankPaging;
    public static GetBank = this.env.FoundationR3Url + urlConstant.GetBank;
    public static GetRefBankByRefBankIdAsync = this.env.FoundationR3Url + urlConstant.GetRefBankByRefBankIdAsync;
    public static GetRefBankByBankCodeAsync = this.env.FoundationR3Url + urlConstant.GetRefBankByBankCodeAsync;
    public static GetRefBankByRefBankCodeAsync = this.env.FoundationR3Url + urlConstant.GetRefBankByRefBankCodeAsync;
    public static EditRefBank = this.env.FoundationR3Url + urlConstant.EditRefBank;
    public static AddRefBank = this.env.FoundationR3Url + urlConstant.AddRefBank;
    public static AddRefBankAsync = this.env.FoundationR3Url + urlConstant.AddRefBankAsync;
    public static DeleteRefBank = this.env.FoundationR3Url + urlConstant.DeleteRefBank;
    public static GetBankByBankCode = this.env.FoundationR3Url + urlConstant.GetBankByBankCode;

    //LBPPMS-CNTRPRT
    public static GetLbppmsCntrprtByLbppmsCntrprtCode = this.env.FoundationR3Url + urlConstant.GetLbppmsCntrprtByLbppmsCntrprtCode;

    //REF-EMP
    public static GetEmpNameByRefUserId = this.env.FoundationR3Url + urlConstant.GetEmpNameByRefUserId;
    public static GetListEmployee = this.env.FoundationR3Url + urlConstant.GetListEmployee;
    public static GetRefEmployeeById = this.env.FoundationR3Url + urlConstant.GetRefEmployeeById;
    public static AddRefEmp = this.env.FoundationR3Url + urlConstant.AddRefEmp;
    public static EditRefEmp = this.env.FoundationR3Url + urlConstant.EditRefEmp;
    public static GetEmpBankAccByRefEmpId = this.env.FoundationR3Url + urlConstant.GetEmpBankAccByRefEmpId;
    public static AddRefEmpAndEmpBankAcc = this.env.FoundationR3Url + urlConstant.AddRefEmpAndEmpBankAcc;
    public static EditRefEmpAndEmpBankAcc = this.env.FoundationR3Url + urlConstant.EditRefEmpAndEmpBankAcc;
    public static DeleteRefEmpAndEmpBankAcc = this.env.FoundationR3Url + urlConstant.DeleteRefEmpAndEmpBankAcc;
    public static GetListEmployeebyRefEmpId = this.env.FoundationR3Url + urlConstant.GetListEmployeebyRefEmpId;
    public static GetEmpListByOfficeIdAndIsActive = this.env.FoundationR3Url + urlConstant.GetEmpListByOfficeIdAndIsActive;
    public static GetEmpForUpdateById = this.env.FoundationR3Url + urlConstant.GetEmpForUpdateById;

    //EMP_POSITION
    public static GetEmpPositionPaging = this.env.FoundationR3Url + urlConstant.GetEmpPositionPaging;
    public static GetEmpByEmpPositionId = this.env.FoundationR3Url + urlConstant.GetEmpByEmpPositionId;
    public static AddEmpPosition = this.env.FoundationR3Url + urlConstant.AddEmpPosition;
    public static EditEmpPosition = this.env.FoundationR3Url + urlConstant.EditEmpPosition;
    public static DeleteEmpPosition = this.env.FoundationR3Url + urlConstant.DeleteEmpPosition;
    public static GetListUserEmployee = this.env.FoundationR3Url + urlConstant.GetListUserEmployee;

    //REF-USER
    public static GetRefUserPaging = this.env.FoundationR3Url + urlConstant.GetRefUserPaging;
    public static EditRefUserForRefEmpR3 = this.env.FoundationR3Url + urlConstant.EditRefUserForRefEmpR3;
    public static ChangePassword = this.env.FoundationR3Url + urlConstant.ChangePassword;
    public static GetRefUser = this.env.FoundationR3Url + urlConstant.GetRefUser;
    public static GetUserByUsername = this.env.FoundationR3Url + urlConstant.GetUserByUsername;
    public static ValidatePwd = this.env.FoundationR3Url + urlConstant.ValidatePwd;
    public static GetCountRefUserByRefEmpId = this.env.FoundationR3Url + urlConstant.GetCountRefUserByRefEmpId;
    public static ResetPassword = this.env.FoundationR3Url + urlConstant.ResetPassword;
    public static GetRefUserById = this.env.FoundationR3Url + urlConstant.GetRefUserById;
    public static GetUserEmpByUsername = this.env.FoundationR3Url + urlConstant.GetUserEmpByUsername;
    public static GetRefUserByRefEmpId = this.env.FoundationR3Url + urlConstant.GetRefUserByRefEmpId;
    public static AddRefUserRole = this.env.FoundationR3Url + urlConstant.AddRefUserRole;
    public static EditRefUserRole = this.env.FoundationR3Url + urlConstant.EditRefUserRole;
    public static GetRefUserRoleById = this.env.FoundationR3Url + urlConstant.GetRefUserRoleById;
    public static ChangePasswordRefUserByUsername = this.env.FoundationR3Url + urlConstant.ChangePasswordRefUserByUsername;
    public static DeleteRefUserRole = urlConstant.DeleteRefUserRole;
    public static GetRefUserByResetCode = this.env.FoundationR3Url + urlConstant.GetRefUserByResetCode;
    public static ResetPasswordByUsername = this.env.FoundationR3Url + urlConstant.ResetPasswordByUsername;
    public static ResetPasswordByUsernameV3_1 = this.env.FoundationR3Url + urlConstant.ResetPasswordByUsernameV3_1;

    //REF-ROLE
    public static GetRefRolePaging = this.env.FoundationR3Url + urlConstant.GetRefRolePaging;
    public static AddRefRole = this.env.FoundationR3Url + urlConstant.AddRefRole;
    public static AddRefRoleV2 = this.env.FoundationR3Url + urlConstant.AddRefRoleV2;
    public static EditRefRole = this.env.FoundationR3Url + urlConstant.EditRefRole;
    public static DeleteRefRole = this.env.FoundationR3Url + urlConstant.DeleteRefRole;
    public static GetRefRoleByRefRoleId = this.env.FoundationR3Url + urlConstant.GetRefRoleByRefRoleId;
    public static GetRefRoleByCode = this.env.FoundationR3Url + urlConstant.GetRefRoleByCode;
    public static GetActiveRefRoleByRefRoleId = urlConstant.GetActiveRefRoleByRefRoleId;
    public static GetRefRole = this.env.FoundationR3Url + urlConstant.GetRefRole;
    public static GetListDataCurrentUser = urlConstant.GetListDataCurrentUser;
    public static GetRefRoleByEmpPositionId = urlConstant.GetRefRoleByEmpPositionId;
    public static EditUserTitleRole = this.env.FoundationR3Url + urlConstant.EditUserTitleRole;
    public static AddUserTitleRole = this.env.FoundationR3Url + urlConstant.AddUserTitleRole;
    public static AssignRoleToUsers = this.env.FoundationR3Url + urlConstant.AssignRoleToUsers;
    public static GetUserTitleRoleByEmpPositionIdAndRefRoleId = urlConstant.GetUserTitleRoleByEmpPositionIdAndRefRoleId;
    public static GetListActiveRefRole = this.env.FoundationR3Url + urlConstant.GetListActiveRefRole;

    //REF FEE
    public static AddRefFee = this.env.FoundationR3Url + urlConstant.AddRefFee;
    public static EditRefFee = this.env.FoundationR3Url + urlConstant.EditRefFee;
    public static GetRefFeeByRefFeeId = this.env.FoundationR3Url + urlConstant.GetRefFeeByRefFeeId;

    //REF LOB
    public static GetListRefLob = this.env.FoundationR3Url + urlConstant.GetListRefLob;
    public static GetListBizTemplateCodeByRefFeeId = this.env.FoundationR3Url + urlConstant.GetListBizTemplateCodeByRefFeeId;
    public static GetListBizTmpltCode = this.env.FoundationR3Url + urlConstant.GetListBizTmpltCode;

    //SURVEYOR
    public static AddSurveyor = this.env.FoundationR3Url + urlConstant.AddSurveyor;
    public static EditSurveyor = this.env.FoundationR3Url + urlConstant.EditSurveyor;
    public static GetSurveyorBySurveyorId = this.env.FoundationR3Url + urlConstant.GetSurveyorBySurveyorId;


    //ZIPCODE
    public static GetRefZipcodePaging = this.env.FoundationR3Url + urlConstant.GetRefZipcodePaging;
    public static GetRefZipCode = this.env.FoundationR3Url + urlConstant.GetRefZipCode;
    public static GetRefProvDistrictObj = this.env.FoundationR3Url + urlConstant.GetRefProvDistrictObj;
    public static EditRefZipcode = this.env.FoundationR3Url + urlConstant.EditRefZipcode;
    public static EditRefZipcodeV2 = this.env.FoundationR3Url + urlConstant.EditRefZipcodeV2;
    public static AddRefZipcode = this.env.FoundationR3Url + urlConstant.AddRefZipcode;
    public static AddRefZipcodeV2 = this.env.FoundationR3Url + urlConstant.AddRefZipcodeV2;
    public static GetOfficeZipcodeMemberAddPaging = this.env.FoundationR3Url + urlConstant.GetOfficeZipcodeMemberAddPaging;
    public static GetRefZipCodeById = this.env.FoundationR3Url + urlConstant.GetRefZipCodeById;
    public static GetZipcodeDataByZipCode = this.env.FoundationR3Url + urlConstant.GetZipcodeDataByZipCode;

    //OFFICE ZIPCODE MEMBER
    public static GetOfficeZipCodeMemberPaging = this.env.FoundationR3Url + urlConstant.GetOfficeZipCodeMemberPaging;
    public static GetRefOfficeZipcodePaging = this.env.FoundationR3Url + urlConstant.GetRefOfficeZipcodePaging;
    public static AddOfficeZipcodeMember = this.env.FoundationR3Url + urlConstant.AddOfficeZipcodeMember;
    public static DeleteOfficeZipcodeMember = this.env.FoundationR3Url + urlConstant.DeleteOfficeZipcodeMember;

    //BUSINESS UNIT
    public static GetBusinessUnitPaging = this.env.FoundationR3Url + urlConstant.GetBusinessUnitPaging;
    public static GetRefBizUnit = this.env.FoundationR3Url + urlConstant.GetRefBizUnit;
    public static AddRefBizUnit = this.env.FoundationR3Url + urlConstant.AddRefBizUnit;
    public static EditRefBizUnit = this.env.FoundationR3Url + urlConstant.EditRefBizUnit;
    public static DeleteRefBizUnit = urlConstant.DeleteRefBizUnit;

    //REF COY
    public static GetRefCoyPaging = this.env.FoundationR3Url + urlConstant.GetRefCoyPaging;
    public static GetRefCoy = this.env.FoundationR3Url + urlConstant.GetRefCoy;
    public static EditRefCoy = this.env.FoundationR3Url + urlConstant.EditRefCoy;
    public static GetCoyBodPaging = this.env.FoundationR3Url + urlConstant.GetCoyBodPaging;
    public static AddCoyBod = this.env.FoundationR3Url + urlConstant.AddCoyBod;
    public static EditCoyBod = this.env.FoundationR3Url + urlConstant.EditCoyBod;
    public static DeleteCoyBod = urlConstant.DeleteCoyBod;
    public static GetCoyBod = this.env.FoundationR3Url + urlConstant.GetCoyBod;
    public static GetCommissionerPaging = this.env.FoundationR3Url + urlConstant.GetCommissionerPaging;
    public static AddCoyCommissioner = this.env.FoundationR3Url + urlConstant.AddCoyCommissioner;
    public static EditCoyCommissioner = this.env.FoundationR3Url + urlConstant.EditCoyCommissioner;
    public static DeleteCoyCommissioner = urlConstant.DeleteCoyCommissioner;
    public static GetCoyCommissioner = this.env.FoundationR3Url + urlConstant.GetCoyCommissioner;

    //REF MASTER
    public static GetRefMasterList = this.env.FoundationR3Url + urlConstant.GetRefMasterList;
    public static GetRefMastersByCriteria = this.env.FoundationR3Url + urlConstant.GetRefMastersByCriteria;
    public static GetRefMaster = this.env.FoundationR3Url + urlConstant.GetRefMaster;
    public static GetRefMasterListByTypeCode = this.env.FoundationR3Url + urlConstant.GetRefMasterListByTypeCode;
    public static GetRefMasterListKeyValuePair = this.env.FoundationR3Url + urlConstant.GetRefMasterListKeyValuePair;
    public static AddRefMaster = this.env.FoundationR3Url + urlConstant.AddRefMaster;
    public static EditRefMaster = this.env.FoundationR3Url + urlConstant.EditRefMaster;
    public static GetRefMasterType = this.env.FoundationR3Url + urlConstant.GetRefMasterType;
    public static GetRefMasterTypeKeyValueUserSetting = urlConstant.GetRefMasterTypeKeyValueUserSetting;
    public static GetRefMasterPaging = this.env.FoundationR3Url + urlConstant.GetRefMasterPaging;
    public static GetRefMasterListDesc = this.env.FoundationR3Url + urlConstant.GetRefMasterListDesc;
    public static GetRefMasterListKeyValueActiveByCode = this.env.FoundationR3Url + urlConstant.GetRefMasterListKeyValueActiveByCode;
    public static GetListKeyValueActiveByCodeOrderBySeqNo = this.env.FoundationR3Url + urlConstant.GetListKeyValueActiveByCodeOrderBySeqNo;
    public static GetListActiveRefMasterType = this.env.FoundationR3Url + urlConstant.GetListActiveRefMasterType;
    public static GetListActiveRefMasterTypeForDdl = urlConstant.GetListActiveRefMasterTypeForDdl;
    public static GetRefMasterByRefMasterId = this.env.FoundationR3Url + urlConstant.GetRefMasterByRefMasterId;
    public static GetListActiveRefMaster = this.env.FoundationR3Url + urlConstant.GetListActiveRefMaster;
    public static GetListActiveRefMasterByRefMasterTypeCodeAndMasterCode = this.env.FoundationR3Url + urlConstant.GetListActiveRefMasterByRefMasterTypeCodeAndMasterCode;
    public static GetRefMasterByMasterCode = this.env.FoundationR3Url + urlConstant.GetRefMasterByMasterCode;
    public static GetListActiveRefMasterWithMappingCodeAll = this.env.FoundationR3Url + urlConstant.GetListActiveRefMasterWithMappingCodeAll;
    public static GetListActiveRefMasterByRefMasterTypeCode = this.env.FoundationR3Url + urlConstant.GetListActiveRefMasterByRefMasterTypeCode;
    public static GetRefMasterByRefMasterTypeCodeAndMasterCode = this.env.FoundationR3Url + urlConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode;
    public static GetKvpRefMasterByRefMasterTypeCodeAndMasterCode = this.env.FoundationR3Url + urlConstant.GetKvpRefMasterByRefMasterTypeCodeAndMasterCode;
    public static GetRefMasterByRefMasterTypeCode = this.env.FoundationR3Url + urlConstant.GetRefMasterByRefMasterTypeCode;
    public static GetListActiveRefMasterDDL = urlConstant.GetListActiveRefMasterDDL;
    public static GetListActiveRefMasterOrderSeqNoDDL = urlConstant.GetListActiveRefMasterOrderSeqNoDDL;
    public static GetListKeyValueActiveByCodeOrderBySeqNoDDL = urlConstant.GetListKeyValueActiveByCodeOrderBySeqNoDDL;

    public static GetListActiveRefMasterDetail = this.env.FoundationR3Url + urlConstant.GetListActiveRefMasterDetail;

    //REF COUNTRY
    public static GetListRefCountry = this.env.FoundationR3Url + urlConstant.GetListRefCountry;
    public static GetRefCountryByCountryCode = this.env.FoundationR3Url + urlConstant.GetRefCountryByCountryCode;

    //REF INDUSTRY TYPE
    public static GetRefIndustryTypeById = this.env.FoundationR3Url + urlConstant.GetRefIndustryTypeById;
    public static AddRefIndustryType = this.env.FoundationR3Url + urlConstant.AddRefIndustryType;
    public static EditRefIndustryType = this.env.FoundationR3Url + urlConstant.EditRefIndustryType;
    public static DeleteRefIndustryType = this.env.FoundationR3Url + urlConstant.DeleteRefIndustryType;
    public static GetRefIndustryTypeByIndustryTypeCode = this.env.FoundationR3Url + urlConstant.GetRefIndustryTypeByIndustryTypeCode;

    //REF PROV DISTRICT
    public static GetRefProvDistrictPaging = this.env.FoundationR3Url + urlConstant.GetRefProvDistrictPaging;

    //MENU
    public static GetRefFormPaging = this.env.FoundationR3Url + urlConstant.GetRefFormPaging;
    public static GetAllActiveRefFormByRefRoleId = this.env.FoundationR3Url + urlConstant.GetAllActiveRefFormByRefRoleId;
    public static GetRefFormByRefFormId = this.env.FoundationR3Url + urlConstant.GetRefFormByRefFormId;
    public static EditRefForm = this.env.FoundationR3Url + urlConstant.EditRefForm;
    public static AddRefForm = this.env.FoundationR3Url + urlConstant.AddRefForm;
    public static DeleteRefForm = this.env.FoundationR3Url + urlConstant.DeleteRefForm;
    public static AssignRoleToForms = this.env.FoundationR3Url + urlConstant.AssignRoleToForms;
    public static GetAllAuthFormsByRefRoleId = this.env.FoundationR3Url + urlConstant.GetAllAuthFormsByRefRoleId;
    public static GetAuthByRefFormIdAndRefRoleId = this.env.FoundationR3Url + urlConstant.GetAuthByRefFormIdAndRefRoleId;
    public static UpdateFormFeatureAuthForm = this.env.FoundationR3Url + urlConstant.UpdateFormFeatureAuthForm;
    public static GetAllActiveRefFormAndPathExist = this.env.FoundationR3Url + urlConstant.GetAllActiveRefFormAndPathExist;
    public static GetAllActiveRefForm = this.env.FoundationR3Url + urlConstant.GetAllActiveRefForm;
    public static LoginByRole = this.env.FoundationR3Url + urlConstant.LoginByRole;
    public static LoginByRoleV2 = this.env.FoundationR3Url + urlConstant.LoginByRoleV2;
    public static LoginByToken = this.env.FoundationR3Url + urlConstant.LoginByToken;
    public static LoginByTokenV2 = this.env.FoundationR3Url + urlConstant.LoginByTokenV2;
    public static UpdateToken = this.env.FoundationR3Url + urlConstant.UpdateToken;
    public static UpdateTokenV2 = this.env.FoundationR3Url + urlConstant.UpdateTokenV2;
    public static UpdateTokenV2_1 = this.env.FoundationR3Url + urlConstant.UpdateTokenV2_1;

    //FORM FEATURE
    public static GetListRefFeature = this.env.FoundationR3Url + urlConstant.GetListRefFeature;
    public static GetRefFeatureByComponent = this.env.FoundationR3Url + urlConstant.GetRefFeatureByComponent;

    //HOLIDAY
    public static GetAllActiveHolidaySchmH = this.env.FoundationR3Url + urlConstant.GetAllActiveHolidaySchmH;
    public static GetListActiveHolidaySchemeH = this.env.FoundationR3Url + urlConstant.GetListActiveHolidaySchemeH;
    public static GetHolidayPaging = this.env.FoundationR3Url + urlConstant.GetHolidayPaging;
    public static AddHolidaySchmH = this.env.FoundationR3Url + urlConstant.AddHolidaySchmH;
    public static AddHolidaySchmD = this.env.FoundationR3Url + urlConstant.AddHolidaySchmD;
    public static AddHolidaySchmDUntilYear = this.env.FoundationR3Url + urlConstant.AddHolidaySchmDUntilYear;
    public static GetHolidaySchmH = this.env.FoundationR3Url + urlConstant.GetHolidaySchmH;
    public static GetHolidaySchmHById = this.env.FoundationR3Url + urlConstant.GetHolidaySchmHById;
    public static GetHolidaySchmDById = this.env.FoundationR3Url + urlConstant.GetHolidaySchmDById;
    public static EditHolidaySchmHOnly = this.env.FoundationR3Url + urlConstant.EditHolidaySchmHOnly;
    public static EditHolidaySchmH = this.env.FoundationR3Url + urlConstant.EditHolidaySchmH;
    public static EditHolidaySchmD = this.env.FoundationR3Url + urlConstant.EditHolidaySchmD;
    public static DeleteHolidaySchmD = this.env.FoundationR3Url + urlConstant.DeleteHolidaySchmD;
    public static GetHolidayDetailPaging = this.env.FoundationR3Url + urlConstant.GetHolidayDetailPaging;
    public static CopyHolidaySchmH = this.env.FoundationR3Url + urlConstant.CopyHolidaySchmH;

    //NOTIFICATION
    public static SendNotificationRemainingPasswordExpirationDaysToUser = this.env.FoundationR3Url + urlConstant.SendNotificationRemainingPasswordExpirationDaysToUser;
    public static GetNotificationHByNotificationHId = this.env.FoundationR3Url + urlConstant.GetNotificationHByNotificationHId;
    public static GetListUsernameAndEmpNameByNotificationHId = this.env.FoundationR3Url + urlConstant.GetListUsernameAndEmpNameByNotificationHId;
    public static AddNotificationHAndD = this.env.FoundationR3Url + urlConstant.AddNotificationHAndD;
    public static EditNotificationH = this.env.FoundationR3Url + urlConstant.EditNotificationH;
    public static UpdateReadNotification = this.env.FoundationR3Url + urlConstant.UpdateReadNotification;
    public static GetListNotificationHByRefUserId = this.env.FoundationR3Url + urlConstant.GetListNotificationHByRefUserId;

    //REF CURR
    public static GetRefCurrPaging = this.env.FoundationR3Url + urlConstant.GetRefCurrPaging;
    public static AddRefCurr = this.env.FoundationR3Url + urlConstant.AddRefCurr;
    public static EditRefCurr = this.env.FoundationR3Url + urlConstant.EditRefCurr;
    public static GetRefCurrById = this.env.FoundationR3Url + urlConstant.GetRefCurrById;
    public static GetRefCurrByCode = this.env.FoundationR3Url + urlConstant.GetRefCurrByCode;
    public static GetListKvpActiveRefCurr = this.env.FoundationR3Url + urlConstant.GetListKvpActiveRefCurr;
    public static AddExchangeRate = this.env.FoundationR3Url + urlConstant.AddExchangeRate;

    //REF ECONOMIC SECTOR
    public static AddRefEconomicSector = this.env.FoundationR3Url + urlConstant.AddRefEconomicSector;
    public static EditRefEconomicSector = this.env.FoundationR3Url + urlConstant.EditRefEconomicSector;
    public static GetRefEconomicSectorById = this.env.FoundationR3Url + urlConstant.GetRefEconomicSectorById;

    //REF PROV DISTRICT
    public static AddRefProvDistrict = this.env.FoundationR3Url + urlConstant.AddRefProvDistrict;
    public static EditRefProvDistrict = this.env.FoundationR3Url + urlConstant.EditRefProvDistrict;
    public static GetRefProvDistrictById = this.env.FoundationR3Url + urlConstant.GetRefProvDistrictById;

    //ASSET MASTER
    public static AddAssetMaster = this.env.FoundationR3Url + urlConstant.AddAssetMaster;
    public static EditAssetMaster = this.env.FoundationR3Url + urlConstant.EditAssetMaster;
    public static GetAssetMasterById = this.env.FoundationR3Url + urlConstant.GetAssetMasterById;
    public static GetValueAssetType = this.env.FoundationR3Url + urlConstant.GetValueAssetType;
    public static GetListAssetCategory = this.env.FoundationR3Url + urlConstant.GetListAssetCategory;
    public static GetListAssetSchmH = this.env.FoundationR3Url + urlConstant.GetListAssetSchmH;
    public static GetListAssetMasterByAssetSchmHId = this.env.FoundationR3Url + urlConstant.GetListAssetMasterByAssetSchmHId;
    public static EditListAssetSchmDByAssetMasterId = this.env.FoundationR3Url + urlConstant.EditListAssetSchmDByAssetMasterId;
    public static GetUploadAssetMasterByUploadMonitoringNoAndTrxType = this.env.FoundationR3Url + urlConstant.GetUploadAssetMasterByUploadMonitoringNoAndTrxType;
    public static AddAssetMasterAttrContent = this.env.FoundationR3Url + urlConstant.AddAssetMasterAttrContent;
    public static GetAssetMasterAttrContentForAssetMaster = this.env.FoundationR3Url + urlConstant.GetAssetMasterAttrContentForAssetMaster;
    public static GetAssetMasterAttrContentForAssetMasterByAttrTypeCode = this.env.FoundationR3Url + urlConstant.GetAssetMasterAttrContentForAssetMasterByAttrTypeCode;

    //REF ATTR
    public static GetListActiveRefAttrType = this.env.FoundationR3Url + urlConstant.GetListActiveRefAttrType;
    public static GetRefAttrById = this.env.FoundationR3Url + urlConstant.GetRefAttrById;
    public static AddRefAttr = this.env.FoundationR3Url + urlConstant.AddRefAttr;
    public static EditRefAttr = this.env.FoundationR3Url + urlConstant.EditRefAttr;
    public static GetListActiveRefAttrByAttrGroup = this.env.FoundationR3Url + urlConstant.GetListActiveRefAttrByAttrGroup;
    public static GetListActiveRefAttrByListAttrGroup = this.env.FoundationR3Url + urlConstant.GetListActiveRefAttrByListAttrGroup;

    //REF PROFESSION
    public static AddRefProfession = this.env.FoundationR3Url + urlConstant.AddRefProfession;
    public static EditRefProfession = this.env.FoundationR3Url + urlConstant.EditRefProfession;
    public static DeleteRefProfession = urlConstant.DeleteRefProfession;
    public static GetRefProfessionById = this.env.FoundationR3Url + urlConstant.GetRefProfessionById;
    public static GetRefProfessionByProfessionCode = this.env.FoundationR3Url + urlConstant.GetRefProfessionByProfessionCode;
    public static GetRefProfessionByRefProfessionId = this.env.FoundationR3Url + urlConstant.GetRefProfessionByRefProfessionId;

    //REF REASON
    public static AddRefReason = this.env.FoundationR3Url + urlConstant.AddRefReason;
    public static EditRefReason = this.env.FoundationR3Url + urlConstant.EditRefReason;
    public static GetRefReasonById = this.env.FoundationR3Url + urlConstant.GetRefReasonById;

    //REF REASON TYPE
    public static GetValueReasonType = this.env.FoundationR3Url + urlConstant.GetValueReasonType;

    //WORKHOUR
    public static GetListActiveWorkingSchmH = this.env.FoundationR3Url + urlConstant.GetListActiveWorkingSchmH;
    public static GetWorkHourSchmHPaging = this.env.FoundationR3Url + urlConstant.GetWorkHourSchmHPaging;
    public static AddWorkingHourSchmH = this.env.FoundationR3Url + urlConstant.AddWorkingHourSchmH;
    public static AddListWorkingHourSchmD = this.env.FoundationR3Url + urlConstant.AddListWorkingHourSchmD;
    public static EditListWorkingHourSchmD = this.env.FoundationR3Url + urlConstant.EditListWorkingHourSchmD;
    public static EditWorkingHourSchmH = this.env.FoundationR3Url + urlConstant.EditWorkingHourSchmH;
    public static GetWorkingHourSchmH = this.env.FoundationR3Url + urlConstant.GetWorkingHourSchmH;
    public static GetWorkingHourSchmD = this.env.FoundationR3Url + urlConstant.GetWorkingHourSchmD;
    public static GetWorkingHourSchmHById = this.env.FoundationR3Url + urlConstant.GetWorkingHourSchmHById;
    public static GetListWorkingHourSchmDByWorkingHourHId = this.env.FoundationR3Url + urlConstant.GetListWorkingHourSchmDByWorkingHourHId;

    //QUEUE
    public static AddQueue = this.env.FoundationR3Url + urlConstant.AddQueue;

    //REF MODULE
    public static GetListRefModuleKeyValue = this.env.FoundationR3Url + urlConstant.GetListRefModuleKeyValue;
    public static GetListKeyValueByCode = this.env.FoundationR3Url + urlConstant.GetListKeyValueByCode;
    public static GetListKeyValueRefModuleById = this.env.FoundationR3Url + urlConstant.GetListKeyValueRefModuleById;

    //REF EMP LEAVE MANAGEMENT
    public static GetRefEmpLeaveMngmntPaging = this.env.FoundationR3Url + urlConstant.GetRefEmpLeaveMngmntPaging;
    public static DeleteRefEmpLeaveMngmnt = this.env.FoundationR3Url + urlConstant.DeleteRefEmpLeaveMngmnt;
    public static GetRefEmpLeaveMngmntById = this.env.FoundationR3Url + urlConstant.GetRefEmpLeaveMngmntById;
    public static EditRefEmpLeaveMngmnt = this.env.FoundationR3Url + urlConstant.EditRefEmpLeaveMngmnt;
    public static AddRefEmpLeaveMngmnt = this.env.FoundationR3Url + urlConstant.AddRefEmpLeaveMngmnt;

    //UPLOAD
    public static UploadReview = this.env.FoundationR3Url + urlConstant.UploadReview;
    public static UploadReviewV2 = this.env.FoundationR3Url + urlConstant.UploadReviewV2;
    public static UpdateUploadMonitoringHStatActivity = this.env.FoundationR3Url + urlConstant.UpdateUploadMonitoringHStatActivity;
    public static CancelUpload = this.env.FoundationR3Url + urlConstant.CancelUpload;
    public static CancelUploadV2 = this.env.FoundationR3Url + urlConstant.CancelUploadV2;
    public static UploadFile = this.env.FoundationR3Url + urlConstant.UploadFile;

    //UPLOAD MONITORING FOUNDATION
    public static GetUploadMonitoringPaging = this.env.FoundationR3Url + urlConstant.GetUploadMonitoringPaging;

    //UPLOAD TYPE
    public static GetUploadTypeByUploadTypeId = this.env.FoundationR3Url + urlConstant.GetUploadTypeByUploadTypeId;
    public static GetUploadTypePaging = this.env.FoundationR3Url + urlConstant.GetUploadTypePaging;

    //UPLOAD SETTING
    public static GetUploadSettingHIdByUploadTypeId = this.env.FoundationR3Url + urlConstant.GetUploadSettingHIdByUploadTypeId;
    public static GetListUploadSettingDIdByUploadSettingHId = this.env.FoundationR3Url + urlConstant.GetListUploadSettingDIdByUploadSettingHId;
    public static GetListUploadSettingDIdByUploadTypeId = this.env.FoundationR3Url + urlConstant.GetListUploadSettingDIdByUploadTypeId;
    public static AssignRoleToUploadSetting = this.env.FoundationR3Url + urlConstant.AssignRoleToUploadSetting;
    public static GetListRefRoleByUploadTypeId = this.env.FoundationR3Url + urlConstant.GetListRefRoleByUploadTypeId;
    public static GetListUploadSettingDByUploadSettingHId = urlConstant.GetListUploadSettingDByUploadSettingHId;

    // GENERIC
    public static GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode = this.env.ApprovalR3Url + urlConstant.GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode;

    // ASSET TYPE
    public static AddAssetType = this.env.FoundationR3Url + urlConstant.AddAssetType;
    public static EditAssetType = this.env.FoundationR3Url + urlConstant.EditAssetType;
    public static GetAssetTypeByCode = this.env.FoundationR3Url + urlConstant.GetAssetTypeByCode;
    public static GetAssetTypeById = this.env.FoundationR3Url + urlConstant.GetAssetTypeById;
    public static GetListAssetType = this.env.FoundationR3Url + urlConstant.GetListAssetType;
    public static GetListActiveAssetType = this.env.FoundationR3Url + urlConstant.GetListActiveAssetType;

    // LIST APPROVER
    public static ApvHoldTaskUrl = this.env.FoundationR3Url + urlConstant.ApvHoldTaskUrl;
    public static ApvTakeBackTaskUrl = this.env.FoundationR3Url + urlConstant.ApvTakeBackTaskUrl;
    public static ApvUnclaimTaskUrl = this.env.FoundationR3Url + urlConstant.ApvUnclaimTaskUrl;
    public static ApvClaimTask = this.env.FoundationR3Url + urlConstant.ApvClaimTask;

    //REF REASON
    public static GetValueReasonModel = this.env.FoundationR3Url + urlConstant.GetValueReasonModel;
    public static GetListActiveRefReason = this.env.FoundationR3Url + urlConstant.GetListActiveRefReason;
    //asset accesory
    public static AddNewAssetAccesory = this.env.FoundationR3Url + urlConstant.AddNewAssetAccesory;
    public static EditAssetAccessory = this.env.FoundationR3Url + urlConstant.EditAssetAccessory;
    public static GetAssetAccessorybyAssetAccesoryCode = this.env.FoundationR3Url + urlConstant.GetAssetAccessorybyAssetAccesoryCode;
    public static GetAssetAccessorybyAssetAccessoryId = this.env.FoundationR3Url + urlConstant.GetAssetAccessorybyAssetAccessoryId;
    public static GetlistAssetAccessorybyAssetTypeId = this.env.FoundationR3Url + urlConstant.GetlistAssetAccessorybyAssetTypeId;
    public static DeleteAssetAccessory = this.env.FoundationR3Url + urlConstant.DeleteAssetAccessory;

    //asset attr
    public static AddAssetAttr = this.env.FoundationR3Url + urlConstant.AddAssetAttr;
    public static EditAssetAttr = this.env.FoundationR3Url + urlConstant.EditAssetAttr;
    public static GetListAssetAttrByAssetTypeId = this.env.FoundationR3Url + urlConstant.GetListAssetAttrByAssetTypeId;
    public static GetAssetAttrByAssetAttrId = this.env.FoundationR3Url + urlConstant.GetAssetAttrByAssetAttrId;
    public static DeleteAssetAttr = this.env.FoundationR3Url + urlConstant.DeleteAssetAttr;

    //asset category
    public static AddNewAssetCategory = this.env.FoundationR3Url + urlConstant.AddNewAssetCategory;
    public static EditAssetCategory = this.env.FoundationR3Url + urlConstant.EditAssetCategory;
    public static GetAssetCategoryByAssetCategoryCode = this.env.FoundationR3Url + urlConstant.GetAssetCategoryByAssetCategoryCode;
    public static GetAssetCategorybyAssetCategoryId = this.env.FoundationR3Url + urlConstant.GetAssetCategorybyAssetCategoryId;
    public static GetlistAssetCategorybyAssetTypeId = this.env.FoundationR3Url + urlConstant.GetlistAssetCategorybyAssetTypeId;
    public static DeleteAssetCategory = this.env.FoundationR3Url + urlConstant.DeleteAssetCategory;
    public static GetActiveAssetCategoryValue = this.env.FoundationR3Url + urlConstant.GetActiveAssetCategoryValue;

    // ASSET DOC LIST
    public static AddNewAssetDocList = this.env.FoundationR3Url + urlConstant.AddNewAssetDocList;
    public static EditAssetDocList = this.env.FoundationR3Url + urlConstant.EditAssetDocList;
    public static GetAssetDocListByAssetDocListId = this.env.FoundationR3Url + urlConstant.GetAssetDocListByAssetDocListId;
    public static GetlistAssetDocListByAssetTypeId = this.env.FoundationR3Url + urlConstant.GetlistAssetDocListByAssetTypeId;
    public static DeleteAssetDocList = this.env.FoundationR3Url + urlConstant.DeleteAssetDocList;

    // ASSET REF DOC
    public static AddNewRefAssetDocData = this.env.FoundationR3Url + urlConstant.AddNewRefAssetDocData;
    public static EditRefAssetDocData = this.env.FoundationR3Url + urlConstant.EditRefAssetDocData;
    public static GetRefAssetDocByAssetDocCode = this.env.FoundationR3Url + urlConstant.GetRefAssetDocByAssetDocCode;
    public static GetRefAssetDocByRefAssetDocId = this.env.FoundationR3Url + urlConstant.GetRefAssetDocByRefAssetDocId;
    public static GetListRefAssetDoc = this.env.FoundationR3Url + urlConstant.GetListRefAssetDoc;


    // ASSET SCHEME
    public static GetAssetSchmHById = this.env.FoundationR3Url + urlConstant.GetAssetSchmHById;
    public static AddAssetSchmH = this.env.FoundationR3Url + urlConstant.AddAssetSchmH;
    public static EditAssetSchmH = this.env.FoundationR3Url + urlConstant.EditAssetSchmH;
    public static GetListAssetSchmDByAssetSchmHId = this.env.FoundationR3Url + urlConstant.GetListAssetSchmDByAssetSchmHId;
    public static EditListAssetSchmD = this.env.FoundationR3Url + urlConstant.EditListAssetSchmD;
    public static AddListAssetSchmD = this.env.FoundationR3Url + urlConstant.AddListAssetSchmD;
    public static DeleteAssetSchmD = this.env.FoundationR3Url + urlConstant.DeleteAssetSchmD;
    public static AddRangeAssetSchmD = this.env.FoundationR3Url + urlConstant.AddRangeAssetSchmD;

    // ASSET TYPE
    public static GetActiveAssetTypeValue = this.env.FoundationR3Url + urlConstant.GetActiveAssetTypeValue;

    // ASSET NEGATIVE
    public static AddAssetNegative = this.env.FoundationR3Url + urlConstant.AddAssetNegative;
    public static EditAssetNegative = this.env.FoundationR3Url + urlConstant.EditAssetNegative;
    public static GetAssetNegativeByIdEditPage = this.env.FoundationR3Url + urlConstant.GetAssetNegativeByIdEditPage;
    public static GetUploadAssetNegativeByUploadMonitoringNoAndTrxType = this.env.FoundationR3Url + urlConstant.GetUploadAssetNegativeByUploadMonitoringNoAndTrxType;

    // VENDOR
    public static AddVendorHO = this.env.FoundationR3Url + urlConstant.AddVendorHO;
    public static EditVendorHO = this.env.FoundationR3Url + urlConstant.EditVendorHO;
    public static AddVendorHolding = this.env.FoundationR3Url + urlConstant.AddVendorHolding;
    public static EditVendorHolding = this.env.FoundationR3Url + urlConstant.EditVendorHolding;
    public static AddVendorATPM = this.env.FoundationR3Url + urlConstant.AddVendorATPM;
    public static EditVendorATPM = this.env.FoundationR3Url + urlConstant.EditVendorATPM;
    public static GetVendorAndVendorAddr = this.env.FoundationR3Url + urlConstant.GetVendorAndVendorAddr;
    public static GetVendorByVendorId = this.env.FoundationR3Url + urlConstant.GetVendorByVendorId;
    public static AddVendorAddr = this.env.FoundationR3Url + urlConstant.AddVendorAddr;
    public static EditVendorAddr = this.env.FoundationR3Url + urlConstant.EditVendorAddr;
    public static GetVendorAddrByVendorId = this.env.FoundationR3Url + urlConstant.GetVendorAddrByVendorId;
    public static GetListHoByVendorId = this.env.FoundationR3Url + urlConstant.GetListHoByVendorId;
    public static GetListVendorBankAccByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorBankAccByVendorId;
    public static AddVendorBankAcc = this.env.FoundationR3Url + urlConstant.AddVendorBankAcc;
    public static EditVendorBankAcc = this.env.FoundationR3Url + urlConstant.EditVendorBankAcc;
    public static GetVendorBankAccByVendorBankAccId = this.env.FoundationR3Url + urlConstant.GetVendorBankAccByVendorBankAccId;
    public static DeleteVendorBankAcc = this.env.FoundationR3Url + urlConstant.DeleteVendorBankAcc;
    public static GetListVendorContactPersonByVendorCode = this.env.FoundationR3Url + urlConstant.GetListVendorContactPersonByVendorCode;
    public static GetVendorContactPersonById = this.env.FoundationR3Url + urlConstant.GetVendorContactPersonById;
    public static AddVendorContactPerson = this.env.FoundationR3Url + urlConstant.AddVendorContactPerson;
    public static EditVendorContactPerson = this.env.FoundationR3Url + urlConstant.EditVendorContactPerson;
    public static DeleteVendorContactPerson = this.env.FoundationR3Url + urlConstant.DeleteVendorContactPerson;
    public static GetListVendorContactPersonByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorContactPersonByVendorId;
    public static GetListBranchByVendorId = this.env.FoundationR3Url + urlConstant.GetListBranchByVendorId;
    public static GetListVendorBankAccByVendorEmpId = this.env.FoundationR3Url + urlConstant.GetListVendorBankAccByVendorEmpId;
    public static GetVendorAddrByVendorAddrId = this.env.FoundationR3Url + urlConstant.GetVendorAddrByVendorAddrId;
    public static GetVendorByVendorCode = this.env.FoundationR3Url + urlConstant.GetVendorByVendorCode;
    public static GetListKeyValueActiveByCategoryCodeAndOfficeCode = this.env.FoundationR3Url + urlConstant.GetListKeyValueActiveByCategoryCodeAndOfficeCode;
    public static GetListKvpVendorObjByCategoryCode = this.env.FoundationR3Url + urlConstant.GetListKvpVendorObjByCategoryCode;
    public static GetListVendorContactPersonWithoutJobPositionByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorContactPersonWithoutJobPositionByVendorId;
    public static GetVendorAddrByVendorIdOnly = this.env.FoundationR3Url + urlConstant.GetVendorAddrByVendorIdOnly;
    
    //VENDOR FUNDING COY
    public static AddVendorFundingCoy = this.env.FoundationR3Url + urlConstant.AddVendorFundingCoy;
    public static EditVendorFundingCoy = this.env.FoundationR3Url + urlConstant.EditVendorFundingCoy;

    // VENDOR ADDR
    public static GetVendorAddrByVendorCodeAndMrAddrTypeCode = this.env.FoundationR3Url + urlConstant.GetVendorAddrByVendorCodeAndMrAddrTypeCode;
    public static GetVendorAddrByVendorCode = this.env.FoundationR3Url + urlConstant.GetVendorAddrByVendorCode;

    // VENDOR BANK ACC
    public static GetVendorBankAccDefaultByVendorId = this.env.FoundationR3Url + urlConstant.GetVendorBankAccDefaultByVendorId;

    // VENDOR GRADING
    public static SubmitRequestVendorGrading = this.env.FoundationR3Url + urlConstant.SubmitRequestVendorGrading;
    public static SubmitRequestVendorGradingV2 = this.env.FoundationR3Url + urlConstant.SubmitRequestVendorGradingV2;
    public static GetRuleVendorGrading = this.env.FoundationR3Url + urlConstant.GetRuleVendorGrading;
    public static GetRuleVendorGradingV2 = this.env.FoundationR3Url + urlConstant.GetRuleVendorGradingV2;
    public static GetVendorGrade = this.env.FoundationR3Url + urlConstant.GetVendorGrade;

    // VENDOR OFFICE MEMBER
    public static AddListVendorOfficeMember = this.env.FoundationR3Url + urlConstant.AddListVendorOfficeMember;
    public static GetListVendorOfficeMbrByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorOfficeMbrByVendorId;
    public static DeleteVendorOfficeMember = this.env.FoundationR3Url + urlConstant.DeleteVendorOfficeMember;

    // VENDOR GROUP
    public static AddVendorGrp = this.env.FoundationR3Url + urlConstant.AddVendorGrp;
    public static EditVendorGrp = this.env.FoundationR3Url + urlConstant.EditVendorGrp;
    public static GetVendorGrpByVendorGrpCode = this.env.FoundationR3Url + urlConstant.GetVendorGrpByVendorGrpCode;
    public static GetVendorGrpByVendorGrpId = this.env.FoundationR3Url + urlConstant.GetVendorGrpByVendorGrpId;
    public static GetVendorGrpForUpdateByVendorGrpCode = this.env.FoundationR3Url + urlConstant.GetVendorGrpForUpdateByVendorGrpCode;
    public static GetVendorGrpForUpdateByVendorGrpId = this.env.FoundationR3Url + urlConstant.GetVendorGrpForUpdateByVendorGrpId;
    public static GetListVendorGrpByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorGrpByVendorId;

    // VENDOR GROUP MEMBER
    public static GetListVendorGrpMbrByVendorGrpId = this.env.FoundationR3Url + urlConstant.GetListVendorGrpMbrByVendorGrpId;
    public static GetListVendorGrpMbrByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorGrpMbrByVendorId;
    public static AddRangeVendorGrpMbr = this.env.FoundationR3Url + urlConstant.AddRangeVendorGrpMbr;
    public static DeleteVendorGrpMemberById = this.env.FoundationR3Url + urlConstant.DeleteVendorGrpMemberById;

    // VENDOR BRANCH
    public static AddVendorBranch = this.env.FoundationR3Url + urlConstant.AddVendorBranch;
    public static GetVendorBranchAndVendorTaxAddrByVendorId = this.env.FoundationR3Url + urlConstant.GetVendorBranchAndVendorTaxAddrByVendorId;
    public static EditVendorBranch = this.env.FoundationR3Url + urlConstant.EditVendorBranch;

    // VENDOR EMP
    public static AddVendorBranchEmp = this.env.FoundationR3Url + urlConstant.AddVendorBranchEmp;
    public static AddVendorBranchEmpV2 = this.env.FoundationR3Url + urlConstant.AddVendorBranchEmpV2;
    public static GetVendorEmpByVendorEmpId = this.env.FoundationR3Url + urlConstant.GetVendorEmpByVendorEmpId;
    public static GetVendorEmpAndVendorTaxAddrByVendorEmpId = this.env.FoundationR3Url + urlConstant.GetVendorEmpAndVendorTaxAddrByVendorEmpId;
    public static EditVendorBranchEmp = this.env.FoundationR3Url + urlConstant.EditVendorBranchEmp;
    public static EditVendorBranchEmpV2 = this.env.FoundationR3Url + urlConstant.EditVendorBranchEmpV2;
    public static GetListVendorEmpByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorEmpByVendorId;

    // VENDOR ADDR
    public static GetVendorAddrByVendorEmpId = this.env.FoundationR3Url + urlConstant.GetVendorAddrByVendorEmpId;

    // VENDOR SCHEME
    public static AddVendorSchm = this.env.FoundationR3Url + urlConstant.AddVendorSchm;
    public static EditVendorSchm = this.env.FoundationR3Url + urlConstant.EditVendorSchm;
    public static GetVendorSchmByVendorSchmId = this.env.FoundationR3Url + urlConstant.GetVendorSchmByVendorSchmId;
    public static AddVendorSchmMember = this.env.FoundationR3Url + urlConstant.AddVendorSchmMember;
    public static DeleteVendorSchmMember = this.env.FoundationR3Url + urlConstant.DeleteVendorSchmMember;
    public static GetListVendorSchmMemberByVendorSchmId = this.env.FoundationR3Url + urlConstant.GetListVendorSchmMemberByVendorSchmId;

    // VENDOR ATTR
    public static GetListActiveVendorAttrByVendorCategoryCode = this.env.FoundationR3Url + urlConstant.GetListActiveVendorAttrByVendorCategoryCode;

    // VENDOR ATTR CONTENT
    public static AddRangeVendorAttrContent = this.env.FoundationR3Url + urlConstant.AddRangeVendorAttrContent;
    public static EditListVendorAttrContent = this.env.FoundationR3Url + urlConstant.EditListVendorAttrContent;
    public static DeleteRangeVendorAttrContentByIds = urlConstant.DeleteRangeVendorAttrContentByIds;
    public static GetListVendorAttrContentByVendorAttrId = this.env.FoundationR3Url + urlConstant.GetListVendorAttrContentByVendorAttrId;
    public static GetListVendorAttrContentByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorAttrContentByVendorId;
    public static GetListVendorAttrContentByVendorCode = this.env.FoundationR3Url + urlConstant.GetListVendorAttrContentByVendorCode;

    // VENDOR ATPM MAPPING
    public static GetListVendorAtpmMappingByVendorId = this.env.FoundationR3Url + urlConstant.GetListVendorAtpmMappingByVendorId;

    // VERIFICATION
    // REF VERF ANSWER TYPE
    public static GetActiveRefVerfAnswerTypes = this.env.FoundationR3Url + urlConstant.GetActiveRefVerfAnswerTypes;
    public static GetRefVerfAnswerTypeByCode = this.env.FoundationR3Url + urlConstant.GetRefVerfAnswerTypeByCode;
    public static GetRefVerfAnswerTypeById = this.env.FoundationR3Url + urlConstant.GetRefVerfAnswerTypeById;
    public static GetRefVerfAnswerTypes = this.env.FoundationR3Url + urlConstant.GetRefVerfAnswerTypes;
    public static GetRefVerfAnswerTypeForUpdateById = this.env.FoundationR3Url + urlConstant.GetRefVerfAnswerTypeForUpdateById;
    public static GetRefVerfAnswerTypeForUpdateByCode = this.env.FoundationR3Url + urlConstant.GetRefVerfAnswerTypeForUpdateByCode;

    // VERF QUESTION ANSWER
    public static AddVerfQuestionAnswer = this.env.FoundationR3Url + urlConstant.AddVerfQuestionAnswer;
    public static EditVerfQuestionAnswer = this.env.FoundationR3Url + urlConstant.EditVerfQuestionAnswer;
    public static GetVerfQuestionAnswerByRefVerfAnswerTypeId = this.env.FoundationR3Url + urlConstant.GetVerfQuestionAnswerByRefVerfAnswerTypeId;
    public static GetVerfQuestionAnswerForUpdateById = this.env.FoundationR3Url + urlConstant.GetVerfQuestionAnswerForUpdateById;
    public static GetVerfQuestionAnswerListByVerfSchemeCode = this.env.FoundationR3Url + urlConstant.GetVerfQuestionAnswerListByVerfSchemeCode;
    public static GetVerfQuestionAnswerListByVerfSchemeHId = this.env.FoundationR3Url + urlConstant.GetVerfQuestionAnswerListByVerfSchemeHId;

    // VERF QUESTION GRP H
    public static AddVerfQuestionGrpH = this.env.FoundationR3Url + urlConstant.AddVerfQuestionGrpH;
    public static EditVerfQuestionGrpH = this.env.FoundationR3Url + urlConstant.EditVerfQuestionGrpH;
    public static GetActiveVerfQuestionGrpHs = this.env.FoundationR3Url + urlConstant.GetActiveVerfQuestionGrpHs;
    public static GetVerfQuestionGrpHs = this.env.FoundationR3Url + urlConstant.GetVerfQuestionGrpHs;
    public static GetQuestionGrpHById = this.env.FoundationR3Url + urlConstant.GetQuestionGrpHById;
    public static GetQuestionGrpHForUpdateById = this.env.FoundationR3Url + urlConstant.GetQuestionGrpHForUpdateById;
    public static GetQuestionGrpHByCode = this.env.FoundationR3Url + urlConstant.GetQuestionGrpHByCode;
    public static GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById = this.env.FoundationR3Url + urlConstant.GetQuestionGrpHAndRowVersionVerfSchemeDForUpdateById;

    // VERF QUESTION GRP D
    public static AddListVerfQuestionGrpD = this.env.FoundationR3Url + urlConstant.AddListVerfQuestionGrpD;
    public static DeleteVerfQuestionGroupDById = this.env.FoundationR3Url + urlConstant.DeleteVerfQuestionGroupDById;
    public static EditVerfQuestionGrpD = this.env.FoundationR3Url + urlConstant.EditVerfQuestionGrpD;
    public static GetActiveVerfQuestionGrpDsByGrpHId = this.env.FoundationR3Url + urlConstant.GetActiveVerfQuestionGrpDsByGrpHId;
    public static GetVerfQuestionGrpDById = this.env.FoundationR3Url + urlConstant.GetVerfQuestionGrpDById;
    public static GetVerfQuestionGrpDByGrpHId = this.env.FoundationR3Url + urlConstant.GetVerfQuestionGrpDByGrpHId;
    public static GetVerfQuestionGrpDForUpdateById = this.env.FoundationR3Url + urlConstant.GetVerfQuestionGrpDForUpdateById;

    // VERF RESULT
    public static GetVerfResultsByTrxRefNo = this.env.FoundationR3Url + urlConstant.GetVerfResultsByTrxRefNo;
    public static GetVerfResultById = this.env.FoundationR3Url + urlConstant.GetVerfResultById;
    public static GetVerfResultByResultNo = this.env.FoundationR3Url + urlConstant.GetVerfResultByResultNo;
    public static GetVerfResultByTrxRefNoAndVerfTrxTypeCode = this.env.FoundationR3Url + urlConstant.GetVerfResultByTrxRefNoAndVerfTrxTypeCode;
    public static AddVerfResult = this.env.FoundationR3Url + urlConstant.AddVerfResult;
    public static AddVerfResultHeaderAndVerfResultDetailForSurveyVerif = this.env.FoundationR3Url + urlConstant.AddVerfResultHeaderAndVerfResultDetailForSurveyVerif;

    // VERF RESULT H
    public static GetVerfResultHsByVerfResultId = this.env.FoundationR3Url + urlConstant.GetVerfResultHsByVerfResultId;
    public static GetVerfResultHById = this.env.FoundationR3Url + urlConstant.GetVerfResultHById;
    public static GetVerfResultHsByTrxRefNo = this.env.FoundationR3Url + urlConstant.GetVerfResultHsByTrxRefNo;
    public static GetVerfResultHByTrxRefNoAndMrAddrTypeCode = this.env.FoundationR3Url + urlConstant.GetVerfResultHByTrxRefNoAndMrAddrTypeCode;
    public static GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode = this.env.FoundationR3Url + urlConstant.GetVerfResultHDsByTrxRefNoAndMrAddrTypeCode;

    // VERF RESULT D
    public static EditVerfResultD = this.env.FoundationR3Url + urlConstant.EditVerfResultD;
    public static GetVerfResultDsByVerfResultHId = this.env.FoundationR3Url + urlConstant.GetVerfResultDsByVerfResultHId;
    public static GetVerfResultDById = this.env.FoundationR3Url + urlConstant.GetVerfResultDById;
    public static GetListVerfResultDInQuestionGrp = this.env.FoundationR3Url + urlConstant.GetListVerfResultDInQuestionGrp;

    // VERF SCHEME H
    public static AddVerfSchemeH = this.env.FoundationR3Url + urlConstant.AddVerfSchemeH;
    public static EditVerfSchemeH = this.env.FoundationR3Url + urlConstant.EditVerfSchemeH;
    public static DeleteVerfSchemeHById = this.env.FoundationR3Url + urlConstant.DeleteVerfSchemeHById;
    public static GetActiveVerfSchemeHs = this.env.FoundationR3Url + urlConstant.GetActiveVerfSchemeHs;
    public static GetVerfSchemeHs = this.env.FoundationR3Url + urlConstant.GetVerfSchemeHs;
    public static GetVerfSchemeHById = this.env.FoundationR3Url + urlConstant.GetVerfSchemeHById;
    public static GetVerfSchemeHByCode = this.env.FoundationR3Url + urlConstant.GetVerfSchemeHByCode;

    // VERF SCHEME D
    public static EditVerfSchemeD = this.env.FoundationR3Url + urlConstant.EditVerfSchemeD;
    public static GetVerfSchemeHForUpdateById = this.env.FoundationR3Url + urlConstant.GetVerfSchemeHForUpdateById;
    public static GetVerfSchemeDataByVerfSchemeHId = this.env.FoundationR3Url + urlConstant.GetVerfSchemeDataByVerfSchemeHId;
    public static AddListVerfSchemeD = this.env.FoundationR3Url + urlConstant.AddListVerfSchemeD;
    public static DeleteVerfSchemeD = this.env.FoundationR3Url + urlConstant.DeleteVerfSchemeD;
    public static GetVerfSchemeDsByVerfSchemeHId = this.env.FoundationR3Url + urlConstant.GetVerfSchemeDsByVerfSchemeHId;
    public static GetVerfSchemeDById = this.env.FoundationR3Url + urlConstant.GetVerfSchemeDById;

    // CUST DUPLICATE CHECKING
    public static GetCustomerDuplicateCheck = this.env.FoundationR3Url + urlConstant.GetCustomerDuplicateCheck;
    public static GetNegativeCustomerDuplicateCheck = this.env.FoundationR3Url + urlConstant.GetNegativeCustomerDuplicateCheck;
    public static GetCustomerAndNegativeCustDuplicateCheck = this.env.FoundationR3Url + urlConstant.GetCustomerAndNegativeCustDuplicateCheck;
    public static GetCustomerAndNegativeCustDuplicateCheckV2 = this.env.FoundationR3Url + urlConstant.GetCustomerAndNegativeCustDuplicateCheckV2;

    // CUSTOMER PERSONAL
    public static AddNewCustPersonal = this.env.FoundationR3Url + urlConstant.AddNewCustPersonal;
    public static EditCustPersonal = this.env.FoundationR3Url + urlConstant.EditCustPersonal;
    public static GetCustPersonalbyCustPersonalId = this.env.FoundationR3Url + urlConstant.GetCustPersonalbyCustPersonalId;
    public static GetCustPersonalbyCustId = this.env.FoundationR3Url + urlConstant.GetCustPersonalbyCustId;
    public static GetCustPersonalbyCustIdV2 = this.env.FoundationR3Url + urlConstant.GetCustPersonalbyCustIdV2;

    // CUSTOMER
    public static AddNewCust = this.env.FoundationR3Url + urlConstant.AddNewCust;
    public static AddCustPersonalMainData = this.env.FoundationR3Url + urlConstant.AddCustPersonalMainData;
    public static AddCustPersonalMainDataV2 = this.env.FoundationR3Url + urlConstant.AddCustPersonalMainDataV2;
    public static AddCustCompanyMainData = this.env.FoundationR3Url + urlConstant.AddCustCompanyMainData;
    public static AddCustCompanyMainDataV2 = this.env.FoundationR3Url + urlConstant.AddCustCompanyMainDataV2;
    public static EditCust = this.env.FoundationR3Url + urlConstant.EditCust;
    public static EditCustPersonalMainData = this.env.FoundationR3Url + urlConstant.EditCustPersonalMainData;
    public static EditCustPersonalMainDataV2 = this.env.FoundationR3Url + urlConstant.EditCustPersonalMainDataV2;
    public static EditCustCompanyMainData = this.env.FoundationR3Url + urlConstant.EditCustCompanyMainData;
    public static EditCustCompanyMainDataV2 = this.env.FoundationR3Url + urlConstant.EditCustCompanyMainDataV2;
    public static EditDuplicateCust = this.env.FoundationR3Url + urlConstant.EditDuplicateCust;
    public static EditNegativeDuplicateCust = this.env.FoundationR3Url + urlConstant.EditNegativeDuplicateCust;
    public static GetCustByCustId = this.env.FoundationR3Url + urlConstant.GetCustByCustId;
    public static GetCustPersonalForUpdateByCustNo = this.env.FoundationR3Url + urlConstant.GetCustPersonalForUpdateByCustNo;
    public static GetCustCompanyForUpdateByCustNo = this.env.FoundationR3Url + urlConstant.GetCustCompanyForUpdateByCustNo;
    public static DeleteNegativeCustomer = this.env.FoundationR3Url + urlConstant.DeleteNegativeCustomer;
    public static GetListCustGrpByMemberCustIdForCustGrpTab = this.env.FoundationR3Url + urlConstant.GetListCustGrpByMemberCustIdForCustGrpTab;
    public static GetListCustGrpByMemberCustId = this.env.FoundationR3Url + urlConstant.GetListCustGrpByMemberCustId;
    public static GetCustByCustNo = this.env.FoundationR3Url + urlConstant.GetCustByCustNo;
    public static AddCustAsset = this.env.FoundationR3Url + urlConstant.AddCustAsset;
    public static DeleteCustAsset = this.env.FoundationR3Url + urlConstant.DeleteCustAsset;
    public static EditCustAsset = this.env.FoundationR3Url + urlConstant.EditCustAsset;
    public static GetCustAssetByCustAssetId = this.env.FoundationR3Url + urlConstant.GetCustAssetByCustAssetId;
    public static GetListCustAssetByCustId = this.env.FoundationR3Url + urlConstant.GetListCustAssetByCustId;
    public static UpdateToMainCustomer = this.env.FoundationR3Url + urlConstant.UpdateToMainCustomer;

    public static SaveCustPersonalShareholderMainData = this.env.FoundationR3Url + urlConstant.SaveCustPersonalShareholderMainData;
    public static SaveCustPersonalShareholderMainDataV2 = this.env.FoundationR3Url + urlConstant.SaveCustPersonalShareholderMainDataV2;
    public static SaveCustPersonalShareholderMainDataV3 = this.env.FoundationR3Url + urlConstant.SaveCustPersonalShareholderMainDataV3;
    public static SaveCustCompanyShareholderMainData = this.env.FoundationR3Url + urlConstant.SaveCustCompanyShareholderMainData;
    public static SaveCustCompanyShareholderMainDataV2 = this.env.FoundationR3Url + urlConstant.SaveCustCompanyShareholderMainDataV2;
    public static SaveCustCompanyShareholderMainDataV3 = this.env.FoundationR3Url + urlConstant.SaveCustCompanyShareholderMainDataV3;
    public static SaveCustPersonalFamilyMainData = this.env.FoundationR3Url + urlConstant.SaveCustPersonalFamilyMainData;
    public static SaveCustPersonalFamilyMainDataV2 = this.env.FoundationR3Url + urlConstant.SaveCustPersonalFamilyMainDataV2;
    public static SaveCustPersonalFamilyMainDataV3 = this.env.FoundationR3Url + urlConstant.SaveCustPersonalFamilyMainDataV3;

    public static NewEditDuplicateCust = this.env.FoundationR3Url + urlConstant.NewEditDuplicateCust;
    public static NewEditDuplicateCustV2 = this.env.FoundationR3Url + urlConstant.NewEditDuplicateCustV2;


    public static GetCustHighlightCommentByCustId = this.env.FoundationR3Url + urlConstant.GetCustHighlightCommentByCustId;
    public static SendCustomerDataToRabbitMq = this.env.FoundationR3Url + urlConstant.SendCustomerDataToRabbitMq;
    // CUSTOMER COMPANY
    public static GetListViewCustCompanyLegalDocByCustCompanyId = this.env.FoundationR3Url + urlConstant.GetListViewCustCompanyLegalDocByCustCompanyId;
    public static DeleteCustCompanyLegalDoc = this.env.FoundationR3Url + urlConstant.DeleteCustCompanyLegalDoc;
    public static AddCustCompanyLegalDoc = this.env.FoundationR3Url + urlConstant.AddCustCompanyLegalDoc;
    public static EditCustCompanyLegalDoc = this.env.FoundationR3Url + urlConstant.EditCustCompanyLegalDoc;

    //CUSTOMER COMPANY INDUSTRY INFO
    public static GetListCustCompanyIndustryInfoByCustId = this.env.FoundationR3Url + urlConstant.GetListCustCompanyIndustryInfoByCustId;
    public static AddEditCustCompanyIndustryInfo = this.env.FoundationR3Url + urlConstant.AddEditCustCompanyIndustryInfo;
    public static DeleteCustCompanyIndustryInfo = this.env.FoundationR3Url + urlConstant.DeleteCustCompanyIndustryInfo;
    public static UploadCustCompanyLegalDoc = this.env.FoundationR3Url + urlConstant.UploadCustCompanyLegalDoc;
    public static UploadCustCompanyIndustryDoc = this.env.FoundationR3Url + urlConstant.UploadCustCompanyIndustryDoc;

    // CUSTOMER GROUP
    public static AddCustGrpBothWays = this.env.FoundationR3Url + urlConstant.AddCustGrpBothWays;
    public static AddCustGrp = this.env.FoundationR3Url + urlConstant.AddCustGrp;
    public static EditCustGrp = this.env.FoundationR3Url + urlConstant.EditCustGrp;
    public static DeleteCustGrp = this.env.FoundationR3Url + urlConstant.DeleteCustGrp;

    // CUSTOMER FIN DATA
    public static GetCBAForCustFinDataByCustId = this.env.FoundationR3Url + urlConstant.GetCBAForCustFinDataByCustId;
    public static AddCBAForCustFinData = this.env.FoundationR3Url + urlConstant.AddCBAForCustFinData;
    public static EditCBAForCustFinData = this.env.FoundationR3Url + urlConstant.EditCBAForCustFinData;
    public static GetCustBankAccByCustBankAccId = this.env.FoundationR3Url + urlConstant.GetCustBankAccByCustBankAccId;
    public static GetCBAForCustFinDataEditModeByCustBankAccId = this.env.FoundationR3Url + urlConstant.GetCBAForCustFinDataEditModeByCustBankAccId;
    public static GetCustBankAccByCustBankAccIdWithRefBank = this.env.FoundationR3Url + urlConstant.GetCustBankAccByCustBankAccIdWithRefBank;
    public static AddCustBankAcc = this.env.FoundationR3Url + urlConstant.AddCustBankAcc;
    public static GetCustPersonalFinDataByCustPersonalId = this.env.FoundationR3Url + urlConstant.GetCustPersonalFinDataByCustPersonalId;
    public static GetListCustPersonalFinDataByCustId = this.env.FoundationR3Url + urlConstant.GetListCustPersonalFinDataByCustId;
    public static GetCustCompanyFinDataByCustCompanyId = this.env.FoundationR3Url + urlConstant.GetCustCompanyFinDataByCustCompanyId;
    public static GetListCustCompanyFinDataByCustId = this.env.FoundationR3Url + urlConstant.GetListCustCompanyFinDataByCustId;
    public static AddCustCompanyFinData = this.env.FoundationR3Url + urlConstant.AddCustCompanyFinData;
    public static EditCustCompanyFinData = this.env.FoundationR3Url + urlConstant.EditCustCompanyFinData;
    public static DeleteCustCompanyFinData = this.env.FoundationR3Url + urlConstant.DeleteCustCompanyFinData;
    public static AddCustPersonalFinData = this.env.FoundationR3Url + urlConstant.AddCustPersonalFinData;
    public static EditCustPersonalFinData = this.env.FoundationR3Url + urlConstant.EditCustPersonalFinData;
    public static DeleteCustPersonalFinData = this.env.FoundationR3Url + urlConstant.DeleteCustPersonalFinData;
    public static GetCustPersonalFinDataForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetCustPersonalFinDataForCustViewByCustId;
    public static GetListCustPersonalFinDataForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetListCustPersonalFinDataForCustViewByCustId;
    public static EditCustBankAcc = this.env.FoundationR3Url + urlConstant.EditCustBankAcc;
    public static DeleteCustBankAccAndStmnt = this.env.FoundationR3Url + urlConstant.DeleteCustBankAccAndStmnt;

    // CUSTOMER ADDRESS
    public static GetListCustAddr = this.env.FoundationR3Url + urlConstant.GetListCustAddr;
    public static AddCustAddr = this.env.FoundationR3Url + urlConstant.AddCustAddr;
    public static EditCustAddr = this.env.FoundationR3Url + urlConstant.EditCustAddr;
    public static GetCustAddr = this.env.FoundationR3Url + urlConstant.GetCustAddr;
    public static GetListCustAddrByCustId = this.env.FoundationR3Url + urlConstant.GetListCustAddrByCustId;
    public static GetListCustAddrByCustIdForCustomerPersonalView = this.env.FoundationR3Url + urlConstant.GetListCustAddrByCustIdForCustomerPersonalView;
    public static GetCustAddrLegalAddrByCustId = this.env.FoundationR3Url + urlConstant.GetCustAddrLegalAddrByCustId;
    public static GetCustAddrByMrCustAddrType = this.env.FoundationR3Url + urlConstant.GetCustAddrByMrCustAddrType;
    public static DeleteCustAddr = urlConstant.DeleteCustAddr;

    // CUSTOMER ADDRESS HISTORY
    public static GetListCustAddrHistByCustId = this.env.FoundationR3Url + urlConstant.GetListCustAddrHistByCustId;
    public static GetListCustAddrHistByCustIdForCustomerPersonalView = this.env.FoundationR3Url + urlConstant.GetListCustAddrHistByCustIdForCustomerPersonalView;

    // CUSTOMER JOB DATA
    public static AddCustPersonalJobData = this.env.FoundationR3Url + urlConstant.AddCustPersonalJobData;
    public static EditCustPersonalJobData = this.env.FoundationR3Url + urlConstant.EditCustPersonalJobData;
    public static GetCustPersonalJobDataByCustId = this.env.FoundationR3Url + urlConstant.GetCustPersonalJobDataByCustId;

    // CUSTOMER COMPANY LEGAL DOC
    public static GetCustCompanyLegalDocForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetCustCompanyLegalDocForCustViewByCustId;

    // CUSTOMER COMPANY
    public static GetCustCompanyByCustId = this.env.FoundationR3Url + urlConstant.GetCustCompanyByCustId;
    public static EditCustCompany = this.env.FoundationR3Url + urlConstant.EditCustCompany;

    // CUSTOMER COMPANY CONTACT PERSON
    public static AddCustCompanyContactPerson = this.env.FoundationR3Url + urlConstant.AddCustCompanyContactPerson;
    public static GetCustCompanyContactPersonByCustCompanyContactPersonId = this.env.FoundationR3Url + urlConstant.GetCustCompanyContactPersonByCustCompanyContactPersonId;
    public static GetCustCompanyContactPersonByCustCompanyId = this.env.FoundationR3Url + urlConstant.GetCustCompanyContactPersonByCustCompanyId;
    public static EditCustCompanyContactPersonByCustCompanyId = this.env.FoundationR3Url + urlConstant.EditCustCompanyContactPersonByCustCompanyId;

    // CUSTOMER COMPANY MANAGEMENT SHAREHOLDER
    public static GetCustCompanyMgmntShrholderForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetCustCompanyMgmntShrholderForCustViewByCustId;
    public static AddCustCompanyMgmntShrholder = this.env.FoundationR3Url + urlConstant.AddCustCompanyMgmntShrholder;
    public static AddCustCompanyMgmntShrholderPersonal = this.env.FoundationR3Url + urlConstant.AddCustCompanyMgmntShrholderPersonal;
    public static AddCustCompanyMgmntShrholderCompany = this.env.FoundationR3Url + urlConstant.AddCustCompanyMgmntShrholderCompany;
    public static EditCustCompanyMgmntShrholder = this.env.FoundationR3Url + urlConstant.EditCustCompanyMgmntShrholder;
    public static DeleteCustCompanyMgmntShrholder = this.env.FoundationR3Url + urlConstant.DeleteCustCompanyMgmntShrholder;
    public static GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = this.env.FoundationR3Url + urlConstant.GetCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId;
    public static GetListCustCompanyMgmntShrholderByCustId = this.env.FoundationR3Url + urlConstant.GetListCustCompanyMgmntShrholderByCustId;
    public static GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId = this.env.FoundationR3Url + urlConstant.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId;
    public static GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdV2 = this.env.FoundationR3Url + urlConstant.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderIdV2;
    public static AddCustCompanyMgmntShrholderPublic = this.env.FoundationR3Url + urlConstant.AddCustCompanyMgmntShrholderPublic;
    public static EditCustCompanyMgmntShrholderPublic = this.env.FoundationR3Url + urlConstant.EditCustCompanyMgmntShrholderPublic;
    public static GetListManagementShareholderForListPagingByCustId = this.env.FoundationR3Url + urlConstant.GetListManagementShareholderForListPagingByCustId;
    public static GetListManagementShareholderForListPagingByCustIdV2 = this.env.FoundationR3Url + urlConstant.GetListManagementShareholderForListPagingByCustIdV2;
    public static GetCustCompanyMgmntShrholderByCustIdAndShrholderId = this.env.FoundationR3Url + urlConstant.GetCustCompanyMgmntShrholderByCustIdAndShrholderId;
    public static GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId = this.env.FoundationR3Url + urlConstant.GetCustCompanyMgmntShrholderJobInfoByCustIdAndShareholderId;

    // CUST ATTR CONTENT
    public static GetCustAttrContentForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetCustAttrContentForCustViewByCustId;
    public static AddEditListCustAttrContent = this.env.FoundationR3Url + urlConstant.AddEditListCustAttrContent;
    public static GetListCustAttrContentByCustIdForCust = this.env.FoundationR3Url + urlConstant.GetListCustAttrContentByCustIdForCust;
    public static GetListCustAttrContentByCustIdAndAttrGroup = this.env.FoundationR3Url + urlConstant.GetListCustAttrContentByCustIdAndAttrGroup;
    public static GetListCustAttrContentByCustIdAndListAttrGroups = this.env.FoundationR3Url + urlConstant.GetListCustAttrContentByCustIdAndListAttrGroups;
    public static GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes = this.env.FoundationR3Url + urlConstant.GetListCustAttrContentByCustIdAndAttrGroupAndListAttrCodes;
    public static GetRuleForAttrContent = this.env.FoundationR3Url + urlConstant.GetRuleForAttrContent;

    //CUST CONTACT PERSON
    public static GetCustCompanyContactPersonForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetCustCompanyContactPersonForCustViewByCustId;
    public static GetListCustPersonalContactPersonForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetListCustPersonalContactPersonForCustViewByCustId;

    // CUST GROUP
    public static GetListCustGrpForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetListCustGrpForCustViewByCustId;
    public static GetListCustGrpForCustViewByMemberCustId = this.env.FoundationR3Url + urlConstant.GetListCustGrpForCustViewByMemberCustId;
    public static GetListCustGrpForCustViewById = this.env.FoundationR3Url + urlConstant.GetListCustGrpForCustViewById;

    // NEGATIVE CUSTOMER
    public static AddNegativeCustomer = this.env.FoundationR3Url + urlConstant.AddNegativeCustomer;
    public static EditNegativeCustomer = this.env.FoundationR3Url + urlConstant.EditNegativeCustomer;
    public static EditDuplicateNegativeCust = this.env.FoundationR3Url + urlConstant.EditDuplicateNegativeCust;
    public static EditDuplicateNegativeCustV2 = this.env.FoundationR3Url + urlConstant.EditDuplicateNegativeCustV2;
    public static GetNegativeCustByNegativeCustId = this.env.FoundationR3Url + urlConstant.GetNegativeCustByNegativeCustId;
    public static AddNegativeCustChangeTrx = this.env.FoundationR3Url + urlConstant.AddNegativeCustChangeTrx;
    public static EditNegativeCustChangeTrx = this.env.FoundationR3Url + urlConstant.EditNegativeCustChangeTrx;
    public static GetNegativeCustChangeTrxByNegativeCustId = this.env.FoundationR3Url + urlConstant.GetNegativeCustChangeTrxByNegativeCustId;
    public static GetListNegativeCustChangeTrxByNegativeCustId = this.env.FoundationR3Url + urlConstant.GetListNegativeCustChangeTrxByNegativeCustId;
    public static GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType = this.env.FoundationR3Url + urlConstant.GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType;
    public static GetNegativeCustByNegativeCustNameAndCustType = this.env.FoundationR3Url + urlConstant.GetNegativeCustByNegativeCustNameAndCustType;

    // CUSTOMER OTHER INFO
    public static AddEditCustOtherInfo = this.env.FoundationR3Url + urlConstant.AddEditCustOtherInfo;
    public static AddCustOtherInfo = this.env.FoundationR3Url + urlConstant.AddCustOtherInfo;
    public static EditCustOtherInfo = this.env.FoundationR3Url + urlConstant.EditCustOtherInfo;
    public static GetCustOtherInfoByCustId = this.env.FoundationR3Url + urlConstant.GetCustOtherInfoByCustId;

    //Custsomer Personal Contact Person
    public static AddNewCustPersonalContactPerson = this.env.FoundationR3Url + urlConstant.AddNewCustPersonalContactPerson;
    public static GetListCustPersonalContactPersonByCustId = this.env.FoundationR3Url + urlConstant.GetListCustPersonalContactPersonByCustId;
    public static DeleteCustPersonalContactPerson = urlConstant.DeleteCustPersonalContactPerson;
    public static EditCustPersonalContactPerson = this.env.FoundationR3Url + urlConstant.EditCustPersonalContactPerson;
    public static GetCustPersonalContactPersonByCustPersonalContactPersonId = this.env.FoundationR3Url + urlConstant.GetCustPersonalContactPersonByCustPersonalContactPersonId;
    public static AddCustPersonalEmergencyContact = this.env.FoundationR3Url + urlConstant.AddCustPersonalEmergencyContact;
    public static EditCustPersonalEmergencyContact = this.env.FoundationR3Url + urlConstant.EditCustPersonalEmergencyContact;
    public static GetCustPersonalEmergencyContactByCustId = this.env.FoundationR3Url + urlConstant.GetCustPersonalEmergencyContactByCustId;
    public static AddCustPersonalFamily = this.env.FoundationR3Url + urlConstant.AddCustPersonalFamily;
    public static EditCustPersonalFamily = this.env.FoundationR3Url + urlConstant.EditCustPersonalFamily;
    public static DeleteCustPersonalFamily = this.env.FoundationR3Url + urlConstant.DeleteCustPersonalFamily;
    public static GetCustPersonalFamilyByCustPersonalFamilyId = this.env.FoundationR3Url + urlConstant.GetCustPersonalFamilyByCustPersonalFamilyId;
    public static GetMainCustAndListCustPersonalFamilyByCustId = this.env.FoundationR3Url + urlConstant.GetMainCustAndListCustPersonalFamilyByCustId;
    public static GetListCustPersonalEmergencyContactByCustId = this.env.FoundationR3Url + urlConstant.GetListCustPersonalEmergencyContactByCustId;

    // SURVEY TASK
    public static GetListSrvyTaskBySrvyOrderId = this.env.FoundationR3Url + urlConstant.GetListSrvyTaskBySrvyOrderId;
    public static GetListSrvyTaskBySrvyOrderIdForUpdate = this.env.FoundationR3Url + urlConstant.GetListSrvyTaskBySrvyOrderIdForUpdate;
    public static AddSrvyTask = this.env.FoundationR3Url + urlConstant.AddSrvyTask;
    public static EditSrvyTask = this.env.FoundationR3Url + urlConstant.EditSrvyTask;
    public static EditSrvyTaskAndSendToMobile = this.env.FoundationR3Url + urlConstant.EditSrvyTaskAndSendToMobile;
    public static DeleteSrvyTask = urlConstant.DeleteSrvyTask;
    public static GetSrvyTaskBySrvyTaskId = this.env.FoundationR3Url + urlConstant.GetSrvyTaskBySrvyTaskId;
    public static CancelSurveyTaskBySurveyTaskId = this.env.FoundationR3Url + urlConstant.CancelSurveyTaskBySurveyTaskId;
    public static GetSurveyorNameBySurveyorId = this.env.FoundationR3Url + urlConstant.GetSurveyorNameBySurveyorId;
    public static GetListSrvyTaskBySrvyOrderIdForView = this.env.FoundationR3Url + urlConstant.GetListSrvyTaskBySrvyOrderIdForView;
    public static GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview = this.env.FoundationR3Url + urlConstant.GetListCustomSrvyTaskBySrvyOrderIdForSrvyResultReview;
    public static ReviewSurveyResult = this.env.FoundationR3Url + urlConstant.ReviewSurveyResult;
    public static GetHtmlCodeFromMobile = this.env.FoundationR3Url + urlConstant.GetHtmlCodeFromMobile;
    public static GetUrlViewSurveyFromMobile = this.env.FoundationR3Url + urlConstant.GetUrlViewSurveyFromMobile;
    public static UpdateSrvyTaskAndAddVerfResultH = this.env.FoundationR3Url + urlConstant.UpdateSrvyTaskAndAddVerfResultH;
    public static UpdateSrvyTaskAndEditVerfResultH = this.env.FoundationR3Url + urlConstant.UpdateSrvyTaskAndEditVerfResultH;
    public static UpdateMrSurveyTaskStatCode = this.env.FoundationR3Url + urlConstant.UpdateMrSurveyTaskStatCode;

    // SURVEY ORDER
    public static GetSrvyOrderBySrvyOrderId = this.env.FoundationR3Url + urlConstant.GetSrvyOrderBySrvyOrderId;
    public static GetSrvyOrderByTrxRefNo = this.env.FoundationR3Url + urlConstant.GetSrvyOrderByTrxRefNo;
    public static GetListSryvObject = this.env.FoundationR3Url + urlConstant.GetListSryvObject;
    public static SendSrvyOrder = this.env.FoundationR3Url + urlConstant.SendSrvyOrder;
    public static GetSrvyOrderDataBySrvyOrderId = this.env.FoundationR3Url + urlConstant.GetSrvyOrderDataBySrvyOrderId;

    // SURVEY FORM SCHM
    public static GetListAllSrvyFormSchm = this.env.FoundationR3Url + urlConstant.GetListAllSrvyFormSchm;
    public static GetSrvyFormSchmBySrvyFormSchmId = this.env.FoundationR3Url + urlConstant.GetSrvyFormSchmBySrvyFormSchmId;
    public static GetListKeyValueSrvyFormSchm = this.env.FoundationR3Url + urlConstant.GetListKeyValueSrvyFormSchm;

    // REF FORM
    public static EditRefFormData = this.env.FoundationR3Url + urlConstant.EditRefFormData;
    public static AddRefFormData = this.env.FoundationR3Url + urlConstant.AddRefFormData;
    public static GetRefFormDataByRefFormId = this.env.FoundationR3Url + urlConstant.GetRefFormDataByRefFormId;
    public static GetTemplateIcon = this.env.FoundationR3Url + urlConstant.GetTemplateIcon;
    public static DeleteRefFormData = this.env.FoundationR3Url + urlConstant.DeleteRefFormData;

    // AUTH FORM
    public static AddListAuthForm = this.env.FoundationR3Url + urlConstant.AddListAuthForm;
    public static GetListAuthFormByRefFormId = this.env.FoundationR3Url + urlConstant.GetListAuthFormByRefFormId;
    public static DeleteAuthForm = this.env.FoundationR3Url + urlConstant.DeleteAuthForm;
    public static GetListAuthFormByRefRoleId = this.env.FoundationR3Url + urlConstant.GetListAuthFormByRefRoleId;

    // Workflow Engine
    public static ClaimTask = this.env.FoundationR3Url + urlConstant.ClaimTask;
    public static ClaimTaskV2 = this.env.FoundationR3Url + urlConstant.ClaimTaskV2;
    public static GetAllTaskWorkflow = this.env.FoundationR3Url + urlConstant.GetAllTaskWorkflow;
    public static GetSingleTaskWorkflow = this.env.FoundationR3Url + urlConstant.GetSingleTaskWorkflow;

    //SCORE CATEGORY SCHM H
    public static GetScoreCategorySchmHById = this.env.FoundationR3Url + urlConstant.GetScoreCategorySchmHById;
    public static AddScoreCategorySchmH = this.env.FoundationR3Url + urlConstant.AddScoreCategorySchmH;
    public static EditScoreCategorySchmH = this.env.FoundationR3Url + urlConstant.EditScoreCategorySchmH;
    public static GetRefScoreCategoryTypeWithDetailById = this.env.FoundationR3Url + urlConstant.GetRefScoreCategoryTypeWithDetailById;

    // REF SCORE CATEGORY
    public static AddRangeScoreCategorySchmD = this.env.FoundationR3Url + urlConstant.AddRangeScoreCategorySchmD;

    // Authentication
    public static RequestNewPassword = this.env.FoundationR3Url + urlConstant.RequestNewPassword;
    public static LoginByCode = this.env.FoundationR3Url + urlConstant.LoginByCode;

    // INTEGRATION
    public static SendMasterDailyToRabbitMq = this.env.FoundationR3Url + urlConstant.SendMasterDailyToRabbitMq;

    // UPDATE MASTER CUST
    public static GetCustDataForUpdateMasterCustDetail = this.env.FoundationR3Url + urlConstant.GetCustDataForUpdateMasterCustDetail;
    public static GetCustAddrDataForUpdateMasterCustAddr = this.env.FoundationR3Url + urlConstant.GetCustAddrDataForUpdateMasterCustAddr;
    public static GetCustFamilyDataForUpdateMasterCustFamily = this.env.FoundationR3Url + urlConstant.GetCustFamilyDataForUpdateMasterCustFamily;
    public static GetCustEmergencyDataForUpdateMasterCustEmergency = this.env.FoundationR3Url + urlConstant.GetCustEmergencyDataForUpdateMasterCustEmergency;
    public static GetCustJobDataForUpdateMasterCustJobData = this.env.FoundationR3Url + urlConstant.GetCustJobDataForUpdateMasterCustJobData;
    public static GetCustFinDataForUpdateMasterCustFinData = this.env.FoundationR3Url + urlConstant.GetCustFinDataForUpdateMasterCustFinData;
    public static GetCustCompanyDataForUpdateMasterCustCompany = this.env.FoundationR3Url + urlConstant.GetCustCompanyDataForUpdateMasterCustCompany;
    public static GetShareholderForUpdateMasterCustCompanyShareholder = this.env.FoundationR3Url + urlConstant.GetShareholderForUpdateMasterCustCompanyShareholder;
    public static GetContactInfoForUpdateMasterCustCompanyContactInfo = this.env.FoundationR3Url + urlConstant.GetContactInfoForUpdateMasterCustCompanyContactInfo;
    public static GetFinDataForUpdateMasterCustCompanyFinData = this.env.FoundationR3Url + urlConstant.GetFinDataForUpdateMasterCustCompanyFinData;
    public static GetLegalDocForUpdateMasterCustCompanyLegalDoc = this.env.FoundationR3Url + urlConstant.GetLegalDocForUpdateMasterCustCompanyLegalDoc;
    public static UpdateMasterCustomer = this.env.FoundationR3Url + urlConstant.UpdateMasterCustomer;
    public static UpdateMasterCustAddr = this.env.FoundationR3Url + urlConstant.UpdateMasterCustAddr;
    public static UpdateMasterCustFamily = this.env.FoundationR3Url + urlConstant.UpdateMasterCustFamily;
    public static UpdateMasterCustEmergency = this.env.FoundationR3Url + urlConstant.UpdateMasterCustEmergency;
    public static UpdateMasterCustJobData = this.env.FoundationR3Url + urlConstant.UpdateMasterCustJobData;
    public static UpdateMasterCustFinData = this.env.FoundationR3Url + urlConstant.UpdateMasterCustFinData;
    public static UpdateMasterCustFinDataV2 = this.env.FoundationR3Url + urlConstant.UpdateMasterCustFinDataV2;
    public static UpdateMasterCustCompanyDetail = this.env.FoundationR3Url + urlConstant.UpdateMasterCustCompanyDetail;
    public static UpdateMasterCustCompanyShareholder = this.env.FoundationR3Url + urlConstant.UpdateMasterCustCompanyShareholder;
    public static UpdateMasterCustCompanyLegalDoc = this.env.FoundationR3Url + urlConstant.UpdateMasterCustCompanyLegalDoc;
    public static UpdateMasterCustCompanyLegalDocv2 = this.env.FoundationR3Url + urlConstant.UpdateMasterCustCompanyLegalDocv2;
    public static UpdateMasterCustCompanyContactInfo = this.env.FoundationR3Url + urlConstant.UpdateMasterCustCompanyContactInfo;
    public static UpdateMasterCustCompanyFinData = this.env.FoundationR3Url + urlConstant.UpdateMasterCustCompanyFinData;

    //Application Source
    public static AddRefAppSrc = this.env.FoundationR3Url + urlConstant.AddRefAppSrc;
    public static AddRefAppSrcOfficeMbr = this.env.FoundationR3Url + urlConstant.AddRefAppSrcOfficeMbr;
    public static DeleteRefAppSrcOfficeMbr = this.env.FoundationR3Url + urlConstant.DeleteRefAppSrcOfficeMbr;
    public static EditRefAppSrc = this.env.FoundationR3Url + urlConstant.EditRefAppSrc;
    public static GetRefAppSrcByRefAppSrcId = this.env.FoundationR3Url + urlConstant.GetRefAppSrcByRefAppSrcId;
    public static GetListRefAppSrcOfficeMbrByRefAppSrcId = this.env.FoundationR3Url + urlConstant.GetListRefAppSrcOfficeMbrByRefAppSrcId;

    // List Approver
    public static GetApprovedBy = this.env.ApprovalURL + urlConstant.GetApprovedBy;
    public static GetRecommendations = this.env.ApprovalURL + urlConstant.GetRecommendations;

    // New Approval R3
    public static GetSchemesByCategoryId = urlConstant.GetSchemesByCategoryId;
    public static ReturnLevel = urlConstant.ReturnLevel;
    public static ContinueToLevel = urlConstant.ContinueToLevel;

    // Payment Allocation
    public static GetListKeyValueRefPaymentAllocActive = this.env.FoundationR3Url + urlConstant.GetListKeyValueRefPaymentAllocActive;
    public static GetRefPaymentAllocByID = this.env.FoundationR3Url + urlConstant.GetRefPaymentAllocByID;
    public static GetListKeyValueRefPaymentAllocByPayAllocGrpCode = this.env.FoundationR3Url + urlConstant.GetListKeyValueRefPaymentAllocByPayAllocGrpCode;
    public static SubmitRefPaymentAlloc = this.env.FoundationR3Url + urlConstant.SubmitRefPaymentAlloc;
    public static SubmitAddRefAttr = this.env.FoundationR3Url + urlConstant.SubmitAddRefAttr;
    public static SubmitEditRefAttr = this.env.FoundationR3Url + urlConstant.SubmitEditRefAttr;
    public static GetRefPaymentAllocAttrByRefPaymentAllocId = this.env.FoundationR3Url + urlConstant.GetRefPaymentAllocAttrByRefPaymentAllocId;

    // REF PAYMENT ALLOC GRP
    public static GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate = this.env.FoundationR3Url + urlConstant.GetRefPaymentAllocGrpByRefPaymentAllocGrpIdForUpdate;
    public static AddRefPaymentAllocGrp = this.env.FoundationR3Url + urlConstant.AddRefPaymentAllocGrp;
    public static EditRefPaymentAllocGrp = this.env.FoundationR3Url + urlConstant.EditRefPaymentAllocGrp;

    // COA
    public static GetRefCoaByRefCoaId = this.env.FoundationR3Url + urlConstant.GetRefCoaByRefCoaId;
    public static GetListKvpPayAllocVendorByCategoryCode = this.env.FoundationR3Url + urlConstant.GetListKvpPayAllocVendorByCategoryCode;
    public static SubmitCoa = this.env.FoundationR3Url + urlConstant.SubmitCoa;
    public static SubmitListCoa = this.env.FoundationR3Url + urlConstant.SubmitListCoa;
    public static GetListRefCoaByCoaSchmId = this.env.FoundationR3Url + urlConstant.GetListRefCoaByCoaSchmId;
    public static GetRefCoaWithoutCoaSchemeByReqCoaObj = this.env.FoundationR3Url + urlConstant.GetRefCoaWithoutCoaSchemeByReqCoaObj;
    public static GetRefCoaWithoutCoaSchemeByReqListCoaObj = this.env.FoundationR3Url + urlConstant.GetRefCoaWithoutCoaSchemeByReqListCoaObj;

    // COA Scheme
    public static GetCoaSchmByCoaSchmId = this.env.FoundationR3Url + urlConstant.GetCoaSchmByCoaSchmId;
    public static SubmitCoaSchm = this.env.FoundationR3Url + urlConstant.SubmitCoaSchm;
    public static GetListCoaSchm = this.env.FoundationR3Url + urlConstant.GetListCoaSchm;
    public static GetListCoaSchmActive = this.env.FoundationR3Url + urlConstant.GetListCoaSchmActive;


    // View Cabinet, Rack, FIling
    public static GetListRackByCabinetCode = this.env.FoundationR3Url + urlConstant.GetListRackByCabinetCode;
    public static GetCabinetByCabinetCode = this.env.FoundationR3Url + urlConstant.GetCabinetByCabinetCode;

    public static GetListFilingByRackCodeAndCabinetCode = this.env.FoundationR3Url + urlConstant.GetListFilingByRackCodeAndCabinetCode;
    public static GetRackByRackCode = this.env.FoundationR3Url + urlConstant.GetRackByRackCode;

    public static GetRackAndListFilingByRackCodeAndCabinetCode = this.env.FoundationR3Url + urlConstant.GetRackAndListFilingByRackCodeAndCabinetCode;
    public static GetRackAndListFilingByFilingCodeAndRackId = this.env.FoundationR3Url + urlConstant.GetRackAndListFilingByFilingCodeAndRackId;
    public static GetCabinetAndListRackByCabinetCode = this.env.FoundationR3Url + urlConstant.GetCabinetAndListRackByCabinetCode;
    public static GetRackByCode = this.env.FoundationR3Url + urlConstant.GetRackByCode;
    public static GetCabinetByCode = this.env.FoundationR3Url + urlConstant.GetCabinetByCode;
    public static AddCabinet = this.env.FoundationR3Url + urlConstant.AddCabinet;
    public static EditCabinet = this.env.FoundationR3Url + urlConstant.EditCabinet;
    public static AddFiling = this.env.FoundationR3Url + urlConstant.AddFiling;
    public static EditFiling = this.env.FoundationR3Url + urlConstant.EditFiling;
    public static AddRack = this.env.FoundationR3Url + urlConstant.AddRack;
    public static EditRack = this.env.FoundationR3Url + urlConstant.EditRack;
    public static GetCabinetAndRackByRackCodeAndCabinetId = this.env.FoundationR3Url + urlConstant.GetCabinetAndRackByRackCodeAndCabinetId;

    //Auction Company
    public static AddAuctionCompany = this.env.FoundationR3Url + urlConstant.AddAuctionCompany;
    public static EditAuctionCompany = this.env.FoundationR3Url + urlConstant.EditAuctionCompany;
    public static GetVendorByIdForEdit = this.env.FoundationR3Url + urlConstant.GetVendorByIdForEdit;

    // Cust Exposure
    public static GetCustExpsrInfoByCustId = this.env.FoundationR3Url + urlConstant.GetCustExpsrInfoByCustId;
    public static GetCustExpsrInfoByCustIdAndExposureTypeForTemplate = this.env.FoundationR3Url + urlConstant.GetCustExpsrInfoByCustIdAndExposureTypeForTemplate;
    public static RequestExposure = this.env.FoundationR3Url + urlConstant.RequestExposure;
    public static RequestExposureV2 = this.env.FoundationR3Url + urlConstant.RequestExposureV2;
    public static GetListCustExpsrBucketByCustExpsrDId = this.env.FoundationR3Url + urlConstant.GetListCustExpsrBucketByCustExpsrDId;
    public static GetListCustExpsrAppAgrHistByCustExpsrHId = this.env.FoundationR3Url + urlConstant.GetListCustExpsrAppAgrHistByCustExpsrHId;

    //OTP
    public static SendOtp = this.env.FoundationR3Url + urlConstant.SendOtp;
    public static ConfirmOtp = this.env.FoundationR3Url + urlConstant.ConfirmOtp;
    public static GetOtpProperties = this.env.FoundationR3Url + urlConstant.GetOtpProperties;

    // OFFICE BANK ACCOUNT
    public static DeleteOfficeBankAcc = this.env.FoundationR3Url + urlConstant.DeleteOfficeBankAcc;
    public static GetListActiveBankName = this.env.FoundationR3Url + urlConstant.GetListActiveBankName;
    public static GetListBankAccType = this.env.FoundationR3Url + urlConstant.GetListBankAccType;
    public static GetListKeyValueActiveOfficeBankAcc = this.env.FoundationR3Url + urlConstant.GetListKeyValueActiveOfficeBankAcc;
    public static GetOfficeBankAccByOfficeBankAccId = this.env.FoundationR3Url + urlConstant.GetOfficeBankAccByOfficeBankAccId;
    public static SubmitOfficeBankAcc = this.env.FoundationR3Url + urlConstant.SubmitOfficeBankAcc;
    public static AddOfficeBankAcc = this.env.FoundationR3Url + urlConstant.AddOfficeBankAcc;
    public static EditOfficeBankAcc = this.env.FoundationR3Url + urlConstant.EditOfficeBankAcc;
    public static EditDetailOfficeBankAcc = this.env.FoundationR3Url + urlConstant.EditDetailOfficeBankAcc;

    //SYS CONFIG
    public static GetSysConfigPncplResultByCode = this.env.FoundationR3Url + urlConstant.GetSysConfigPncplResultByCode;

    // JOURNAL
    public static RerunJournal = urlConstant.RerunJournal;
    public static RerunJournalLog = urlConstant.RerunJournalLog;
    public static DownloadJournalFile = this.env.FoundationR3Url + urlConstant.DownloadJournalFile;
    public static GetJrSourceFileByJrSourceFileId = this.env.FoundationR3Url + urlConstant.GetJrSourceFileByJrSourceFileId;
    public static GetJrMHeaderAndJrMGroupByJrMHeaderId = this.env.FoundationR3Url + urlConstant.GetJrMHeaderAndJrMGroupByJrMHeaderId;
    public static SaveJrMGroup = this.env.FoundationR3Url + urlConstant.SaveJrMGroup;
    public static GetJrMGroupAndJrMGroupDFactByJrMGroupId = this.env.FoundationR3Url + urlConstant.GetJrMGroupAndJrMGroupDFactByJrMGroupId;
    public static SaveJrMGroupDFact = this.env.FoundationR3Url + urlConstant.SaveJrMGroupDFact;
    public static GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId = this.env.FoundationR3Url + urlConstant.GetJrMHeaderAndJrMHeaderFactAndJrMEntityByJrMHeaderId;
    public static SaveJrMHeaderFact = this.env.FoundationR3Url + urlConstant.SaveJrMHeaderFact;
    public static GetJrMGroupAndJrMItemValueByJrMGroupId = this.env.FoundationR3Url + urlConstant.GetJrMGroupAndJrMItemValueByJrMGroupId;
    public static SaveJrMItemValue = this.env.FoundationR3Url + urlConstant.SaveJrMItemValue;
    public static SaveJrMEntity = this.env.FoundationR3Url + urlConstant.SaveJrMEntity;
    public static AddJrMHeader = this.env.FoundationR3Url + urlConstant.AddJrMHeader;
    public static GetJournalResultByJrMsgHId = this.env.FoundationR3Url + urlConstant.GetJournalResultByJrMsgHId;
    public static UploadJournalFile = this.env.FoundationR3Url + urlConstant.UploadJournalFile;
    public static UploadJournalFileV2 = this.env.FoundationR3Url + urlConstant.UploadJournalFileV2;
    public static GetJournalLogFailedByJournalLogId = this.env.FoundationR3Url + urlConstant.GetJournalLogFailedByJournalLogId;

    // Industry Type Category
    public static AddEditIndustryTypeCategory = this.env.FoundationR3Url + urlConstant.AddEditIndustryTypeCategory;
    public static GetIndustryTypeCategoryByIndustryTypeCategoryId = this.env.FoundationR3Url + urlConstant.GetIndustryTypeCategoryByIndustryTypeCategoryId;

    // Sector Economy Slik
    public static GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId = this.env.FoundationR3Url + urlConstant.GetRefSectorEconomySlikCustomObjectByRefSectorEconomySlikId;

    // CUST FIN DATA ATTR CONTENT
    public static GetListCustFinDataAttrContentByCustIdAndListAttrGroup = this.env.FoundationR3Url + urlConstant.GetListCustFinDataAttrContentByCustIdAndListAttrGroup;
    public static AddCustFinDataAttrContent = this.env.FoundationR3Url + urlConstant.AddCustFinDataAttrContent;
    public static GetCustFinDataAttrContentForCustViewByCustId = this.env.FoundationR3Url + urlConstant.GetCustFinDataAttrContentForCustViewByCustId;


    // LICENSE
    public static UploadLicense = this.env.FoundationR3Url + urlConstant.UploadLicense;
    public static GetLicenses = this.env.FoundationR3Url + urlConstant.GetLicenses;
    public static RetrieveLicenseDetail = this.env.FoundationR3Url + urlConstant.RetrieveLicenseDetail;

    // LIST IFRAME VIEW
    public static GetCustListIframeView = this.env.FoundationR3Url + urlConstant.GetCustListIframeView;

    //REF STATUS
    public static GetListActiveRefStatusByStatusGrpCode = this.env.FoundationR3Url + urlConstant.GetListActiveRefStatusByStatusGrpCode;
    // MASTER SEQUENCE
    public static GenerateTransactionNoFromRedis = this.env.FoundationR3Url + urlConstant.GenerateTransactionNoFromRedis;

    // THIRD PARTY RSLT
    public static GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode = this.env.FoundationR3Url + urlConstant.GetFirstRequestedThirdPartyRsltHByTrxNoAndSvcTypeCode;
    public static GetThirdPartyTrustsocRsltByThirdPartyRsltHId = this.env.FoundationR3Url + urlConstant.GetThirdPartyTrustsocRsltByThirdPartyRsltHId;
    public static UploadConsentTrustingSocial = this.env.FoundationR3Url + urlConstant.UploadConsentTrustingSocial;
    public static UploadConsentTrustingSocialV2 = this.env.FoundationR3Url + urlConstant.UploadConsentTrustingSocialV2;
    public static UploadConsentTrustingSocialV21 = this.env.FoundationR3Url + urlConstant.UploadConsentTrustingSocialV21;
    public static GetListThirdPartyTrustingSocialByTrxNo = this.env.FoundationR3Url + urlConstant.GetListThirdPartyTrustingSocialByTrxNo;
    public static SaveCustDocFile = this.env.FoundationR3Url + urlConstant.SaveCustDocFile;
    public static SaveCustDocFile21 = this.env.FoundationR3Url + urlConstant.SaveCustDocFile21;

    //DIGITALIZATION
    public static AddTrxSrcDataForTrustingSocial = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForTrustingSocial;
    public static AddTrxSrcDataForTrustingSocialV2 = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForTrustingSocialV2;
    public static AddTrxSrcDataForPefindo = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForPefindo;
    public static AddTrxSrcDataForPefindoV2 = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForPefindoV2;
    public static AddTrxScrDataForAsliRi = this.env.FoundationR3Url + urlConstant.AddTrxScrDataForAsliRi;
    public static GetTrxSrcDataForAsliRi = this.env.FoundationR3Url + urlConstant.GetTrxSrcDataForAsliRi;
    public static GetTrxResultDataForCbasSlik = this.env.FoundationR3Url + urlConstant.GetTrxResultDataForCbasSlik;
    public static GetCbasSlikLatestTrxNoByKtpNoNpwp = this.env.FoundationR3Url + urlConstant.GetCbasSlikLatestTrxNoByKtpNoNpwp;
    public static AddTrxSrcDataForCbasSlik = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForCbasSlik;

    //PEFINDO
    public static GetViewMOSummary = this.env.FoundationR3Url + urlConstant.GetViewMOSummary;
    public static GetViewPefindoScore = this.env.FoundationR3Url + urlConstant.GetViewPefindoScore;
    public static GetViewSubjectInfoPersonal = this.env.FoundationR3Url + urlConstant.GetViewSubjectInfoPersonal;
    public static GetViewSubjectInfoCompany = this.env.FoundationR3Url + urlConstant.GetViewSubjectInfoCompany;
    public static GetViewContracts = this.env.FoundationR3Url + urlConstant.GetViewContracts;
    public static GetViewPefindoAlertQuest = this.env.FoundationR3Url + urlConstant.GetViewPefindoAlertQuest;
    public static GetViewSecurities = this.env.FoundationR3Url + urlConstant.GetViewSecurities;
    public static GetViewOtherLiabilities = this.env.FoundationR3Url + urlConstant.GetViewOtherLiabilities;
    public static GetViewInvolvements = this.env.FoundationR3Url + urlConstant.GetViewInvolvements;
    public static GetViewRelations = this.env.FoundationR3Url + urlConstant.GetViewRelations;
    public static GetViewInquiries = this.env.FoundationR3Url + urlConstant.GetViewInquiries;
    public static GetViewDisputes = this.env.FoundationR3Url + urlConstant.GetViewDisputes;
    public static GetViewFinancialStatements = this.env.FoundationR3Url + urlConstant.GetViewFinancialStatements;
    public static PefindoSmartSearch = this.env.FoundationR3Url + urlConstant.PefindoSmartSearch;
    public static GetPefindoContracts = this.env.FoundationR3Url + urlConstant.GetPefindoContracts;
    public static GetViewSubjectInfoAllHistory = this.env.FoundationR3Url + urlConstant.GetViewSubjectInfoAllHistory;
    public static GetPefindoMultiResultByGroupTrxNo = this.env.FoundationR3Url + urlConstant.GetPefindoMultiResultByGroupTrxNo;
    public static AddTrxSrcDataForPefindoMultiResult = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForPefindoMultiResult;
    public static GetPefindoTrxSrcData = this.env.FoundationR3Url + urlConstant.GetPefindoTrxSrcData;
    public static PefindoSmartSearchV2 = this.env.FoundationR3Url + urlConstant.PefindoSmartSearchV2;
    public static AddTrxSrcDataForPefindoMultiResultV2 = this.env.FoundationR3Url + urlConstant.AddTrxSrcDataForPefindoMultiResultV2;

    // THINGS TO DO
    public static GetThingsToDoByRole = this.env.FoundationR3Url + urlConstant.GetThingsToDoByRole;
    public static GetThingsToDoByRoleV2 = this.env.FoundationR3Url + urlConstant.GetThingsToDoByRoleV2;

    // CUST DOC FILE
    public static GetListCustDocFileByCustId = this.env.FoundationR3Url + urlConstant.GetListCustDocFileByCustId;

    // REF TC
    public static AddRefTc = this.env.FoundationR3Url + urlConstant.AddRefTc;
    public static EditRefTc = this.env.FoundationR3Url + urlConstant.EditRefTc;
    public static GetRefTcById = this.env.FoundationR3Url + urlConstant.GetRefTcById;

    public static GetCustCompanyLegalDocByCustCompanyLegalDocId = this.env.FoundationR3Url + urlConstant.GetCustCompanyLegalDocByCustCompanyLegalDocId;

    //SAVE THIRDPARTYTRXNO
    public static SaveCustThirdPartyTrxNo = this.env.FoundationR3Url + urlConstant.SaveCustThirdPartyTrxNo;

    //Generate
    public static GenerateAPIKey = this.env.FoundationR3Url + urlConstant.GenerateAPIKey;
    public static RevokeAPIKey = this.env.FoundationR3Url + urlConstant.RevokeAPIKey;

    //REF TAX OFFICE
    public static AddRefTaxOffice = this.env.FoundationR3Url + urlConstant.AddRefTaxOffice;
    public static EditRefTaxOffice = this.env.FoundationR3Url + urlConstant.EditRefTaxOffice;
    public static DeleteRefTaxOffice = this.env.FoundationR3Url + urlConstant.DeleteRefTaxOffice;
    public static GetRefTaxOfficeDetailById = this.env.FoundationR3Url + urlConstant.GetRefTaxOfficeDetailById;
    public static GetListRefTaxOfficeActive = this.env.FoundationR3Url + urlConstant.GetListRefTaxOfficeActive;
    public static GetAllActiveRefTaxOffice = this.env.FoundationR3Url + urlConstant.GetAllActiveRefTaxOffice;
    public static GetTaxScheme = this.env.TaxUrl + urlConstant.GetTaxScheme;

    public static Login = this.env.FoundationR3Url + urlConstant.Login;
    public static LoginV2 = this.env.FoundationR3Url + urlConstant.LoginV2;
    public static LoginV4 = this.env.FoundationR3Url + urlConstant.LoginV4;
    public static LoginWithToken = this.env.FoundationR3Url + urlConstant.LoginWithToken;
    public static Logout = this.env.FoundationR3Url + urlConstant.Logout;
    public static LogoutV2 = this.env.FoundationR3Url + urlConstant.LogoutV2;
    public static GetAllActiveRefFormByRoleCodeAndModuleCode = this.env.FoundationR3Url + urlConstant.GetAllActiveRefFormByRoleCodeAndModuleCode;
    public static GetDashboardAccessToken = this.env.FoundationR3Url + urlConstant.GetDashboardAccessToken;
    public static GetThingsToDoCamunda = this.env.FoundationR3Url_svc + urlConstant.GetThingsToDoCamunda;
    public static GetListApvTaskListByUsernameAndRoleCodeForThingsToDo = this.env.ApprovalR3Url_svc + urlConstant.GetListApvTaskListByUsernameAndRoleCodeForThingsToDo;
    public static GetListJobTitleByUsernameAndModule = this.env.FoundationR3Url + urlConstant.GetListJobTitleByUsernameAndModule;
    public static GetListJobTitleByUsernameAndModuleV2 = this.env.FoundationR3Url + urlConstant.GetListJobTitleByUsernameAndModuleV2;
    public static CheckUserSessionLog = this.env.FoundationR3Url + urlConstant.CheckUserSessionLog;

    //MENU
    public static LogoutAuth = this.env.FoundationR3Url + urlConstant.LogoutAuth;

    //SYS CTRL COY
    public static GetSysCtrlCoyBySysKey = this.env.FoundationR3Url + urlConstant.GetSysCtrlCoyBySysKey;

    //REF-USER
    public static GetRefUserByUsername = this.env.FoundationR3Url + urlConstant.GetRefUserByUsername;
    public static GetRefUserPasswordExpirationDtById = this.env.FoundationR3Url + urlConstant.GetRefUserPasswordExpirationDtById;


    //FRAMEWORK
    public static GetPagingObjectBySQL = urlConstant.GetPagingObjectBySQL; // UCPaging
    public static GetJournalResultPagingObjectBySQL = urlConstant.GetJournalResultPagingObjectBySQL;

    //NEW APPROVAL R3
    public static GetLevelVoting = urlConstant.GetLevelVoting;
    public static GetPossibleResult = urlConstant.GetPossibleResult;
    public static SubmitApproval = urlConstant.SubmitApproval;
    public static GetNextNodeMember = urlConstant.GetNextNodeMember;
    public static GetRefReasonActive = urlConstant.GetRefReasonActive;
    public static GetCanChangeMinFinalLevel = urlConstant.GetCanChangeMinFinalLevel;
    public static GetTaskHistory = urlConstant.GetTaskHistory;
    public static GetSchemesBySchemeCode = urlConstant.GetSchemesBySchemeCode;
    public static GetRefSingleCategoryByCategoryCode = urlConstant.GetRefSingleCategoryByCategoryCode;
    public static GetRefAdtQuestion = urlConstant.GetRefAdtQuestion;
    public static CreateNewRFA = urlConstant.CreateNewRFA;
    public static CreateJumpRFA = urlConstant.CreateJumpRFA;
    public static GetPossibleMemberAndAttributeExType = urlConstant.GetPossibleMemberAndAttributeExType;
    public static GetApprovalReturnHistory = urlConstant.GetApprovalReturnHistory;

    // DOWNLOAD
    public static DownloadTemplate = this.env.FoundationR3Url + urlConstant.DownloadTemplate;

    //UPLOAD
    public static UploadFileV2 = this.env.FoundationR3Url + urlConstant.UploadFileV2;

    // THINGS TO DO
    public static GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo = urlConstant.GetListWfTaskListByUsernameAndRoleCodeAndOfficeCodeForThingsToDo;

    // NotificationTemplate
    public static GetNotificationTemplateByNotificationTemplateId = this.env.NotifEngineURL + urlConstant.GetNotificationTemplateByNotificationTemplateId;
    public static GetLatestNotificationTemplateByNotificationTemplateCode = this.env.NotifEngineURL + urlConstant.GetLatestNotificationTemplateByNotificationTemplateCode;
    public static GetNotificationTemplateByNotificationTemplateCodeAndVersion = this.env.NotifEngineURL + urlConstant.GetNotificationTemplateByNotificationTemplateCodeAndVersion;
    public static AddNotificationTemplate = this.env.NotifEngineURL + urlConstant.AddNotificationTemplate;
    public static EditNotificationTemplate = this.env.NotifEngineURL + urlConstant.EditNotificationTemplate;
    public static GetListNotificationTemplateByNotificationTemplateCode = this.env.NotifEngineURL + urlConstant.GetListNotificationTemplateByNotificationTemplateCode

    public static PushNotifSubscribe = urlConstant.PushNotifSubscribe;
    public static PushNotifUnsubscribe = urlConstant.PushNotifUnsubscribe;
    public static GetNotSentPushNotif = this.env.FoundationR3Url + urlConstant.GetNotSentPushNotif;
    public static GetNotReadPushNotif = this.env.NotifEngineURL + urlConstant.GetNotReadPushNotif;
    public static UpdateReadPushNotif = this.env.NotifEngineURL + urlConstant.UpdateReadPushNotif;

    // RefNotifAttrTemplate
    public static GetListActiveRefNotifAttrTemplate = this.env.NotifEngineURL + urlConstant.GetListActiveRefNotifAttrTemplate;
    public static GetListRefNotifAttrTemplate = this.env.NotifEngineURL + urlConstant.GetListRefNotifAttrTemplate;

    // RefNotifAttrSourceContent
    public static AddListRefNotifAttrSourceContent = this.env.NotifEngineURL + urlConstant.AddListRefNotifAttrSourceContent;
    public static DeleteRefNotifAttrSourceContent = this.env.NotifEngineURL + urlConstant.DeleteRefNotifAttrSourceContent;

    // RefNotificationSource
    public static AddRefNotificationSource = this.env.NotifEngineURL + urlConstant.AddRefNotificationSource;
    public static EditRefNotificationSource = this.env.NotifEngineURL + urlConstant.EditRefNotificationSource;
    public static GetRefNotificationSourceByRefNotificationSourceId = this.env.NotifEngineURL + urlConstant.GetRefNotificationSourceByRefNotificationSourceId;

    // NotificationHistH
    public static GetNotificationHistHByNotificationHistHId = this.env.NotifEngineURL + urlConstant.GetNotificationHistHByNotificationHistHId;
    public static GetMaxSpecificUser = this.env.NotifEngineURL + urlConstant.GetMaxSpecificUser;
    public static GetEmailAttachmentAllowedFileFormat = this.env.NotifEngineURL + urlConstant.GetEmailAttachmentAllowedFileFormat;
    public static GetEmailAttachmentMaxFileSize = this.env.NotifEngineURL + urlConstant.GetEmailAttachmentMaxFileSize;

    // NotificationHistD
    public static GetNotificationHistDByNotificationHistHId = this.env.NotifEngineURL + urlConstant.GetNotificationHistDByNotificationHistHId;
    public static GetListNotificationHistDByNotificationHistHId = this.env.NotifEngineURL + urlConstant.GetListNotificationHistDByNotificationHistHId;

    // PushNotificationHist
    public static GetPushNotificationHistByNotificationHistHId = this.env.NotifEngineURL + urlConstant.GetPushNotificationHistByNotificationHistHId;
    public static GetRefUserSubscriptionByUsername = this.env.NotifEngineURL + urlConstant.GetRefUserSubscriptionByUsername;

    // SmsWaNotificationHist
    public static GetSmsWaNotificationHistByNotificationHistHId = this.env.NotifEngineURL + urlConstant.GetSmsWaNotificationHistByNotificationHistHId;

    // EmailNotificationHist
    public static GetEmailNotificationHistByNotificationHistHId = this.env.NotifEngineURL + urlConstant.GetEmailNotificationHistByNotificationHistHId;
    public static GetListEmailAttachmentByNotificationHistId = this.env.NotifEngineURL + urlConstant.GetListEmailAttachmentByNotificationHistId;

    // NotificationBroadcast
    public static SendToNotificationEngine = this.env.FoundationR3Url + urlConstant.SendToNotificationEngine;
    public static MultipleSendToNotificationEngine = this.env.FoundationR3Url + urlConstant.MultipleSendToNotificationEngine;
    public static ResendToNotificationEngine = this.env.FoundationR3Url + urlConstant.ResendToNotificationEngine;
    public static MultipleSendToNotificationEngineEmail = this.env.FoundationR3Url + urlConstant.MultipleSendToNotificationEngineEmail;
    public static ResendToNotificationEngineEmail = this.env.FoundationR3Url + urlConstant.ResendToNotificationEngineEmail;
    public static MultipleResendToNotificationEngine = this.env.FoundationR3Url + urlConstant.MultipleResendToNotificationEngine;

    // RefNotifAttrTemplate
    public static AddRefNotifAttrTemplate = this.env.NotifEngineURL + urlConstant.AddRefNotifAttrTemplate;
    public static EditRefNotifAttrTemplate = this.env.NotifEngineURL + urlConstant.EditRefNotifAttrTemplate;
    public static GetRefNotifAttrTemplateByRefNotifAttrTemplateId = this.env.NotifEngineURL + urlConstant.GetRefNotifAttrTemplateByRefNotifAttrTemplateId;

    // Ref Ins Claim Doc
    public static AddRefInsClaimDoc = this.env.FoundationR3Url + urlConstant.AddRefInsClaimDoc;
    public static EditRefInsClaimDoc = this.env.FoundationR3Url + urlConstant.EditRefInsClaimDoc;
    public static GetRefInsClaimDocByRefInsClaimDocCode = this.env.FoundationR3Url + urlConstant.GetRefInsClaimDocByRefInsClaimDocCode;

    //Bouwheer
    public static GetBouwheerCompanyIndustryInfoByBouwheerNo = this.env.FoundationR3Url + urlConstant.GetBouwheerCompanyIndustryInfoByBouwheerNo;
    public static AddEditBouwheerCompanyIndustryInfo = this.env.FoundationR3Url + urlConstant.AddEditBouwheerCompanyIndustryInfo;
    public static UploadBouwheerCompanyIndustryDoc = this.env.FoundationR3Url + urlConstant.UploadBouwheerCompanyIndustryDoc;
    public static DeleteBouwheerCompanyIndustryInfo = this.env.FoundationR3Url + urlConstant.DeleteBouwheerCompanyIndustryInfo;

    //OCR 
    public static GetOCRKTPData = this.env.FoundationR3Url + urlConstant.GetOCRKTPData;
    public static GetOCRNPWPData = this.env.FoundationR3Url + urlConstant.GetOCRNPWPData;
    
    //#region IDENTITY PROVIDER
    public static GetIdentityProviders = this.env.FoundationR3Url + urlConstant.GetIdentityProviders;
    //#endregion
}

export const envi: any = URLConstant.env;
