import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-surveyor-paging',
  templateUrl: './surveyor-paging.component.html',
  styleUrls: ['./surveyor-paging.component.css']
})
export class SurveyorPagingComponent implements OnInit {

  readonly AddLink: string = NavigationConstant.SURVEYOR_ADD;

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyor.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyor.json";
  }

}
