import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/TempPaging/UcTempPagingObj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { String } from 'typescript-string-operations';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';


@Component({
  selector: 'app-journal-reconcile-paging',
  templateUrl: './journal-reconcile-paging.component.html',
  styleUrls: ['./journal-reconcile-paging.component.css']
})
export class JournalReconcilePagingComponent implements OnInit {
  ucTempPagingObj: UcTempPagingObj = new UcTempPagingObj();
  user: any;

  listTemp = [];

  isSelected
  constructor(private http: HttpClient, private toastr: NGXToastrService, private router: Router) { }

  ngOnInit() {
    this.ucTempPagingObj.urlJson = "./assets/ucpaging/journal/paging-journal-reconcile.json";
    this.ucTempPagingObj.pagingJson = "./assets/ucpaging/journal/paging-journal-reconcile.json";
  }

  CallBack(ev: any) {
    this.listTemp = ev.TempListObj;
  }

  RerunJournal() {
    var req = [];
    if(this.listTemp.length == 0)
    {
      this.toastr.warningMessage(ExceptionConstant.SELECT_ONE_JOURNAL);
      return
    }

    var executedJournal = this.listTemp.find(x => x.Status == CommonConstant.JOURNAL_STAT_EXE_DESCR);

    if(executedJournal != undefined && executedJournal != null){
      this.toastr.warningMessage(String.Format(ExceptionConstant.JOURNAL_ALREADY_EXECUTED, executedJournal.JrNo));
      return;
    }

    for (let i = 0; i < this.listTemp.length; i++) {
      if (!req.some(x => x == this.listTemp[i].JrNo)) {
        req.push(this.listTemp[i].JrNo)
      }
    }

    this.http.post<any>(environment.FoundationR3Url + URLConstant.RerunJournal, {
      ListTransactionNo: req
    }).subscribe(
      res => {
        this.toastr.successMessage('Rerun journal success, Process may take several time');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.JOURNAL_RECONCILE_PAGING],{});
        });
      },
      err => {
        this.toastr.errorMessage(ExceptionConstant.RERUN_JOURNAL_FAILED)
      }
    )
  }

}
