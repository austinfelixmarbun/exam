import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
    selector: 'add-bank',
    templateUrl: './add-bank.component.html'
})
export class BankAddComponent implements OnInit {

    BankAddForm = this.fb.group({
        BankCode : ['',Validators.required],
        BankName : ['', Validators.required],
        RegRptCode : ['',Validators.required],
        IsActive : [false]
    });

    refBankId: string;
    result: any;
    mode: string;
    title : string = "Add Bank";
    bankObj: RefBankObj;
    criteria: CriteriaObj[] = [];

    readonly CancelLink: string = NavigationConstant.CS_BANK_PAGING;
    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
        this.route.queryParams.subscribe(params => {
            this.refBankId = params["RefBankId"];
            this.mode = params["mode"];
            if (this.mode == "edit") {
                var tempCrit = new CriteriaObj();
                tempCrit.restriction = "Eq";
                tempCrit.value = this.refBankId;
                this.criteria.push(tempCrit);
            }
        });
    }

    ngOnInit() {
        if (this.mode == "edit") {
            this.title = "Edit Bank";
            this.BankAddForm.controls.BankCode.disable();
            var bankObj = new RefBankObj();
            bankObj.RefBankId = this.refBankId;
            
            this.http.post(URLConstant.GetRefBankByRefBankIdAsync, bankObj).subscribe(
                (response) => {
                    this.result = response;
                    this.BankAddForm.patchValue({
                        BankCode : this.result.BankCode,
                        BankName : this.result.BankName,
                        RegRptCode : this.result.RegRptCode,
                        IsActive : this.result.IsActive
                    })
                }
            );
        }
    }

    SaveForm(){
        if (this.mode == "edit") {
            this.bankObj = new RefBankObj();
            this.bankObj = this.BankAddForm.value;
            this.bankObj.BankCode = this.result.BankCode;
            this.bankObj.RefBankId = this.refBankId;
            this.bankObj.RowVersion  = this.result.RowVersion;

            this.http.post(URLConstant.EditRefBank, this.bankObj).subscribe(
                (response) => {
                    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_BANK_PAGING],{});
                    this.toastr.successMessage(response['message']);
                });
        }
        else {
            this.bankObj = new RefBankObj();
            this.bankObj = this.BankAddForm.value;
            this.bankObj.RefBankId = "0";
            this.bankObj.RowVersion = "";

            this.http.post(URLConstant.AddRefBankAsync, this.bankObj).subscribe((response) => {
                this.toastr.successMessage(response['message']);
                AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_BANK_PAGING],{});
            });
        }
    }
}
