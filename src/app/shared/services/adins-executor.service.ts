import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";;
import { addRangeOfficeMbr, addRangeVendorMbr, test } from "../function/supplier-function";
import { addCustToDuplicate, addCustomerCompanyAfterDuplicate, addCustomerPersonalAfterDuplicate, addEditCustAddr, addEditCustAsset, addEditCustJobData, addEditCustomer, backCust, editCustomer } from "../function/customer-function";
import { addRangeAssetSchmD } from "../function/asset-function";
import { addRefOfficeAreaMember } from "../function/office-area-function";
import { saveOfficeGroupMember } from "../function/ref-office-function";
import { saveListAuthForm } from "../function/role-function";

@Injectable({
  providedIn: 'root'
})

export class AdInsExecutorService extends ExecutorService {
  constructor() {
    super();
    this.setExecutor("addRangeVendorMbr", addRangeVendorMbr);
    this.setExecutor("addRangeOfficeMbr", addRangeOfficeMbr);
    this.setExecutor("test", test);
    this.setExecutor("addEditCustAsset", addEditCustAsset);
    this.setExecutor("addRangeAssetSchmD", addRangeAssetSchmD);
    this.setExecutor("addEditCustAddr", addEditCustAddr);
    this.setExecutor("addRefOfficeAreaMember",addRefOfficeAreaMember);
    this.setExecutor("addEditCustJobData", addEditCustJobData);
    this.setExecutor("editCustomer", editCustomer);
    this.setExecutor("addEditCustomer", addEditCustomer);
    this.setExecutor("addCustToDuplicate", addCustToDuplicate);
    this.setExecutor("addCustomerPersonalAfterDuplicate", addCustomerPersonalAfterDuplicate);
    this.setExecutor("addCustomerCompanyAfterDuplicate", addCustomerCompanyAfterDuplicate);
    this.setExecutor("backCust", backCust);
    this.setExecutor("saveOfficeGroupMember", saveOfficeGroupMember);
    this.setExecutor("saveListAuthForm", saveListAuthForm)
  }
}
