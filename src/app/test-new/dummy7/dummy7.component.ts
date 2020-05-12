import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef, Input } from '@angular/core';
import { RdlcReportObj } from 'app/shared/model/Report/RdlcReportObj.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RequestCriteriaObj } from 'app/shared/model/RequestCriteriaObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { formatDate } from '@angular/common';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dummy7',
  templateUrl: './dummy7.component.html',
  styleUrls: ['./dummy7.component.scss'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        height: '*',
        opacity: '1',
      })),
      state('final', style({
        height: '0px',
        opacity: '0',
        overflow: 'hidden',
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms'))
    ]),
  ]
})
export class Dummy7Component implements OnInit {

  @ViewChild('formIdReport') FormReport: ElementRef;
  @Input() reportInput: any;
  JsonPath: string = "./assets/ucreport/ReportDummy.json";
  RdlcReport: RdlcReportObj = new RdlcReportObj();
  Configuration: any;
  ExportType: string = "PDF";
  UserContext: any;
  CritLength: number = 0;
  IsHidden: boolean = false;
  CurrentState: string = 'initial';

  constructor(private toastr: NGXToastrService, private http: HttpClient, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    console.log("ucreport");
    let js = this._renderer2.createElement('script');
    js.text = `
          $(document).ready(function(){
            $("#flip").click(function(){
              $("#panel").slideToggle("slow");
            });
          });
        `;
    this._renderer2.appendChild(this._document.body, js);

    this.UserContext = JSON.parse(localStorage.getItem("UserAccess"));
    this.RdlcReport.RequestUserId = this.UserContext.RefUserId;
    this.RdlcReport.RequesterEmail = this.UserContext.Email;

    // this.RdlcReport.MainReportParameter.UserName = this.UserContext.UserName;
    // this.RdlcReport.MainReportParameter.SystemDate = this.UserContext.BusinessDt;
    // this.RdlcReport.MainReportParameter.CoyName = this.UserContext.CoyName;
    // this.RdlcReport.MainReportParameter.OfficeName = this.UserContext.OfficeName;

    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.JsonPath).subscribe(data => {
      this.Configuration = data;
      this.CritLength = data.providerParameter.length;

      this.RdlcReport.ReportName = data.reportName;
      this.RdlcReport.ReportTemplate = data.reportTemplateName;
      this.RdlcReport.MainReportInfoDetail.ReportTemplateName = data.reportTemplateName;


      if (data.reportParameter.length != 0) {
        for (let i = 0; i < data.reportParameter.length; i++) {
          this.RdlcReport.MainReportParameter[data.reportParameter[i]] = "";
        }
      } else {
        this.RdlcReport.MainReportParameter = null;
      }

      for (var i = 0; i < this.CritLength; i++) {
        //ini kalau datanya di load dari URL
        if (data.providerParameter[i].isFromURL == true) {
          var request = new RequestCriteriaObj();
          var arrayCrit = new Array();
          var criteriaObject = new CriteriaObj();
          criteriaObject.DataType = "text";
          criteriaObject.propName = data.providerParameter[i].criteriaPropName;
          criteriaObject.value = data.providerParameter[i].criteriaPropValue;
          criteriaObject.restriction = "eq";
          arrayCrit.push(criteriaObject);
          request.criteria = arrayCrit;
          request[data.providerParameter[i].criteriaPropName] = data.providerParameter[i].criteriaPropValue;

          // Pengecekan penggunaan url atau path
          if (data.providerParameter[i].path != undefined && data.providerParameter[i].path != "") {
            if (this.reportInput.ddlEnvironments != undefined && this.reportInput.ddlEnvironments.length != 0) {
              for (let y = 0; y < this.reportInput.ddlEnvironments.length; y++) {
                if (data.providerParameter[i].name == this.reportInput.ddlEnvironments[y].name) {
                  data.providerParameter[i].fullpath = this.reportInput.ddlEnvironments[y].environment + data.providerParameter[i].path;
                  break;
                }
              }
            } else {
              data.providerParameter[i].fullpath = data.providerParameter[i].url;
            }

          } else {
            data.providerParameter[i].fullpath = data.providerParameter[i].url;
          }
          //lempar objectnya sekalian sama urlnya, nnti di bind di dalem karena masalah di asyncnya
          //biar tiap function ada state2nya sendiri
          this.resolveObject(data.providerParameter[i], data.providerParameter[i].fullpath, request);
        }

        if (data.providerParameter[i].type == "numeric") {
          data.providerParameter[i].value = parseFloat(data.providerParameter[i].value).toLocaleString('en');
        }

        //pengecekan tanggal
        if (data.providerParameter[i].type == "datepicker") {
          if (data.providerParameter[i].value.includes("BD")) {
            let businessDate = new Date(JSON.parse(localStorage.getItem("UserContext")).BusinessDate);
            var operator = data.providerParameter[i].value.charAt(2);
            var dateShow = new Date();
            if (operator == "-") {
              var tempMinus = data.providerParameter[i].value.split("-", 2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate() - numDay);
            }
            else if (operator == "+") {
              var tempMinus = data.providerParameter[i].value.split("+", 2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate() + numDay);
            }
            var dateText = formatDate(dateShow, 'yyyy-MM-dd', 'en-US')
            data.providerParameter[i].value = dateText;
          }
        }
      }
    });
  }

  reset() {
    this.initiateForm();
  }

  resolveObject(obj: any, url: string, crit: RequestCriteriaObj = null) {
    const val = this.postJSON(url, crit);
    val.subscribe(tempData => {
      obj.itemsUrl = new Array();
      obj.itemsUrl = tempData.ReturnObject;
    });
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  public postJSON(url: string, criteria: any = null): Observable<any> {
    return this.http.post(url, criteria);
  }

  GenerateReport() {
    const ProviderObj: Object = new Object();
    let FilterBy: string = "";
    this.RdlcReport.ExportFile = this.ExportType;
    this.RdlcReport.ExportFormat = this.ExportType;

    if (this.CritLength != 0) {
      for (let i = 0; i < this.CritLength; i++) {
        var component = this.FormReport.nativeElement[i];
        if (component.value == "" || component.value == "All") {
          ProviderObj[this.Configuration.providerParameter[i].name] = null;
        } else {
          ProviderObj[this.Configuration.providerParameter[i].name] = component.value;

          if (FilterBy == "") {
            FilterBy = this.Configuration.providerParameter[i].name + " " + component.value;
          } else {
            FilterBy = FilterBy + " And " + this.Configuration.providerParameter[i].name + " " + component.value;
          }
        }

      }
      // this.RdlcReport.MainReportParameter.FilterBy = FilterBy;
      this.RdlcReport.MainReportInfoDetail.ReportDataProviderParameter = ProviderObj;
    }

    var Obj = {
      RequestObject: this.RdlcReport
    };

    this.http.post(environment.FoundationR3Url + "/Report/GenerateReportSync", Obj).subscribe(
      (response) => {
        console.log(response);
        let linkSource: string = "";
        let fileName: string = "";
        if (this.ExportType == "XLS") {
          linkSource = 'data:application/xls;base64,' + response["ReturnObject"];
          fileName = "sample.xls";
        } else if (this.ExportType == "DOC") {
          linkSource = 'data:application/doc;base64,' + response["ReturnObject"];
          fileName = "sample.doc";
        } else {
          linkSource = 'data:application/pdf;base64,' + response["ReturnObject"];
          fileName = "sample.pdf";
        }

        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;

        if (response["ReturnObject"] != undefined) {
          downloadLink.click();
          this.toastr.successMessage(response['message']);
        } else {
          this.toastr.errorMessage(response['Message']);
        }
      },
      (error) => {
        console.log(error);
      });

    // const linkSource = 'data:application/pdf;base64,' + 'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==\n';
    // const downloadLink = document.createElement("a");
    // const fileName = "sample.pdf";

    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.click();
  }

  changeState() {
    this.CurrentState = this.CurrentState === 'initial' ? 'final' : 'initial';
    this.IsHidden = this.IsHidden === false ? true : false;
  }
}
