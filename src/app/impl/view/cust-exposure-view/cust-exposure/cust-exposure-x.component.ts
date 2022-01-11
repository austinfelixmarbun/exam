import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstantX } from 'app/impl/shared/constant/URLConstantX';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CrdExpsrAppAgrHistObj } from 'app/shared/model/credit-review/crd-expsr-app-agr-hist-obj.model';
import { CustExpsrBucketObj } from 'app/shared/model/credit-review/cust-expsr-bucket-obj.model';
import { CustExpsrDObj } from 'app/shared/model/credit-review/cust-expsr-d-obj.model';
import { CustExpsrHObj } from 'app/shared/model/credit-review/cust-expsr-h-obj.model';

@Component({
  selector: 'app-cust-exposure-x',
  templateUrl: './cust-exposure-x.component.html'
})
export class CustExposureXComponent implements OnInit {
  @Input() exposureHObj: CustExpsrHObj = new CustExpsrHObj();
  @Input() exposureType: string = CommonConstant.ExposureCustTypeCode;
  @Input() custNo: string = "";

  //#region Role Type
  readonly RoleCust: string = CommonConstant.RoleCustData;
  readonly RoleFam: string = CommonConstant.RoleFamilyData;
  readonly RoleGuarantor: string = CommonConstant.RoleGuarantorData;
  readonly RoleShareholder: string = CommonConstant.RoleShareholder;
  //#endregion

  TotalInstallmentDsf: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    // private fb: FormBuilder
  ) { }

  ExposureDObj: CustExpsrDObj = new CustExpsrDObj();
  IsReady: boolean = false;
  async ngOnInit() {
    this.SetExposureDObj();
    this.GetTotalMonthlyInstallmentDSF();
    await this.GetListCustExpsrBucketByCustExpsrDId();
    await this.GetListCustExpsrAppAgrHistByCustExpsrHId();
    this.IsReady = true;
  }

  SetExposureDObj() {
    if (this.exposureHObj == null) return;
    if (this.exposureHObj.ListCustExpsrDObj.length > 0) {
      let tempObj: CustExpsrDObj = this.exposureHObj.ListCustExpsrDObj.find(x => x.ExposureType == this.exposureType);
      if (tempObj != null) {
        this.ExposureDObj = tempObj;
      }
    }
  }

  ListCustExpsrBucketObj: Array<CustExpsrBucketObj> = new Array<CustExpsrBucketObj>();
  async GetListCustExpsrBucketByCustExpsrDId() {
    if (this.exposureHObj == null) return;
    await this.http.post<{ ListCustExpsrBucketObj: Array<CustExpsrBucketObj> }>(URLConstant.GetListCustExpsrBucketByCustExpsrDId, { Id: this.ExposureDObj.CustExpsrDId }).toPromise().then(
      (response) => {
        this.ListCustExpsrBucketObj = response.ListCustExpsrBucketObj;
      }
    );
  }

  ListCrdExpsrAppAgrHistObj: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();
  async GetListCustExpsrAppAgrHistByCustExpsrHId() {
    if (this.exposureHObj == null) return;
    await this.http.post<{ ListCrdExpsrAppAgrHistObj: Array<CrdExpsrAppAgrHistObj> }>(URLConstant.GetListCustExpsrAppAgrHistByCustExpsrHId, { Id: this.exposureHObj.CustExpsrHId }).toPromise().then(
      (response) => {
        for (let index = 0; index < response.ListCrdExpsrAppAgrHistObj.length; index++) {
          const element = response.ListCrdExpsrAppAgrHistObj[index];
          if (element.RoleCust == this.RoleCust) {
            this.ListCrdExpsrAppAgrHistObj.push(element);
          }
        }
      }
    );
  }

  GetTotalMonthlyInstallmentDSF(){
    if(this.custNo != ""){
      let getExposureR2Url = "";
      if(this.exposureType == CommonConstant.ExposureCustTypeCode){
        getExposureR2Url = URLConstantX.GetR2CustExposureByCustNo;
      }
      else if(this.exposureType == CommonConstant.ExposureCustGroupTypeCode){
        getExposureR2Url = URLConstantX.GetR2CustGroupExposureByCustNo;
      }
      if(getExposureR2Url != ""){
        this.http.post<any>(getExposureR2Url, { Code : this.custNo }).subscribe(
          (response) => {
            this.TotalInstallmentDsf = response.TotalInstAmount;
          }
        );
      }
    }
  }
}
