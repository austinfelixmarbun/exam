import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { CustPersonalContactPersonObj } from 'app/shared/model/CustPersonalContactPerson.Obj.Model';
import { ActivatedRoute } from '@angular/router';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-contact-check',
  templateUrl: './customer-contact-check.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerContactCheckComponent implements OnInit {
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  isAdd: boolean;
  IdCust: number;
  tempCustomerPersonalContactPerson: any;
  custPersonContactPersonObj: CustPersonalContactPersonObj;
  resCustObj: any;
  listCustIdToExclude: Array<string>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
    this.listCustIdToExclude = new Array<string>();
  }

  ngOnInit() {
    this.getList();
  }

  keluarinValue() {
    this.isAdd = true;
    this.outputValue.emit({ isAdd: this.isAdd });
  }
  deleteItem(custId: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      this.custPersonContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonContactPersonObj.CustPersonalContactPersonId = custId;
      this.http.post(URLConstant.DeleteCustPersonalContactPerson, this.custPersonContactPersonObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.getList();
        }
      );
    }
  }

  editItem(custPersonalContactPersonId: any) {
    this.isAdd = true;
    this.outputValue.emit({ isAdd: this.isAdd, custPersonalContactPersonId: custPersonalContactPersonId });
  }

  getList() {
    this.custPersonContactPersonObj = new CustPersonalContactPersonObj();
    this.custPersonContactPersonObj.CustId = this.IdCust;
    // this.http.post(URLConstant.GetListCustPersonalContactPersonByCustId, this.custPersonContactPersonObj).subscribe(
    this.http.post(URLConstant.GetListCustPersonalEmergencyContactByCustId, {Id : this.IdCust}).subscribe(
      (response) => {
        this.tempCustomerPersonalContactPerson = response[CommonConstant.ReturnObj];
        for (const item of this.tempCustomerPersonalContactPerson) {
          if (item["ContactPersonCustNo"] != null) {
            this.listCustIdToExclude.push(item["ContactPersonCustNo"]);
          }
        }
      });
  }

  openView(ContactPersonCustNo) {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = ContactPersonCustNo
    this.http.post(URLConstant.GetCustByCustNo, {TrxNo : ContactPersonCustNo}).subscribe(
      response => {
        this.resCustObj = response;
        AdInsHelper.OpenCustomerViewByCustId(this.resCustObj.CustId);
      }
    );
  }
}
