import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cust-asset-detail',
  templateUrl: './cust-asset-detail.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class CustAssetDetailComponent implements OnInit {
  @Input() CustAssetId: number;
  @Input() CustId: number;
  CustAssetTypeList: Array<KeyValueObj>;
  Mode: string;

  CustAssetForm = this.fb.group({
    CustAssetId: [0],
    CustId: [0],
    MrCustAssetTypeId: ['', [Validators.required]],
    AssetDescr: [''],
    AssetValue: [0, [Validators.required, Validators.min(1)]],
    AssetQty: [0, [Validators.required, Validators.min(1)]],
    AssetTotalValue: [0],
    RowVersion: ['']
  });

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.CustAssetTypeList = new Array<KeyValueObj>();
    this.Mode = "ADD";
   }

  ngOnInit() {
    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: CommonConstant.RefMasterTypeCustAsset }).toPromise().then(
      (response) => {
        this.CustAssetTypeList = response[CommonConstant.ReturnObj];
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
    if(this.CustAssetId && this.CustAssetId > 0){
      this.Mode = "EDIT"
      this.httpClient.post(URLConstant.GetCustAssetByCustAssetId, { CustAssetId: this.CustAssetId }).toPromise().then(
        (response) => {
          this.CustAssetForm.patchValue({
            CustAssetId: response["CustAssetId"],
            CustId: response["CustId"],
            MrCustAssetTypeId: response["MrCustAssetTypeId"],
            AssetDescr: response["AssetDescr"],
            AssetValue: response["AssetValue"],
            AssetQty: response["AssetQty"],
            AssetTotalValue: response["AssetTotalValue"],
            RowVersion: response["RowVersion"]
          });
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      this.CustAssetForm.patchValue({
        CustId: this.CustId
      });
    }
  }

  SaveForm(){
    var formValue = this.CustAssetForm.value;
    formValue.AssetTotalValue = formValue.AssetValue * formValue.AssetQty;
    var url = "";
    if(this.CustAssetId && this.CustAssetId > 0){
      url = URLConstant.EditCustAsset;
    }
    else{
      url = URLConstant.AddCustAsset;
    }
    this.httpClient.post(url, formValue).toPromise().then(
      (response) => {
        this.activeModal.close(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
