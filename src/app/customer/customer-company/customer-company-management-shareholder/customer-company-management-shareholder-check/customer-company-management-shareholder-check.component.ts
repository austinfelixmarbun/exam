import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';

@Component({
  selector: 'app-customer-company-management-shareholder-check',
  templateUrl: './customer-company-management-shareholder-check.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderCheckComponent implements OnInit {
  @Output() outputValue: EventEmitter<object> = new EventEmitter();

  tempCustCompanyObj: any;
  tempListCompanyManagementShareholder: any;

  custCompanyObj: CustCompanyObj;
  custCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;

  IdCust: number;
  getCustCompanyIdUrl: string;
  DeleteCustCompanyMgmntShrholderUrl: string;
  getListCompanyManagementShareholderByCustCompanyIdUrl: string;
  resCustObj: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.getCustCompanyIdUrl = AdInsConstant.GetCustCompanyByCustId;
    this.getListCompanyManagementShareholderByCustCompanyIdUrl = AdInsConstant.GetListCustCompanyMgmntShrholderByCustCompanyId;
    this.DeleteCustCompanyMgmntShrholderUrl = AdInsConstant.DeleteCustCompanyMgmntShrholder;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.getList();
  }

  openView(ShareholderCustNo)
  {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = ShareholderCustNo
    this.http.post(AdInsConstant.GetCustByCustNo, custObj).subscribe(
      response => {
        this.resCustObj = response;
        window.open("../Customer/CustomerView/Page?CustId=" + this.resCustObj.CustId, "_blank");
      },
      error => {
        console.log(error);
      }
    );
  }

  addPersonal() {
    this.outputValue.emit({ mode: 'addPersonal' });
  }

  addCompany() {
    this.outputValue.emit({ mode: 'addCompany' });
  }

  deleteItem(CustCompanyMgmntShrholderId: any) {
    if (confirm('Are you sure to delete this record?')) {
      this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
      this.custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId = CustCompanyMgmntShrholderId;

      console.log(CustCompanyMgmntShrholderId);
      this.http.post(this.DeleteCustCompanyMgmntShrholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
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
  editItem(custCompanyMgmntShrholderObj: any) {
    if (custCompanyMgmntShrholderObj.MrCustTypeCode == RefMasterConstant.Personal) {
      this.outputValue.emit({ mode: 'addPersonal', CustCompanyMgmntShrholderId: custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId });
    } else if (custCompanyMgmntShrholderObj.MrCustTypeCode == RefMasterConstant.Company) {
      this.outputValue.emit({ mode: 'addCompany', CustCompanyMgmntShrholderId: custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId });
    }
  }
  getList() {
    this.custCompanyObj = new CustCompanyObj;
    this.custCompanyObj.CustId = this.IdCust;
    this.http.post(this.getCustCompanyIdUrl, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.http.post(this.getListCompanyManagementShareholderByCustCompanyIdUrl, this.tempCustCompanyObj).subscribe(
          (response) => {
            this.tempListCompanyManagementShareholder = response["ReturnObject"];
            console.log(this.tempListCompanyManagementShareholder);
          });
      }
    );
  }
  next() {
    this.outputValue.emit({ stepMode: 'next'});
  }
  back() {
    this.outputValue.emit({ stepMode: 'previous'});
  }
}
