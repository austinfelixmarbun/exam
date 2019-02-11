import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SearchComponent } from '../shared/search/search.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response } from '@angular/http';
import { data } from 'app/shared/data/smart-data-table';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
    providers: [NgbPaginationConfig] // add NgbPaginationConfig to the component providers
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
    // array of all items to be paged
    private allItems: any[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private http: Http) {
    }
    ngOnInit() {
        this.pageNow=1;
        this.pageSize=25;
        // get dummy data
        this.http.get('./assets/search/dummy-data.json').map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data;

                // initialize to page 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        // get pager object from service
        this.pager = this.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    search() {
        this.searchComponent.callSearch(this.pageNow, this.pageSize, null)
            .subscribe(
                (response) => {
                    console.log("Success");
                    this.resultData = response;
                    this.totalData = response.count;
                    console.log(response);
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                }
            );
    }

    pageChange(page:number)
    {
        this.pageNow = page;
        this.search();
    }




}
