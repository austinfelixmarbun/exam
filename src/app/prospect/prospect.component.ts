import { FormGroup, FormControl } from '@angular/forms';
import { value } from './../shared/data/dropdowns';
import { formatDate } from '@angular/common';
import { ProspectObj } from './../shared/model/ProspectObj.Model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrls: ['./prospect.component.scss']
})
export class ProspectComponent implements OnInit {

  birthDate: string;
  Gender = 'M';
  CustModel = 'Professional';
  Income = 'income1';

  prosObj: ProspectObj;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  Back(): void {
    this.location.back();
  }

  Save(prsReqFoem: NgForm): void {
    this.prosObj = new ProspectObj();
    this.prosObj = prsReqFoem.value;
    console.log('print: ', this.prosObj);
  }
}
