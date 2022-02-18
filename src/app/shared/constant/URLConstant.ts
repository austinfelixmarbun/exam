import { environment } from "environments/environment";
import { EnviConfigService } from "../services/enviConfig.service";
import { UrlConstantService } from "../services/urlConstant.service";

// URL" API di concat dengan environment url + version + api path
// KECUALI: API" yang di pakai di UC". contoh: GetPagingObjectBySQL, DeleteFromPaging, Approval CreateNewRFA

export class URLConstant {

  // constructor(private configEnv: EnviConfigService, private configUrl: UrlConstantService){

  // }



  //REF MASTER
  // public static GetListActiveRefMaster = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCode";
  // public static GetRefMasterListKeyValueActiveByCode = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListKeyValueActiveByCode";
  // public static GetListActiveRefMasterWithMappingCodeAll = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListActiveRefMasterWithMappingCodeAll";
  // public static GetListActiveRefMasterDetail = environment.FoundationR3Url + "/v1" + "/RefMaster/GetListActiveRefMaster";

  //GENERAL SETTING
  // public static GetGeneralSettingByCode = environment.FoundationR3Url + "/v1" + "/GeneralSetting/GetGeneralSettingByCode";

  //RABBIT MQ
  // public static SendCustomerDataToRabbitMq = environment.FoundationR3Url + "/v1" + "/Cust/SendCustomerDataToRabbitMq";

  

  

  

  

  //VENDOR
  // public static GetListVendorBankAccByVendorId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetListVendorBankAccByVendorId";
  // public static AddVendorBankAcc = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/AddVendorBankAcc";
  // public static EditVendorBankAcc = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/EditVendorBankAcc";
  // public static GetVendorBankAccByVendorBankAccId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetVendorBankAccByVendorBankAccId";
  // public static DeleteVendorBankAcc = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/DeleteVendorBankAcc";
  // public static AddVendorHolding = environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorHolding";
  // public static EditVendorHolding = environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorHolding";
  // public static AddVendorATPM = environment.FoundationR3Url + "/v1" + "/Vendor/AddVendorATPM";
  // public static EditVendorATPM = environment.FoundationR3Url + "/v1" + "/Vendor/EditVendorATPM";
  // public static GetVendorAndVendorAddr = environment.FoundationR3Url + "/v1" + "/Vendor/GetVendorAndVendorTaxAddrByVendorId";
  // public static GetListVendorBankAccByVendorEmpId = environment.FoundationR3Url + "/v1" + "/VendorBankAcc/GetListVendorBankAccByVendorEmpId";

  //AUCTION COMPANY
  // public static EditAuctionCompany = environment.FoundationR3Url + "/v1" + "/AuctionCompany/EditAuctionCompany";
  // public static GetVendorByIdForEdit = environment.FoundationR3Url + "/v1" + "/AuctionCompany/GetVendorByIdForEdit";
  
}

