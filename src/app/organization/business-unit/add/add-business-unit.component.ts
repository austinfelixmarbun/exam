import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AdInsHttpServiceService } from 'app/ad-ins-http-service.service';
import { BusinessUnitObj } from 'app/shared/model/BusinessUnitObj.Model';

@Component({
    selector: 'add-app-business-unit',
    templateUrl: './add-business-unit.component.html',
    providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})

export class AddBusinessUnitComponent implements OnInit {

    param: string;

    businessUnitCode: string;
    businessUnitName: string;
    description: string;
    activestatus: string;
    result: any;
    mode: string = "edit";
    apiUrl: any;
    isActive:boolean = false;
    foundationUrl: string = environment.foundationUrl;

    constructor(
      private route: ActivatedRoute,
      private http: AdInsServiceService,
      private spinner: NgxSpinnerService) {
        this.route.queryParams.subscribe(params => {
            this.param = params["refBizUnitId"];
            this.mode = params["mode"];
        })
    }

    ngOnInit() {
        this.spinner.show();
        if (this.mode === "edit") {
            this.apiUrl = this.foundationUrl + AdInsConstant.GetRefBizUnit;
            var bizUnitObj = new BusinessUnitObj();
            bizUnitObj.RefBizUnitId = this.param;
            this.http.postData(this.apiUrl, bizUnitObj).subscribe(
                (response) => {
                    console.log("Success");
                    this.result = response.returnObject;
                    if(this.result.isActive=="1"){
                        this.isActive = true;
                    }
                    else
                    {
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

    }
}
