import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Response/Generic/GenericObj.Model';

@Component({
  selector: 'app-customer-company-management-shareholder-check',
  templateUrl: './customer-company-management-shareholder-check.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderCheckComponent implements OnInit {
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  @Output() IsOwner: EventEmitter<object> = new EventEmitter();
  @Input() TotalShare: number;

  tempCustCompanyObj: any;
  tempListCompanyManagementShareholder: any;

  custCompanyObj: CustCompanyObj;
  custCompanyMgmntShrholderObj: CustCompanyMgmntShrholderObj;

  IdCust: number;
  resCustObj: any;
  isOwner: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.getList();
  }

  openView(ShareholderCustNo) {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = ShareholderCustNo
    this.http.post(URLConstant.GetCustByCustNo, {TrxNo : ShareholderCustNo}).subscribe(
      response => {
        this.resCustObj = response;
        AdInsHelper.OpenCustomerViewByCustId(this.resCustObj.CustId);
      }
    );
  }

  addPersonal() {
    if (this.tempListCompanyManagementShareholder.length == 0) {
      this.outputValue.emit({ mode: 'addPersonal' });
    }
    else {
      this.outputValue.emit({ mode: 'addPersonal', TotalShare: this.tempListCompanyManagementShareholder[0].TotalShare });
    }
  }

  addCompany() {
    if (this.tempListCompanyManagementShareholder.length == 0) {
      this.outputValue.emit({ mode: 'addCompany' });
    }
    else {
      this.outputValue.emit({ mode: 'addCompany', TotalShare: this.tempListCompanyManagementShareholder[0].TotalShare });
    }
  }

  deleteItem(CustCompanyMgmntShrholderId: number) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      let reqObj: GenericObj = new GenericObj();
      reqObj.Id = CustCompanyMgmntShrholderId;
      this.http.post(URLConstant.DeleteCustCompanyMgmntShrholder, reqObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.getList();
        }
      );
    }

  }
  editItem(custCompanyMgmntShrholderObj: any) {
    if (custCompanyMgmntShrholderObj.MrCustTypeCode == RefMasterConstant.Personal) {
      this.outputValue.emit({ mode: 'addPersonal', CustCompanyMgmntShrholderId: custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId, TotalShare: this.tempListCompanyManagementShareholder[0].TotalShare });
    } else if (custCompanyMgmntShrholderObj.MrCustTypeCode == RefMasterConstant.Company) {
      this.outputValue.emit({ mode: 'addCompany', CustCompanyMgmntShrholderId: custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId, TotalShare: this.tempListCompanyManagementShareholder[0].TotalShare });
    }
  }

  getList() {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.IdCust;
    this.http.post(URLConstant.GetCustCompanyByCustId, reqObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.http.post(URLConstant.GetListCustCompanyMgmntShrholderByCustId, reqObj).subscribe(
          (response) => {
            this.tempListCompanyManagementShareholder = response["ReturnObject"]; 
            let temp = this.tempListCompanyManagementShareholder.find(element => element.IsOwner == true);
            if( temp !=null ){
              this.isOwner = true;
            }else{
              this.isOwner = false;
            } 
            this.IsOwner.emit({ isOwner: this.isOwner });
            if (this.tempListCompanyManagementShareholder.length != 0) {
              this.TotalShare = this.tempListCompanyManagementShareholder[0].TotalShare;
            } 
            //this.outputValue.emit({ TotalShare: this.TotalShare});
          });
      }
    );
  }
  //TotalShare: number;
  next() {
    this.outputValue.emit({ stepMode: 'next' });
  }

  back() {
    this.outputValue.emit({ stepMode: 'previous' });
  }
}
