import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustDuplicateObj } from 'app/shared/model/NewCust/CustDuplicateObj.Model';
import { DupCheckOutputSaveObj } from 'app/shared/model/NewCust/DupCheckOutputSaveObj.Model';
import { NegCustDuplicateObj } from 'app/shared/model/NewCust/NegCustDuplicateObj.Model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';

@Component({
  selector: 'app-cust-dup-check-header',
  templateUrl: './cust-dup-check-header.component.html',
})
export class CustDupCheckHeaderComponent implements OnInit {

  @Input() CustPersonalObj: ReqPersonalObj;
  @Input() CustCoyObj: ReqCoyObj;
  @Input() ResultDuplicate: Array<CustDuplicateObj> = new Array();
  @Input() ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  @Input() DuplicateStatus: string = "";
  @Input() CustType: string = CommonConstant.CustomerPersonal;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Output() outputSave: EventEmitter<DupCheckOutputSaveObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.CheckDuplicateStatus();
  }

  IsLock: boolean = false;
  CheckDuplicateStatus() {
    let tempStatus: string = this.DuplicateStatus.toLowerCase();
    if (tempStatus == "lock") this.IsLock = true;
  }

  Back() {
    this.outputCancel.emit();
  }

  SaveForm() {
    let tempObj: DupCheckOutputSaveObj = new DupCheckOutputSaveObj();
    tempObj.Key = DupCheckOutputSaveObj.KeyEditSave;
    this.outputSave.emit(tempObj);
  }

  EditCust(item: CustDuplicateObj) {
    let tempObj: DupCheckOutputSaveObj = new DupCheckOutputSaveObj();
    tempObj.Key = DupCheckOutputSaveObj.KeyEditSaveDup;
    tempObj.DuplicateObj = item;
    this.outputSave.emit(tempObj);
  }

  EditNegativeCust(item: NegCustDuplicateObj) {
    let tempObj: DupCheckOutputSaveObj = new DupCheckOutputSaveObj();
    tempObj.Key = DupCheckOutputSaveObj.KeyEditSaveDupNeg;
    tempObj.DuplicateNegativeObj = item;
    this.outputSave.emit(tempObj);
  }
}
