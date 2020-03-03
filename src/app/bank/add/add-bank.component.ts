import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsService } from 'app/shared/services/adIns.service';

@Component({
    selector: 'add-bank',
    templateUrl: './add-bank.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})
export class BankAddComponent implements OnInit {

    BankAddForm = this.fb.group({
        bankCode : ['',Validators.required],
        bankName : ['', Validators.required],
        regRptCode : ['',Validators.required],
        isActive : ['']
    });

    param: string;
    result: any;
    mode: string;
    title : string = "Add Bank";
    apiUrl: any;
    settingUrl: string = environment.FoundationR3Url;
    urlEnviPaging: string = environment.foundationUrl;
    bankObj: RefBankObj;
    editUrl: any;
    criteria: CriteriaObj[] = [];

    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private http: HttpClient,
        private adInsService: AdInsService, private fb: FormBuilder) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refBankId"];
            this.mode = params["mode"];
            if (this.mode == "edit") {
                var tempCrit = new CriteriaObj();
                tempCrit.restriction = "Eq";
                tempCrit.value = this.param;
                this.criteria.push(tempCrit);
            }
        })
    }

    ngOnInit() {
        if (this.mode == "edit") {
            this.title = "Edit Bank";
            this.apiUrl = this.settingUrl + AdInsConstant.GetRefBankByRefBankIdAsync;
            this.BankAddForm.controls.bankCode.disable();
            var bankObj = new RefBankObj();
            // bankObj.refBankId = this.param;
            
            this.http.post(this.apiUrl, bankObj).subscribe(
                (response) => {
                    this.result = response;
                    this.BankAddForm.patchValue({
                        bankCode : this.result.BankCode,
                        bankName : this.result.BankName,
                        regRptCode : this.result.RegRptCode,
                        isActive : this.result.IsActive
                    })
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    SaveForm(){
        if (this.mode == "edit") {
            this.editUrl = this.settingUrl + AdInsConstant.EditRefBank;
            this.bankObj = new RefBankObj();
            this.bankObj = this.BankAddForm.value;
            // this.bankObj.bankCode = this.result.BankCode;
            // this.bankObj.refBankId = this.param;
            this.bankObj.RowVersion  = this.result.RowVersion;
            // if (this.isActive == false) {
            //     this.bankObj.isActive = false;
            // }
            // else {
            //     this.bankObj.isActive = true;
            // }
            this.http.post(this.editUrl, this.bankObj).subscribe(
                (response) => {
                    this.router.navigateByUrl('/bank/paging');
                    this.toastr.successMessage(response['message']);
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.editUrl = this.settingUrl + AdInsConstant.AddRefBankAsync;
            this.bankObj = new RefBankObj();
            this.bankObj = this.BankAddForm.value;
            // this.bankObj.refBankId = "0";
            this.bankObj.RowVersion = "";
            // if (this.bankObj.isActive == 0 ) {
            //     this.bankObj.isActive = false;
            // }
            // else {
            //     this.bankObj.isActive = true;
            // }

            this.http.post(this.editUrl, this.bankObj).subscribe((response) => {
                this.toastr.successMessage(response['message']);
                this.router.navigateByUrl('/bank/paging');
                    // this.toastr.successMessage(response['message']);
                // this.router.navigateByUrl('/bank/paging', { skipLocationChange: true }).then(() =>
                //     this.router.navigate(['/bank/add']));
            },
                (error) => {
                    console.log(error);
                });
        }
    }
}
