import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";;
import { addRangeVendorMbr } from "../function/supplier-function";

@Injectable({
  providedIn: 'root'
})

export class AdInsExecutorService extends ExecutorService { 
  constructor() {
    super();
    this.setExecutor("addRangeVendorMbr", addRangeVendorMbr);
  }

}