import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { RefFeeObj } from 'app/shared/model/RefFeeObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { RefLobObj } from 'app/shared/model/RefLobObj.Model';

@Component({
  selector: 'app-fee-add-edit',
  templateUrl: './fee-add-edit.component.html',
  styleUrls: ['./fee-add-edit.component.css']
})
export class FeeAddEditComponent implements OnInit {

  refFeeId: number;
  pageType: string;
  isEdit: boolean;
  refFeeObj: RefFeeObj;
  refLobObj: RefLobObj;

  lineOfBusiness: any;

  dropdownList: [];
  selectedItems: [];
  dropdownSettings = {};

  FeeForm = this.fb.group({
    FeeCode: ['', Validators.required],
    FeeName: ['', Validators.required],    
    IsActive: [false]
  });

  readonly CancelLink: string = NavigationConstant.FEE_PAGING;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.route.queryParams.subscribe(params => {
      if (params['RefFeeId'] != null) {
        this.isEdit = true;
        this.pageType = "edit";
        this.refFeeId = params['RefFeeId'];

      } else {
        this.isEdit = false;
        this.pageType = "add";
      }
    });
    console.log(this.refFeeId);
  }

  setDropDown() {
    this.httpClient.post<RefLobObj>(URLConstant.GetListBizTmpltCode, null).subscribe(
      (response) => {
        console.log(response);
        this.dropdownList = response['ReturnObject']
        console.log(this.dropdownList);
      }
    )

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'BizTemplateCode',
      textField: 'BizTemplateCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    }
  }

  ngOnInit() {
    this.setDropDown();
    if (this.pageType == "edit") {
      this.FeeForm.controls['FeeCode'].disable();
      this.httpClient.post<RefFeeObj>(URLConstant.GetRefFeeByRefFeeId, { Id: this.refFeeId }).subscribe(
        (response) => {
          this.refFeeObj = response;
          this.FeeForm.patchValue({
            FeeCode: this.refFeeObj.FeeCode,
            FeeName: this.refFeeObj.FeeName,
            IsActive: this.refFeeObj.IsActive
          })

        }
      );

      this.httpClient.post(URLConstant.GetListBizTemplateCodeByRefFeeId, {Id: this.refFeeId}).subscribe(
        (response) => {
          this.selectedItems = response['ReturnObject'];
          console.log(this.selectedItems);
          console.log("test");
        }
      )

    }
  }  

  

  SaveForm() {
    this.refFeeObj = new RefFeeObj();

    console.log(this.FeeForm);

    this.refFeeObj.requestRefLobBizTmpltCodes = new Array<string>();

    this.refFeeObj.FeeCode = this.FeeForm.getRawValue().FeeCode;
    this.refFeeObj.FeeName = this.FeeForm.value.FeeName;
    this.refFeeObj.IsActive = this.FeeForm.value.IsActive;

    
    
    for (let index = 0; index < this.selectedItems.length; index++) {
      this.refFeeObj.requestRefLobBizTmpltCodes.push(this.selectedItems[index]['BizTemplateCode'])      
    }

    console.log(this.refFeeObj.requestRefLobBizTmpltCodes);  


    if (this.pageType == "add") {
      console.log(this.refFeeObj);
      this.httpClient.post(URLConstant.AddRefFee, this.refFeeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.FEE_PAGING], {});
        }
      )
    } else {
      this.refFeeObj.RefFeeId = this.refFeeId;
      this.httpClient.post(URLConstant.EditRefFee, this.refFeeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.FEE_PAGING], {});
        }
      )
    }

  }

}
