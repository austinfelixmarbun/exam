import { PathConstant } from "app/shared/PathConstant";

export class PathConstantX{
    //region Common Path
    public static ADD = "AddX";
    public static DETAIL = "DetailX";
    public static PAGING = "PagingX";
    //#endregion

    //#region Cust
    public static CUST_PAGE = "PageX";
    public static LR_CUST = "Customer";
    public static CUST_PERSONAL = "CustomerPersonal";
    public static NEW_CUST = "NewCustomerX";
    public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_PAGE;
    //#endregion

    //#region Vendor-Module
    public static VENDOR_ATPM_DETAIL = PathConstant.VENDOR_ATPM + "/" + PathConstantX.DETAIL;
    public static VENDOR_HO_DETAIL = PathConstant.VENDOR_HO + "/" + PathConstantX.DETAIL;
    public static VENDOR_BRANCH_ADD = PathConstant.VENDOR_BRANCH + "/" + PathConstantX.ADD;
    public static VENDOR_HOLDING_DETAIL = PathConstant.VENDOR_HOLDING + "/" + PathConstantX.DETAIL;
    public static VENDOR_BRANCH_EMP_PAGING = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstantX.PAGING;
    public static VENDOR_BRANCH_EMP_DETAIL = PathConstant.VENDOR_BRANCH + "/" + PathConstant.VENDOR_EMP + "/" + PathConstantX.DETAIL;
    //#endregion

}