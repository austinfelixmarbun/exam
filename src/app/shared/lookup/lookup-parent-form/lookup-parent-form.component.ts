import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { environment } from 'environments/environment';
import { NgForm, ControlContainer } from '@angular/forms';


@Component({
    selector: 'app-lookup-parent-form',
    templateUrl: './lookup-parent-form.component.html',
    providers: [NGXToastrService],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class LookupParentFormComponent implements OnInit {

    constructor(private modalService: NgbModal) { }

    urlJson: string = "./assets/lookup/lookupParentForm.json";
    urlQryPaging: string = AdInsConstant.GetRefFormPaging;
    @Input() _url: string;
    @Input() nameSelect: any = "Search ...";
    @Input() idSelect: any;
    @Input() jsonSelect: string;
    @ViewChild(SearchComponent) searchComponent;
    @ViewChild('content') contentTemplate;
    @ViewChild(UCGridFooterComponent) ucgridFooter;

    EmployeeName: any;
    EmployeeId: any;

    configuration: any;
    urlGet: string;
    countForm = 0;
    isDataLoaded: boolean = false;
    title: string;
    resultData: any;
    pageNow: any;
    totalData: any;
    pageSize: any;
    apiUrl: any;
    show: any;
    orderByKey: any = null;
    orderByValue: boolean = true;
    rt: any;

    closeResult: string;

    foundationUrl: string = environment.foundationUrl;

    ngOnInit() {
        this.apiUrl = this.foundationUrl + AdInsConstant.GetRefFormPaging;
        this.show = AdInsConstant.showData.split(',');
        this.pageNow = 1;
        this.pageSize = this.show[0];

    }

    choose(id, name, item) {
        console.log(id + " : " + name);
        console.log(item);
        this.idSelect = id;
        this.EmployeeId = id;
        this.EmployeeName = name;
        this.nameSelect = name;
        this.rt = name;
        this.jsonSelect = JSON.stringify(item);
        this.modalService.dismissAll();
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    getResult(ucgridFooter, event) {

        this.resultData = event;
        this.totalData = event.returnObject.count;
        ucgridFooter.totalData = this.totalData;
        ucgridFooter.resultData = this.resultData;
    }

    onSelect(searchComponent, event) {
        this.pageNow = event.pageNow;
        this.pageSize = event.pageSize;
        this.searchPagination(searchComponent, this.pageNow);
    }
    searchPagination(searchComponent, event: number) {
        this.pageNow = event;

        var order = null;
        if (this.orderByKey != null) {
            order = {
                key: this.orderByKey,
                value: this.orderByValue
            };
        }
        searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }


    searchSort(searchComp, key) {
        if (this.orderByKey == key) {
            this.orderByValue = !this.orderByValue;
        } else {
            this.orderByValue = true;
        }
        this.orderByKey = key;
        var order = {
            key: this.orderByKey,
            value: this.orderByValue
        }
        searchComp.search(this.apiUrl, this.pageNow, this.pageSize, order)
    }
}
