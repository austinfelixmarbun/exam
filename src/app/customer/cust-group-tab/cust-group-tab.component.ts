import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustGrpObj } from 'app/shared/model/CustGrpObj.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustGroupTabDetailComponent } from './cust-group-tab-detail/cust-group-tab-detail.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

@Component({
  selector: 'app-cust-group-tab',
  templateUrl: './cust-group-tab.component.html',
  styleUrls: []
})
export class CustGroupTabComponent implements OnInit {
  @Input() CustId: number;
  @Input() MrCustTypeCode: string;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();
  CustGrpList: Array<CustGrpObj> = new Array();
  resCustObj: any;
  CustNoObj: GenericObj = new GenericObj();
  listCustIdToExclude: Array<number>;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private toastr: NGXToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.listCustIdToExclude = new Array<number>();
   }

  ngOnInit() {
    var custGrp = new CustGrpObj();
    custGrp.MemberCustId = this.CustId;
    this.httpClient.post(URLConstant.GetListCustGrpByMemberCustIdForCustGrpTab, {Id : this.CustId}).subscribe(
      (response) => {
        this.CustGrpList = response["CustGrpObjForCustGrpTabs"];
        this.listCustIdToExclude.push(this.CustId);
        for (const item of this.CustGrpList) {
          this.listCustIdToExclude.push(item["CustId"]);
        }
      }
    );
  }

  openView(CustNo)
  {
    // GetCustByCustNo
    this.CustNoObj.CustNo = CustNo
    this.http.post(URLConstant.GetCustByCustNo, this.CustNoObj).subscribe(
      response => {
        this.resCustObj = response;
        AdInsHelper.OpenCustomerViewByCustId(this.resCustObj.CustId);
      }
    );
  }

  openModalAddCustGroup() {
    const modalCustGrp = this.modalService.open(CustGroupTabDetailComponent);
    modalCustGrp.componentInstance.MrCustTypeCode = this.MrCustTypeCode;
    modalCustGrp.componentInstance.CustId = this.CustId;
    modalCustGrp.componentInstance.ListCustIdToExclude = this.listCustIdToExclude;
    modalCustGrp.result.then(
      (response) => {
        this.spinner.show();
        var custGrp = new CustGrpObj();
        custGrp.MemberCustId = this.CustId;
        this.httpClient.post(URLConstant.GetListCustGrpByMemberCustIdForCustGrpTab, {Id : this.CustId}).subscribe(
          (response: any) => {
            this.CustGrpList = response.CustGrpObjForCustGrpTabs;
            this.listCustIdToExclude = new Array<number>();
            for (const item of this.CustGrpList) {
              this.listCustIdToExclude.push(item["MemberCustId"]);
            }
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
    if(confirm(ExceptionConstant.DELETE_CONFIRMATION)){
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = CustGrpId;
    this.httpClient.post(URLConstant.DeleteCustGrp, reqObj).subscribe(
      (response: any) => {
        var idExclude = 0;
        for (let index = 0; index < this.listCustIdToExclude.length; index++) {
          if(this.listCustIdToExclude[index] == this.CustGrpList[i]["CustId"]){
            idExclude = index;
            break;
          } 
        }
        this.listCustIdToExclude.splice(idExclude, 1);
        this.CustGrpList.splice(i, 1);
        this.toastr.successMessage(response["message"]);
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
