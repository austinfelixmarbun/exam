import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-office-zipcode-member-paging',
  templateUrl: './office-zipcode-member-paging.component.html',
  providers: [NGXToastrService]
})
export class OfficeZipcodeMemberPagingComponent implements OnInit {
  //** Start UC Search **//
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  refOfficeId: any;
  officeCode: any;
  officeName: any;
  city: any;
  //** End UC Search **//
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  officeUrl: any;
  arrCrit: any;

  foundationUrl: any = environment.FoundationR3Url;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
    });
  }

  ngOnInit() {
    console.log("test");
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchOfficeZipcodeMember.json";
    this.inputObj.enviromentUrl = this.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetRefOfficeZipcodePaging;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOfficeZipcodePaging;
    this.officeUrl = this.foundationUrl + AdInsConstant.GetRefOfficeObj;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteOfficeZipcodeMember;

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'numeric'
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'refOfficeId';
    critObj.value = this.refOfficeId;
    this.arrCrit.push(critObj);
    this.inputObj.arrCritObj = this.arrCrit;

    this.initiateForm();
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null, this.arrCrit);
  }

  initiateForm() {
    var officeId = {refOfficeId: this.refOfficeId};
    this.http.post(this.officeUrl, officeId).subscribe(
      (response) => {
        this.officeCode = response['returnObject']['officeCode'];
        this.officeName = response['returnObject']['officeName'];
        this.city = response['returnObject']['city'];
      },
      (error) => {
        console.log(error);
      });

  }
  //** Start UC Search **/
  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
  }
  // delete(refJobId: any) {
  //   if (confirm("Are you sure to delete this record?")) {
  //     this.rjtObj = new RefJobTitleObj();
  //     this.rjtObj.RefJobTitleId = refJobId;
  //     this.http.post(this.deleteUrl, this.rjtObj).subscribe(
  //       (response) => {
  //         this.toastr.successMessage(response['message']);
  //         this.searchPagination(this.pageNow);
  //       });
  //   }
  // }
  delete(officeZipcodeMemberId: any) {
    if (confirm("Are you sure to delete this record?")) {
      var officeZipcodeMemberObj = {officeZipcodeMemberId : officeZipcodeMemberId};
      this.http.post(this.deleteUrl, officeZipcodeMemberObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(this.pageNow);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }
}
