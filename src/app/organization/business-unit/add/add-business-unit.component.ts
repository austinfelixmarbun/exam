import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitObj } from 'app/shared/model/BusinessUnitObj.Model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'add-app-business-unit',
    templateUrl: './add-business-unit.component.html',
    providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})

export class AddBusinessUnitComponent implements OnInit {

    bizUnitObj : BusinessUnitObj;
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
    editUrl: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        private spinner: NgxSpinnerService,
        private toastr: NGXToastrService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refBizUnitId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefBizUnit;
            var bizUnitObj = new BusinessUnitObj();
            bizUnitObj.RefBizUnitId = this.param;
            this.http.post(this.apiUrl, bizUnitObj).subscribe(
                (response) => {
                    console.log("Success");
                    this.result = response["returnObject"];
                    if (this.result.isActive == "1") {
                        this.isActive = true;
                    }
                    else {
                        this.isActive = false;
                    }
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                }
            );
        }
    }

    Save(BusinessUnitAddReqForm: NgForm): void {
        if (this.mode === "edit") {
            this.editUrl = this.foundationUrl + AdInsConstant.EditRefBizUnit;
            this.bizUnitObj = new BusinessUnitObj();
            this.bizUnitObj = BusinessUnitAddReqForm.value;
            this.bizUnitObj.RefBizUnitId = this.param;
            if (this.isActive === false) {
                this.bizUnitObj.IsActive = "0";
            }
            else {
                this.bizUnitObj.IsActive = "1";
            }
            this.http.post(this.editUrl, this.bizUnitObj).subscribe(
                (response) => {
                    console.log(response);
                    this.toastr.successMessage(response["message"]);
                    this.router.navigateByUrl('/organization/businessunit');
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.editUrl = this.foundationUrl + AdInsConstant.AddRefBizUnit;
            this.bizUnitObj = new BusinessUnitObj();
            this.bizUnitObj = BusinessUnitAddReqForm.value;
            this.bizUnitObj.RefBizUnitId = "0";
            if (this.isActive === false) {
                this.bizUnitObj.IsActive = "0";
            }
            else {
                this.bizUnitObj.IsActive = "1";
            }
            this.http.post(this.editUrl, this.bizUnitObj).subscribe(
                (response) => {
                    this.toastr.successMessage(response["message"]);
                    this.router.navigateByUrl('/organization/businessunit');
                },
                (error) => {
                    console.log(error);
                });
        }
    }
    
    toggleActive(e) {
      this.isActive = e.target.checked;
    }
}
