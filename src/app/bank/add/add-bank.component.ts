import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { NgForm } from '@angular/forms';

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
    mode: string = "edit";
    apiUrl: any;
    isActive: boolean = false;
    foundationUrl: string = environment.foundationUrl;
    bankObj: RefBankObj;
    editUrl: any;

    constructor(private route: ActivatedRoute, private http: AdInsServiceService, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refBankId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.spinner.show();
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetBank;
            var bankObj = new RefBankObj();
            bankObj.refBankId = this.param;
            this.http.postData(this.apiUrl, bankObj).subscribe(
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
                    this.spinner.hide();
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                    this.spinner.hide();
                }
            );
        }
        else {
            this.spinner.hide();
        }

    }
    Save(BankAddReqForm: NgForm): void {
        if (this.mode === "edit") {
            this.editUrl = this.foundationUrl + AdInsConstant.EditRefBank;
            this.bankObj = new RefBankObj();
            this.bankObj = BankAddReqForm.value;
            this.bankObj.refBankId = this.param;
            if (this.isActive === false) {
                this.bankObj.isActive = "0";
            }
            else {
                this.bankObj.isActive = "1";
            }
            this.http.postData(this.editUrl, this.bankObj).subscribe(
                (response) => {
                    console.log(response);
                });
        }
        else
        {
            this.editUrl = this.foundationUrl + AdInsConstant.AddRefBank;
            this.bankObj = new RefBankObj();
            this.bankObj = BankAddReqForm.value;
            this.bankObj.refBankId = "0";
            if (this.isActive === false) {
                this.bankObj.isActive = "0";
            }
            else {
                this.bankObj.isActive = "1";
            }
            this.http.postData(this.editUrl, this.bankObj).subscribe(
                (response) => {
                    console.log(response);
                });
        }
    }

    toggleVisibility(e){
        this.isActive= e.target.checked;
      }
}
