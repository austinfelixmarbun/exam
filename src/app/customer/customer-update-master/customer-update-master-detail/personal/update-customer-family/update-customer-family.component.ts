import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-update-customer-family',
  templateUrl: './update-customer-family.component.html',
  styles: []
})
export class UpdateCustomerFamilyComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  ListAppFamily: Array<Object>;
  ListCustFamily: Array<Object>;

  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
  ) { 
    this.ResponseTab = new EventEmitter<any>();
    this.ListAppFamily = new Array<Object>();
    this.ListCustFamily = new Array<Object>();
  }

  ngOnInit() {
    this.http.post(URLConstant.GetCustFamilyDataForUpdateMasterCustFamily, { CustDataTrxId: this.CustDataTrxId }).toPromise().then(
      (response) => {
        this.ListCustFamily = response["MasterCustFamilyList"];
        this.ListAppFamily = response["AppFamilyList"];
        for (const item of this.ListAppFamily) {
          var isExist = false;
          for (const family of this.ListCustFamily) {
            if(item["CustName"] == family["CustName"]){
              isExist = true;
              break;
            }
          }
          item["IsMasterData"] = isExist;
        }
        for (const item of this.ListCustFamily) {
          item["IsMasterData"] = true;
        }
        this.ListCustFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
        this.ListAppFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  addFamilyHandler(idx){
    this.ListCustFamily.push(this.ListAppFamily[idx]);
    this.ListAppFamily.splice(idx, 1);
    this.ListCustFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
  }

  cancelFamilyHandler(idx){
    this.ListAppFamily.push(this.ListCustFamily[idx]);
    this.ListCustFamily.splice(idx, 1);
    this.ListAppFamily.sort((a, b) => (a["CustName"] > b["CustName"]) ? 1 : -1);
  }

  back(){
    
  }

  SaveValue(){
    var request = new Array<Object>();
    for (const item of this.ListCustFamily) {
      if(!item["IsMasterData"]){
        request.push(item);
      }
    }
    this.http.post(URLConstant.EditMasterCustFamily, { CustFamilyList: request }).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
}
