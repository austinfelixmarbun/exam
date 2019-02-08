import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
  providers: [NgbPaginationConfig] // add NgbPaginationConfig to the component providers
})
export class OfficeComponent implements OnInit {

  urlJson:string = "./assets/search/searchOffice.json";
  page5 = 4;

  constructor() { }

  ngOnInit() {
  }

}
