import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { formatDate } from '@angular/common';
import { SearchComponent } from './../../search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';


@Component({
  selector: 'app-lookup-emp',
  templateUrl: './lookup-employee.component.html',
  providers: [NGXToastrService]
})
export class LookupEmployeeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  urlJson: string = "./assets/lookup/lookupEmp.json";
  @Input() _url: string;

  @ViewChild(SearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;

  EmployeeName: any;

  configuration: any;
  urlGet: string;
  countForm = 0;
  isDataLoaded: boolean = false;
  title: string;
  resultData: any;
  pageNow: any = 1;
  pageSize: any = 25;
  totalData: any;

  jsonSelect: string;
  idSelect: any;
  nameSelect: any = "Search ...";

  closeResult: string;

  foundationUrl: string = environment.foundationUrl;

  ngOnInit() {
    this.urlGet = this.foundationUrl + AdInsConstant.GetListEmployee;;
  }

  choose(id, name, item) {
    console.log(id + " : " + name);
    console.log(item);
    this.idSelect = id;
    this.EmployeeName = name;
    this.nameSelect = name;
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

  search(searchComp) {

    searchComp.search(this.urlGet, this.pageNow, this.pageSize, null)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response;
          this.totalData = response.returnObject.count;
          console.log(response);
        },
        (error) => {
          console.log("Error");
          console.log(error);
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
