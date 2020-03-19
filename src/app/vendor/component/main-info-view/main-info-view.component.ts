import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-info-view',
  templateUrl: './main-info-view.component.html',
  styleUrls: ['./main-info-view.component.scss']
})
export class MainInfoViewComponent implements OnInit {
  viewObj: any;

  constructor() { }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewVendorHO.json"
  }

}
