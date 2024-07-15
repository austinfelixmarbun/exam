import { ExecutorService } from "@adins/uctemplate";
import { Injectable } from "@angular/core";
import { addRefOfficeAreaMember } from "../function/office-area-function";
import { saveOfficeGroupMember } from "../function/ref-office-function";
import { saveListAuthForm } from "../function/role-function";
import { addeditAttributeMaster } from "../function/attribute-master-function";
import { saveListMaskingItemForm } from "../function/masking-data-function";

@Injectable({
  providedIn: 'root'
})

export class AdInsExecutorService extends ExecutorService {
  constructor() {
    super();
    this.setExecutor("addRefOfficeAreaMember",addRefOfficeAreaMember);
    this.setExecutor("saveOfficeGroupMember", saveOfficeGroupMember);
    this.setExecutor("saveListAuthForm", saveListAuthForm);
    this.setExecutor("addeditAttributeMaster", addeditAttributeMaster);
    this.setExecutor("saveListMaskingItemForm", saveListMaskingItemForm);
  }
}
