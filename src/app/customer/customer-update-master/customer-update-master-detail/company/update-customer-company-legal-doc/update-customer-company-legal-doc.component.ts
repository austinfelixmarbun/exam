import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UpdateCustLegalDocObj } from 'app/shared/model/UpdateMasterCust/UpdateCustLegalDocObj.Model';

@Component({
  selector: 'app-update-customer-company-legal-doc',
  templateUrl: './update-customer-company-legal-doc.component.html',
  styles: []
})
export class UpdateCustomerCompanyLegalDocComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppLegalDoc: Array<UpdateCustLegalDocObj>;
  MasterLegalDoc: Array<UpdateCustLegalDocObj>;
  CustCompanyId: number;

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.ResponseTab = new EventEmitter<any>();
    this.AppLegalDoc = new Array<UpdateCustLegalDocObj>();
    this.MasterLegalDoc = new Array<UpdateCustLegalDocObj>();
  }

  ngOnInit() {
    this.http.post(URLConstant.GetLegalDocForUpdateMasterCustCompanyLegalDoc, { CustDataTrxId: this.CustDataTrxId}).toPromise().then(
      (response) => {
        this.AppLegalDoc = response["AppLegalDocList"];
        this.MasterLegalDoc = response["MasterLegalDocList"];
        this.CustCompanyId = response["CustCompanyId"];
        for (const item of this.MasterLegalDoc) {
          item.IsMasterData = true;
        }
        for (const item of this.AppLegalDoc) {
          var isMasterData = false;
          for (const master of this.MasterLegalDoc) {
            if(item.MrLegalDocTypeCode == master.MrLegalDocTypeCode && item.DocNo == master.DocNo){
              isMasterData = true;
              break;
            }
          }
          item.IsMasterData = isMasterData;
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  addLegalDocHandler(idx){
    this.MasterLegalDoc.push(this.AppLegalDoc[idx]);
    this.AppLegalDoc.splice(idx, 1);
  }

  cancelLegalDocHandler(idx){
    this.AppLegalDoc.push(this.MasterLegalDoc[idx]);
    this.MasterLegalDoc.splice(idx, 1);
  }

  back(){
    this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
  }

  SaveValue(){
    var request = new Array<UpdateCustLegalDocObj>();
    for (const item of this.MasterLegalDoc) {
      if(!item.IsMasterData){
        request.push(item);
      }
    }
    this.http.post(URLConstant.EditMasterCustCompanyShareholder, { CustCompanyId: this.CustCompanyId, LegalDocList: request }).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
