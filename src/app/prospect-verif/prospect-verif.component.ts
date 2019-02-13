import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SearchComponent } from '../shared/search/search.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response } from '@angular/http';
import { data } from 'app/shared/data/smart-data-table';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-prospect-verif',
  templateUrl: './prospect-verif.component.html',
  styleUrls: ['./prospect-verif.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class ProspectVerifComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent;
  textbox1: string = 'asd';
  urlJson: string = './assets/search/searchprospectverif.json';
  configuration: any;
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;

  constructor(private http: Http, private spinner: NgxSpinnerService,  private service: NGXToastrService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 25;
  }

  search() {
    this.spinner.show();
    this.searchComponent.callSearch(this.pageNow, this.pageSize, null)
        .subscribe(
            (response) => {
                console.log("Success");
                this.resultData = response;
                this.totalData = response.count;
                console.log(response);
                this.spinner.hide();
            },
            (error) => {
                console.log("Error");
                console.log(error);
                this.spinner.hide();
            }
        );
}

pageChange(page:number)
{
    this.pageNow = page;
    this.search();
}

// Success Type
typeSuccess(){
    this.service.typeSuccess();
}

typeError() {
    this.service.typeError();
}

timeout() {
    this.service.timeout();
}

errMsg() {
    this.service.errorMessage('asdasd');
}
}
