import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";;
import { addRangeOfficeMbr, addRangeVendorMbr, test } from "../function/supplier-function";
import { addCustToDuplicate, addEditCustAddr, addEditCustAsset, editCustomer } from "../function/customer-function";
import { addRangeAssetSchmD } from "../function/asset-function";
import { rerunJournal } from "../function/journal-function";
import { addListVerfSchemeD } from "../function/verification-function";
import { addListVerfQuestionGrpD } from "../function/verification-function";

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
    this.setExecutor("editCustomer", editCustomer);
    this.setExecutor("addCustToDuplicate", addCustToDuplicate);
    this.setExecutor("rerunJournal", rerunJournal);
    this.setExecutor("addListVerfSchemeD", addListVerfSchemeD);
    this.setExecutor("addListVerfQuestionGrpD", addListVerfQuestionGrpD)
  }
}