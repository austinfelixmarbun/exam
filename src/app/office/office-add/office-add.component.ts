import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss'],
  providers: [NGXToastrService]
})
export class OfficeAddComponent implements OnInit {

  pageType: string = "add";
  mrKonvenSyariah = 'KON';
  isDisabledState: boolean = false;
  result: any;
  refOfficeId: any;
  allOfficeClass: any;
  allRefOrg: any;
  allOrgMdl: any;
  allOfficeParent: any;
  allRefOfficeArea: any;
  allHolidaySchm: any;
  allWorkingHourSchm: any;
  mrOfficeClass: any;
  refOrgId: any;
  orgMdlId: any;
  parentId: any;
  refOfficeAreaId: any = '';
  holidaySchmHId: any;
  workingHourSchmHId: any;
  hierarchyNo: any;
  apiUrl: any;
  addUrl: any;
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
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  officeObj: OfficeObj;
  refMasterObj: RefMasterObj;
  orgMdlObj: OrgMdlObj

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.getRefOfficeObj;
    this.addUrl = this.foundationUrl + AdInsConstant.AddRefOffice;
    this.officeClassUrl = this.foundationUrl + AdInsConstant.GetRefMasterList;
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
        // this.refOfficeAreaId = response['returnObject'][0]['refOfficeAreaId'];
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
    if (this.pageType == "edit") {

    }
  }

  SaveForm(OfficeAddReqForm: NgForm): void {
    if (this.pageType === "add") {
      this.officeObj = new OfficeObj();
      this.officeObj = OfficeAddReqForm.value;
      this.officeObj.cntctPersonEmail1 = 'test.test@test.com'
      this.officeObj.cntctPersonJobTitle = 'test'
      this.officeObj.cntctPersonMobilePhn1 = '123'
      this.officeObj.isOfficeClose = '0'
      this.officeObj.kecamatan = 'test'
      this.officeObj.kelurahan = 'test'
      this.officeObj.zipcode = '0'
      this.officeObj.rt = '0'
      this.officeObj.rw = '0'
      this.officeObj.officeAddr = 'test'
      this.officeObj.rw = '0'
      this.officeObj.phn1 = '0'
      this.officeObj.phnArea1 = '0'
      this.officeObj.phnArea1 = '0'
      this.officeObj.phn1 = '0'

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
      console.log(JSON.stringify(this.officeObj))
      console.log(this.officeObj);
      this.httpClient.post(this.addUrl, this.officeObj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['message']);
          // this.router.navigate(["/employee"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );

    }
    else {
      
    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
  }

  toggleAllowAppCreated(e) {
    this.isAllowAppCreated = e.target.checked;
  }

  onChangeRefOrg(refOrgValue) {
    this.orgMdlObj = new OrgMdlObj();
    this.orgMdlObj.refOrgId = refOrgValue
    this.httpClient.post(this.orgMdlUrl, this.orgMdlObj).subscribe(
      (response) => {
        this.allOrgMdl = response['returnObject'];
        this.orgMdlId = response['returnObject'][0]['orgMdlId'];
      },
      (error) => {
        console.log(error);
      })
    this.httpClient.post(this.officeParentUrl, this.orgMdlObj).subscribe(
      (response) => {
        this.allOfficeParent = response['returnObject'];
        if (response['returnObject']['length'] != 0) {
          this.parentId = response['returnObject'][0]['refOfficeId'];
        }
        if (response['returnObject']['length'] != 0) {
          this.httpClient.post(this.getRefOrgUrl, this.orgMdlObj).subscribe(
            (response) => {
              // this.allOrgMdl = response['returnObject'];
              this.hierarchyNo = response['returnObject']['hierarchyNo'];
              if (this.hierarchyNo <= 2) {
                this.mrKonvenSyariah = 'KON';
                this.isDisabledState = false;
              }else {
                this.isDisabledState = true;
              }
            },
            (error) => {
              console.log(error);
            })
        }else {
          this.mrKonvenSyariah = 'KON';
          this.isDisabledState = false;
        }
      },
      (error) => {
        console.log(error);
      })
  }
}
