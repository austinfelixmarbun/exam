import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalContactPersonObj } from 'app/shared/model/CustPersonalContactPerson.Obj.Model';
import { ActivatedRoute } from '@angular/router';
import { CustObj } from 'app/shared/model/CustObj.Model';

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
  getCustomerPersonalContactPersonUrl: string;
  deleteCustomerPersonalContactPersonUrl: string;
  custPersonContactPersonObj: CustPersonalContactPersonObj;
  resCustObj:any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.getCustomerPersonalContactPersonUrl = AdInsConstant.GetListCustPersonalContactPersonByCustId;
    this.deleteCustomerPersonalContactPersonUrl = AdInsConstant.DeleteCustPersonalContactPerson;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.getList();
  }

  keluarinValue() {
    this.isAdd = true;
    this.outputValue.emit({ isAdd: this.isAdd });
  }
  deleteItem(custId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.custPersonContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonContactPersonObj.CustPersonalContactPersonId = custId;
      this.http.post(this.deleteCustomerPersonalContactPersonUrl, this.custPersonContactPersonObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.getList();
        },
        error => {
          console.log(error);
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
    this.http.post(this.getCustomerPersonalContactPersonUrl, this.custPersonContactPersonObj).subscribe(
      (response) => {
        this.tempCustomerPersonalContactPerson = response["ReturnObject"];
        // console.log("contperson")
        // console.log(this.tempCustomerPersonalContactPerson)
        // console.log("aaaa" + this.tempCustomerPersonalContactPerson);
      });
  }

  openView(ContactPersonCustNo)
  {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = ContactPersonCustNo
    this.http.post(AdInsConstant.GetCustByCustNo, custObj).subscribe(
      response => {
        this.resCustObj = response;
        window.open("/Customer/CustomerView/Page?CustId=" + this.resCustObj.CustId, "_blank");
      },
      error => {
        console.log(error);
      }
    );
  }
}
