import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service'; 
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefAssetDocObj } from 'app/shared/model/RefAssetDocObj.Model';
 
@Component({
  selector: 'app-asset-document-master-add-edit',
  templateUrl: './asset-document-master-add-edit.component.html',
  styleUrls: ['./asset-document-master-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class AssetDocumentMasterAddEditComponent implements OnInit {
  addUrl : any;
  editUrl: any;
  pageType: any;
  apiUrl: any;
  RefAssetDocId: any;
   
  result: any;
  refAssetObj: RefAssetDocObj;

  RefAssetDocForm = this.fb.group({
    AssetDocCode: ['', [Validators.required, Validators.maxLength(50)]],
    AssetDocName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) { 
    this.addUrl =  AdInsConstant.AddNewRefAssetDocData;
    this.editUrl =  AdInsConstant.EditRefAssetDocData;
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
     
      this.apiUrl =   AdInsConstant.GetRefAssetDocByRefAssetDocId;
      var refAssetObj = new RefAssetDocObj();
      refAssetObj.RefAssetDocId = this.RefAssetDocId; 
      this.RefAssetDocForm.controls.AssetDocCode.disable(); 
      
      this.http.post(this.apiUrl, refAssetObj).subscribe(
        (response) => {
          this.result = response;
          this.RefAssetDocForm.patchValue({
            AssetDocCode: this.result.AssetDocCode,
            AssetDocName: this.result.AssetDocName,
            IsActive: this.result.IsActive

          })
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  SaveForm(){
 
    if (this.pageType == "add") {
      
      this.refAssetObj = new RefAssetDocObj();
      this.refAssetObj.AssetDocCode = this.RefAssetDocForm.controls["AssetDocCode"].value;
      this.refAssetObj.AssetDocName = this.RefAssetDocForm.controls["AssetDocName"].value;
      this.refAssetObj.IsActive = this.RefAssetDocForm.controls["IsActive"].value;
  
      this.http.post(this.addUrl, this.refAssetObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/Asset/DocumentMaster/Paging"]);        
        },
        error => {
          console.log(error);
        }
      );
    }
      else {
      this.refAssetObj = this.result;
      this.refAssetObj.AssetDocCode = this.RefAssetDocForm.controls["AssetDocCode"].value;
      this.refAssetObj.AssetDocName = this.RefAssetDocForm.controls["AssetDocName"].value;
      this.refAssetObj.IsActive = this.RefAssetDocForm.controls["IsActive"].value;
      
      this.http.post(this.editUrl, this.refAssetObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/DocumentMaster/Paging"]);
        },
        error => {
          console.log(error);
        }
      );
    }

  }
}
