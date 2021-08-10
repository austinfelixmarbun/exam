import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CustCompanyLegalDocObj } from 'app/shared/model/CustCompanyLegalDocObj.Model';
import { CustLegalDocDetailComponent } from './cust-legal-doc-detail/cust-legal-doc-detail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { String } from 'typescript-string-operations';


@Component({
  selector: 'app-cust-legal-doc',
  templateUrl: './cust-legal-doc.component.html',
  styleUrls: []
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
    this.httpClient.post(URLConstant.GetCustCompanyByCustId, { Id: this.IdCust}).subscribe(
      (response: any) => {

        this.CustCompanyId = response['CustCompanyId'];
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.httpClient.post(URLConstant.GetListViewCustCompanyLegalDocByCustCompanyId, {Id : this.CustCompanyId}).subscribe(
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
    modalCustLegalDoc.componentInstance.CustLegalDocs = this.custLegalDocs;
    modalCustLegalDoc.result.then(
      (response) => {
        this.spinner.show();
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.httpClient.post(URLConstant.GetListViewCustCompanyLegalDocByCustCompanyId, {Id : this.CustCompanyId}).subscribe(
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

  deleteCustLegalDoc(custCompanyLegalDocId: number, idx: number) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      let reqObj: GenericObj = new GenericObj();
      reqObj.Id = custCompanyLegalDocId
      this.httpClient.post(URLConstant.DeleteCustCompanyLegalDoc, reqObj).subscribe(
        (response: any) => {
          this.custLegalDocs.splice(idx, 1);
          this.toastr.successMessage(response["message"]);
        }
      );
    }
  }
  next() {    
    var groupedCustLegalDoc = this.groupBy(this.custLegalDocs, function (item) {
      return [item.MrLegalDocTypeCode, item.DocNo];
    });

    var duplCustLegalDoc = groupedCustLegalDoc.find(x => x.length > 1);

    if(duplCustLegalDoc != undefined){
      this.toastr.warningMessage(String.Format(ExceptionConstant.DUPLICATE_LEGAL_DOC, duplCustLegalDoc[0].MrLegalDocTypeCode, duplCustLegalDoc[0].DocNo));
      return;
    }

    this.outputTab.emit({ stepMode: 'next'});
  }

  groupBy(array, f) {
    let groups = {};
    array.forEach(function (o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    })
  }
}
