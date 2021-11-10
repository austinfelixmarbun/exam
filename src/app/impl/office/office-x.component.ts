import {Component, OnInit} from '@angular/core';
import {NavigationConstant} from 'app/shared/NavigationConstant';
import {UcPagingObj} from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-office-x',
  templateUrl: 'office-x.component.html'
})
export class OfficeXComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.OFFICE_ADD;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOffice.json";
    this.inputPagingObj.isSearched = true;
    this.inputPagingObj.delay = 200;

  }
}
