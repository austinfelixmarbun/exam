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
  getCustCompanyIdUrl: string;
  DeleteCustCompanyMgmntShrholderUrl: string;
  getListCompanyManagementShareholderByCustCompanyIdUrl: string;
  resCustObj: any;
  isOwner: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.getCustCompanyIdUrl = URLConstant.GetCustCompanyByCustId;
    this.getListCompanyManagementShareholderByCustCompanyIdUrl = URLConstant.GetListCustCompanyMgmntShrholderByCustId;
    this.DeleteCustCompanyMgmntShrholderUrl = URLConstant.DeleteCustCompanyMgmntShrholder;
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
    this.http.post(URLConstant.GetCustByCustNo, custObj).subscribe(
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

  deleteItem(CustCompanyMgmntShrholderId: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      this.custCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
      this.custCompanyMgmntShrholderObj.CustCompanyMgmntShrholderId = CustCompanyMgmntShrholderId;

      this.http.post(this.DeleteCustCompanyMgmntShrholderUrl, this.custCompanyMgmntShrholderObj).subscribe(
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
    this.custCompanyObj = new CustCompanyObj;
    this.custCompanyObj.CustId = this.IdCust;
    this.http.post(this.getCustCompanyIdUrl, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.http.post(this.getListCompanyManagementShareholderByCustCompanyIdUrl, this.tempCustCompanyObj).subscribe(
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
