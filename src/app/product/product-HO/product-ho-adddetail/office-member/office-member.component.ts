import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-office-member-HO',
  templateUrl: './office-member.component.html',
})
export class OfficeMemberHOComponent implements OnInit {

  isOn: any;
  @Input() objInput: any;
  ListOfficeMemberObj: any = {};
  
  constructor() { }

  ngOnInit() {
    this.isOn = true;
    console.log("obj office member");
    this.ListOfficeMemberObj["param"]=this.objInput["param"];
    this.ListOfficeMemberObj["result"] = [];
    console.log(this.objInput);
    console.log(this.ListOfficeMemberObj);
  }

  GetSearchedOfficeObjOutput(ev: any){
    console.log(ev);
  }

  ChangeComponent(ev: any){
    console.log(ev);
    this.isOn = ev.isOn;
    console.log("data obj office member");
    this.ListOfficeMemberObj["result"] = ev.result;
    console.log(this.ListOfficeMemberObj);
  }
}
