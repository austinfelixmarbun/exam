import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CustThirdPartyCheckingObj } from 'app/shared/model/CustThirdPartyCheckingObj.Model';

@Component({
  selector: 'app-edit-main-data-company',
  templateUrl: './edit-main-data-company.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class EditMainDataCompanyComponent implements OnInit {

  tempCustObj: any;
  tempCustModel: any;
  custCompanyObj: any;
  tempCompanyTypeCode: any;
  tempCustCompanyObj: any;
  tempFraud: any;
  custObj: CustObj
  CustNo:string;
  CustId: number;
  VipNotesRequired: boolean;
  CheckCustFraudTempRegByCustNo: string;
  From: string;
  editCustUrl: string;
  editCustCompanyUrl: string;
  getCustByCustIdUrl: string;
  getListActiveRefMasterUrl: string;
  getCustCompanyByCustIdUrl: string;
  GetListActiveRefMasterWithMappingCodeAllUrl: string;
  inputFieldObj: InputFieldObj;
  inputAddressObj: InputAddressObj;
  UcAddressObj: UcAddressObj;
  closeResult;
  CustThirdPartyChecking: CustThirdPartyCheckingObj = new CustThirdPartyCheckingObj();
  IsCustThirdPartyCheck: boolean = false;
  MaxDaysCustThirdPartyCheck: number = 0;
  LastHit = {
    PEFINDO: 'Not Hit Yet',
    SLIK: 'Not Hit Yet',
  };

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private toastr: NGXToastrService, private modalService: NgbModal) {
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.getCustCompanyByCustIdUrl = URLConstant.GetCustCompanyByCustId;
    this.CheckCustFraudTempRegByCustNo = URLConstant.CheckCustFraudTempRegByCustNo;
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.editCustUrl = URLConstant.EditCust;
    this.editCustCompanyUrl = URLConstant.EditCustCompany;
    this.GetListActiveRefMasterWithMappingCodeAllUrl = URLConstant.GetListActiveRefMasterWithMappingCodeAll;
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["CustNo"] != null) {
        this.CustNo = params["CustNo"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }
  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: [''],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['']
  });

  ngOnInit() {
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;

    var refMasterObjCustModel = {
      MrCustTypeCode: CommonConstant.CustTypeCompany
    }
    this.http.post(URLConstant.GetListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );
    var refMasterObjMrCompanyTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCompanyType,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response[CommonConstant.ReturnObj];
        if (this.tempCompanyTypeCode.length > 0) {
          this.CustomerCompanyForm.patchValue({
            MrCompanyTypeCode: this.tempCompanyTypeCode[0].Key
          });
        }
      }
    );
    this.custObj = new CustObj();
    this.custCompanyObj = new CustCompanyObj();
    this.custObj.CustId = this.CustId;
    this.custCompanyObj.CustId = this.CustId;

    this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        this.CustomerCompanyForm.patchValue({
          CustName: this.tempCustObj.CustName,
          TaxIdNo: this.tempCustObj.TaxIdNo,
          CustModel: this.tempCustObj.MrCustModelCode,
          MrCustModelCode: this.tempCustObj.MrCustModelCode,
          IsVip: this.tempCustObj.IsVip,
          IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
          VipNotes: this.tempCustObj.VipNotes
        });
        if (this.tempCustObj.VipNotes != null) {
          this.VipNotesRequired = true;
        } else {
          this.VipNotesRequired = false;
        }
        if (this.tempCustObj.IsVip == false) {
          this.CustomerCompanyForm.controls.VipNotes.disable();
        }
        this.CustomerCompanyForm.controls["TaxIdNo"].disable();

        this.http.post(URLConstant.GetCustAddrByMrCustAddrType, { CustId: this.tempCustObj.CustId, MrCustAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
          (response: CustAddrObj) => {
            this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
            this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
            this.UcAddressObj.AreaCode1 = response.AreaCode1;
            this.UcAddressObj.AreaCode2 = response.AreaCode2;
            this.UcAddressObj.AreaCode3 = response.AreaCode3;
            this.UcAddressObj.AreaCode4 = response.AreaCode4;
            this.UcAddressObj.Addr = response.Addr;
            this.UcAddressObj.City = response.City;
            this.inputAddressObj.default = this.UcAddressObj;
            this.inputAddressObj.inputField = this.inputFieldObj;
          }
        );
      }
    );
    this.http.post(this.getCustCompanyByCustIdUrl, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: this.tempCustCompanyObj.MrCompanyTypeCode
        });
      }
    );

    this.http.post(URLConstant.GetGeneralSettingByCode, { GsCode: CommonConstant.GS_IS_CUST_THIRD_PARTY_CHECK }).pipe(
      map((response) => {
        return response
      }),
      mergeMap((response) => {
        if (response["GsValue"] == "1") {
          this.IsCustThirdPartyCheck = true;
          let temp = this.tempFraud
          if (temp === null) {
            let addCustTemp = this.http.post(URLConstant.AddCustFraudTempReg, { MrCustTypeCode: CommonConstant.CustTypeCompany, CustNo: this.CustNo });
            let getMaxDays = this.http.post(URLConstant.GetGeneralSettingByCode, { GsCode: CommonConstant.GS_MAX_DAYS_CUST_THIRD_PARTY_CHECK });
            return forkJoin([addCustTemp, getMaxDays]);
          }
          else {
            let getMaxDays = this.http.post(URLConstant.GetGeneralSettingByCode, { GsCode: CommonConstant.GS_MAX_DAYS_CUST_THIRD_PARTY_CHECK });
            return forkJoin([temp, getMaxDays]);
          }
        }
        else {
          return new Array();
        }
      })
    ).toPromise().then(
      (response) => {
        if (response.length > 0) {
          this.CustThirdPartyChecking.CustTempNo = response[0]["CustTempNo"];
          this.CustThirdPartyChecking.MrCustTypeCode = response[0]["CustType"];
          this.MaxDaysCustThirdPartyCheck = response[1]["GsValue"];
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
  checkCustFraudTemp() {
    this.http.post<any>(this.CheckCustFraudTempRegByCustNo, { CustNo: this.CustNo }).subscribe(
      (response) => {
        this.tempFraud = response["ReturnObject"];
      }
    );
  }
  SaveValue() {
    this.custObj = new CustObj();
    this.custCompanyObj = new CustCompanyObj();
    this.custObj = this.tempCustObj;
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custObj.CustName = this.CustomerCompanyForm.controls["CustName"].value;
    this.custObj.TaxIdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.custObj.IdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.custObj.MrCustModelCode = this.CustomerCompanyForm.controls["CustModel"].value;
    this.custCompanyObj.MrCompanyTypeCode = this.CustomerCompanyForm.controls["MrCompanyTypeCode"].value;
    this.custObj.IsVip = this.CustomerCompanyForm.controls["IsVip"].value;
    this.custObj.IsAffiliateWithMf = this.CustomerCompanyForm.controls["IsAffiliateWithMf"].value;
    if (this.custObj.IsVip == true) {
      this.custObj.VipNotes = this.CustomerCompanyForm.controls["VipNotes"].value;
    } else {
      this.custObj.VipNotes = null;
    }

    var formValue = this.CustomerCompanyForm.value;
    this.custObj.CustAddr = new CustAddrObj();
    this.custObj.CustAddr.Addr = formValue["UcAddress"]["Addr"];
    this.custObj.CustAddr.AreaCode1 = formValue["UcAddress"]["AreaCode1"];
    this.custObj.CustAddr.AreaCode2 = formValue["UcAddress"]["AreaCode2"];
    this.custObj.CustAddr.AreaCode3 = formValue["UcAddress"]["AreaCode3"];
    this.custObj.CustAddr.AreaCode4 = formValue["UcAddress"]["AreaCode4"];
    this.custObj.CustAddr.City = formValue["UcAddress"]["City"];
    this.custObj.CustAddr.Zipcode = formValue["UcAddressZipcode"]["value"];
    this.custObj.CustAddr.SubZipcode = formValue["UcAddressZipcode"]["value"];
    this.custObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;
    this.http.post(this.editCustUrl, this.custObj).subscribe(
      (response) => {
        this.http.post(this.editCustCompanyUrl, this.custCompanyObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            if (this.From == "EditMainData") {
              AdInsHelper.RedirectUrl(this.router, ["/Customer/CustomerCompany/Page"], { "IdCust": this.CustId, Page: "Edit", From: 'EditMainData' });
            }
            else if (this.From == "CustShareholder") {
              AdInsHelper.RedirectUrl(this.router, ["/Customer/CustomerCompany/Page"], { "IdCust": this.CustId, Page: "Edit", From: 'CustShareholder' });
            }
            else if (this.From == "CustGuarantor") {
              AdInsHelper.RedirectUrl(this.router, ["/Customer/CustomerCompany/Page"], { "IdCust": this.CustId, Page: "Edit", From: 'CustGuarantor' });
            }
            else {
              AdInsHelper.RedirectUrl(this.router, ["/Customer/CustomerCompany/Page"], { "IdCust": this.CustId, From: 'CustPaging' });
            }
          }
        );
      }
    );
  }

  back() {
    if (this.From == "CustPaging") {
      AdInsHelper.RedirectUrl(this.router, ["/Customer/Paging"], {});
    }
    else if (this.From == "EditMainData") {
      AdInsHelper.RedirectUrl(this.router, ["/Customer/EditMainData/Paging"], {});
    }
    else if (this.From == "CustShareholder") {
      AdInsHelper.RedirectUrl(this.router, ["/Customer/CustShareholder/Paging"], {});
    }
    else if (this.From == "CustGuarantor") {
      AdInsHelper.RedirectUrl(this.router, ["/Customer/CustGuarantor/Paging"], {});
    }
  }
  checkState() {
    if (this.CustomerCompanyForm.controls.IsVip.value === true) {
      this.CustomerCompanyForm.patchValue({
        VipNotes: null
      });
      this.CustomerCompanyForm.controls.VipNotes.disable();
      this.VipNotesRequired = false;
      this.CustomerCompanyForm.controls.IdExpiredDt.clearValidators();

    } else {
      this.CustomerCompanyForm.controls.VipNotes.enable();
      this.CustomerCompanyForm.controls.VipNotes.setValidators(Validators.required);
      this.VipNotesRequired = true;

    }
    this.CustomerCompanyForm.controls.VipNotes.updateValueAndValidity();
  }

  //POP UP
  openPopUp(content, contentString = "") {
    var url = "";
    var urlAdd = "";
    this.CustThirdPartyChecking.CustName = this.CustomerCompanyForm.controls.CustName.value;
    this.CustThirdPartyChecking.MrIdTypeCode = CommonConstant.CustTypeCompany;
    this.CustThirdPartyChecking.IdNo = "";
    this.CustThirdPartyChecking.MobilePhnNo = "";
    this.CustThirdPartyChecking.TaxIdNo = this.CustomerCompanyForm.controls.TaxIdNo.value;
    this.CustThirdPartyChecking.FamilyCardNo = "";
    switch (contentString) {
      case "popUpPefindo":
        url = URLConstant.GetCustFraudPefindoReqLogByCustTempNo;
        urlAdd = URLConstant.AddCustFraudPefindoReqLog;
        break;

      case "popUpSlik":
        url = URLConstant.GetCustFraudSLIKRequestByCustTempNo;
        urlAdd = URLConstant.AddCustFraudSLIKRequest;
        break;

      default:
        break;
    }
    if (url != "") {
      this.http.post(url, this.CustThirdPartyChecking).toPromise().then(
        (response) => {
          var currentDate = new Date();
          if (response["TrxNo"]) {
            var lastHitDate = new Date(response["StartDt"]);
            var dateDiff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(lastHitDate.getFullYear(), lastHitDate.getMonth(), lastHitDate.getDate())) / (1000 * 60 * 60 * 24));
            if (dateDiff > this.MaxDaysCustThirdPartyCheck) {
              this.http.post(urlAdd, this.CustThirdPartyChecking).toPromise().then(
                (response) => {
                  var currentLastHitDate = new Date(response["StartDt"]);
                  var currentDateDiff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(currentLastHitDate.getFullYear(), currentLastHitDate.getMonth(), currentLastHitDate.getDate())) / (1000 * 60 * 60 * 24));
                  switch (contentString) {
                    case "popUpPefindo":
                      this.LastHit.PEFINDO = currentDateDiff > 0 ? "Last Check is " + currentDateDiff + " days ago" : "Last Check is today";
                      break;

                    case "popUpSlik":
                      this.LastHit.SLIK = currentDateDiff > 0 ? "Last Check is " + currentDateDiff + " days ago" : "Last Check is today";
                      break;

                    default:
                      break;
                  }
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
            }
          }
          else {
            this.http.post(urlAdd, this.CustThirdPartyChecking).toPromise().then(
              (response) => {
                var currentLastHitDate = new Date(response["StartDt"]);
                var currentDateDiff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(currentLastHitDate.getFullYear(), currentLastHitDate.getMonth(), currentLastHitDate.getDate())) / (1000 * 60 * 60 * 24));
                switch (contentString) {
                  case "popUpPefindo":
                    this.LastHit.PEFINDO = currentDateDiff > 0 ? "Last Check is " + currentDateDiff + " days ago" : "Last Check is today";
                    break;

                  case "popUpSlik":
                    this.LastHit.SLIK = currentDateDiff > 0 ? "Last Check is " + currentDateDiff + " days ago" : "Last Check is today";
                    break;

                  default:
                    break;
                }
              }
            ).catch(
              (error) => {
                console.log(error);
              }
            );
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    this.Open(content);
  }

  Open(contentCrossApp) {
    this.modalService.open(contentCrossApp).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason): string {
    if (reason === 1) {
      return 'by pressing ESC';
    } else if (reason === 0) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
