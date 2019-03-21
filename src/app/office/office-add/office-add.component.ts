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

@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  styleUrls: ['./office-add.component.scss']
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
  apiUrl: any;
  officeClassUrl: any;
  refOrgUrl: any;
  orgMdlUrl: any;
  addEditUrl: any;
  areaUrl: any;
  officeParentUrl: any;
  holidaySchmUrl: any;
  workingHourSchmUrl: any;
  foundationUrl: string = environment.foundationUrl;
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  isVirtualOffice: any = 1;
  officeObj: OfficeObj;
  refMasterObj: RefMasterObj;
  orgMdlObj: OrgMdlObj

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.apiUrl = this.foundationUrl + AdInsConstant.getRefOfficeObj;
    this.officeClassUrl = this.foundationUrl + AdInsConstant.GetRefMasterList;
    this.refOrgUrl = this.foundationUrl + AdInsConstant.GetListAllRefOrg;
    this.orgMdlUrl = this.foundationUrl + AdInsConstant.GetAllActiveOrgMdlByRefOrgId;
    this.officeParentUrl = this.foundationUrl + AdInsConstant.GetListUpperHierarchyRefOfficeByRefOrgId;
    this.areaUrl = this.foundationUrl + AdInsConstant.GetAllListArea;
    this.holidaySchmUrl = this.foundationUrl + AdInsConstant.GetAllActiveHolidaySchmH;
    this.workingHourSchmUrl = this.foundationUrl + AdInsConstant.GetListOfWorkingHourSchm;

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
      var refOfficeObj = new RefOfficeObj();
      refOfficeObj.refOfficeId = this.refOfficeId;
      this.httpClient.post(this.apiUrl, refOfficeObj).subscribe(
        (response) => {
          console.log("Success");
          this.result = response['returnObject'];
          this.isActive = this.result.isActive;
          this.isVirtualOffice = this.result.isVirtualOffice;
          console.log(this.result);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  SaveForm(OfficeAddReqForm: NgForm): void {
    if (this.pageType === "edit") {
      this.addEditUrl = this.foundationUrl + AdInsConstant.EditRefBank;
      this.officeObj = new OfficeObj();
      this.officeObj = OfficeAddReqForm.value;
      this.officeObj.refOfficeId = this.refOfficeId;
      this.httpClient.post(this.addEditUrl, this.officeObj).subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/bank');
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.addEditUrl = this.foundationUrl + AdInsConstant.AddRefBank;
      this.officeObj = new OfficeObj();
      this.officeObj = OfficeAddReqForm.value;
      this.officeObj.refOfficeId = "0";
      this.httpClient.post(this.addEditUrl, this.officeObj).subscribe(
        (response) => {
          console.log(response);
          this.router.navigateByUrl('/bank');
        },
        (error) => {
          console.log(error);
        });
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
      },
      (error) => {
        console.log(error);
      })
  }
}
