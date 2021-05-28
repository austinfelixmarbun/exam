import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';


@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html'
})
export class ProfessionComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_PROFESSION_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchProfession.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchProfession.json";
  }
}
