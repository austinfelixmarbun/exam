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
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-upload-journal-paging',
  templateUrl: './upload-journal-paging.component.html'
})
export class UploadJournalPagingComponent implements OnInit {
    inputPagingObj: UcPagingObj = new UcPagingObj();
    user: any;

    ngOnInit() {
        this.inputPagingObj._url = "./assets/ucpaging/journal/searchUploadJournal.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/journal/searchUploadJournal.json";

    }
}