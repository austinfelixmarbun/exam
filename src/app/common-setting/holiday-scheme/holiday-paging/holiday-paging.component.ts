import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { SearchComponent } from 'app/shared/search/search.component';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-holiday-paging',
  templateUrl: './holiday-paging.component.html',
  styleUrls: ['./holiday-paging.component.scss'],
  providers: [NGXToastrService]
})
export class HolidayPagingComponent implements OnInit {

  @ViewChild(UCGridFooterComponent) ucgridFooter;
  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchHoliday.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  holidayObj: HolidayObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  urlQryPaging : string = AdInsConstant.GetHolidayPaging;
  urlEnviPaging : string = environment.foundationUrl;
  foundationUrl: string = environment.foundationUrl;
  
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetHolidayPaging;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteHolidaySchmH;
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
  }

  //** Start UC Search **/
  getResult(event){
    this.resultData = event.returnObject;
    this.totalData = event.returnObject.count;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  delete(holidaySchmHId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.holidayObj = new HolidayObj();
      this.holidayObj.holidaySchmHId = holidaySchmHId;
      this.http.post(this.deleteUrl, this.holidayObj).subscribe(
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
}
