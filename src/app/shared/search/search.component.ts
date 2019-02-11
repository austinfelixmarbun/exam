import { Component, OnInit, Input, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { formatDate, getLocaleDateTimeFormat, DecimalPipe} from '@angular/common';
import 'rxjs/add/operator/map';
import {CriteriaObj} from '../model/CriteriaObj.model';
import {RequestCriteriaObj} from '../model/RequestCriteriaObj.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AdInsConstant } from '../AdInstConstant';
import { AdInsHttpServiceService } from 'app/ad-ins-http-service.service';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import {HttpRequestObj} from 'app/shared/model/HttpRequestObj.model';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ DecimalPipe ]
})
export class SearchComponent implements OnInit{
  @ViewChild('formIdSearch') myForm: ElementRef;
  @Input() _url: string;
  tempUrl: string;
  urlGet: string;
  server: any;
  configuration: any;
  result: any;
  itemUrl: any;
  isDataLoaded: boolean = false;
  form: FormGroup;
  payLoad = '';
  countForm = 0;
  formattedAmount = '';
  amount = 0;
  constructor(private http: HttpClient,private adInsService: AdInsServiceService,private decimalPipe : DecimalPipe, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
  }



  initiateForm() {
    this.getJSON(this._url).subscribe(data => {
      console.log(data);
      this.configuration = data;
      this.urlGet = data.url;
      this.countForm = data.component.length;
      console.log(this.countForm);
      this.isDataLoaded = true;
      var i = 0;
      for (var i = 0; i < this.countForm; i++) {
        //ini kalau datanya di load dari URL
        if (data.component[i].isFromURL == true) {
          var _this = this;
          var _index = i;
          //lempar objectnya sekalian sama urlnya, nnti di bind di dalem karena masalah di asyncnya
          //biar tiap function ada state2nya sendiri
          this.resolveObject(data.component[i],data.component[i].url);
        }

        if(data.component[i].type ==="numeric")
        {
          data.component[i].value = parseFloat(data.component[i].value).toLocaleString('en'); 
        }

        //pengecekan tanggal
        if(data.component[i].type==="datepicker")
        {
          if(data.component[i].value.includes("BD")){
            console.log("VALUE " + data.component[i].value);
            let businessDate = new Date(JSON.parse(localStorage.getItem("UserContext")).BusinessDate);
            console.log("BD " + businessDate);
            var operator = data.component[i].value.charAt(2);
            var dateShow = new Date();
            console.log("show :" + dateShow);
            console.log("FMT : " + dateShow.getDate());
            if(operator==="-")
            {
              var tempMinus = data.component[i].value.split("-",2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate()-numDay);
            }
            else if(operator==="+")
            {
              var tempMinus = data.component[i].value.split("+",2);
              var numDay = parseInt(tempMinus[1]);
              dateShow.setDate(businessDate.getDate()+numDay);
            }
            var dateText=formatDate(dateShow, 'yyy-MM-dd', 'en-US')
            data.component[i].value = dateText;
          }
        }
      }
    });

  }

  ngOnInit() {
    let js = this._renderer2.createElement('script');
    js.text = `
          $(document).ready(function(){
            $("#flip").click(function(){
              $("#panel").slideToggle("slow");
            });
          });
        `;
    this._renderer2.appendChild(this._document.body, js);
    this.initiateForm();
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    console.log("This is Payload:" + this.payLoad);
  }

  search() {
    console.log("This Call Search");
    console.log(this.myForm);
    for (var i = 0; i < this.countForm; i++) {
      console.log(this.myForm.nativeElement[i].name + " - " + this.myForm.nativeElement[i].value);
    }
  }

  callSearch(pageNo:number,rowPerPage:number,orderBy:any){
    console.log(pageNo);
    var request = new RequestCriteriaObj();
    var arrCrit = new Array();

    request.pageNo=pageNo;
    request.rowPerPage=rowPerPage;
    request.orderBy=orderBy;

    for (var i = 0; i < this.countForm; i++) {
      var critObj = new CriteriaObj();
      var component = this.myForm.nativeElement[i];
      //console.log(component);
      //Ini khusus kalau dari Drop Down
      if(component.nodeName ==='SELECT')
      {
        var ddl = component.options;
        var text = ddl[ddl.selectedIndex].value;
        //Kalau Dari Dropdown udah pasti pake Eq
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.propName = component.name;
        critObj.value = text;
      }
      
      else{
        //Kalau ada Percent maka yang dipake nnti adalah Restrictions Like
        critObj.propName = component.name;
        critObj.value = component.value;
        console.log(component.type);
        if(component.value.includes("%"))
        {
          critObj.restriction=AdInsConstant.RestrictionLike;
          
        }
        //kalau componentnya Date, restrictionsnya lgsg ambil dari property JSONnya
        else if(component.type==='date')
        {
          critObj.restriction=component.title;
        }
        else if(component.type==='number')
        {
          critObj.restriction=component.title;
        }
        else{
          critObj.restriction = AdInsConstant.RestrictionEq
        }
      }
      arrCrit.push(critObj);
      
    }

    request.criteria=arrCrit;
    var temp=this.adInsService.postData(AdInsConstant.GetListProduct,request);
    this.adInsService.postData(AdInsConstant.GetListProduct,request)
    .subscribe(
      (response) => 
        {
          console.log("Success");
          console.log(response);
        },
      (error) => 
      {
        console.log("Error");
        console.log(error)
      }
    );
    // this.http.get<any>('https://ipinfo.io/json')
    // .subscribe( data => {
    //   console.log(data.ip);
    // });
    //console.log(this.adInsService.postData('a','b'));
  }

  lessThanFour(): boolean {
    if (this.countForm > 3) {
      return false;
    }
    else {
      return true;
    }
  }

  resolveObject(obj:any,url:string){
    const val=this.getJSON(url);
      val.subscribe(tempData => {
        obj.itemsUrl = tempData;
      });
  }

  transformAmount(element: any){

    this.formattedAmount = parseFloat(element.target.value).toLocaleString('en');
    // Remove or comment this line if you dont want 
    // to show the formatted amount in the textbox.
    element.target.value = this.formattedAmount;
}

transformToDecimal(element: any)
{
  element.target.value = parseFloat(element.target.value.toString().replace(/,/g, ''));
}

}
