import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal-job-data',
  templateUrl: './customer-view-personal-job-data.component.html',
  styleUrls: ['./customer-view-personal-job-data.component.scss']
})
export class CustomerViewPersonalJobDataComponent implements OnInit {
  viewCustJobData: string;

  constructor() { }

  ngOnInit() {
    this.viewCustJobData =  "./assets/ucviewgeneric/viewCustJobData.json";

    // var assetTypeObj = {
    //   RefMasterTypeCode: "ASSET_TYPE_ID",
    //   RowVersion: ""
    // }
    // this.http.post(this.getAssetTypeUrl, assetTypeObj).subscribe(
    //   (response) => {
    //     this.ItemAssetType = response["ReturnObject"];
    //     if (this.pageType == "add") {
    //       this.AssetSchemeInfoForm.patchValue({
    //         AssetTypeId: this.ItemAssetType[0].AssetTypeId,
    //         IsActive: true
    //       });
    //     }
    //   }
    // );

  }

}
