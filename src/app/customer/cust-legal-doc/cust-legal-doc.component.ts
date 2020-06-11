import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CustCompanyLegalDocObj } from 'app/shared/model/CustCompanyLegalDocObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustLegalDocDetailComponent } from './cust-legal-doc-detail/cust-legal-doc-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cust-legal-doc',
  templateUrl: './cust-legal-doc.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustLegalDocComponent implements OnInit {
  @Input() CustCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  
  custLegalDocs: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    var custCompanyLegalDoc = new CustCompanyLegalDocObj();
    custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
    this.httpClient.post(AdInsConstant.GetListViewCustCompanyLegalDocByCustCompanyId, custCompanyLegalDoc).subscribe(
      (response: any) => {
        this.custLegalDocs = response.ListCustCompanyLegalDoc;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openCustLegalDocDetail() {
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
            console.log(error);
          }
        );
        this.spinner.hide();
        this.toastr.successMessage(response["message"]);
      }
    ).catch(
      (error) => {
        if (error != 0) {
          console.log(error);
        }
      }
    );
  }

  deleteCustLegalDoc(custCompanyLegalDocId, idx) {
    var confirmation = confirm("Are you sure to delete this data ?");
    if(confirmation == true){
      var custCompanyLegalDoc = new CustCompanyLegalDocObj();
      custCompanyLegalDoc.CustCompanyLegalDocId = custCompanyLegalDocId;
      this.httpClient.post(AdInsConstant.DeleteCustCompanyLegalDoc, custCompanyLegalDoc).subscribe(
        (response: any) => {
          this.custLegalDocs.splice(idx, 1);
          this.toastr.successMessage(response["message"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  next() {
    this.router.navigate(['/Customer/Paging']);
  }
  back(){
    this.outputTab.emit({ stepMode: 'previous'});
  }
}
