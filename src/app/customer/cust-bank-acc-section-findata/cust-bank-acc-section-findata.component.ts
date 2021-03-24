import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { CustBankAccObj } from 'app/shared/model/CustBankAccObj.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustBankAccDetailSectionFindataComponent } from '../cust-bank-acc-detail-section-findata/cust-bank-acc-detail-section-findata.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-cust-bank-acc-section-findata',
  templateUrl: './cust-bank-acc-section-findata.component.html',
  providers: [NGXToastrService] 
})
export class CustBankAccSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  cbaFinDataList: any;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    var custBankAccObj = new CustBankAccObj();
    custBankAccObj.CustId = this.CustId;
    this.httpClient.post(URLConstant.GetCBAForCustFinDataByCustId, {id : this.CustId}).subscribe(
      (response: any) => {
        this.cbaFinDataList = response.ListCBAForCustFinData;
      }
    );
  }

  custBankHandler(type, custBankAccId){
    const modalCustBank = this.modalService.open(CustBankAccDetailSectionFindataComponent);
    modalCustBank.componentInstance.CustId = this.CustId;
    modalCustBank.componentInstance.pageType = type;
    modalCustBank.componentInstance.CustBankAccId = custBankAccId;
    modalCustBank.componentInstance.isAddBankStatement = type == "editStmnt" ? true : false;
    switch (type) {
      case "add":
        modalCustBank.componentInstance.modalTitle = "Add New Customer Bank Account";
        break;

      case "editStmnt":
        modalCustBank.componentInstance.modalTitle = "Add New Customer Bank Statement";
        break;

      case "edit":
        modalCustBank.componentInstance.modalTitle = "Edit Customer Bank Account";
        break;
    
      default:
        break;
    }
    
    modalCustBank.result.then(
      (response) => {
        this.spinner.show();
        var custBankAccObj = new CustBankAccObj();
        this.httpClient.post(URLConstant.GetCBAForCustFinDataByCustId, {id : this.CustId}).subscribe(
          (response: any) => {
            this.cbaFinDataList = response.ListCBAForCustFinData;
          }
        );
        this.spinner.hide();
        this.toastr.successMessage(response["message"]);
      }
    ).catch(
      (error) => {
        if(error != 0){
          console.log(error);
        }
      }
    );
  }
}
