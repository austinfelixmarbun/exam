import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';

@Component({
  selector: 'app-asli-ri-view',
  templateUrl: './asli-ri-view.component.html',
  styleUrls: ['./asli-ri-view.component.css']
})
export class AsliRiViewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private http: HttpClient,
              private sanitizer: DomSanitizer) { }

  @Input() MrCustTypeCode: string;
  @Input() custObj: CustObj;
  MrCustModelName: string;
  IDType: string;
  code: string;
  DataAsliRi: any;
  isReady: boolean;
  img: any;
  url: string;

  readonly FileExtAllowedAsliRI: Array<string> = [CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionPng, CommonConstant.FileExtensionBmp]

  async ngOnInit() {

    if(this.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      this.code = ""
      if(this.custObj.MrIdTypeCode == CommonConstant.MrIdTypeCodeEKTP)
      {
        this.code = this.custObj.IdNo
      }
    }
    else
    {
      this.code = this.custObj.TaxIdNo
    }

    await this.http.post(URLConstant.GetRefMasterByMasterCode, {Code : this.custObj.MrCustModelCode}).toPromise().then(
      (res: any) => {
        this.MrCustModelName = res.Descr;
      })

    if(this.custObj.MrIdTypeCode != null)
    {
      await this.http.post(URLConstant.GetRefMasterByMasterCode, {Code : this.custObj.MrIdTypeCode}).toPromise().then(
        (res: any) => {
          this.IDType = res.Descr;
        })
    }

    await this.GetData()
    await this.convertImage()


  }

  async GetData()
  {
    await this.http.post(URLConstant.GetTrxSrcDataForAsliRi, {Code: this.code}).toPromise().then(
      (res: any) => {
        console.log(res)
        this.DataAsliRi = res;
        this.isReady = true;
      })
  }

  async convertImage()
  {
    this.url = "data:image/jpg|jpeg|png|bmp;base64"
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.url}, ${this.DataAsliRi.reqAddTrxSrcDataForAsliRiObj.SelfiePhoto}`);
  }

  close()
  {
    this.activeModal.dismiss('Cross click')
  }
}
