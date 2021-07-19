import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-listing',
  templateUrl: './family-listing.component.html',
})
export class FamilyListingComponent implements OnInit {

  @Input() CustId: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
