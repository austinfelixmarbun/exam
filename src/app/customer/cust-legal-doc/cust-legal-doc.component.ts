import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CustCompanyLegalDocObj } from 'app/shared/model/CustCompanyLegalDocObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustLegalDocDetailComponent } from './cust-legal-doc-detail/cust-legal-doc-detail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-cust-legal-doc',
  templateUrl: './cust-legal-doc.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustLegalDocComponent implements OnInit {
  CustCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  custLegalDocs: any;
  IdCust: number;
  Page: string;
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });
  }

  ngOnInit() {

    var custObj = { CustId: this.IdCust };
    this.httpClient.post(URLConstant.GetCustCompanyByCustId, custObj).subscribe(
      (response: any) => {

        this.CustCompanyId = response['CustCompanyId'];
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.httpClient.post(URLConstant.GetListViewCustCompanyLegalDocByCustCompanyId, custCompanyLegalDoc).subscribe(
          (response: any) => {
            this.custLegalDocs = response.ListCustCompanyLegalDoc;
          }
        );
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
        this.httpClient.post(URLConstant.GetListViewCustCompanyLegalDocByCustCompanyId, custCompanyLegalDoc).subscribe(
          (response: any) => {
            this.custLegalDocs = response.ListCustCompanyLegalDoc;
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
    var confirmation = confirm(ExceptionConstant.DELETE_CONFIRMATION);
    if (confirmation == true) {
      var custCompanyLegalDoc = new CustCompanyLegalDocObj();
      custCompanyLegalDoc.CustCompanyLegalDocId = custCompanyLegalDocId;
      this.httpClient.post(URLConstant.DeleteCustCompanyLegalDoc, custCompanyLegalDoc).subscribe(
        (response: any) => {
          this.custLegalDocs.splice(idx, 1);
          this.toastr.successMessage(response["message"]);
        }
      );
    }
  }
  next() {
    this.router.navigate(['/Customer/Paging']);
    if (this.Page != null) {
      this.router.navigate(["/Customer/EditMainData/Paging"]);
    } else {
      this.router.navigate(["/Customer/Paging"]);
    }
  }
  // back(){
  //   this.outputTab.emit({ stepMode: 'previous'});
  // }
}
