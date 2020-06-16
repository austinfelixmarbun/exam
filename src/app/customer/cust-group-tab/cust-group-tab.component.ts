import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustGrpObj } from 'app/shared/model/CustGrpObj.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustGroupTabDetailComponent } from './cust-group-tab-detail/cust-group-tab-detail.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustObj } from 'app/shared/model/CustObj.Model';

@Component({
  selector: 'app-cust-group-tab',
  templateUrl: './cust-group-tab.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustGroupTabComponent implements OnInit {
  @Input() CustId: number;
  @Input() MrCustTypeCode: string;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  CustGrpList: any;
  resCustObj: any;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    var custGrp = new CustGrpObj();
    custGrp.CustId = this.CustId;
    console.log(custGrp.CustId);
    this.httpClient.post(AdInsConstant.GetListCustGrpByCustIdForCustGrpTab, custGrp).subscribe(
      (response: any) => {
        this.CustGrpList = response.CustGrpObjForCustGrpTabs;
        console.log(this.CustGrpList)
      }
    );
  }

  openView(CustNo)
  {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = CustNo
    this.http.post(AdInsConstant.GetCustByCustNo, custObj).subscribe(
      response => {
        this.resCustObj = response;
        window.open("../Customer/CustomerView/Page?CustId=" + this.resCustObj.CustId, "_blank");
      },
      error => {
        console.log(error);
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
    ).catch((error) => {
      if(error != 0){
        console.log(error);
      }
    });
  }

  deleteCustGrp(CustGrpId, i) {
    if(confirm('Are you sure to delete this record?')){
    var custGrp = new CustGrpObj();
    custGrp.CustGrpId = CustGrpId;
    this.httpClient.post(AdInsConstant.DeleteCustGrp, custGrp).subscribe(
      (response: any) => {
        this.CustGrpList.splice(i, 1);
        this.toastr.successMessage(response["message"]);
      },
      (error) => {
        console.log(error);
      }
    );
    }
  }
  
  next() {
    this.outputTab.emit({ stepMode: "next"});
  }
  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }
}
