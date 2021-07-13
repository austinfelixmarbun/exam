import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { CustDuplicateObj } from 'app/shared/model/NewCust/CustDuplicateObj.Model';
import { NegCustDuplicateObj } from 'app/shared/model/NewCust/NegCustDuplicateObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqGetNegativeCustByNegativeCustNameAndCustTypeObj } from 'app/shared/model/Request/NegativeCust/ReqGetNegativeCustObj.model';
import { ResNegativeCustObj } from 'app/shared/model/Response/NegativeCust/ResNegativeCustObj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-cust-dup-check-header',
  templateUrl: './cust-dup-check-header.component.html',
})
export class CustDupCheckHeaderComponent implements OnInit {

  @Input() CustPersonalObj: ReqPersonalObj;
  @Input() CustCoyObj: any;
  @Input() CustMgmntShareholderData: CustCompanyMgmntShrholderObj;
  @Input() CustType: string = CommonConstant.CustomerPersonal;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.GetDuplicateCust();
  }

  ResultDuplicate: Array<CustDuplicateObj> = new Array();
  ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  GetDuplicateCust() {
    var DuplicateCustObj = this.SetDuplicateCustObj();
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, DuplicateCustObj).subscribe(
      (response) => {
        var DuplicateStatus = response["Status"];
        if (DuplicateStatus != null && DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"];
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"];
        } else {
          this.SaveForm();
        }
      });
  }

  SetDuplicateCustObj(): DuplicateCustObj {
    var duplicateCustObj = new DuplicateCustObj();
    if (this.CustType == this.CustTypePersonal) {
      duplicateCustObj.CustName = this.CustPersonalObj.CustObj.CustName;
      duplicateCustObj.MrCustTypeCode = this.CustTypePersonal;
      duplicateCustObj.IdNo = this.CustPersonalObj.CustObj.IdNo;
      duplicateCustObj.TaxIdNo = this.CustPersonalObj.CustObj.TaxIdNo;
      duplicateCustObj.MotherMaidenName = this.CustPersonalObj.CustPersonalObj.MotherMaidenName;
      duplicateCustObj.BirthDt = this.CustPersonalObj.CustPersonalObj.BirthDt;
      return duplicateCustObj;
    }

    duplicateCustObj.CustName = this.CustCoyObj.CustName;
    duplicateCustObj.MrCustTypeCode = this.CustTypeCoy;
    duplicateCustObj.TaxIdNo = this.CustCoyObj.TaxIdNo;
    return duplicateCustObj;
  }

  EditCust(item: CustDuplicateObj) {
    if (this.CustType == this.CustTypePersonal) {
      this.EditCustPersonal(item);
      return;
    }
    this.EditCustCoy();
  }

  EditCustPersonal(item: CustDuplicateObj) {
    let CustNoObj = new GenericObj();
    CustNoObj.CustNo = item.CustNo;
    let addCustObj = new AddCustObj();
    // this.http.post(URLConstant.GetCustPersonalForUpdateByCustNo, CustObj).subscribe(
    this.http.post(URLConstant.GetCustPersonalForUpdateByCustNo, CustNoObj).pipe(
      map((response) => {
        addCustObj.CustObj = response['CustObj'];
        addCustObj.CustPersonalObj = response['CustPersonalObj'];
        return response;
      }),
      mergeMap((response) => {
        let reqObj: GenericObj = new GenericObj();
        reqObj.Id = addCustObj.CustObj.CustId;
        reqObj.Code = CommonConstant.CustAddrTypeLegal;
        return this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj);
      })
    ).subscribe(
      (response) => {
        if (this.CustDataMode == this.CustDataModeShareholder) {
          addCustObj.CustObj.IsShareholder = true;
        }
        addCustObj.CustAddr = response as CustAddrObj;
        addCustObj.CustObj.CustName = item.CustName;
        addCustObj.CustObj.MrCustTypeCode = this.CustTypePersonal;
        addCustObj.CustObj.MrIdTypeCode = this.CustPersonalObj.CustObj.MrIdTypeCode;
        addCustObj.CustObj.IdNo = item.IdNo;
        addCustObj.CustObj.IdExpiredDt = this.CustPersonalObj.CustObj.IdExpiredDt;
        addCustObj.CustObj.TaxIdNo = item.TaxIdNo;
        addCustObj.CustObj.IsVip = this.CustPersonalObj.CustObj.IsVip;
        addCustObj.CustObj.IsAffiliateWithMf = this.CustPersonalObj.CustObj.IsAffiliateWithMf;
        addCustObj.CustObj.VipNotes = this.CustPersonalObj.CustObj.VipNotes;
        addCustObj.CustPersonalObj.CustFullName = item.CustName;
        addCustObj.CustPersonalObj.MrGenderCode = this.CustPersonalObj.CustPersonalObj.MrGenderCode;
        addCustObj.CustPersonalObj.BirthPlace = this.CustPersonalObj.CustPersonalObj.BirthPlace;
        addCustObj.CustPersonalObj.BirthDt = item.BirthDt;
        addCustObj.CustPersonalObj.MotherMaidenName = item.MotherMaidenName;
        addCustObj.CustPersonalObj.IsRestInPeace = false;

        this.http.post(URLConstant.EditDuplicateCust, addCustObj).subscribe(
          (response) => {
            if (this.CustDataMode == this.CustDataModeFamily) {
              // var requestFamily = {
              //   CustId: this.CustFamilyTabData["CustId"],
              //   FamilyId: addCustObj.CustObj.CustId,
              //   MrCustRelationship: this.CustFamilyTabData["MrCustRelationship"]
              // }
              /// nggk bunyi kalau req ny cuman 3 itu tapi save ny kayak 1 customer semua di save ulang.
              // this.http.post(URLConstant.AddCustPersonalFamily, requestFamily).toPromise().then(
              //   (responseFamily) => {
              //     this.ResponseSaveData.emit(responseFamily);
              //   }
              // ).catch(
              //   (error) => {
              //     console.log(error);
              //   }
              // );
            }
            else if (this.CustDataMode == this.CustDataModeShareholder) {
              this.CustMgmntShareholderData.ShareholderId = addCustObj.CustObj.CustId;
              this.http.post(URLConstant.AddCustCompanyMgmntShrholder, this.CustMgmntShareholderData).toPromise().then(
                (responseShareholder) => {
                  // this.ResponseSaveData.emit({ mode: 'check' });
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else {
              AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": addCustObj.CustObj.CustId });
            }
          }
        );
      }
    );

  }

  EditCustCoy() {

  }

  EditNegativeCust(item: NegCustDuplicateObj) {
    if (this.CustType == this.CustTypePersonal) {
      this.EditNegativeCustPersonal(item);
      return;
    }
    this.EditNegativeCustCoy(item);
  }

  EditNegativeCustPersonal(item: NegCustDuplicateObj) {
    let NegativeCustObj: ReqGetNegativeCustByNegativeCustNameAndCustTypeObj = new ReqGetNegativeCustByNegativeCustNameAndCustTypeObj();
    NegativeCustObj.CustName = item.CustName;
    NegativeCustObj.MrCustTypeCode = this.CustTypePersonal;
    NegativeCustObj.IdNo = item.IdNo;
    this.http.post<ResNegativeCustObj>(URLConstant.GetNegativeCustByNegativeCustNameAndCustType, NegativeCustObj).subscribe(
      (response) => {
        let RequestNegativeCustObj = response;

        RequestNegativeCustObj.CustName = item.CustName;
        RequestNegativeCustObj.MrCustTypeCode = this.CustTypePersonal;
        RequestNegativeCustObj.MrIdTypeCode = item.MrIdType;
        RequestNegativeCustObj.IdNo = item.IdNo;
        RequestNegativeCustObj.IdExpiredDt = this.CustPersonalObj.CustObj.IdExpiredDt;
        RequestNegativeCustObj.TaxIdNo = item.TaxIdNo;
        RequestNegativeCustObj.IsVip = this.CustPersonalObj.CustObj.IsVip;
        RequestNegativeCustObj.IsAffiliateWithMf = this.CustPersonalObj.CustObj.IsAffiliateWithMf;
        RequestNegativeCustObj.VipNotes = this.CustPersonalObj.CustObj.VipNotes
        RequestNegativeCustObj.CustFullName = item.CustName;
        RequestNegativeCustObj.MrGenderCode = this.CustPersonalObj.CustPersonalObj.MrGenderCode;
        RequestNegativeCustObj.BirthPlace = this.CustPersonalObj.CustPersonalObj.BirthPlace;
        RequestNegativeCustObj.BirthDt = item.BirthDt;
        RequestNegativeCustObj.MotherMaidenName = item.MotherMaidenName;
        RequestNegativeCustObj.IsRestInPeace = false;

        RequestNegativeCustObj.LegalAddr = this.CustPersonalObj.CustAddr.Addr;
        RequestNegativeCustObj.AreaCode1 = this.CustPersonalObj.CustAddr.AreaCode1;
        RequestNegativeCustObj.AreaCode2 = this.CustPersonalObj.CustAddr.AreaCode2;
        RequestNegativeCustObj.AreaCode3 = this.CustPersonalObj.CustAddr.AreaCode3;
        RequestNegativeCustObj.AreaCode4 = this.CustPersonalObj.CustAddr.AreaCode4;
        RequestNegativeCustObj.City = this.CustPersonalObj.CustAddr.City;
        RequestNegativeCustObj.Zipcode = this.CustPersonalObj.CustAddr.Zipcode;

        this.http.post(URLConstant.EditDuplicateNegativeCust, RequestNegativeCustObj).subscribe(
          (response) => {
            if (this.CustDataMode == this.CustDataModeFamily) {
              var requestFamily = {
                // CustId: this.CustFamilyTabData["CustId"],
                FamilyId: RequestNegativeCustObj.CustId,
                // MrCustRelationship: this.CustFamilyTabData["MrCustRelationship"]
              }
              this.http.post(URLConstant.AddCustPersonalFamily, requestFamily).toPromise().then(
                (responseFamily) => {
                  // this.ResponseSaveData.emit(responseFamily);
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else if (this.CustDataMode == this.CustDataModeShareholder) {
              this.CustMgmntShareholderData.ShareholderId = RequestNegativeCustObj.CustId;
              this.http.post(URLConstant.AddCustCompanyMgmntShrholder, this.CustMgmntShareholderData).toPromise().then(
                (responseShareholder) => {
                  // this.ResponseSaveData.emit({ mode: 'check' });
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else {
              AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response['CustId'], "From": 'CustPaging' });
            }
          }
        );
      }
    );
  }

  EditNegativeCustCoy(item: NegCustDuplicateObj) {

  }

  Back() {
    this.outputCancel.emit();
  }

  SaveForm() {
    if (this.CustType == this.CustTypePersonal) {
      this.SavePersonalData();
      return;
    }
    this.SaveCoyData();
  }

  SaveCoyData() {

  }

  SavePersonalData() {
    let urlAdd: string = this.SetUrlAdd();
    this.http.post(urlAdd, this.CustPersonalObj).subscribe(
      (response: GenericObj) => {
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
      }
    );
  }

  SetUrlAdd(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.AddCustPersonalMainData;
        break;
      case this.CustDataModeFamily:
        urlAdd = URLConstant.AddCustPersonalFamily;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.AddCustCompanyMgmntShrholder;
        break;
    }
    return urlAdd;
  }
}
