import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/cust-obj.model';

@Component({
  selector: 'app-customer-view-asli-ri',
  templateUrl: './customer-view-asli-ri.component.html'
})
export class CustomerViewAsliRiComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private sanitizer: DomSanitizer) 
  {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
      if (params['CustNo'] != null) {
        this.CustNo = params['CustNo'];
      }
    });
  }

  CustId: string = null;
  CustNo: string = null;
  custObj: CustObj = new CustObj();
  code: string;
  MrCustModelName: string;
  IDType: string;
  DataAsliRi: any;
  isReady: boolean;
  img: any;
  url: string;

  async ngOnInit() {
    console.log(this.CustId)
    console.log(this.CustNo)

    await this.GetDataCustObj()

    if(this.custObj.MrCustTypeCode == CommonConstant.CustTypePersonal)
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

  async GetDataCustObj()
  {
    if(this.CustId != null)
    {
      await this.http.post(URLConstant.GetCustByCustId, { Id: this.CustId }).toPromise().then(
        (response: CustObj) => {
          this.custObj = response;
        }
      );
    }
    else
    {
      await this.http.post(URLConstant.GetCustByCustNo, { CustNo: this.CustNo }).toPromise().then(
        (response: CustObj) => {
          this.custObj = response;
        }
      );
    }

    console.log(this.custObj)
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
}