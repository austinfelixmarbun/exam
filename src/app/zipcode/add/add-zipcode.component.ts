import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/RefZipcodeObj.Model';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { LookupdistrictComponent } from '@adins/lookupdistrict';


@Component({
    selector: 'add-bank',
    templateUrl: './add-zipcode.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})
export class ZipcodeAddComponent implements OnInit {
    @ViewChild(LookupdistrictComponent) lookupDistrict;
    param: string;
    inputLookupObj: any;

    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    isActive: boolean = false;
    settingUrl: string = environment.settingUrl;
    zipcodeObj: RefZipcodeObj;
    editUrl: any;
    districtName: string;
    idSelect: string;
    jsonSelect: string;
    provDistrictObj: RefProvDistrictObj;
    urlGetProvDistrict: string;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refZipcodeId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.inputLookupObj = new InputLookupObj();
        this.inputLookupObj.urlJson = "./assets/lookup/lookupDistrict.json";
        this.inputLookupObj.urlQryPaging = AdInsConstant.GetRefProvDistrictPaging;
        this.inputLookupObj.urlEnviPaging = environment.settingUrl;

        if (this.mode === "edit") {
            this.apiUrl = this.settingUrl + AdInsConstant.GetRefZipCode;
            this.urlGetProvDistrict = this.settingUrl + AdInsConstant.GetRefProvDistrictObj;
            var zipcodeObj = new RefZipcodeObj();
            this.provDistrictObj = new RefProvDistrictObj();
            zipcodeObj.refZipcodeId = this.param;
            this.http.post(this.apiUrl, zipcodeObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    this.result = response['returnObject'];
                    console.log(this.result);
                    if (this.result.isActive == "1") {
                        this.isActive = true;
                    }
                    else {
                        this.isActive = false;
                    }
                    this.provDistrictObj.refProvDistrictId = this.result.refProvDistrictId;
                    this.http.post(this.urlGetProvDistrict, this.provDistrictObj).subscribe(
                        (response) => {
                            console.log(response);
                            this.inputLookupObj.nameSelect = response["returnObject"].name;
                            this.inputLookupObj.jsonSelect = response["returnObject"];
                            this.inputLookupObj.idSelect = response["returnObject"].refProvDistrictId;
                            this.lookupDistrict.msNewCatalogId = response["returnObject"].name;
                        })
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                }
            );
        }
    }
    Save(ZipcodeAddReqForm: NgForm, uclZipcode): void {
        console.log(uclZipcode);
        console.log(ZipcodeAddReqForm);
        if (this.mode === "edit") {
            this.editUrl = this.settingUrl + AdInsConstant.EditRefZipcode;
            this.zipcodeObj = new RefZipcodeObj();
            this.zipcodeObj = ZipcodeAddReqForm.value;
            this.zipcodeObj.refProvDistrictId = uclZipcode.lookupInput.idSelect;
            this.zipcodeObj.refZipcodeId = this.param;
            if (this.isActive === false) {
                this.zipcodeObj.isActive = "0";
            }
            else {
                this.zipcodeObj.isActive = "1";
            }
            this.http.post(this.editUrl, this.zipcodeObj).subscribe(
                (response) => {
                    console.log(response);
                    this.toastr.successMessage(response["message"]);
                    this.router.navigateByUrl('/zipcode/paging');
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.editUrl = this.settingUrl + AdInsConstant.AddRefZipcode;
            this.zipcodeObj = new RefZipcodeObj();
            this.zipcodeObj = ZipcodeAddReqForm.value;
            this.zipcodeObj.refProvDistrictId = uclZipcode.lookupInput.idSelect;
            this.zipcodeObj.refZipcodeId = "0";
            if (this.isActive === false) {
                this.zipcodeObj.isActive = "0";
            }
            else {
                this.zipcodeObj.isActive = "1";
            }
            this.http.post(this.editUrl, this.zipcodeObj).subscribe(
                (response) => {
                    this.toastr.successMessage(response['message']);
                    this.router.navigateByUrl('/zipcode/paging');
                },
                (error) => {
                    console.log(error);
                });
        }
    }

    toggleVisibility(e) {
        this.isActive = e.target.checked;
    }
}
