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
    
}