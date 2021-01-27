import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-company-data',
  templateUrl: './customer-company-data.component.html'
})
export class CustomerCompanyComponent implements OnInit {
 
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  
}
