import { environment } from "environments/environment";

export class URLConstantX{
    //REF OFFICE X 
    public static GetRefOfficeXByRefOfficeCode = environment.FoundationR3Url + "/RefOfficeX/GetRefOfficeXByRefOfficeCode";
    public static AddRefOfficeX = environment.FoundationR3Url + "/RefOfficeX/AddRefOfficeX";  
    public static EditRefOfficeX = environment.FoundationR3Url + "/RefOfficeX/EditRefOfficeX";  

    //REF TAX OFFICE X
    public static GetListTaxOfficeName = environment.FoundationR3Url + "/RefTaxOfficeX/GetListTaxOfficeName";

    //VENDOR
    public static GetAttrContentByVendorCodeAndVendorAttrCode = environment.FoundationR3Url + "/v1" + "/VendorAttrContentX/GetAttrContentByVendorCodeAndVendorAttrCode";
    
    //CUSTOMER JOB DATA X
    public static AddCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/AddCustPersonalJobData";
    public static EditCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/EditCustPersonalJobData";
    public static GetCustXByCustId = environment.FoundationR3Url + "/v1" + "/CustX/GetCustXByCustId";

    //Customer Company
    public static EditCustCompany = environment.FoundationR3Url + "/v1" + "/CustCompanyX/EditCustCompany"
    public static GetCustCompanyByCustId = environment.FoundationR3Url + "/v1" + "/CustCompanyX/GetCustCompanyByCustId"
    
    //CUSTOMER JOB DATA X
    public static GetCustPersonalJobDataByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/GetCustPersonalJobDataByCustIdX";
    

    //REF SECTOR ECONOMY SLIK X
    public static GetRefSectorEconomySlikXById = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/GetRefSectorEconomySlikXById"
    public static AddRefSectorEconomySlikX = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/AddRefSectorEconomySlikX";
    public static EditRefSectorEconomySlikX = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/EditRefSectorEconomySlikX";
}