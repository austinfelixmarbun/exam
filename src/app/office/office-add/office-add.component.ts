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


@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss'],
  providers: [NGXToastrService]
})
export class OfficeAddComponent implements OnInit {

  @ViewChild(UcAddressComponent) ucAddr;
  @ViewChild(UcContactInfoComponent) ucContact;
  @ViewChild('ParentId') test: ElementRef;
  pageType: string = "add";
  mrKonvenSyariah = 'KON';
  isDisabledState: boolean = false;
  isHO: boolean = true;
  refOfficeId: any;
  allOfficeType : any;
  allOfficeClass: any;
  allRefOrg: any;
  allOrgMdl: any;
  allKonSya: any;
  allOfficeParent: any;
  allRefOfficeArea: any;
  allHolidaySchm: any;
  allWorkingHourSchm: any;
  allRefTaxOffice: any;
  allCgType:any;
  mrCgType:any;
  mrOfficeClass: any;
  mrOfficeType:any;
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
  foundationUrl: string = environment.foundationUrl;
  settingUrl: string = environment.FoundationR3Url;
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  officeClose: boolean = true;
  officeObj: OfficeObj;
  refMasterObj: RefMasterObj;
  refMasterOfficeType: RefMasterObj;
  refMasterCgType:RefMasterObj;
  orgMdlObj: OrgMdlObj
  
  refMasterKonsyaType: RefMasterObj;
  konSyaUrl: any;
  officeTypeUrl: any;

  OfficeForm = this.fb.group({
    OfficeCode:['', Validators.required],
    OfficeName:['', Validators.required],
    OfficeShortName:[''],
    OfficeType:['', Validators.required],
    OfficeParent:['', Validators.required],
    KonSya:['', Validators.required],
    OfficeClass:['', Validators.required],
    HolidayScheme:['', Validators.required],
    WorkingHourScheme:['', Validators.required],
    IsActive:[''],
    OfficeClose:[''],
    AllowAppCreated:['']
  })

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb:FormBuilder) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOfficeObj;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefOffice;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefOffice;
    this.officeClassUrl = this.settingUrl + AdInsConstant.GetRefMasterListKeyValueActiveByCode;
    this.refOrgUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    this.orgMdlUrl = this.foundationUrl + AdInsConstant.GetAllActiveOrgMdlByRefOrgId;
    this.officeParentUrl = this.foundationUrl + AdInsConstant.GetListUpperHierarchyRefOfficeByRefOrgId;
    this.areaUrl = this.foundationUrl + AdInsConstant.GetAllListArea;
    this.holidaySchmUrl = AdInsConstant.GetAllActiveHolidaySchmH;
    this.workingHourSchmUrl = this.foundationUrl + AdInsConstant.GetListOfWorkingHourSchm;
    this.getRefOrgUrl = this.foundationUrl + AdInsConstant.GetRefOrg;
    this.konSyaUrl = this.settingUrl + AdInsConstant.GetRefMasterListKeyValueActiveByCode
    this.officeTypeUrl = this.settingUrl + AdInsConstant.GetRefMasterListKeyValueActiveByCode

    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
    });
  }

  ngOnInit() {
    this.refMasterObj = new RefMasterObj();
    // this.refMasterObj.refMasterTypeCode = 'OFFICE_CLASS';
    this.refMasterOfficeType = new RefMasterObj();
    // this.refMasterOfficeType.refMasterTypeCode = 'OFFICE_TYPE';
    this.refMasterCgType = new RefMasterObj();
    this.refMasterCgType.refMasterTypeCode = 'CENTER_GRP_TYPE';
    this.refMasterKonsyaType = new RefMasterObj();
    this.refMasterKonsyaType.refMasterTypeCode = 'KONVEN_SYARIAH';
    if (this.pageType == "add") {
      this.httpClient.post(this.officeClassUrl, this.refMasterCgType).subscribe(
        (response) => {
          console.log(response);
          this.allCgType = response['returnObject'];
          //this.mrCgType = response['returnObject'][0]['masterCode'];
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.officeClassUrl, this.refMasterObj).subscribe(
        (response) => {
          this.allOfficeClass = response['ReturnObject'];
          this.mrOfficeClass = response['ReturnObject'][0]['Key'];
        },
        (error) => {
          console.log(error);
        })
        this.httpClient.post(this.konSyaUrl, this.refMasterKonsyaType).subscribe(
          (response) => {
            this.allKonSya = response['ReturnObject'];
            this.mrKonvenSyariah = response['ReturnObject'][0]['Key'];
          },
          (error) => {
            console.log(error);
          })
      this.httpClient.post(this.officeClassUrl, this.refMasterOfficeType).subscribe(
        (response) => {
          this.allOfficeType = response['ReturnObject'];
          this.mrOfficeType = response['ReturnObject'][0]['Key'];
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.refOrgUrl, null).subscribe(
        (response) => {
          this.allRefOrg = response['returnObject'];
          this.refOrgId = response['returnObject'][0]['refOrgId'];
          this.onChangeRefOrg(this.refOrgId);
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.areaUrl, null).subscribe(
        (response) => {
          this.allRefOfficeArea = response['returnObject'];
          this.refOfficeAreaId = response['returnObject'][0]['refOfficeAreaId'];
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.holidaySchmUrl, null).subscribe(
        (response) => {
          console.log(response);
          this.allHolidaySchm = response['ReturnObject'];
          this.holidaySchmHId = response['ReturnObject'][0]['Key'];
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
        (response) => {
          this.allWorkingHourSchm = response['ReturnObject'];
          this.workingHourSchmHId = response['ReturnObject'][0]['Key'];
        },
        (error) => {
          console.log(error);
        })
    } else if (this.pageType == "edit") {
      this.refMasterObj = new RefMasterObj();
      // this.refMasterObj.refMasterTypeCode = 'OFFICE_CLASS';
      this.refMasterOfficeType = new RefMasterObj();
      // this.refMasterOfficeType.refMasterTypeCode = 'OFFICE_TYPE';
      this.officeObj = new OfficeObj();
      this.officeObj.refOfficeId = this.refOfficeId
      this.httpClient.post(this.apiUrl, this.officeObj).subscribe(
        (response) => {
          this.resultData = response['returnObject'];
          console.log(this.resultData);
          this.officeCode = response['returnObject']['officeCode'];
          this.officeName = response['returnObject']['officeName'];
          this.officeShortName = response['returnObject']['officeShortName'];
          this.mrOfficeClass = response['returnObject']['mrOfficeClass'];
          this.mrOfficeType = response['returnObject']['mrOfficeType'];
          this.refOrgId = response['returnObject']['refOrgId'];
          this.orgMdlId = response['returnObject']['orgMdlId'];
          this.refOfficeAreaId = response['returnObject']['refOfficeAreaId'];
          this.holidaySchmHId = response['returnObject']['holidaySchmHId'];
          this.workingHourSchmHId = response['returnObject']['workingHourSchmHId'];
          this.parentId = response['returnObject']['parentId']

          if (this.resultData.isAllowAppCreated == "1") {
            this.isAllowAppCreated = true;
          }
          else {
            this.isAllowAppCreated = false;
          }
          if (this.resultData.isActive == "1") {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }
          this.mrKonvenSyariah = response['returnObject']['mrKonvenSyariah'];

          this.ucAddr.setData(this.resultData);
          this.ucContact.setData(this.resultData);
          var orgMdlObj = new OrgMdlObj();
          this.httpClient.post(this.officeClassUrl, this.refMasterObj).subscribe(
            (response) => {
              this.allOfficeClass = response['returnObject'];
            },
            (error) => {
              console.log(error);
            })
            this.httpClient.post(this.officeClassUrl, this.refMasterOfficeType).subscribe(
              (response) => {
                this.allOfficeType = response['returnObject'];
              },
              (error) => {
                console.log(error);
              })
          this.httpClient.post(this.refOrgUrl, null).subscribe(
            (response) => {
              this.allRefOrg = response['returnObject'];
              this.onChangeRefOrg(this.refOrgId, true);
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.areaUrl, null).subscribe(
            (response) => {
              this.allRefOfficeArea = response['returnObject'];
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.holidaySchmUrl, null).subscribe(
            (response) => {
              this.allHolidaySchm = response['returnObject'];

              var notEmpty = false;
              for (var i = 0; i < response["returnObject"].length; i++) {
                if (this.holidaySchmHId == response["returnObject"][i].holidaySchmHId) {
                  notEmpty = true;
                }
              }
              if (notEmpty != true) {
                this.holidaySchmHId = response['returnObject'][0]['holidaySchmHId'];
              }
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
            (response) => {
              this.allWorkingHourSchm = response['returnObject'];

              var notEmpty = false;
              for (var i = 0; i < response["returnObject"].length; i++) {
                if (this.workingHourSchmHId == response["returnObject"][i].workingHourSchmHId) {
                  notEmpty = true;
                }
              }
              if (notEmpty != true) {
                this.workingHourSchmHId = response['returnObject'][0]['workingHourSchmHId'];
              }
            },
            (error) => {
              console.log(error);
            })

          orgMdlObj.refOrgId = this.refOrgId
          this.httpClient.post(this.officeParentUrl, orgMdlObj).subscribe(
            (response) => {
              this.allOfficeParent = response['returnObject'];
            },
            (error) => {
              console.log(error);
            })

        })
    }
  }

  onChangeGrpType(value)
  {
    console.log(value.key);
    console.log(value.value);
  }

  SaveForm(OfficeAddReqForm: NgForm, ucAddress, ucContactInfo,mrCgType): void {
    console.log(mrCgType);
    this.officeObj = new OfficeObj();
    this.officeObj.refOfficeId = OfficeAddReqForm.value.refOfficeId;
    this.officeObj.officeCode = OfficeAddReqForm.value.officeCode;
    this.officeObj.officeShortName = OfficeAddReqForm.value.officeShortName;
    this.officeObj.officeName = OfficeAddReqForm.value.officeName;
    this.officeObj.orgMdlId = OfficeAddReqForm.value.orgMdlId;
    this.officeObj.officeAddr = ucAddress.addr;
    this.officeObj.areaCode4 = ucAddress.areaCode4;
    this.officeObj.areaCode3 = ucAddress.areaCode3;
    this.officeObj.areaCode2 = ucAddress.areaCode2;
    this.officeObj.areaCode1 = ucAddress.areaCode1;
    this.officeObj.city = ucAddress.city;
    this.officeObj.zipcodeNumber = ucAddress.zipcodeNumber;
    this.officeObj.phnArea1 = ucAddress.phnArea1;
    this.officeObj.phn1 = ucAddress.phn1;
    this.officeObj.phnArea2 = ucAddress.phnArea2;
    this.officeObj.phn2 = ucAddress.phn2;
    this.officeObj.faxArea = ucAddress.faxArea;
    this.officeObj.fax = ucAddress.fax;
    this.officeObj.cntctPersonName = ucContactInfo.cntctPersonName;
    this.officeObj.cntctPersonJobTitle = ucContactInfo.cntctPersonJobTitle;
    this.officeObj.cntctPersonMobilePhn1 = ucContactInfo.mobilePhn1;
    this.officeObj.cntctPersonMobilePhn2 = ucContactInfo.mobilePhn2;
    this.officeObj.mrOfficeClass = OfficeAddReqForm.value.mrOfficeClass;
    this.officeObj.refOfficeAreaId = OfficeAddReqForm.value.refOfficeAreaId;
    this.officeObj.isActive = OfficeAddReqForm.value.isActive;
    this.officeObj.parentId = OfficeAddReqForm.value.parentId;
    this.officeObj.isOfficeClose = '0';
    this.officeObj.officeOpeningDt = OfficeAddReqForm.value.officeOpeningDt;
    this.officeObj.isAllowAppCreated = OfficeAddReqForm.value.isAllowAppCreated;
    this.officeObj.holidaySchmHId = OfficeAddReqForm.value.holidaySchmHId;
    this.officeObj.cntctPersonEmail1 = ucContactInfo.email1;
    this.officeObj.phnArea3 = ucAddress.phnArea3;
    this.officeObj.phn3 = ucAddress.phn3;
    this.officeObj.cntctPersonEmail2 = ucContactInfo.email2;
    this.officeObj.workingHourSchmHId = OfficeAddReqForm.value.workingHourSchmHId;
    this.officeObj.isVirtualOffice = '0'
    this.officeObj.mrKonvenSyariah = OfficeAddReqForm.value.mrKonvenSyariah;
    this.officeObj.mrOfficeType = OfficeAddReqForm.value.mrOfficeType;
    this.officeObj.centerGrpTypeCode = OfficeAddReqForm.value.mrCgType;
    var temp = this.allCgType.find(x => x.masterCode==OfficeAddReqForm.value.mrCgType);
    console.log(temp);
    this.officeObj.centerGrpTypeName = temp.descr;

    if (this.isAllowAppCreated == false) {
      this.officeObj.isAllowAppCreated = "0";
    }
    else {
      this.officeObj.isAllowAppCreated = "1";
    }
    if (this.isActive == false) {
      this.officeObj.isActive = "0";
    }
    else {
      this.officeObj.isActive = "1";
    }

    if (this.pageType == "add") {
      this.httpClient.post(this.addUrl, this.officeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/office/paging"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.officeObj.refOfficeId = this.refOfficeId;
      this.httpClient.post(this.editUrl, this.officeObj).subscribe(
        (response) => {
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/office/paging"]);
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
    console.log(this.test);
  }

  toggleAllowAppCreated(e) {
    this.isAllowAppCreated = e.target.checked;
  }

  onChangeRefOrg(refOrgValue, edit: boolean = false) {
    for (var i = 0; i < this.allRefOrg.length; i++) {
      if (refOrgValue == this.allRefOrg[i].refOrgId) {
        this.hierarchyNo = this.allRefOrg[i].hierarchyNo;
        console.log(this.hierarchyNo);
        if (this.hierarchyNo == 1) {
          this.isHO = true;
        } else {
          this.isHO = false;
          this.isDisabledState = false;
        }
      }
    }

    this.orgMdlObj = new OrgMdlObj();
    this.orgMdlObj.refOrgId = refOrgValue
    this.httpClient.post(this.orgMdlUrl, this.orgMdlObj).subscribe(
      (response) => {
        this.allOrgMdl = response['returnObject'];
        if (edit == false) {
          this.orgMdlId = response['returnObject'][0]['orgMdlId'];
        }
      },
      (error) => {
        console.log(error);
      })
    this.httpClient.post(this.officeParentUrl, this.orgMdlObj).subscribe(
      (response) => {
        this.allOfficeParent = response['returnObject'];
        if (response['returnObject']['length'] != 0) {
          if (edit == false) {
            this.parentId = response['returnObject'][0]['refOfficeId'];
            this.onChangeOfficeParent(response['returnObject'][0]['refOfficeId']);
          } else {
            this.onChangeOfficeParent(this.parentId);
          }
        }
      },
      (error) => {
        console.log(error);
      })
  }

  onChangeOfficeParent(officeParentValue) {
    if (this.hierarchyNo > 2) {
      for (var i = 0; i < this.allOfficeParent.length; i++) {
        if (officeParentValue == this.allOfficeParent[i].refOfficeId) {
          this.mrKonvenSyariah = this.allOfficeParent[i].mrKonvenSyariah;
          this.isDisabledState = true;
        }
      }
    }
  }
}
