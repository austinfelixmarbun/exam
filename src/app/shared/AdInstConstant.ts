import { formatDate } from "@angular/common";

export class AdInsConstant {
    public static RestrictionLike = "Like";
    public static RestrictionEq = "Eq";
    public static showData = "10,50,100";
    public static GetListProduct = "http://creator_websvr:7272/NEW_FINANCING/api/Catalog/getPopularViewByCriteria";

    public static Login = "/UserManagement/HTML5Login";
    public static GetListOffice = "/RefOffice/GetRefOfficePaging";

    public static GetProvince = "/los/v1/get_provinsi";
    public static GetCityByProvince = "/los/v1/get_kota";
    public static getProspectByProspectNo = "/api/MobileProspectTask/GetProspectByProspectNo";
    public static submitNCProspect = "/api/MobileProspectTask/submitNCProspect";
    public static addCustPersonal = "";

    //GENERAL SETTING
    public static GetBusinessDt = "/GeneralSetting/GetBusinessDate";

    //REF OFFICE
    public static getRefOfficeObj = "/RefOffice/GetRefOfficeObj";
    public static GetRefOfficeActiveAndNonVirtualKeyValue = "/RefOffice/GetRefOfficeActiveAndNonVirtualKeyValue";
    public static GetAllRefOffice = "/RefOffice/GetAllRefOffice";
    public static GetListUpperHierarchyRefOfficeByRefOrgId = "/RefOffice/GetListUpperHierarchyRefOfficeByRefOrgId";
    
    //REF OFFICE AREA
    public static GetAllListArea = "/RefOfficeArea/GetAllListArea";

    //ORGANIZATION
    public static GetRefOrg = "/OrganizationDefinition/GetRefOrg";
    public static EditRefOrgWithOldParentId = "/OrganizationDefinition/EditRefOrgWithOldParentId";
    public static DeleteRefOrg = "/OrganizationDefinition/DeleteRefOrg";
    public static GetListAllRefOrg = "/OrganizationDefinition/GetListAllRefOrg";
    public static AddRefOrg = "/OrganizationDefinition/AddRefOrg";
    public static GetRefOrgPaging = "/OrganizationDefinition/GetRefOrgPaging";
    public static GetAllRefBizUnit = "/OrganizationDefinition/GetAllRefBizUnit";
    public static GetOrgJobTitleByMdlStruc = "/OrganizationDefinition/GetOrgJobTitleByMdlStruc";
    public static GetRefBizUnitByOffice = "/OrganizationDefinition/GetRefBizUnitByOffice";
    public static GetAllOrgMdl = "/OrganizationDefinition/GetAllOrgMdl";
    public static GetAllActiveOrgMdlByRefOrgId = "/OrganizationDefinition/GetAllActiveOrgMdlByRefOrgId";
    
    //REF-JOB-TITLE
    public static GetRefJobTitle = "/OrganizationDefinition/GetRefJobTitlePaging";
    public static AddRefJobTitle = "/OrganizationDefinition/AddRefJobTitle";
    public static EditRefJobTitle = "/OrganizationDefinition/EditRefJobTitle";
    public static DeleteRefJobTitle = "/OrganizationDefinition/DeleteRefJobTitle";
    public static GetJobPositionLvl = "/OrganizationDefinition/GetJobPositionLvl";
    public static GetRefJobTitleById = "/OrganizationDefinition/GetRefJobTitleByRefJobTitleId";

    //REF-BANK
    public static GetBankPaging = "/RefBank/GetRefBankPaging";
    public static GetBank = "/RefBank/GetBank";
    public static EditRefBank = "/RefBank/EditRefBank";
    public static AddRefBank = "/RefBank/AddRefBank";
    public static DeleteRefBank = "/RefBank/DeleteRefBank";

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
    public static GetEmpListByOfficeIdAndIsActive = "/RefEmp/GetEmpListByOfficeIdAndIsActive";
    
    //EMP_POSITION
    public static GetEmpPositionPaging = "/EmpPosition/GetEmpPositionPaging";
    public static GetEmpByEmpPositionId = "/EmpPosition/GetEmpByEmpPositionId";
    public static AddEmpPosition = "/EmpPosition/AddEmpPosition";
    public static EditEmpPosition = "/EmpPosition/EditEmpPosition";
    public static DeleteEmpPosition = "/EmpPosition/DeleteEmpPosition";
    
    //SYSTEM-SETTING
    //REF-USER
    public static GetRefUserPaging = "/UserManagement/GetRefUserPaging";
    public static AddRefUser = "/UserManagement/AddRefUser";
    public static EditRefUser = "/UserManagement/EditRefUser";
    public static ChangePassword = "/UserManagement/ChangePassword";
    public static GetRefUser = "/UserManagement/GetRefUser";
    public static GetUserByUsername = "/UserManagement/GetUserByUsername"
    public static ValidatePwd = "/UserManagement/ValidatePwd"

    //REF-ROLE
    public static GetRefRolePaging = "/UserManagement/GetRefRolePaging";
    public static AddRefRole = "/UserManagement/AddRefRole";
    public static EditRefRole = "/UserManagement/EditRefRole";
    public static DeleteRefRole = "/UserManagement/DeleteRefRole";
    public static GetRefRoleByRefRoleId = "/RefRole/GetRefRoleByRefRoleId";
    public static GetRefRole = "/RefRole/GetRefRole";
    public static GetListDataCurrentUser = "/UserManagement/GetListDataCurrentUser";

    //ZIPCODE
    public static GetRefZipcodePaging = "/RefZipcode/GetRefZipcodePaging";
    public static GetRefZipCode = "/RefZipcode/GetRefZipcode";
    public static GetRefProvDistrictObj = "/RefProvDistrict/GetRefProvDistrict";
    public static EditRefZipcode = "/RefZipcode/EditRefZipCode";
    public static AddRefZipcode = "/RefZipcode/AddRefZipCode";
    public static DeleteRefZipcode = "/RefZipcode/DeleteRefZipCode"

    //BUSINESS UNIT
    public static GetBusinessUnitPaging = "/OrganizationDefinition/GetRefBizUnitPaging";
    public static GetRefBizUnit = "/OrganizationDefinition/GetRefBizUnit";
    public static AddRefBizUnit = "/OrganizationDefinition/AddRefBizUnit";
    public static EditRefBizUnit = "/OrganizationDefinition/EditRefBizUnit";

    //REF COY
    public static GetRefCoyPaging = "/RefCoy/GetRefCoyPaging";
    public static GetBodCoyPaging = "";
    public static AddCoyBod = "/CoyBod/AddCoyBOD";
    public static EditCoyBod = "/CoyBod/EditCoyBOD";
    public static DeleteCoyBod = "/CoyBod/DeleteCoyBOD";
    public static GetCoyBod = "/CoyBod/GetCoyBod";
    public static GetCommissionerPaging = "";
    public static AddCoyCommissioner = "/CoyCommissioner/AddCoyCommissioner";
    public static EditCoyCommissioner = "/CoyCommissioner/EditCoyCommissioner";
    public static DeleteCoyCommissioner = "/CoyCommissioner/DeleteCoyCommissioner";
    public static GetCoyCommissioner = "/CoyCommissioner/GetCoyCommissioner";

    //REF MASTER
    public static GetRefMasterList = "/RefMaster/GetRefMasterList";

    //REF PROV DISTRICT
    public static GetRefProvDistrictPaging = "/RefProvDistrict/GetRefProvDistrictPaging";
    //MENU
    public static GetAllActiveRefFormByRefRoleId = "/MenuManagement/GetAllActiveRefFormByRefRoleId";

    //HOLIDAY
    public static GetAllActiveHolidaySchmH = "/Holiday/GetAllActiveHolidaySchmH";

    //WORK HOUR
    public static GetListOfWorkingHourSchm = "/WorkHour/GetListOfWorkingHourSchm";

}
