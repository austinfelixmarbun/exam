import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { environment } from "environments/environment";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AdInsServiceService } from "app/ad-ins-service.service";
import { formatDate } from "@angular/common";
import { SearchComponent } from "app/shared/search/search.component";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { UCGridFooterComponent } from "app/shared/UserControl/ucgrid-footer/ucgrid-footer.component";

@Component({
  selector: "app-lookup-role",
  templateUrl: "./lookup-role.component.html",
  providers: [NGXToastrService]
})
export class LookupRoleComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  urlJson: string = "./assets/lookup/lookupRole.json";
  urlQryPaging: string = AdInsConstant.GetRefRolePaging;
  @Input() _url: string;
  @Input() nameSelect: any = "Search ...";
  @Input() idSelect: any;
  @Input() jsonSelect: string;
  @Input() addCritInput: CriteriaObj[] = null;
  @Input() isRequired: any;
  @ViewChild(SearchComponent) searchComponent;
  @ViewChild("content") contentTemplate;
  @ViewChild(UCGridFooterComponent) ucgridFooter;

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
  closeResult: string;
  foundationUrl: string = environment.foundationUrl;

  refRoleId: any;
  roleName: any;

  addCrit: Array<any>;

  ngOnInit() {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRolePaging;
    this.show = AdInsConstant.showData.split(",");
    this.pageNow = 1;
    this.pageSize = this.show[0];

     /* #region   Additional Criteria*/
     if (this.addCritInput !== null) {
      this.addCrit = new Array();
      for (var i = 0; i < this.addCritInput.length; i++) {
        this.addCrit.push(this.addCritInput[i]);
      }
    }
    /* #endregion */
  }

  choose(id, name, item) {
    console.log(id + " : " + name);
    console.log(item);
    this.idSelect = id;
    this.refRoleId = id;
    this.roleName = name;
    this.nameSelect = name;
    this.jsonSelect = JSON.stringify(item);
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getResult(ucgridFooter, event) {
    console.log(this.urlQryPaging);
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
    searchComponent
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit )
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
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
    };
    searchComp
      .search(this.apiUrl, this.pageNow, this.pageSize, order, this.addCrit )
      .subscribe(
        response => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        error => {
          console.log("Error");
          console.log(error);
        }
      );
  }
}
