import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcModuleSelectionObj } from 'app/shared/model/library/uc-module-selection-obj.model';

@Component({
  selector: 'app-module-selection',
  templateUrl: './module-selection.component.html',
  styleUrls: ['./module-selection.component.css']
})
export class ModuleSelectionComponent implements OnInit {
  moduleSelectionObj: UcModuleSelectionObj = new UcModuleSelectionObj();

  constructor() { }

  ngOnInit() {
    this.moduleSelectionObj.urlJson = './assets/module-selection.json';
  }
}
