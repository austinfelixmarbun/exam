import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { map, mergeMap } from 'rxjs/operators';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ReqGetNegativeCustByNegativeCustNameAndCustTypeObj } from 'app/shared/model/Request/NegativeCust/ReqGetNegativeCustObj.model';
import { ResNegativeCustObj } from 'app/shared/model/Response/NegativeCust/ResNegativeCustObj.model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';

@Component({
  selector: 'app-customer-personal-duplicate-check',
  templateUrl: './customer-personal-duplicate-check.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalDuplicateCheckComponent implements OnInit, OnDestroy {
  @Input() IsFromCustFamilyTab: boolean;
  @Input() IsFromCustMgmntShareholder: boolean;
  @Input() CustFamilyTabData: Object;
  @Input() CustMgmntShareholderData: CustCompanyMgmntShrholderObj;
  @Output() ResponseSaveData: EventEmitter<any>;

  resultData: any;
  tempGender: any;
  tempCustModel: any;
  ResultDuplicate: any;
  tempMrIdTypeCode: any;
  ResultDuplicateNegative: any;

  IdCust: number;
  BirthDt: Date;
  IdExpiredDt: Date;

  custObj: CustObj;
  addCustObj: AddCustObj;
  custPersonalObj: CustPersonalObj;
  DuplicateCustObj: DuplicateCustObj;
  RequestNegativeCustObj: ResNegativeCustObj = new ResNegativeCustObj();

  IdNo: string;
  IsVip: string;
  Gender: string;
  TaxIdNo: string;
  CustName: string;
  VipNotes: string;
  CustModel: string;
  BirthPlace: string;
  StatusIsVip: string;
  MrIdTypeCode: string;
  IdCustPersonal: string;
  StatusAffiliate: string;
  DuplicateStatus: string;
  MotherMaidenName: string;
  IsAffiliateWithMf: string;
  MrMaritalStatCode: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.IsFromCustFamilyTab = false;
    this.IsFromCustMgmntShareholder = false;
    this.CustFamilyTabData = new Object();
    this.CustMgmntShareholderData = new CustCompanyMgmntShrholderObj();
    this.ResponseSaveData = new EventEmitter<any>();

    this.route.queryParams.subscribe(params => {

      if (params["CustName"] != null) {
        this.CustName = params["CustName"];
      }
      if (params["Gender"] != null) {
        this.Gender = params["Gender"];
      }
      if (params["MrIdTypeCode"] != null) {
        this.MrIdTypeCode = params["MrIdTypeCode"];
      }
      if (params["CustModel"] != null) {
        this.CustModel = params["CustModel"];
      }
      if (params["BirthPlace"] != null) {
        this.BirthPlace = params["BirthPlace"];
      }
      if (params["BirthDt"] != null) {
        this.BirthDt = params["BirthDt"];
      }
      if (params["IdNo"] != null) {
        this.IdNo = params["IdNo"];
      }
      if (params["TaxIdNo"] != null) {
        this.TaxIdNo = params["TaxIdNo"];
      }
      if (params["IdExpiredDt"] != null) {
        this.IdExpiredDt = params["IdExpiredDt"];
      }
      if (params["MotherMaidenName"] != null) {
        this.MotherMaidenName = params["MotherMaidenName"];
      }
      if (params["IsAffiliateWithMf"] != null) {
        this.IsAffiliateWithMf = params["IsAffiliateWithMf"];
      }
      if (params["IsVip"] != null) {
        this.IsVip = params["IsVip"];
      }
      if (params["VipNotes"] != null) {
        this.VipNotes = params["VipNotes"];
      }
      if (params["MrMaritalStatCode"] != null) {
        this.MrMaritalStatCode = params["MrMaritalStatCode"];
      }
    });
  }

  ngOnInit() {
    console.log("ameng");
    this.DuplicateCustObj = new DuplicateCustObj();
    if(this.IsFromCustFamilyTab){
      this.DuplicateCustObj.CustName = this.CustFamilyTabData["CustName"];
      this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Personal;
      this.DuplicateCustObj.IdNo = this.CustFamilyTabData["IdNo"];
      this.DuplicateCustObj.TaxIdNo = this.CustFamilyTabData["TaxIdNo"];
      this.DuplicateCustObj.MotherMaidenName = this.CustFamilyTabData["MotherMaidenName"];
      this.DuplicateCustObj.BirthDt = this.CustFamilyTabData["BirthDt"];
      this.BirthPlace = this.CustFamilyTabData["BirthPlace"];
      this.Gender = this.CustFamilyTabData["Gender"];
      this.MrIdTypeCode = this.CustFamilyTabData["MrIdTypeCode"];
      this.CustModel = this.CustFamilyTabData["CustModel"];
      this.IsAffiliateWithMf = "false";
      this.IsVip = "false";
    }
    else if(this.IsFromCustMgmntShareholder){
      this.DuplicateCustObj.CustName = this.CustMgmntShareholderData["MgmntShrholderName"];
      this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Personal;
      this.DuplicateCustObj.IdNo = this.CustMgmntShareholderData["IdNo"];
      this.DuplicateCustObj.TaxIdNo = this.CustMgmntShareholderData["TaxIdNo"];
      this.DuplicateCustObj.MotherMaidenName = "";
      this.DuplicateCustObj.BirthDt = this.CustMgmntShareholderData["BirthDt"];
      this.DuplicateCustObj.IdExpiredDt = this.CustMgmntShareholderData.IdExpiredDt;
      this.BirthPlace = this.CustMgmntShareholderData["BirthPlace"];
      this.Gender = this.CustMgmntShareholderData["MrGenderCode"];
      this.MrIdTypeCode = this.CustMgmntShareholderData["MrIdTypeCode"];
      this.CustModel = this.CustMgmntShareholderData["MrCustModelCode"];
      this.IsAffiliateWithMf = "false";
      this.IsVip = "false";
    }
    else{
      this.DuplicateCustObj.CustName = this.CustName;
      this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Personal;
      this.DuplicateCustObj.IdNo = this.IdNo;
      this.DuplicateCustObj.TaxIdNo = this.TaxIdNo;
      this.DuplicateCustObj.MotherMaidenName = this.MotherMaidenName;
      this.DuplicateCustObj.BirthDt = this.BirthDt;
    }
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, this.DuplicateCustObj).subscribe(
      (response) => {
        this.DuplicateStatus = response["Status"];
        if (this.DuplicateStatus != null && this.DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"];
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"];
        }
        else
          this.SaveValue();
    });
    if (this.IsAffiliateWithMf === "true") {
      this.StatusAffiliate = "Yes";
    } else {
      this.StatusAffiliate = "No";
    }
    if (this.IsVip === "true") {
      this.StatusIsVip = "Yes";
    } else {
      this.StatusIsVip = "No";
    }

    var refMasterObjGender = {
      MasterCode: this.Gender,
      RowVersion: ""
    }
    this.http.post(URLConstant.GetRefMasterByMasterCode, {Code: this.Gender}).subscribe(
      (response) => {
        this.tempGender = response;
      }
    );

    var refMasterObjMrIdTypeCode = {
      MasterCode: this.MrIdTypeCode,
      RowVersion: ""
    }
    this.http.post(URLConstant.GetRefMasterByMasterCode, {Code: this.MrIdTypeCode}).subscribe(
      (response) => {
        this.tempMrIdTypeCode = response;
      }
    );

    var refMasterObjCustModel = new ReqRefMasterByTypeCodeAndMasterCodeObj();
    refMasterObjCustModel.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustModel;
    refMasterObjCustModel.MasterCode = this.CustModel;
    this.http.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response;
      }
    );
  }

  SaveValue() {
    this.addCustObj = new AddCustObj();
    this.addCustObj.CustObj = new CustObj();
    this.addCustObj.CustPersonalObj = new CustPersonalObj();
    this.addCustObj.CustAddr = new CustAddrObj();
    var custAddrObj = new CustAddrObj();

    if(this.IsFromCustFamilyTab){
      this.addCustObj.CustObj.CustName = this.CustFamilyTabData["CustName"];
      this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Personal;
      this.addCustObj.CustObj.MrIdTypeCode = this.CustFamilyTabData["MrIdTypeCode"];
      this.addCustObj.CustObj.IdNo = this.CustFamilyTabData["IdNo"];
      this.addCustObj.CustObj.IdExpiredDt = this.CustFamilyTabData["IdExpiredDt"];
      this.addCustObj.CustObj.TaxIdNo = this.CustFamilyTabData["TaxIdNo"];
      this.addCustObj.CustObj.IsVip = false;
      this.addCustObj.CustObj.IsAffiliateWithMf = false;

      this.addCustObj.CustPersonalObj.CustFullName = this.CustFamilyTabData["CustName"];
      this.addCustObj.CustPersonalObj.MrGenderCode = this.CustFamilyTabData["Gender"];
      this.addCustObj.CustPersonalObj.BirthPlace = this.CustFamilyTabData["BirthPlace"];
      this.addCustObj.CustPersonalObj.BirthDt = this.CustFamilyTabData["BirthDt"];
      this.addCustObj.CustPersonalObj.MotherMaidenName = this.CustFamilyTabData["MotherMaidenName"];
      this.addCustObj.CustPersonalObj.IsRestInPeace = false;
      this.addCustObj.CustPersonalObj.MrMaritalStatCode = this.CustFamilyTabData["MrMaritalStatCode"];
      this.addCustObj.CustPersonalObj.MobilePhnNo1 = this.CustFamilyTabData["MobilePhnNo1"];
      this.addCustObj.CustPersonalObj.Email1 = this.CustFamilyTabData["Email1"];

      custAddrObj.CustId = 0;
      custAddrObj.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;
      custAddrObj.Addr = this.CustFamilyTabData["Addr"];
      custAddrObj.FullAddr = this.CustFamilyTabData["Addr"] + " RT: " + this.CustFamilyTabData["AreaCode4"] + " RW: " + this.CustFamilyTabData["AreaCode3"] + " " + this.CustFamilyTabData["AreaCode2"] + ", " + this.CustFamilyTabData["AreaCode1"] + " " + this.CustFamilyTabData["Zipcode"];
      custAddrObj.AreaCode3 = this.CustFamilyTabData["AreaCode3"];
      custAddrObj.AreaCode4 = this.CustFamilyTabData["AreaCode4"];
      custAddrObj.Zipcode = this.CustFamilyTabData["Zipcode"];
      custAddrObj.AreaCode1 = this.CustFamilyTabData["AreaCode1"];
      custAddrObj.AreaCode2 = this.CustFamilyTabData["AreaCode2"];
      custAddrObj.City = this.CustFamilyTabData["City"];

      var requestFamily = {
        CustId: this.CustFamilyTabData["CustId"],
        FamilyId: 0,
        MrCustRelationship: this.CustFamilyTabData["MrCustRelationship"],
        CustObj: this.addCustObj.CustObj,
        CustPersonalObj: this.addCustObj.CustPersonalObj,
        CustAddr: custAddrObj
      }
      this.http.post(URLConstant.AddCustPersonalFamily, requestFamily).toPromise().then(
        (response) => {
          this.ResponseSaveData.emit(response);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    else if(this.IsFromCustMgmntShareholder){
      var requestShareholderPersonal = {
        CustId: this.CustMgmntShareholderData["CustId"],
        MgmntShrholderName: this.CustMgmntShareholderData["MgmntShrholderName"],
        MrCustModelCode: this.CustMgmntShareholderData["MrCustModelCode"],
        MrIdTypeCode: this.CustMgmntShareholderData["MrIdTypeCode"],
        IdNo: this.CustMgmntShareholderData["IdNo"],
        IdExpiredDt: this.CustMgmntShareholderData["IdExpiredDt"],
        MrGenderCode: this.CustMgmntShareholderData["MrGenderCode"],
        BirthPlace: this.CustMgmntShareholderData["BirthPlace"],
        BirthDt: this.CustMgmntShareholderData["BirthDt"],
        TaxIdNo: this.CustMgmntShareholderData["TaxIdNo"],
        MrJobPositionCode: this.CustMgmntShareholderData["MrJobPositionCode"],
        SharePrcnt: this.CustMgmntShareholderData["SharePrcnt"],
        IsSigner: this.CustMgmntShareholderData["IsSigner"],
        IsActive: this.CustMgmntShareholderData["IsActive"],
        IsOwner: this.CustMgmntShareholderData["IsOwner"],
        MrCustTypeCode: RefMasterConstant.Personal
      };
      this.http.post(URLConstant.AddCustCompanyMgmntShrholder, requestShareholderPersonal).toPromise().then(
        (response) => {
          this.ResponseSaveData.emit({mode : 'check'});
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.addCustObj.CustObj.CustName = this.CustName;
      this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Personal;
      // this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
      this.addCustObj.CustObj.MrIdTypeCode = this.MrIdTypeCode;
      this.addCustObj.CustObj.IdNo = this.IdNo;
      this.addCustObj.CustObj.IdExpiredDt = this.IdExpiredDt;
      this.addCustObj.CustObj.TaxIdNo = this.TaxIdNo;
      this.addCustObj.CustObj.IsCustomer = true;
      if (this.IsVip === "true") {
        this.addCustObj.CustObj.IsVip = true;
      } else {
        this.addCustObj.CustObj.IsVip = false;
      }
      if (this.IsAffiliateWithMf === "true") {
        this.addCustObj.CustObj.IsAffiliateWithMf = true;
      } else {
        this.addCustObj.CustObj.IsAffiliateWithMf = false;
      }
      this.addCustObj.CustObj.VipNotes = this.VipNotes;
      this.addCustObj.CustPersonalObj.CustFullName = this.CustName;
      this.addCustObj.CustPersonalObj.MrGenderCode = this.Gender;
      this.addCustObj.CustPersonalObj.BirthPlace = this.BirthPlace;
      this.addCustObj.CustPersonalObj.BirthDt = this.BirthDt;
      this.addCustObj.CustPersonalObj.MotherMaidenName = this.MotherMaidenName;
      this.addCustObj.CustPersonalObj.IsRestInPeace = false;
      this.addCustObj.CustPersonalObj.MrMaritalStatCode = this.MrMaritalStatCode;

      var custAddr = JSON.parse(sessionStorage.getItem("CustAddr"));
      this.addCustObj.CustAddr.Addr = custAddr["Addr"];
      this.addCustObj.CustAddr.AreaCode1 = custAddr["AreaCode1"];
      this.addCustObj.CustAddr.AreaCode2 = custAddr["AreaCode2"];
      this.addCustObj.CustAddr.AreaCode3 = custAddr["AreaCode3"];
      this.addCustObj.CustAddr.AreaCode4 = custAddr["AreaCode4"];
      this.addCustObj.CustAddr.City = custAddr["City"];
      this.addCustObj.CustAddr.Zipcode = custAddr["Zipcode"];
      this.addCustObj.CustAddr.SubZipcode = custAddr["SubZipcode"];
      this.addCustObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;
      this.http.post(URLConstant.AddCustPersonalMainData, this.addCustObj).subscribe(
        (response: GenericObj) => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": response.Id, "From": 'CustPaging' });
        }
      );
    }
  }

  EditCustPersonal(item) {
    let CustNoObj = new GenericObj();
    CustNoObj.CustNo = item.CustNo;
    // this.http.post(URLConstant.GetCustPersonalForUpdateByCustNo, CustObj).subscribe(
    this.http.post(URLConstant.GetCustPersonalForUpdateByCustNo, CustNoObj).pipe(
      map((response) => {
        this.addCustObj = new AddCustObj();
        this.addCustObj.CustObj = response['CustObj'];
        this.addCustObj.CustPersonalObj = response['CustPersonalObj'];
        return response;
      }),
      mergeMap((response) => {
        let reqObj: GenericObj = new GenericObj();
        reqObj.Id = this.addCustObj.CustObj.CustId;
        reqObj.Code = CommonConstant.CustAddrTypeLegal;
        return this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj);
      })
    ).subscribe(
      (response) => {
        if(this.IsFromCustMgmntShareholder){
          this.addCustObj.CustObj.MrCustModelCode = this.CustMgmntShareholderData.MrCustModelCode;
          this.addCustObj.CustObj.MrIdTypeCode = this.CustMgmntShareholderData.MrIdTypeCode;
          this.addCustObj.CustObj.IdExpiredDt = this.CustMgmntShareholderData.IdExpiredDt;
          this.addCustObj.CustObj.IsShareholder = true;
          this.addCustObj.CustPersonalObj.MrGenderCode = this.CustMgmntShareholderData.MrGenderCode;
          this.addCustObj.CustPersonalObj.BirthPlace = this.CustMgmntShareholderData.BirthPlace;
        }else{
          this.addCustObj.CustAddr = response as CustAddrObj;
          this.addCustObj.CustObj.CustName = item.CustName;
          this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Personal;
          this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
          this.addCustObj.CustObj.MrIdTypeCode = this.MrIdTypeCode;
          this.addCustObj.CustObj.IdNo = item.IdNo;
          this.addCustObj.CustObj.IdExpiredDt = this.IdExpiredDt;
          this.addCustObj.CustObj.TaxIdNo = item.TaxIdNo;
          if (this.IsVip === "true") {
            this.addCustObj.CustObj.IsVip = true;
          } else {
            this.addCustObj.CustObj.IsVip = false;
          }
          if (this.IsAffiliateWithMf === "true") {
            this.addCustObj.CustObj.IsAffiliateWithMf = true;
          } else {
            this.addCustObj.CustObj.IsAffiliateWithMf = false;
          }
          this.addCustObj.CustObj.VipNotes = this.VipNotes;
          this.addCustObj.CustPersonalObj.CustFullName = item.CustName;
          this.addCustObj.CustPersonalObj.MrGenderCode = this.Gender;
          this.addCustObj.CustPersonalObj.BirthPlace = this.BirthPlace;
          this.addCustObj.CustPersonalObj.BirthDt = item.BirthDt;
          this.addCustObj.CustPersonalObj.MotherMaidenName = item.MotherMaidenName;
          this.addCustObj.CustPersonalObj.IsRestInPeace = false;
  
          // var custAddr = JSON.parse(sessionStorage.getItem("CustAddr"));
          // this.addCustObj.CustAddr.Addr = custAddr["Addr"];
          // this.addCustObj.CustAddr.AreaCode1 = custAddr["AreaCode1"];
          // this.addCustObj.CustAddr.AreaCode2 = custAddr["AreaCode2"];
          // this.addCustObj.CustAddr.AreaCode3 = custAddr["AreaCode3"];
          // this.addCustObj.CustAddr.AreaCode4 = custAddr["AreaCode4"];
          // this.addCustObj.CustAddr.City = custAddr["City"];
          // this.addCustObj.CustAddr.Zipcode = custAddr["Zipcode"];
          // this.addCustObj.CustAddr.SubZipcode = custAddr["SubZipcode"];
        }      
        this.http.post(URLConstant.EditDuplicateCust, this.addCustObj).subscribe(
          (response) => {
            if(this.IsFromCustFamilyTab){
              var requestFamily = {
                CustId: this.CustFamilyTabData["CustId"],
                FamilyId: this.addCustObj.CustObj.CustId,
                MrCustRelationship: this.CustFamilyTabData["MrCustRelationship"]
              }
              this.http.post(URLConstant.AddCustPersonalFamily, requestFamily).toPromise().then(
                (responseFamily) => {
                  this.ResponseSaveData.emit(responseFamily);
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else if(this.IsFromCustMgmntShareholder){
              this.CustMgmntShareholderData.ShareholderId = this.addCustObj.CustObj.CustId;
              this.http.post(URLConstant.AddCustCompanyMgmntShrholder, this.CustMgmntShareholderData).toPromise().then(
                (responseShareholder) => {
                  this.ResponseSaveData.emit({mode : 'check'});
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else{
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.addCustObj.CustObj.CustId, "From": 'CustPaging' });
            }
          }
        );
      }
    );
  }

  EditNegativeCustPersonal(item) {
    let NegativeCustObj: ReqGetNegativeCustByNegativeCustNameAndCustTypeObj = new ReqGetNegativeCustByNegativeCustNameAndCustTypeObj();
    NegativeCustObj.CustName = item.CustName;
    NegativeCustObj.MrCustTypeCode = item.MrCustTypeCode;
    NegativeCustObj.IdNo = item.IdNo;
    this.http.post<ResNegativeCustObj>(URLConstant.GetNegativeCustByNegativeCustNameAndCustType, NegativeCustObj).subscribe(
      (response) => {
        this.RequestNegativeCustObj = response;

        if(this.IsFromCustMgmntShareholder){
          this.RequestNegativeCustObj.MrCustModelCode = this.CustMgmntShareholderData.MrCustModelCode;
          this.RequestNegativeCustObj.MrIdTypeCode = this.CustMgmntShareholderData.MrIdTypeCode;
          this.RequestNegativeCustObj.IdExpiredDt = this.CustMgmntShareholderData.IdExpiredDt;
          this.RequestNegativeCustObj.MrGenderCode = this.CustMgmntShareholderData.MrGenderCode;
          this.RequestNegativeCustObj.BirthPlace = this.CustMgmntShareholderData.BirthPlace;
        }else{
          this.RequestNegativeCustObj.CustName = item.CustName;
          this.RequestNegativeCustObj.MrCustTypeCode = RefMasterConstant.Personal;
          this.RequestNegativeCustObj.MrCustModelCode = this.CustModel;
          this.RequestNegativeCustObj.MrIdTypeCode = this.MrIdTypeCode;
          this.RequestNegativeCustObj.IdNo = item.IdNo;
          this.RequestNegativeCustObj.IdExpiredDt = this.IdExpiredDt;
          this.RequestNegativeCustObj.TaxIdNo = item.TaxIdNo;
          if (this.IsVip === "true") {
            this.RequestNegativeCustObj.IsVip = true;
          } else {
            this.RequestNegativeCustObj.IsVip = false;
          }
          if (this.IsAffiliateWithMf === "true") {
            this.RequestNegativeCustObj.IsAffiliateWithMf = true;
          } else {
            this.RequestNegativeCustObj.IsAffiliateWithMf = false;
          }
          this.RequestNegativeCustObj.VipNotes = this.VipNotes;
          this.RequestNegativeCustObj.CustFullName = item.CustName;
          this.RequestNegativeCustObj.MrGenderCode = this.Gender;
          this.RequestNegativeCustObj.BirthPlace = this.BirthPlace;
          this.RequestNegativeCustObj.BirthDt = item.BirthDt;
          this.RequestNegativeCustObj.MotherMaidenName = item.MotherMaidenName;
          this.RequestNegativeCustObj.IsRestInPeace = false;

          var custAddr = JSON.parse(sessionStorage.getItem("CustAddr"));
          this.RequestNegativeCustObj.LegalAddr = custAddr["Addr"];
          this.RequestNegativeCustObj.AreaCode1 = custAddr["AreaCode1"];
          this.RequestNegativeCustObj.AreaCode2 = custAddr["AreaCode2"];
          this.RequestNegativeCustObj.AreaCode3 = custAddr["AreaCode3"];
          this.RequestNegativeCustObj.AreaCode4 = custAddr["AreaCode4"];
          this.RequestNegativeCustObj.City = custAddr["City"];
          this.RequestNegativeCustObj.Zipcode = custAddr["Zipcode"];
      }
        this.http.post(URLConstant.EditDuplicateNegativeCust, this.RequestNegativeCustObj).subscribe(
          (response) => {
            if(this.IsFromCustFamilyTab){
              var requestFamily = {
                CustId: this.CustFamilyTabData["CustId"],
                FamilyId: this.RequestNegativeCustObj.CustId,
                MrCustRelationship: this.CustFamilyTabData["MrCustRelationship"]
              }
              this.http.post(URLConstant.AddCustPersonalFamily, requestFamily).toPromise().then(
                (responseFamily) => {
                  this.ResponseSaveData.emit(responseFamily);
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else if(this.IsFromCustMgmntShareholder){
              this.CustMgmntShareholderData.ShareholderId = this.RequestNegativeCustObj.CustId;
              this.http.post(URLConstant.AddCustCompanyMgmntShrholder, this.CustMgmntShareholderData).toPromise().then(
                (responseShareholder) => {
                  // this.ResponseSaveData.emit(responseFamily);
                  this.ResponseSaveData.emit({mode : 'check'});
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
            else{
              var custId = response['CustId'];
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.IdCust, "From": 'CustPaging' });
            }
          }
        );
      }
    );
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem("CustAddr");
  }
}
