import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { HolidayObj } from 'app/shared/model/HolidayObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-holiday-paging',
  templateUrl: './holiday-paging.component.html',
  styleUrls: ['./holiday-paging.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class HolidayPagingComponent implements OnInit {

  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @ViewChild(UCSearchComponent) searchComponent;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  holidayObj: HolidayObj;
  orderByKey: any = null;
  orderByValue: boolean = true;
  foundationUrl: any = environment.FoundationR3Url;
  
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.enviromentUrl = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.inputObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputObj.pagingJson = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.deleteUrl = "/HolidaySchm/DeleteHolidaySchmH";

  }

  // searchSort(event: any) {
  //   if (this.resultData != null) {
  //     if (this.orderByKey == event.target.attributes.name.nodeValue) {
  //       this.orderByValue = !this.orderByValue
  //     } else {
  //       this.orderByValue = true
  //     }
  //     this.orderByKey = event.target.attributes.name.nodeValue
  //     var order = {
  //       key: this.orderByKey,
  //       value: this.orderByValue
  //     }
  //     this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
  //   }
  // }


 


}
