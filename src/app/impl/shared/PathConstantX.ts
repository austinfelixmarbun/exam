import { PathConstant } from "app/shared/PathConstant";

export class PathConstantX{
    //region Common Path
    public static ADD = "AddX";

    //region Customer
    public static CUST_PAGE = "PageX";
    public static CUST_JOB_DATA = "JobDataX";
    public static CUST_NON_PRO = "NonProX";
    public static CUST_PERSONAL_PAGE = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_PAGE;
    public static CUST_COY_PAGE = PathConstant.CUST_COY + "/" + PathConstantX.CUST_PAGE;
    public static CUST_PERSONAL_JOB_DATA = PathConstant.CUST_PERSONAL + "/" + PathConstantX.CUST_JOB_DATA;
    public static CUST_PERSONAL_JOB_DATA_NON_PRO = PathConstant.CUST_PERSONAL + "/" + PathConstant.CUST_JOB_DATA + "/" + PathConstantX.CUST_NON_PRO;
}