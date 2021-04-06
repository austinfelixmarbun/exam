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
    this.httpClient.post<RefLobObj>(URLConstant.GetListRefLob, null).subscribe(
      (response) => {
        console.log(response);
        this.dropdownList = response['ReturnObject']
        console.log(this.dropdownList);
      }
    )

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'RefLobId',
      textField: 'LobName',
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

      this.httpClient.post(URLConstant.GetListLobByRefFeeId, {Id: this.refFeeId}).subscribe(
        (response) => {
          this.selectedItems = response['ReturnObject'];
          console.log(this.selectedItems);
          console.log("test");
        }
      )

    }
  }  

  // checkListObj() {
  //   this.refFeeObj = new RefFeeObj();
  //   this.refFeeObj.RefFeeId = this.refFeeId;
  //   this.refFeeObj.ListRefLobObj = new Array<RefLobObj>();

  //   for (let i = 0; i < this.selectedItems.length; i++) {
  //     this.refLobObj = new RefLobObj();
  //     this.refLobObj.RefLobId = this.selectedItems[i]['RefLobId'];

  //     for (let i = 0; i < this.dropdownList.length; i++) {
  //       if(this.dropdownList[i]['RefLobId'] == this.refLobObj.RefLobId){
  //         this.refLobObj.BlCode = this.dropdownList[i]['BlCode'];
  //         this.refLobObj.LobCode = this.dropdownList[i]['LobCode'];
  //         this.refLobObj.LobName = this.dropdownList[i]['LobName'];
  //         this.refLobObj.RegRptCode = this.dropdownList[i]['RegRptCode'];

  //       }
        
  //     }

  //     console.log(this.refLobObj);

  //     this.refFeeObj.ListRefLobObj.push({
  //       RefLobId: this.refLobObj.RefLobId,        
  //       LobCode: this.refLobObj.LobCode,
  //       LobName: this.refLobObj.LobName,
  //       RegRptCode: this.refLobObj.RegRptCode,
  //       BlCode: this.refLobObj.BlCode,
  //     });
      
  //   }

  //   console.log(this.refFeeObj);


    
  // }

  SaveForm() {
    this.refFeeObj = new RefFeeObj();

    console.log(this.FeeForm);

    this.refFeeObj.FeeCode = this.FeeForm.getRawValue().FeeCode;
    this.refFeeObj.FeeName = this.FeeForm.value.FeeName;
    this.refFeeObj.IsActive = this.FeeForm.value.IsActive;
    

    this.refFeeObj.requestRefLobObjs = new Array<RefLobObj>();

    for (let i = 0; i < this.selectedItems.length; i++) {
      this.refLobObj = new RefLobObj();
      this.refLobObj.RefLobId = this.selectedItems[i]['RefLobId'];

      for (let i = 0; i < this.dropdownList.length; i++) {
        if(this.dropdownList[i]['RefLobId'] == this.refLobObj.RefLobId){
          this.refLobObj.BlCode = this.dropdownList[i]['BlCode'];
          this.refLobObj.LobCode = this.dropdownList[i]['LobCode'];
          this.refLobObj.LobName = this.dropdownList[i]['LobName'];
          this.refLobObj.RegRptCode = this.dropdownList[i]['RegRptCode'];
          
        }
        
      }

      console.log(this.refLobObj);

      this.refFeeObj.requestRefLobObjs.push({
        RefLobId: this.refLobObj.RefLobId,        
        LobCode: this.refLobObj.LobCode,
        LobName: this.refLobObj.LobName,
        RegRptCode: this.refLobObj.RegRptCode,
        BlCode: this.refLobObj.BlCode
      });
      
    }


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
