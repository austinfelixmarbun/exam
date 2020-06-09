import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-holiday-paging',
  templateUrl: './holiday-paging.component.html',
  styleUrls: ['./holiday-paging.component.scss'],
  providers: [NGXToastrService]
})
export class HolidayPagingComponent implements OnInit {
  
  inputObj: any;
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.enviromentUrl = "http://r3app-server.ad-ins.com/Foundation_R3";
    this.inputObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputObj.pagingJson = "./assets/ucpaging/searchHoliday.json";
    this.inputObj.deleteUrl = "/HolidaySchm/DeleteHolidaySchmH";

  }

 


}
