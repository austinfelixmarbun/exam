import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/RefZipcodeObj.Model';
import { RefProvDistrictObj } from 'app/shared/model/RefProvDistrictObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'add-bank',
    templateUrl: './add-zipcode.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})
export class ZipcodeAddComponent implements OnInit {

    param: string;

    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    isActive: boolean = false;
    foundationUrl: string = environment.foundationUrl;
    zipcodeObj: RefZipcodeObj;
    editUrl: any;
    districtName : string;
    idSelect: string;
    jsonSelect: string;
    provDistrictObj : RefProvDistrictObj;
    urlGetProvDistrict : string;

    constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refZipcodeId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefZipCode;
            this.urlGetProvDistrict = this.foundationUrl + AdInsConstant.GetRefProvDistrictObj;
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
                            this.districtName = response["returnObject"].name;
                            this.jsonSelect = response["returnObject"];
                            this.idSelect = response["returnObject"].refProvDistrictId;
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
            this.editUrl = this.foundationUrl + AdInsConstant.EditRefBank;
            this.zipcodeObj = new RefZipcodeObj();
            this.zipcodeObj = ZipcodeAddReqForm.value;
            this.zipcodeObj.refProvDistrictId = uclZipcode.idSelect;
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
                    this.router.navigateByUrl('/zipcode');
                },
                (error)=>
                {
                    console.log(error);
                });
        }
        else
        {
            this.editUrl = this.foundationUrl + AdInsConstant.AddRefBank;
            this.zipcodeObj = new RefZipcodeObj();
            this.zipcodeObj = ZipcodeAddReqForm.value;
            this.zipcodeObj.refProvDistrictId = uclZipcode.idSelect;
            this.zipcodeObj.refZipcodeId = "0";
            console.log("object = ");
            console.log(this.zipcodeObj);
            if (this.isActive === false) {
                this.zipcodeObj.isActive = "0";
            }
            else {
                this.zipcodeObj.isActive = "1";
            }
            this.http.post(this.editUrl, this.zipcodeObj).subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/zipcode');
                },
                (error)=>
                {
                    console.log(error);
                });
        }
    }

    toggleVisibility(e){
        this.isActive= e.target.checked;
      }
}
