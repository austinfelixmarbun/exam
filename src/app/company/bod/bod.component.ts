import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bod',
  templateUrl: './bod.component.html',
  styleUrls: ['./bod.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class BODComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
    urlJson: string = "./assets/search/searchBod.json";
    resultData: string;
    pageNow: any;
    totalData: any;
    pageSize: any;
    apiUrl: any;
    orderByKey: any = null;
    orderByValue: boolean = true;
    urlQryPaging : string = AdInsConstant.GetCoyBodPaging;
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
      this.resultData = event.returnObject;
      this.totalData = event.returnObject.count;
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
}
