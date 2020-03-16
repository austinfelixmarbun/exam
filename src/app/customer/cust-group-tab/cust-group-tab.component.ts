import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustGrpObj } from 'app/shared/model/CustGrpObj.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustGroupTabDetailComponent } from './cust-group-tab-detail/cust-group-tab-detail.component';

@Component({
  selector: 'app-cust-group-tab',
  templateUrl: './cust-group-tab.component.html',
  styleUrls: ['./cust-group-tab.component.scss']
})
export class CustGroupTabComponent implements OnInit {
  @Input() CustId: number = 2;
  @Input() MrCustTypeCode: string = "PERSONAL";
  CustGrpList: any;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    var custGrp = new CustGrpObj();
    custGrp.CustId = this.CustId;
    this.httpClient.post(AdInsConstant.GetListCustGrpByCustIdForCustGrpTab, custGrp).subscribe(
      (response: any) => {
        console.log(response);
        this.CustGrpList = response.CustGrpObjForCustGrpTabs;
      }
    );
  }

  openModalAddCustGroup(){
    const modalRef = this.modalService.open(CustGroupTabDetailComponent);
    modalRef.componentInstance.MrCustTypeCode = this.MrCustTypeCode;
    modalRef.componentInstance.CustId = this.CustId;
  }
}
