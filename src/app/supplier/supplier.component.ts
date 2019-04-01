import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response } from '@angular/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
    providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class SupplierComponent implements OnInit {

    @ViewChild(SearchComponent) searchComponent;
    textbox1: string = "asd";
    urlJson: string = "./assets/search/searchsupplier.json";
    configuration: any;
    resultData:string;
    pageNow:any;
    totalData:any;
    pageSize:any;
    param: string;

    constructor(private http: Http, private spinner: NgxSpinnerService,  private service: NGXToastrService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.param = params['param'];
            console.log(this.param)
        });
    }
    
    ngOnInit() {
        this.pageNow=1;
        this.pageSize=25;
    }

    search() {
        this.spinner.show();
        this.searchComponent.callSearch(this.pageNow, this.pageSize, null)
            .subscribe(
                (response) => {
                    console.log("Success");
                    this.resultData = response;
                    this.totalData = response.count;
                    console.log(response);
                    this.spinner.hide();
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                    this.spinner.hide();
                }
            );
    }

    pageChange(page:number)
    {
        this.pageNow = page;
        this.search();
    }
    
    // Success Type
    typeSuccess(){
        this.service.typeSuccess();
    }

    typeError() {
        this.service.typeError();
    }

    timeout() {
        this.service.timeout();
    }

    errMsg() {
        this.service.errorMessage('asdasd');
    }
}
