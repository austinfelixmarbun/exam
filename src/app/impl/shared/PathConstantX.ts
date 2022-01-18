import { PathConstant } from "app/shared/PathConstant";

export class PathConstantX{
    //#region Common Path
    public static ADD = "AddX";
    public static DETAIL = "DetailX";
    public static PAGING = "PagingX";
    public static EDIT = "EditX";
    public static INQUIRY_X = 'InquiryX'; 
    //#endregion
    
    //#region Common-Setting
    public static CS_ECONOMIC_SECTOR_SLIK = "EconomicSectorSlik";
    public static CS_ECONOMIC_SECTOR_SLIK_PAGING = PathConstantX.CS_ECONOMIC_SECTOR_SLIK + "/" + PathConstantX.PAGING;
    public static CS_ECONOMIC_SECTOR_SLIK_DETAIL = PathConstantX.CS_ECONOMIC_SECTOR_SLIK + "/" + PathConstantX.DETAIL;

    //#region Cust
    public static CUST_PAGE = "PageX";
    public static CUST_JOB_DATA = "JobDataX";
    public static LR_CUST = "Customer";
    public static CUST_PERSONAL = "CustomerPersonal";
    public static NEW_CUST = "NewCustomerX";
    public static CUST_NON_PRO = "NonProX";
    public static CUST_PERSONAL_JOB_DATA_NON_PRO = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_JOB_DATA + "/" + PathConstantX.CUST_NON_PRO;
    public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_PAGE;
    public static CUST_COY_PAGE = PathConstant.CUST_COY + "/" + PathConstantX.CUST_PAGE;
    public static CUST_PERSONAL_JOB_DATA = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_JOB_DATA;
    //#endregion
    
    //#region Vendor-Module
    public static VENDOR_REG = "RegistrationX";
    public static VENDOR_ATPM_DETAIL = PathConstant.VENDOR_ATPM + "/" + PathConstantX.DETAIL;
    public static VENDOR_HO_DETAIL = PathConstant.VENDOR_HO + "/" + PathConstantX.DETAIL;
    public static VENDOR_BRANCH_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstantX.ADD;
    public static VENDOR_HOLDING_DETAIL = PathConstant.VENDOR_HOLDING + "/" + PathConstantX.DETAIL;
    public static VENDOR_BRANCH_EMP_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstantX.PAGING;
    public static VENDOR_BRANCH_EMP_DETAIL = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstantX.DETAIL;
    public static VENDOR_GRADING_REQUEST_PAGING = PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstantX.PAGING;
    public static VENDOR_GRADING_REQUEST_DETAIL = PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstantX.DETAIL;
    public static VENDOR_HOLDING_REG = PathConstant.VENDOR_HOLDING + "/" + PathConstantX.VENDOR_REG;
    public static VENDOR_GRADING_INQUIRY_X = PathConstant.VENDOR_GRADING + "/" + PathConstantX.INQUIRY_X;
    //#endregion

    //#region View-Cust-Module
    public static VIEW_CUST_COY_MNGMNT_X = "CoyManagement/X";
    public static VIEW_CUST_COY_FINANCIAL_X = "CoyFinancial/x";
    public static VIEW_CUST_EXPSR_X = "CustExposureView/X"

    public static CUST_PAGE_X ="PageX";
    public static VENDOR_BRANCH ="BranchX";
    public static PAGING_X = "PagingX";
    public static CUST_PERSONAL_X = "CustomerX";
    public static CUST_MAIN_INFO_X ="AddCustX"
    public static CUST_VIEW_X ="CustViewX";
    public static CUST_DUP_CHECK_X = "DuplicateCheckX";
    public static LR_CUSTX = "CustomerX";
    public static CUST_PAGING_X = "CustomerX";
    public static VIEW_CUST_PERSONAL_DETAIL_X = "PersonalDetailX";
    public static PERSONAL_X = "PersonalX";
    public static CUST_FAMILY_X = "CustFamily";

    //public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_PAGE;
    public static VENDOR_BRANCH_ADD_X = PathConstantX.VENDOR_BRANCH + "/" + PathConstantX.ADD;
    public static VENDOR_BRANCH_VERIF_DETAIL_APV_X = `${PathConstant.VENDOR_BRANCH}/${PathConstant.VERIF}/${PathConstant.APPRV}/${PathConstant.DETAIL}`;
    public static VENDOR_BRANCH_VERIF_PAGING_APV_X = `${PathConstant.VENDOR_BRANCH}/${PathConstant.VERIF}/${PathConstant.APPRV}/${PathConstant.PAGING}`;
    public static VENDOR_BRANCH_ADD_EDIT_X = `${PathConstant.VENDOR_BRANCH}/${PathConstant.VERIF}/${PathConstant.APPRV}/${PathConstant.PAGING}`;

    //public static CUST_PERSONAL_MAIN_INFO_X = PathConstantX.CUST_PERSONAL_X + "/" + PathConstantX.CUST_MAIN_INFO_X;
    public static CUST_PERSONAL_MAIN_INFO_X = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_MAIN_INFO_X;
    public static CUST_COY_MAIN_INFO_X = PathConstantX.CUST_PERSONAL_X + "/" + PathConstantX.CUST_MAIN_INFO_X;
    public static CUST_MAIN_VIEW_X = PathConstantX.CUST_PERSONAL_X + "/" + PathConstantX.CUST_VIEW_X;
    public static CUST_PERSONAL_DUP_CHECK_X = PathConstantX.CUST_PERSONAL_X + "/" + PathConstantX.CUST_DUP_CHECK_X;
    public static CUST_PERSONAL_PAGE_X = PathConstantX.CUST_PERSONAL_X + "/" + PathConstantX.CUST_PAGE_X;
    public static CUST_PERSONAL_DETAIL_PAGE_X = PathConstantX.CUST_PERSONAL_X + "/" + PathConstantX.CUST_PAGE_X;
    public static CUST_EDIT_MAIN_DATA_PERSONAL_X = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstantX.PERSONAL_X;
    public static CUST_EDIT_MAIN_DATA_PAGING_X = PathConstant.CUST_EDIT_MAIN_DATA + "/" + PathConstantX.PAGING_X;
    public static CUST_FAMILY_PAGING_X = PathConstant.CUST_FAMILY + "/" + PathConstantX.PAGING_X;
    public static CUST_VIEW_PAGE_X = PathConstant.CUST_VIEW + "/" + PathConstantX.CUST_PAGE_X;

    public static VIEW_CUST_PERSONAL_JOB_DATA_X = "PersonalJobData/X";
    public static VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF_X = "PersonalJobDataNonProf/X";
    public static VIEW_CUST_PERSONAL_JOB_DATA_EMP_X = "PersonalJobDataEmp/X";
    public static VIEW_CUST_PERSONAL_JOB_DATA_SME_X = "PersonalJobDataSme/X";
    public static VIEW_CUST_COY_DETAIL_X = "CoyDetail/X";

}
