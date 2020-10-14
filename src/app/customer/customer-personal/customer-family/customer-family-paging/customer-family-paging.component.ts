import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-family-paging',
  templateUrl: './customer-family-paging.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class CustomerFamilyPagingComponent implements OnInit {
  @Input() CustId: number;
  @Output() OutputDetailHandler: EventEmitter<any>;
  CustFamilyList: Array<Object>;
  CustToExclude: Array<number>;

  constructor(private http: HttpClient, private toastr: NGXToastrService) { 
    this.CustFamilyList = new Array<Object>();
    this.CustToExclude = new Array<number>();
  }

  ngOnInit() {
    this.http.post(URLConstant.GetListCustPersonalFamilyByCustId, { CustId: this.CustId }).toPromise().then(
      (response) => {
        this.CustFamilyList = response["CustPersonalFamilyList"];
        for (const item of this.CustFamilyList) {
          if(item["FamilyId"] && item["FamilyId"] > 0){
            this.CustToExclude.push(item["FamilyId"]);
          }
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  openView(FamilyId) {
    AdInsHelper.OpenCustomerViewByCustId(FamilyId);
  }

  addFamily(){
    this.OutputDetailHandler.emit({ Mode: "Add", CustPersonalFamilyId: 0, CustIdToExclude: this.CustToExclude });
  }

  editFamilyHandler(custPersonalFamilyId){
    this.OutputDetailHandler.emit({ Mode: "Edit", CustPersonalFamilyId: custPersonalFamilyId, CustIdToExclude: this.CustToExclude });
  }

  deleteFamilyHandler(custPersonalFamilyId, idx){
    var confirmDelete = confirm(ExceptionConstant.DELETE_CONFIRMATION);
    if(confirmDelete){
      this.http.post(URLConstant.DeleteCustPersonalFamily, { CustPersonalFamilyId: custPersonalFamilyId }).toPromise().then(
        (response) => {
          this.CustFamilyList.splice(idx, 1);
          this.CustToExclude = new Array<number>();
          for (const item of this.CustFamilyList) {
            this.CustToExclude.push(item["FamilyId"]); 
          }
          this.toastr.successMessage(response["Message"]);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
