import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CustCompanyLegalDocObj } from 'app/shared/model/CustCompanyLegalDocObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustLegalDocDetailComponent } from './cust-legal-doc-detail/cust-legal-doc-detail.component';
import { WizardComponent } from 'angular-archwizard';

// Implementation : <app-cust-legal-doc [CustCompanyId]="'2'"></app-cust-legal-doc>

@Component({
  selector: 'app-cust-legal-doc',
  templateUrl: './cust-legal-doc.component.html',
  styleUrls: ['./cust-legal-doc.component.scss'],
  providers: [NGXToastrService]
})
export class CustLegalDocComponent implements OnInit {
  @Input() CustCompanyId: number;
  custLegalDocs: any;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService,private wizard: WizardComponent
  ) { }

  ngOnInit() {
    var custCompanyLegalDoc = new CustCompanyLegalDocObj();
    custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
    this.httpClient.post(AdInsConstant.GetListViewCustCompanyLegalDocByCustCompanyId, custCompanyLegalDoc).subscribe(
      (response: any) => {
        this.custLegalDocs = response.ListCustCompanyLegalDoc;
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      }
    );
  }

  openCustLegalDocDetail(){
    const modalCustLegalDoc = this.modalService.open(CustLegalDocDetailComponent);
    modalCustLegalDoc.componentInstance.CustCompanyId = this.CustCompanyId;
    modalCustLegalDoc.result.then(
      (response) => {
        this.spinner.show();
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.httpClient.post(AdInsConstant.GetListViewCustCompanyLegalDocByCustCompanyId, custCompanyLegalDoc).subscribe(
          (response: any) => {
            this.custLegalDocs = response.ListCustCompanyLegalDoc;
          },
          (error) => {
            console.log("ERROR");
            console.log(error);
          }
        );
        this.spinner.hide();
        this.toastr.successMessage(response["message"]);
      }
    ).catch(
      (error) => {
        if(error != 0){
          console.log("ERROR");
          console.log(error);
        }
      }
    );
  }

  deleteCustLegalDoc(custCompanyLegalDocId, idx){
    var custCompanyLegalDoc = new CustCompanyLegalDocObj();
    custCompanyLegalDoc.CustCompanyLegalDocId = custCompanyLegalDocId;
    this.httpClient.post(AdInsConstant.DeleteCustCompanyLegalDoc, custCompanyLegalDoc).subscribe(
      (response: any) => {
        this.custLegalDocs.splice(idx, 1);
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
