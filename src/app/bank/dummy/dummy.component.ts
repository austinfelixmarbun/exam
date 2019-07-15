import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { SearchComponent } from 'app/shared/search/search.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import * as XLSX from 'xlsx';
import { ExcelService } from 'app/shared/excel-service/excel-service';
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
}
@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss'],
  providers: [ExcelService]
})
export class DummyComponent implements OnInit {

  public progress: number;
  public message: string;
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  inputObj: any;
  ExcelData: any;
  fileToUpload: any;

  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;

  settingUrl: string = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;

  afuConfig = {
    formatsAllowed: ".txt, .xls, .xlsx",
    uploadAPI: {
      url: "http://localhost/R3/FOUNDATION/UploadType/UploadFile"
    }
  };

  constructor(private excelService: ExcelService, private http: HttpClient) {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchDummy.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetBankPaging;
  }

  ngOnInit() {
    console.log("test");
    this.apiUrl = this.settingUrl + AdInsConstant.GetBankPaging;
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  searchSort(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  searchPagination(event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  onChangeType(type: any) {
    console.log(type);
    if (type == 1) {
      this.inputObj._url = "./assets/search/searchDummy.json";
    } else if (type == 2) {
      this.inputObj._url = "./assets/search/searchOffice.json";
    } else if (type == 3) {
      this.inputObj._url = "./assets/search/searchBank.json";
    }
    this.searchComponent.initiateForm();
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      this.ExcelData = jsonData.Sheet1;
      this.excelService.exportAsExcelFile(this.ExcelData, 'sample');
    }
    reader.readAsBinaryString(file);
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      reportProgress: true,
    });

    var test = { test: 'test' };
    this.http.post('https://localhost:5000/UploadType/UploadFile', test).subscribe((response) => {
      console.log(response);
      // if (event.type === HttpEventType.UploadProgress)
      //   this.progress = Math.round(100 * event.loaded / event.total);
      // else if (event.type === HttpEventType.Response)
      //   this.message = event.body.toString();
    });
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('Test', fileToUpload, fileToUpload.name);
    formData.append('text', "Test");

    this.http.post('https://localhost:5000/UploadType/UploadFile', formData, { reportProgress: true, observe: 'events' }).subscribe(
      response => {
        if (response.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * response.loaded / response.total);
        else if (response.type === HttpEventType.Response) {
          this.message = 'Upload success.';
        }
        console.log(response);
      },
      (error) => {
        console.log("Error");
        console.log(error);
      });
  }
  postMethod(files: FileList) {
    this.fileToUpload = files.item(0);
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http.post('https://localhost:5000/UploadType/UploadFile', formData, HttpUploadOptions).subscribe((val) => {

      console.log(val);
    });
    return false;
  }

  postMethod2(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
    let formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('text', "coba-coba");

    this.http.post('https://localhost:5000/UploadType/UploadFile', formData).subscribe((val) => {

      console.log(val);
    });
    return false;
  }
}
