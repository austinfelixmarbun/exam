import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-family',
  templateUrl: './customer-family.component.html',
  styles: []
})
export class CustomerFamilyComponent implements OnInit {
  @Input() CustId: number;
  @Output() outputTab: EventEmitter<any>;
  FamilyIdToExclude: Array<number>;
  Mode: string;
  CustPersonalFamilyId: number;
  FamilyData: Object;
  IsFromFamily: boolean;
  IsFromShareholder: boolean;
  ShareholderObject: Object;

  constructor() { 
    this.outputTab = new EventEmitter<any>();
    this.FamilyData = new Object();
    this.IsFromFamily = true;
    this.IsFromShareholder = false;
    this.ShareholderObject = new Object();
    this.Mode = "Paging";
  }

  ngOnInit() {
    console.log("Cust Family Mode: " + this.Mode);
  }

  PagingToDetailHandler(event){
    this.Mode = event.Mode;
    this.CustPersonalFamilyId = event.CustPersonalFamilyId;
    this.FamilyIdToExclude = event.CustIdToExclude;
  }

  DetailToPagingHandler(event){
    if(event.StatusCode == 200){
      this.Mode = "Paging";
    }
    else if(event.StatusCode == 2001){
      this.Mode = "DuplicateChecking";
      this.FamilyData = event.FamilyData;
    }
  }

  next() {
    this.outputTab.emit({ stepMode: "next" });
  }
}
