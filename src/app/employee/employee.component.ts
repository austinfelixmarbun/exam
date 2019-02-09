import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NgbPaginationConfig] // add NgbPaginationConfig to the component providers
})
export class EmployeeComponent implements OnInit {

  urlJson:string = "./assets/search/searchEmployee.json";
  page5 = 1;

  constructor() { }

  ngOnInit() {
  }

}
