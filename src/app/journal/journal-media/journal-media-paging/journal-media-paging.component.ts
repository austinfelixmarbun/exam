import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
@Component({
  selector: 'app-journal-media-paging',
  templateUrl: './journal-media-paging.component.html',
  styleUrls: ['./journal-media-paging.component.css']
})
export class JournalMediaPagingComponent implements OnInit {

  readonly JournalMediaDetailLink: string = NavigationConstant.JOURNAL_MEDIA_DETAIL;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  constructor(
    private http: HttpClient,
    private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/journal/paging-journal-media.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/journal/paging-journal-media.json";
    this.inputPagingObj.deleteUrl = "/Journal/DeleteJrMHeader";
  }

  onCallback(ev) {
    let key = ev.Key
    let row = ev.RowObj

    if (key == 'delete') {
      this.http.post<any>(environment.FoundationR3Url + '/Journal/DeleteJrMHeader', { JrMHeaderId: row.JrMHeaderId }).subscribe(
        response => {
          this.toastr.successMessage('Successfully remove TrxTypeCode: ' + response);

        },
        error => {
          console.log(error);
        }
      )

    }
  }
}
