import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";;
import { addRangeOfficeMbr, addRangeVendorMbr, test } from "../function/supplier-function";
import { addEditCustAsset } from "../function/customer-function";
import { addRangeAssetSchmD } from "../function/asset-function";

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
  }
}