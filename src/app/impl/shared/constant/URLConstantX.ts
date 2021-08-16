import { environment } from "environments/environment";

export class URLConstantX{
    //REF OFFICE X 
    public static GetRefOfficeXByRefOfficeCode = environment.FoundationR3Url + "/RefOfficeX/GetRefOfficeXByRefOfficeCode";
    public static AddEditRefOfficeX = environment.FoundationR3Url + "/RefOfficeX/AddEditRefOfficeX";  

    //REF TAX OFFICE X
    public static GetListTaxOfficeName = environment.FoundationR3Url + "/RefTaxOfficeX/GetListTaxOfficeName";


    //CUSTOMER Personal
    public static EditCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/EditCustPersonalJobData";
    public static AddCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/AddCustPersonalJobData";
    public static GetCustXByCustId = environment.FoundationR3Url + "/v1" + "/CustX/GetCustXByCustId";

    //Customer Company
    public static EditCustCompany = environment.FoundationR3Url + "/v1" + "/CustCompanyX/EditCustCompany"
    
}