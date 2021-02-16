import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CrdExpsrAppAgrHistObj } from 'app/shared/model/CreditReview/CrdExpsrAppAgrHistObj.Model';
import { CustExpsrBucketObj } from 'app/shared/model/CreditReview/CustExpsrBucketObj.Model';
import { CustExpsrDObj } from 'app/shared/model/CreditReview/CustExpsrDObj.Model';
import { CustExpsrHObj } from 'app/shared/model/CreditReview/CustExpsrHObj.Model';

@Component({
  selector: 'app-obligor-exposure',
  templateUrl: './obligor-exposure.component.html',
})
export class ObligorExposureComponent implements OnInit {

  @Input() exposureHObj: CustExpsrHObj = new CustExpsrHObj();
  readonly exposureType: string = CommonConstant.ExposureObligorTypeCode;

  SummaryData: {
    CustomerExposureAmt: number,
    FamilyExposureAmt: number,
    GuarantorExposureAmt: number,
    ShareholderExposureAmt: number,
    ObligorExposureAmt: number,
  };

  //#region Role Type
  readonly RoleCust: string = CommonConstant.RoleCustData;
  readonly RoleFam: string = CommonConstant.RoleFamilyData;
  readonly RoleGuarantor: string = CommonConstant.RoleGuarantorData;
  readonly RoleShareholder: string = CommonConstant.RoleShareholder;
  //#endregion

  constructor(
    // private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ExposureDObj: CustExpsrDObj = new CustExpsrDObj();
  IsReady: boolean = false;
  async ngOnInit() {
    this.SetExposureDObj();
    this.initSummaryData();
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
    await this.http.post<{ ListCustExpsrBucketObj: Array<CustExpsrBucketObj> }>(URLConstant.GetListCustExpsrBucketByCustExpsrDId, { CustExpsrDId: this.ExposureDObj.CustExpsrDId }).toPromise().then(
      (response) => {
        console.log(response);
        this.ListCustExpsrBucketObj = response.ListCustExpsrBucketObj;
      }
    );
  }

  ListCustDataCrdExpsrAppAgrHist: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();
  ListFamilyDataCrdExpsrAppAgrHist: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();
  ListGuarantorDataCrdExpsrAppAgrHist: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();
  ListShareholderDataCrdExpsrAppAgrHist: Array<CrdExpsrAppAgrHistObj> = new Array<CrdExpsrAppAgrHistObj>();

  initSummaryData() {
    this.SummaryData = {
      CustomerExposureAmt: 0,
      FamilyExposureAmt: 0,
      GuarantorExposureAmt: 0,
      ShareholderExposureAmt: 0,
      ObligorExposureAmt: 0,
    };
  }

  async GetListCustExpsrAppAgrHistByCustExpsrHId() {
    if (this.exposureHObj == null) return;
    await this.http.post<{ ListCrdExpsrAppAgrHistObj: Array<CrdExpsrAppAgrHistObj> }>(URLConstant.GetListCustExpsrAppAgrHistByCustExpsrHId, { CustExpsrHId: this.exposureHObj.CustExpsrHId }).toPromise().then(
      (response) => {
        console.log(response);
        for (let index = 0; index < response.ListCrdExpsrAppAgrHistObj.length; index++) {
          const element = response.ListCrdExpsrAppAgrHistObj[index];
          if (element.RoleCust == this.RoleCust) {
            this.ListCustDataCrdExpsrAppAgrHist.push(element);
            this.SummaryData.CustomerExposureAmt += element.OsPrincipal;
          }
          else if (element.RoleCust == this.RoleFam) {
            this.ListFamilyDataCrdExpsrAppAgrHist.push(element);
            this.SummaryData.FamilyExposureAmt += element.OsPrincipal;
          }
          else if (element.RoleCust == this.RoleGuarantor) {
            this.ListGuarantorDataCrdExpsrAppAgrHist.push(element);
            this.SummaryData.GuarantorExposureAmt += element.OsPrincipal;
          }
          else if (element.RoleCust == this.RoleShareholder) {
            console.log(element);
            this.ListShareholderDataCrdExpsrAppAgrHist.push(element);
            this.SummaryData.ShareholderExposureAmt += element.OsPrincipal;
          }
          this.SummaryData.ObligorExposureAmt += element.OsPrincipal;
        }
      }
    );
  }
}
