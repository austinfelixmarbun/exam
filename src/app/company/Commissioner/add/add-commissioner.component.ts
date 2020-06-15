import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { CoyCommissionerObj } from 'app/shared/model/CoyCommissionerObj.Model';
import { UcInfoComponent } from 'app/shared/UserControl/uc-info/uc-info.component';

@Component({
    selector: 'add-commissioner',
    templateUrl: './add-commissioner.component.html',
    providers: [NGXToastrService]
})

export class CommissionerAddComponent implements OnInit {

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

    constructor(private router: Router, private toastr: NGXToastrService, private route: ActivatedRoute, private http: HttpClient) {
        this.route.queryParams.subscribe(params => {
            this.param = params["coyCommissionerId"];
            this.refCoyId = params["refCoyId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.idTypeUrl = this.settingUrl + AdInsConstant.GetRefMasterList;
        var refMasterObj = new RefMasterObj();
        // refMasterObj.refMasterTypeCode = "ID_TYPE";
        this.http.post(this.idTypeUrl, refMasterObj).subscribe(
            (response) => {
                this.itemIdType = response["returnObject"];
                this.idType = this.itemIdType[0].masterCode;
            }
        );
        if (this.mode == "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetCoyCommissioner;
            var coyCommissionerObj = new CoyCommissionerObj();
            coyCommissionerObj.coyCommissionerId = this.param;
            this.http.post(this.apiUrl, coyCommissionerObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    this.result = response['returnObject'];
                    this.ucAddr.setData(this.result);
                    this.ucInfo.setData(this.result);
                    this.setData(this.result);
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
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
        if (this.result.isActive == "1") {
            this.isActive = true;
        }
        else {
            this.isActive = false;
        }
    }

    Save(form, ucAddress, ucInfo) {
            var coyCommisionerObj = new CoyCommissionerObj();
            console.log(ucAddress);
            console.log(ucInfo);
            coyCommisionerObj.refCoyId = +this.refCoyId;
            coyCommisionerObj.name = form.value.name;
            coyCommisionerObj.jobTitle = form.value.jobTitle;
            coyCommisionerObj.taxIdNo = form.value.taxIdNo;
            coyCommisionerObj.mrIdType = form.value.mrIdType;
            coyCommisionerObj.idNo = form.value.idNo;
            coyCommisionerObj.addr = ucAddress.addr;
            coyCommisionerObj.city = ucAddress.city;
            coyCommisionerObj.email1 = ucInfo.email1;
            coyCommisionerObj.email2 = ucInfo.email2;
            coyCommisionerObj.fax = ucAddress.fax;
            coyCommisionerObj.faxArea = ucAddress.faxArea;
            coyCommisionerObj.areaCode1 = ucAddress.areaCode1;
            coyCommisionerObj.areaCode2 = ucAddress.areaCode2;
            coyCommisionerObj.mobilePhn1 = ucInfo.mobilePhn1;
            coyCommisionerObj.mobilePhn2 = ucInfo.mobilePhn2;
            coyCommisionerObj.phn1 = ucAddress.phn1;
            coyCommisionerObj.phn2 = ucAddress.phn2;
            coyCommisionerObj.phn3 = ucAddress.phn3;
            coyCommisionerObj.phnArea1 = ucAddress.phnArea1;
            coyCommisionerObj.phnArea2 = ucAddress.phnArea2;
            coyCommisionerObj.phnArea3 = ucAddress.phnArea3;
            coyCommisionerObj.phnExt1 = ucAddress.phnExt1;
            coyCommisionerObj.phnExt2 = ucAddress.phnExt2;
            coyCommisionerObj.phnExt3 = ucAddress.phnExt3;
            coyCommisionerObj.areaCode4 = ucAddress.areaCode4;
            coyCommisionerObj.areaCode3 = ucAddress.areaCode3;
            coyCommisionerObj.zipcodeNumber = ucAddress.zipcodeNumber;
            coyCommisionerObj.refCoyId = this.refCoyId;

            console.log(coyCommisionerObj);
            if (this.mode == "edit") {
                this.editUrl = this.foundationUrl + AdInsConstant.EditCoyCommissioner;
                coyCommisionerObj.coyCommissionerId = this.param;
                this.http.post(this.editUrl, coyCommisionerObj).subscribe(
                    (response) => {
                        console.log(response);
                        this.toastr.successMessage(response['message']);
                        this.router.navigateByUrl('/company/commissioner?refCoyId=' + this.refCoyId);
                    },
                    (error) => {
                        console.log(error);
                    });
            }
            else {
                this.editUrl = this.foundationUrl + AdInsConstant.AddCoyCommissioner;
                this.http.post(this.editUrl, coyCommisionerObj).subscribe(
                    (response) => {
                        console.log(response);
                        this.toastr.successMessage(response['message']);
                        this.router.navigateByUrl('/company/commissioner?refCoyId=' + this.refCoyId);
                    },
                    (error) => {
                        console.log(error);
                    });
            }

    }

}
