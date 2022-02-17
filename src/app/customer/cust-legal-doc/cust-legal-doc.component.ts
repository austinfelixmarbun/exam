import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CustCompanyLegalDocObj } from 'app/shared/model/cust-company-legal-doc-obj.model';
import { CustLegalDocDetailComponent } from './cust-legal-doc-detail/cust-legal-doc-detail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { String } from 'typescript-string-operations';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';


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
  ListLegalDocCantDuplicate: Array<string> = new Array<string>();
  ListTempLegalCheck: Array<any> = new Array<any>();
  Page: string;
  ReqByCodeObj: GenericObj = new GenericObj();
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, 
    private UrlConstantNew: UrlConstantNew
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
    this.http.post(this.UrlConstantNew.GetCustCompanyByCustId, { Id: this.IdCust}).subscribe(
      (response: any) => {

        this.CustCompanyId = response['CustCompanyId'];
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.http.post(this.UrlConstantNew.GetListViewCustCompanyLegalDocByCustCompanyId, {Id : this.CustCompanyId}).subscribe(
          (response: any) => {
            this.custLegalDocs = response.ListCustCompanyLegalDoc;
          }
        );
      }
    );
    this.checkGSLegalDoc();
  }

  async checkGSLegalDoc(){
    this.ReqByCodeObj.Code = CommonConstant.GSCodeListLegalDocCantDuplicate;
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, this.ReqByCodeObj).toPromise().then(
      (response) => {
        if (response["GsValue"] != undefined && response["GsValue"] != "") {
          this.ListLegalDocCantDuplicate = response["GsValue"].split('|')
        }
      }
    );
  }

  openCustLegalDocDetail() {
    const modalCustLegalDoc = this.modalService.open(CustLegalDocDetailComponent);
    modalCustLegalDoc.componentInstance.CustCompanyId = this.CustCompanyId;
    modalCustLegalDoc.componentInstance.CustLegalDocs = this.custLegalDocs;
    modalCustLegalDoc.componentInstance.ListLegalDocCantDuplicate = this.ListLegalDocCantDuplicate;
    modalCustLegalDoc.result.then(
      (response) => {
        this.spinner.show();
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.http.post(this.UrlConstantNew.GetListViewCustCompanyLegalDocByCustCompanyId, {Id : this.CustCompanyId}).subscribe(
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

  editCustLegalDocDetail(CustCompanyLegalDocId: number) {
    const modalCustLegalDoc = this.modalService.open(CustLegalDocDetailComponent);
    modalCustLegalDoc.componentInstance.CustCompanyLegalDocId = CustCompanyLegalDocId;
    modalCustLegalDoc.componentInstance.Mode = "Edit";
    modalCustLegalDoc.componentInstance.CustLegalDocs = this.custLegalDocs;
    modalCustLegalDoc.componentInstance.ListLegalDocCantDuplicate = this.ListLegalDocCantDuplicate;
    modalCustLegalDoc.result.then(
      (response) => {
        this.spinner.show();
        var custCompanyLegalDoc = new CustCompanyLegalDocObj();
        custCompanyLegalDoc.CustCompanyId = this.CustCompanyId;
        this.http.post(this.UrlConstantNew.GetListViewCustCompanyLegalDocByCustCompanyId, {Id : this.CustCompanyId}).subscribe(
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
      this.http.post(this.UrlConstantNew.DeleteCustCompanyLegalDoc, reqObj, AdInsConstant.SpinnerOptions).subscribe(
        (response: any) => {
          this.custLegalDocs.splice(idx, 1);
          this.toastr.successMessage(response["message"]);
        }
      );
    }
  }

  async next() { 
      var groupedCustLegalDoc = this.groupBy(this.custLegalDocs, function (item) {
        return [item.MrLegalDocTypeCode, item.DocNo];
      });
  
      var duplCustLegalDoc = groupedCustLegalDoc.filter(x => x.length > 1);
      if(duplCustLegalDoc != undefined){
        for(var i = 0; i < duplCustLegalDoc.length ; i++){
          this.ListTempLegalCheck = duplCustLegalDoc[i];
          var checkGSValue = this.ListLegalDocCantDuplicate.find(x => x == this.ListTempLegalCheck[0].MrLegalDocTypeCode);
          if(checkGSValue != null){
            this.toastr.warningMessage(String.Format(ExceptionConstant.DUPLICATE_LEGAL_DOC, duplCustLegalDoc[0].MrLegalDocTypeCode, duplCustLegalDoc[0].DocNo));
            return;
          }
        }
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
