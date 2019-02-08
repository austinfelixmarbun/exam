import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  urlJson:string = "./assets/search/searchOffice.json";

  constructor() { }

  ngOnInit() {
  }

}
