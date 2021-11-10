import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-holiday-paging',
  templateUrl: './holiday-paging.component.html'
})
export class HolidayPagingComponent implements OnInit {
  
  inputObj: UcPagingObj = new UcPagingObj();
  readonly AddLink: string = NavigationConstant.CS_HOLIDAY_ADD;
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputObj._url = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.pagingJson = "./assets/ucpaging/searchHoliday.json";

  }

 


}
