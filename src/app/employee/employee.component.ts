import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { Http } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { SearchComponent } from 'app/shared/search/search.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class EmployeeComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson:string = "./assets/search/searchEmployee.json";
  resultData : string;
  pageNow : any;
  totalData : any;
  pageSize: any;
  apiUrl: any;

  foundationUrl: string = environment.foundationUrl;
  constructor(private http: Http, private spinner: NgxSpinnerService, private service: NGXToastrService, private adInsService: AdInsServiceService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize= 25;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetListEmployee;
  }

  search() {
    this.spinner.show();
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
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

  pageChange(page: number) {
    this.pageNow = page;
    this.search();
  }
  
  // Success Type
  typeSuccess() {
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
 