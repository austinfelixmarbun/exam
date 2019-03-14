import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from '../../environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { OrganizationObj } from 'app/shared/model/OrganizationObj.Model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class OrganizationComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchOrganization.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  show: any;

  foundationUrl: string = environment.foundationUrl;
HttpClient
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private adInsService: AdInsServiceService
  ) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOrgPaging;
    this.show = AdInsConstant.showData.split(',');
    // this.adInsService.postData(this.foundationUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  search() {
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
          console.log(response);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  pageChange(page: number) {
    this.pageNow = page;
    this.search();
  }

  del(id: number): void {
    var url = this.foundationUrl + AdInsConstant.DeleteRefOrg;
    var organizObj: OrganizationObj;
    organizObj = new OrganizationObj();
    organizObj.refOrgId = id;
    this.http.post(url, organizObj).subscribe(
      (response) => {
        console.log("Success Delete");
        console.log(response);
        this.service.typeSave('Delete Successed');
        location.reload();
      },
      (error) => {
        console.log("Error Delete");
        console.log(error);
        this.service.typeSave('error');
      }
    );
  }
  changeShowData(value: any) {
    this.pageSize = +value;
    if (this.resultData !== null && this.resultData !== '' && this.resultData !== undefined) { this.search(); }
  }
}
