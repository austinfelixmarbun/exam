import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import {SearchComponent} from '../shared/search/search.component';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { Http, Response } from '@angular/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  providers: [NgbPaginationConfig, NGXToastrService] // add NgbPaginationConfig to the component providers
})
export class SupplierComponent implements OnInit{

  @ViewChild(SearchComponent) searchComponent;
  textbox1 :string = "asd";
  urlJson:string = "./assets/search/searchsupplier.json";
  configuration:any;
  page5 = 4;
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(private http: Http, private service: NGXToastrService) {
  }
  ngOnInit() {
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
    console.log("Call Search");
    this.searchComponent.callSearch(1,25,null);
    // console.log(this.searchComponent.myForm);
    // console.log(this.searchComponent.countForm);
    // for (var i = 0; i < this.searchComponent.countForm; i++) {
    //   var component = this.searchComponent.myForm.nativeElement[i];
    //   console.log(component);
    //   if(component.nodeName ==='SELECT')
    //   {
    //     var ddl = component.options;
    //     var text = ddl[ddl.selectedIndex].value;
    //     console.log(component.name + " - " + text);
    //   }
    //   else{
    //     console.log(component.name + " - " + component.value);
    //   }
      
    // }
  }

    typeSuccess() {
        this.service.typeSuccess();
    }

    // Success Type
    typeInfo() {
        this.service.typeInfo();
    }

    // Success Type
    typeWarning() {
        this.service.typeWarning();
    }

    // Success Type
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
