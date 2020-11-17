import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { RequestNegativeCustObj } from 'app/shared/model/RequestNegativeCustObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { map, mergeMap } from 'rxjs/operators';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/CustCompanyMgmntShrholderObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-company-duplicate-check',
  templateUrl: './customer-company-duplicate-check.component.html',
  styleUrls: [],
})
export class CustomerCompanyDuplicateCheckComponent implements OnInit, OnDestroy {
  @Input() IsFromCustMgmntShareholder: boolean;
  @Input() CustMgmntShareholderData: CustCompanyMgmntShrholderObj;
  @Output() ResponseSaveData: EventEmitter<any>;

  resultData: any;
  tempCustModel: any;
  ResultDuplicate: any;
  tempMrIdTypeCode: any;
  tempCompanyTypeCode: any;
  tempMrCompanyTypeCode: any;
  ResultDuplicateNegative: any;

  addCustObj: AddCustObj;
  DuplicateCustObj: DuplicateCustObj;
  RequestNegativeCustObj: RequestNegativeCustObj = new RequestNegativeCustObj();

  CustId: number;

  IdNo: string;
  IsVip: string;
  TaxIdNo: string;
  VipNotes: string;
  CustName: string;
  CustModel: string;
  tempIdType: string;
  StatusIsVip: string;
  MrIdTypeCode: string;
  StatusAffiliate: string;
  DuplicateStatus: string;
  MrCompanyTypeCode: string;
  IsAffiliateWithMf: string;
  urlGetDescByMasterCode: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.ResponseSaveData = new EventEmitter<any>();
    this.urlGetDescByMasterCode = URLConstant.GetRefMasterByMasterCode;
    this.route.queryParams.subscribe(params => {
      if (params["CustModel"] != null) {
        this.CustModel = params["CustModel"];
      }
      if (params["CustName"] != null) {
        this.CustName = params["CustName"];
      }
      if (params["MrCompanyTypeCode"] != null) {
        this.MrCompanyTypeCode = params["MrCompanyTypeCode"];
      }
      if (params["TaxIdNo"] != null) {
        this.TaxIdNo = params["TaxIdNo"];
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
    });
  }

  ngOnInit() {
    this.DuplicateCustObj = new DuplicateCustObj();
    if(this.IsFromCustMgmntShareholder){
      this.DuplicateCustObj.CustName = this.CustMgmntShareholderData["MgmntShrholderName"];
      this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Company;
      this.DuplicateCustObj.TaxIdNo = this.CustMgmntShareholderData["TaxIdNo"];
    }
    else{
      this.DuplicateCustObj.CustName = this.CustName;
      this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Company;
      this.DuplicateCustObj.TaxIdNo = this.TaxIdNo;
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
      }
    );

    this.http.post(this.urlGetDescByMasterCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response;
      }
    );

    var refMasterObjCustModel = {
      MasterCode: this.CustModel,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response;
      }
    );

    var refMasterObjMrCompanyTypeCode = {
      MasterCode: this.MrCompanyTypeCode,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempMrCompanyTypeCode = response;
      }
    );
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
  }

  SaveValue() {
    if(this.IsFromCustMgmntShareholder){
      this.http.post(URLConstant.AddCustCompanyMgmntShrholderNew, this.CustMgmntShareholderData).toPromise().then(
        (response) => {
          this.ResponseSaveData.emit({mode : 'check'});
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    }
    else{
      this.addCustObj = new AddCustObj();
      this.addCustObj.CustObj = new CustObj();
      this.addCustObj.CustCompanyObj = new CustCompanyObj();
      this.addCustObj.CustAddr = new CustAddrObj();
      this.addCustObj.CustObj.CustName = this.CustName;
      this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
      this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Company;
      this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
      this.addCustObj.CustObj.MrIdTypeCode = RefMasterConstant.Npwp;
      this.addCustObj.CustObj.IdNo = this.TaxIdNo;
      this.addCustObj.CustObj.TaxIdNo = this.TaxIdNo;
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

      this.http.post(URLConstant.AddNewCust, this.addCustObj).subscribe(
        (response) => {
          this.resultData = response;
          this.CustId = this.resultData.CustObj.CustId;
          AdInsHelper.RedirectUrl(this.router,['/Customer/CustomerCompany/Page'],{ "IdCust": this.CustId, "From": 'CustPaging' });
        }
      );
    }
  }

  EditCustCompany(item) {
    var custObj = { CustNo: item.CustNo, CustName: item.CustName, TaxIdNo: item.TaxIdNo };
    this.http.post(URLConstant.GetCustCompanyForUpdateByCustNo, custObj).pipe(
      map((response) => {
        this.addCustObj = new AddCustObj();
        this.addCustObj.CustObj = response['CustObj'];
        this.addCustObj.CustCompanyObj = response['CustCompanyObj'];
        return response;
      }),
      mergeMap((response) => {
        return this.http.post(URLConstant.GetCustAddrByMrCustAddrType, { CustId: this.addCustObj.CustObj.CustId, MrCustAddrTypeCode: CommonConstant.AddrTypeLegal });
      })
    ).subscribe(
      (response) => {
        if(this.IsFromCustMgmntShareholder){
          this.addCustObj.CustObj.MrCustModelCode = this.CustMgmntShareholderData.MrCustModelCode;
          this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.CustMgmntShareholderData.MrCompanyTypeCode;
        }else{
          this.addCustObj.CustAddr = response as CustAddrObj;
          this.addCustObj.CustObj.CustName = item.CustName;
          this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
          this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Company;
          this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
          this.addCustObj.CustObj.MrIdTypeCode = RefMasterConstant.Npwp;
          this.addCustObj.CustObj.IdNo = item.TaxIdNo;
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

          var custAddr = JSON.parse(sessionStorage.getItem("CustAddr"));
          this.addCustObj.CustAddr.Addr = custAddr["Addr"];
          this.addCustObj.CustAddr.AreaCode1 = custAddr["AreaCode1"];
          this.addCustObj.CustAddr.AreaCode2 = custAddr["AreaCode2"];
          this.addCustObj.CustAddr.AreaCode3 = custAddr["AreaCode3"];
          this.addCustObj.CustAddr.AreaCode4 = custAddr["AreaCode4"];
          this.addCustObj.CustAddr.City = custAddr["City"];
          this.addCustObj.CustAddr.Zipcode = custAddr["Zipcode"];
          this.addCustObj.CustAddr.SubZipcode = custAddr["SubZipcode"];
        }
        
        this.http.post(URLConstant.EditDuplicateCust, this.addCustObj).subscribe(
          () => {
            if(this.IsFromCustMgmntShareholder){
              this.http.post(URLConstant.AddCustCompanyMgmntShrholderNew, this.CustMgmntShareholderData).toPromise().then(
                (response) => {
                  this.ResponseSaveData.emit({mode : 'check'});
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              )
            }
            else{
              AdInsHelper.RedirectUrl(this.router,['/Customer/CustomerCompany/Page'],{ "IdCust": this.addCustObj.CustObj.CustId, "From": 'CustPaging' });
            }
          }
        );
      }
    );
  }

  EditNegativeCustCompany(item) {
    var NegativeCustObj = { CustNo: item.CustNo, CustName: item.CustName, MrCustTypeCode: item.MrCustTypeCode, TaxIdNo: item.TaxIdNo };
    this.http.post<RequestNegativeCustObj>(URLConstant.GetNegativeCustByNegativeCustNameAndCustType, NegativeCustObj).subscribe(
      (response) => {
        this.RequestNegativeCustObj = response;
        if(this.IsFromCustMgmntShareholder){
          this.RequestNegativeCustObj.MrCustModelCode = this.CustMgmntShareholderData.MrCustModelCode;
          this.RequestNegativeCustObj.MrCompanyTypeCode = this.CustMgmntShareholderData.MrCompanyTypeCode;
        }else{
          this.RequestNegativeCustObj.CustName = item.CustName;
          this.RequestNegativeCustObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
          this.RequestNegativeCustObj.MrCustTypeCode = RefMasterConstant.Company;
          this.RequestNegativeCustObj.MrCustModelCode = this.CustModel;
          this.RequestNegativeCustObj.MrIdTypeCode = RefMasterConstant.Npwp;
          this.RequestNegativeCustObj.IdNo = item.TaxIdNo;
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
            if(this.IsFromCustMgmntShareholder){
              this.http.post(URLConstant.AddCustCompanyMgmntShrholderNew, this.CustMgmntShareholderData).toPromise().then(
                (response) => {
                  this.ResponseSaveData.emit({mode : 'check'});
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              )
            }
            else{
              var custId = response['CustId'];
              AdInsHelper.RedirectUrl(this.router,['/Customer/CustomerCompany/Page'],{ "IdCust": custId, "From": 'CustPaging' });
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
