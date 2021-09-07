import { environment } from "environments/environment";

export class URLConstantX{
    //REF OFFICE X 
    public static GetRefOfficeXByRefOfficeCode = environment.FoundationR3Url + "/v1" + "/RefOfficeX/GetRefOfficeXByRefOfficeCode";
    public static AddRefOfficeX = environment.FoundationR3Url + "/v1" + "/RefOfficeX/AddRefOfficeX";  
    public static EditRefOfficeX = environment.FoundationR3Url + "/v1" + "/RefOfficeX/EditRefOfficeX";  

    //REF TAX OFFICE X
    public static GetListTaxOfficeName = environment.FoundationR3Url + "/v1" + "/RefTaxOfficeX/GetListTaxOfficeName";

    // CUSTOMER FIN DATA
    public static AddCustBankAcc = environment.FoundationR3Url + "/v1" + "/CustBankAccX/AddCustBankAccX";

    // CUSTOMER FIN DATA
    public static GetCBAForCustFinDataByCustId = environment.FoundationR3Url + "/v1" + "/CustBankAccX/GetCBAForCustFinDataByCustIdX";
    public static GetCustBankAccByCustBankAccIdWithRefBank = environment.FoundationR3Url + "/v1" + "/CustBankAccX/GetCustBankAccByCustBankAccIdWithRefBankX";
    public static GetCBAForCustFinDataEditModeByCustBankAccId = environment.FoundationR3Url + "/v1" + "/CustBankAccX/GetCBAForCustFinDataEditModeByCustBankAccIdX";
    public static EditCustBankAcc = environment.FoundationR3Url + "/v1" + "/CustBankAccX/EditCustBankAccX";
    public static DeleteCustBankAccAndStmnt = environment.FoundationR3Url + "/v1" + "/CustBankAccX/DeleteCustBankAccAndStmntX";

    //VENDOR
    public static GetAttrContentByVendorCodeAndVendorAttrCode = environment.FoundationR3Url + "/v1" + "/VendorAttrContentX/GetAttrContentByVendorCodeAndVendorAttrCode";
    
    // VENDOR BRANCH X
    public static AddVendorBranch = environment.FoundationR3Url + "/v1" + "/VendorX/AddVendorBranch";

    // VENDOR GRADING X
    public static GetRuleVendorGrading = environment.FoundationR3Url + "/v1" + "/VendorGradingX/GetRuleVendorGrading";

    //CUSTOMER JOB DATA X
    public static AddCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/AddCustPersonalJobData";
    public static EditCustPersonalJobData = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/EditCustPersonalJobData";
    public static GetCustXByCustId = environment.FoundationR3Url + "/v1" + "/CustX/GetCustXByCustId";

    //Customer Company
    public static EditCustCompany = environment.FoundationR3Url + "/v1" + "/CustCompanyX/EditCustCompany"
    public static GetCustCompanyByCustId = environment.FoundationR3Url + "/v1" + "/CustCompanyX/GetCustCompanyByCustId"
    
    //CUSTOMER JOB DATA X
    public static GetCustPersonalJobDataByCustId = environment.FoundationR3Url + "/v1" + "/CustPersonalJobDataX/GetCustPersonalJobDataByCustIdX";

    public static AddVendorBranchX = environment.FoundationR3Url + "/VendorX/AddVendorBranchX";
    public static GetRuleVendorGradingX = environment.FoundationR3Url + "/VendorX/GetRuleVendorGradingX";

    //REF SECTOR ECONOMY SLIK X
    public static GetRefSectorEconomySlikXById = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/GetRefSectorEconomySlikXById"
    public static AddRefSectorEconomySlikX = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/AddRefSectorEconomySlikX";
    public static EditRefSectorEconomySlikX = environment.FoundationR3Url + "/v1" + "/RefSectorEconomySlikX/EditRefSectorEconomySlikX";

    //Customer
    public static GetListCustAddrByCustIdForCustomerPersonalView = environment.FoundationR3Url +  "/v1" + "/CustX/GetListCustAddrByCustIdForCustomerPersonalView";
    public static AddCustPersonalMainDataX = environment.FoundationR3Url + "/v1" + "/CustX/AddCustPersonalMainData";
    public static GetCustomerDuplicateCheckX = environment.FoundationR3Url + "/v1" + "/CustDuplicateCheckX/GetCustomerDuplicateCheckX";
    public static GetCustPersonalbyCustIdX = environment.FoundationR3Url + "/v1" + "/CustX/GetCustByCustId";//"/CustPersonalX/GetCustPersonalByCustId"
    public static EditCustPersonalMainDataX = environment.FoundationR3Url + "/v1" + "/CustX/EditCustPersonalMainData";
}
