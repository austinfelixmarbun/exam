import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { CoyBodObj } from 'app/shared/model/CoyBodObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcInfoComponent } from 'app/shared/UserControl/uc-info/uc-info.component';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
    selector: 'add-bod',
    templateUrl: './add-bod.component.html',
    providers: [NGXToastrService]
})

export class BodAddComponent implements OnInit {

    @ViewChild(UcAddressComponent) ucAddr;
    @ViewChild(UcInfoComponent) ucInfo;
    param: string;
    itemIdType: any;
    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    idTypeUrl: any;
    isActive: boolean = false;
    foundationUrl: string = environment.FoundationR3Url;
    settingUrl: string = environment.FoundationR3Url;
    editUrl: any;
    idType: any;
    name: any;
    jobTitle: any;
    taxIdNo: any;
    idNo: any;
    refCoyId: any;

    readonly CancelLink: string = NavigationConstant.COY_BOD;
    constructor(private router: Router, private toastr: NGXToastrService, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["coyBodId"];
            this.refCoyId = params["refCoyId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.idTypeUrl = this.settingUrl + URLConstant.GetRefMasterList;
        var refMasterObj = new RefMasterObj();
        // refMasterObj.refMasterTypeCode = "ID_TYPE";
        this.http.post(this.idTypeUrl, refMasterObj).subscribe(
            (response) => {
                this.itemIdType = response["returnObject"];
                this.idType = this.itemIdType[0].masterCode;
            }
        );
        if (this.mode == "edit") {
            this.apiUrl = this.foundationUrl + URLConstant.GetCoyBod;
            var coyBodObj = new CoyBodObj();
            coyBodObj.coyBodId = this.param;
            this.http.post(this.apiUrl, coyBodObj).subscribe(
                (response) => {
                    this.result = response['returnObject'];
                    this.ucAddr.setData(this.result);
                    this.ucInfo.setData(this.result);
                    this.setData(this.result);
                }
            );
        }
    }

    setData(data) {
        this.name = data.name;
        this.idType = data.mrIdType;
        this.jobTitle = data.jobTitle;
        this.taxIdNo = data.taxIdNo;
        this.idNo = data.idNo;
        if (this.result.isActive == CommonConstant.TRUE_CONDITION) {
            this.isActive = true;
        }
        else {
            this.isActive = false;
        }
    }

    Save(form, ucAddress, ucInfo) {
        var coyAdd = new CoyBodObj();
        coyAdd.name = form.value.name;
        coyAdd.jobTitle = form.value.jobTitle;
        coyAdd.taxIdNo = form.value.taxIdNo;
        coyAdd.mrIdType = form.value.mrIdType;
        coyAdd.idNo = form.value.idNo;
        coyAdd.addr = ucAddress.addr;
        coyAdd.city = ucAddress.city;
        coyAdd.email1 = ucInfo.email1;
        coyAdd.email2 = ucInfo.email2;
        coyAdd.fax = ucAddress.fax;
        coyAdd.faxArea = ucAddress.faxArea;
        coyAdd.areaCode1 = ucAddress.areaCode1;
        coyAdd.areaCode2 = ucAddress.areaCode2;
        coyAdd.mobilePhn1 = ucInfo.mobilePhn1;
        coyAdd.mobilePhn2 = ucInfo.mobilePhn2;
        coyAdd.phn1 = ucAddress.phn1;
        coyAdd.phn2 = ucAddress.phn2;
        coyAdd.phn3 = ucAddress.phn3;
        coyAdd.phnArea1 = ucAddress.phnArea1;
        coyAdd.phnArea2 = ucAddress.phnArea2;
        coyAdd.phnArea3 = ucAddress.phnArea3;
        coyAdd.phnExt1 = ucAddress.phnExt1;
        coyAdd.phnExt2 = ucAddress.phnExt2;
        coyAdd.phnExt3 = ucAddress.phnExt3;
        coyAdd.areaCode4 = ucAddress.areaCode4;
        coyAdd.areaCode3 = ucAddress.areaCode3;
        coyAdd.zipcodeNumber = ucAddress.zipcodeNumber;
        coyAdd.refCoyId = this.refCoyId;

        if (this.mode == "edit") {
            this.editUrl = this.foundationUrl + URLConstant.EditCoyBod;
            coyAdd.coyBodId = this.param;
            this.http.post(this.editUrl, coyAdd).subscribe(
                (response) => {
                    this.toastr.successMessage(response['message']);
                    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.COY_BOD],{ "refCoyId": this.refCoyId });
                });
        }
        else {
            this.editUrl = this.foundationUrl + URLConstant.AddCoyBod;
            this.http.post(this.editUrl, coyAdd).subscribe(
                (response) => {
                    this.toastr.successMessage(response['message']);
                    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.COY_BOD],{ "refCoyId": this.refCoyId });
                });
        }
    }
}
