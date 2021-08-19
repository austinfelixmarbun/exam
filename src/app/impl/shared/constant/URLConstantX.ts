import { environment } from "environments/environment";

export class URLConstantX{
    //REF OFFICE X 
    public static GetRefOfficeXByRefOfficeCode = environment.FoundationR3Url + "/RefOfficeX/GetRefOfficeXByRefOfficeCode";
    public static AddEditRefOfficeX = environment.FoundationR3Url + "/RefOfficeX/AddEditRefOfficeX";  

    //REF TAX OFFICE X
    public static GetListTaxOfficeName = environment.FoundationR3Url + "/RefTaxOfficeX/GetListTaxOfficeName";
    
    //CUSTOMER JOB DATA X
    public static AddCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/AddCustPersonalJobData";
    public static EditCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/EditCustPersonalJobData";
    public static GetCustPersonalJobDataByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/GetCustPersonalJobDataByCustIdX";

    //CUSTOMER COMPANY 
    public static GetCustCompanyByCustId = environment.FoundationR3Url + "/v1" + "/CustCompanyX/GetCustCompanyByCustId"
    public static EditCustCompany = environment.FoundationR3Url + "/v1" + "/CustCompanyX/EditCustCompany"

    //REF SECTOR ECONOMY SLIK X
    public static GetRefSectorEconomySlikXById = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/GetRefSectorEconomySlikXById"
}