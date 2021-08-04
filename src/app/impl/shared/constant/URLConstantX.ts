import { environment } from "environments/environment";

export class URLConstantX{
    //REF OFFICE X 
    public static GetRefOfficeXByRefOfficeCode = environment.FoundationR3Url + "/RefOfficeX/GetRefOfficeXByRefOfficeCode";
    public static AddEditRefOfficeX = environment.FoundationR3Url + "/RefOfficeX/AddEditRefOfficeX";  

    //REF TAX OFFICE X
    public static GetListTaxOfficeName = environment.FoundationR3Url + "/RefTaxOfficeX/GetListTaxOfficeName";
    
    //REF SECTOR ECONOMY SLIK
    public static AddRefSectorEconomySlikX = environment.FoundationR3Url + "/v1/RefSectorEconomySlikX/AddRefSectorEconomySlikX";
    public static EditRefSectorEconomySlikX = environment.FoundationR3Url + "/v1/RefSectorEconomySlikX/EditRefSectorEconomySlikX";
    public static GetRefSectorEconomySlikXById = environment.FoundationR3Url + "/v1/RefSectorEconomySlikX/GetRefSectorEconomySlikXById";

}