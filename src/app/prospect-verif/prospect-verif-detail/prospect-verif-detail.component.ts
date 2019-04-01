import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProspectObj } from 'app/shared/model/ProspectObj.Model';

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

    this.ProsObj.CustName = 'Danang Argasuma';
    this.ProsObj.KtpNo = '20180001000325';
    this.ProsObj.BirthPlace = 'Jakarta';
    this.ProsObj.MotherMaidenName = 'Ibu Kandung';
    this.ProsObj.PhoneNo = '08999293613';
    this.ProsObj.MblPhoneNo = '08517294448';
    this.ProsObj.Addr = 'Jl Raya Bekasi No 08 Cakung Jakarta Timur';
    this.ProsObj.Rt = '01';
    this.ProsObj.Rw = '05';
    this.ProsObj.Zipcode = '11260';
    this.ProsObj.Kelurahan = 'Kebon Jeruk';
    this.ProsObj.Kecamatan = 'Kebon Jeruk';
    this.ProsObj.City = 'jakarta';
    this.ProsObj.Province = 'Jawa';

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
