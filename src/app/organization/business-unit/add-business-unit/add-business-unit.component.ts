import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessUnitObj } from 'app/shared/model/BusinessUnitObj.Model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'add-app-business-unit',
    templateUrl: './add-business-unit.component.html',
    providers: [NGXToastrService] // add NgbPaginationConfig to the component providers
})

export class AddBusinessUnitComponent implements OnInit {
    bizUnitObj : BusinessUnitObj;
    RefBizUnitId: string;
    pageType:any;
    result: any;
    title:string;
    mode: string = "add";
    apiUrl: any;
    isActive: boolean = true;
    foundationUrl: string = environment.FoundationR3Url;
    editUrl: any;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
        this.route.queryParams.subscribe(params => {
            this.RefBizUnitId = params["RefBizUnitId"];
            this.mode = params["mode"];
        })
    }

    BizUnitForm = this.fb.group({
        BizUnitCode: ['', Validators.required],
        BizUnitName:  ['', Validators.required],
        Descr:  [''],
        IsActive:  [true],
        RowVersion: ['']    
    })

    ngOnInit() {
        this.title = "Business Unit Add";
        if (this.mode == "edit") {
            this.title = "Business Unit Edit";
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefBizUnit;
            this.bizUnitObj = new BusinessUnitObj();
            this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;
            this.BizUnitForm.controls.BizUnitCode.disable();
            this.http.post(this.apiUrl,  this.bizUnitObj).subscribe(
                (response) => {
                    this.result = response;
                    console.log(this.result);
                    this.BizUnitForm.patchValue({
                        BizUnitCode: this.result.BizUnitCode,
                        BizUnitName: this.result.BizUnitName,
                        Descr: this.result.Descr,
                        IsActive: this.result.IsActive,
                        RowVersion: this.result.RowVersion,
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    SaveForm(){
        this.bizUnitObj = new BusinessUnitObj();
        this.bizUnitObj = this.BizUnitForm.value;
        if (this.mode == "edit") {
            this.editUrl = this.foundationUrl + AdInsConstant.EditRefBizUnit;
            this.bizUnitObj.BizUnitCode = this.result.BizUnitCode;
            this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;
            
            this.http.post(this.editUrl, this.bizUnitObj).subscribe(
                (response) => {
                    this.toastr.successMessage(response["message"]);
                    this.router.navigateByUrl('/organization/businessunit');
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.bizUnitObj.RefBizUnitId = "0";
            this.editUrl = this.foundationUrl + AdInsConstant.AddRefBizUnit;
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
}
