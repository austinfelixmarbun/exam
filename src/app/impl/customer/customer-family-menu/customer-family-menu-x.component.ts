import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-customer-family-menu-x',
  templateUrl: './customer-family-menu-x.component.html'
})
export class CustomerFamilyMenuXComponent implements OnInit {
  @ViewChild('ucPaging') ucPaging: UcpagingComponent;
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
  }

  getEvent(e: any){
    if(e.Key == "UpdateIsCustomer"){
      if(confirm("Update to Main Customer?")){
        var ReqByIdObj = new GenericObj();
        ReqByIdObj.Id = e.RowObj.ShareholderId;
        this.http.post(URLConstant.UpdateToMainCustomer, ReqByIdObj).subscribe(
          (response) => {
            this.toastr.successMessage(response['message']);
            this.ucPaging.reset();
            this.ucPaging.clearPaging();
          }
        )
      }
    }
  }
}
