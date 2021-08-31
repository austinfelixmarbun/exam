import { PathConstant } from "app/shared/PathConstant";

export class PathConstantX{
    //#region Common Path
    public static ADD = "AddX";
    public static DETAIL = "DetailX";
    public static PAGING = "PagingX";
    public static EDIT = "EditX";
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
    public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_PAGE;
    public static CUST_COY_PAGE = PathConstant.CUST_COY + "/" + PathConstantX.CUST_PAGE;
    public static CUST_PERSONAL_JOB_DATA = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_JOB_DATA;
    //#endregion

    //#region Vendor-Module
    public static VENDOR_ATPM_DETAIL = PathConstant.VENDOR_ATPM + "/" + PathConstantX.DETAIL;
    public static VENDOR_HO_DETAIL = PathConstant.VENDOR_HO + "/" + PathConstantX.DETAIL;
    public static VENDOR_BRANCH_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstantX.ADD;
    public static VENDOR_HOLDING_DETAIL = PathConstant.VENDOR_HOLDING + "/" + PathConstantX.DETAIL;
    public static VENDOR_BRANCH_EMP_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstantX.PAGING;
    public static VENDOR_BRANCH_EMP_DETAIL = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstantX.DETAIL;
    public static VENDOR_GRADING_REQUEST_PAGING = PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstantX.PAGING;
    public static VENDOR_GRADING_REQUEST_DETAIL = PathConstant.VENDOR_GRADING + "/" + PathConstant.REQUEST + "/" + PathConstantX.DETAIL;
    //#endregion

}