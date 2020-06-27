import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-product-ho-approval',
  templateUrl: './product-ho-approval.component.html',
  providers: [NGXToastrService]
})
export class ProductHOApprovalComponent implements OnInit {

  inputPagingObj: any;
  arrCrit: any;

  constructor(private toastr:NGXToastrService, private httpClient:HttpClient) { }

  ngOnInit() {
    this.inputPagingObj=new UcpagingModule();
    this.inputPagingObj._url="./assets/ucpaging/product/searchProductHOApproval.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductHOApproval.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'CATEGORY_CODE';
    critObj.value = 'PRD_HO_APV';
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

  CallBackHandler(ReturnObject){
    var ApvReqObj = new ApprovalObj();
    if(ReturnObject.Key == "HoldTask"){
      ApvReqObj.TaskId = ReturnObject.RowObj.TaskId
      this.httpClient.post(AdInsConstant.ApvHoldTaskUrl, ApvReqObj).subscribe(
        (response)=>{
          this.toastr.successMessage(response["Message"]);
        }
      )
    }
    else if(ReturnObject.Key == "TakeBack"){
      ApvReqObj.TaskId = ReturnObject.RowObj.TaskId
      this.httpClient.post(AdInsConstant.ApvTakeBackTaskUrl, ApvReqObj).subscribe(
        (response)=>{
          this.toastr.successMessage(response["Message"]);
        }
      )
    }
    else{
      this.toastr.errorMessage(String.Format(AdInsConstant.ERROR_NO_CALLBACK_SETTING, ReturnObject.Key));
    }

    console.log(ReturnObject);
  }

}
