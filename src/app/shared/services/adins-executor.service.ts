import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";;
import { addRangeOfficeMbr, addRangeVendorMbr, test } from "../function/supplier-function";
import { addCustToDuplicate, addCustomerCompanyAfterDuplicate, addCustomerPersonalAfterDuplicate, addEditCustAddr, addEditCustAsset, addEditCustJobData, addEditCustomer, backCust, backFromCustDuplicate, editCustomer } from "../function/customer-function";
import { addRangeAssetSchmD } from "../function/asset-function";
import { rerunJournal } from "../function/journal-function";
import { addListVerfSchemeD } from "../function/verification-function";
import { addListVerfQuestionGrpD } from "../function/verification-function";
import { addRefOfficeAreaMember } from "../function/office-area-function";
import { saveOfficeGroupMember } from "../function/ref-office-function";
import { saveListAuthForm } from "../function/role-function";
import { saveListAuthForm_Form } from "../function/form-function";
import { addHolidaySchmDUntilYear } from "../function/holiday-function";
import { ApprovalTaskService } from "./ApprovalTask.service";
import { callBackVendorPagingApproval } from "../function/approval-function";

@Injectable({
  providedIn: 'root'
})

export class AdInsExecutorService extends ExecutorService {
  constructor(private apvTaskService: ApprovalTaskService) {
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
    this.setExecutor("rerunJournal", rerunJournal);
    this.setExecutor("addListVerfSchemeD", addListVerfSchemeD);
    this.setExecutor("addListVerfQuestionGrpD", addListVerfQuestionGrpD)
    this.setExecutor("backFromCustDuplicate", backFromCustDuplicate);
    this.setExecutor("addCustomerPersonalAfterDuplicate", addCustomerPersonalAfterDuplicate);
    this.setExecutor("addCustomerCompanyAfterDuplicate", addCustomerCompanyAfterDuplicate);
    this.setExecutor("backCust", backCust);
    this.setExecutor("saveOfficeGroupMember", saveOfficeGroupMember);
    this.setExecutor("saveListAuthForm", saveListAuthForm);
    this.setExecutor("saveListAuthForm_Form", saveListAuthForm_Form);
    this.setExecutor("addHolidaySchmDUntilYear", addHolidaySchmDUntilYear);
    this.setExecutor("callBackVendorPagingApproval", callBackVendorPagingApproval);
  }
}
