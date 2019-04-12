import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { CoyBodObj } from 'app/shared/model/CoyBodObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { NgForm } from '@angular/forms';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';

@Component({
    selector: 'add-bod',
    templateUrl: './add-bod.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})

export class BodAddComponent implements OnInit {

    @ViewChild(UcAddressComponent) ucAddr;
    @ViewChild(UcContactInfoComponent) ucContact;
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
    foundationUrl: string = environment.foundationUrl;
    editUrl: any;
    idType: any;
    name: any;
    jobTitle: any;
    npwp: any;
    idNo: any;
    refCoyId: any;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["coyBodId"];
            this.refCoyId = params["refCoyId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.idTypeUrl = this.foundationUrl + AdInsConstant.GetRefMasterList;
        var refMasterObj = new RefMasterObj();
        refMasterObj.refMasterTypeCode = "ID_TYPE";
        this.http.post(this.idTypeUrl, refMasterObj).subscribe(
            (response) => {
                this.itemIdType = response["returnObject"];
                this.idType = this.itemIdType[0].masterCode;
            }
        );
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetCoyBod;
            var coyBodObj = new CoyBodObj();
            coyBodObj.coyBodId = this.param;
            this.http.post(this.apiUrl, coyBodObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    this.result = response['returnObject'];
                    this.ucAddr.setData(this.result);
                    this.ucContact.setData(this.result);
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
        this.npwp = data.npwp;
        this.idNo = data.idNo;
        if (this.result.isActive == "1") {
            this.isActive = true;
        }
        else {
            this.isActive = false;
        }
    }

    Save(form, ucAddress, ucContactInfo) {
            var coyAdd = new CoyBodObj();
            console.log(ucAddress);
            console.log(ucContactInfo);
            coyAdd.name = form.value.name;
            coyAdd.jobTitle = form.value.jobTitle;
            coyAdd.npwp = form.value.npwp;
            coyAdd.mrIdType = form.value.mrIdType;
            coyAdd.idNo = form.value.idNo;
            coyAdd.addr = ucAddress.addr;
            coyAdd.city = ucAddress.city;
            coyAdd.email1 = ucContactInfo.email1;
            coyAdd.email2 = ucContactInfo.email2;
            coyAdd.fax = ucAddress.fax;
            coyAdd.faxArea = ucAddress.faxArea;
            coyAdd.kecamatan = ucAddress.kecamatan;
            coyAdd.kelurahan = ucAddress.kelurahan;
            coyAdd.mobilePhn1 = ucContactInfo.mobilePhn1;
            coyAdd.mobilePhn2 = ucContactInfo.mobilePhn2;
            coyAdd.phn1 = ucAddress.phn1;
            coyAdd.phn2 = ucAddress.phn2;
            coyAdd.phn3 = ucAddress.phn3;
            coyAdd.phnArea1 = ucAddress.phnArea1;
            coyAdd.phnArea2 = ucAddress.phnArea2;
            coyAdd.phnArea3 = ucAddress.phnArea3;
            coyAdd.phnExt1 = ucAddress.phnExt1;
            coyAdd.phnExt2 = ucAddress.phnExt2;
            coyAdd.phnExt3 = ucAddress.phnExt3;
            coyAdd.rt = ucAddress.rt;
            coyAdd.rw = ucAddress.rw;
            coyAdd.zipcode = ucAddress.zipcode;
            coyAdd.refCoyId = this.refCoyId;

            console.log(coyAdd);
            if (this.mode === "edit") {
                this.editUrl = this.foundationUrl + AdInsConstant.EditCoyBod;
                coyAdd.coyBodId = this.param;
                this.http.post(this.editUrl, coyAdd).subscribe(
                    (response) => {
                        console.log(response);
                        this.router.navigateByUrl('/company/bod?refCoyId' + this.refCoyId);
                    },
                    (error) => {
                        console.log(error);
                    });
            }
            else {
                this.editUrl = this.foundationUrl + AdInsConstant.AddCoyBod;
                this.http.post(this.editUrl, coyAdd).subscribe(
                    (response) => {
                        console.log(response);
                        this.router.navigateByUrl('/company/bod?refCoyId' + this.refCoyId);
                    },
                    (error) => {
                        console.log(error);
                    });
            }

    }

}
