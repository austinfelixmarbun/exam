import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { WizardComponent } from 'angular-archwizard';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';

@Component({
  selector: 'app-customer-company-management-shareholder-check',
  templateUrl: './customer-company-management-shareholder-check.component.html',
  styleUrls: ['./customer-company-management-shareholder-check.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderCheckComponent implements OnInit {
  
  @Output() outputValue: EventEmitter<object> = new EventEmitter();
  getCustCompanyIdUrl: any;
  IdCust: any;
  custCompanyObj: any;
  tempCustCompanyObj: any;
  getListCompanyManagementShareholderByCustCompanyId: any;
  tempListCompanyManagementShareholder: any;
  custCompanyMgmntShrholderObj: any;
  DeleteCustCompanyMgmntShrholderUrl: any;
  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private wizard: WizardComponent) {
    this.getCustCompanyIdUrl = AdInsConstant.GetCustCompanyByCustId;
    this.getListCompanyManagementShareholderByCustCompanyId = AdInsConstant.GetListCustCompanyMgmntShrholderByCustCompanyId;
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

  addPersonal() {
    this.outputValue.emit({ mode: 'addPersonal' });
  }

  addCompany() {
    this.outputValue.emit({ mode: 'addCompany' });
  }

  deleteItem(CustCompanyMgmntShrholderId: any) {
    if(confirm('Are you sure to delete this record?')){
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
        this.http.post(this.getListCompanyManagementShareholderByCustCompanyId, this.tempCustCompanyObj).subscribe(
          (response) => {
            this.tempListCompanyManagementShareholder = response["ReturnObject"];
            console.log(this.tempListCompanyManagementShareholder);
          });
      }
    );
  }
  next() {
    this.wizard.goToNextStep();
  }
  back(){
    this.wizard.goToPreviousStep();
  }
}
