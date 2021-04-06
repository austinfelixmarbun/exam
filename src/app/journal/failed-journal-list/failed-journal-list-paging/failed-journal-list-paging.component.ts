import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';

@Component({
  selector: 'app-failed-journal-list-paging',
  templateUrl: './failed-journal-list-paging.component.html',
  styleUrls: ['./failed-journal-list-paging.component.css']
})
export class FailedJournalListPagingComponent implements OnInit {
  ucTempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  user: any;

  listTemp = [];

  isSelected
  constructor(private http: HttpClient, private toastr: NGXToastrService, private router: Router) { }

  ngOnInit() {
    this.ucTempPagingObj.urlJson = "./assets/ucpaging/journal/paging-failed-journal-result-list.json";
    this.ucTempPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.ucTempPagingObj.apiQryPaging = URLConstant.GetJournalResultPagingObjectBySQL;
    this.ucTempPagingObj.pagingJson = "./assets/ucpaging/journal/paging-failed-journal-result-list.json";
    this.ucTempPagingObj.ddlEnvironments = [
      {
        name: "JMH.Office_Code",
        environment: environment.FoundationR3Url
      }
    ];
  }

  CallBack(ev: any) {
    this.listTemp = ev.TempListObj;
  }

  RerunJournal() {
    var req = [];
    if(this.listTemp.length == 0)
    {
      this.toastr.errorMessage("Select at least 1 Journal to Rerun");
      return
    }
    for (let i = 0; i < this.listTemp.length; i++) {
      let trxNo = (this.listTemp[i].TxnCode + ';' + this.listTemp[i].JrNo + ';' + this.listTemp[i].TrxNo)
      if (!req.some(x => x == trxNo)) {
        req.push(trxNo)
      }
    }
    console.log("List Journal yang mau di rerun: ")
    console.log(req);

    this.http.post<any>(environment.FoundationR3Url + '/Journal/RerunJournal', {
      ListTransactionNo: req
    }).subscribe(
      res => {
        this.toastr.successMessage('Rerun journal success, Process may take several time')
      },
      err => {
        this.toastr.errorMessage('Failed Rerun Journal')
      }
    )



  }

}
