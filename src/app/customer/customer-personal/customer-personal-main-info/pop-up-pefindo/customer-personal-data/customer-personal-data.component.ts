import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-personal-data',
  templateUrl: './customer-personal-data.component.html'
})
export class CustomerPersonalDataComponent implements OnInit {
 
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  
}
