import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-detail-license',
  templateUrl: './detail-license.component.html',
  styleUrls: ['./detail-license.component.css']
})
export class DetailLicenseComponent implements OnInit {

  systemName : any;
  licenseType : any;
  status : any;
  modules : any;
  LicenseData : any;
  readonly CancelLink: string = NavigationConstant.LICENSE_PAGING;
  constructor(private route: ActivatedRoute, private toastr: NGXToastrService, private httpClient: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.systemName = params["systemName"];
      this.licenseType = params["licenseType"];
      this.status = params["status"];   
      this.modules = params["modules"]   
    })
   }

  ngOnInit() {
    var LicenseObj = { SystemName : this.systemName, LicenseType : this.licenseType, Module : ""};

    this.httpClient.post(URLConstant.RetrieveLicenseDetail, LicenseObj).subscribe(
      (response) => {
        this.LicenseData = response;
        console.log(this.LicenseData);
        this.toastr.successMessage(response['message']);
      }
    );
  }

}
