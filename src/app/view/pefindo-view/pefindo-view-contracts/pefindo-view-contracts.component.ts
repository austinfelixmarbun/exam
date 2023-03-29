import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { ResContractObj } from 'app/shared/model/Response/pefindo/res-contract-obj.model';
import { ResViewContractsObj } from 'app/shared/model/response/pefindo/res-view-contracts-obj.model';
import { ResViewSubjectInfoCompanyObj } from 'app/shared/model/response/pefindo/res-view-subject-info-company-obj.model';
import { ResViewSubjectInfoPersonalObj } from 'app/shared/model/response/pefindo/res-view-subject-info-personal-obj.model';

@Component({
  selector: 'app-pefindo-view-contracts',
  templateUrl: './pefindo-view-contracts.component.html'
})
export class PefindoViewContractsComponent implements OnInit {
  TrxNo: string;
  ResViewContractsObj: ResViewContractsObj = new ResViewContractsObj();
  ResListContractsObj: Array<ResContractObj> = [];
  ResSummaryContractsObj: Array<ResContractObj> = [];
  ViewDetailContract: ResContractObj = new ResContractObj();
  TempDetailContract: ResContractObj = new ResContractObj();
  NoOfFalseDisputes: number = 0;
  NoOfClosedDisputes: number = 0;
  IsViewMode: boolean = false;

  CustNo: string;
  MrCustTypeCode: string;
  CustObj: CustObj = new CustObj();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }

      if (params["MrCustTypeCode"] != null) {
        this.MrCustTypeCode = params["MrCustTypeCode"];
      }

      if (params["CustNo"] != null) {
        this.CustNo = params["CustNo"];
      }
    });
  }

  ngOnInit() {
    this.getSubjectInfo();

    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;
    this.http.post(URLConstant.GetViewContracts, reqByTrxNo).subscribe(
      (response: ResViewContractsObj) => {
        this.ResViewContractsObj = response;
      }
    )

    this.http.post(URLConstant.GetPefindoContracts, reqByTrxNo).subscribe(
      (response: {ReturnObject: Array<ResContractObj>}) => {
        this.ResListContractsObj = response.ReturnObject;
        this.ResListContractsObj = this.ResListContractsObj.filter(x => x.ClientRole == 'MainDebtor');
        this.ResListContractsObj.forEach(x => {
          var idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          if (idx < 0)
          {
            let newItem = new ResContractObj();
            newItem.Creditor = x.Creditor;
            this.ResSummaryContractsObj.push(newItem);
            idx = this.ResSummaryContractsObj.findIndex(y => y.Creditor == x.Creditor);
          }
          let curr = this.ResSummaryContractsObj[idx];
          curr.TtlAmt += x.TtlAmt;
          curr.OsAmt += x.OsAmt;
          curr.PastDueAmt += x.PastDueAmt;
          curr.PastDueDays = x.PastDueDays > curr.PastDueDays ? x.PastDueDays : curr.PastDueDays;
        })
      }
    )
  }

  getSubjectInfo()
  {
    if (this.CustNo != null)
    {
      let reqByCustNo: GenericObj = new GenericObj();
      reqByCustNo.CustNo = this.CustNo;
      this.http.post(URLConstant.GetCustByCustNo, reqByCustNo).subscribe(
        (response: CustObj) => {
          this.MrCustTypeCode = this.CustObj.MrCustTypeCode;
        })
    }

    let reqByTrxNo: GenericObj = new GenericObj();
    reqByTrxNo.TrxNo = this.TrxNo;

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      reqByTrxNo.TrxNo = this.TrxNo;
      this.http.post(URLConstant.GetViewSubjectInfoPersonal, reqByTrxNo).subscribe(
      (response: ResViewSubjectInfoPersonalObj) => {
        this.TempDetailContract.PefindoId = response.PefindoId;
        this.TempDetailContract.Name = response.FullName;
        this.TempDetailContract.IdNumber = response.IdNo;
        this.TempDetailContract.Addr = response.Addr;
        this.TempDetailContract.BirthDt = response.DateOfBirth;
      })
    }
    else
    {
      this.http.post(URLConstant.GetViewSubjectInfoCompany, reqByTrxNo).subscribe(
        (response: ResViewSubjectInfoCompanyObj) => {
          this.TempDetailContract.PefindoId = response.PefindoId;
          this.TempDetailContract.Name = response.CoyName;
          this.TempDetailContract.IdNumber = response.IdNo;
          this.TempDetailContract.Addr = response.Addr;
        }
      )
    }
  }

  async viewOnClick(idx: number)
  {
    this.ViewDetailContract = this.ResListContractsObj[idx];

    this.ViewDetailContract.PefindoId = this.TempDetailContract.PefindoId;
    this.ViewDetailContract.Name = this.TempDetailContract.Name;
    this.ViewDetailContract.IdNumber = this.TempDetailContract.IdNumber;
    this.ViewDetailContract.Addr = this.TempDetailContract.Addr;

    if (this.ViewDetailContract.RPefindoCntrctDsptsListObjs.length > 0)
    {
      this.NoOfClosedDisputes = this.ViewDetailContract.RPefindoCntrctDsptsListObjs.filter(x => x.DsptsStat == "Closed").length;
      this.NoOfFalseDisputes = this.ViewDetailContract.RPefindoCntrctDsptsListObjs.filter(x => x.Resolution == "FalseDispute").length;
    }
    
    this.IsViewMode = true;
  }

  backOnClick()
  {
    this.ViewDetailContract = new ResContractObj();
    this.NoOfClosedDisputes = 0;
    this.NoOfFalseDisputes = 0;
    
    this.IsViewMode = false;
  }

  pascalToSpace(ori:string='')
  {
    if (ori == undefined || ori == null) return '';
    return ori.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
  }

}
