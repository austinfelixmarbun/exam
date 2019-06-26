import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/OfficeObj.model';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { OrgMdlObj } from 'app/shared/model/OrgMdlObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';

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
  refOfficeId: any;
  allOfficeClass: any;
  allRefOrg: any;
  allOrgMdl: any;
  allOfficeParent: any;
  allRefOfficeArea: any;
  allHolidaySchm: any;
  allWorkingHourSchm: any;
  allRefTaxOffice: any;
  mrOfficeClass: any;
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
  settingUrl: string = environment.settingUrl;
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  officeObj: OfficeObj;
  refMasterObj: RefMasterObj;
  orgMdlObj: OrgMdlObj

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefOfficeObj;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefOffice;
    this.editUrl = this.foundationUrl + AdInsConstant.EditRefOffice;
    this.officeClassUrl = this.settingUrl + AdInsConstant.GetRefMasterList;
    this.refOrgUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    this.orgMdlUrl = this.foundationUrl + AdInsConstant.GetAllActiveOrgMdlByRefOrgId;
    this.officeParentUrl = this.foundationUrl + AdInsConstant.GetListUpperHierarchyRefOfficeByRefOrgId;
    this.areaUrl = this.foundationUrl + AdInsConstant.GetAllListArea;
    this.holidaySchmUrl = this.foundationUrl + AdInsConstant.GetAllActiveHolidaySchmH;
    this.workingHourSchmUrl = this.foundationUrl + AdInsConstant.GetListOfWorkingHourSchm;
    this.getRefOrgUrl = this.foundationUrl + AdInsConstant.GetRefOrg;

    this.route.queryParams.subscribe(params => {
      if (params['param'] != null) {
        this.pageType = params['param'];
      }
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
      console.log(this.pageType);
      console.log(this.refOfficeId);
    });
  }

  ngOnInit() {
    this.refMasterObj = new RefMasterObj();
    this.refMasterObj.refMasterTypeCode = 'OFFICE_CLASS';
    if (this.pageType == "add") {
      this.httpClient.post(this.officeClassUrl, this.refMasterObj).subscribe(
        (response) => {
          this.allOfficeClass = response['returnObject'];
          this.mrOfficeClass = response['returnObject'][0]['masterCode'];
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
          this.allHolidaySchm = response['returnObject'];
          this.holidaySchmHId = response['returnObject'][0]['holidaySchmHId'];
        },
        (error) => {
          console.log(error);
        })
      this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
        (response) => {
          this.allWorkingHourSchm = response['returnObject'];
          this.workingHourSchmHId = response['returnObject'][0]['workingHourSchmHId'];
        },
        (error) => {
          console.log(error);
        })
    } else if (this.pageType == "edit") {
      this.officeObj = new OfficeObj();
      this.officeObj.refOfficeId = this.refOfficeId
      this.httpClient.post(this.apiUrl, this.officeObj).subscribe(
        (response) => {
          this.resultData = response['returnObject'];
          console.log(this.resultData);
          this.officeCode = response['returnObject']['officeCode']
          this.officeName = response['returnObject']['officeName']
          this.officeShortName = response['returnObject']['officeShortName']
          this.mrOfficeClass = response['returnObject']['mrOfficeClass']
          this.refOrgId = response['returnObject']['refOrgId']
          this.orgMdlId = response['returnObject']['orgMdlId']
          this.refOfficeAreaId = response['returnObject']['refOfficeAreaId']
          this.holidaySchmHId = response['returnObject']['holidaySchmHId']
          this.workingHourSchmHId = response['returnObject']['workingHourSchmHId']
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
          this.mrKonvenSyariah = response['returnObject']['mrKonvenSyariah']
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
            },
            (error) => {
              console.log(error);
            })
          this.httpClient.post(this.workingHourSchmUrl, null).subscribe(
            (response) => {
              this.allWorkingHourSchm = response['returnObject'];
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
                console.log(error + ' Parent 1');
              })

        })
    }
  }

  SaveForm(OfficeAddReqForm: NgForm, ucAddress, ucContactInfo): void {
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
    this.officeObj.zipcode = ucAddress.zipcode;
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

    if (this.isAllowAppCreated === false) {
      this.officeObj.isAllowAppCreated = "0";
    }
    else {
      this.officeObj.isAllowAppCreated = "1";
    }
    if (this.isActive === false) {
      this.officeObj.isActive = "0";
    }
    else {
      this.officeObj.isActive = "1";
    }

    if (this.pageType === "add") {
      console.log(JSON.stringify(this.officeObj))
      console.log(this.officeObj);
      this.httpClient.post(this.addUrl, this.officeObj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/office/paging"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
    else {
      this.officeObj.refOfficeId = this.refOfficeId;
      console.log(JSON.stringify(this.officeObj))
      console.log(this.officeObj);
      this.httpClient.post(this.editUrl, this.officeObj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/office/paging"]);
        },
        (error) => {
          console.log("Error");
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
          }
        }
        if (response['returnObject']['length'] != 0) {
          this.httpClient.post(this.getRefOrgUrl, this.orgMdlObj).subscribe(
            (response) => {
              // this.allOrgMdl = response['returnObject'];
              this.hierarchyNo = response['returnObject']['hierarchyNo'];
              if (this.hierarchyNo <= 2) {
                this.mrKonvenSyariah = 'KON';
                this.isDisabledState = false;
              } else {
                this.isDisabledState = true;
              }
            },
            (error) => {
              console.log(error);
            })
        } else {
          this.mrKonvenSyariah = 'KON';
          this.isDisabledState = false;
        }
      },
      (error) => {
        console.log(error + ' Parent 2');
      })
  }
}
