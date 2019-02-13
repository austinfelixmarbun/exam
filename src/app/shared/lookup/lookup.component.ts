import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { formatDate } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss']
})
export class LookupComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  urlJson: string = "./assets/lookup/lookupProduct.json";
  @Input() _url: string;

  @ViewChild(SearchComponent) searchComponent;

  configuration: any;
  urlGet: string;
  countForm = 0;
  isDataLoaded: boolean = false;
  title:string;
  resultData:any;
  pageNow:any = 1;
  pageSize:any = 25;
  totalData:any;

  closeResult: string;

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  search(){
    this.searchComponent.callSearch(this.pageNow, this.pageSize, null)
            .subscribe(
                (response) => {
                    console.log("Success");
                    this.resultData = response;
                    this.totalData = response.count;
                    console.log(response);
                    //this.spinner.hide();
                },
                (error) => {
                    console.log("Error");
                    console.log(error);
                    //this.spinner.hide();
                }
            );
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

}
