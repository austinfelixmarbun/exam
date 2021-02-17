import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-holiday-paging',
  templateUrl: './holiday-paging.component.html',
  providers: [NGXToastrService]
})
export class HolidayPagingComponent implements OnInit {
  
  inputObj: any;
  readonly AddLink: string = NavigationConstant.CS_HOLIDAY_ADD;
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputObj.pagingJson = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.deleteUrl = "/HolidaySchm/DeleteHolidaySchmH";

  }

 


}
