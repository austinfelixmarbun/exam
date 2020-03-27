import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustGrpObj } from 'app/shared/model/CustGrpObj.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustGroupTabDetailComponent } from './cust-group-tab-detail/cust-group-tab-detail.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WizardComponent } from 'angular-archwizard';

// <app-cust-group-tab [CustId]="'2'" [MrCustTypeCode]="'PERSONAL'"></app-cust-group-tab>

@Component({
  selector: 'app-cust-group-tab',
  templateUrl: './cust-group-tab.component.html',
  styleUrls: ['./cust-group-tab.component.scss'],
  providers: [NGXToastrService]
})
export class CustGroupTabComponent implements OnInit {
  @Input() CustId: number;
  @Input() MrCustTypeCode: string;
  CustGrpList: any;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService, private wizard: WizardComponent
  ) { }

  ngOnInit() {
    var custGrp = new CustGrpObj();
    custGrp.CustId = this.CustId;
    this.httpClient.post(AdInsConstant.GetListCustGrpByCustIdForCustGrpTab, custGrp).subscribe(
      (response: any) => {
        this.CustGrpList = response.CustGrpObjForCustGrpTabs;
      }
    );
  }

  openModalAddCustGroup() {
    const modalCustGrp = this.modalService.open(CustGroupTabDetailComponent);
    modalCustGrp.componentInstance.MrCustTypeCode = this.MrCustTypeCode;
    modalCustGrp.componentInstance.CustId = this.CustId;
    modalCustGrp.result.then(
      (response) => {
        this.spinner.show();
        var custGrp = new CustGrpObj();
        custGrp.CustId = this.CustId;
        this.httpClient.post(AdInsConstant.GetListCustGrpByCustIdForCustGrpTab, custGrp).subscribe(
          (response: any) => {
            this.CustGrpList = response.CustGrpObjForCustGrpTabs;
          }
        );
        this.spinner.hide();
        this.toastr.successMessage(response["message"]);
      }
    );
  }

  deleteCustGrp(CustGrpId, i) {
    var custGrp = new CustGrpObj();
    custGrp.CustGrpId = CustGrpId;
    this.httpClient.post(AdInsConstant.DeleteCustGrp, custGrp).subscribe(
      (response: any) => {
        this.CustGrpList.splice(i, 1);
        this.toastr.successMessage(response["message"]);
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
  }
  next() {
    this.wizard.goToNextStep();
  }
}
