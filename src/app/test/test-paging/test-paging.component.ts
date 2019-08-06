import { Component, OnInit, ViewChild } from '@angular/core';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';

@Component({
  selector: 'app-test-paging',
  templateUrl: './test-paging.component.html',
  styleUrls: ['./test-paging.component.scss']
})
export class TestPagingComponent implements OnInit {

  @ViewChild('satu') ucSatu : UcAddressComponent;
  @ViewChild('dua') ucDua : UcAddressComponent;
  noSatu: any = "0";
  noDua: any = "1";

  constructor() { }

  ngOnInit() {
    this.ucSatu.addr = "SATU";
    this.ucDua.addr = "DUA";
  }

  saveForm(form, one, two){
    console.log(form);
    console.log(one);
    console.log(two);
  }
}
