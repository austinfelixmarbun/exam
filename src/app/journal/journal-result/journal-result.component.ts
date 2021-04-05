import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-journal-result',
  templateUrl: './journal-result.component.html',
  styleUrls: ['./journal-result.component.css']
})
export class JournalResultComponent implements OnInit {
  JrMsgHId: number = null;
  IsReady: boolean = false;

  JrMsgH: any = {};
  ErrMsg = [];
  JrResult = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.JrMsgHId = params['JrMsgHId']
    })


    this.http.post<any>(environment.FoundationR3Url + '/Journal/GetJournalResultByJrMsgHId', {
      JrMsgHId: this.JrMsgHId
    }).subscribe(res => {
      this.JrMsgH = res.JrMsgH[0]
      this.JrResult = res.JrResult

      if ((this.JrMsgH.Status == 'ERROR' || this.JrMsgH.Status == 'NOT BALANCE') && this.JrMsgH.ErrMsg != null) {
        this.ErrMsg = this.JrMsgH.ErrMsg.split(';')
      }

      this.IsReady = true;
    },
      error => {

      })
  }

}
