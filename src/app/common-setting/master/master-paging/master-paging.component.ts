import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { environment } from 'environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';

@Component({
  selector: 'app-master-paging',
  templateUrl: './master-paging.component.html',
  providers: [NGXToastrService, NGXToastrService]
})
export class MasterPagingComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlJson: string = './assets/search/searchMaster.json';
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  deleteUrl: any;
  show: any;
  exportData: any;
  excelData: any;
  refMasterObj : RefMasterObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  settingUrl: string = environment.settingUrl;
  urlQryPaging: string = AdInsConstant.GetRefMasterPaging;
  urlEnviPaging : string = environment.settingUrl;
  addCrit: CriteriaObj[];

  constructor(
    private service: NGXToastrService,
    private https: HttpClient
  ) { }

  ngOnInit() {
    console.log('masuk');
    this.show = AdInsConstant.showData.split(',');
    this.pageNow = 1;
    this.pageSize = this.show[0];
    this.apiUrl = this.settingUrl + AdInsConstant.GetRefMasterPaging;
    this.initiateForm()
    // this.adInsService.postData(this.settingUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
  }

  getResult(event) {
    console.log(event);
    this.resultData = event;
    this.totalData = event.returnObject.count;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  initiateForm() {
    this.addCrit = new Array();
    var critIsActive = new CriteriaObj();
    critIsActive.propName = "is_System";
    critIsActive.value = "No";
    critIsActive.restriction = AdInsConstant.RestrictionEq;

    this.addCrit.push(critIsActive);
  }

  del(id: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.deleteUrl = this.settingUrl + AdInsConstant.DeleteRefMaster;
      this.refMasterObj = new RefMasterObj();
      this.refMasterObj.refMasterId = +id;
      this.https.post(this.deleteUrl, this.refMasterObj).subscribe(
        (response) => {
          this.service.successMessage(response['message']);
          var order = null;
          if (this.orderByKey != null) {
            order = {
              key: this.orderByKey,
              value: this.orderByValue
            }
          }
          this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
            .subscribe(
              (response) => {
                console.log("Success");
                this.resultData = response;
                this.totalData = response.returnObject.count;
                console.log(this.resultData);
              },
              (error) => {
                console.log("Error");
                console.log(error);
              }
            );
        });
    }
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
    console.log(this.apiUrl);
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          this.service.typeErrorCustom(error);
        }
      );
  }

}
