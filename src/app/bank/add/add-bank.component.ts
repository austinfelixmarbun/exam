import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { NgForm } from '@angular/forms';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
    selector: 'add-bank',
    templateUrl: './add-bank.component.html',
    providers: [NgbPaginationConfig, NGXToastrService]
})
export class BankAddComponent implements OnInit {

    param: string;

    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    isActive: boolean = false;
    settingUrl: string = environment.settingUrl;
    urlEnviPaging : string = environment.foundationUrl;
    bankObj: RefBankObj;
    editUrl: any;
    key: any;
    criteria: CriteriaObj[] = [];
    afterSaveUrl = "/bank";

    constructor(private toastr: NGXToastrService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refBankId"];
            this.mode = params["mode"];
            this.key = params["key"];
            if (this.mode == "edit") {
                var tempCrit = new CriteriaObj();
                tempCrit.propName = this.key;
                tempCrit.restriction = "Eq";
                tempCrit.value = this.param;
                this.criteria.push(tempCrit);
            }
        })
    }

    ngOnInit() {
        if (this.mode === "edit") {
            this.apiUrl = this.settingUrl + AdInsConstant.GetBank;
            var bankObj = new RefBankObj();
            bankObj.refBankId = this.param;
            this.http.post(this.apiUrl, bankObj).subscribe(
                (response) => {
                    console.log("Success");
                    console.log(response);
                    this.result = response['returnObject'];
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
    Save(BankAddReqForm: NgForm): void {
        if (this.mode === "edit") {
            this.editUrl = this.settingUrl + AdInsConstant.EditRefBank;
            this.bankObj = new RefBankObj();
            this.bankObj = BankAddReqForm.value;
            this.bankObj.refBankId = this.param;
            if (this.isActive === false) {
                this.bankObj.isActive = "0";
            }
            else {
                this.bankObj.isActive = "1";
            }
            this.http.post(this.editUrl, this.bankObj).subscribe(
                (response) => {
                    console.log(response);
                    this.router.navigateByUrl('/bank');
                    this.toastr.successMessage(response['message']);
                },
                (error) => {
                    console.log(error);
                });
        }
        else {
            this.editUrl = this.settingUrl + AdInsConstant.AddRefBank;
            this.bankObj = new RefBankObj();
            this.bankObj = BankAddReqForm.value;
            this.bankObj.refBankId = "0";
            if (this.isActive === false) {
                this.bankObj.isActive = "0";
            }
            else {
                this.bankObj.isActive = "1";
            }
            this.http.post(this.editUrl, this.bankObj).subscribe(
                (response) => {
                    console.log(response);
                    this.toastr.successMessage(response['message']);
                    this.router.navigateByUrl('/bank', { skipLocationChange: true }).then(() =>
                        this.router.navigate(['/bank/add']));
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
