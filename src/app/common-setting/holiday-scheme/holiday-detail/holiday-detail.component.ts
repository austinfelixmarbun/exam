import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';
import { SearchComponent } from 'app/shared/search/search.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { HolidayDObj } from 'app/shared/model/HolidayDObj.Model';

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.scss'],
  providers: [NGXToastrService]
})
export class HolidayDetailComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchHolidayDetail.json";
  urlQryPaging : string = AdInsConstant.GetHolidayDetailPaging;
  urlEnviPaging : string = environment.foundationUrl;
  pageType: string = "add";
  holidaySchmHId: any;
  holidaySchmCode: any;
  holidaySchmName: any;
  isActive: boolean = false;
  editDetail: any = 'false';
  holidayObj: HolidayObj;
  holidayDObj: HolidayDObj;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  deleteUrl: any;
  searchUrl: any;
  foundationUrl: string = environment.foundationUrl;
  isEdit: boolean = false;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultDataSearch: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    
    this.apiUrl = this.foundationUrl + AdInsConstant.GetHolidaySchmH;
    this.addUrl = this.foundationUrl + AdInsConstant.AddHolidaySchmH;
    this.editUrl = this.foundationUrl + AdInsConstant.EditHolidaySchmHOnly;
    this.searchUrl = this.foundationUrl + AdInsConstant.GetHolidayDetailPaging;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteHolidaySchmD;

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.pageType = params["param"];
      }
      if (params["holidaySchmHId"] != null) {
        this.holidaySchmHId = params["holidaySchmHId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.isEdit = true;
      this.editDetail = 'true';

      this.holidayObj = new HolidayObj();
      this.holidayObj.holidaySchmHId = this.holidaySchmHId;
      this.http.post(this.apiUrl, this.holidayObj).subscribe(
        response => {
          this.resultData = response["returnObject"];
          this.holidaySchmCode = response["returnObject"]["holidaySchmCode"];
          this.holidaySchmName = response['returnObject']['holidaySchmName'];
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
        },
        error => {
          console.log(error);
        }
      );
      this.arrCrit = new Array();
      var critObj = new CriteriaObj();
        critObj.DataType = 'Numeric'
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.propName = 'holidaySchmHId';
        critObj.value = this.holidaySchmHId
        this.arrCrit.push(critObj);
    }
  }

  SaveHolidayForm(ReqHolidayForm: NgForm) {
    console.log(ReqHolidayForm.value);
    this.holidayObj = new HolidayObj();
    this.holidayObj = ReqHolidayForm.value;
    if (this.isActive === false) {
      this.holidayObj.isActive = "0";
    } else {
      this.holidayObj.isActive = "1";
    }
    
    if (this.pageType == "add") {
      this.http.post(this.addUrl, this.holidayObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/holiday"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.holidayObj.holidaySchmHId = this.holidaySchmHId;
      this.http.post(this.editUrl, this.holidayObj).subscribe(
        response => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response["message"]);
          this.router.navigate(["/commonSetting/holiday"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  toggleActive(e) {
    this.isActive = e.target.checked;
  }
  
  searchSort(event: any) {
    if (this.resultData != null) {
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
      this.searchComponent.search(this.searchUrl, this.pageNow, this.pageSize, order, this.arrCrit);
    }
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
    this.searchComponent.search(this.searchUrl, this.pageNow, this.pageSize, order, this.arrCrit);
  }

  delete(holidaySchmDId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.holidayDObj = new HolidayDObj();
      this.holidayDObj.holidaySchmDId = holidaySchmDId;
      this.http.post(this.deleteUrl, this.holidayDObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(1);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }

  //** Start UC Search **/
  getResult(event){
    this.resultDataSearch = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }
}
