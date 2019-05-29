import { Component, OnInit, ViewChild } from '@angular/core';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { WorkingHourSchmHObj } from 'app/shared/model/WorkingHourSchmHObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-working-hour-paging',
  templateUrl: './working-hour-paging.component.html',
  styleUrls: ['./working-hour-paging.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class WorkingHourPagingComponent implements OnInit {

  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @ViewChild(UCSearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchWorkingHour.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  workingHourSchmHObj: WorkingHourSchmHObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  urlQryPaging : string = AdInsConstant.GetWorkHourSchmHPaging;
  urlEnviPaging : string = environment.foundationUrl;
  foundationUrl: string = environment.foundationUrl;
  
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetWorkHourSchmHPaging;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteWorkingHourSchmH;
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
    this.resultData = event.response.returnObject;
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

  delete(workingHourSchmHId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.workingHourSchmHObj = new WorkingHourSchmHObj();
      this.workingHourSchmHObj.workingHourSchmHId = workingHourSchmHId;
      this.http.post(this.deleteUrl, this.workingHourSchmHObj).subscribe(
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
