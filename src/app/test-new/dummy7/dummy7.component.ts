import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef, Input } from '@angular/core';
import { RdlcReportObj } from 'app/shared/model/Report/RdlcReportObj.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RequestCriteriaObj } from 'app/shared/model/RequestCriteriaObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { formatDate } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputReportObj } from './InputReportObj.model';

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
  @Input() ReportInput: InputReportObj = new InputReportObj();
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

    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.ReportInput.JsonPath).subscribe(data => {
      this.Configuration = data;
      this.CritLength = data.component.length;

      this.RdlcReport.ReportName = data.reportName;
      this.RdlcReport.ReportTemplate = data.reportTemplateName;
      this.RdlcReport.MainReportInfoDetail.ReportTemplateName = data.reportTemplateName;

      for (var i = 0; i < this.CritLength; i++) {
        //ini kalau datanya di load dari URL
        if (data.component[i].isFromURL == true) {
          var request = new RequestCriteriaObj();
          var arrayCrit = new Array();
          var criteriaObject = new CriteriaObj();
          criteriaObject.DataType = "text";
          criteriaObject.propName = data.component[i].criteriaPropName;
          criteriaObject.value = data.component[i].criteriaPropValue;
          criteriaObject.restriction = "eq";
          arrayCrit.push(criteriaObject);
          request.criteria = arrayCrit;
          request[data.component[i].criteriaPropName] = data.component[i].criteriaPropValue;

          // Pengecekan penggunaan url atau path
          if (data.component[i].path != undefined && data.component[i].path != "") {
            if (this.ReportInput.ddlEnvironments != undefined && this.ReportInput.ddlEnvironments.length != 0) {
              for (let y = 0; y < this.ReportInput.ddlEnvironments.length; y++) {
                if (data.component[i].name == this.ReportInput.ddlEnvironments[y].name) {
                  data.component[i].fullpath = this.ReportInput.ddlEnvironments[y].environment + data.component[i].path;
                  break;
                }
              }
            } else {
              data.component[i].fullpath = data.component[i].url;
            }

          } else {
            data.component[i].fullpath = data.component[i].url;
          }
          //lempar objectnya sekalian sama urlnya, nnti di bind di dalem karena masalah di asyncnya
          //biar tiap function ada state2nya sendiri
          this.resolveObject(data.component[i], data.component[i].fullpath, request);
        }

        if (data.component[i].type == "numeric") {
          data.component[i].value = parseFloat(data.component[i].value).toLocaleString('en');
        }

        //pengecekan tanggal
        if (data.component[i].type == "datepicker") {
          if (data.component[i].value.includes("BD")) {
            let businessDate = new Date(JSON.parse(localStorage.getItem("UserAccess")).BusinessDate);
            var operator = data.component[i].value.charAt(2);
            var dateShow = new Date();
            if (operator == "-") {
              var tempMinus = data.component[i].value.split("-", 2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate() - numDay);
            }
            else if (operator == "+") {
              var tempMinus = data.component[i].value.split("+", 2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate() + numDay);
            }
            var dateText = formatDate(dateShow, 'yyyy-MM-dd', 'en-US')
            data.component[i].value = dateText;
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
    if (this.ExportType == "JPDF") {
      this.RdlcReport.ExportFile = "PDF";
    } else {
      this.RdlcReport.ExportFile = this.ExportType;
    }
    this.RdlcReport.ExportFormat = this.ExportType;

    if (this.CritLength != 0) {
      for (let i = 0; i < this.CritLength; i++) {
        var component = this.FormReport.nativeElement[i];
        if (component.value == "" || component.value == "All") {
          if (this.Configuration.component[i].isReportParam) {
            this.RdlcReport.MainReportParameter[this.Configuration.component[i].name] = null;
          }

          if (this.Configuration.component[i].isProviderParam) {
            ProviderObj[this.Configuration.component[i].name] = null;
          }
        } else {
          if (this.Configuration.component[i].isReportParam) {
            this.RdlcReport.MainReportParameter[this.Configuration.component[i].name] = component.value;
          }

          if (this.Configuration.component[i].isProviderParam) {
            ProviderObj[this.Configuration.component[i].name] = component.value;
          }

          if (FilterBy == "") {
            FilterBy = this.Configuration.component[i].name + " " + component.value;
          } else {
            FilterBy = FilterBy + " And " + this.Configuration.component[i].name + " " + component.value;
          }
        }

      }
      this.RdlcReport.MainReportParameter.FilterBy = FilterBy;
      this.RdlcReport.MainReportInfoDetail.ReportDataProviderParameter = ProviderObj;
    }

    let Obj = {
      RequestObject: this.RdlcReport
    };

    this.http.post(this.ReportInput.EnvironmentUrl + this.ReportInput.ApiReportPath, Obj).subscribe(
      (response) => {
        let linkSource: string = "";
        let fileName: string = "";
        if (this.ExportType == "XLS") {
          linkSource = 'data:application/xls;base64,' + response["ReturnObject"];
          fileName = "sample.xls";
        } else if (this.ExportType == "DOC") {
          linkSource = 'data:application/doc;base64,' + response["ReturnObject"];
          fileName = "sample.doc";
        } else if (this.ExportType == "JPDF") {
          linkSource = 'data:application/pdf;base64,' + response["ReturnObject"];
          fileName = "sample.pdf";
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
  }

  changeState() {
    this.CurrentState = this.CurrentState === 'initial' ? 'final' : 'initial';
    this.IsHidden = this.IsHidden === false ? true : false;
  }
}
