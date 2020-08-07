import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-office-member',
  templateUrl: './office-member.component.html',
})
export class OfficeMemberComponent implements OnInit {

  isOn: any;
  @Input() objInput: any;
  ListOfficeMemberObj: any = {};
  
  constructor() { }

  ngOnInit() {
    this.isOn = true;
    this.ListOfficeMemberObj["param"]=this.objInput["param"];
    this.ListOfficeMemberObj["result"] = [];
  }

  GetSearchedOfficeObjOutput(ev: any){
  }

  ChangeComponent(ev: any){
    this.isOn = ev.isOn;
    this.ListOfficeMemberObj["result"] = ev.result;
  }
}
