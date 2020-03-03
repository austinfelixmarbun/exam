import { Component, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetAccessoryObj } from 'app/shared/model/AssetAccesorryObj.Model';

@Component({
  selector: 'app-asset-accessory-information',
  templateUrl: './asset-accessory-information.component.html',
  styleUrls: ['./asset-accessory-information.component.scss'],
  providers: [NGXToastrService]
})
export class AssetAccessoryInformationComponent implements OnInit {

  AssetAccessoryForm = this.fb.group({
    AssetAccessoryName: ['', [Validators.required, Validators.maxLength(100)]],
    AssetAccessoryCode: ['', [Validators.required, Validators.maxLength(50)]],
   IsActive: [true]
 });

  
 
  pageType: any;
  AssetTypeId: any;
  AssetAccessoryId:any;
  apiUrl: any;
  settingUrl: string = environment.FoundationR3Url;
  urlEnviPaging: string = environment.foundationUrl;
  result:any;
  acObj : AssetAccessoryObj;
  getUrl: any;
  addUrl: any;
  editUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    
    this.addUrl = environment.FoundationR3Url+ AdInsConstant.AddNewAssetAccesory;
    this.editUrl = environment.FoundationR3Url+AdInsConstant.EditAssetAccessory;
     this.route.queryParams.subscribe(params => {

    
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      } 
        if (params["mode"] != null) {
          this.pageType = params["mode"];
        }

        if (params["AssetAccessoryId"] != null) {
          this.AssetAccessoryId = params["AssetAccessoryId"];
        }
  
    
     
   });
   
  }
  ngOnInit() {


    
    if (this.pageType == "edit") {
      console.log("awd");
      // this.title = "Edit Bank";
      var acObj = new AssetAccessoryObj();
    
      acObj.AssetAccessoryId = this.AssetAccessoryId;
      acObj.AssetTypeId = this.AssetTypeId;
      this.apiUrl = this.settingUrl + AdInsConstant.GetAssetAccessorybyAssetAccessoryId;
      this.AssetAccessoryForm.controls.AssetAccessoryCode.disable();

      console.log("awd");
       
      this.http.post(this.apiUrl, acObj).subscribe(
          (response) => {
              this.result = response;
              this.AssetAccessoryForm.patchValue({
                AssetAccessoryCode: this.result.AssetAccessoryCode,
                AssetAccessoryName: this.result.AssetAccessoryName, 
                isActive : this.result.isActive
                 
              })
          },
          (error) => {
              console.log(error);
          }
      );
  }


  }

  SaveForm(){
    
    console.log("awd");
    if (this.pageType == "add") {
      
      this.acObj = new AssetAccessoryObj();
      this.acObj.AssetAccessoryCode = this.AssetAccessoryForm.controls["AssetAccessoryCode"].value;
      this.acObj.AssetAccessoryName = this.AssetAccessoryForm.controls["AssetAccessoryName"].value;
      this.acObj.IsActive = this.AssetAccessoryForm.controls["IsActive"].value;
      this.acObj.AssetTypeId = this.AssetTypeId;

      this.http.post(this.addUrl, this.acObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/Asset/Accessory/Paging"]);
          
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.acObj = this.result;
      this.acObj.AssetAccessoryCode = this.AssetAccessoryForm.controls["AssetAccessoryCode"].value;
      this.acObj.AssetAccessoryName = this.AssetAccessoryForm.controls["AssetAccessoryName"].value;
      this.acObj.IsActive = this.AssetAccessoryForm.controls["IsActive"].value;
      
      this.http.post(this.editUrl, this.acObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          this.router.navigate(["/Asset/Accessory/Paging"],{ queryParams: { "AssetTypeId": this.acObj.AssetTypeId   } });
      
        },
        error => {
          console.log(error);
        }
      );
    }

  }
  
}
