import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { String } from 'typescript-string-operations';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { saveAs } from 'file-saver'; 
import { base64StringToBlob } from 'blob-util';

@Component({
  selector: 'app-upload-journal-paging',
  templateUrl: './upload-journal-paging.component.html'
})


export class UploadJournalPagingComponent implements OnInit {
    inputPagingObj: UcPagingObj = new UcPagingObj();
    user: any;
    Id: number;
    constructor(
      private http: HttpClient
    ){
      
    }

    ngOnInit() {
        this.inputPagingObj._url = "./assets/ucpaging/journal/searchUploadJournal.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/journal/searchUploadJournal.json";

    }

    getCallBack(event) {
      if (event.Key === "Download") {
        this.Id = event.RowObj.JrSourceFileId
        this.http.post(URLConstant.DownloadJournalFile,{ Id: this.Id }).subscribe(
          response => {
            const b64Data = response['FileContents'];
            const contentType = response['ContentType'];
            const fileName = response['FileDownloadName'];
            const blob = base64StringToBlob(b64Data.toString(), contentType);

            console.log("response dr BE")
            console.log(response)
            saveAs(blob, fileName);
          }
        );
      }
    }

    // clickEvent(){
    //   this.service.getPDF().subscribe((response)=>{
    
    //   let file = new Blob([response], { type: 'application/pdf' });            
    //   var fileURL = URL.createObjectURL(file);
    //   window.open(fileURL);
    // })


    // getPDF(){
    //   const url = `${this.serviceUrl}/pdf`;
      
    //   const httpOptions = {
    //     'responseType'  : 'arraybuffer' as 'json'
    //      //'responseType'  : 'blob' as 'json'        //This also worked
    //   };
      
    //   return this.http.get<any>(url, httpOptions);
      
    //   }
}