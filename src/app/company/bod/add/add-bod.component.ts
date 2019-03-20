import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-bod',
  templateUrl: './add-bod.component.html',
  providers: [NgbPaginationConfig, NGXToastrService]
})

export class BodAddComponent implements OnInit {
    param: string;
    itemIdType: any;
    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "add";
    apiUrl: any;
    idTypeUrl : any;
    isActive: boolean = false;
    foundationUrl: string = environment.foundationUrl;
    editUrl: any;
    idType : any;

    constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refBankId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.idTypeUrl = this.foundationUrl + AdInsConstant.GetRefMasterList;
        var refMasterObj = new RefMasterObj();
        refMasterObj.refMasterTypeCode = "ID_TYPE";
        this.http.post(this.idTypeUrl, refMasterObj).subscribe(
            (response) => {
                this.itemIdType = response["returnObject"];
                this.idType = this.itemIdType[0].masterCode;
            }
        );
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetBank;
            var refMasterObj = new RefMasterObj();
            refMasterObj.refMasterId = this.param;
            this.http.post(this.apiUrl, refMasterObj).subscribe(
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
} 