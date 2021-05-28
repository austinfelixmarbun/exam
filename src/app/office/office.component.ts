import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html'
})

export class OfficeComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.OFFICE_ADD;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.isSearched = true;
    this.inputPagingObj.delay = 200;
  }
}
