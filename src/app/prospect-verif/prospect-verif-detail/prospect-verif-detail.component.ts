import { ProspectObj } from './../../shared/model/ProspectObj.Model';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prospect-verif-detail',
  templateUrl: './prospect-verif-detail.component.html',
  styleUrls: ['./prospect-verif-detail.component.scss']
})
export class ProspectVerifDetailComponent implements OnInit {

  @Input() ProsObj: ProspectObj;

  constructor(private location: Location) {
  }

  ngOnInit(): void {
    this.ProsObj = new ProspectObj()


    this.ProsObj.CustModel = 'SME';
    this.ProsObj.CustName = 'Danang Argasuma';
    this.ProsObj.KtpNo = '20180001000325';
    this.ProsObj.NpwpNo = '20180001000324';
    this.ProsObj.PhoneNo = '08999293613';
    this.ProsObj.MotherMaidenName = 'Ibu Kandung';
    this.ProsObj.BirthDt = '20/11/1990';
    this.ProsObj.BirthPlace = 'Jakarta';
    this.ProsObj.Address = 'Jl Raya Bekasi No 08 Cakung Jakarta Timur';
    this.ProsObj.Email = 'danang@gmail.com';
    this.ProsObj.Gender = 'Laki - Laki';
    this.ProsObj.Income = '5,000,000.00 - 10,000,000.00'
    this.ProsObj.Job = 'PNS';

  }

  Back(): void {
    this.location.back();
  }

  Save(prsReqFoem: NgForm): void {
    this.ProsObj = new ProspectObj();
    this.ProsObj = prsReqFoem.value;
    console.log('print: ', this.ProsObj);
  }
}
