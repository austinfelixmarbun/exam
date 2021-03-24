import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitObj } from 'app/shared/model/BusinessUnitObj.Model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
    selector: 'add-app-business-unit',
    templateUrl: './add-business-unit.component.html',
    providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})

export class AddBusinessUnitComponent implements OnInit {
    bizUnitObj: BusinessUnitObj;
    RefBizUnitId: string;
    pageType: any;
    result: any;
    title: string;
    mode: string = "add";
    apiUrl: any;
    isActive: boolean = true;
    foundationUrl: string = environment.FoundationR3Url;
    editUrl: any;

    readonly CancelLink: string = NavigationConstant.ORG_BZ_UNIT;
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
        this.route.queryParams.subscribe(params => {
            this.RefBizUnitId = params["RefBizUnitId"];
            this.mode = params["mode"];
        })
    }

    BizUnitForm = this.fb.group({
        BizUnitCode: ['', Validators.required],
        BizUnitName: ['', Validators.required],
        Descr: [''],
        IsActive: [true],
        RowVersion: ['']
    })

    ngOnInit() {
        this.title = "Business Unit Add";
        if (this.mode == "edit") {
            this.title = "Business Unit Edit";
            this.apiUrl = URLConstant.GetRefBizUnit;
            this.bizUnitObj = new BusinessUnitObj();
            this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;
            this.BizUnitForm.controls.BizUnitCode.disable();
            this.http.post(this.apiUrl, {Id : this.RefBizUnitId}).subscribe(
                (response) => {
                    this.result = response;
                    this.BizUnitForm.patchValue({
                        BizUnitCode: this.result.BizUnitCode,
                        BizUnitName: this.result.BizUnitName,
                        Descr: this.result.Descr,
                        IsActive: this.result.IsActive,
                        RowVersion: this.result.RowVersion,
                    });
                }
            );
        }
    }

    SaveForm() {
        this.bizUnitObj = new BusinessUnitObj();
        this.bizUnitObj = this.BizUnitForm.value;
        if (this.mode == "edit") {
            this.editUrl = URLConstant.EditRefBizUnit;
            this.bizUnitObj.BizUnitCode = this.result.BizUnitCode;
            this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;

            this.http.post(this.editUrl, this.bizUnitObj).subscribe(
                (response) => {
                    this.toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ORG_BZ_UNIT],{});
                });
        }
        else {
            this.editUrl = URLConstant.AddRefBizUnit;
            this.http.post(this.editUrl, this.bizUnitObj).subscribe(
                (response) => {
                    this.toastr.successMessage(response["message"]);
                    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ORG_BZ_UNIT],{});
                });
        }
    }
}
