import { Component, OnInit, Input, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DOCUMENT } from '@angular/common';


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
  isHidden = true;
  constructor(private http: HttpClient,private _renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
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

  getServer(url: string): Observable<any> {
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
  }

  getDataPromise(url: string): Promise<any[]> {
    return this.http.get<any[]>(url)
      .toPromise()
      .then((response) => response);
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
