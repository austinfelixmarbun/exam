import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CoyBodObj } from 'app/shared/model/CoyBodObj.Model';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-bod',
  templateUrl: './bod.component.html',
  styleUrls: ['./bod.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService, DecimalPipe]
})
export class BODComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
    urlJson: string = "./assets/search/searchBod.json";
    resultData: string;
    pageNow: any;
    totalData: any;
    pageSize: any;
    apiUrl: any;
    orderByKey: any = null;
    orderByValue: boolean = true;
    urlQryPaging : string = AdInsConstant.GetCoyBodPaging;
    urlEnviPaging : string = environment.foundationUrl;
    editUrl : any;
    bodObj : CoyBodObj;
    // array of all items to be paged
    private allItems: any[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];
    foundationUrl: string = environment.foundationUrl;
    refCoyId : any;
    constructor(private http: HttpClient,private route: ActivatedRoute, private spinner: NgxSpinnerService, private service: NGXToastrService, private adInsService: AdInsServiceService) {
      this.route.queryParams.subscribe(params => {
        this.refCoyId = params["refCoyId"];
    })
     }
  
    ngOnInit() {
      this.pageNow = 1;
      this.pageSize = 10;
      this.apiUrl = this.foundationUrl + AdInsConstant.GetCoyBodPaging;
    }
  
    getResult(event){
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

    reset(){
      this.searchComponent.initiateForm();
    }
    onSelect(event)
    {
      this.pageNow = event.pageNow;
      this.pageSize = event.pageSize;
      this.searchPagination(this.pageNow);
    }

    delete(coyBodId: any) {
      if(confirm("Are you sure to delete this record?")) {
        this.editUrl = this.foundationUrl + AdInsConstant.DeleteCoyBod;
        this.bodObj = new CoyBodObj();
        this.bodObj.coyBodId = coyBodId;
        this.http.post(this.editUrl, this.bodObj).subscribe(
          (response) => {
            console.log(response);
            this.searchPagination(1);
          });
      }
    }
}
