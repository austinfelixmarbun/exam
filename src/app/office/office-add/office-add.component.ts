import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { OrgMdlObj } from 'app/shared/model/OrgMdlObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  providers: [NGXToastrService]
})
export class OfficeAddComponent implements OnInit {

  // @ViewChild(UcAddressComponent) ucAddr;
  // @ViewChild(UcContactInfoComponent) ucContact;
  // @ViewChild('ParentId') test: ElementRef;
  inputFieldAddr: InputFieldObj = new InputFieldObj();
  pageType: string = "add";
  mrKonvenSyariah = 'KON';
  isDisabledState: boolean = false;
  isHO: boolean = true;
  RefOfficeId: any;
  allOfficeType: any;
  allOfficeClass: any;
  allRefOrg: any;
  allOrgMdl: any;
  allKonSya: any;
  allOfficeParent: any;
  allRefOfficeArea: any;
  allHolidaySchm: any;
  allWorkingHourSchm: any;
  allRefTaxOffice: any;
  allCgType: any;
  lookupOfficeType: any;
  mrCgType: any;
  MrOfficeClassCode: any;
  mrOfficeType: any;
  refOrgId: any;
  orgMdlId: any;
  parentId: any;
  refOfficeAreaId: any = '';
  holidaySchmHId: any;
  workingHourSchmHId: any;
  hierarchyNo: any;
  officeCode: any;
  officeName: any;
  officeShortName: any;
  resultData: any;
  apiUrl: any;
  addUrl: any;
  editUrl: any;
  officeClassUrl: any;
  refOrgUrl: any;
  getRefOrgUrl: any;
  orgMdlUrl: any;
  addEditUrl: any;
  areaUrl: any;
  officeParentUrl: any;
  holidaySchmUrl: any;
  workingHourSchmUrl: any;
  foundationUrl: string = environment.FoundationR3Url;
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  officeClose: boolean = true;
  officeObj: OfficeObj;
  centerGrpObj: OfficeObj;
  refMasterObj: RefMasterObj;
  lookUpRefMasterOfficeObj: RefMasterObj;
  refMasterOfficeType: RefMasterObj;
  refMasterCgType: RefMasterObj;
  orgMdlObj: OrgMdlObj
  arrCrit: any;

  refMasterKonsyaType: RefMasterObj;
  konSyaUrl: any;
  officeTypeUrl: any;
  officeparentId: any;


  OfficeForm = this.fb.group({
    OfficeCode: ['', Validators.required],
    OfficeName: ['', Validators.required],
    OfficeShortName: [''],
    OfficeType: ['', Validators.required],
    OfficeParent: ['', Validators.required],
    KonSya: ['', Validators.required],
    MrOfficeClassCode: ['', Validators.required],
    HolidayScheme: ['', Validators.required],
    WorkingHourScheme: ['', Validators.required],
    MrCenterGrpTypeCode: ['', Validators.required],
    // PhnArea1: ['', [Validators.required, Validators.max(4)]],
    // Phn1: ['',Validators.required],
    // PhnExt1: ['',[Validators.required, Validators.max(4)]],
    // PhnArea2:  ['',Validators.max(4)],
    // Phn2: [''],
    // PhnExt2: ['',Validators.max(4)],
    // PhnArea3: ['',Validators.max(4)],
    // Phn3:  [''],
    // PhnExt3:  ['',Validators.max(4)],
    // Fax:  ['',Validators.max(4)],
    CntctPersonName: ['', Validators.required],
    CntctPersonJobTitle: ['', Validators.required],
    CntctPersonEmail1: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    CntctPersonEmail2: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
    CntctPersonMobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    CntctPersonMobilePhnNo2: ['', [Validators.pattern('^[0-9]+$')]],
    IsActive: false,
    OfficeClose: false,
    AllowAppCreated: false
  })
  InputLookupObj: any;
  addressObj: UcAddressObj;


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.apiUrl = URLConstant.GetRefOfficeByRefOfficeId;
    this.addUrl = URLConstant.AddRefOffice;
    this.editUrl = this.foundationUrl + URLConstant.EditRefOffice;
    this.officeClassUrl = URLConstant.GetRefMasterListKeyValueActiveByCode;
    this.refOrgUrl = this.foundationUrl + URLConstant.GetListAllRefOrg;
    this.orgMdlUrl = this.foundationUrl + URLConstant.GetAllActiveOrgMdlByRefOrgId;
    this.officeParentUrl = URLConstant.GetListUpperHierarchyRefOfficeByRefOrgId;
    this.areaUrl = this.foundationUrl + URLConstant.GetAllListArea;
    this.holidaySchmUrl = URLConstant.GetListActiveHolidaySchemeH;
    this.workingHourSchmUrl = URLConstant.GetListActiveWorkingSchmH;
    this.getRefOrgUrl = this.foundationUrl + URLConstant.GetRefOrg;
    this.konSyaUrl = URLConstant.GetRefMasterListKeyValueActiveByCode
    this.officeTypeUrl = URLConstant.GetRefMasterListKeyValueActiveByCode

    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.pageType = params['mode'];
      }
      if (params['RefOfficeId'] != null) {
        this.RefOfficeId = params['RefOfficeId'];
      }
    });
  }
  ngOnInit() {
    this.InputLookupObj = new InputLookupObj();
    this.InputLookupObj.urlJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.InputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.InputLookupObj.pagingJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupObj.genericJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupObj.isRequired = true;
    this.InputLookupObj.ddlEnvironments = [
      {
        name: "A.MR_OFFICE_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    this.refMasterObj = new RefMasterObj();
    this.refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeOfficeClass;
    this.refMasterOfficeType = new RefMasterObj();
    this.refMasterOfficeType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeOfficeType;
    this.refMasterCgType = new RefMasterObj();
    this.refMasterCgType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCenterGrpType;
    this.refMasterKonsyaType = new RefMasterObj();
    this.refMasterKonsyaType.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeKonvenSyariah;

    this.lookUpRefMasterOfficeObj = new RefMasterObj();
    this.lookUpRefMasterOfficeObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeOfficeType;

    this.httpClient.post(URLConstant.GetRefMasterTypeOfficeWithoutCG, this.lookUpRefMasterOfficeObj).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.lookupOfficeType = response[CommonConstant.ReturnObj];

          this.arrCrit = new Array();
          var critObj = new CriteriaObj();
          critObj.restriction = AdInsConstant.RestrictionIn;
          critObj.propName = 'MR_OFFICE_TYPE_CODE';
          critObj.listValue = new Array();
          this.lookupOfficeType.forEach(element => {
            critObj.listValue.push(element.Key);
          });

          this.arrCrit.push(critObj);
          this.InputLookupObj.addCritInput = this.arrCrit;
        }

      },
      (error) => {
        console.log(error);
      });

    if (this.pageType == "add") {
      this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
        (response) => {
          if (response[CommonConstant.ReturnObj].length > 0) {
            this.allOfficeClass = response[CommonConstant.ReturnObj];
            this.OfficeForm.patchValue({
              MrOfficeClassCode: this.allOfficeClass[0].Key
            });
          }
        },
        (error) => {
          console.log(error);
        });

      this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterCgType).subscribe(
        (response) => {
          if (response[CommonConstant.ReturnObj].length > 0) {
            this.allCgType = response[CommonConstant.ReturnObj];
            this.OfficeForm.patchValue({
              MrCenterGrpTypeCode: this.allCgType[0].Key
            });
          }

        },
        (error) => {
          console.log(error);
        });
      this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterKonsyaType).subscribe(
        (response) => {
          if (response[CommonConstant.ReturnObj].length > 0) {
            this.allKonSya = response[CommonConstant.ReturnObj];
            this.OfficeForm.patchValue({
              KonSya: this.allKonSya[0].Key
            });
          }
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterOfficeType).subscribe(
        (response) => {
          if (response[CommonConstant.ReturnObj].length > 0) {
            this.allOfficeType = response[CommonConstant.ReturnObj];
            this.OfficeForm.patchValue({
              OfficeType: this.allOfficeType[0].Key
            });
          }
        },
        (error) => {
          console.log(error);
        })

      this.httpClient.post(this.holidaySchmUrl, null).subscribe(
        (response) => {
          if (response[CommonConstant.ReturnObj].length > 0) {
            this.allHolidaySchm = response[CommonConstant.ReturnObj];
            this.OfficeForm.patchValue({
              HolidayScheme: this.allHolidaySchm[0].HolidaySchmHId
            });
          }
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
        (response) => {
          if (response[CommonConstant.ReturnObj].length > 0) {
            this.allWorkingHourSchm = response[CommonConstant.ReturnObj];
            this.OfficeForm.patchValue({
              WorkingHourScheme: this.allWorkingHourSchm[0].WorkingHourSchmHId
            });
          }
        },
        (error) => {
          console.log(error);
        })


    }
    else if (this.pageType == "edit") {
      this.OfficeForm.controls["OfficeCode"].disable();
      this.OfficeForm.controls["OfficeType"].disable();
      this.OfficeForm.controls["MrCenterGrpTypeCode"].disable();
      this.officeObj = new OfficeObj();
      this.centerGrpObj = new OfficeObj();
      this.addressObj = new UcAddressObj();
      this.officeObj.RefOfficeId = this.RefOfficeId;
      // this.centerGrpObj.RefOfficeId = this.RefOfficeId;
      this.httpClient.post(URLConstant.GetRefOfficeByRefOfficeId, this.officeObj).subscribe(
        (response) => {
          this.resultData = response;
          this.InputLookupObj.jsonSelect = { OfficeCode: this.resultData.ParentOfficeCode, RefOfficeId: this.resultData.ParentId };
          this.InputLookupObj.nameSelect = this.resultData["ParentOfficeCode"];
          this.InputLookupObj.jsonSelect = { OfficeCode: this.resultData["ParentOfficeCode"] };
          this.OfficeForm.patchValue({
            OfficeCode: this.resultData.OfficeCode,
            OfficeName: this.resultData.OfficeName,
            OfficeParent: this.resultData.ParentId,
            OfficeType: this.resultData.MrOfficeTypeCode,
            OfficeShortName: this.resultData.OfficeShortName,
            MrOfficeClassCode: this.resultData.MrOfficeClassCode,
            KonSya: this.resultData.MrKonvenSyariahCode,
            HolidayScheme: this.resultData.HolidaySchmHId,
            WorkingHourScheme: this.resultData.WorkingHourSchmHId,
            IsActive: this.resultData.IsActive,
            OfficeClose: this.resultData.IsOfficeClose,
            AllowAppCreated: this.resultData.IsAllowAppCreated,
            CntctPersonName: this.resultData.CntctPersonName,
            CntctPersonJobTitle: this.resultData.CntctPersonJobTitle,
            CntctPersonEmail1: this.resultData.CntctPersonEmail1,
            CntctPersonEmail2: this.resultData.CntctPersonEmail2,
            CntctPersonMobilePhnNo1: this.resultData.CntctPersonMobilePhnNo1,
            CntctPersonMobilePhnNo2: this.resultData.CntctPersonMobilePhnNo2,
          })
          this.checkType();
          this.addressObj.Addr = this.resultData.OfficeAddr;
          this.addressObj.AreaCode4 = this.resultData.AreaCode4;
          this.addressObj.AreaCode3 = this.resultData.AreaCode3;
          this.addressObj.AreaCode2 = this.resultData.AreaCode2;
          this.addressObj.AreaCode1 = this.resultData.AreaCode1;
          this.addressObj.City = this.resultData.City;
          this.addressObj.PhnArea1 = this.resultData.PhnArea1;
          this.addressObj.Phn1 = this.resultData.Phn1;
          this.addressObj.PhnExt1 = this.resultData.PhnExt1
          this.addressObj.PhnArea2 = this.resultData.PhnArea2
          this.addressObj.Phn2 = this.resultData.Phn2
          this.addressObj.PhnExt2 = this.resultData.PhnExt2
          this.addressObj.PhnArea3 = this.resultData.PhnArea3
          this.addressObj.Phn3 = this.resultData.Phn3
          this.addressObj.PhnExt3 = this.resultData.PhnExt3
          this.addressObj.FaxArea = this.resultData.FaxArea
          this.addressObj.Fax = this.resultData.Fax
          this.inputFieldAddr.inputLookupObj = new InputLookupObj();
          this.inputFieldAddr.inputLookupObj.jsonSelect = { Zipcode: this.resultData.Zipcode };
          this.inputFieldAddr.inputLookupObj.nameSelect = this.resultData.Zipcode;
          this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterCgType).subscribe(
            (response) => {
              if (response[CommonConstant.ReturnObj].length > 0) {
                this.allCgType = response[CommonConstant.ReturnObj];
                this.OfficeForm.patchValue({
                  MrCenterGrpTypeCode: this.resultData.MrCenterGrpTypeCode
                });
              }

            },
            (error) => {
              console.log(error);
            })

          this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
            (response) => {
              if (response[CommonConstant.ReturnObj].length > 0) {
                this.allOfficeClass = response[CommonConstant.ReturnObj];
                this.OfficeForm.patchValue({
                  MrOfficeClassCode: this.resultData.MrOfficeClassCode
                });
              }
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.officeTypeUrl, this.refMasterOfficeType).subscribe(
            (response) => {
              if (response[CommonConstant.ReturnObj].length > 0) {
                this.allOfficeType = response[CommonConstant.ReturnObj];
                this.OfficeForm.patchValue({
                  OfficeType: this.resultData.MrOfficeTypeCode
                });
              }
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.konSyaUrl, this.refMasterKonsyaType).subscribe(
            (response) => {
              if (response[CommonConstant.ReturnObj].length > 0) {
                this.allKonSya = response[CommonConstant.ReturnObj];

                this.OfficeForm.patchValue({
                  KonSya: this.resultData.MrKonvenSyariahCode
                });
              }
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.holidaySchmUrl, null).subscribe(
            (response) => {
              if (response[CommonConstant.ReturnObj].length > 0) {
                this.allHolidaySchm = response[CommonConstant.ReturnObj];
                this.OfficeForm.patchValue({
                  HolidayScheme: this.resultData.HolidaySchmHId
                });
              }
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
            (response) => {
              if (response[CommonConstant.ReturnObj].length > 0) {
                this.allWorkingHourSchm = response[CommonConstant.ReturnObj];
                this.OfficeForm.patchValue({
                  WorkingHourScheme: this.resultData.WorkingHourSchmHId
                });
              }
            },
            (error) => {
              console.log(error);
            })

        })
    }

  }
  SaveForm(): void {
    this.officeObj = new OfficeObj();
    this.centerGrpObj = new OfficeObj();
    this.officeObj.RowVersion = "";

    this.officeObj.OfficeCode = this.OfficeForm.value.OfficeCode;
    this.officeObj.OfficeShortName = this.OfficeForm.value.OfficeShortName;
    this.officeObj.OfficeName = this.OfficeForm.value.OfficeName;
    this.officeObj.MrOfficeClassCode = this.OfficeForm.value.MrOfficeClassCode;
    this.officeObj.IsActive = this.OfficeForm.value.IsActive;
    this.officeObj.IsAllowAppCreated = this.OfficeForm.value.AllowAppCreated;
    this.officeObj.HolidaySchmHId = this.OfficeForm.value.HolidayScheme;
    this.officeObj.WorkingHourSchmHId = this.OfficeForm.value.WorkingHourScheme;
    this.officeObj.MrKonvenSyariahCode = this.OfficeForm.value.KonSya;
    this.officeObj.MrOfficeTypeCode = this.OfficeForm.value.OfficeType;
    this.officeObj.IsOfficeClose = this.OfficeForm.value.OfficeClose;
    this.officeObj.CntctPersonName = this.OfficeForm.value.CntctPersonName;
    this.officeObj.CntctPersonJobTitle = this.OfficeForm.value.CntctPersonJobTitle;

    if (this.OfficeForm.controls.OfficeType.value == CommonConstant.HeadOffice) {
      this.officeObj.ParentId = null;
    }
    if (this.OfficeForm.controls.OfficeType.value != CommonConstant.HeadOffice) {
      this.officeObj.ParentId = this.OfficeForm.value.OfficeParent;
    }

    if (this.officeObj.MrOfficeTypeCode == CommonConstant.CollectionGroup) {
      this.centerGrpObj.MrCenterGrpTypeCode = this.OfficeForm.value.MrCenterGrpTypeCode;
      this.centerGrpObj.CenterGrpCode = this.OfficeForm.value.OfficeCode;
      this.centerGrpObj.CenterGrpName = this.OfficeForm.value.OfficeName;
    } else {
      this.officeObj.MrCenterGrpTypeCode = "";
    }


    this.officeObj.CntctPersonEmail1 = this.OfficeForm.value.CntctPersonEmail1;
    this.officeObj.CntctPersonEmail2 = this.OfficeForm.value.CntctPersonEmail2;
    this.officeObj.CntctPersonMobilePhnNo1 = this.OfficeForm.value.CntctPersonMobilePhnNo1;
    this.officeObj.CntctPersonMobilePhnNo2 = this.OfficeForm.value.CntctPersonMobilePhnNo2;

    this.officeObj.OfficeAddr = this.OfficeForm.value.UcAddress.Addr;
    this.officeObj.AreaCode4 = this.OfficeForm.value.UcAddress.AreaCode4;
    this.officeObj.AreaCode3 = this.OfficeForm.value.UcAddress.AreaCode3;
    this.officeObj.AreaCode2 = this.OfficeForm.value.UcAddress.AreaCode2;
    this.officeObj.AreaCode1 = this.OfficeForm.value.UcAddress.AreaCode1;
    this.officeObj.City = this.OfficeForm.value.UcAddress.City;
    this.officeObj.ZipCode = this.OfficeForm.value.UcAddressZipcode.value;
    this.officeObj.PhnArea1 = this.OfficeForm.value.UcAddress.PhnArea1;
    this.officeObj.Phn1 = this.OfficeForm.value.UcAddress.Phn1;
    this.officeObj.PhnExt1 = this.OfficeForm.value.UcAddress.PhnExt1;
    this.officeObj.PhnArea2 = this.OfficeForm.value.UcAddress.PhnArea2;
    this.officeObj.Phn2 = this.OfficeForm.value.UcAddress.Phn2;
    this.officeObj.PhnExt2 = this.OfficeForm.value.UcAddress.PhnExt2;
    this.officeObj.PhnArea3 = this.OfficeForm.value.UcAddress.PhnArea3;
    this.officeObj.Phn3 = this.OfficeForm.value.UcAddress.Phn2;
    this.officeObj.PhnExt2 = this.OfficeForm.value.UcAddress.PhnExt3;
    this.officeObj.FaxArea = this.OfficeForm.value.UcAddress.FaxArea;
    this.officeObj.Fax = this.OfficeForm.value.UcAddress.Fax;

    if (this.pageType == "add") {
      if (this.officeObj.MrOfficeTypeCode == CommonConstant.CollectionGroup) {
        this.httpClient.post(URLConstant.AddRefOffice, this.officeObj).subscribe(
          (response) => {
            this.toastr.successMessage(response['message']);
            this.router.navigate(["/Office/Paging"]);
          },
          (error) => {
            console.log(error);
          }
        );

        this.httpClient.post(URLConstant.AddCenterGrp, this.centerGrpObj).subscribe(
          (response) => {
            this.toastr.successMessage(response['message']);
            this.router.navigate(["/Office/Paging"]);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      else {
        this.httpClient.post(URLConstant.AddRefOffice, this.officeObj).subscribe(
          (response) => {
            this.toastr.successMessage(response['message']);
            this.router.navigate(["/Office/Paging"]);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    else {
      this.officeObj.OfficeCode = this.resultData.OfficeCode;
      this.officeObj.MrOfficeTypeCode = this.resultData.MrOfficeTypeCode
      this.officeObj.RefOfficeId = this.resultData.RefOfficeId;
      this.officeObj.RowVersion = this.resultData.RowVersion;
      this.httpClient.post(this.editUrl, this.officeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/Office/Paging"]);
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }
  checkType() {
    if (this.OfficeForm.controls.OfficeType.value == CommonConstant.HeadOffice) {
      this.OfficeForm.patchValue({
        OfficeParent: null
      });
      this.InputLookupObj.isRequired = false;
      this.OfficeForm.controls.OfficeParent.clearValidators();
      this.OfficeForm.controls.OfficeParent.updateValueAndValidity();
    }
    else {
      this.InputLookupObj.isRequired = true;
      this.OfficeForm.controls.OfficeParent.setValidators([Validators.required]);
      this.OfficeForm.controls.OfficeParent.updateValueAndValidity();
    }
  }
  toggleActive(e) {
    this.isActive = e.target.checked;
  }

  toggleAllowAppCreated(e) {
    this.isAllowAppCreated = e.target.checked;
  }
  getLookUp(ev) {
    this.OfficeForm.patchValue({
      OfficeParent: ev.RefOfficeId
    })
    // this.CustForm.patchValue({
    //   AreaCode2: ev.AreaCode2,
    //   AreaCode1: ev.AreaCode1,
    //   City: ev.City,
    //   ZipCode: ev.ZipCode
    // });
    // this.InputLookupObj.nameSelect = ev.zipcode;
    // this.InputLookupObj.idSelect = ev.zipcode;
  }
}
