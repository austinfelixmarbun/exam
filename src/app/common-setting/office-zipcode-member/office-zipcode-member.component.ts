import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-office-zipcode-member',
  templateUrl: './office-zipcode-member.component.html'
})
export class OfficeZipcodeMemberComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  constructor() {
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchOfficeZipcodeMember.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchOfficeZipcodeMemberGridPaging.json"
  }
  
}
