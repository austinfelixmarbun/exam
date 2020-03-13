import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-vendor-group-view',
  templateUrl: './vendor-group-view.component.html',
  styleUrls: ['./vendor-group-view.component.scss']
})
export class VendorGroupViewComponent implements OnInit {
  VendorGrpId: any;
  vendorGrpObj: VendorGroupObj;
  inputPagingObj: any;
  inputViewObj: any;

  constructor(private router: Router, private route: ActivatedRoute, ) {
    this.route.queryParams.subscribe(params => {
      if (params['VendorGrpId'] != null) {
        this.VendorGrpId = params['VendorGrpId'];
      }
    });
  }


  ngOnInit() {

    // this.vendorGrpObj.VendorGrpId = this.VendorGrpId;
    // console.log(this.vendorGrpObj)

    this.inputViewObj = "./assets/ucviewgeneric/viewVendorGrp.json";

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendor.json";
    //this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefOffice;





  }
}
