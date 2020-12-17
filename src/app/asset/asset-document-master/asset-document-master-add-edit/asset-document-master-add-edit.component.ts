import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefAssetDocObj } from 'app/shared/model/RefAssetDocObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-asset-document-master-add-edit',
  templateUrl: './asset-document-master-add-edit.component.html'
})

export class AssetDocumentMasterAddEditComponent implements OnInit {
  pageType: string = 'add';
  RefAssetDocId: number;
  result: RefAssetDocObj = new RefAssetDocObj();
  refAssetObj: RefAssetDocObj = new RefAssetDocObj();

  RefAssetDocForm = this.fb.group({
    AssetDocCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetDocName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.pageType = params["mode"];
      }
      if (params["RefAssetDocId"] != null) {
        this.RefAssetDocId = params["RefAssetDocId"];
      }
    });
  }

  ngOnInit() {
    if (this.pageType == "edit") {
      this.RefAssetDocForm.controls.AssetDocCode.disable();
      this.http.post(URLConstant.GetRefAssetDocByRefAssetDocId, { RefAssetDocId: this.RefAssetDocId }).subscribe(
        (response: RefAssetDocObj) => {
          this.result = response;
          this.RefAssetDocForm.patchValue({
            AssetDocCode: this.result.AssetDocCode,
            AssetDocName: this.result.AssetDocName,
            IsActive: this.result.IsActive
          })
        });
    }else{
      this.checkIsAutoFormNoFromSetting('AD')
    }
  }

  SaveForm() {
    if (this.pageType == "add") {
      this.refAssetObj = new RefAssetDocObj();
      this.refAssetObj.AssetDocCode = this.RefAssetDocForm.controls["AssetDocCode"].value;
      this.refAssetObj.AssetDocName = this.RefAssetDocForm.controls["AssetDocName"].value;
      this.refAssetObj.IsActive = this.RefAssetDocForm.controls["IsActive"].value;

      this.http.post(URLConstant.AddNewRefAssetDocData, this.refAssetObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,["/Asset/DocumentMaster/Paging"],{});
        }
      );
    }
    else {
      this.refAssetObj = this.result;
      this.refAssetObj.AssetDocCode = this.RefAssetDocForm.controls["AssetDocCode"].value;
      this.refAssetObj.AssetDocName = this.RefAssetDocForm.controls["AssetDocName"].value;
      this.refAssetObj.IsActive = this.RefAssetDocForm.controls["IsActive"].value;

      this.http.post(URLConstant.EditRefAssetDocData, this.refAssetObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,["/Asset/DocumentMaster/Paging"],{});
        });
    }
  }

  //check is automatic/not form no 4
  isAuto: boolean = false;
  checkIsAutoFormNoFromSetting(msAutoGenCode: any) {
    var generalSettingObj = {
      GsCode: "MASTER_AUTO_GNRT_CODE"
    }
    var result: any;
    this.http.post(URLConstant.GetGeneralSettingByCode, generalSettingObj).subscribe(
      (response) => {
        result = response;

        if (result.GsValue != undefined && result.GsValue != "") {
          if (result.GsValue.split(';').find(x => x == msAutoGenCode)) {
            this.isAuto = true;
            //patch value form no
            this.RefAssetDocForm.patchValue({
              AssetDocCode: '-'
            });
          }
        }
      });
  }
  //check is automatic/not form no 4

}
