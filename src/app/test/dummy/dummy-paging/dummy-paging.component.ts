import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy-paging',
  templateUrl: './dummy-paging.component.html',
  styleUrls: ['./dummy-paging.component.scss']
})
export class DummyPagingComponent implements OnInit {

  resultData:any;
  headerList:any;
  searchSort:any;

  constructor() { }

  ngOnInit() {
  }

}
