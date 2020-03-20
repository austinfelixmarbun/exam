import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustBankAccObj } from 'app/shared/model/CustBankAccObj.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustBankAccDetailSectionFindataComponent } from '../cust-bank-acc-detail-section-findata/cust-bank-acc-detail-section-findata.component';

@Component({
  selector: 'app-cust-bank-acc-section-findata',
  templateUrl: './cust-bank-acc-section-findata.component.html',
  styleUrls: ['./cust-bank-acc-section-findata.component.scss'],
  providers: [NGXToastrService]
})
export class CustBankAccSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  cbaFinDataList: any;

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    var custBankAccObj = new CustBankAccObj();
    custBankAccObj.CustId = this.CustId;
    this.httpClient.post(AdInsConstant.GetCBAForCustFinDataByCustId, custBankAccObj).subscribe(
      (response: any) => {
        this.cbaFinDataList = response.ListCBAForCustFinData;
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
  }

  addCustBankAcc(){
    const modalCustBank = this.modalService.open(CustBankAccDetailSectionFindataComponent);
    modalCustBank.result.then(
      (response) => {

      }
    ).catch(
      (error) => {
        console.log("ERROR MODAL");
        console.log(error);
      }
    );
    // modalCustBank.componentInstance.MrCustTypeCode = this.MrCustTypeCode;
    // modalCustBank.componentInstance.CustId = this.CustId;
    // modalCustBank.result.then(
    //   (response) => {
    //     this.spinner.show();
    //     var custGrp = new CustGrpObj();
    //     custGrp.CustId = this.CustId;
    //     this.httpClient.post(AdInsConstant.GetListCustGrpByCustIdForCustGrpTab, custGrp).subscribe(
    //       (response: any) => {
    //         this.CustGrpList = response.CustGrpObjForCustGrpTabs;
    //       }
    //     );
    //     this.spinner.hide();
    //     this.toastr.successMessage(response["message"]);
    //   }
    // );
  }

}
