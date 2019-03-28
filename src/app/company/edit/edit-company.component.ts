import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RefCoyObj } from 'app/shared/model/RefCoyObj.Model';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';

@Component({
  selector: 'edit-company',
  templateUrl: './edit-company.component.html',
  providers: [NgbPaginationConfig, NGXToastrService]
})
export class EditCompanyComponent implements OnInit {
    
    @ViewChild(UcAddressComponent) ucAddr;
    @ViewChild(UcContactInfoComponent) ucContact;
    param: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    foundationUrl: string = environment.foundationUrl;
    editUrl: any;
    coyCode: any;
    fullName : any;
    shortName : any;
    initialName : any;
    biCode : any;
    npwp: any;
    tdp: any;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refCoyId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefCoy;
            var refCoyObj = new RefCoyObj();
            refCoyObj.refCoyId = this.param;
            this.http.post(this.apiUrl, refCoyObj).subscribe(
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
        this.coyCode = data.coyCode;
        this.fullName = data.fullName;
        this.shortName = data.shortName;
        this.initialName = data.initialName;
        this.biCode = data.biCode;
        this.npwp = data.npwp;
        this.tdp = data.tdp;
    }

    Save(form, ucAddress, ucContactInfo) {
            var refCoyObj = new RefCoyObj();
            console.log(ucAddress);
            console.log(ucContactInfo);
            refCoyObj.coyCode = form.value.coyCode;
            refCoyObj.fullName = form.value.fullName;
            refCoyObj.shortName = form.value.shortName;
            refCoyObj.initialName = form.value.initialName;
            refCoyObj.biCode = form.value.biCode;
            refCoyObj.npwp = form.value.npwp;
            refCoyObj.tdp = form.value.tdp;
            refCoyObj.addr = ucAddress.addr;
            refCoyObj.city = ucAddress.city;
            refCoyObj.cntctPersonEmail = ucContactInfo.email1;
            refCoyObj.fax = ucAddress.fax;
            refCoyObj.faxArea = ucAddress.faxArea;
            refCoyObj.kecamatan = ucAddress.kecamatan;
            refCoyObj.kelurahan = ucAddress.kelurahan;
            refCoyObj.cntctPersonName = ucContactInfo.cntctPersonName;
            refCoyObj.cntctPersonJobTitle = ucContactInfo.cntctPersonJobTitle;
            refCoyObj.cntctPersonMobilePhn1 = ucContactInfo.mobilePhn1;
            refCoyObj.cntctPersonMobilePhn2 = ucContactInfo.mobilePhn2;
            refCoyObj.cntctPersonEmail = ucContactInfo.email1;
            refCoyObj.phn1 = ucAddress.phn1;
            refCoyObj.phn2 = ucAddress.phn2;
            refCoyObj.phn3 = ucAddress.phn3;
            refCoyObj.phnArea1 = ucAddress.phnArea1;
            refCoyObj.phnArea2 = ucAddress.phnArea2;
            refCoyObj.phnArea3 = ucAddress.phnArea3;
            refCoyObj.phnExt1 = ucAddress.phnExt1;
            refCoyObj.phnExt2 = ucAddress.phnExt2;
            refCoyObj.phnExt3 = ucAddress.phnExt3;
            refCoyObj.rt = ucAddress.rt;
            refCoyObj.rw = ucAddress.rw;
            refCoyObj.zipcode = ucAddress.zipcode;
            refCoyObj.refCoyId = this.param;

            console.log(refCoyObj);
            if (this.mode === "edit") {
                this.editUrl = this.foundationUrl + AdInsConstant.EditRefCoy;
                refCoyObj.refCoyId = this.param;
                this.http.post(this.editUrl, refCoyObj).subscribe(
                    (response) => {
                        console.log(response);
                        this.router.navigateByUrl('/company');
                    },
                    (error) => {
                        console.log(error);
                    });
            }
            else {
                this.editUrl = this.foundationUrl + AdInsConstant.AddCoyCommissioner;
                this.http.post(this.editUrl, refCoyObj).subscribe(
                    (response) => {
                        console.log(response);
                        this.router.navigateByUrl('/company');
                    },
                    (error) => {
                        console.log(error);
                    });
            }

    }
}
