import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { OrgMdlObj } from 'app/shared/model/OrgMdlObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component'
import { Console } from '@angular/core/src/console';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';


@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss'],
  providers: [NGXToastrService]
})
export class OfficeAddComponent implements OnInit {

  // @ViewChild(UcAddressComponent) ucAddr;
  // @ViewChild(UcContactInfoComponent) ucContact;
  // @ViewChild('ParentId') test: ElementRef;
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
  mrCgType: any;
  MrOfficeClassCode: any;
  mrOfficeType: any;
  refOrgId: any;
  orgMdlId: any;
  parentId: any;
  refOfficeAreaId: any = '';
  holidaySchmHId: any;
  workingHourSchmHId: any;
  cntctPersonName: any;
  cntctPersonJobTitle: any;
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
  refMasterOfficeType: RefMasterObj;
  refMasterCgType: RefMasterObj;
  orgMdlObj: OrgMdlObj

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
    CntctPersonEmail1: ['', Validators.required],
    CntctPersonEmail2: [''],
    CntctPersonMobilePhnNo1: ['', [Validators.required, Validators.max(15),Validators.pattern('^[0-9]+$')]],
    CntctPersonMobilePhnNo2: ['', [Validators.max(15),Validators.pattern('^[0-9]+$')]],
    IsActive: false,
    OfficeClose: false,
    AllowAppCreated: false
  })
  InputLookupObj: any;
  addressObj: UcAddressObj;


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.apiUrl = AdInsConstant.GetRefOfficeByRefOfficeId;
    this.addUrl = AdInsConstant.AddRefOffice;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefOffice;
    this.officeClassUrl = AdInsConstant.GetRefMasterListKeyValueActiveByCode;
    this.refOrgUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    this.orgMdlUrl = this.foundationUrl + AdInsConstant.GetAllActiveOrgMdlByRefOrgId;
    this.officeParentUrl = AdInsConstant.GetListUpperHierarchyRefOfficeByRefOrgId;
    this.areaUrl = this.foundationUrl + AdInsConstant.GetAllListArea;
    this.holidaySchmUrl = AdInsConstant.GetListActiveHolidaySchemeH;
    this.workingHourSchmUrl = AdInsConstant.GetListActiveWorkingSchmH;
    this.getRefOrgUrl = this.foundationUrl + AdInsConstant.GetRefOrg;
    this.konSyaUrl = AdInsConstant.GetRefMasterListKeyValueActiveByCode
    this.officeTypeUrl = AdInsConstant.GetRefMasterListKeyValueActiveByCode

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
    this.InputLookupObj.urlEnviPaging = "http://r3app-server.ad-ins.com/FOUNDATION_R3";
    this.InputLookupObj.pagingJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupObj.genericJson = "./assets/lookup/lookupOfficeParent.json";

    this.refMasterObj = new RefMasterObj();
    this.refMasterObj.RefMasterTypeCode = 'OFFICE_CLASS';
    this.refMasterOfficeType = new RefMasterObj();
    this.refMasterOfficeType.RefMasterTypeCode = 'OFFICE_TYPE';
    this.refMasterCgType = new RefMasterObj();
    this.refMasterCgType.RefMasterTypeCode = 'CENTER_GRP_TYPE';
    this.refMasterKonsyaType = new RefMasterObj();
    this.refMasterKonsyaType.RefMasterTypeCode = 'KONVEN_SYARIAH';
    if (this.pageType == "add") {
      this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
        (response) => {
          console.log(response);
          this.allOfficeClass = response['ReturnObject'];
          this.OfficeForm.patchValue({
            MrOfficeClassCode: this.allOfficeClass[0].Key
          });
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterCgType).subscribe(
        (response) => {
          console.log(response);
          this.allCgType = response['ReturnObject'];
          this.OfficeForm.patchValue({
            MrCenterGrpTypeCode: this.allCgType[0].Key
          });

        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterKonsyaType).subscribe(
        (response) => {
          console.log(response);
          this.allKonSya = response['ReturnObject'];
          this.OfficeForm.patchValue({
            KonSya: this.allKonSya[0].Key
          });
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterOfficeType).subscribe(
        (response) => {
          console.log(response);
          this.allOfficeType = response['ReturnObject'];
          this.OfficeForm.patchValue({
            OfficeType: this.allOfficeType[0].Key
          });
        },
        (error) => {
          console.log(error);
        })

      this.httpClient.post(this.holidaySchmUrl, null).subscribe(
        (response) => {
          console.log(response);
          this.allHolidaySchm = response['ReturnObject'];
          this.OfficeForm.patchValue({
            HolidayScheme: this.allHolidaySchm[0].HolidaySchmHId
          });
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
        (response) => {
          console.log(response);
          this.allWorkingHourSchm = response['ReturnObject'];
          this.OfficeForm.patchValue({
            WorkingHourScheme: this.allWorkingHourSchm[0].WorkingHourSchmHId
          });
        },
        (error) => {
          console.log(error);
        })

    } else if (this.pageType == "edit") {
      this.OfficeForm.controls["OfficeCode"].disable();
      this.OfficeForm.controls["OfficeType"].disable();
      this.OfficeForm.controls["MrCenterGrpTypeCode"].disable();
      this.officeObj = new OfficeObj();
      this.centerGrpObj = new OfficeObj();
      this.addressObj = new UcAddressObj();
      this.officeObj.RefOfficeId = this.RefOfficeId;
      // this.centerGrpObj.RefOfficeId = this.RefOfficeId;
      // console.log(this.centerGrpObj.RefOfficeId); 
      this.httpClient.post(AdInsConstant.GetRefOfficeByRefOfficeId, this.officeObj).subscribe(
        (response) => {
          this.resultData = response;
          this.InputLookupObj.nameSelect = this.resultData["ParentOfficeCode"];

          this.OfficeForm.patchValue({
            OfficeCode: this.resultData.OfficeCode,
            OfficeName: this.resultData.OfficeName,
            OfficeType: this.resultData.MrOfficeTypeCode,
            OfficeShortName: this.resultData.OfficeShortName,
            MrOfficeClassCode: this.resultData.MrOfficeClassCode,
            KonSya: this.resultData.MrKonvenSyariahCode,
            HolidayScheme: this.resultData.HolidaySchmHId,
            WorkingHourScheme: this.resultData.WorkingHourSchmHId,
            IsActive: this.resultData.IsActive,
            OfficeClose: this.resultData.IsOfficeClose,
            AllowAppCreated: this.resultData.IsAllowAppCreated,
            CntctPersonEmail1: this.resultData.CntctPersonEmail1,
            CntctPersonEmail2: this.resultData.CntctPersonEmail2,
            CntctPersonMobilePhnNo1: this.resultData.CntctPersonMobilePhnNo1,
            CntctPersonMobilePhnNo2: this.resultData.CntctPersonMobilePhnNo2,
          })
          this.addressObj.Addr = this.resultData.Addr;
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


          this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterCgType).subscribe(
            (response) => {
              console.log(response);
              this.allCgType = response['ReturnObject'];
              this.OfficeForm.patchValue({
                MrCenterGrpTypeCode: this.resultData.MrCenterGrpTypeCode
              });

            },
            (error) => {
              console.log(error);
            })

          var orgMdlObj = new OrgMdlObj();
          this.httpClient.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, this.refMasterObj).subscribe(
            (response) => {
              console.log(response);
              this.allOfficeClass = response['ReturnObject'];
              this.OfficeForm.patchValue({
                MrOfficeClassCode: this.resultData.MrOfficeClassCode
              });
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.officeTypeUrl, this.refMasterOfficeType).subscribe(
            (response) => {
              console.log(response);
              this.allOfficeType = response['ReturnObject'];
              this.OfficeForm.patchValue({
                OfficeType: this.resultData.MrOfficeTypeCode
              });
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.konSyaUrl, this.refMasterKonsyaType).subscribe(
            (response) => {
              console.log(response);
              this.allKonSya = response['ReturnObject'];

              this.OfficeForm.patchValue({
                KonSya: this.resultData.MrKonvenSyariahCode
              });
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.holidaySchmUrl, null).subscribe(
            (response) => {
              console.log(response);
              this.allHolidaySchm = response['ReturnObject'];
              this.OfficeForm.patchValue({
                HolidayScheme: this.resultData.HolidaySchmHId
              });
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
            (response) => {
              console.log(response);
              this.allWorkingHourSchm = response['ReturnObject'];
              this.OfficeForm.patchValue({
                WorkingHourScheme: this.resultData.WorkingHourSchmHId
              });
            },
            (error) => {
              console.log(error);
            })

        })
    }
  }

  onChangeGrpType(value) {
    console.log(value.key);
    console.log(value.value);
  }

  SaveForm(): void {
    this.officeObj = new OfficeObj();
    this.centerGrpObj = new OfficeObj();
    //this.officeObj = this.OfficeForm.value;
    this.officeObj.RowVersion = "";
    console.log(this.OfficeForm.value);
    console.log(this.officeObj);

    // this.officeObj.RefOfficeId = this.OfficeForm.value.RefOfficeId;
    this.officeObj.OfficeCode = this.OfficeForm.value.OfficeCode;
    this.officeObj.OfficeShortName = this.OfficeForm.value.OfficeShortName;
    this.officeObj.OfficeName = this.OfficeForm.value.OfficeName;
    this.officeObj.MrOfficeClassCode = this.OfficeForm.value.MrOfficeClassCode;
    this.officeObj.IsActive = this.OfficeForm.value.IsActive;
    this.officeObj.ParentId = this.OfficeForm.value.OfficeParent;
    this.officeObj.IsAllowAppCreated = this.OfficeForm.value.AllowAppCreated;
    this.officeObj.HolidaySchmHId = this.OfficeForm.value.HolidayScheme;
    this.officeObj.WorkingHourSchmHId = this.OfficeForm.value.WorkingHourScheme;
    this.officeObj.MrKonvenSyariahCode = this.OfficeForm.value.KonSya;
    this.officeObj.MrOfficeTypeCode = this.OfficeForm.value.OfficeType;
    this.officeObj.IsOfficeClose = this.OfficeForm.value.OfficeClose;


    if (this.officeObj.MrOfficeTypeCode == "CG") {
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
    this.officeObj.ZipCode = this.OfficeForm.value.UcZipcode.value;
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

    this.officeObj.CntctPersonName = "asd"
    this.officeObj.CntctPersonJobTitle = "asd"

    if (this.pageType == "add") {
      if (this.officeObj.MrOfficeTypeCode == "CG") {
        this.httpClient.post(AdInsConstant.AddRefOffice, this.officeObj).subscribe(
          (response) => {
            console.log(response);
            this.toastr.successMessage(response['message']);
            this.router.navigate(["/Office/Paging"]);
          },
          (error) => {
            console.log(error);
          }
        );

        this.httpClient.post(AdInsConstant.AddCenterGrp, this.centerGrpObj).subscribe(
          (response) => {
            console.log(response);
            this.toastr.successMessage(response['message']);
            this.router.navigate(["/Office/Paging"]);
          },
          (error) => {
            console.log(error);
          }

        );
      }
      else {
        this.httpClient.post(AdInsConstant.AddRefOffice, this.officeObj).subscribe(
          (response) => {
            console.log(response);
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
      this.officeObj.RefOfficeId = this.resultData.RefOfficeId;
      this.officeObj.RowVersion = this.resultData.RowVersion;
      this.httpClient.post(this.editUrl, this.officeObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/Office/Paging"]);
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
    // console.log(this.test);
  }

  toggleAllowAppCreated(e) {
    this.isAllowAppCreated = e.target.checked;
  }

  // onChangeRefOrg(refOrgValue, edit: boolean = false) {
  //   for (var i = 0; i < this.allRefOrg.length; i++) {
  //     if (refOrgValue == this.allRefOrg[i].refOrgId) {
  //       this.hierarchyNo = this.allRefOrg[i].hierarchyNo;
  //       console.log(this.hierarchyNo);
  //       if (this.hierarchyNo == 1) {
  //         this.isHO = true;
  //       } else {
  //         this.isHO = false;
  //         this.isDisabledState = false;
  //       }
  //     }
  //   }

  //   this.orgMdlObj = new OrgMdlObj();
  //   this.orgMdlObj.refOrgId = refOrgValue
  //   this.httpClient.post(this.orgMdlUrl, this.orgMdlObj).subscribe(
  //     (response) => {
  //       this.allOrgMdl = response['returnObject'];
  //       if (edit == false) {
  //         this.orgMdlId = response['returnObject'][0]['orgMdlId'];
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     })
  //   this.httpClient.post(this.officeParentUrl, this.orgMdlObj).subscribe(
  //     (response) => {
  //       this.allOfficeParent = response['returnObject'];
  //       if (response['returnObject']['length'] != 0) {
  //         if (edit == false) {
  //           this.parentId = response['returnObject'][0]['refOfficeId'];
  //           this.onChangeOfficeParent(response['returnObject'][0]['refOfficeId']);
  //         } else {
  //           this.onChangeOfficeParent(this.parentId);
  //         }
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     })
  // }

  // onChangeOfficeParent(officeParentValue) {
  //   if (this.hierarchyNo > 2) {
  //     for (var i = 0; i < this.allOfficeParent.length; i++) {
  //       if (officeParentValue == this.allOfficeParent[i].RefOfficeId) {
  //         this.mrKonvenSyariah = this.allOfficeParent[i].mrKonvenSyariah;
  //         this.isDisabledState = true;
  //       }
  //     }
  //   }
  // }
  getLookUp(ev) {
    console.log("isi ev");
    console.log(ev);
    this.OfficeForm.patchValue({
      OfficeParent: ev.RefOfficeId
    })
    // this.CustForm.patchValue({
    //   AreaCode2: ev.AreaCode2,
    //   AreaCode1: ev.AreaCode1,
    //   City: ev.City,
    //   ZipCode: ev.ZipCode
    // });
    //console.log(this.CustForm.controls["lookupZipCode"]["controls"]);
    // this.InputLookupObj.nameSelect = ev.zipcode;
    // this.InputLookupObj.idSelect = ev.zipcode;
  }
}
