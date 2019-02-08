import { Component, OnInit, Input, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import {CriteriaObj} from '../model/CriteriaObj.model';
import {RequestCriteriaObj} from '../model/RequestCriteriaObj.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AdInsConstant } from '../AdInstConstant';
import { AdInsHttpServiceService } from 'app/ad-ins-http-service.service';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import {HttpRequestObj} from 'app/shared/model/HttpRequestObj.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
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
  constructor(private http: HttpClient,private adInsService: AdInsServiceService) {
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
        if (data.component[i].isFromURL == true) {
          var _this = this;
          var _index = i;
          //lempar objectnya sekalian sama urlnya, nnti di bind di dalem karena masalah di asyncnya
          //biar tiap function ada state2nya sendiri
          this.resolveObject(data.component[i],data.component[i].url);
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
        if(component.value.includes("%"))
        {
          critObj.restriction=AdInsConstant.RestrictionLike;
          
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

}
