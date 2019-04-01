import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  name = 'Angular';
  public items = [
      { name: 'John', otherProperty: 'Foo' },
      { name: 'Joe', otherProperty: 'Bar' }
  ];
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  showMessage(message: any) {
    console.log(message);
  }
  constructor() { }

  ngOnInit() {
  }

}
