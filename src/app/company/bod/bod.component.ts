import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CoyBodObj } from 'app/shared/model/CoyBodObj.Model';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-bod',
  templateUrl: './bod.component.html',
  providers: [NgbPaginationConfig, NGXToastrService, DecimalPipe]
})
export class BODComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  editUrl: any;
  bodObj: CoyBodObj;
  foundationUrl: any = environment.FoundationR3Url;
  refCoyId: any;
  
  readonly CancelLink: string = NavigationConstant.COY;
  readonly AddLink: string = NavigationConstant.COY_BOD_ADD;
  readonly EditLink: string = NavigationConstant.COY_BOD_ADD;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.refCoyId = params["refCoyId"];
    })
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchBod.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = URLConstant.GetCoyBodPaging;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + URLConstant.GetCoyBodPaging;
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
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

  onChange() {
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  reset() {
    this.searchComponent.initiateForm();
  }
  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  delete(coyBodId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.editUrl = this.foundationUrl + URLConstant.DeleteCoyBod;
      this.bodObj = new CoyBodObj();
      this.bodObj.coyBodId = coyBodId;
      this.http.post(this.editUrl, this.bodObj).subscribe(
        (response) => {
          this.searchPagination(1);
        });
    }
  }
}
